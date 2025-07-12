#  TESTING.md

##  Manual Testing Report – Age Calculator

**Internship Project**: CodeAlpha – Web Development - Age Calculator  
**Test Engineer**: Joshua Kolawole  
**Student ID**: CA/JU3/3835  
**Bootcamp Reference**: Tester’s Quarters QA Bootcamp (2025 Cohort 1)  
**Project Repo**: CodeAlpha_AgeCalculator

---

##  Overview

This document outlines the manual testing process used to verify the core features and functionality of the Age Calculator web app. Testing was inspired by real-world testing practices taught during the TestarsQuarter QA Bootcamp, including edge case validation, bug prevention, and result verification.

---

##  Testing Objectives

- Confirm accurate age calculation
- Handle invalid or edge-case inputs
- Validate UI feedback (e.g., alerts, error messages)
- Test utility features (dark mode, copy, countdown, etc.)
- Ensure overall usability

---

##  Test Scenarios

| Test ID | Test Case              | Input           | Expected Output                 | Actual Output               | Status |
|---------|------------------------|-----------------|---------------------------------|-----------------------------|--------|
| TC001   | No input submitted     | (blank)         | Show error message              | Error message shown         | ✅ Pass |
| TC002   | Valid DOB: 2000-01-01  | 2000-01-01      | Correct age                     | Correct age displayed       | ✅ Pass |
| TC003   | DOB = Today            | (Today’s date)  | Age = 0                         | Age = 0 shown               | ✅ Pass |
| TC004   | Future DOB             | 2100-01-01      | Error message                   | Blocked with error          | ✅ Pass |
| TC005   | Leap Year DOB          | 2004-02-29      | Accurate result                 | Correct age calculated      | ✅ Pass |
| TC006   | Click “Copy” button    | Any DOB         | Copied feedback                 | “Copied!” alert shown       | ✅ Pass |
| TC007   | Enable dark mode       | Toggle button   | Dark theme active               | Background + text updated   | ✅ Pass |
| TC008   | Countdown message      | Valid DOB       | Time till next birthday         | Countdown shown             | ✅ Pass |
| TC009 | Invalid date format | 01/01/2000 | Error message | Format error shown | ✅ Pass |
| TC010 | Month overflow | 2023-13-01 | Error message | "Invalid month" alert | ✅ Pass |

---

## 🖼️ Test Evidence (Screenshots)

> Screenshots are stored in [`/images/testing/`](/images/testing/) directory with consistent naming:

#### Core Functionality Tests

1. **TC001 - Empty Input Validation**  
   ![Empty Input Error](/images/testing/tc01-empty.jpg)  
   *Verifies error handling when no date is entered*

2. **TC002 - Valid Date Calculation**  
   ![2000-01-01 Calculation](/images/testing/tc02-valid.jpg)  
   *Standard date calculation verification*

3. **TC003 - Today's Date Handling**  
   ![Age Zero Calculation](/images/testing/tc03-today.jpg)  
   *Edge case: DOB = current date*

#### Edge Case Validation

4. **TC004 - Future Date Blocking**  
   ![Future Date Error](/images/testing/tc04-future.jpg)  
   *System properly rejects dates beyond current date*

5. **TC005 - Leap Year Calculation**  
   ![Leap Year Handling](/images/testing/tc05-leap.jpg)  
   *February 29th birthday calculation*

6. **TC006 - Copy Functionality**  
   ![Copy Feedback](/images/testing/tc06-copy.jpg)  
   *Visual confirmation of "Copied!" toast message*

#### UI/UX Tests

7. **TC007 - Dark Mode Toggle**  
   | Light Mode | Dark Mode |
   |------------|-----------|
   | ![Light Mode](/images/testing/tc07-light.jpg) | ![Dark Mode](/images/testing/tc07-dark.jpg) |

8. **TC008 - Birthday Countdown**  
   ![Countdown Timer](/images/testing/tc08-countdown.jpg)  
   *Verifies dynamic countdown display*

#### Additional Test Cases

9. **TC009 - Invalid Date Format**  
   ![Format Error](/images/testing/tc09-format.jpg)  
   *Handling of MM/DD/YYYY format attempts*

10. **TC010 - Month Overflow Validation**  
    ![Month Error](/images/testing/tc10-month.jpg)  
    *Rejects invalid months > 12*

---

##  Observations & Notes

-  App logic is clean: Results match expected outputs in all tested scenarios  
-  Leap year validation handled properly  
-  Future dates are blocked with proper messaging  
-  Bonus features like birthday countdown and theme toggle improve UX  
-  Consistent behavior even after multiple inputs — no freezing or crashing
-  No performance degradation observed during stress testing (50+ consecutive calculations)

---

## Conclusion

All core features of the Age Calculator were tested manually and passed under normal and edge-case scenarios. The testing was conducted using principles learned from TestarsQuarter’s QA Bootcamp, including bug anticipation, user behavior simulation, and report structuring.

This documentation reflects both a developer's and a tester's mindset — ensuring not just a functional product, but a trustworthy one.

**Report Generated**: July 12, 2025  
**Test Environment**: Chrome v125, Windows 10
```

---  
*Verified by: Joshua Kolawole (CA/JU3/3835)*  
*Test Methodology: TestarsQuarter QA Bootcamp Standard V2.3*