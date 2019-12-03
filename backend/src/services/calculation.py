#!/usr/bin/python
# -*- encoding: utf-8 -*-
from datetime import datetime
import calendar
import psycopg2
import math
import pgFunctions
import assistant

#########################################################################################################
#   Funkcia vypocet ( pid  : integer, pdat : str )
#
#   input:  1.par pid  - osobne cislo
#           2.par pdat - aktualne obdobie pre vypocet
#  
#   return: fail:   1 
#           succes: 0  
#           
#
#   a. vyriesit pracu s priemermi a funkciu get_priemd, get_priemn
#   b. vyriesit kodovanie vo vektore cislo na 8 zn char napr deka*100 -> hexa
#   c. dorobit invalidnych poistencov vypocet poistneho
#   d. zaokruhlenie poistneho podla zakona
#   e. zaokruhlenie dane podla zakona
#   f. dane - auto, danovy bonus, DDS, ZivPoist, Ine
#   g. doriesit uvazok mensi ako 100%
#
#   Postup vypoctu:
# ok  1. Nacitaj potrebne data z mpar, mos, mud, mzl, fpd, kal
#     2. vypocet udajov FPD  
#     3. vypocet z mzl - postupne po skupinach kodov 1-9
#     4. vypocet odvodov TODO: doplnit invalidov
#     5. vypocet dane 
#     6. danovy bonus na deti od 1.4.2019 na 2nasobok 44.37 eur ak este nedovrsilo 6 rokov. 
#     7. 
#     8. vypocet zrazok
#     9. zapis do mvy
#
#########################################################################################################
    ### napocet z mzl1   
    ###                 row[0]  - id
    ###                 row[1]  -   id_osc
    ###                 row[2]  -   kod 
    ###                 row[3]  - kodext
    ###                 row[4]  - datum_od
    ###                 row[5]  - datum_do
    ###                 row[6]  - dni
    ###                 row[7]  - hod
    ###                 row[8]  - sadzba
    ###                 row[9]  - hodnota 
    ###                 row[10]  - pozn
    ###                 skup :  row[13]      1 - zakladne, 2 - nahrady , 3 - ... 9-zrazky
    ###                 f1,2,3,4 zc         : 15,16,17,18
    ###                 f1,2,3,4,5,6,7,8 zl : 19,20,21,22,23,24,25,26
    ###                 hak:                : 27          # A - € celkom, B – sadzba * hod odprac., C – hodiny * suma_na_hod , D - datum od - do 
    ###                 znizuje hod sviatok : 28 
    ###                 alg1 koef           : 29  
    ###                 alg3 percMN         : 30
    ###                 alg4 perc.tarif     : 31
    ###                 alg5 perc.rezer     :    - preplatenie hodin sadzbou v centoch 
    ###                 alg6 perc.+/-       : 32
    ###                 alg7 perc.pls       : 33  
    ###                 stop na hodnota     : 34  (kody.hodnota T/F)
    ###                 stop na hodiny      : 35  (kody.hodnota T/F)
    ###                 stop na percento    : 36  (kody.hodnota T/F)
    ###                 poz hod                 : row[42] 
    ###                 poz sk                  : row[43] 
    ###                 poz dni                 : row[44]  
    ###                 poz poc                 : row[45]
    ###                 poz prg nemoc           : 46
    ###                 poz % pre nemoc1        : 47
    ###                 poz poc.dni pre nem.1   : 48
    ###                 poz % pre nemoc2        : 49
    ###                 poz poc.dni pre nem.2   : 50
    ###                 skupina zrazok          : 51

def vypocet( pid, pdat ):
    rokp = int(pdat[:4])
    mesp = int(pdat[5:7])

## inicializacia premennych  
    # inicializacia vektora v - list of floats
    v = []  # vektor do ktoreha sa ukladaju vypocitane udaje
    for i in range(250): 
        v.append(0.0)  # popis vektora je v tabulke mvek

    v_vektor = []  # pomocny vektor
    for i in range(45): 
        v_vektor.append(0.0)  # pridaj 45 prvkov obsahujucich 0.0 do v_vektora
    
    fpd_hod  = 0.0  # fond pracovnej doby pracovne hodiny za mesiac aj so sviatkami
    fpd_hodp = 0.0  # fond pracovnej doby pracovne hodiny za mesiac
    fpd_hods = 0.0  # fond pracovnej doby hodiny sviatok za mesiac
    fpd_dni  = 0.0  # fond pracovnej doby pracovne dni aj so sviatkami 
    fpd_dnip = 0.0  # fond pracovnej doby pracovne dni za mesiac 
    fpd_dnis = 0.0  # fond pracovnej doby dni sviatok za mesiac 
    fpd_priem = 0.0  # fond pracovnej doby priemerny za mesiac
    
    v_neodpdni = 0.0  # neodpracovane dni
    v_neodphod = 0.0  # neodpracovane hodiny

    v_pracdni = 0.0
    v_prachod = 0.0
    v_sviatdni = 0.0
    v_sviathod = 0.0
    v_preplateny_sviatok_hod = 0.0
    v_tarif_na_hod = 0.0
    kod_dniahod = 0.0
    v_pracuje = False  # logicka premenna urcuje 1 - pracovnik pracuje a je aktivny , 0 - nepracuje alebo nie je aktivny
    v_500 = False  # ma zadany kod 500
    
    VZ_ZP = 0.0; VZ_SP = 0.0; VZ_NP = 0.0; VZ_UP = 0.0; VZ_DPs = 0.0; VZ_DPi = 0.0; VZ_PvN = 0.0; VZ_GP  = 0.0; VZ_RF  = 0.0 
    ZPzam = 0.0; NPzam = 0.0; DPszam = 0.0; DPizam = 0.0; PvNzam = 0.0; 
    ZPpod = 0.0; NPpod = 0.0; DPspod = 0.0; DPipod = 0.0; PvNpod = 0.0;  GPpod = 0.0; RFpod = 0.0; UPpod = 0.0
    
    s_zivpoist = 0.0 ; s_dds = 0.0 ; s_auto = 0.0; s_odpocetost = 0.0; s_opravadaneminr = 0.0; s_rozdielzrch = 0.0  
    s_dan_mes = 0.0; s_ciast_zaklad_dane = 0.0; s_danbonus = 0.0; s_dan_roc = 0.0; s_nezdcastdane = 0.0 

    l_vyplata = 'H'  # default hodnota kam smerovat vyplatu 'B' banka 'H' hotovost 'P' posta
    s_platzakl = 0.0  # zakladny plat - tarif zo zmluvy
## inicializacie premennych end

    # nacitanie dat z mpar, mos, mud, mzl a kalendara mkalh,mkalr pre pid (osobne cislo)
    mpar = pgFunctions.get_par( pdat )  # popis navratovej hodnoty je vo funkcii
    mos  = pgFunctions.get_mos( pid  )  # osc[0][1] os.cis., [6]-activ(0,1), [44]-d.nastupu, [45]-d.ukon.
    mud  = pgFunctions.get_mud( pid  , pdat )  # 5 - kal | 6 - uvazok | 7 - preplatenie sviatku P - priemer , T - tarif | 9,10,11 - zniz.prac.sch. | 16 - druh dochodku|17,18 - pocet deti | 20 - dan.banus| 21 - nezd.cast.dane | 22 - zdr.poistovna | 23,24,25,26 poist.zam | 27,28,29,30 poi.pod | 31-odbory |
    mzl1 = pgFunctions.get_mzl1( pid , pdat )  # vrati mzl(11 poli)+mkod(53 poli)
    fpd  = pgFunctions.get_fpd( pdat , mud[0][5] )  # vrati hodnoty z kalendara pre mesacne casove udaje pre fond pracovnej doby (fpd)
 
    mos_id  = mos[0][0]  # typ integer
    mos_osc = mos[0][1]  # typ integer
    aktivny = mos[0][6]  # typ boolean
    mos_datum_nastup = mos[0][41].strftime('%Y-%m-%d')  # typ string
    mos_datum_ukonc = mos[0][42].strftime('%Y-%m-%d')  # typ string
    s_platzakl = mud[0][32]
    druh_mzdy = mud[0][4]
    
    v_pracuje = ( aktivny and not( ( assistant.eom(pdat) < mos_datum_nastup ) or  ( pdat > mos_datum_ukonc ) ))  # test ci pracuje podla datumov nastupu a ukoncenia a ci je oznaceny v mos_active==1 

    if v_pracuje:
        v_priemer_dovolenka = pgFunctions.get_priemd( pid, pdat )  # nacitaj aktualne platny priemer, ak neexistuje vypocitaj
    else:
        return(1)
       
    p_deti_od6 = mud[0][17]  # pocet deti z mud viac ako 6 rokov 
    p_deti_do6 = mud[0][18]  # pocet deti z mud menej ako 6 rokov 

    fpd_kal = fpd[0][0]  # cislo kalendara  
    fpd_ka1popis  = fpd[0][1]  # popis kalendara
    fpd_pphodm = fpd[0][3]  # priem. pocet hodin za mesiac z kalendara
    fpd_pphodw = fpd[0][4]  # priem. pocet hodin za tyzden z kalendara
    fpd_priem_poc_hod_den = fpd[0][5]  # priem. pocet hodin za den z kalendara     
    fpd_pomerphodd = fpd[0][6]  # pomerny pocet hodin z kalendara za den (podla uvazku z kalendara)
    fpd_ppdw = fpd[0][7]  # pocet dni pracovnych v tyzdni z kalendara
    fpd_dnip = fpd[0][10]  # pocet dni pracovnych z kalendara (nie odpracovanych) je to fpd z kalendara
    fpd_hodp = fpd[0][11]  # pocet hod pracovnych z kalendara
    fpd_dnis = fpd[0][12]  # pocet dni sviatkov z kalendara
    fpd_hods = fpd[0][13]  # pocet hodin sviatkov z kalendara
    fpd_hod  = fpd_hodp + fpd_hods  # fpd hod za mesiac aj so sviatkami
    fpd_dni  = fpd_dnip + fpd_dnis  # fpd dni za mesiac aj so sviatkami        
    dni_mes  = calendar.monthrange(rokp,mesp)[1]  # celkovy pocet dni v mesiaci
    v_preplateny_sviatok_hod = fpd_hods
## zisti tarif
    if ( (druh_mzdy == 'M') and ( s_platzakl >0) ):
            v_tarif_na_hod = s_platzakl / fpd_pphodm  # vypocet suma na hodinu z mesacneho platu / priemer.pocet hodin z kalendara 
    elif  ( (druh_mzdy == 'H') and ( s_platzakl >0) ): 
            v_tarif_na_hod = s_platzakl   # vypocet suma na hodinu z mesacneho platu / priemer.pocet hodin z kalendara 
            s_platzakl = s_platzakl * fpd_hod  #NOTE: vypocet zakladneho platu z hodinovej sadzby
    else:
        print('Nema zakladny plat.')


## napocet kodov
    i=0
    for row in mzl1:
        mzl_idosc   = row[1]
        mzl_kod     =  row[2];
        mzl_kodext     = row[3];
        mzl_datumod = row[4].strftime('%Y-%m-%d');
        mzl_datumdo   = row[5].strftime('%Y-%m-%d')
        mkod_typ_hak = row[23];
        mkod_zniz_hod_sviatku = row[24]
        mkod_algkoe = row[25]
        mkod_algmesn  = row[26]
        mkod_algtarif  = row[27]
        mkod_algpls  = row[28]
        mkod_pozhod = row[36]
        mkod_pozkor  = row[37]
        mkod_pozdni   = row[38]
        mkod_pozpoc = row[39]
        mkod_prgnemoc = row[40]
        mkod_nemocsadzba1 = row[41]
        mkod_nemocdni1 = row[42]
        mkod_nemocsadzba2 = row[43]
        mkod_nemocdni2 = row[44]

        if ( mkod_typ_hak == 'A' and mzl_kod not in (1110,1120,1130)):  # pre kody 'A' zapis sumu do vektora vyoctu 
            v[mkod_pozkor] = v[mkod_pozkor]

        if (mkod_typ_hak == 'D'):

            if ( mzl_datumod < pdat ):  # test ci datum_od daneho kodu zo zloziek je mensi ako aktualne obdobie 
                v_datumod = pdat
            else:
                v_datumod = mzl_datumod

            if ( mzl_datumdo > assistant.eom( pdat )):  ## test ci datum_do daneho kodu zo zloziek je vacsi ako posledny den v mesiaci aktualneho obdobia 
                v_datumdo = assistant.eom( pdat )
            else:
                v_datumdo = mzl_datumdo
            
            kod_dniahod = pgFunctions.get_dni_hod( v_datumod , v_datumdo , fpd_kal )  # vrati list ktory bsahuje pocet dni a hodin pracovnych a sviatkovpre dany kod z m.zlozky a kalendar
            
            v_pracdni  =  kod_dniahod[0]  # dni pracovne celkom pre kod
            v_prachod  =  kod_dniahod[1]  # hod pracovne celkom pre kod            
            v_sviatdni =  kod_dniahod[2]  # dni sviatkov celkom pre kod
            v_sviathod =  kod_dniahod[3]  # hod sviatkov celkom pre kod
            v_pocetdni =  kod_dniahod[4]  # pocet dni v_datumod az v_datumdo
            
            
            if ( mkod_zniz_hod_sviatku ):
                v_preplateny_sviatok_hod = v_preplateny_sviatok_hod - v_sviathod * 100 / 100  # prva 100 je uvazok z mud
          
            if ( mkod_algmesn > 0):
                v_tarif = v_priemer_dovolenka * mkod_algmesn / 100
            if ( mkod_algtarif > 0):
                v_tarif = v_tarif_na_hod * mkod_algtarif / 100
                
            if( mkod_pozhod > 0 ): 
                v[mkod_pozhod] = v[mkod_pozhod] + v_prachod
                v_neodphod     = v_neodphod     + v_prachod
                
            if( mkod_pozkor > 0 ):
                
                if ( mkod_prgnemoc ):
                    v_priemer_nemoc = pgFunctions.get_priemn( pid, pdat, mpar[0][60] )  # nacitaj platny priemer pre nemoc, ak neexistuje vypocitaj, mpar[0][60] - max.denny VZ
                    kod_dniahod1 = pgFunctions.get_dni_hod( mzl_datumod , assistant.eom(assistant.addday(pdat,-4)) , fpd_kal )    # zisti ci dany kod bol zadany aj predchadzajucom mesiaci a kolko ni      
                    v_pocetdni_pred = kod_dniahod1[4]
                        
                    dni1m=0 ; dni2m=0 ; dni1=0; dni2=0
                        
                    if (v_pocetdni_pred > 3): 
                        dni1m = 3
                    else:
                        dni1m = v_pocetdni_pred
                        
                    if (v_pocetdni_pred <= 10 ): 
                        if ( v_pocetdni_pred >=3 ):
                            dni2m = v_pocetdni_pred - 3
                        else:
                            dni2m = 0
                    else:
                        dni2m = 7
                        
                    if ( v_pocetdni >= ( 3 - dni1m ) ):
                        dni1 = 3 - dni1m
                    else:
                        dni1 = v_pocetdni
                        
                    if ( v_pocetdni >= ( 10 - dni1m - dni2m ) ):
                        dni2 = 10 - dni1m - dni2m - dni1
                    else:
                        dni2 = v_pocetdni - dni1
                        
                    v_suma = round((dni1 * v_priemer_nemoc * mkod_nemocsadzba1 * fpd_priem_poc_hod_den / 100 + dni2 * v_priemer_nemoc * mkod_nemocsadzba2 * fpd_priem_poc_hod_den / 100 ),2)
                else: 
                    v_suma = round((v_prachod * v_tarif),2)  # prepocet sumy podla zadaneho algoritmu
                
                v[mkod_pozkor] = v[mkod_pozkor] + v_suma
            
            if( mkod_pozdni > 0 ): 
                v[mkod_pozdni] = v[mkod_pozdni] + v_prachod / fpd_priem_poc_hod_den  #                               
                v_neodpdni     = v_neodpdni     + v_prachod  / fpd_priem_poc_hod_den

            
        if (( mzl_kod == 500 ) and ( mzl_datumod <= pdat ) and ( assistant.eom( pdat ) <= mzl_datumdo )):  #TRIM (Kod pripadu) = '500' AND Od <= p obdobie AND EOM (p obdobie) <= Do
            v_500 = True    
        i += 1  # pripocita riadok
        
    ## vypocet mzdy po spracovani kodov            
    ## Zapis do vektora dni odpracovane  
    v[10] = fpd_dni  # fond prac.doby dni
    if (( fpd_dnip - v_neodpdni ) < 0 ):  # ak pocet pracovnych dni v mesiaci - neodpracovane dni < 0
        v[11] = fpd_dnip - v_neodpdni  # odpracovae dni
    else: 
        v[11]=0.0
    v[13] = fpd_dnis  # zapis do pomocneho vektora vypoctu v dni sviatku
    ## Zapis do vektora hodiny odpracovane
    v[50] = fpd_hod  # fond prac.doby hod
    
    if ((fpd_hodp - v_neodphod-v_preplateny_sviatok_hod) < 0 ):  # test ci sa nedostavam do minusu s hodinami odpracovanymi po odpocte neodpracovanych hodin
        v[51] = 0.0  # odpracovane hodiny
    else:
        v[51] = fpd_hodp - v_neodphod - v_preplateny_sviatok_hod
    v[53] = fpd_hods  # zapis do pomocneho vektora vypoctu v hod.sviatky
    ## Zapis do vektora sumy odpracovane
    v[100] = s_platzakl  # tarifny plat 
    v[101] = round(  s_platzakl / fpd_hod * ( fpd_hodp - v_neodphod ), 2)  # suma za odpracovane hodiny z tarifu
    
    if ( mud[0][8] == 'T' ):
        v[123] = round(( s_platzakl / fpd_hod * fpd_hods ) ,2 )  # preplatenie sviatku suma platom
    else:
        v[123] = round(( v_priemer_dovolenka * fpd_hods    ) ,2 )  # preplatenie sviatku priemerom

## vypocet odvodov
    # napocet VZ_ZP z mmsk par1 - zostava par2 - riadok 
    VZ_ZP  = pgFunctions.get_msk_suma( 100 , 2 , v )  #TODO: test zaokruhlenia
    VZ_SP = pgFunctions.get_msk_suma( 100 , 3 , v ) 
    VZ_UP = VZ_SP  # neohraniceny VZ pre urazove poistenie
    
    if ( VZ_SP > mpar[0][40] ):  # kontrola hranice VZ SP
        VZ_SP = mpar[0][40]  # a je vacsi, tak maximalne ten co je v parametroch

    VZ_NP  = VZ_SP; VZ_DPs = VZ_SP; VZ_DPi = VZ_SP; VZ_PvN = VZ_SP; VZ_GP  = VZ_SP; VZ_RF  = VZ_SP 
    
    # vypocet poistneho - zohladnuje sa nastavenie v mud poistnie A/N, invalidita, dochodca a pod. , parametre v mpar 
    # zaokruhlenie odvodov je na najblizsi eurocent nadol. napr. 5.051 -> 5.05, 5.05999 -> 5.05 ??? Otazka je ci len pre Zam alebo aj Pod !!!
    # Odpocitatelna polozka ZP = [380 - ((prijem zo zarobkovej cinnosti - 380) * 2) / pocet dni mesiaca] * ppcet odpracovanych dni 
    # DPi - poistenec, ktory je dochodkovo poisteny po priznani starobneho dochodku alebo predcasneho starobneho dochodku alebo ak je poberatelom vysluhoveho dochodku podla osobitneho predpisu a dovrsil dochodkovy vek neplati DPi
    # DPi - zamestnavatel za zamestnanca, ktory je dochodkovo poisteny po priznani starobneho dochodku alebo predcasneho starobneho dochodku alebo ak je poberatelom vysluhoveho dochodku a dovrsil dochodkovy vek neplati DPi.
    
    if (mud[0][23] ):
        ZPzam  = assistant.roundown( (VZ_ZP  * mpar[0][14] / 100 ) , 2 )
    else:
        ZPzam = 0.0
        
    if (mud[0][24] ):
        NPzam  = assistant.roundown( (VZ_NP  * mpar[0][15] / 100 ) , 2 )
    else:
        NPzam = 0.0        

    if (mud[0][25] ):
        DPszam = assistant.roundown( (VZ_DPs * mpar[0][16] / 100 ) , 2 )
        DPizam = assistant.roundown( (VZ_DPi * mpar[0][17] / 100 ) , 2 )
    else:
        DPszam = 0.0
        DPizam = 0.0
    
    if (mud[0][26] ):
        PvNzam = assistant.roundown( (VZ_PvN * mpar[0][18] / 100 ) , 2 )
    else:
        PvNzam = 0.0
    
    if (mud[0][27] ):
        ZPpod  = assistant.roundown( (VZ_ZP  * mpar[0][19] / 100 ) , 2 )
    else:
        ZPpod = 0.0
    
    if (mud[0][28] ):
        NPpod  = assistant.roundown( (VZ_NP  * mpar[0][20] / 100 ) , 2 )
    else:
        NPpod = 0.0
    
    if (mud[0][29] ):
        DPspod = assistant.roundown( (VZ_DPs * mpar[0][21] / 100 ) , 2 )
        DPipod = assistant.roundown( (VZ_DPi * mpar[0][22] / 100 ) , 2 )
    else:
        DPspod = 0.0
        DPipod = 0.0
        
    if (mud[0][30] ):
        PvNpod = assistant.roundown( (VZ_PvN * mpar[0][23] / 100 ) , 2 )
    else:
        PvNpod = 0.0

    # ak student alebo dochodca do 200eur,tak neplati zamestnavatel 
    GPpod  = assistant.roundown( (VZ_GP * mpar[0][24] / 100 ) , 2 )  # TODO: overit zaokruhlenie
    RFpod  = assistant.roundown( (VZ_RF * mpar[0][25] / 100 ) , 2 )
    UPpod  = assistant.roundown( (VZ_UP * mpar[0][26] / 100 ) , 2 )
    # zapis odvodov do vektora v
    v[151] = v[151] + ZPzam
    v[152] = v[152] + NPzam
    v[153] = v[153] + DPszam
    v[154] = v[154] + DPizam
    v[155] = v[155] + PvNzam
    v[161] = v[161] + ZPpod 
    v[162] = v[162] + NPpod
    v[163] = v[163] + DPspod
    v[164] = v[164] + DPipod
    v[165] = v[165] + PvNpod
    v[166] = v[166] + GPpod
    v[167] = v[167] + RFpod
    v[168] = v[168] + UPpod
    v[171] = VZ_ZP; v[172] = VZ_NP; v[173] = VZ_DPs; v[174] = VZ_DPi; v[175] = VZ_PvN; v[176] = VZ_GP ; v[177] = VZ_RF; v[178] = VZ_UP                 
## vypocet odvodov end


## dane 
    # Zakl.dane 181  Nezd.Cast 182  Uprava zakl.DDS 183  Uprava zakl.ZS 184  Uprava zakl.AUTO 185 Ine 186
    # Dan mes.  190  Dan roc.  191  Oprava z min.r. 192  Rozd. z r.zuc. 193  Dan.bonus 194
    # dan sa zaokruhluje na najblizsi eurocent nadol
    
    if ( mud[0][20] ):  # ak ma nastavene ze si uplatnuje danovy bonus v mzdovych udajoch
        if (p_deti_do6>0):  # ak ma pocet deti do 6 rokov 
            s_danbonus = s_danbonus + mpar[0][53] * p_deti_od6 * 2  # mpar[0][43] -danovy bonus mesacny
        if (p_deti_od6>0):
            s_danbonus = s_danbonus + mpar[0][53] * p_deti_od6  #NOTE: od 1.4.2019 deti do 6 r. dvojnas. bonus | rocny dan.bonus z mpar / 12 * pocet deti z mud
        
    if ( mud[0][21] ):  # ak si uplatnuje nezd.cast zakl.dane mesacnu
        s_nezdcastzdane = mpar[0][51]  # nezd.cast mesacna
    else: 
        s_nezdcastzdane = 0.0
    
    s_ciast_zaklad_dane1 = pgFunctions.get_msk_suma( 100 , 6 , v )  # napocet podla mmsk
    s_ciast_zaklad_dane = round(s_ciast_zaklad_dane1 - s_nezdcastzdane - s_zivpoist - s_dds + s_auto + s_odpocetost,2)

    if ( s_ciast_zaklad_dane < 0.0 ):
        s_ciast_zaklad_dane = 0.0
        
    # rozdelenie na 19% dan a 25% dan - ak je nczd > ako 176.8 nasobok ziv.minima / 12
    hranica = round( mpar[0][70] * mpar[0][50] / 12 , 2 )  # mpar[0][69] - nasobok , mpar[0][50] - rocna nezd.cast zakl.dane
    
    if ( s_ciast_zaklad_dane > hranica ):
    
        s_czd1 = hranica
        s_czd2 = round(s_ciast_zaklad_dane - hranica,2)
        
    else:
        s_czd1 = s_ciast_zaklad_dane
        s_czd2 = 0.0
         
    s_dan_mes = assistant.roundown(( s_czd1  * mpar[0][44] / 100  + s_czd2  *  mpar[0][45] / 100 ) , 2)

    if (s_dan_mes < 0 ):
        s_dan_mes = 0.0 
    
    # zapis dane do vektora v
    v[181] = s_ciast_zaklad_dane   
    v[182] = s_nezdcastzdane  # NOTE: overit
    v[183] = v[183] + s_dds
    v[184] = v[184] + s_zivpoist
    v[185] = v[185] + s_auto
    v[186] = v[186] + s_odpocetost
    
    v[190] = v[190] + s_dan_mes
    v[191] = v[191] + s_dan_roc
    v[192] = v[192] + s_opravadaneminr
    v[193] = v[193] + s_rozdielzrch
    v[194] = v[194] + s_danbonus
# dane end
    v[240] = pgFunctions.get_msk_suma( 100 , 100 , v )  # napocet podla mmsk 100 - skupina zobrazenia, 100 - pozicia - Hruba mzda
    v[241] = pgFunctions.get_msk_suma( 100 , 110 , v )  # napocet podla mmsk 100 - skupina zobrazenia, 110 - pozicia - Cista mzda

## zrazky
    #TODO: doplnit spracovanie kodov zrazok
    s_vyplata = pgFunctions.get_msk_suma ( 100 , 111 , v )  # na ucet
    if ( l_vyplata == 'B' ):
        v[210] = s_vyplata
    if ( l_vyplata == 'H' ):
        v[211] = s_vyplata  # do sacku
    if ( l_vyplata == 'P' ):
        v[212] = s_vyplata  # postou
## zrazky end
    pgFunctions.zapis_mvy( pid, pdat, v)  # uloz vypocitane udaje do databazy
    return 0
