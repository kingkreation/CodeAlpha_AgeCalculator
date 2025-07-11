// Get DOM elements
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const calculateBtn = document.getElementById('calculateBtn');
const resultSection = document.getElementById('resultSection');
const errorMesssage = document.getElementById('errorMessage');
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const copyBtn = document.getElementById('copyBtn');
const birthdayCountdown = document.getElementById('birthdayCountdown');
const darkModeToggle = document.getElementById('darkModeToggle');
const specialMessage = document.getElementById('specialMessage');

// Add event listener to the calculate button
calculateBtn.addEventListener('click', calculateAge);

// Add enter key support for quick calculation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateAge();
    }
});

function validateInputs(day, month, year) {
    if (!day || !month || !year) {
        return 'Please fill in all fields.';
    }
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if (day < 1 || day > 31) {
        return 'Day must be between 1 and 31.';
    }
    if (month < 1 || month > 12) {
        return 'Month must be between 1 and 12.';
    }
    if (year < 1800 || year > new Date().getFullYear()) {
        return 'Year must be between 1800 and the current year.';
    }

    // Checks if the date is actually valid (e.g., not Feb 30)
    const testDate = new Date(year, month - 1, day);
    if (
        testDate.getFullYear() !== year ||
        testDate.getMonth() !== month - 1 ||
        testDate.getDate() !== day
    ) {
        return 'Invalid date.';
    }
    if (testDate > new Date()) {
        return 'Birth date cannot be in the future.';
    }
    return null;
}

function calculateAge() {
    resultSection.style.display = 'none';
    errorMesssage.textContent = 'Kindly input your birth date to calculate your age.';

    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    const error = validateInputs(day, month, year);
    if (error) {
        showErrorMessage(error);
        return;
    }

    // Save last entered birth date for user convenience
    localStorage.setItem('lastBirthDate', JSON.stringify({ day, month, year }));

    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const currentDate = new Date();

    const age = getAge(birthDate, currentDate);

    displayResults(age);

    // For debugging purposes
    console.log('Birth date:', birthDate);
    console.log('Current date:', currentDate);
    console.log('Calculated age:', age);
}

// Calculates the difference in years, months, and days between two dates
function getAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // If days are negative, borrow days from previous month
    if (days < 0) {
        months--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += prevMonth;
    }

    // If months are negative, borrow months from previous year
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

// Helper: Calculate days until next birthday
function getDaysUntilNextBirthday(birthDate, currentDate) {
    // Set next birthday to this year
    let nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    // If birthday has already passed this year, move to next year
    if (
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() > birthDate.getDate())
    ) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    // Special handling for Feb 29 birthdays on non-leap years
    if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !isLeapYear(nextBirthday.getFullYear())) {
        nextBirthday = new Date(nextBirthday.getFullYear(), 2, 1); // March 1
    }
    const diffTime = nextBirthday - currentDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper: Check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

// Shows the calculated age and extra info (like birthday countdown)
function displayResults(age) {
    yearsSpan.textContent = age.years;
    monthsSpan.textContent = age.months;
    daysSpan.textContent = age.days;

    resultSection.style.display = 'block';
    resultSection.style.opacity = 0;
    resultSection.style.transition = 'all 0.5s ease-in-out';
    setTimeout(() => {
        resultSection.style.opacity = 1;
        resultSection.style.transform = 'translateY(0)';
    }, 100);

    // Calculate and display days left until next birthday
    const birthDate = new Date(parseInt(yearInput.value), parseInt(monthInput.value) - 1, parseInt(dayInput.value));
    const currentDate = new Date();
    const daysLeft = getDaysUntilNextBirthday(birthDate, currentDate);
    if (daysLeft === 0) {
        birthdayCountdown.textContent = "🎉 Happy Birthday!";
    } else {
        birthdayCountdown.textContent = `🎂 ${daysLeft} day${daysLeft === 1 ? '' : 's'} until your next birthday.`;
    }

    // Show special message if user was born in a leap year or today is their birthday
    let msg = "";
    if (isLeapYear(birthDate.getFullYear())) {
        msg += `You were born in a leap year! `;
    }
    if (
        birthDate.getDate() === currentDate.getDate() &&
        birthDate.getMonth() === currentDate.getMonth()
    ) {
        msg += `Today is your birthday! 🎈`;
    }
    specialMessage.textContent = msg;
}

function showErrorMessage(message) {
    errorMesssage.textContent = message;
    errorMesssage.style.display = 'block';
    resultSection.style.display = 'none';
}

function hideErrorMessage() {
    errorMesssage.textContent = 'Kindly input your birth date to calculate your age.';
    errorMesssage.style.display = 'none';
    resultSection.style.display = 'none';
}

// Copy age result to clipboard for easy sharing
if (copyBtn) {
    copyBtn.addEventListener('click', function () {
        const years = yearsSpan.textContent;
        const months = monthsSpan.textContent;
        const days = daysSpan.textContent;
        const text = `My age is ${years} years, ${months} months, and ${days} days.`;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "Copied!";
            setTimeout(() => {
                copyBtn.textContent = "Copy Age";
            }, 1200);
        });
    });
}

// Toggle dark mode and remember user preference
darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'on' : 'off');
    // Change icon
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// On load, set dark mode if previously chosen by user
if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
} else {
    darkModeToggle.textContent = '🌙';
}

// Restore last entered birth date if available (user convenience)
window.addEventListener('DOMContentLoaded', function () {
    const last = localStorage.getItem('lastBirthDate');
    if (last) {
        try {
            const { day, month, year } = JSON.parse(last);
            if (day && month && year) {
                dayInput.value = day;
                monthInput.value = month;
                yearInput.value = year;
            }
        } catch (e) {}
    }
});

// Auto-focus logic for better user experience when entering date
dayInput.addEventListener('input', function () {
    const dayValue = parseInt(dayInput.value);
    // Only move focus if the day is valid and user has entered two digits
    if (dayInput.value.length === 2 && dayValue >= 1 && dayValue <= 31) {
        monthInput.focus();
    }
    // For single digits, we wait for the second digit before moving focus
});

monthInput.addEventListener('input', function () {
    const monthValue = parseInt(monthInput.value);
    // Move focus to year only if month is valid and two digits are entered
    if (monthInput.value.length === 2 && monthValue >= 1 && monthValue <= 12) {
        yearInput.focus();
    }
    // If user types '1', wait for second digit (for months 10, 11, 12)
});

yearInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        calculateAge(); // Calculate age immediately
    }
});
