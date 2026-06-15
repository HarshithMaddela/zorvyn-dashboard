# Finexa

**Live Demo:** https://finexa-v2.vercel.app/

A modern, full-stack personal finance management platform built with React, Firebase and Firestore. Finexa helps users track expenses, manage budgets, monitor financial goals, organize subscriptions and gain actionable insights through a clean and interactive user experience.

---

# Overview

Finexa started as a frontend finance dashboard and gradually evolved into a full-stack application with authentication, cloud data storage, support management and administrative controls.

The project focuses on:

* Modern UI/UX Design
* Real-world Application Architecture
* Firebase Authentication
* Firestore Database Integration
* Secure Data Management
* Financial Tracking & Insights
* Admin Management System
* Responsive Design

Unlike traditional frontend-only dashboards, Finexa stores user-specific data securely in Firestore and provides personalized financial management tools.

---

# Features

## Authentication

* Google Sign-In using Firebase Authentication
* Persistent Login Sessions
* User-specific Data Access
* Protected Routes
* Secure Firestore Rules

---

## Dashboard

Track your financial health at a glance.

Features:

* Total Income Card
* Total Expenses Card
* Net Balance Card
* Financial Summary
* Real-time Calculations

### Analytics & Visualizations

* Balance Trend Chart
* Expense Trend Chart
* Expense Distribution Pie Chart

### Smart Insights

Automatically calculates:

* Highest Spending Category
* Largest Expense
* Financial Observations

---

## Transactions Management

Manage all financial transactions.

Features:

* Add Transactions
* Edit Transactions
* Delete Transactions
* Income Tracking
* Expense Tracking

Each transaction includes:

* Amount
* Category
* Description
* Date
* Transaction Type

---

## Budgets

Create spending limits and monitor financial discipline.

Features:

* Add Budgets
* Category-wise Budgets
* Budget Tracking

---

## Goals

Set and track financial goals.

Features:

* Create Savings Goals
* Target Amount Tracking
* Progress Monitoring
* Goal Completion Tracking

---

## Subscription Tracker

Monitor recurring payments.

Features:

* Add Subscriptions
* Track Monthly Expenses
* Renewal Management
* Subscription Overview

Examples:

* Netflix
* Spotify
* Prime Video
* Custom Subscriptions

---

## Wallet Management

Organize payment methods.

Features:

* Add Wallets
* Track Available Balance
* Manage Multiple Wallets

Examples:

* Cash Wallet
* Bank Account
* UPI Wallet
* Digital Wallets

---

## Cards Management

Manage financial cards.

Features:

* Add Debit Cards
* Add Credit Cards
* Card Organization
* Secure Firestore Storage

---

## Profile System

User profile management.

Features:

* Google Profile Integration
* User Information Display
* Personalized Experience

---

# Admin Dashboard

A dedicated admin panel for platform management.

Features:

### User Management

* View Total Registered Users
* User Directory Popup
* User Names
* Email Addresses
* Profile Images

### Support Management

* View Support Requests
* View Ticket Categories
* Track Ticket Status
* Mark Tickets as Resolved
* Sort Tickets by Date

### Analytics

* Total Users
* Total Support Tickets

Admin access is protected through Firestore Security Rules.

---

# Firebase Integration

## Firebase Authentication

* Google Authentication
* Session Persistence
* Secure Login Flow

## Firestore Database

Collections include:

* users
* transactions
* budgets
* goals
* subscriptions
* cards
* supportRequests

## Security Rules

Implemented Firestore Rules for:

* User-specific Data Protection
* Authenticated Access
* Admin-only Support Management
* Secure Read/Write Operations

---

# UI & UX Highlights

* Modern Glassmorphism Design
* Gradient-Based Visuals
* Smooth Animations
* Framer Motion Integration
* Responsive Layout
* Mobile-Friendly Design
* Clean Navigation
* Dark Theme Experience

---

# Data Persistence

All user data is securely stored using Firestore.

Stored Data:

* Transactions
* Budgets
* Goals
* Subscriptions
* Wallets
* Cards
* Support Requests
* User Profiles

---

# Tech Stack

### Frontend

* React.js
* React Router
* Framer Motion
* Recharts
* React Icons

### Backend & Database

* Firebase Authentication
* Firebase Firestore

### Deployment

* Vercel

### Styling

* CSS3

---

# Project Structure

```text
src/
│
│
├── context/
│   └── AuthContext.jsx
│
├── firebase/
│   └── firebase.js
│
├── services/
│   ├── goalService.js
│   ├── supportService.js
│   ├── adminService.js
│   ├── budgetService.js
│   └── transactionService.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Budgets.jsx
│   ├── Goals.jsx
│   ├── Wallet.jsx
│   ├── Subscriptions.jsx
│   ├── Profile.jsx
│   ├── Settings.jsx
│   ├── ContactSupport.jsx
│   ├── AdminDashboard.jsx
│   ├── AboutUs.jsx
│   ├── PrivacyPolicy.jsx
│   └── TermsOfService.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Setup Instructions

### Clone Repository

```bash
git clone https://github.com/HarshithMaddela/finexa-dashboard.git
```

### Navigate to Project

```bash
cd finexa-dashboard
```

### Install Dependencies

```bash
npm install
```

### Configure Firebase

Create a Firebase project and add your configuration inside:

```javascript
firebase.js
```

Enable:

* Google Authentication
* Cloud Firestore

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

# What I Learned While Building Finexa

This project helped me learn far beyond frontend development.

Key areas explored:

* Firebase Authentication
* Firestore Database Design
* Firestore Security Rules
* User Access Control
* Admin Dashboards
* Cloud Data Storage
* React State Management
* Real-world Debugging
* Chrome Developer Tools
* Browser Console Debugging
* Deployment & Production Workflows

Finexa taught me that building real projects is one of the most effective ways to learn software development.

---

# Author

**Harshith Sai**

GitHub:
https://github.com/HarshithMaddela

---

# Repository

https://github.com/HarshithMaddela/finexa-dashboard

# Live Demo

https://finexa-v2.vercel.app/

---

# License

This project is built for learning, experimentation and portfolio purposes.
