function PrayTimes() {
    this.timeNames = {
        imsak: 'Imsak',
        fajr: 'Fajr',
        sunrise: 'Sunrise',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        sunset: 'Sunset',
        maghrib: 'Maghrib',
        isha: 'Isha',
        midnight: 'Midnight'
    };

    this.methods = {
        Karachi: {
            name: 'University of Islamic Sciences, Karachi',
            params: { fajr: 18, isha: 18 }
        }
    };

    this.defaultParams = {
        maghrib: '0 min', midnight: 'Standard'
    };

    this.calcMethod = 'Karachi';
    this.params = this.methods[this.calcMethod].params;
    this.params.asr = 'Hanafi';

    this.sunPosition = function(jd) {
        var D = jd - 2451545.0;
        var g = 357.529 + 0.98560028* D;
        var q = 280.459 + 0.98564736* D;
        var L = q + 1.915* Math.sin(g* Math.PI/180) + 0.020* Math.sin(2*g* Math.PI/180);
        var e = 23.439 - 0.00000036* D;
        var d = Math.asin(Math.sin(e* Math.PI/180)* Math.sin(L* Math.PI/180))* 180/Math.PI;
        var RA = Math.atan2(Math.cos(e* Math.PI/180)* Math.sin(L* Math.PI/180), Math.cos(L* Math.PI/180))* 180/Math.PI;
        RA = this.fixhour(RA);
        return {declination: d, equation: RA};
    };

    this.julianDate = function(year, month, day) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        var A = Math.floor(year/100);
        var B = 2- A+ Math.floor(A/4);
        var JD = Math.floor(365.25*(year+ 4716))+ Math.floor(30.6001*(month+ 1))+ day+ B- 1524.5;
        return JD;
    };

    this.computePrayerTimes = function(times) {
        times = this.dayPortion(times);
        var params = this.params;
        var imsak   = this.sunAngleTime(this.eval(params.imsak), times.imsak, 'ccw');
        var fajr    = this.sunAngleTime(this.eval(params.fajr), times.fajr, 'ccw');
        var sunrise = this.sunAngleTime(this.riseSetAngle(), times.sunrise, 'ccw');
        var dhuhr   = this.midDay(times.dhuhr);
        var asr     = this.asrTime(this.asrFactor(params.asr), times.asr);
        var sunset  = this.sunAngleTime(this.riseSetAngle(), times.sunset);
        var maghrib = this.sunAngleTime(this.eval(params.maghrib), times.maghrib);
        var isha    = this.sunAngleTime(this.eval(params.isha), times.isha);
        return {
            imsak: imsak, fajr: fajr, sunrise: sunrise, dhuhr: dhuhr,
            asr: asr, sunset: sunset, maghrib: maghrib, isha: isha
        };
    };

    this.getTimes = function(date, coords, timezone) {
        var times = {
            imsak: 5, fajr: 5, sunrise: 6, dhuhr: 12,
            asr: 13, sunset: 18, maghrib: 18, isha: 18
        };
        var timeSuffixes = ['am', 'am', 'am', 'pm', 'pm', 'pm', 'pm', 'pm'];

        var lat = 1* coords[0];
        var lng = 1* coords[1];
        var timeZone = 1* timezone;

        var jDate = this.julianDate(date.getFullYear(), date.getMonth()+ 1, date.getDate());
        var lonDiff = lng/(15* 24);
        var times = this.computePrayerTimes(times);

        for (var i in times) {
            times[i] = this.fixhour(times[i]+ lonDiff+ timeZone);
            var hrs = Math.floor(times[i]);
            var mins = Math.floor((times[i]- hrs)* 60);
            times[i] = hrs+':'+ (mins< 10 ? '0'+ mins : mins);
        }
        return times;
    };

    this.fixhour = function(a) {
        a = a- 24* Math.floor(a/24);
        return a;
    };

    this.eval = function(str) {
        return 1* (str+ '').split(/[^0-9.+-]/)[0];
    };

    this.dayPortion = function(times) {
        for (var i in times)
            times[i] /= 24;
        return times;
    };

    this.sunAngleTime = function(angle, time, direction) {
        var decl = this.sunPosition(this.julianDate(2000, 1, 1)).declination;
        var noon = this.midDay(time);
        var t = 1/15* Math.acos((-Math.sin(angle* Math.PI/180)- Math.sin(decl* Math.PI/180)* Math.sin(this.lat* Math.PI/180))/ (Math.cos(decl* Math.PI/180)* Math.cos(this.lat* Math.PI/180)))* 180/Math.PI;
        return noon+ (direction == 'ccw' ? -t : t);
    };

    this.asrTime = function(factor, time) {
        var decl = this.sunPosition(this.julianDate(2000, 1, 1)).declination;
        var angle = -Math.arccot(factor+ Math.tan(Math.abs(this.lat- decl)* Math.PI/180))* 180/Math.PI;
        return this.sunAngleTime(angle, time);
    };

    this.midDay = function(time) {
        var eqt = this.sunPosition(this.julianDate(2000, 1, 1)).equation;
        var noon = this.fixhour(12- eqt);
        return noon;
    };

    this.riseSetAngle = function() {
        var earthRad = 6371009; // in meters
        var angle = 0.0347* Math.sqrt(this.elevation); // in degrees
        return 0.833+ angle;
    };

    this.asrFactor = function(asrParam) {
        var factors = {Standard: 1, Hanafi: 2};
        return factors[asrParam] || asrParam;
    };
}

Math.arccot = function(x) {
    return Math.PI/2 - Math.atan(x);
};