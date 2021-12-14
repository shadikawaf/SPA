/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import './js/DraggableElement'
import Memory from './js/Memory.js'
import './js/Chat-app.js'
import './js/Camera'

const memoryApp = document.querySelector('#memory'); const chatApp = document.querySelector('#chat')
const cameraApp = document.querySelector('#camera-stream')
/**
 * Memory game starts
 */
const startMemory = () => {
  const memoryWindow = document.createElement('draggable-element')
  memoryWindow.className = 'app-win'
  memoryWindow.id = 'memory1'
  document.querySelector('#container').prepend(memoryWindow)
  const { firstElementChild: template } = document.querySelector('#memory-template').content
  const container = template.cloneNode(true)
  Memory(4, 4, container)
  memoryWindow.icon = '/image/memory.png'
  memoryWindow.name = 'Memory'
  memoryWindow.component = container
}
/**
 * Chat application starts
 */
const startChat = () => {
  const chatWindow = document.createElement('draggable-element')
  chatWindow.className = 'app-win'
  chatWindow.id = 'chat1'
  document.querySelector('#container').prepend(chatWindow)
  chatWindow.icon = '/image/chat.png'
  chatWindow.name = 'Chat'
  chatWindow.component = document.createElement('chat-app')
}
/**
 * Camera application starts
 */
const startCamera = () => {
  const cameraWindow = document.createElement('draggable-element')
  cameraWindow.className = 'app-win'
  cameraWindow.id = 'camera1'
  document.querySelector('#container').prepend(cameraWindow)
  cameraWindow.icon = '/image/camera.svg'
  cameraWindow.name = 'Camera'
  cameraWindow.component = document.createElement('camera-app')
}
/**
 * By double clicking on the app icon remove the memory window
 */
const removeMemoryWindows = () => {
  const { forEach } = document.querySelectorAll('#memory1')
  forEach((window) => {
    window.remove()
  })
}
/**
 * By double clicking on the app icon remove the chat window
 */
const removeChatWindows = () => {
  const windows = document.querySelectorAll('#chat1')
  for (let i = 0; i < windows.length; i++) {
    const window = windows[i]
    window.remove()
  }
}
/**
 * By double clicking on the app icon remove the camera window
 */
const removeCameraWindows = () => {
  const windows = document.querySelectorAll('#camera1')
  windows.forEach((window) => {
    window.remove()
  })
}

// Open and close memory app by one click for open and double click for close
memoryApp.addEventListener('click', startMemory)
memoryApp.addEventListener('dblclick', removeMemoryWindows)

// Open and close chat app by one click for open and double click for close
chatApp.addEventListener('click', startChat)
chatApp.addEventListener('dblclick', removeChatWindows)

// Open and close camera app by one click for open and double click for close
cameraApp.addEventListener('click', startCamera)
cameraApp.addEventListener('dblclick', removeCameraWindows)
