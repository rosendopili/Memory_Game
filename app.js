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
  const applause = new Audio("/sounds/applause.wav")
  const blop = new Audio("/sounds/blop.wav")
  const wrong = new Audio("/sounds/no-dear.wav")
  const right = new Audio("/sounds/cheer.wav")

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('img')
      card.setAttribute('src', 'images/pattern.jpg')
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
    if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.jpg')
      cards[optionTwoId].setAttribute('src', 'images/white.jpg')
      cardsWon.push(cardsChosen)
      right.play()
    } else {
      cards[optionOneId].setAttribute('src', 'images/pattern.jpg')
      cards[optionTwoId].setAttribute('src', 'images/pattern.jpg')
      alert('Sorry, try again')
      wrong.play()
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
      attemptCounter()
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
  //current code allows you to choose boxes that have already been matched. code allows you to double click an image and receive a match.  will need to lock the correct selections.

})
