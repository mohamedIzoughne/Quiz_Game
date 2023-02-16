const answersEl = document.querySelector('.answers')
const quesEl = document.querySelector('.question')
const countEl = document.querySelector('.q-count')
const secondsEl = document.querySelector('.seconds')
const submitBtn = document.querySelector('.submit-btn')
const resultEl = document.querySelector('.result')
const main = document.querySelector('.main')
const bulletsContainer = document.querySelector('.time-bullets')
let bullets
let seconds = 3
let result = 0
let countDownInterval

// fetch question from a Json Object
setQuiz('./html_questions.json')

async function setQuiz(url) {
  const res = await fetch(url)
  const data = await res.json()
  const length = data.length
  countEl.innerText = length
  addBullets(length)

  let i = 0
  showQuiz(data, i)

  submitBtn.addEventListener('click', changeQues)

  countDown()
  function changeQues() {
    clearInterval(countDownInterval)
    countDown()
    checkResult(data[i]['right_answer'])
    if (i < length - 1) {
      i++
      showQuiz(data, i)
    } else {
      showResult(result, length)
    }
  }
}

// Add the questions and answers to the Quiz
function showQuiz(obj, i) {
  quesEl.innerText = obj[i]['title']
  const labels = document.querySelectorAll('label')

  for (let l = 0; l < labels.length; l++) {
    labels[l].innerText = obj[i][`answer_${l + 1}`]
  }

  colorBullet(i)
}

// Check if the checked answer is correct
function checkResult(rAnswer) {
  const inputs = document.querySelectorAll('input')
  inputs.forEach((inp) => {
    if (inp.checked) {
      if (inp.nextElementSibling.innerText === rAnswer) {
        result++
      }
    }
  })
}

// Adding a Countdown timer to the DOM
function countDown() {
  let rest = 5
  secondsEl.innerText = rest
  countDownInterval = setInterval(() => {
    if (rest > 0) {
      rest--
      secondsEl.innerText = rest
    } else {
      submitBtn.click()
    }
  }, 1000)
}

// show result of the quiz based on the grade
function showResult(grade, l) {
  const rateEl = resultEl.querySelector('b')
  const gradeEl = resultEl.querySelector('.grade')
  const lengthEl = resultEl.querySelector('.length')
  const [m, b, s] = [main, bulletsContainer, submitBtn]

  // hide main, bulletsContainer and submitBtn
  hideElement(m)
  hideElement(b)
  hideElement(s)

  grade >= l - 1
    ? setRate('excellent')
    : grade >= l / 2
    ? setRate('good')
    : setRate('bad')

  function setRate(rate) {
    rateEl.classList.add(rate)
    rateEl.innerText = rate
  }

  lengthEl.innerText = l

  resultEl.classList.remove('d-none')
  gradeEl.innerText = grade

  // Add class of d-none which set display: none
  function hideElement(ele) {
    ele.classList.add('d-none')
  }
}

// color bullets when the question change
function colorBullet(index) {
  bullets[index].classList.add('fill')
}

// create bullets and add them to the DOM
function addBullets(l) {
  for (let i = 0; i < l; i++) {
    const li = document.createElement('li')
    bulletsContainer.firstElementChild.appendChild(li)
  }
  bullets = bulletsContainer.querySelectorAll('li')
}
