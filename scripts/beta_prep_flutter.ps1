#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

$APP_VERSION = $env:APP_VERSION
if (-not $APP_VERSION) { $APP_VERSION = "0.9.0-beta1" }

$BUILD_NUMBER = $env:BUILD_NUMBER
if (-not $BUILD_NUMBER) { $BUILD_NUMBER = "10001" }

Write-Host "==> Flutter version"
flutter --version

Write-Host "==> [1/7] Clean"
flutter clean

Write-Host "==> [2/7] Pub get"
flutter pub get

Write-Host "==> [3/7] Analyze"
flutter analyze

Write-Host "==> [4/7] Test"
flutter test

Write-Host "==> [5/7] Android AAB (release)"
flutter build appbundle --release `
  --build-name=$APP_VERSION `
  --build-number=$BUILD_NUMBER `
  --split-debug-info=build/symbols/android

Write-Host "==> [6/7] iOS IPA (unsigned)"
if ($IsMacOS -or $env:OS -eq "Darwin") {
  Push-Location ios
  pod install --repo-update
  Pop-Location

  flutter build ipa --release --no-codesign `
    --build-name=$APP_VERSION `
    --build-number=$BUILD_NUMBER `
    --split-debug-info=build/symbols/ios
} else {
  Write-Host "Skipping iOS build: requires macOS + Xcode."
}

Write-Host "==> [7/7] Done"
Write-Host "Artifacts:"
Write-Host "  Android AAB: build/app/outputs/bundle/release/*.aab"
Write-Host "  iOS IPA:     build/ios/ipa/*.ipa (macOS only)"
