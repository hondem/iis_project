#!/usr/bin/python
# -*- encoding: utf-8 -*-
from datetime import datetime
import calendar
import psycopg2
import math
import assistant
import urlparse # for python 3+ use: from urllib.parse import urlparse
import os 

#######################################################################################
# funkcia runpsql( psql:string ) - make conection to database an run sql statement
#                                - result: tuple with returned data
#######################################################################################
def runpsql(psql):
    try:
        result = urlparse.urlparse(os.environ.get('DB_URI'))
        username = result.username
        password = result.password
        database = result.path[1:]
        hostname = result.hostname
        connection = psycopg2.connect(
            database = database,
            user = username,
            password = password,
            host = hostname
        )

        cursor = connection.cursor()


        cursor.execute(psql)
        vysl = cursor.fetchall()
        connection.commit()
        connection.close()
        return(vysl)
    
    except(Exception, psycopg2.Error) as error :
        print ("Error while connecting to PostgreSQL", error)
   
    finally:
        if(connection):
            cursor.close()
            connection.close()

def runpsql1(psql):
    try:
        result = urlparse.urlparse(os.environ.get('DB_URI'))
        username = result.username
        password = result.password
        database = result.path[1:]
        hostname = result.hostname
        connection = psycopg2.connect(
            database = database,
            user = username,
            password = password,
            host = hostname
        )
        
        cursor = connection.cursor()

        cursor.execute( psql )

        connection.commit()
        count = cursor.rowcount

    except (Exception, psycopg2.Error) as error :
        print("Failed to insert record into mobile table", error)

    finally:
        if(connection):
            cursor.close()
            connection.close()



##############################################################################
### Funkcia get_fpd( pdat:datum, pkal:integer) 
###     input:  1. obdobie, ktore predstavuje datum napr. 2019-01-01
###             2. kalendar - poradove cislo kalendara z tabulky mkah,mkar
###     output  tuple() s udajmi:
###             1. cislo kalendara
###             2. nazov kalendara 
###             3. typ kalendara (mkar_typ)
###             4. priemerny poc.hod. za mesiac mkar_mhod
###             5. priemerny pocet hod. za tyzden mkar_thod
###             6. pocet hodin za den
###             7. pomerny poc hod. za den
###             8. priemerny pocet prac dni za tyzden
###             9. uvazok v percentach
###             10. poznamka
###             11. pocet prac.dni za mesiac
###             12. pocet prac.hod. za mesiac
###             13. pocet dni sviatok za mesiac
###             14. pocet sviatky hod. za mesiac
##############################################################################
def get_fpd( pdat, pkal ):
    sql = 'select m.kalendar_typ.id, m.kalendar_typ.nazov,m.kalendar_typ.typ,m.kalendar_typ.mesiac_hod,m.kalendar_typ.tyzden_hod,m.kalendar_typ.den_hod,m.kalendar_typ.pomer_hod,m.kalendar_typ.dni_v_tyzdni,m.kalendar_typ.dni_v_mes,m.kalendar_typ.pozn, sum(pracovne_dni) as pdni, sum(pracovne_hod) as phod, sum(sviatky_dni) as sdni, sum(sviatky_hod) as shod \
    from m.kalendar_typ, m.kalendar \
    where m.kalendar_typ.id = m.kalendar.typ and m.kalendar.typ='+str(pkal)+'and m.kalendar.datum >= '+'\''+pdat+'\''+' and m.kalendar.datum<='+'\''+assistant.eom(pdat)+'\''+' \
    group by m.kalendar_typ.id, m.kalendar_typ.nazov, m.kalendar_typ.typ, m.kalendar_typ.mesiac_hod, m.kalendar_typ.tyzden_hod, m.kalendar_typ.den_hod, m.kalendar_typ.pomer_hod,m.kalendar_typ.dni_v_tyzdni,m.kalendar_typ.dni_v_mes,m.kalendar_typ.pozn'

    a=runpsql(sql)
    return a    

#############################################################################
#     Funkcia get_dni_hod ( pdat1: str , pdat2: str ,  pkal : integer ) 
#                                       
#     output: vrati pocet dni a hodin za dany rozsah datumov a kalendar 
#############################################################################
def get_dni_hod( pdat1, pdat2, pkal ):
    sql = 'select sum(pracovne_dni) as pdni, sum(pracovne_hod) as phod, sum(sviatky_dni) as sdni, sum(sviatky_hod) as shod, count(*) as pocet \
    from m.kalendar \
    where typ='+str(pkal)+' and datum >= '+'\''+pdat1+'\''+' and datum <= '+'\''+pdat2+'\''
    a=runpsql(sql)
    
    return(a[0])

##################################################################################################
#   Funkcia get_par ( pdat : str ) - vrati list() aktualne nastavenie param. miezd podla datumu
#   
#   Vracia list x[0][0] - por.cislo zaznamu v tabulke mpar
#               x[0][1] - datum od ktoreho platia dane parametre
#               x[0][2] - ICO 
#               x[0][3] - Nazov firmy
#               x[0][4] - DIC
#               x[0][5] - ICDPH
#               x[0][6] - Adresa1-ulica
#               x[0][7] - Adresa2-
#               x[0][8] - Adresa3-
#               x[0][9] - Adresa4-
#               x[0][10] -Adresa5- 
#               x[0][11] -PSC 
#               x[0][12] -kod banky 
#               x[0][13] -bank.ucet 
#               x[0][14] -ZP zam % 
#               x[0][15] -NP zam %
#               x[0][16] -DPs zam %
#               x[0][17] -DPi zam % 
#               x[0][18] -PvN zam % 
#               x[0][19] -ZP pod % 
#               x[0][20] -NP pod % 
#               x[0][21] -DPs pod % 
#               x[0][22] -DPi pod %
#               x[0][23] -PvN pod % 
#               x[0][24] -GP pod % 
#               x[0][25] -UP pod % 
#               x[0][26] -RF pod % 
#               x[0][27] -SF pod % 
#               x[0][28] -min.mzda hodinova kat 1 
#               x[0][29] -mm hod kat 2 
#               x[0][30] -mm hod kat 3 
#               x[0][31] -mm hod kat 4 
#               x[0][32] -mm hod kat 5 
#               x[0][33] -mm hod kat 6 
#               x[0][34] -Min. mzda mesacna kat 1 
#               x[0][35] -mm mes kat2 
#               x[0][36] -mm mes kat3 
#               x[0][37] -mm mes kat4 
#               x[0][38] -mm mes kat5 
#               x[0][39] -mm mes kat6 
#               x[0][40] -max.VZ pre SP 
#               x[0][41] -ziv. minimum 
#               x[0][42] -ziv. minimum1 n adalsiu posudz.odobu 
#               x[0][43] -ziv. minimum2 na dieta
#               x[0][44] -dan1 % 
#               x[0][45] -dan2 % 
#               x[0][46] -dan z dividend % 
#               x[0][47] -dan rezident % 
#               x[0][48] -dan nerezident % 
#               x[0][49] -dan us.cinitelia % 
#               x[0][50] -nezd.cast.zakladu dane rocna 
#               x[0][51] -nezd.cast zakladu dane mesacna 
#               x[0][52] -rszpdb 
#               x[0][53] -rocna sadzba dan.bonus dieta od 6.r
#               x[0][54] -(hzpdp) rozna sadzba dan. bonus dieta do 6.r 
#               x[0][55] -mmmpd 
#               x[0][56] -ovstud - oslobodeny prijem student
#               x[0][57] -ovdoch - odlobodeny prijem dochodca
#               x[0][58] -mopzp
#                   [59] -maxdvzr - maximalny denny vzr
#                   [60] -nahrkm 
#                   [61] -min. stravne
#                   [62] -strav0
#                   [63] -strav1
#                   [64] -strav2
#                   [65] -strav3
#                   [66] - 13 plat odlobodeny obdobie 1
#                   [67] - 13 plat odlobodeny obdobie 2
#                   [68] - 13 plat odlobodeny obdobie 3
#                   [69] - nasobok ziv.min. pre rozdelenie zakladu dane na 19% a 25%  (176.8)
##################################################################################################
def get_par(pdat): 
    sql='select * from m.parametre where datum<='+'\''+pdat+'\''+' order by datum desc LIMIT 1'
    x=runpsql(sql)
    return x



#########################################################################################################
#   Funkcia get_mzl1 ( pid : integer, pdat : str ) - vrati list, ktory obsahuje zaznamy z mzl pre zadane
#                                                    jedno osc a pdat (aktualne obdobie) aj s mkod
#########################################################################################################
def get_mzl1( pid, pdat ):
    sql = 'select * from m.zlozky,m.kody where m.zlozky.kod = m.kody.id and os_id=' + str( pid )+' and datum_od<='+'\''+assistant.eom(pdat)+'\''+' and datum_do>='+'\''+pdat+'\''+' order by kod'
    vysl = runpsql( sql )
    return vysl

#########################################################################################################
#   Funkcia get_mud ( pid : integer, pdat : str ) -vrati list, ktory obsahuje zaznam z mud pre zadany
#                                                    posc a pdat (aktualne obdobie)
#########################################################################################################
def get_mud( pid, pdat ):
    sql = 'select * from m.udaje where id=' + str( pid )+' and platnost_od<='+'\''+pdat+'\''+' LIMIT 1'
    vysl = runpsql( sql )
    return vysl

#########################################################################################################
#   Funkcia get_osc ( pid  : integer ) - vrati list, ktory obsahuje 6 udajov z mos pre zadane posc 
#                                        pid - m.osoba.id
#########################################################################################################
def get_osc( pid ):
    sql = 'select osobne_cislo, meno, priezvisko, nastup, ukoncenie, aktivny from m.osoba where id='+str(pid)
    vysl=runpsql(sql)
    return vysl

#########################################################################################################
#   Funkcia get_mos ( pid  : integer ) - vrati list, ktory obsahuje cely zaznam z mos pre zadane posc 
#########################################################################################################
def get_mos( pid  ):
    sql = 'select * from m.osoba where id='+str(pid)
    vysl=runpsql(sql)
    return vysl

#########################################################################################################
#   Funkcia get_oscall ( pdat : str ) - vrati list zaznamov z tabulky mosc zotriedeny podla osc
#########################################################################################################
def get_oscall():
    sql = 'select id , meno, priezvisko, nastup, ukoncenie, aktivny, osobne_cislo from m.osoba order by osobne_cislo'
    vysl=runpsql(sql)
    return vysl

#########################################################################################################
#   Funkcia get_oscaktiv ( pdat : str ) - vrati list zaznamov z mosc, ktore su aktivne
#
#   pozn. prehodnotit podmienku selectu, ci by nebolo vhodne tam nechat len aktivne a netestovat datumy!!
#########################################################################################################
def get_oscaktiv( pdat ):
    sql = 'select id , meno, priezvisko, nastup, ukoncenie, osobne_cislo from m.osoba where aktivny='+'\''+'t'+'\''+' and nastup>='+str(pdat)+' and ukoncenie>='+str(pdat)+' order by 2'
    vysl=runpsql(sql)
    return vysl

########################################################################################################
#  Funkcia zapis_mvy ( pid : integer , pdat : str , v : list )  -  1.par OSC
#                                                                   2.par Obdobie
#                                                                   3.par list of 250 values
#  Output: 0 - chyba, 1 - zapis do tabulky ok
########################################################################################################
def zapis_mvy( pid, pdat, vektor):
    svektor=''
    vysl = 0
    
    # test na existenciu zaznamu
    sql='select count(*) from m.vypocet where id='+str(pid)+' and obdobie='+'\''+pdat+'\''
    vysl = runpsql(sql)
    existuje = vysl[0][0]
    
    for i in range(250):
        svektor=svektor+str(vektor[i])+';'
    if len(svektor)>2000:
        vysl=-1
    else:
        if existuje:
            sql='update m.vypocet set vektor = '+'\''+svektor+'\''+' where id='+str(pid)+' and obdobie='+'\''+pdat+'\''
            vysl=runpsql1(sql)
        else:
            sql = 'insert into m.vypocet (id,obdobie,vektor,dovolenkovy_priemer, nemocensky_priemer) VALUES ('+str(pid)+ \
            ','+'\''+pdat+'\''+','+'\''+svektor+'\''+','+'0.0,0.0'+')'
            vysl=runpsql1(sql)
    return vysl

########################################################################################################
#  Funkcia zapis_mvy1 ( pid : integer , pdat : str , v : list )  -  1.par OSC
#                                                                   2.par Obdobie
#                                                                   3.par list of 250 values
#  Output: 0 - chyba, 1 - zapis do tabulky ok
########################################################################################################
def zapis_mvy1( pid, pdat, vektor):
    svektor=''
    vysl = 0
    
    # test na existenciu zaznamu
    sql='select count(*) from m.vypocet where id='+str(pid)+' and obdobie='+'\''+pdat+'\''
    vysl = runpsql(sql)
    existuje = vysl[0][0]
    
    for i in range(250):
        svektor=svektor+str(vektor[i])+';'
    if len(svektor)>2000:
        vysl=-1
    else:
        if existuje:
            sql='update m.vypocet set vektor = '+'\''+svektor+'\''+' where id='+str(pid)+' and obdobie='+'\''+pdat+'\''
            vysl=runpsql1(sql)
        else:
            sql = 'insert into m.vypocet (id,obdobie,vektor,dovolenkovy_priemer, nemocensky_priemer) VALUES ('+str(pid)+ \
            ','+'\''+pdat+'\''+','+'\''+svektor+'\''+','+'0.0,0.0'+')'
            vysl=runpsql1(sql)
    return vysl


########################################################################################################
#  Funkcia get_mvy ( pid : integer , pdat : str  )  -  1.par OSC
#                                                        2.par Obdobie
#  Output: list of mvy_vekt ( list of floats )
########################################################################################################
def get_mvy( pid, pdat):

        vysls='';        
        sql='select vektor from m.vypocet where id='+str(pid)+' and obdobie = '+'\''+pdat+'\''
        vysls=''.join(runpsql(sql)[0])  #konverzia tuple[0] na retazec
        vysll=vysls.split(';')         # rozdelenie retazca na list retazcov podla oddelovaca ';'
        vysll1=[float(i) for i in vysll[:-1]]  # konverzia na list float(ov)

        return vysll1

########################################################################################################
#  Funkcia get_mvy1 ( pid : integer , pdat : str  )  -  1.par OSC
#                                                        2.par Obdobie
#  Output: list of mvy_vekt ( list of floats )
########################################################################################################
def get_mvy1( pid, pdat):

        vysls='';        
        sql='select vektor from m.vypocet where id='+str(pid)+' and obdobie = '+'\''+pdat+'\''
        vysls=''.join(runpsql(sql)[0])  #konverzia tuple[0] na retazec
        vysll=vysls.split(';')         # rozdelenie retazca na list retazcov podla oddelovaca ';'
        vysll1=[float(i) for i in vysll[:-1]]  # konverzia na list float(ov)

        return vysll1

##########################################################################################
#   Funkcia get_mmsk ( pid : int , pdat : datum , pzost : int , priad : int , vekt : list[250])
#     - v je list vypocitanych hodnot bud z mvy alebo premennej
#     -  vrati sum napoctu z vektora
##########################################################################################
def get_msk_suma( pzost, priad, vekt):

        suma = 0.0

        sql='select * from m.masky where skupina_zobrazenia='+str(pzost)+' and pozicia='+str(priad)
        mmsk = runpsql( sql )
        
        for i in range(5,155):
        
            poz = mmsk[0][i]
            
            if (poz == 0):
                continue
            else:                
                if (i<105):
                    suma = suma + vekt[poz]
                else: 
                    suma = suma - vekt[poz]
        return round(suma,2)

###################################################################################################
# Funkcia get_priemd( pid : integer, pdat : str ) - funkcia vracia dov.priemer, ak neexistuje 
#                                                    spocita pravdepodobny, alebo novy ak je 
#                                                    1,4,7,9 mesiac 
# output: float
#
# TODO: ak neexistuje priemer v m.vypocet pre aktualne obdobie, nacitaj ho z predchadzajuceho mesiaca
#       ak mesiac(pdat) in (2,3,5,6,8,9,11,12). 
#       ak mesiac(pdat) in (1,4,7,10) alebo ak neexistuje ani v predchadzajucom mesiaci, tak spocitaj
#        priemer z predchadzajuceho kvartalu    
###################################################################################################
def get_priemd( pid, pdat ):
    ## ak je mesiac 1,4,7,9 tak spocitaj novy priemer
    try:    
        sql = 'select dovolenkovy_priemer from m.vypocet where id='+str(pid)+' and obdobie='+'\''+pdat+'\''
        vyslf = runpsql(sql)[0][0]

        if ( vyslf <= 0.0 ):
            vyslf=2.989  # minimalna mzda
        return vyslf

    except:
        return 2.989  # minimalna mzda


###################################################################################################
# Funkcia get_priemn( pid : integer, pdat : str, pmax: float ) - funkcia vracia dov.priemer, ak neexistuje 
#                                                    spocita pravdepodobny, alebo novy ak je 
#                                                    1,4,7,9 mesiac 
# output: float
#
# TODO: doplnit spravny vypocet nemocenskeho priemeru
#
###################################################################################################
def get_priemn( pid, pdat, pmax ):

    try:
        sql = 'select nemocensky_priemer from m.vypocet where id='+str(pid)+' and obdobie='+'\''+pdat+'\''
        vyslf = runpsql(sql)[0][0]

        if ( vyslf <= 0.0 ):
            vyslf=2.989  # minimalna mzda
        return vyslf
    except:
        return 2.989
