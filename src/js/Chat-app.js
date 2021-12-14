class ChatApp extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.chatMessages = this.shadowRoot.querySelector('#messages')
    this.chatInput = this.shadowRoot.querySelector('#chatInput')
    this.sendBtn = this.shadowRoot.querySelector('#send')
    this.chat = this.shadowRoot.querySelector('#chat')
    this.changeUsername = this.shadowRoot.querySelector('#changeUserName')
    this.hasUsername = true
    this.chatObj = {
      type: 'message',
      data: 'The message text is sent using the data property',
      username: '',
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
  }

  /**
   * Received data handling form the websocket and show it to the user
   * bye formatting it + maximum number of the messages
   *
   * @param {MessageEvent} event
   */
  receiveHandler (event) {
    const data = JSON.parse(event.data)
    if (data.type === 'message' || data.type === 'notification') {
      if (this.chatMessages.childNodes.length === 50) {
        this.chatMessages.removeChild(this.chatMessages.childNodes[1])
      }
      const li = document.createElement('li')
      li.appendChild(
        document.createTextNode(
          `${this.messageTimeHandler()} ${data.username}: ${data.data}`
        )
      )
      this.chatMessages.appendChild(li)
      this.chat.scrollTop = this.chat.scrollHeight
    }
  }

  /**
   * Display the time beside the message
   *
   * @returns {string}
   */
  messageTimeHandler () {
    const date = new Date()
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    return time
  }

  /**
   * Setting the user name and sending the messages
   */
  sendHandler () {
    // Check user name and set it
    if (this.hasUsername === false) {
      const username = this.chatInput.value
      if (username.length > 0) {
        window.localStorage.setItem('username', this.chatInput.value)
        this.chatInput.value = ''
        this.chatObj.username = username
        this.removeUserNameHandler()
      }
    } else { // send the message
      const message = this.chatInput.value
      if (message.length > 1) {
        this.chatInput.value = ''
        this.chatObj.data = message
        this.socket.send(JSON.stringify(this.chatObj))
      } else {
        this.chatInput.value = ''
      }
    }
  }

  /**
   * Message removed after sending it
   */
  removeUserNameHandler () {
    this.changeUsername.disabled = false
    this.shadowRoot
      .querySelector('#input')
      .removeChild(this.shadowRoot.querySelector('#input').firstChild)
    this.sendBtn.textContent = 'Send'
    this.hasUsername = true
  }

  /**
   * User input handlers
   */
  userNameHandler () {
    this.changeUsername.disabled = true
    this.chatInput.value = ''
    this.hasUsername = false
    this.sendBtn.textContent = 'Apply'
    let p
    // eslint-disable-next-line prefer-const
    p = document.createElement('p')
    p.textContent = 'Change / Enter your username'
    this.shadowRoot.querySelector('#input').prepend(p)
  }

  connectedCallback () {
    if (!window.localStorage.getItem('username')) {
      this.userNameHandler()
    } else {
      this.chatObj.username = window.localStorage.getItem('username')
    }
    this.socket.addEventListener('message', (event) => {
      this.receiveHandler(event)
    })
    this.sendBtn.addEventListener('click', (event) => {
      this.sendHandler()
    })
    this.changeUsername.addEventListener('click', (event) => {
      this.userNameHandler()
    })
    this.chatInput.addEventListener('click', (event) => {
      this.chatInput.focus()
    })
    this.chatInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.sendHandler()
      }
    })
  }

  disconnectedCallback () {
    this.socket.close()
  }
}
const template = document.createElement('template')
/**
 * Chat application HTML & CSS
 *
 * @type {string}
 */
template.innerHTML =
  `
<style>
ul{
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
}
li {
  list-style-type: none;
}
#chat {
  height: 400px;
  top: 0;
  background-color: white;
  text-align: left;
  overflow: auto;
}
#input {
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: hsl(180,64%,54%);
  height: 100%;
}

button {
  transition-duration: 0.4s;
  height: 20px;
}

button:hover {
  background-color: #615d5d;
  color: white;
}

</style>
<div id="chat">
<ul id="messages">
</ul>
</div>
<div id="input">
<textarea rows="2" cols="50" id="chatInput" name="chatMessage" style="width: 390px">
</textarea>
<button type="button" id="send">Send</button>
<button type="button" id="changeUserName">Username</button>
</div>
`
customElements.define('chat-app', ChatApp)
