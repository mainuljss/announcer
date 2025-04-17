# Announcer

A web-based Bengali time and prayer announcer that provides real-time announcements for:
- Current time in Bengali numerals
- Time period of day (রাত/ভোর/সকাল/দুপুর/বিকাল/সন্ধ্যা)
- Next prayer time announcements

## Features

- Converts time to Bengali numerals
- Shows time periods in Bengali
- Calculates prayer times based on location:
    - Fajr (ফজর)
    - Dhuhr (যোহর)
    - Asr (আসর)
    - Maghrib (মাগরিব)
    - Isha (ঈশা)

## Setup

1. Clone this repository
2. Open time.html in a web browser
3. Default coordinates are set to Dhaka, Bangladesh (23.8103°N, 90.4125°E)

## Dependencies

- PrayTimes.js (from praytimes.org)

## Configuration

You can modify the following in time.html:
- Latitude and longitude coordinates
- Time period ranges
- Prayer name translations

## Sample Output

এখন সময়, সকাল, ১০টা বেজে, ৩০ মিনিট। যোহরের শেষ সময়, দুপুর, ১টা বেজে, ১৫ মিনিট।

## License

MIT License
