// Variables
const qstsCount = document.querySelector(".question-count")
const qstTitle = document.querySelector("h2")
const answers = document.querySelector(".answers")
const submitBtn = document.querySelector("button")
const bullets = document.querySelector(".bullets")
const seconds = document.querySelector(".seconds")

// Current question
let current = 1
let score = 0

fetch("questions.json")
.then(response => response.json())
.then(questions => {
    
    qstsCount.innerHTML = questions.length

    // Create Bullets
    for (let i = 0; i < questions.length; i++) {
        
        const bullet = document.createElement("span")
        if (i === 0) bullet.className = "on"
        bullets.append(bullet)

    }

    submitBtn.addEventListener("click", () => {

    // Check answer
    if (document.querySelector("input:checked").value === questions[current - 1].right_answer) score++

    if (current < questions.length) {

        // Move to the next question
        displayQst(questions[current])
        current++

    } else {

        // End Quiz and Show result
        clearInterval(counter)
        document.querySelector(".quiz").remove()
        document.querySelector("button").remove()
        document.querySelector(".progress").remove()
        showResult()
        
    }
})

    // Set time left
    let counter = setInterval(() => {

        seconds.textContent--
        if (seconds.textContent < 10) seconds.innerHTML = "0" + seconds.textContent
        if (seconds.textContent === "00") {
            submitBtn.click()
        }

    }, 1000)

})

// Display question
function displayQst(qst) {

    qstTitle.innerText = qst.title
    answers.innerHTML = ""
    for (let i = 1; i <= 4; i++) {

        const div = document.createElement("div")

        const input = document.createElement("input")
        input.type = "radio"
        input.name = "answer"
        input.id = `answer_${i}`
        if (qst[`answer_${i}`] === qst.right_answer) input.value = `${qst[`answer_${i}`]}`
        i === 1 ? input.checked = true : input.checked = false
        div.append(input)

        const label = document.createElement("label")
        label.setAttribute("for", `answer_${i}`)
        label.innerText = `${qst[`answer_${i}`]}`
        div.appendChild(label)
        answers.appendChild(div)

    }

    document.querySelectorAll(".bullets span")[current].className = "on"
    seconds.innerHTML = "30"
}

// Show Results
function showResult() {

    const result = document.createElement("div")
    result.className = "result"
    document.querySelector("main").append(result)

    if (score < 5) {

        result.innerHTML = `<span class="grade bad">Bad</span>, <span>${score}</span> from <span>${qstsCount.textContent}</span>`

    } else if (score > 5 && score < 9) {

        result.innerHTML = `<span class="grade good">Good</span>, <span>${score}</span> from <span>${qstsCount.textContent}</span>`

    } else {
        result.innerHTML = `<span class="grade perfect">Perfect</span>, <span>${score}</span> from <span>${qstsCount.textContent}</span>`
    }

}