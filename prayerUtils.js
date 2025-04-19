window.prayerAnnouncer = {
    COORDINATES: {
        dhaka: [23.8103, 90.4125],
        mymensingh: [24.7471, 90.4203],
        bauphal: [22.3867, 90.5283],
        barisal: [22.7010, 90.3535]
    },

    prayerNameBn: {
        fajr: "ফজরের",
        sunrise: "সূর্যোদয়ের",
        dhuhr: "যোহরের",
        asr: "আসরের",
        maghrib: "মাগরিবের",
        isha: "ঈশার"
    },

    getNextPrayer: function(times, currentTime) {
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        for (let prayer of prayers) {
            const [h, m] = times[prayer].split(':').map(Number);
            const prayerTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), h, m);
            if (prayerTime > currentTime) {
                return { prayer, prayerTime };
            }
        }
        return { prayer: 'fajr', prayerTime: new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 5, 0) };
    },

    generatePrayerAnnouncement: function() {
        const date = new Date();
        const lat = this.COORDINATES.mymensingh[0];
        const lon = this.COORDINATES.mymensingh[1];
        const timezone = date.getTimezoneOffset() / -60;

        const times = prayTimes.getTimes(date, [lat, lon], timezone);
        const nextPrayerData = this.getNextPrayer(times, date);
        const [hour, minute] = nextPrayerData.prayerTime.toTimeString().split(':').map(Number);

        const period = timeAnnouncer.getTimePeriod(hour);
        const timeString = timeAnnouncer.formatTime(hour, minute);

        return `${this.prayerNameBn[nextPrayerData.prayer]} শেষ সময়, ${period}, ${timeString}।`;
    }
};
