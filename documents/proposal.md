# __Team Antiprocrastinator Proposal__
## __Introduction__
#### __Problem__
Procrastination has been a huge hurdle in the lives of many students and workers. While some people have the self-discipline to get work done, many people like our group aren't great at staying focused. Some of our members have participated in procrastination and have also had firsthand experience of the consequences of procrastination (e.g. all-nighters, lower grades). Many procrastinators like ourselves push school and work to the side and instead pursue various forms of entertainment, such as computer games or internet videos, in order to avoid doing work. This forces procrastinators to put off their assignments until the deadline, to which they are forced to cram a few days' worth of work into a few hours, which consequently means that the procrastinator will be physically and mentally exhausted, and the work completed will be of mediocre quality at best.
#### __Solution__
The solution is to make procrastinating harder. Specifically, we will be hindering the access of any websites or computer programs that the user has blacklisted. There are browser extensions that can block websites, but those just leave the user waiting in anticipation until their websites are unblocked when the timer ends. Our goal is to use a wireless, battery-powered watch with an integrated speaker that, upon receiving a signal from the computer that the user is using blacklisted sites/programs, continuously plays an annoying sound until said sites/programs are closed. This watch consists of a few components in order for it to work:
- Computer software that detects what programs are being run and what websites are currently open
- A Bluetooth module that will receive signals from the user's computer
- A sound-emitting device (i.e. a piezo buzzer)
- A small microcontroller that handles the signals from the Bluetooth module
- Power circuit for handling the different voltages and charging
#### __Visual Aid__
![Never gonna give you up, never gonna let you down, never gonna run around and desert you](../images/visual_aid.png "Visual Aid")
#### __High-Level Requirements__
- The watch must be able to wirelessly connect to the computer via Bluetooth.
- The watch's output must be noticeable/annoying to the user for the watch to be effective at deterring procrastination (between 40-60 dB).
- The delay between opening/closing a blacklisted website and the watch buzzer turning on/off should be small (less than 3 seconds).
## __Design__
#### __Block Diagram__
![Never gonna give you up, never gonna let you down, never gonna run around and desert you](../images/block_diagram.png "Block Diagram")
#### __Subsystem Overview__
##### Power Subsystem
The Power Subsystem provides all of the power for all of the components in our device. Using the 3.7v battery and the 3v voltage regulator, the Power Subsystem is able to provide all of the necessary voltages that the various components in our device use. The Power Subsystem connects to the Control and Output Subsystems by providing 3.7v to the board microcontroller. It also connects to the Control Subsystem by providing 3v to the Bluetooth module. Lastly, it provides 3.7v to the piezo buzzer in the Output Subsystem.
##### Control Subsystem
The Control Subsystem receives any Bluetooth data coming from the host computer so it knows what to tell the microcontroller (e.g. to turn the piezo buzzer on/off). The Bluetooth module in the Control Subsystem gets the Bluetooth data, and then relays it to the board microcontroller. The Control Subsystem connects to the Output Subsystem by the board microcontroller generating a 1000 Hz square wave, which is sent to the piezo buzzer in the Output Subsystem.
##### Output Subsystem
The Output Subsystem receives waves from the board microcontroller and plays it out loud via the piezo buzzer in the Output Subsystem. The Output Subsystem's main function is to annoy the user (via the loud piezo buzzer) whenever a blacklisted website/program is opened, and it keeps playing until the blacklisted websites/programs are closed. The effectiveness of our project depends on the Output Subsystem.
##### User Interface Subsystem
The User Interface Subsystem reads programs and websites running on the user's host computer. The user can whitelist/blacklist websites/programs via Windows software and browser extension software. The detection of blacklisted websites/programs and the user interface to add websites/programs to the blacklist/whitelist is provided by the software in the User Interface Subsystem. When the software detects a blacklisted website/program running, it sends a wireless signal via Bluetooth to our device's Bluetooth module, which is how the User Interface Subsystem connects with the Control Subsystem.
#### __Subsystem Requirements__
##### Power Subsystem
The Power Subsystem must be able to supply a continuous voltage of 3.7 volts to the piezo buzzer and to the board microcontroller. It also must be able to step down 3.7 volts to 3 volts. And it must be able to supply a continuous voltage of 3 volts to the Bluetooth module.
##### Control Subsystem
The Control Subsystem must be able to receive a Bluetooth signal sent from a host computer to the Bluetooth module. It must also be able to interpret the signal received by the Bluetooth module to instruct the board microcontroller to turn on/off the 1000 Hz square wave. 
##### Output Subsystem
The Output Subsystem must be able to send a 1000 Hz square wave generated by the board microcontroller to the piezo buzzer upon instruction by the Bluetooth module (in the control subsystem). It must also be able to stop sending a 1000 Hz square wave upon instruction by the Bluetooth module (in the control subsystem). The piezo buzzer must be able to output a 1000 Hz square wave (generated by the board microcontroller) whenever the board microcontroller sends a 1000 Hz square wave to the piezo buzzer.
##### User Interface Subsystem
The User Interface Subsystem must be able to allow a user to add/remove applications/websites to a blacklist/whitelist managed by the browser extension software and Windows software. It must also be able to detect what applications and websites are running/open. It must also be able to send a 'start'/'stop' signal via Bluetooth to the Bluetooth module (in the control subsystem) when a blacklisted/whitelisted application/website is opened/closed.
#### __Tolerance Analysis__
- The most difficult and also crucial part of the project will likely be the Bluetooth connection that needs to be made by the module. The connection needs to be consistent and not drop or have too much interference for the project to be effective. Having the signal drop while the user has just accessed a banned site could cause the device to continue to annoy the user even after exiting the website. The best way we can prevent this is to test locations of the watch to determine optimal distances from the computer to the Bluetooth module to decrease chances of losing the signal.
- The battery power and charging system may also pose difficulty as we will have to determine how long to charge the watch and how long it will be before it runs out of batter while it is powering out system. We will use the battery in conjuction with our modules to make sure we not only have a sufficiently powerful battery that can hold a good amount of charge, but also that it can be as small as possible because it is attached to the users wrist and shouldnt be too heavy.
## __Ethics and Safety__
In the interest of following principle 1.2 of the ACM Code of Ethics, we will ensure that the possibility of being injured or harmed by our project is minimal by selecting a piezo buzzer with a low decibel range that match our requirements of being 40-60 dB as to not harm the ears of our users [3]. We hope to respect privacy and honor confidentiality of our users as stated in principles 1.6 and 1.7 by having users input the desired websites and programs to blacklist rather than automatically collecting data on the users browsing habits and having the device decide [1]. We will act in accordance with principle 2.9 by thoroughly testing and updating the functions of our device to make sure it works as intended, focusing on specifically making sure that the device is able to detect user-inputted websites and programs, and emitting a safe level of noise when doing so. In the same vein, we will ensure that this data remains secure so that there are no potential leaks of information of any kind.
In order to follow the guidelines of the IEEE Code of Ethics, we will keep the safety, health, and welfare of the public as a top priority when designing our project [2]. Our project involves a lot of potentially dangerous electrical components. Should any of these components prove to endanger a user in any way, we will make revisions to our design in order to remove the threat.
### __References__
[1] “ACM Code of Ethics Booklet - Association for Computing ...” [Online]. Available: https://www.acm.org/binaries/content/assets/about/acm-code-of-ethics-booklet.pdf. [Accessed: 11-Feb-2022]. 

[2] “IEEE code of Ethics,” IEEE. [Online]. Available: https://www.ieee.org/about/corporate/governance/p7-8.html. [Accessed: 11-Feb-2022]. 

[3] “What noises cause hearing loss?,” Centers for Disease Control and Prevention, 07-Oct-2019. [Online]. Available: https://www.cdc.gov/nceh/hearing_loss/what_noises_cause_hearing_loss.html#:~:text=Common%20Sources%20of%20Noise%20and%20Decibel%20Levels&amp;text=A%20whisper%20is%20about%2030,immediate%20harm%20to%20your%20ears. [Accessed: 11-Feb-2022]. 
