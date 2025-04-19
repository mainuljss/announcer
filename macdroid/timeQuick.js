try {
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

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const period = getTimePeriod(hour);
    const hourText = (hour % 12 || 12).toString();
    const minuteText = minute > 0 ? `, ${minute.toString()} মিনিট` : '';
    `এখন সময়, ${period}, ${hourText}টা${minuteText}।`
} catch(e) {
    ""
}