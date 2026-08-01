# Android APK Build Guide (Capacitor + Android Studio)

This repository is fully configured for **Capacitor Android APK Packaging** without requiring any UI code modifications or design alterations.

---

## Pre-requisites
1. **Node.js**: v18+ or v20+
2. **Android Studio**: Android Studio Jellyfish or later with Android SDK 34/35 installed.
3. **Java Development Kit (JDK)**: JDK 17 or JDK 21 configured in environment variables (`JAVA_HOME`).

---

## Step-by-Step APK Generation Workflow

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build Production Bundle & Static Export
```bash
npm run build
```
*This compiles Next.js into the static build output folder (`out/`).*

### Step 3: Add Android Platform to Capacitor
```bash
npx cap add android
```
*(Only required for initial setup. Creates the `android/` native project folder).*

### Step 4: Sync Web Assets to Android Project
```bash
npx cap sync android
```
*Copies web assets from `out/` and updates native plugin configurations.*

### Step 5: Build APK in Android Studio
```bash
npx cap open android
```
1. Android Studio will open automatically.
2. Wait for Gradle sync to complete.
3. Select **Build > Build Bundle(s) / APK(s) > Build APK(s)** in Android Studio.
4. Locate the generated APK at: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## Capacitor Configuration (`capacitor.config.ts`)
- **Package ID**: `org.anjuman.sharie.shian`
- **Application Name**: `Anjuman-e-Sharie Shian`
- **Output Directory**: `out`
- **Native Plugins Configured**:
  - `SplashScreen` (Dark theme, auto-fade, Islamic star motif)
  - `StatusBar` (Dark status bar, safe area inset handling)
  - `Keyboard` (Body resize, dark theme keyboard)

---

## Manifest Permissions (`android/AndroidManifest.xml`)
The following Android permissions are declared for current & future capabilities:
- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`
- `android.permission.CAMERA`
- `android.permission.RECORD_AUDIO`
- `android.permission.READ_EXTERNAL_STORAGE`
- `android.permission.WRITE_EXTERNAL_STORAGE`
- `android.permission.POST_NOTIFICATIONS`
- `android.permission.ACCESS_FINE_LOCATION`
