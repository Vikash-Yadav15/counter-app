let count = 0;
let saveEl = document.getElementById("save-el");
let countEl = document.getElementById("count-el");
let totalEl = document.getElementById("total-el");
let monthSelect = document.getElementById("month-select");
let yearSelect = document.getElementById("year-select");

let totals = {};  // Object to store totals by month-year
let isNewLine = true;  // Track whether a new line should be started

// Increment the count
function increment() {
    count += 1;
    countEl.textContent = count;
}


function decrement() {
    if(count>0){
        count -= 1;
        countEl.textContent=count;
}}

// Save the current count with month and year
function save() {
    let selectedMonth = monthSelect.value;
    let selectedYear = yearSelect.value;
    let monthYear = selectedMonth + " " + selectedYear;

    if (count > 0) {  // Only save if count is greater than 0
        if (isNewLine) {
            let newEntry = document.createElement("span");
            newEntry.textContent = count + " (" + monthYear + ")";
            saveEl.appendChild(newEntry);
            isNewLine = false;
        } else {
            saveEl.innerHTML += " - " + count + " (" + monthYear + ")";
        }

        // Accumulate the total for the month-year
        if (totals[monthYear]) {
            totals[monthYear] += count;
        } else {
            totals[monthYear] = count;
        }

        // Reset count
        count = 0;
        countEl.textContent = 0;

        // Auto-scroll to the bottom of the #save-el container
        saveEl.scrollTop = saveEl.scrollHeight;
    }
}


// Reset the entries and display totals for month-year combinations
function reset() {
    if (Object.keys(totals).length > 0) {
        let newLine = document.createElement("p");
        newLine.textContent = "------------------";
        saveEl.appendChild(newLine);

        for (let monthYear in totals) {
            let newTotal = document.createElement("p");
            newTotal.textContent = monthYear + ": " + totals[monthYear];
            totalEl.appendChild(newTotal);
        }

        isNewLine = true;
        totals = {};  // Clear totals for next set of entries
    }
}

// Clear everything: all sums, previous entries, and the count
function clearAll() {
    count = 0;
    countEl.textContent = 0;
    saveEl.innerHTML = "Previous entries: ";
    totalEl.innerHTML = "Total sum by month-year:";
    totals = {};  // Clear stored totals
    isNewLine = true;
}
