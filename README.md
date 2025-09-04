# Emotion Soup v1.2

This project is a React Native application built with Expo. It helps children explore emotions by interacting with animated puff balls and creating their own "emotion soup".

## Requirements

- **Node.js 18+** – the app expects a recent LTS version of Node.
- **npm** – included with Node. All commands below assume `npm`.

## Getting Started

1. Install dependencies:
 ```bash
  npm install
  ```
   This will install required packages including `@react-native-community/slider` used on the Emotion Detail screen.
2. Run the app in Expo:
  ```bash
  npx expo start
  ```
3. Copy `.env.example` to `.env` and fill in your Firebase keys. Expo will inline
   these variables at build time so the app can connect to Firebase.

### Creating a native iOS project

If you need to run the app directly in Xcode or create a signed build, first
generate the native project files:

```bash
npx expo prebuild
```

This command creates `ios/` and `android/` directories (both are ignored by
Git). After running it, install CocoaPods:

```bash
cd ios && pod install
```

Open `ios/Emotion Soup.xcworkspace` in Xcode to build and run the app on a
simulator or device.

## Project Structure

- `components/` reusable UI components
- `screens/` app screens
- `context/` React Context for global state
- `utils/` helper logic such as the AI personality placeholder
- `firebase.js` Firebase initialization (reads keys from environment variables)

This skeleton includes basic navigation and placeholder screens for future development.

## User Tiers

Authentication is handled with Firebase Auth. Each user also has a document in the `users` collection of Firestore:

```json
{
  "email": "user@example.com",
  "tier": "free" // or "premium"
}
```

The `hooks/useUserTier.js` hook reads this value so the app can show premium features, such as emotion stories. Until in-app payments are integrated you can manually set `tier: "premium"` on your user document in Firestore for testing.

## Emotion Journal

Each time a child interacts with an emotion, a journal entry is saved to Firestore under `users/{uid}/emotions`. Entries include the emotion name, size, temperature and a timestamp. The helper `hooks/useEmotionLogger.js` provides a simple `logEmotionEntry` function used by the app when adding an emotion to the soup.

### Fetching Emotion Stats

To display trends over the last seven days you can use the helper `getEmotionStats(userId)` from `utils/getEmotionStats.js`. It queries `/users/{userId}/emotions` for the past week and groups entries by day and emotion.

```js
import { getEmotionStats } from './utils/getEmotionStats';

const data = await getEmotionStats(userId);
// [ { date: '2024-05-20', emotionCounts: { happy: 3, sad: 1 } }, ... ]
```

The returned array can be easily adapted for a line chart with the date on the x‑axis and counts per emotion on the y‑axis.

## Coping Tools

The `CopingToolsScreen` offers simple breathing, drawing and journaling activities. Each time a child uses one of these tools a log entry is saved to Firestore under `users/{uid}/copingLogs`.

### Beta Prep (local)

**macOS (bash/zsh):**
```bash
chmod +x scripts/beta_prep_flutter.sh
APP_VERSION=0.9.0-beta1 BUILD_NUMBER=10001 scripts/beta_prep_flutter.sh
```

**Windows (PowerShell):**
```powershell
Set-ExecutionPolicy -Scope Process Bypass
$env:APP_VERSION="0.9.0-beta1"; $env:BUILD_NUMBER="10001"; ./scripts/beta_prep_flutter.ps1
```

Artifacts:
- Android AAB: `build/app/outputs/bundle/release/*.aab`
- iOS IPA: `build/ios/ipa/*.ipa`
