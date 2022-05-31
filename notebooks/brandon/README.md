## __2/22/2022__
Worked on the first draft of the pcb in KiCad, adding and connecting all the components within the schematic. The piezo buzzer, bluetooth module, and DIP sockets were not within the standard library of footprints and symbols that KiCad provides. For the piezo buzzer, I represented it as a generic buzzer for reference while importing the DIP sockets and bluetooth module from [KiCad Libraries](https://kicad.github.io/footprints/Package_DIP) and [SnapEDA](https://www.snapeda.com/parts/HC-05/ITead%20Studio/view-part/?company=N%2FA&amp;). The schematic is roughly based on the block diagram and will most likely need revisions given more research.

## __2/24/2022__
Finished Design Document. Added more specifics regarding the control subsystem based on TA suggestion. The device will now check for running websites/programs every 5 seconds, and sends the square wave to the buzzer if it detects a blacklisted item. It will run on a 3 minute-interval of sending the signal and not sending the signal should the blacklisted item continue to run.

## __2/28/2022__
Finished the first draft of the pcb board in KiCad. After doing more research on the parts we plan to use as well as importing their models from SnapEDA ([Battery Connector](https://www.snapeda.com/parts/B2B-XH-A(LF)(SN)/JST%20Sales%20America%20Inc./view-part/), [Voltage Regulator](https://www.snapeda.com/parts/LD1117V33/STMicroelectronics/view-part/), [Switch](https://www.snapeda.com/parts/EG1218/E-Switch/view-part/)), I completed a more accurate schematic of what our potentially board will look like. This allowed me to arrange and route the components of the actually PCB edit of the board. The piezo buzzer will most likely have a connector to the board similar to the LED in the soldering assignment. I removed the ISP and microcontroller from the schematic as we are not planning to solder our chip to the board.

## __2/29/2022__
During our PCB board review, we found out that a lot of parts we were planning to use made the project to simple and easy and would require revision to increase the complexity. Will need to figure what aspects of our design need to be changed in order to do so.

## __3/08/2022__
In order to meet requirements, we've adjusted our PCB design to include more functionality and complexity. We added more components and replaced our old bluetooth module and charger. As a result, I rerouted the PCB board based on the new circuit schematic that Kyle made.

## __3/19/2022__
While we are waiting for our parts to come in, I spent some time researching on how to program our ESP32 chip to send and recieve data through bluetooth signals. One website in particular ([Link](https://randomnerdtutorials.com/esp32-bluetooth-classic-arduino-ide/)) has sizeable knowledge on how to achieve this using a smartphone as the device being connected to.

## __3/20/2022__
During our design review, it was brought to our attention that we needed to modify our design to include more hardware complexity, we sat down and discussed what we should add and came up with including an IR sensor, programming our own bluetooth connection with an ESP32, and our own charging circuit.


## __3/21/2022__
Updated the PCB board arrangement to match Kyle's edit to the schematics and created the new gerber files for second round ordering. Looked into to working out how to take our python code and program it into our ESP32 chip. Seems like we can use Micropython to do so.

## __3/28/2022__
Ordered second round PCB based on the revisions made a few days ago

## __4/5/2022__
More research regarding Micropython coding with the ESP32 led me to sample code that allows connection to a serial bluetooth terminal and the sending/receiving of data between the two devices. The IDE that would have to be used would have to be Thonny Python. To test this however, we would first have to assemble everything on to our PCB in order to program it. ([Link](https://forum.micropython.org/viewtopic.php?t=8645))

## __4/7/2022__
Issues popped up with our 2nd round pcb as some of the parts didn't end up fitting to the board correctly as well as some mechanism not being wired so some adjustments need to be made. We went in as a group to test out some of our parts as they had arrived. Some pins in the ESP32 had specific functionality so we were able to map out the ones that were sufficient for what we needed, mainly a pwm pin for sending a square wave to the buzzer and a potentiometer pin for the IR sensor readings.

## __4/12/2022__
Worked on ESP32 bluetooth. Managed to get a connection to my PC and send data both ways. I was able to monitor the connection through Arduino IDE(instead of Thonny) and a bluetooth serial terminal.

## __4/14/2022__
We received our 3rd PCB order only for it to be someone else's PCB, therefore being unusable to us and leading to us getting delayed as we wait for another PCB order.

## __4/18/2022__
Started looking into data transmission using Pybluez, had difficulties with installing the correct packages due to my outdated laptop but eventually I was able to get it working. Will focus more on actually trying to code it later.

## __4/19/2022__
Made progress sending data from a python script to the ESP32 using Pybluez and Pyserial, incorporated that in to the application detection software so that it can send signals to the chip whenever it detects a blakclisted site. Still need to work on hardware side due to pcb difficulties, incorporating the analog sensors with the software detection and chip.

## __4/20/2022__
Worked on starter code to incorporate the bluetooth application detection with the analog sensors by adding on to our initial ESP32 code meant for Arduino IDE. Not sure if it entirely works yet though as we still have yet to assemble everything. We are planning to meet up Thursday to work on it, so hopefully we will get everything ready in time before the mock presentation.

## __4/21/2022__
Went in as a group to work on soldering the parts on to the pcb as it arrived today. Managed to program the chip to work with the IR sensor and buzzer along with detecting both websites and applications so the majority of our project's functionality is working as intended just in time for the mock demo. We still need to update our design document and work on getting our pcb into its enclosure. Other than that, everything is pretty much finalized.

## __4/22/2022__
After the mock demo, We spent the time to pick up more parts and modified our enclosure to fit our pcb. We screwed everything and after a few adjustments to the code, we pretty much have the finalized device. There were some issues with the IR values being inconsistent after soldering to the pcb, so we adjusted the thresholds to have it function accordingly.

## __4/23/2022__
Took some measurements for verification by measuring the decibel value of the piezo buzzer when it goes off. It follows within our requirements so there isn't really a need to change what we have so far.

## __4/24/2022__
Updated our RV tables as it didn't include the added feature of the IR sensor and replaced the ATTiny with the ESP32. Prepping in general for the upcoming demo, figuring out what to say and what points need to be brought up

## __4/25/2022__
Worked on starter slides to incorporate into our mock presentation. Picked out what points were considered important and who was elaborating on each part. Will surely need to edit in the future after getting feedback.

## __5/1/2022__
After feedback from the mock presentation, we redid our slides to incorporate the grainger engineering presentation theme and improved them to be less wordy and more clear to understand. Drew up a few flowcharts regarding the behaviour of the ESP32 code used for the presentation and final paper.

## __5/2/2022__
Did final presentation today. Got through all the talking points smoothly enough with little difficulties. Now all that's really left is the final paper.

## __5/4/2022__
Sat down with the team to write up the paper. I mainly contributed in writing the conclusion(Accomplishments, Uncertainties, Ethical Considerations, Future Work) and abstract section of the paper.
