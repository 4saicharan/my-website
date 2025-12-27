# TorqueTech Mobile App

Mobile app version of the TorqueTech website built with React Native and Expo.

## Features

- **Home Screen**: Overview with weather, news, and world clock cards
- **Weather Forecast**: 10-day weather forecast with current conditions
- **News**: Daily briefing with text-to-speech functionality
- **World Clock**: Real-time clocks for major cities around the world

## Getting Started

### Prerequisites

- Node.js installed
- Expo CLI (will be installed automatically)
- Expo Go app on your phone (for testing)

### Installation

1. Navigate to the mobile-app directory:
```bash
cd mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Run on your device:
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w`

## Project Structure

```
mobile-app/
├── App.tsx                 # Main app with navigation
├── screens/
│   ├── HomeScreen.tsx      # Home screen with cards
│   ├── WeatherScreen.tsx   # Weather forecast
│   ├── NewsScreen.tsx      # News with text-to-speech
│   └── WorldClockScreen.tsx # World clock
├── package.json
└── app.json                # Expo configuration
```

## Features in Detail

### Weather Screen
- Current weather conditions
- 10-day forecast
- Temperature, humidity, wind speed
- Weather icons/emojis

### News Screen
- News articles display
- Text-to-speech playback
- External article links
- Topic categorization

### World Clock Screen
- Real-time clock updates (every second)
- Search functionality
- Multiple world cities
- Date and time display

## Building for Production

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Notes

- The app uses the same weather API (wttr.in) as the web version
- News articles should be integrated with your existing news API
- Text-to-speech uses Expo Speech API
- All screens follow the dark theme design

