# About
This program can calculate the muslim prayertimes and provides an api that can do so. 
I created this program because i could not find one good api that could provide accurate
date for a specific location, and those who did exist where closed-sourced so you couldn't deploy
one of your own instances.

## Web
The main website `/` only uses your location to calculate the praytimes as precise as 
posible. It is also only meant as a example and should never be used as a production ready
website.

NOTE: If you were wondering what was going on with all the params, then i can tell you that
the salah times for the webpage is also calculated server wise and does not use the api
for how to use the api see ajax.html

# Api
The base enpoint is `/api/:lat/:lng/:timezone` so in copenhagen that would be:
```http
GET /api/55/22/+1
```

which would give you a response like this
```json
{
    "date":"Fri Mar 02 2018 11:45:30 GMT+0100 (CET)",
    "status":200,
    "timezone":1,
    "method":"MWL",
    "coordinates":{
        "latitude":55,
        "longitude":22
    },
    "times":{
        "imsak":"04:09",
        "fajr":"04:19",
        "sunrise":"06:20",
        "dhuhr":"11:44",
        "asr":"14:29",
        "sunset":"17:09",
        "maghrib":"17:09",
        "isha":"19:03",
        "midnight":"23:45"
    }
}
```

It also supports two parameters those include `?method=` and `?date=`. With method you can specify the method you want to use
to calculate the times currently we support these:

| Method  | Description                                   |
|---------|-----------------------------------------------|
| MWL     | Muslim World League (Default)                 |
| ISNA    | Islamic Society of North America (ISNA)       |
| Egypt   | Egyptian General Authority of Survey          |
| Makkah  | Umm Al-Qura University, Makkah                |
| Karachi | University of Islamic Sciences, Karachi       |
| Tehran  | Institute of Geophysics, University of Tehran |
| Jafari  | Shia Ithna-Ashari, Leva Institute, Qum        |
| Hanafi  | Muslim World League with hanafi asr           |

So if i wanted to calculate the hanafi times then i would do:
```http
GET /api/55/12/+1/?method=Hanafi
```
And the response would be like this
```json
{
    "date":"Fri Mar 02 2018 11:56:47 GMT+0100 (CET)",
    "status":200,
    "timezone":1,
    "method":"Hanafi",
    "coordinates":{
        "latitude":55,
        "longitude":22
    },
    "times":{
        "imsak":"04:09",
        "fajr":"04:19",
        "sunrise":"06:20",
        "dhuhr":"11:44",
        "asr":"15:12",
        "sunset":"17:09",
        "maghrib":"17:09",
        "isha":"19:03",
        "midnight":"23:45"
    }
}
```

The other parameter date, takes a javascript date string which is formatted like this:
```
[Weekday] [Month] [Day] [Year] [Hour]:[Minutes]:[Seconds] GMT+[Gmttimezone] [tmformat]

Thu Feb 13 2016 13:23:32 is also a valid time string
```
If not specified then you will rely on server time which can be very inacurate