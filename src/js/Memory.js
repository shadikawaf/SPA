// eslint-disable-next-line jsdoc/require-description
/**
 * @param {*} rows
 * @param {*} cols
 * @param {*} container
 */
export default function (rows, cols, container) {
  let tiles = []; let a; let turn1; let turn2; let lastTile; let pairs = 0; let attem = 0
  tiles = shuffle(rows, cols)
  const bricks = document.querySelector('#memory-pic-template').content.firstElementChild
  const result = document.createElement('p')
  result.textContent = 'Attempts: 0'

  for (let index = 0; index < tiles.length; index++) {
    a = document.importNode(bricks, true)

    a.firstElementChild.setAttribute('data-bricknumber', index)

    container.appendChild(a)

    if ((index + 1) % cols === 0) {
      container.appendChild(document.createElement('br'))
    }
  }

  container.appendChild(result)

  container.addEventListener('click', function (event) {
    event.preventDefault()
    const img =
      event.target.nodeName === 'IMG'
        ? event.target
        : event.target.firstElementChild
    const index = parseInt(img.getAttribute('data-bricknumber'))
    turnBrickHandler(tiles[index], img)
  })

  /**
   * Handles the turn bricks functionality and update
   * the number of tries of the user
   *
   * @param {*} tile
   * @param {*|Element} img
   */
  const turnBrickHandler = (tile, img) => {
    if (turn2) {
      return
    }

    img.src = '/image/' + tile + '.png'

    if (!turn1) {
      turn1 = img
      lastTile = tile
    } else {
      if (img === turn1) {
        return
      }

      attem += 1
      turn2 = img
      result.textContent = 'Tries: ' + attem
      container.appendChild(result)

      // turn back the photo is not matches
      if (tile === lastTile) {
        pairs += 1
        if (pairs === (cols * rows) / 2) {
          result.textContent = 'You won on ' + attem + ' attempts!'
        }
        // Delete photo if matches
        setTimeout(() => {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')
          turn1 = null
          turn2 = null
        }, 0b111110100)
      } else {
        setTimeout(() => {
          turn1.src = 'image/0.png'
          turn2.src = 'image/0.png'
          turn1 = null
          turn2 = null
        }, 0b111110100)
      }
    }
  }

  /**
   * Shuffles array created for the game
   *
   * @param {number} rows
   * @param {number} cols
   * @returns {[]}
   */
  function shuffle (rows, cols) {
    const arr = []
    for (let i = 1; i <= (rows * cols) / 2; i += 1) {
      arr.push(i)
      arr.push(i)
    }

    let currentIndex = arr.length
    const zero = 0
    while (zero !== currentIndex) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      const temporaryValue = arr[currentIndex]
      arr[currentIndex] = arr[randomIndex]
      arr[randomIndex] = temporaryValue
    }

    return arr
  }
}
