
const obtainedMarksInput = document.getElementById("obtainedMarks");
const maximumMarksInput = document.getElementById("maximumMarks");
const percentageResult = document.getElementById("percentageResult");

document.getElementById("percentageButton").addEventListener("click", function () {

    const obtainedMarks = obtainedMarksInput.value.trim();
    const maximumMarks = maximumMarksInput.value.trim();

    if (obtainedMarks === "" || maximumMarks === "") {
        showResult(percentageResult, "Please enter both marks.", "error");
        return;
    }

    const obtained = Number(obtainedMarks);
    const maximum = Number(maximumMarks);

    if (
        !Number.isFinite(obtained) ||
        !Number.isFinite(maximum) ||
        maximum <= 0 ||
        obtained < 0 ||
        obtained > maximum
    ) {
        showResult(
            percentageResult,
            "Enter valid marks. Obtained marks cannot exceed maximum marks.",
            "error"
        );
        return;
    }

    const percentage = (obtained / maximum) * 100;

    showResult(
        percentageResult,
        `Your Percentage: ${percentage.toFixed(2)}%`,
        "success"
    );

});



const gpaSubjects = document.getElementById("gpaSubjects");
const gpaResult = document.getElementById("gpaResult");

document.getElementById("addSubjectButton").addEventListener("click", function () {

    const subjectNumber = gpaSubjects.querySelectorAll(".subject-row").length + 1;

    const row = document.createElement("div");
    row.className = "subject-row";

    row.innerHTML = `
        <div>
            <label>Subject ${subjectNumber} Grade Point</label>
            <input type="number"
                   class="grade-point"
                   placeholder="Example: 9"
                   min="0"
                   max="10"
                   step="any">
        </div>

        <div>
            <label>Subject ${subjectNumber} Credit</label>
            <input type="number"
                   class="subject-credit"
                   placeholder="Example: 4"
                   min="0.01"
                   step="any">
            <button type="button" class="remove-button secondary-button">
                Remove Subject
            </button>
        </div>
    `;

    gpaSubjects.appendChild(row);

});



gpaSubjects.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-button")) {
        event.target.closest(".subject-row").remove();
    }

});


document.getElementById("gpaButton").addEventListener("click", function () {

    const gradeInputs = [...gpaSubjects.querySelectorAll(".grade-point")];
    const creditInputs = [...gpaSubjects.querySelectorAll(".subject-credit")];

    let totalWeightedPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < gradeInputs.length; i++) {

        const gradeText = gradeInputs[i].value.trim();
        const creditText = creditInputs[i].value.trim();

        if (gradeText === "" || creditText === "") {
            showResult(
                gpaResult,
                "Please enter a grade point and credit for every subject.",
                "error"
            );
            return;
        }

        const grade = Number(gradeText);
        const credit = Number(creditText);

        if (
            !Number.isFinite(grade) ||
            !Number.isFinite(credit) ||
            grade < 0 ||
            grade > 10 ||
            credit <= 0
        ) {
            showResult(
                gpaResult,
                "Grade points must be between 0 and 10. Credits must be positive.",
                "error"
            );
            return;
        }

        totalWeightedPoints += grade * credit;
        totalCredits += credit;

    }

    if (totalCredits === 0) {
        showResult(gpaResult, "Please enter subject details.", "error");
        return;
    }

    const gpa = totalWeightedPoints / totalCredits;

    showResult(
        gpaResult,
        `Your GPA: ${gpa.toFixed(2)} / 10`,
        "success"
    );

});




const cgpaSemesters = document.getElementById("cgpaSemesters");
const cgpaResult = document.getElementById("cgpaResult");

document.getElementById("addSemesterButton").addEventListener("click", function () {

    const semesterNumber =
        cgpaSemesters.querySelectorAll(".subject-row").length + 1;

    const row = document.createElement("div");
    row.className = "subject-row";

    row.innerHTML = `
        <div>
            <label>Semester ${semesterNumber} GPA</label>
            <input type="number"
                   class="semester-gpa"
                   placeholder="Example: 8.5"
                   min="0"
                   max="10"
                   step="any">
        </div>

        <div>
            <label>Semester ${semesterNumber} Credits</label>
            <input type="number"
                   class="semester-credit"
                   placeholder="Example: 20"
                   min="0.01"
                   step="any">
            <button type="button" class="remove-button secondary-button">
                Remove Semester
            </button>
        </div>
    `;

    cgpaSemesters.appendChild(row);

});




cgpaSemesters.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-button")) {
        event.target.closest(".subject-row").remove();
    }

});


document.getElementById("cgpaButton").addEventListener("click", function () {

    const gpaInputs = [...cgpaSemesters.querySelectorAll(".semester-gpa")];
    const creditInputs = [...cgpaSemesters.querySelectorAll(".semester-credit")];

    let totalWeightedGPA = 0;
    let totalCredits = 0;

    for (let i = 0; i < gpaInputs.length; i++) {

        const gpaText = gpaInputs[i].value.trim();
        const creditText = creditInputs[i].value.trim();

        if (gpaText === "" || creditText === "") {
            showResult(
                cgpaResult,
                "Please enter a GPA and credits for every semester.",
                "error"
            );
            return;
        }

        const gpa = Number(gpaText);
        const credit = Number(creditText);

        if (
            !Number.isFinite(gpa) ||
            !Number.isFinite(credit) ||
            gpa < 0 ||
            gpa > 10 ||
            credit <= 0
        ) {
            showResult(
                cgpaResult,
                "Semester GPA must be between 0 and 10. Credits must be positive.",
                "error"
            );
            return;
        }

        totalWeightedGPA += gpa * credit;
        totalCredits += credit;

    }

    if (totalCredits === 0) {
        showResult(cgpaResult, "Please enter semester details.", "error");
        return;
    }

    const cgpa = totalWeightedGPA / totalCredits;

    showResult(
        cgpaResult,
        `Your CGPA: ${cgpa.toFixed(2)} / 10`,
        "success"
    );

});



function showResult(element, message, type) {

    element.textContent = message;
    element.className = "result";

    if (type) {
        element.classList.add(type);
    }

}




const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    themeButton.textContent = isDarkMode ? "☀️" : "🌙";

});

