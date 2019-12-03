#!/usr/bin/python
# -*- encoding: utf-8 -*-
import sys
import datetime
import calculation
import pgFunctions
import assistant

ret = 1
try:
    arg1=sys.argv[1]
    arg1.isdigit()
    test1 = 1
except ValueError:
    raise ValueError("Incorrect data format, should be integer")
    test1 = 0
try: 
    arg2=sys.argv[2]
    datetime.datetime.strptime(arg2, '%Y-%m-%d')
    test2 = 1
except ValueError:
    raise ValueError("Incorrect data format, should be YYYY-MM-DD")
    test2 = 0

if (test1 and test2):
    ret = calculation.vypocet(arg1,arg2)
sys.exit(ret)
