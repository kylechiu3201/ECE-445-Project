# Feb. 18 2022 Begin coding for application/website detection
I have begun working on the coding for the detection we need to do so that the watch will work correctly. I have figured out application detection fairly quickly with the help of a tutorial [site](https://thispointer.com/python-check-if-a-process-is-running-by-name-and-find-its-process-id-pid/). I am still looking for good ideas on how to detect websites without completely blocking them. 

# Feb. 21 2022 Design Document Analysis
Completed tolerance analysis using data and equations this time. Tolerance analysis concerned battery life of the device we are building and I got that the device will last long enough, about 12 hrs without needing charge. I have also worked on some R/V tables except for the user interface one.

# Feb. 24 2022 Design document update
Added more R/V tables and updated previous ones using feedback from the design document meeting. Adjusted tolerance analysis calculations due to TA input from the design doc meeting about what voltages we should be using for our components. Microcontroller and buzzer will now be using 3.3V, the same as the bluetooth module as opposed the 3.7V they were using before. 

# Feb. 28 2022 Project design updates
After our design doc review we were informed we didn't have enough complexity in our project so we had to brainstorm new additions or reworks to our project to make it more applealing or have some added functionality. We settled on changing our charging circuit from a premade version to our own as well as adding a infrared sensor that will be able to detect when the user is at their desk. This will allow the device to give the user some sort of metric about how long or what percentage of their day was spent at their desk (presumably being productive) as opposed to elsewhere.

# Mar. 1 2022 Worked on chrome extension for website detection
Created a chrome extension that can be loaded in the browser to determine the current active tab that the user is viewing. Found that it is very difficult to try and use the data outside of the broswer context so will plan on using bluetooth within the extension itself.

# Mar. 3 2022 Investigating alternatives to a chrome extension
Possible issues I could envision with having a seperate bluetooth connection for websites and applications is that you may need more that one bluetooth chip and I would like to avoid that if possible. Currently looking into either somehow checking applications with the chrome extension (less likely) or monitoring web traffic using a pythong script on the computer background as it does with applications. There is a library I am looking into called Pyshark that could work?

# Mar. 21/22 2022 Set up backend server for communication between app detection script and chrome extension
The process for the detection system is now that a local server is running on the users computer that holds the current website the user is on. This is accomplished with GET requests that are sent from the chrome extension to the server whenever the user is on a new tab, to update the servers value of the current website. A python script can then send another get request to the server asking the current website. This way There can be one python script that checks for both applications and websites so there is a consolidated script to tell when the user is doing anything blacklisted and the bluetooth signal can be likely sent from there.

# Mar. 27 2022 Server/chrome extension additions
The backend server, python script and chrome extension now send full URLs of the current website instead of what was previously being done which was just to send the domain name. This allows for the blacklist and whitelist to be effective now as the user can blacklist a domain, but also whitelist a website on that domain. If the user wanted to blacklist youtube, but whitelist one video that could play classical music in the background while they work that would now be possible with the current implementation.

# Mar. 28 2022 Working on keeping track of all open tabs
The detection system only keeps track of the current open tab right now. The goal is to have it be aware of all open tabs in the browser. This has become more difficult than I thought it would have been because I tried to use my original method for a single website and it wasnt working. I plan to get this implemented, but its not finished yet.

# Apr. 4 2022 Unit Testing Parts
The parts have arrived and I have started testing them to make sure they work and are what we expect. I have tested the optical sensor and it is accurate with the data sheet. We want to have the parts tested, but need the second board to solder because of changes we made.

# Apr. 5 2022 More part testing and planning
Group decided we should order a new pcb and tested parts to make sure they would work on the new design. 

# Apr. 11 2022 Established communication between esp and pc
Using Wifi the ESP32 and computer running the detection software can now interface with each other and exchange data. The computer will be sending a 0 or 1 to the esp telling it to buzz or not. The esp will be sending the computer the ir sensors data so the computer can keep track of how long the user was at their desk.

# Apr 18 2022 Wrote some sample arduino code
Wrote some sample arduino code outlining psuedo code and going over the flow chart of what the code should do. Also organized the parts so that when the board arrives it will be easier to solder quickly. 

# Apr. 21 2022 Soldering begins
The correct boards finally arrived from PCBWay. The entire team came into the lab today an soldered parts to the boards. We had two people soldering and one testing code with a breadboard. After all the testing things were surprisingly looking good and we are happy with the prototype we have so far. The only component of our design that is not working as intended so far is the snooze button. For some reason it always reads low and doesnt seem to change any state at all when pressed. We will continue to work on this and making the casing for our project nice looking.

# Apr. 22 2022 Enclosure design
We drilled holes in the enclosure to keep our board and sensors in place. while working on this we encountered bugs where the IR sesnor was not working as expected, so we had to re-program the esp and re-solder the IR sensor. Our project looks much more polished now. Filmed videos with the device functioning without the enclosure on to ensure we had proof of the device working.

# Apr. 23 2022 
Started taking some measurments to make sure we meet our R/V tables. Main measurments taken were checking for outputs in the detection software and taking voltage measurments in the power subsystem.

# Apr. 25 2022 Final Demo
Completed final demo with professor and TAs. Everything worked as intended and there werent any issues demoing the main functionalities of detcting the user at the desk and detecting when the user visits blacklisted websites or apps.

# Apr. 27 2022 Mock Presentation prep work
Workedd with teammates to set up a bunch of slides to present at the mock demo. Mostly followed the guidelines set in the rubric.

# Apr. 28 2022 Mock Presentation
Completed the mock presentation and got a lot of good feedback. The most important things were to fix our slides theme, as we wwerent using the ece theme at first. Also incuding more results and challenges would help our presentation a lot because we had a lot of code snippets and R/V tables which were not good to look at for the audience. 

# May 1 2022 Finalized presentation
Worked with teammates to finalize presentation slides and practice presentation so it wouldd go smoothly.

# May 2 2022 Presented
Presented the final presentation to professor and TAs as well as a few peers. The presentation went well and I feel my group hadd good results to our project and am very happy with how the semester went. 

# May 4 2022 Final Paper
Worked with the team to complete the final paper for the class. I was mostly in charge of the design results part of the paper. I gathered as much proof that the design was working as I could, but most of the results were qualitative and not too simple to prove without just saying what happened. I did include the battery lifetime calculations and slightly updated the math with power dissapation from the boost coneverter and voltage regulator to make it more accurate. After doing the new calculations it appeared that I had almost exactly the same number I had before through. 
