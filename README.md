#A03 



<ol>


<li><strong>F1</strong>
I have created a web component class called draggable.js using vanilla javascript which can be used with all my applications inside a single page and make them able to be instantiated multiple times and have the draggable feature on them. Draggable class will include a main block like Shadow DOM which will be like a self containment, it allows us to encapsulate all of my markup and styles in my custom element and the class containing the HTML file of each window will be initialized in the future. In addition, there are some functions that have been implemented like to get the mouse positioned at a specific startup, calculate the positions, add a new position and stop moving when the mouse is released in order to make the elements draggable with focus. The application window supports multi windows functionality so we can open as many windows as we want so when I click on any of the application icons I create a new instance  of the application class inside the same window so I create a new element each time. Focus Window Handler function will apply the focus functionality with a blue border while dragging the window element, this function will be called inside the mouse events handler function. Update index Handler function will do the work and calculate the new possession of the dragged or clicked window and update it, so the targeted window will be focused and it will be on top of all other windows when it is released.
</li> 
<br />

<li><strong>F2</strong>
I used to commit my changes to my code whenever I fix or add something to the application to make my work flexible and easy to fix later. I followed the standard of JS and I used the inline js comment “ JSDoc”  to document my code properly. I used the linters to analyze my code from potential errors and bad coding practices to make sure that my code is consistent. I organized my code according to ES6 
.</li> 
<br />

<li><strong>F3</strong>
I implemented the Memory file along with the necessary methods inside exported functions to make the game with a fixable size. The turn brick handler method is to remove the identical images and rotate them. To shuffle the images purpose I created a shuffle array method. By taking the advantage of the Draggable class allows the user to open many memory game windows at the same time and this is because the draggable class lets the user instantiate a new instance of the game whenever pressing on the memory game icon. The user is able to play the game with and without the mouse and the game will count how many times the user has tried to win.
</li>
<br />

<li><strong>F4</strong>
I created the chat application which is inherited from the html element class and I implemented a constructor to be called whenever it is needed to create an instance of the chat app game. I used the provided server to create the connection along with the web socket. To receive the information from the websocket I implemented the receive handler method in addition to identicate the maximum messages number. The method "message time handler" is implemented to display the chat time beside the messages.With the assistance of the draggableElement class, the user can launch many chat programs at the same time. With the assistance of the draggable element class the user can launch many chat programs simultaneously. When a user initially opens the program he is prompted to input or change his username in the local storage; this will be checked and saved form the send handler method.The user can see up to fifty of most recent messages as the chat program is opened the user can also alter his or her user name at any moment.
</li>
<br />

<li><strong>F5</strong>
I created a camera window application for my PWD. So it takes the same approach as it is inherited from the html element class, the html is created dynamically every time the user runs the game or instantiates an instance of the game. I leverage again from the draggable class, so the user will be able to open as many as needed without a problem. The permisssíon will be required from the user then the app is clicked. Camera filter handler method is implemented to run a random filter each time the user clicks the apply filter button. The remove filter handler method will remove the filter which is applied by the user
.
</li>
<br />

<li><strong>TIL</strong>
Finally,  the project contains numerous new aspects with which I am unfamiliar, and it was difficult to implement. The most difficult element was creating many windows and making them draggable or creating a new component,  But I was able to do that after viewing a bunch of videos online and reading documentation. Also I had a lot of trouble figuring out how to make a numerous windows executable inside one window and each time I tried I got a number of errors. 

The TIL for this assignment is that I am now knowledgeable with SPA construction. In addition I learnt a lot about javascript such as ES modules and standard js.

</li>
<br />



</ol>

[Video presentation](https://www.youtube.com/watch?v=Pcrl-KiK8BA)


