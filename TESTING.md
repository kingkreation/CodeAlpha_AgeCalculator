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
| TC002   | Valid DOB: 02-11-2007  | 02-11-2007      | Correct age                     | Correct age displayed       | ✅ Pass |
| TC003   | DOB = Present day      | Today’s date (12-07-2025)  | Age = 0                         | Age = 0 shown               | ✅ Pass |
| TC004   | Future DOB             | 01-01-2030      | Error message                   | Blocked with error          | ✅ Pass |
| TC005   | Leap Year DOB          | 29-02-2004      | Accurate result                 | Correct age calculated with leap year message     | ✅ Pass |
| TC006   | Click “Copy” button    | Any DOB (04-10-2004)        | Copied feedback                 | “Copied!” alert shown       | ✅ Pass |
| TC007   | Enable dark mode       | Toggle button   | Dark theme active               | Background + text updated   | ✅ Pass |
| TC008   | Countdown message      | Valid DOB (02-06-2006)      | Time till next birthday         | Countdown (🎂 324 days until your next birthday.) shown             | ✅ Pass |
| TC009 | Invalid date format | 2003-11-27 | Error message | Error (Day must be between 1 and 31.) shown | ✅ Pass |
| TC010 | Month overflow | 12-13-1999 | Error message | "Month must be between 1 and 12." alert | ✅ Pass |

---

## 🖼️ Test Evidence (Screenshots)

> Screenshots are stored in [`/images/testing/`](/images/testing/) directory with consistent naming:

#### Core Functionality Tests

1. **TC001 - Empty Input Validation**  
   ![Empty Input Error](/images/testing/tc01-empty.png)  
   *Verifies error handling when no date is entered*

2. **TC002 - Valid Date Calculation**  
   ![27-06-2003 Calculation](/images/testing/tc02-valid.png)  
   *Standard date calculation verification*

3. **TC003 - Today's Date Handling**  
   ![Age Zero Calculation](/images/testing/tc03-today.png)  
   *Edge case: DOB = current date*

#### Edge Case Validation

4. **TC004 - Future Date Blocking**  
   ![Future Date Error](/images/testing/tc04-future.png)  
   *System properly rejects dates beyond current date*

5. **TC005 - Leap Year Calculation**  
   ![Leap Year Handling](/images/testing/tc05-leap.png)  
   *February 29th birthday calculation*

6. **TC006 - Copy Functionality**  
   ![Copy Feedback](/images/testing/tc06-copy.png)  
   *Visual confirmation of "Copied!" toast message*

#### UI/UX Tests

7. **TC007 - Dark Mode Toggle**  
   | Light Mode | Dark Mode |
   |------------|-----------|
   | ![Light Mode](/images/testing/tc07-light.png) | ![Dark Mode](/images/testing/tc07-dark.png) |

8. **TC008 - Birthday Countdown**  
   ![Countdown Timer](/images/testing/tc08-countdown.png)  
   *Verifies dynamic countdown display*

#### Additional Test Cases

9. **TC009 - Invalid Date Format**  
   ![Format Error](/images/testing/tc09-format.png)  
   *Handling of YYYY/MM/DD format attempts*

10. **TC010 - Month Overflow Validation**  
    ![Month Error](/images/testing/tc10-month.png)  
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