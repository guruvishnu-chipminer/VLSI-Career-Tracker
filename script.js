// ======================================
// TAB SWITCHING
// ======================================

function openTab(tabId) {

    const tabs =
        document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {

        tab.classList.remove("active-tab");

    });

    document
        .getElementById(tabId)
        .classList.add("active-tab");

    const buttons =
        document.querySelectorAll(".tab-btn");

    buttons.forEach(btn => {

        btn.classList.remove("active");

    });

    event.target.classList.add("active");

}

// ======================================
// DARK MODE
// ======================================

const darkBtn =
    document.getElementById("darkModeBtn");

function loadDarkMode() {

    const dark =
        localStorage.getItem("darkMode");

    if (dark === "true") {

        document.body.classList.add("dark");

        darkBtn.innerHTML =
            "☀ Light Mode";

    }

}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const enabled =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "darkMode",
        enabled
    );

    darkBtn.innerHTML =
        enabled
            ? "☀ Light Mode"
            : "🌙 Dark Mode";

});

// ======================================
// CHECKBOX STORAGE
// ======================================

const tasks =
    document.querySelectorAll(".task");

function saveTasks() {

    let states = [];

    tasks.forEach(task => {

        states.push(task.checked);

    });

    localStorage.setItem(
        "vlsiTasks",
        JSON.stringify(states)
    );

    updateAllProgress();

}

function loadTasks() {

    const saved =
        JSON.parse(
            localStorage.getItem("vlsiTasks")
        );

    if (!saved) return;

    tasks.forEach((task, index) => {

        task.checked =
            saved[index];

        if (task.checked) {

            task.parentElement.classList.add(
                "completed"
            );

        }

    });

}

tasks.forEach(task => {

    task.addEventListener(
        "change",
        () => {

            if (task.checked) {

                task.parentElement.classList.add(
                    "completed"
                );

            } else {

                task.parentElement.classList.remove(
                    "completed"
                );

            }

            saveTasks();

        }
    );

});

// ======================================
// SUBJECT PROGRESS
// ======================================

function calculateSubjectProgress(
    className,
    barId,
    percentId
) {

    const items =
        document.querySelectorAll(
            "." + className
        );

    let completed = 0;

    items.forEach(item => {

        if (item.checked) {

            completed++;

        }

    });

    const percent =
        items.length === 0
            ? 0
            : Math.round(
                  (completed /
                      items.length) *
                      100
              );

    document.getElementById(
        barId
    ).style.width =
        percent + "%";

    document.getElementById(
        percentId
    ).innerText =
        percent + "%";

    return percent;

}

// ======================================
// OVERALL READINESS
// ======================================

function updateAllProgress() {

    const digital =
        calculateSubjectProgress(
            "digital",
            "digitalProgress",
            "digitalPercent"
        );

    const verilog =
        calculateSubjectProgress(
            "verilog",
            "verilogProgress",
            "verilogPercent"
        );

    const sv =
        calculateSubjectProgress(
            "systemverilog",
            "svProgress",
            "svPercent"
        );

    const aptitude =
        calculateSubjectProgress(
            "aptitude",
            "aptitudeProgress",
            "aptitudePercent"
        );

    const english =
        calculateSubjectProgress(
            "english",
            "englishProgress",
            "englishPercent"
        );

    const weightedScore =

        digital * 0.30 +
        verilog * 0.25 +
        aptitude * 0.20 +
        english * 0.10 +
        sv * 0.05;

    const finalScore =
        Math.round(weightedScore);

    document.getElementById(
        "overallProgress"
    ).style.width =
        finalScore + "%";

    document.getElementById(
        "overallPercent"
    ).innerText =
        finalScore +
        "% Interview Ready";

}

// ======================================
// NOTES
// ======================================

const dailyNotes =
    document.getElementById(
        "dailyNotes"
    );

const revisionNotes =
    document.getElementById(
        "revisionNotes"
    );

const interviewNotes =
    document.getElementById(
        "interviewNotes"
    );

function saveNotes() {

    localStorage.setItem(
        "dailyNotes",
        dailyNotes.value
    );

    localStorage.setItem(
        "revisionNotes",
        revisionNotes.value
    );

    localStorage.setItem(
        "interviewNotes",
        interviewNotes.value
    );

}

function loadNotes() {

    dailyNotes.value =
        localStorage.getItem(
            "dailyNotes"
        ) || "";

    revisionNotes.value =
        localStorage.getItem(
            "revisionNotes"
        ) || "";

    interviewNotes.value =
        localStorage.getItem(
            "interviewNotes"
        ) || "";

}

dailyNotes.addEventListener(
    "input",
    saveNotes
);

revisionNotes.addEventListener(
    "input",
    saveNotes
);

interviewNotes.addEventListener(
    "input",
    saveNotes
);

// ======================================
// STUDY HOURS
// ======================================

const targetHours =
    document.getElementById(
        "targetHours"
    );

const studyHours =
    document.getElementById(
        "studyHours"
    );

const saveHoursBtn =
    document.getElementById(
        "saveHoursBtn"
    );

const hoursStatus =
    document.getElementById(
        "hoursStatus"
    );

function saveStudyHours() {

    localStorage.setItem(
        "targetHours",
        targetHours.value
    );

    localStorage.setItem(
        "studyHours",
        studyHours.value
    );

    updateStudyHours();

}

function updateStudyHours() {

    const target =
        parseFloat(
            targetHours.value || 0
        );

    const completed =
        parseFloat(
            studyHours.value || 0
        );

    const remaining =
        target - completed;

    hoursStatus.innerHTML =
        "Remaining Hours : " +
        remaining;

}

function loadStudyHours() {

    targetHours.value =
        localStorage.getItem(
            "targetHours"
        ) || 8;

    studyHours.value =
        localStorage.getItem(
            "studyHours"
        ) || 0;

    updateStudyHours();

}

saveHoursBtn.addEventListener(
    "click",
    saveStudyHours
);

// ======================================
// INITIAL LOAD
// ======================================

loadDarkMode();

loadTasks();

loadNotes();

loadStudyHours();

updateAllProgress();
// ======================================
// AUGUST 4 COUNTDOWN
// ======================================

function updateAugustTimer() {

    const target =
        new Date("2026-08-04T00:00:00");

    const now =
        new Date();

    const diff =
        target - now;

    if (diff <= 0) {

        document.getElementById(
            "aug4Timer"
        ).innerHTML =
            "Goal Reached 🚀";

        return;

    }

    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );

    document.getElementById(
        "aug4Timer"
    ).innerHTML =
        days + " Days";

}

// ======================================
// MONTH COUNTDOWN
// ======================================

function updateMonthTimer() {

    const now =
        new Date();

    const endMonth =
        new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
        );

    const diff =
        endMonth - now;

    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );

    document.getElementById(
        "monthTimer"
    ).innerHTML =
        days + " Days";

}

// ======================================
// WEEK COUNTDOWN
// ======================================

function updateWeekTimer() {

    const today =
        new Date();

    const day =
        today.getDay();

    const remaining =
        7 - day;

    document.getElementById(
        "weekTimer"
    ).innerHTML =
        remaining + " Days";

}

// ======================================
// STREAK TRACKER
// ======================================

function updateStreak() {

    const today =
        new Date().toDateString();

    const lastDate =
        localStorage.getItem(
            "lastVisit"
        );

    let streak =
        parseInt(
            localStorage.getItem(
                "streak"
            )
        ) || 0;

    if (lastDate !== today) {

        streak++;

        localStorage.setItem(
            "streak",
            streak
        );

        localStorage.setItem(
            "lastVisit",
            today
        );

    }

    document.getElementById(
        "streak"
    ).innerHTML =
        streak;

}

// ======================================
// POMODORO TIMER
// ======================================

let timer;
let totalSeconds = 1500;

function updatePomodoroDisplay() {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );

    const seconds =
        totalSeconds % 60;

    document.getElementById(
        "pomodoroTimer"
    ).innerHTML =

        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(seconds)
            .padStart(2, "0");

}

document
.getElementById("startTimer")
.addEventListener("click", () => {

    clearInterval(timer);

    timer =
        setInterval(() => {

            if (
                totalSeconds > 0
            ) {

                totalSeconds--;

                updatePomodoroDisplay();

            }

        }, 1000);

});

document
.getElementById("pauseTimer")
.addEventListener("click", () => {

    clearInterval(timer);

});

document
.getElementById("resetTimer")
.addEventListener("click", () => {

    clearInterval(timer);

    totalSeconds = 1500;

    updatePomodoroDisplay();

});

// ======================================
// PLACEMENT TRACKER
// ======================================

const placementBoxes =
    document.querySelectorAll(
        ".placement"
    );

function savePlacement() {

    let states = [];

    placementBoxes.forEach(box => {

        states.push(
            box.checked
        );

    });

    localStorage.setItem(
        "placementData",
        JSON.stringify(states)
    );

}

function loadPlacement() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "placementData"
            )
        );

    if (!saved) return;

    placementBoxes.forEach(
        (box,index) => {

        box.checked =
            saved[index];

    });

}

placementBoxes.forEach(box => {

    box.addEventListener(
        "change",
        savePlacement
    );

});

// ======================================
// CAREER CHECKLIST
// ======================================

const careerBoxes =
    document.querySelectorAll(
        ".career"
    );

function saveCareer() {

    let states = [];

    careerBoxes.forEach(box => {

        states.push(
            box.checked
        );

    });

    localStorage.setItem(
        "careerData",
        JSON.stringify(states)
    );

}

function loadCareer() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "careerData"
            )
        );

    if (!saved) return;

    careerBoxes.forEach(
        (box,index) => {

        box.checked =
            saved[index];

    });

}

careerBoxes.forEach(box => {

    box.addEventListener(
        "change",
        saveCareer
    );

});

// ======================================
// EXPORT CSV
// ======================================

document
.getElementById("exportBtn")
.addEventListener("click", () => {

    let csv =
        "VLSI Tracker Export\n";

    csv +=
        "Interview Readiness,"
        +
        document
            .getElementById(
                "overallPercent"
            )
            .innerText;

    const blob =
        new Blob(
            [csv],
            {
                type:
                "text/csv"
            }
        );

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "vlsi_progress.csv";

    a.click();

});

// ======================================
// RESET TRACKER
// ======================================

document
.getElementById("resetBtn")
.addEventListener("click", () => {

    const confirmReset =
        confirm(
            "Reset all tracker data?"
        );

    if (
        !confirmReset
    ) return;

    localStorage.clear();

    location.reload();

});

// ======================================
// FINAL INITIALIZATION
// ======================================

loadPlacement();

loadCareer();

updateAugustTimer();

updateMonthTimer();

updateWeekTimer();

updateStreak();

updatePomodoroDisplay();

setInterval(() => {

    updateAugustTimer();

    updateMonthTimer();

    updateWeekTimer();

}, 60000);
