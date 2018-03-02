#!/usr/bin/env python3.6
# see http://praytimes.org/calculation
# and http://aa.usno.navy.mil/faq/docs/SunApprox.php
import time
from math import *

# other functions
cot = lambda x: 1/tan(x)
acot = lambda x: atan(1/x)

# Set TimeZone
TimeZone = +0
# Set Latitude & Longitude
Lat = 55
Lng = 12

unixtojd = lambda timestamp=time.time(): (timestamp / 86400) + 2440587.5
jdtounix = lambda julianday: (julianday - 2440587.5) * 86400

# get julian date using sqlite3
jd = unixtojd(time.time())

d = jd - 2451545.0; # date converted to float

# Calculate laditude using date
g = 357.529 + 0.98560028* d;
q = 280.459 + 0.98564736* d;
L = q + 1.915* sin(g) + 0.020* sin(2*g);


# calculate sun position and time
R = 1.00014 - 0.01671* cos(g) - 0.00014* cos(2*g);
e = 23.439 - 0.00000036* d;
RA = atan2(cos(e)* sin(L), cos(L))/ 15;

D = asin(sin(e)* sin(L));  # declination of the Sun
EqT = q/15 - RA;  # equation of time

# Use Dhuhr as a base
Dhuhr = 12 + TimeZone - Lng/15 - EqT

def T(a):
    return acos(
    -sin(a)-(sin(L)+sin(D))\
    /(cos(L)+cos(D))
    )/15

Sunrise = Dhuhr - T(0.833) # The constant 0.833 can be calculated
Sunset = Dhuhr + T(0.833) # by 0.0347 * sqrt(h) where h is the he observer's height in meters.

# The constant 18 is the convention from these
'''
Convention 	                                    Fajr Angle	Isha Angle
Muslim World League	                            18	        17
Islamic Society of North America (ISNA)	        15	        15
Egyptian General Authority of Survey	        19.5	    17.5
Umm al-Qura University, Makkah	                18.5	    90 min after Maghrib 120 min during Ramadan
University of Islamic Sciences, Karachi	        18	        18
Institute of Geophysics, University of Tehran	17.7	    14*
Shia Ithna Ashari, Leva Research Institute, Qum	16	        14

* Isha angle is not explicitly defined in Tehran method.
'''


Fajr = Dhuhr - T(18)
Isha = Dhuhr + T(18)

# Asr
def A(t):
    return acos(
    sin((t + tan(L - D))) - (sin(L) + sin(D))\
    /(cos(L) + cos(D))
    )/15

Asr_std = Dhuhr + A(1)
Asr_han = Dhuhr + A(2)

Maghrib_std = Sunset
Maghrib_shia = Dhuhr + T(4)

Midnight_std = (Sunrise - Sunset)/2
Midnight_shia = (Fajr - Sunset)/2

print(Fajr)
print(Dhuhr)
print(Asr_han)
print(Maghrib_std)
print(Midnight_std)
