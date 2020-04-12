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

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  const attemptDisplay = document.querySelector('#attempt')
  let attemptCount = 0
  let cardsChosen = []
  let cardsChosenId = []
  const cardsWon = []
  const applause = new Audio("applause.wav")
  const blop = new Audio("blop.wav")
  const wrong = new Audio("no-dear.wav")
  const right = new Audio("cheer.wav")
  const start = new Audio("start.wav")

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
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.jpg')
      cards[optionTwoId].setAttribute('src', 'images/white.jpg')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      right.play()
      attemptCounter()
    } else if (cardsChosen[0] !== cardsChosen[1] && cardsChosenId[0] !== cardsChosenId[1]){
      cards[optionOneId].setAttribute('src', 'images/memory.png')
      cards[optionTwoId].setAttribute('src', 'images/memory.png')
      alert('Sorry, try again')
      wrong.play()
      attemptCounter()
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
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
      setTimeout(checkForMatch, 500)
    }
  }


  function attemptCounter() {
    attemptCount++
    attemptDisplay.textContent = attemptCount
  }

  document.getElementById("reset").onclick = function reset() {
    window.location.reload()
  };

createBoard()

//needs custom alert modals
//did not build for mobile first **reminder to self: ALWAYS BUILD FOR MOBILE FIRST! 

})
