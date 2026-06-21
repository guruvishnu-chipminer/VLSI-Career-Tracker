// =====================================
// TAB SWITCHING
// =====================================

function openTab(event, tabId) {

    const tabs =
        document.querySelectorAll(
            ".tab-content"
        );

    tabs.forEach(tab => {

        tab.classList.remove(
            "active-tab"
        );

    });

    const selectedTab =
        document.getElementById(
            tabId
        );

    if(selectedTab){

        selectedTab.classList.add(
            "active-tab"
        );

    }

    const buttons =
        document.querySelectorAll(
            ".tab-btn"
        );

    buttons.forEach(btn => {

        btn.classList.remove(
            "active"
        );

    });

    if(
        event &&
        event.currentTarget
    ){

        event.currentTarget.classList.add(
            "active"
        );

    }

}

// =====================================
// DARK MODE
// =====================================

const darkModeBtn =
document.getElementById(
    "darkModeBtn"
);

function loadDarkMode(){

    const dark =
    localStorage.getItem(
        "vlsi_dark_mode"
    );

    if(dark === "true"){

        document.body.classList.add(
            "dark"
        );

        darkModeBtn.innerHTML =
        "☀ Light Mode";

    }

}

if(darkModeBtn){

    darkModeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );

            const enabled =
            document.body.classList.contains(
                "dark"
            );

            localStorage.setItem(
                "vlsi_dark_mode",
                enabled
            );

            darkModeBtn.innerHTML =
            enabled
            ? "☀ Light Mode"
            : "🌙 Dark Mode";

        }
    );

}

// =====================================
// TASK STORAGE
// =====================================

const tasks =
document.querySelectorAll(
    ".task"
);

function saveTasks(){

    let taskStates = [];

    tasks.forEach(task => {

        taskStates.push(
            task.checked
        );

    });

    localStorage.setItem(
        "vlsi_tasks",
        JSON.stringify(
            taskStates
        )
    );

    updateAllProgress();

}

function loadTasks(){

    const savedTasks =
    JSON.parse(
        localStorage.getItem(
            "vlsi_tasks"
        )
    );

    if(!savedTasks) return;

    tasks.forEach(
        (task,index) => {

        task.checked =
        savedTasks[index];

        if(task.checked){

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

            if(task.checked){

                task.parentElement.classList.add(
                    "completed"
                );

            }
            else{

                task.parentElement.classList.remove(
                    "completed"
                );

            }

            saveTasks();

        }
    );

});

// =====================================
// SUBJECT PROGRESS
// =====================================

function calculateSubjectProgress(

    className,
    progressBarId,
    percentageId

){

    const subjectTasks =
    document.querySelectorAll(
        "." + className
    );

    let completed = 0;

    subjectTasks.forEach(task => {

        if(task.checked){

            completed++;

        }

    });

    const percentage =

    subjectTasks.length === 0

    ? 0

    : Math.round(

        (
            completed /
            subjectTasks.length
        ) * 100

    );

    const progressBar =
    document.getElementById(
        progressBarId
    );

    const percentageText =
    document.getElementById(
        percentageId
    );

    if(progressBar){

        progressBar.style.width =
        percentage + "%";

    }

    if(percentageText){

        percentageText.innerHTML =
        percentage + "%";

    }

    return percentage;

}

// =====================================
// OVERALL READINESS
// =====================================

function updateAllProgress(){

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

    const uvm =
    calculateSubjectProgress(
        "uvm",
        "uvmProgress",
        "uvmPercent"
    );

    const c =
    calculateSubjectProgress(
        "c",
        "cProgress",
        "cPercent"
    );

    const python =
    calculateSubjectProgress(
        "python",
        "pythonProgress",
        "pythonPercent"
    );

    const ai =
    calculateSubjectProgress(
        "ai",
        "aiProgress",
        "aiPercent"
    );

const aptitude = 0;
const english = 0;

    const readiness = Math.round(

        (
            digital +
            verilog +
            sv +
            uvm +
            c +
            python +
            ai +
            aptitude +
            english
        ) / 9

    );

    const overallBar =
    document.getElementById(
        "overallProgress"
    );

    const overallText =
    document.getElementById(
        "overallPercent"
    );

    if(overallBar){

        overallBar.style.width =
        readiness + "%";

    }

    if(overallText){

        overallText.innerHTML =
        readiness +
        "% Interview Ready";

    }

}

// =====================================
// NOTES
// =====================================

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

function saveNotes(){

    if(dailyNotes){

        localStorage.setItem(
            "daily_notes",
            dailyNotes.value
        );

    }

    if(revisionNotes){

        localStorage.setItem(
            "revision_notes",
            revisionNotes.value
        );

    }

    if(interviewNotes){

        localStorage.setItem(
            "interview_notes",
            interviewNotes.value
        );

    }

}

function loadNotes(){

    if(dailyNotes){

        dailyNotes.value =
        localStorage.getItem(
            "daily_notes"
        ) || "";

    }

    if(revisionNotes){

        revisionNotes.value =
        localStorage.getItem(
            "revision_notes"
        ) || "";

    }

    if(interviewNotes){

        interviewNotes.value =
        localStorage.getItem(
            "interview_notes"
        ) || "";

    }

}

if(dailyNotes){

    dailyNotes.addEventListener(
        "input",
        saveNotes
    );

}

if(revisionNotes){

    revisionNotes.addEventListener(
        "input",
        saveNotes
    );

}

if(interviewNotes){

    interviewNotes.addEventListener(
        "input",
        saveNotes
    );

}

// =====================================
// STUDY HOURS
// =====================================

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

function updateStudyHours(){

    if(
        !targetHours ||
        !studyHours ||
        !hoursStatus
    ) return;

    const target =
    parseFloat(
        targetHours.value || 0
    );

    const completed =
    parseFloat(
        studyHours.value || 0
    );

    const remaining =
    Math.max(
        0,
        target - completed
    );

    hoursStatus.innerHTML =
    "Remaining Hours : " +
    remaining;

}

function saveStudyHours(){

    localStorage.setItem(
        "target_hours",
        targetHours.value
    );

    localStorage.setItem(
        "study_hours",
        studyHours.value
    );

    updateStudyHours();

}

function loadStudyHours(){

    if(targetHours){

        targetHours.value =
        localStorage.getItem(
            "target_hours"
        ) || 8;

    }

    if(studyHours){

        studyHours.value =
        localStorage.getItem(
            "study_hours"
        ) || 0;

    }

    updateStudyHours();

}

if(saveHoursBtn){

    saveHoursBtn.addEventListener(
        "click",
        saveStudyHours
    );

}

// =====================================
// INITIAL LOAD
// =====================================

loadDarkMode();
loadTasks();
loadNotes();
loadStudyHours();
updateAllProgress();
// =====================================
// AUGUST 4 COUNTDOWN
// =====================================

function updateAugustTimer(){

    const target =
    new Date("2026-08-04T00:00:00");

    const now =
    new Date();

    const difference =
    target - now;

    const timer =
    document.getElementById(
        "aug4Timer"
    );

    if(!timer) return;

    if(difference <= 0){

        timer.innerHTML =
        "Goal Reached 🚀";

        return;

    }

    const days =
    Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );

    const hours =
    Math.floor(
        (
            difference %
            (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
    );

    timer.innerHTML =
    days +
    " Days " +
    hours +
    " Hrs";

}

// =====================================
// MONTH END COUNTDOWN
// =====================================

function updateMonthTimer(){

    const now =
    new Date();

    const monthEnd =
    new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
    );

    const difference =
    monthEnd - now;

    const days =
    Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );

    const timer =
    document.getElementById(
        "monthTimer"
    );

    if(timer){

        timer.innerHTML =
        days + " Days";

    }

}

// =====================================
// WEEK COUNTDOWN
// =====================================

function updateWeekTimer(){

    const now =
    new Date();

    const currentDay =
    now.getDay();

    const remaining =
    7 - currentDay;

    const timer =
    document.getElementById(
        "weekTimer"
    );

    if(timer){

        timer.innerHTML =
        remaining +
        " Days";

    }

}

// =====================================
// STREAK TRACKER
// =====================================

function updateStreak(){

    const today =
    new Date().toDateString();

    const previous =
    localStorage.getItem(
        "last_visit"
    );

    let streak =
    parseInt(
        localStorage.getItem(
            "study_streak"
        )
    ) || 0;

    if(previous !== today){

        streak++;

        localStorage.setItem(
            "study_streak",
            streak
        );

        localStorage.setItem(
            "last_visit",
            today
        );

    }

    const streakBox =
    document.getElementById(
        "streak"
    );

    if(streakBox){

        streakBox.innerHTML =
        streak;

    }

}

// =====================================
// POMODORO TIMER
// =====================================

let pomodoro;
let totalSeconds = 1500;

function updatePomodoroDisplay(){

    const display =
    document.getElementById(
        "pomodoroTimer"
    );

    if(!display) return;

    const minutes =
    Math.floor(
        totalSeconds / 60
    );

    const seconds =
    totalSeconds % 60;

    display.innerHTML =

        String(minutes)
        .padStart(2,"0")

        +

        ":"

        +

        String(seconds)
        .padStart(2,"0");

}

const startBtn =
document.getElementById(
    "startTimer"
);

const pauseBtn =
document.getElementById(
    "pauseTimer"
);

const resetBtn =
document.getElementById(
    "resetTimer"
);

if(startBtn){

    startBtn.addEventListener(
        "click",
        () => {

            clearInterval(
                pomodoro
            );

            pomodoro =
            setInterval(
                () => {

                if(
                    totalSeconds > 0
                ){

                    totalSeconds--;

                    updatePomodoroDisplay();

                }

            },1000);

        }
    );

}

if(pauseBtn){

    pauseBtn.addEventListener(
        "click",
        () => {

            clearInterval(
                pomodoro
            );

        }
    );

}

if(resetBtn){

    resetBtn.addEventListener(
        "click",
        () => {

            clearInterval(
                pomodoro
            );

            totalSeconds =
            1500;

            updatePomodoroDisplay();

        }
    );

}

// =====================================
// PLACEMENT TRACKER
// =====================================

const placementBoxes =
document.querySelectorAll(
    ".placement"
);

function savePlacement(){

    let data = [];

    placementBoxes.forEach(
        box => {

        data.push(
            box.checked
        );

    });

    localStorage.setItem(
        "placement_tracker",
        JSON.stringify(data)
    );

}

function loadPlacement(){

    const saved =
    JSON.parse(
        localStorage.getItem(
            "placement_tracker"
        )
    );

    if(!saved) return;

    placementBoxes.forEach(
        (box,index) => {

        box.checked =
        saved[index];

    });

}

placementBoxes.forEach(
    box => {

    box.addEventListener(
        "change",
        savePlacement
    );

});

// =====================================
// CAREER CHECKLIST
// =====================================

const careerBoxes =
document.querySelectorAll(
    ".career"
);

function saveCareer(){

    let data = [];

    careerBoxes.forEach(
        box => {

        data.push(
            box.checked
        );

    });

    localStorage.setItem(
        "career_tracker",
        JSON.stringify(data)
    );

}

function loadCareer(){

    const saved =
    JSON.parse(
        localStorage.getItem(
            "career_tracker"
        )
    );

    if(!saved) return;

    careerBoxes.forEach(
        (box,index) => {

        box.checked =
        saved[index];

    });

}

careerBoxes.forEach(
    box => {

    box.addEventListener(
        "change",
        saveCareer
    );

});

// =====================================
// EXPORT PROGRESS
// =====================================

const exportButton =
document.getElementById(
    "exportBtn"
);

if(exportButton){

    exportButton.addEventListener(
        "click",
        () => {

            let report =
            "VLSI TRACKER REPORT\n\n";

            report +=
            "Interview Readiness : " +

            document
            .getElementById(
                "overallPercent"
            )
            .innerText;

            const file =
            new Blob(
                [report],
                {
                    type:
                    "text/plain"
                }
            );

            const link =
            document.createElement(
                "a"
            );

            link.href =
            URL.createObjectURL(
                file
            );

            link.download =
            "VLSI_Report.txt";

            link.click();

        }
    );

}

// =====================================
// RESET TRACKER
// =====================================

const resetTrackerBtn =
document.getElementById(
    "resetBtn"
);

if(resetTrackerBtn){

    resetTrackerBtn.addEventListener(
        "click",
        () => {

            const confirmReset =
            confirm(
                "Delete all saved progress?"
            );

            if(
                !confirmReset
            ) return;

            localStorage.clear();

            location.reload();

        }
    );

}

// =====================================
// FINAL LOAD
// =====================================

loadPlacement();
loadCareer();

updateAugustTimer();
updateMonthTimer();
updateWeekTimer();
updateStreak();
updatePomodoroDisplay();

setInterval(
    () => {

        updateAugustTimer();
        updateMonthTimer();
        updateWeekTimer();

    },
    60000
);
