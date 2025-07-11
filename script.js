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

// Add enter key support
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

    // Save to localStorage
    localStorage.setItem('lastBirthDate', JSON.stringify({ day, month, year }));

    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const currentDate = new Date();

    const age = getAge(birthDate, currentDate);

    displayResults(age);

    // Debugging logs
    console.log('Birth date:', birthDate);
    console.log('Current date:', currentDate);
    console.log('Calculated age:', age);
}

function getAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += prevMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

// Helper: Calculate days until next birthday
function getDaysUntilNextBirthday(birthDate, currentDate) {
    let nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() > birthDate.getDate())
    ) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    // Handle Feb 29 birthdays on non-leap years
    if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !isLeapYear(nextBirthday.getFullYear())) {
        nextBirthday = new Date(nextBirthday.getFullYear(), 2, 1); // March 1
    }
    const diffTime = nextBirthday - currentDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper: Check leap year
function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

// Update displayResults to show special messages
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

    // Birthday countdown
    const birthDate = new Date(parseInt(yearInput.value), parseInt(monthInput.value) - 1, parseInt(dayInput.value));
    const currentDate = new Date();
    const daysLeft = getDaysUntilNextBirthday(birthDate, currentDate);
    if (daysLeft === 0) {
        birthdayCountdown.textContent = "🎉 Happy Birthday!";
    } else {
        birthdayCountdown.textContent = `🎂 ${daysLeft} day${daysLeft === 1 ? '' : 's'} until your next birthday.`;
    }

    // Special message for leap year or birthday
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

// Copy age to clipboard
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

// Dark mode toggle
darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'on' : 'off');
    // Change icon
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// On load, set dark mode if previously chosen
if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
} else {
    darkModeToggle.textContent = '🌙';
}

// Load last calculation if available
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

// Auto-focus and keyboard navigation
dayInput.addEventListener('input', function () {
    const dayValue = parseInt(dayInput.value);
    // Only move focus if the day is valid (1-31) and the length is 2, or if it's a single digit 1-9
    // For single digits, if the user types 4, it should ideally wait for a second digit.
    // If they type 3 and then press a key that's not 0 or 1, then it's invalid.
    // The current logic 'parseInt(dayInput.value) > 3' is a bit too broad.
    // Let's focus on length and valid ranges.

    if (dayInput.value.length === 2 && dayValue >= 1 && dayValue <= 31) {
        monthInput.focus();
    } else if (dayInput.value.length === 1 && dayValue >= 1 && dayValue <= 9) {
        // If it's a single digit from 1-9, we generally wait for the second digit.
        // However, if the user enters '0' and then a number, that's fine (e.g., 01).
        // If they enter '3' and then '2', it's 32 (invalid).
        // This initial check for single digit is more about preventing immediate focus shift
        // when a valid single digit is entered, allowing for two-digit input.
        // The more robust validation will happen during the actual calculation or on blur.
        // For now, if they enter '3' and then type ' ' or another character, it stays.
        // We'll primarily rely on the length check for auto-focus.
    }
});

monthInput.addEventListener('input', function () {
    const monthValue = parseInt(monthInput.value);
    // Only move focus if the month is valid (1-12) and the length is 2, or if it's a single digit 1
    // (e.g., for January, if user types '1', they might type '0' next. If they type '1' then '3', it's 13, invalid)
    if (monthInput.value.length === 2 && monthValue >= 1 && monthValue <= 12) {
        yearInput.focus();
    } else if (monthInput.value.length === 1 && monthValue === 1) {
        // If they type '1', we wait for the second digit (0, 1, or 2).
        // This prevents moving focus after just '1' is typed for '10', '11', '12'.
    }
});

yearInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
        calculateAge(); // Trigger your age calculation
    }
});
