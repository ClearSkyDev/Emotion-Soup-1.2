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

## Project Structure

- `components/` reusable UI components
- `screens/` app screens
- `context/` React Context for global state
- `utils/` helper logic such as the AI personality placeholder
- `firebase.js` Firebase initialization (configure with your own keys)

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

## Coping Tools

The new `CopingToolsScreen` provides breathing, drawing and journaling tools for kids. Usage of each tool is recorded to Firestore at `users/{uid}/copingLogs`.
