let zIndex = 0
/**
 * HTML for the class with CSS style
 *
 * @type {HTMLTemplateElement}
 */
const template = document.createElement('template')
template.innerHTML = `
<style>
  
#app {
    background-color: white;
    text-align: center;
  }

#appheader {
    padding: 5px;
    cursor: grab;
    background-color: black;
    color: white;
    height: 25px;
    display: flex;
  }
  
#name {
    flex-grow: 1;
  }

#imgClose {
  cursor: pointer;
}

#icon img {
  width: 100%;
}

.aside {
    flex-basis: 20px;
    flex-shrink: 100;
  }
#memoryContainer img {
    width: 100px;
}
.removed {
    visibility: hidden;
}

</style>
<div id="app">
<div id="appheader">
<div id="icon" class="aside"></div>
<div id="name"></div>
<div id="close" class="aside"><img src="/image/exit.svg" id="imgClose" alt="cancel"></div>
</div>
</div>
`
/**
 * Create a draggable window
 * and able to take other classes in it
 * https://www.w3schools.com/howto/howto_js_draggable.asp
 */

class DraggableElement extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  /**
   * static method to get z-index on windows
   *
   * @returns {number} zIndex
   */
  static get zIndex () {
    return zIndex
  }

  // static method to set z-index on windows
  static set zIndex (value) {
    zIndex += value
  }

  /**
   * Sets the component inside the window"
   *
   * @param {object} component
   */

  // eslint-disable-next-line accessor-pairs
  set component (component) {
    this.shadowRoot.querySelector('#app').appendChild(component)
  }

  /**
   * a setter for the icon to set the path in the upper left
   *
   * @param {*} path
   */
  set icon (path) {
    const img = document.createElement('IMG')
    img.src = path
    this.shadowRoot.querySelector('#icon').appendChild(img)
  }

  get icon () {}

  /**
   * A setter form the name on the app in the upper mid
   *
   * @param {Steing} name
   */
  set name (name) {
    this.shadowRoot.querySelector('#name').textContent = name
  }

  get name () { return this.shadowRoot.querySelector('#name').textContent }

  connectedCallback () {
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
    this.addEventListener('mousedown', this.mouseEventsHandler)
    this.updateZindexHandler()
  }

  /**
   * Handel mouse functionality
   *
   * @param  {*} event
   */
  mouseEventsHandler (event) {
    event.preventDefault()
    const close = this.shadowRoot.querySelector('#imgClose')
    const appHeader = this.shadowRoot.querySelector('#appheader')
    const icon = this.shadowRoot.querySelector('#icon')
    const name = this.shadowRoot.querySelector('#name')
    if (
      event.path[0] === appHeader ||
      event.path[0] === icon ||
      event.path[0] === name
    ) {
      this.focusWindowHandler()
      this.updateZindexHandler()
      this.shadowRoot.querySelector('#appheader').style.cursor = 'grabbing'
      this.pos3 = event.clientX
      this.pos4 = event.clientY
      event.target.onmouseup = this.stopDragElementHandler
      event.target.onmousemove = this.elementDragHandler
    } else if (event.path[0] === close) {
      this.removeHandler()
    }
  }

  /**
   * Dragging handler
   *
   * @param {*} event
   */
  elementDragHandler (event) {
    event.preventDefault()
    // calculate element's new position
    this.pos1 = this.pos3 - event.clientX
    this.pos2 = this.pos4 - event.clientY
    this.pos3 = event.clientX
    this.pos4 = event.clientY
    //  set element's new position
    event.target.style.top = `${event.target.offsetTop - this.pos2}px`
    event.target.style.left = `${event.target.offsetLeft - this.pos1}px`
  }

  /**
   * Handles the ending of the dragging event
   *
   * @param {*} event
   */
  stopDragElementHandler (event) {
    // unfocused the window when the mouse button is released
    this.UnFocusedWindowHandler()
    this.shadowRoot.querySelector('#appheader').style.cursor = 'grab'
    event.target.onmouseup = null
    event.target.onmousemove = null
  }

  // close the window and remove it
  removeHandler () {
    this.removeEventListener('mousedown', this.mouseEventsHandler)
    this.remove()
  }

  // Handles the z index possession and update it
  updateZindexHandler () {
    this.style.zIndex = zIndex
    zIndex++
  }

  // Focus on window while holding and dragging
  focusWindowHandler () {
    this.style.border = 'solid 5px  #78e4ff'
  }

  // Remove the focus after releasing the window
  UnFocusedWindowHandler () {
    this.style.border = ''
  }
}

// Register the custom element
customElements.define('draggable-element', DraggableElement)
