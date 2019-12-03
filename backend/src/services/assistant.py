import math
######################################################################################
# funkcia poc_dni_vmes1 ( pdat : str ) - vrati pocet dni v mesiaci 
#                                         (pdat je tvare 'YYYY-MM-DD')
######################################################################################
def poc_dni_vmes1( pdat ):

    prok = int(pdat[:4])
    pmes = int(pdat[5:7])

    if pmes in ( 1,3,5,7,8,10,12 ):
        return 31

    if pmes in (4,6,9,11):
        return 30

    if pmes == 2:
        if prok % 4 == 0 :
            return 29
        else:
            return 28

######################################################################################
# funkcia eom( pdat : str ) - vrati datum konca mesiaca
######################################################################################
def eom( pdat ):
    rok = pdat[:4]
    mes = pdat[5:7]
    
    ret = str(rok)+'-'+str(mes)+'-'+str(poc_dni_vmes1(pdat))
    return ret


######################################################################################
# funkcia roundown ( pf : float , pdes : integer ) - vrati float 
#
# 1. par  - pf   - cislo ktore treba zaoktuhlit
# 2. par  - pdes - pocet desatinnych miest na ktore sa ma zaokruhlit nadol 
#
# napr. roundown( 17.589 ) = 17.58 
######################################################################################
def roundown( pf , pdes ):
    ret = 0.0
       
    nasob = math.pow( 10, pdes )
    ret = math.floor( pf * nasob ) / nasob
    
    return ret
    
    
######################################################################################
# funkcia addday( pdat : str, pdni : integer ) - pripocita +-dni k datumu
# TODO: nefunguje napr. -32 dni ak obdobie je 1/10/2019
# vrati retazec datumu v tvare "YYYY-MM-DD"
######################################################################################
def addday( pdat, pdni ):
    
    if ( pdni > 0 ):
        log = 1
    elif ( pdni < 0 ): 
        log = -1
    else:
        log = 0
        
    i = pdni;
    
    rok = int(pdat[:4])
    mes = int(pdat[5:7])
    den = int(pdat[8:10])

    while (i != 0):
        if ( den != 0 ):
            den = den + 1 * log
            i = i - 1 * log
             
        if ( mes in (1,3,5,7,8,10,12)):
            x = 32 
            y =30
        elif ( mes in (4,6,9,11)):
            x = 31
            y = 29
        elif ( mes == 2 and rok % 4 != 0):
            x = 29
            y = 27
        else:
            x = 30
            y = 28
            
        if (( den == x ) and ( log == 1 )):  # x = 32 pre januar
            mes = mes + 1 
            den = 1  
            if( mes == 13 ): 
                mes = 1
                rok = rok + 1 
        if (( den == 0 ) and (log == -1 )):
            mes = mes - 1 
            den = y # 31 
            if ( mes == 0 ):
                mes = 12
                rok = rok - 1 
    
    if (mes < 10):
        m='0'
    else:
        m=''

    if (den < 10):
        d='0'
    else:
        d=''

    ret = str(rok)+'-'+m+str(mes)+'-'+d+str(den)

    return ret

