window.timeAnnouncer = {
    getTimePeriod: function(hour) {
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
        return "সময়";
    },

    convertToBengali: function(num) {
        const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().split('').map(d => banglaDigits[+d]).join('');
    },

    formatTime: function(hour, minute) {
        const bHour = this.convertToBengali(hour % 12 || 12);
        const bMinute = this.convertToBengali(minute.toString().padStart(2, '0'));
        return `${bHour}টা, ${bMinute} মিনিট`;
    },

    getDateFromQuery: function() {
        const params = new URLSearchParams(window.location.search);
        const h = parseInt(params.get("hour"));
        const m = parseInt(params.get("minute"));
        if (!isNaN(h) && !isNaN(m) && h >= 0 && h < 24 && m >= 0 && m < 60) {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
        }
        return new Date();
    },

    generateTimeAnnouncement: function() {
        const date = this.getDateFromQuery();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const period = this.getTimePeriod(hour);
        const timeString = this.formatTime(hour, minute);
        return `এখন সময়, ${period}, ${timeString}।`;
    }
};
