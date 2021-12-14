const template = document.createElement('template')

/**
 * Camera application
 */
export class Camera extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.videoElement = this.shadowRoot.querySelector('#camera-stream')
    this.filterBtn = this.shadowRoot.querySelector('.positive.button')
    this.removeFilterBtn = this.shadowRoot.querySelector('.negative.button')
  }

  /**
   * Handles the filters of the camera
   */
  cameraFiltersHandler () {
    const filtersArr = ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'opacity', 'saturate', 'invert']
    const filter = Math.floor(Math.random() * 10)
    console.log(filter)
    this.videoElement.classList = ''
    this.videoElement.classList.add(filtersArr[filter])
  }

  /**
   *
   * Deactivate css property by set the class name to empty string
   */
  removeFilterHandler () {
    this.videoElement.classList = ''
  }

  connectedCallback () {
    /**
     *
     * Browser support checking + user permission request
     */

    if (!navigator.getUserMedia) {
      /**
       * In case something went wrong
       */
      alert('It seems that the browser does not support Camera media ')
    } else {
      // user permission request
      navigator.getUserMedia(
        {
          video: true
        },

        // after the user permission
        (localMediaStream) => {
          this.videoElement.srcObject = localMediaStream
          this.videoElement.play()
          /** filter button  functionality for random video filter
           */
          this.filterBtn.addEventListener('click', (e) => this.cameraFiltersHandler())
          /**
           * Clear filter functionality button to clear filters from the video
           */
          this.removeFilterBtn.addEventListener('click', (e) => this.removeFilterHandler())
        },

        /**
         *  Permission refused case
         *
         * @param {string} ref
         */
        function (ref) {
          console.log('Ops :( Something went wrong : ' + ref)
        }
      )
    }
  }
}

/**
 * HTML
 *
 * @type {string}
 */
template.innerHTML = `
 <div id="video-container" style="height: 300px">
 <link rel="stylesheet" href="index.css">
     <video id="camera-stream" width="400"></video>
     <div style="margin-top: 100px ">
     <button class="negative ui labeled icon button">
       <i class="delete icon"></i>
       Clear filter
     </button>
     <button class="positive ui right labeled icon button">
       <i class="right eye icon"></i>
       Apply filter
     </button>
     </div>
 </div>
`
customElements.define('camera-app', Camera)
