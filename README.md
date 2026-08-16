# 🏛️ SSN College of Engineering — Student Attendance Portal

Official Academic Attendance Management System built for **SSN College of Engineering, Chennai**.

![SSN Attendance Portal](https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80)

---

## 🌟 Overview & Key Features

This portal is structured with strict role segregation and cloud database storage (Firebase Firestore) tailored for college academic operations.

### 👑 1. Administrator Portal
- **Assign New Students**: Complete enrollment flow with Roll Number, Department, Semester, Section, DOB, and Parent Contact details.
- **Register Faculty / Staff**: Assign Employee ID, Designation, Department, and Subject Specialization.
- **User Access Management**: Search, filter, and activate/deactivate accounts.
- **Department Overviews & Reports**: Real-time aggregate metrics across all SSN branches and instant CSV Master Attendance exports.
- **Campus Circulars**: Broadcast official notices targeted to Students, Faculty, or Everyone.

### 👨‍🏫 2. Teaching Staff / Faculty Portal
- **Period-wise & Batch Attendance Marking**: Select Subject, Date, and Period with 1-Click "All Present" or granular card-by-card marking.
- **Live Attendance Counter**: Real-time counter of Present, Absent, and Unmarked students.
- **At-Risk Radar**: Automatically identifies students with **<75% attendance** (Anna University condonation threshold).
- **Leave & On-Duty (OD) Approvals**: One-click approval/rejection pipeline for student absence requests.
- **Class Analytics & Export**: Day-wise attendance trends, attendance split donuts, and monthly CSV exports.

### 🎓 3. Student Portal (Read-Only)
- **Real-Time Attendance Overview**: Animated circular progress ring with overall percentage and total classes present vs. absent.
- **Subject-Wise Breakdown**: Detailed percentages per course, with automated calculation of how many classes needed to reach 75%.
- **Interactive Attendance Calendar**: Color-coded log showing Present, Absent, On-Duty, and Holidays.
- **Apply for Leave / OD**: Submit Medical Leave or Symposium On-Duty requests with reason and document references.
- **Campus Circulars & Notices**: Direct access to broadcasted notices.

---

## 🔑 Demo Access Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@ssn.edu` | `admin123` |
| **Staff / Faculty** | `staff@ssn.edu` | `staff123` |
| **Student** | `student@ssn.edu` | `student123` |

*(You can also use the 1-Click Demo Buttons on the Login page)*

---

## ☁️ Firebase Cloud Database Setup

1. Create a free project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Cloud Firestore** in test mode:
   ```js
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Copy your Web App configuration (`apiKey`, `projectId`, `authDomain`, `storageBucket`, `appId`).
4. Click the **"Cloud Database"** button in any topbar (or update `FIREBASE_CONFIG` inside `app.js`), paste your keys, and click **"Save & Connect Cloud"**!

---

## 🚀 How to Deploy on GitHub & Vercel

### Step 1: Push to GitHub
Open your terminal in this directory:
```bash
git init
git add .
git commit -m "Initial commit: SSN College Student Attendance Portal with Firebase Cloud DB"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ssn-attendance-portal.git
git push -u origin main
```

### Step 2: Deploy to Vercel (1-Click)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Sign in with GitHub and select your `ssn-attendance-portal` repository.
3. Click **Deploy** (no build settings required — standard static SPA).
4. Your portal will be live on a custom `.vercel.app` URL in less than 30 seconds!
