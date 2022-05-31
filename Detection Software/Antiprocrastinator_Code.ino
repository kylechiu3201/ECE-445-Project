#include "BluetoothSerial.h"


#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

BluetoothSerial SerialBT;
String message = " ";

// PWM buzzer parameters
const int ledPin = 14;
const int freq = 1000;
const int ledChannel = 0;
const int resolution = 8;
const int dutyCycle = 100;
const int time_period = 5; // In Seconds
int buzzing = 0;
int curtime = 0;

// Snooze pin
const int SNOOZEPIN = 25;
int snooze_count = 0;

// IR sensor pin
int ir_buzz = 0; 
int ir_time = 0;
int away_count = 0;
const int IR_PIN = 34;

void setup() {
  Serial.begin(115200);
  SerialBT.begin("Antiprocrastinator"); //Bluetooth device name
  Serial.println("The device started, now you can pair it with bluetooth!");

  ledcSetup(ledChannel, freq, resolution); // Setup buzzer
  ledcAttachPin(ledPin, ledChannel);

  pinMode(SNOOZEPIN, INPUT); // Setup Snooze Button
  pinMode(IR_PIN, INPUT); // Setup Snooze Button
//  map(analogValue, 0, 4095, 0, ANGLE_MAX);
//  map(analogValue, 0, 4095, 0, 3.3);
}

void loop() {
   // If host device available
   int results = analogRead(IR_PIN);
  if((results > 900 || (millis()-ir_time) >= 10000) && ir_buzz == 1){ // Stop if IR Value is high or 3 minutes passed while buzzing
    ledcWrite(ledChannel, 0);
    SerialBT.println("IR STOP");
    ir_buzz = 0;
    if((millis()-ir_time) >= 10000){
        delay(10000);
    }
  }
  if(results < 900) away_count++;
  else away_count = 0;
  if(away_count > (5*time_period) && ir_buzz == 0){ // If IR value is low, start buzzing
    ledcWrite(ledChannel, dutyCycle);
    SerialBT.println("AFK");
    ir_buzz = 1;
    ir_time = millis(); // Check time to compare for later
  }
  int snooze_state = digitalRead(SNOOZEPIN);
  if(snooze_state) snooze_count++;
  else snooze_count = 0;
  if(snooze_count > 10 && (buzzing == 1 || ir_buzz == 1)){ // Snooze if pressed button and wait 3 minutes
      ledcWrite(ledChannel, 0);
      SerialBT.println("SNOOZING");
      buzzing = 0;
      ir_buzz = 0;
      delay(10000);
  }
  if(buzzing == 1 && (millis()-curtime) >= 10000){ // Wait 3 minutes and stop if buzzing
      ledcWrite(ledChannel, 0);
      buzzing = 0;
      SerialBT.println("WAITING");
      delay(10000);
  }
  if (SerialBT.available()) {
    // Read one character from the host device
    char dat = SerialBT.read();
    message[0] = dat; // Do something with the host device
    if (message == "b" && buzzing == 0) { // Detected blacklisted website/application and if currently buzzing
      // Send a message to the host device
      ledcWrite(ledChannel, dutyCycle); // Start buzzing
      SerialBT.println("BUZZING");
      buzzing = 1;
      curtime = millis(); // Check time to compare for later
    }
    if (message == "s" && buzzing == 1) { // Detected blacklisted website/application and if currently buzzing
      // Send a message to the host device
      ledcWrite(ledChannel, 0); // Start buzzing
      SerialBT.println("STOPPING");
      buzzing = 0;
    }
  }
  delay(200);
}
