# 📚 Quran School Management System

This is a modern web application for managing Quran schools, designed to support multiple roles Teachers, Admins, Parents, and Students. The platform enables streamlined class tracking, student progress monitoring, attendance recording, and reporting—all through an intuitive, responsive interface.

---

## 🌐 Tech Stack

- **Frontend:** React, Vite, TypeScript, Ant Design (AntD)
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Localization:** i18n support (Arabic + English)
- **Backend (WIP):** TBD

---

## 🧑‍🏫 Supported Roles and Features

### 1. **Teacher**

- View assigned classes (`/my-classes`)
- View students across all their classes (`/my-students`)
- Search students or classes (`/find-student`, `/find-class`)
- View class details (`/view-class/:id`)
- Run Class (`TBD`)

### 2. **Parent / Student**

- View list of linked children/students on login
- Navigate to student report dashboard
- View Quran progress, success rate, attendance, class history
- Print or download student reports

### 3. **Admin** _(planned)_

- Add/manage users, roles, classes, and tasks
- Assign teachers to classes
- Review overall system reports and data exports

---

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/zurghani/halakaa.git
cd halakaa
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

## 🌍 i18n

The app supports both Arabic and English. Text direction is automatically handled based on locale. To switch language:

```tsx
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();
i18n.changeLanguage("ar"); // or 'en'
```

---

## 📌 TODOs

....

---
