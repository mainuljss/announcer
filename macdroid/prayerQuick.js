try {
    const prayerNameBn = {
        Fajr: "ফজরের",
        Dhuhr: "যোহরের",
        Asr: "আসরের",
        Maghrib: "মাগরিবের",
        Isha: "ঈশার"
    };

    function getTimePeriod(hour) {
        const timePeriods = [
            { label: "রাত", start: 20, end: 24 },
            { label: "রাত", start: 0, end: 4 },
            { label: "ভোর", start: 4, end: 6 },
            { label: "সকাল", start: 6, end: 12 },
            { label: "দুপুর", start: 12, end: 16 },
            { label: "বিকাল", start: 16, end: 18 },
            { label: "সন্ধ্যা", start: 18, end: 20 }
        ];

        for (const period of timePeriods) {
            if (hour >= period.start && hour < period.end) {
                return period.label;
            }
        }
        return "";
    }

    function getNextPrayer(timings, currentTime) {
        const prayerEndTimes = {
            Fajr: timings.Sunrise,
            Dhuhr: timings.Asr,
            Asr: timings.Maghrib,
            Maghrib: timings.Isha,
            Isha: timings.Fajr
        };

        const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

        for (let prayer of prayers) {
            const [h, m] = prayerEndTimes[prayer].split(':').map(Number);
            const prayerTime = new Date(
                currentTime.getFullYear(),
                currentTime.getMonth(),
                currentTime.getDate(),
                h, m
            );
            if (prayerTime > currentTime) {
                return { prayer, prayerTime };
            }
        }

        const [sunriseHour, sunriseMin] = timings.Sunrise.split(':').map(Number);
        return {
            prayer: 'Fajr',
            prayerTime: new Date(
                currentTime.getFullYear(),
                currentTime.getMonth(),
                currentTime.getDate() + 1,
                sunriseHour,
                sunriseMin
            )
        };
    }

    const now = new Date();
    const prayerData = JSON.parse(`{v=prayerData_g}`);
    const timings = prayerData.data.timings;

    if (!timings || !timings.Fajr) {
        ""
    } else {
        const nextPrayerData = getNextPrayer(timings, now);
        const [hour, minute] = nextPrayerData.prayerTime.toTimeString().split(':').map(Number);
        const period = getTimePeriod(hour);
        const hourText = (hour % 12 || 12).toString();
        const minuteText = minute > 0 ? `, ${minute.toString()} মিনিট` : '';
        `${prayerNameBn[nextPrayerData.prayer]} শেষ সময়, ${period}, ${hourText}টা${minuteText}।`
    }
} catch(e) {
    ""
}