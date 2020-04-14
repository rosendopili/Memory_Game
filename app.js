document.addEventListener('DOMContentLoaded', () =>{

  const cardArray = [
    {
      name: 'astronaut',
      img: 'images/astronaut.png '
    },
    {
      name: 'astronaut',
      img: 'images/astronaut.png '
    },
    {
      name: 'atomic',
      img: 'images/atomic.png '
    },
    {
      name: 'atomic',
      img: 'images/atomic.png '
    },
    {
      name: 'chemistry',
      img: 'images/chemistry.png '
    },
    {
      name: 'chemistry',
      img: 'images/chemistry.png '
    },
    {
      name: 'microscope',
      img: 'images/microscope.png '
    },
    {
      name: 'microscope',
      img: 'images/microscope.png '
    },
    {
      name: 'poison',
      img: 'images/poison.png '
    },
    {
      name: 'poison',
      img: 'images/poison.png '
    },
    {
      name: 'rocket',
      img: 'images/rocket.png '
    },
    {
      name: 'rocket',
      img: 'images/rocket.png '
    }
  ]

  //randomize cards
  cardArray.sort(() => 0.5 - Math.random())

  //DOM constants
  const grid = document.querySelector('.grid')
  const resultDisplay = document.getElementById('result')
  const attemptDisplay = document.getElementById('attempt')
  const timer = document.getElementById("timer");

  //storage variables
  const cardsWon = []
  let second = 0
  let attemptCount = 0
  let cardsChosen = []
  let cardsChosenId = []

  //sound effect constants
  const applause = new Audio("applause.wav")
  const blop = new Audio("blop.wav")
  const wrong = new Audio("wrong.wav")
  const right = new Audio("right.wav")
  const start = new Audio("start.wav")

  //gameboard function
  function createBoard() {
    start.play()
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('img')
      card.setAttribute('src', 'images/memory.png')
      card.setAttribute('class', 'game-card')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //timer function
  function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML =  second +" seconds"
          second++
    },1000)
  }

  // check matching cards

  function checkForMatch() {
    let cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (cardsChosenId[0] === cardsChosenId[1]){
      alert('Sorry, you have to pick two different cards!')
      cards[optionOneId].setAttribute('src', 'images/memory.png')
      cards[optionTwoId].setAttribute('src', 'images/memory.png')
        wrong.play()
    }
      if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] !== cardsChosenId[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.jpg')
        cards[optionTwoId].setAttribute('src', 'images/white.jpg')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
          cardsWon.push(cardsChosen)
            right.play()
    } else if (cardsChosen[0] !== cardsChosen[1] && cardsChosenId[0] !== cardsChosenId[1]){
        cards[optionOneId].setAttribute('src', 'images/memory.png')
        cards[optionTwoId].setAttribute('src', 'images/memory.png')
          wrong.play()
    }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length + ' of 6 matches'

    //End game summary
      if (cardsWon.length === cardArray.length/2 && attemptCount <= 12){
        resultDisplay.textContent = 'Amazing!! You\'re great at this!'
          clearInterval(interval)
            applause.play()

    } else if (cardsWon.length === cardArray.length/2 && (attemptCount > 12 && attemptCount <= 15)){
        resultDisplay.textContent = 'Good Job but you can do better!'
          clearInterval(interval)
            applause.play()

    } else if (cardsWon.length === cardArray.length/2 && attemptCount > 15){
        resultDisplay.textContent = '...Not bad but try focusing...'
          clearInterval(interval)
            applause.play()

    } else if (cardsWon.length === cardArray.length/2 && attemptCount > 20){
        resultDisplay.textContent = '...I\'m surprised you remembered to finish...'
          clearInterval(interval)
            applause.play()
    }
  }


  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    blop.play()
    if (cardsChosen.length === 2) {
      attemptCounter()
        setTimeout(checkForMatch, 500)
    }
  }

  //count the number of moves a player makes
  function attemptCounter() {
    attemptCount++
      attemptDisplay.textContent = attemptCount
  }

  //reset button function
  document.getElementById("reset").onclick = function reset() {
    window.location.reload()
  };

  document.getElementById("pause").onclick = function pause() {
    // startTimer.pause()
    alert('Hurry Back')
  };

  // document.getElementById("play").onclick = function play() {
  //   startTimer.resume()
  // };



createBoard()
startTimer()

})
