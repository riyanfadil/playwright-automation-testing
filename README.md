# SauceDemo E2E Automation Testing - Playwright

End-to-end automation testing project using Playwright for validating login, shopping flow, checkout process, and test evidence generation on SauceDemo.

---

## Overview

This project was created as a QA Automation portfolio project using Playwright and JavaScript.

The automation workflow covers:

* Dynamic login credential handling
* Login validation
* Product purchase simulation
* Checkout automation
* Dynamic variable implementation
* Screenshot evidence generation
* Automated HTML reporting

The goal of this project is to simulate a real-world end-to-end automation testing process with maintainable and reusable test scripts.

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

## Technologies Used

* Playwright
* JavaScript
* Node.js
* HTML Report
* Environment Variables (.env)

---

## Features

✅ End-to-End Automation Testing
✅ Dynamic Credential Retrieval
✅ Reusable Variables
✅ Automated Screenshot Capture
✅ HTML Report Generation
✅ Lightweight Automation Workflow
✅ Clean & Simple Project Structure

---

## Project Structure

```bash
├── node_modules/
├── screenshoot/
├── .env
├── package.json
├── package-lock.json
├── report.html
└── sauce_test.js
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

## Website Tested

https://www.saucedemo.com

---

## Purpose

This project was built to improve skills in:

* QA Automation Testing
* End-to-End Testing
* Automation Workflow Design
* Test Evidence Documentation
* Dynamic Test Data Handling
* Playwright Automation Framework

---

## Author

Riyan — QA Engineer & RPA Developer
