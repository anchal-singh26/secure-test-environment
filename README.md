# Secure Test Environment Enforcement

A lightweight, browser-level secure assessment environment designed to enforce strict test conditions and provide a complete, auditable event trail for employer review.

This project focuses on **behavioral security**, **browser enforcement**, and **event auditing**, implemented using **Vanilla JavaScript** with a modular architecture.

---

## 🎯 Objective

Ensure candidates complete assessments in a:
- Locked-down environment
- Time-bound session
- Fully auditable setup

The system enforces browser restrictions, fullscreen usage, activity monitoring, and immutable event logging.

---

## ✅ Key Features

### 1. Browser Enforcement (Chrome Only)
- Detects browser name and version on load
- Blocks access if browser is not Google Chrome
- Displays a blocking screen with:
  - Reason for restriction
  - Instructions to reopen in Chrome
- Logs:
  - Browser detected
  - Access blocked events

---

### 2. Fullscreen Enforcement
- Requires fullscreen mode to start the assessment
- Detects exit from fullscreen
- Blocks assessment until fullscreen is re-entered
- Logs:
  - Fullscreen requested
  - Entered / exited fullscreen

---

### 3. Activity & Focus Monitoring
- Tracks:
  - Tab switches
  - Window blur / focus
  - Visibility changes
- Logs all focus-related events with timestamps

---

### 4. Clipboard & Shortcut Protection
- Detects and logs:
  - Right-click attempts
  - Copy / paste attempts
  - Keyboard shortcuts
- Prevents common inspection shortcuts

---

### 5. Timer Enforcement
- Countdown timer with persistence
- Survives refresh and temporary offline scenarios
- Automatically ends assessment on expiry
- Logs:
  - Timer start
  - Timer ticks
  - Warnings
  - Expiry event

---

### 6. Unified Event Logging
All events follow a consistent schema:
- Event type
- Timestamp (ISO)
- Attempt ID
- Question ID (if applicable)
- Metadata (browser, focus state, key actions, etc.)

Logs are:
- Batched for efficiency
- Persisted in localStorage for offline safety
- Immutable after assessment completion

---

## 🧱 Project Structure

secure-test/
│
├── index.html
├── styles.css
├── main.js
│
├── core/
│ ├── browser.js
│ ├── logger.js
│ ├── storage.js
│
├── controls/
│ ├── focus.js
│ ├── fullscreen.js
│ ├── clipboard.js
│ ├── timer.js
│
└── utils/
├── uuid.js
├── time.js

---

## 🚀 How to Run

1. Open `index.html` using a local server
2. Access the page in **Google Chrome**
3. Click **Start Assessment**
4. Fullscreen is enforced automatically

> Note: For testing, you can use `https://example.com/` as the base URL.

---

## 🧠 Design Decisions

- **Vanilla JavaScript** chosen for:
  - Direct browser API control
  - No abstraction overhead
  - Deterministic behavior
- Modular architecture ensures:
  - Easy extensibility
  - Clear separation of concerns
- No framework dependency for maximum compatibility

---

## 🔐 Notes on Security

This system is designed for **behavioral enforcement and auditing**.  
While client-side enforcement cannot be fully tamper-proof, all violations are **detected, logged, and auditable**, which is critical for high-stakes assessments.

---

## 👤 Author

Anchal Singh
