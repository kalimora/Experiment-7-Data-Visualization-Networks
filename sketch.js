const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Days in each month for a common year
let cellSize = 20; // Size of each day cell
let input, updateButton, saveButton, year, notesTextArea;
let dayColors = []; // Array to store colors for each day
let dayNotes = new Array(365).fill(""); // Store notes for each day
let selectedColor = "#FFFFFF"; // Default color
let moods = {
    "Happy": "#FFD700",
    "Sad": "#87CEEB",
    "Angry": "#FF6347",
    "Excited": "#7FFF00"
};

function setup() {
    createCanvas(800, 400);
    textSize(10);
    noLoop();

    // Create input field and button for year input
    input = createInput('');
    input.position(10, 10);
    input.size(100);
    input.attribute('placeholder', 'Enter Year');

    updateButton = createButton('Update Calendar');
    updateButton.position(input.x + input.width + 10, 10);
    updateButton.mousePressed(updateCalendar);

    saveButton = createButton('Save Data');
    saveButton.position(updateButton.x + updateButton.width + 10, 10);
    saveButton.mousePressed(saveData);

    // Create mood buttons
    let xPosition = saveButton.x + saveButton.width + 20;
    for (const [mood, color] of Object.entries(moods)) {
        let button = createButton(mood);
        button.position(xPosition, 10);
        button.mousePressed(() => selectedColor = color);
        xPosition += button.width + 10;
    }

    notesTextArea = createElement('textarea', '');
    notesTextArea.position(10, 430);
    notesTextArea.size(780, 90);
    notesTextArea.attribute('placeholder', 'Click a day to add/view notes...');

    year = new Date().getFullYear(); // Default to current year
    loadData(); // Load data if available
    drawCalendar();
}

function loadData() {
    let storedColors = localStorage.getItem('colors-' + year);
    let storedNotes = localStorage.getItem('notes-' + year);
    if (storedColors && storedNotes) {
        dayColors = JSON.parse(storedColors);
        dayNotes = JSON.parse(storedNotes);
    } else {
        initializeColors(); // Initialize colors and notes if no data is found
    }
}

function initializeColors() {
    dayColors = new Array(365).fill('#FFFFFF'); // Default color for each day
    dayNotes = new Array(365).fill(""); // Clear notes
}

function saveData() {
    localStorage.setItem('colors-' + year, JSON.stringify(dayColors));
    localStorage.setItem('notes-' + year, JSON.stringify(dayNotes));
    alert('Data saved successfully!');
}

function drawCalendar() {
    background(255);
    let currentDayIndex = getCurrentDayIndex();
    let dayIndex = 0;

    // Draw the grid
    for (let m = 0; m < months.length; m++) {
        let days = monthDays[m];
        // Draw month label
        noFill();
        stroke(0);
        text(months[m], 5, m * cellSize + cellSize / 2 + 50);

        for (let d = 0; d < 31; d++) {
            let x = d * cellSize + 40;
            let y = m * cellSize + 50;
            if (d < days) {
                fill(dayColors[dayIndex]); // Fill with color based on dayColors array
                stroke(0);
                // Highlight current day
                if (dayIndex === currentDayIndex) {
                    strokeWeight(2);
                    stroke('#FF0000');
                } else {
                    strokeWeight(1);
                    stroke(0);
                }
                rect(x, y, cellSize, cellSize);
                dayIndex++;
            } else {
                fill(240); // Slightly darker grey to indicate no day
                stroke(0);
                rect(x, y, cellSize, cellSize);
            }
        }
    }
}

function updateCalendar() {
    year = parseInt(input.value()); // Get year from input
    if (isNaN(year)) {
        alert("Please enter a valid year.");
        return;
    }
    loadData(); // Load data for the new year or initialize
    drawCalendar(); // Redraw the calendar with the new year
}

function checkLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        monthDays[1] = 29; // Adjust February to 29 days in a leap year
    } else {
        monthDays[1] = 28; // Ensure February is 28 days otherwise
    }
}

function getCurrentDayIndex() {
    let today = new Date();
    let firstDayOfYear = new Date(today.getFullYear(), 0, 0);
    let diff = today - firstDayOfYear;
    let oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function mousePressed() {
    if (mouseY > 50 && mouseY < height) {
        let col = Math.floor((mouseX - 40) / cellSize);
        let row = Math.floor((mouseY - 50) / cellSize);
        let dayIndex = sumDays(row) + col;

        if (col < monthDays[row] && dayIndex < dayColors.length) {
            dayColors[dayIndex] = selectedColor; // Update color of selected day
            // Show existing note or allow to add a new one
            notesTextArea.value(dayNotes[dayIndex]);
            notesTextArea.input(() => {
                dayNotes[dayIndex] = notesTextArea.value();
            });
            drawCalendar(); // Redraw the calendar with updated colors
        }
    }
}

function sumDays(monthIndex) {
    let sum = 0;
    for (let i = 0; i < monthIndex; i++) {
        sum += monthDays[i];
    }
    return sum;
}
