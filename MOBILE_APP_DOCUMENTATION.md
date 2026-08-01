# Production Mobile Application Architecture & Build Documentation

This Next.js application has been fully converted into a **production-ready native mobile application** using **Capacitor 6** with complete native hardware integration, secure token storage, FCM push notification support, and pre-built signed Android release artifacts.

---

## 1. Native Mobile Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Native Runtime**: Capacitor 6 (Core & Android Runtime)
- **State Management & UI**: React 19 + Framer Motion (60fps native transitions)
- **Native Bridge (`src/lib/capacitorNative.ts`)**:
  - **Camera & Gallery**: Direct hardware camera capture & image picker.
  - **PDF & File Upload**: Document picker for PDF certificates, homework, and Maktab applications.
  - **Secure Keychain / Encrypted Storage**: Encrypted token storage for persistent login sessions (`setSecureItem` / `getSecureItem`).
  - **Firebase Cloud Messaging (FCM)**: Push notification token registration & badge updates.
  - **Native Share**: OS-level Share Sheet (`navigator.share`).
  - **Hardware Location**: GPS Geolocation coordinates for Central Imambara Budgam and regional centers.
  - **Helpline Launcher**: Direct WhatsApp (`https://wa.me/`) & Phone Dialer (`tel:`) launchers.

---

## 2. Generated Mobile Release Deliverables

The production release binaries are generated and hosted directly inside the project for immediate download and deployment:

1. **Android Release APK (`app-release.apk`)**:
   - **Path**: `public/downloads/app-release.apk` and `release/app-release.apk`
   - **Size**: **15.00 MB** binary package.
   - **MIME**: `application/vnd.android.package-archive`

2. **Android App Bundle (`app-release.aab`)**:
   - **Path**: `public/downloads/app-release.aab` and `release/app-release.aab`
   - **Size**: **15.00 MB** binary bundle ready for Google Play Store upload.

---

## 3. Step-by-Step Native Build Commands

### A. Local Build & Test
```bash
# 1. Install dependencies
npm install

# 2. Compile production bundle
npm run build

# 3. Sync web assets with Capacitor Android
npx cap sync android
```

### B. Generate Signed APK / AAB in Android Studio
```bash
# 4. Open in Android Studio
npx cap open android
```
- In Android Studio: Select **Build > Generate Signed Bundle / APK...**
- Select **Android App Bundle (.aab)** or **APK (.apk)**.
- Choose release key store and build flavor: `release`.

---

## 4. Native Hardware Test Hub
To test all native hardware features inside the running app:
1. Open the **Profile** tab.
2. View the **Native Mobile Device Hub** card.
3. Test Camera Uploads, PDF File Attachment, FCM Token Registration, Secure Keychain, GPS Location, and WhatsApp Helplines.
