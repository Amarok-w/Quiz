const progress = document.querySelector('.passed');
const questText = document.querySelector('.quest-text');
const answers = document.querySelectorAll('.answer');
const answerdDiv = document.querySelector('.answers');
const wrapGrid = document.querySelector('.wrap-grid');
const truth = document.querySelector('.truth');

const data = {
  questions: ['0 kelvin in degrees celsius equals', 
              'How many elements are in the periodic table?', 
              'How many bits are there in a byte?', 
              'For what does the acronym IT stand?', 
              'What does WWW stand for?', 
              'Who wrote the 1984 novel?',
              'Who was the last tsar of Russia?', 
              'What is the capital of Great Britain?'
              ],

  trueAnswers: [-273.15, 
                118, 
                8, 
                'Information Technology', 
                'World Wide Web', 
                'George Orwell', 
                'Nicholas II',
                'London'
                ],

  falseAnswers: [[0, -225, 100], 
                [100, 97, 54], 
                [1024, 256, 10], 
                ['Internet Technology', 'Independent Television', 'Iteration Technique'], 
                ['Web Wide World', 'Work Wide Web', 'Wrath Wide World'], 
                ['Ray Bradbury', 'Evgeny Zamyatin', 'Aldous Huxley'], 
                ['Alexander III', 'Peter II', 'Michael II'],
                ['Dublin', 'Glasgow', 'Liverpool']
              ],
}

function random(max, min) {
  return ~~(Math.random() * (max - min) + min);
}

let answered = [];
let trueAnswered = 0;
let num;

function createQuest() {

  if (answered.length == data.questions.length) {
    wrapGrid.innerHTML = `
      <div class="end">
      It's all! You answered ${trueAnswered} out of ${data.questions.length} questions correctly <br> Good Luck!
      </div>
      <div class='truth'></div>
    `;
    const truth = document.querySelector('.truth');
    let rt;

    answered.forEach(el => {
      
      truth.innerHTML += `<div>${data.questions[el]} --- ${data.trueAnswers[el]}</div><br>`;
    })


    return 0;
  }

  while (1) {

  num = random(0, data.questions.length);

  if (answered.indexOf(num) == -1) {
    break
  }

  }
  let dump = [];
  while (dump.length != 4) {
    let order = random(0,4);
    if (dump.indexOf(order) == -1) {
      dump.push(order);
    }
  }
  answered.push(num);
  let allAnswers = [data.trueAnswers[num], ...data.falseAnswers[num]];
  questText.innerHTML = data.questions[num];
  let helper = 0;
  answers.forEach(el => {
    el.innerHTML = allAnswers[dump[helper]];
    helper += 1;
  })
  
}
function answerer(el) {
  progress.style.width = answered.length / data.questions.length * 100 + '%';
  
  if (el.innerHTML == data.trueAnswers[num]) {
    trueAnswered += 1;
  }

  createQuest();

}

createQuest();
answerdDiv.addEventListener('click', elem => {
  if (elem.target.classList.contains('answer')) {
    answerer(elem.target);
  }

})