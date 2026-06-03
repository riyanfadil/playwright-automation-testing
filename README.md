# Playwright Automation Testing - SauceDemo

**End-to-End Automation Testing Framework** using **Playwright** for [SauceDemo](https://www.saucedemo.com/).

![Playwright](https://img.shields.io/badge/Playwright-2C3E50?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)

## 🚀 Project Overview

This project is a complete **End-to-End (E2E) Automation Testing** portfolio project built with Playwright. It covers the full user journey on SauceDemo website, from login to checkout process, with proper test evidence and reporting.

**Goal**: Demonstrate professional QA Automation skills using modern tools and best practices.

---

## Test Scenarios

### Login Automation

* Automatically retrieves login credentials from the website
* Validates authentication process
* Verifies successful login behavior

### Shopping Flow Automation

* Selects products
* Adds items into cart
* Navigates through checkout flow
* Completes purchase process successfully

### Dynamic Variable Handling

* Uses variables instead of hardcoded values
* Improves test maintainability
* Creates reusable automation flow

### Screenshot Evidence

* Captures screenshots during execution
* Stores evidence for testing documentation
* Helps debugging and validation process

### HTML Reporting

* Generates Playwright HTML report
* Displays execution status and testing results
* Provides detailed automation evidence

---

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Framework**: Playwright Test
- **Architecture**: Page Object Model (POM)
- **Reporting**: Playwright HTML + Allure Report
- **CI/CD**: GitHub Actions (Monthly Scheduler + Email Report)
- **Test Data**: Dynamic + Environment Variables

---

## ✨ Key Features

✅ Full E2E User Journey (Login → Shopping → Checkout)
✅ Dynamic credential handling
✅ Reusable Page Object Model (POM)
✅ Automated screenshot evidence capture
✅ HTML + Allure Reporting
✅ **Monthly Automated Test** with Email Report via GitHub Actions
✅ Cross-browser support

---

## Project Structure

```bash
playwright-automation-testing/
├── .github/workflows/              # GitHub Actions (Monthly Report)
├── pages/                          # Page Object Models
├── tests/                          # Test specifications
├── utils/                          # Helpers & utilities
├── screenshots/                    # Automated evidence
├── test-results/                   # Test artifacts
├── playwright.config.ts
├── package.json
└── README.md
```

### Folder & File Description

* `screenshoot/`
  Stores automation screenshot evidence during test execution.

* `.env`
  Stores environment variables and configuration data.

* `sauce_test.js`
  Main Playwright automation script containing login, shopping flow, checkout validation, and screenshot handling.

* `report.html`
  Generated Playwright HTML execution report.

* `package.json`
  Project dependencies and npm configuration.

---

## Installation

Install dependencies:

```bash
npm install
```

Run automation testing:

```bash
npx playwright test
```

Open HTML report:

```bash
npx playwright show-report
```

---

Report
🔄 CI/CD & Monthly Automation

Monthly Test dijalankan otomatis 1x sebulan via GitHub Actions
Full report dikirim otomatis ke email
Semua execution history bisa dilihat di tab Actions

---

## Screenshots & Reports

This project includes:

* Automation execution screenshots
* Playwright HTML reports
* Testing evidence documentation

Screenshot evidence is stored inside:

```bash
screenshoot/
```

---

Actions

📊 Reports & Evidence

HTML Report: Generated after test execution
Screenshots: Stored in screenshots/ folder for evidence
Allure Report: Detailed test visualization (optional)

---

## Website Tested

https://www.saucedemo.com

---

## Purpose

This project was built to improve skills in:

* Modern QA Automation Testing
* End-to-End Testing
* Automation Workflow Design
* Test Evidence & Reporting
* Dynamic Test Data Handling
* Playwright Automation Framework
* CI/CD Integration

---

## Author

Riyan — QA Engineer & RPA Developer
