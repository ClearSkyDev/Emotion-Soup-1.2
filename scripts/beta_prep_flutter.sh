#!/usr/bin/env bash
set -euo pipefail

APP_VERSION="${APP_VERSION:-0.9.0-beta1}"
BUILD_NUMBER="${BUILD_NUMBER:-10001}"

echo "==> Flutter version"
flutter --version

echo "==> [1/7] Clean"
flutter clean

echo "==> [2/7] Pub get"
flutter pub get

echo "==> [3/7] Analyze"
flutter analyze

echo "==> [4/7] Test"
flutter test

echo "==> [5/7] Android AAB (release)"
flutter build appbundle --release \
  --build-name="$APP_VERSION" \
  --build-number="$BUILD_NUMBER" \
  --split-debug-info=build/symbols/android

echo "==> [6/7] iOS IPA (unsigned)"
pushd ios >/dev/null
pod install --repo-update
popd >/dev/null

flutter build ipa --release --no-codesign \
  --build-name="$APP_VERSION" \
  --build-number="$BUILD_NUMBER" \
  --split-debug-info=build/symbols/ios

echo "==> [7/7] Done"
echo "Artifacts:"
echo "  Android AAB: build/app/outputs/bundle/release/*.aab"
echo "  iOS IPA:     build/ios/ipa/*.ipa"
