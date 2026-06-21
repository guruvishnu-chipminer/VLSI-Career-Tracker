// =========================
// CHECKBOX SAVE & LOAD
// =========================

const checkboxes = document.querySelectorAll(".task");

function saveCheckboxes() {
    let states = [];

    checkboxes.forEach(cb => {
        states.push(cb.checked);
    });

    localStorage.setItem(
        "vlsi_tracker_checkboxes",
        JSON.stringify(states)
    );

    updateProgress();
    updateStreak();
}

function loadCheckboxes() {

    const saved = JSON.parse(
        localStorage.getItem("vlsi_tracker_checkboxes")
    );

    if(saved){

        checkboxes.forEach((cb,index)=>{

            cb.checked = saved[index];

            if(cb.checked){
                cb.parentElement.classList.add("completed");
            }

        });

    }

    updateProgress();
}

checkboxes.forEach(cb => {

    cb.addEventListener("change", ()=>{

        if(cb.checked){
            cb.parentElement.classList.add("completed");
        }
        else{
            cb.parentElement.classList.remove("completed");
        }

        saveCheckboxes();

    });

});

// =========================
// PROGRESS BAR
// =========================

function updateProgress(){

    let total = checkboxes.length;

    let completed = 0;

    checkboxes.forEach(cb=>{

        if(cb.checked){
            completed++;
        }

    });

    let percent = Math.round(
        (completed/total)*100
    );

    document.getElementById(
        "overallProgress"
    ).style.width = percent + "%";

    document.getElementById(
        "overallPercent"
    ).innerText = percent + "% Completed";

}

// =========================
// NOTES SAVE
// =========================

const notes = document.getElementById("notes");

notes.addEventListener("input", ()=>{

    localStorage.setItem(
        "vlsi_notes",
        notes.value
    );

});

function loadNotes(){

    let savedNotes =
        localStorage.getItem("vlsi_notes");

    if(savedNotes){

        notes.value = savedNotes;

    }

}

// =========================
// AUGUST 4 COUNTDOWN
// =========================

function updateAugustTimer(){

    const target =
        new Date("2026-08-04T00:00:00");

    const now = new Date();

    const diff =
        target - now;

    if(diff <= 0){

        document.getElementById(
            "aug4Timer"
        ).innerText = "Goal Day Reached";

        return;
    }

    const days =
        Math.floor(diff/(1000*60*60*24));

    const hours =
        Math.floor(
            (diff%(1000*60*60*24))
            /(1000*60*60)
        );

    document.getElementById(
        "aug4Timer"
    ).innerText =
        `${days} Days ${hours} Hours`;

}

// =========================
// MONTH END COUNTDOWN
// =========================

function updateMonthTimer(){

    const now = new Date();

    const endMonth =
        new Date(
            now.getFullYear(),
            now.getMonth()+1,
            0,
            23,
            59,
            59
        );

    const diff =
        endMonth - now;

    const days =
        Math.floor(diff/(1000*60*60*24));

    const hours =
        Math.floor(
            (diff%(1000*60*60*24))
            /(1000*60*60)
        );

    document.getElementById(
        "monthTimer"
    ).innerText =
        `${days} Days ${hours} Hours`;

}

// =========================
// WEEK COUNTDOWN
// =========================

function updateWeekTimer(){

    const now = new Date();

    const day = now.getDay();

    const remaining =
        7 - day;

    document.getElementById(
        "weekTimer"
    ).innerText =
        remaining + " Days";

}

// =========================
// STREAK SYSTEM
// =========================

function updateStreak(){

    const today =
        new Date().toDateString();

    const lastDate =
        localStorage.getItem(
            "last_activity_date"
        );

    let streak =
        parseInt(
            localStorage.getItem(
                "vlsi_streak"
            )
        ) || 0;

    if(lastDate !== today){

        streak++;

        localStorage.setItem(
            "vlsi_streak",
            streak
        );

        localStorage.setItem(
            "last_activity_date",
            today
        );

    }

    document.getElementById(
        "streak"
    ).innerText =
        streak + " Days";

}

function loadStreak(){

    let streak =
        localStorage.getItem(
            "vlsi_streak"
        ) || 0;

    document.getElementById(
        "streak"
    ).innerText =
        streak + " Days";

}

// =========================
// INITIAL LOAD
// =========================

loadCheckboxes();
loadNotes();
loadStreak();

updateAugustTimer();
updateMonthTimer();
updateWeekTimer();

setInterval(()=>{

    updateAugustTimer();
    updateMonthTimer();
    updateWeekTimer();

},1000);
