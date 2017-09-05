# Home Automation with RPi and Javascript

*Updated article: https://viktorkirilov.me/post/home-automation-raspberry-pi/* 

![Intro](https://raw.githubusercontent.com/deepsyx/home-automation/master/Intro.png)

Link to video
=======

https://youtu.be/wh0OoLUTeM8

[![Alt text](http://i.imgur.com/7ZGu5tX.png)](https://youtu.be/wh0OoLUTeM8)

Introduction
=======
Since a kid I've been passionate about electronic and different kind of mechanisms. Previously I've done different small projects with arduino, like handbrake for my gaming steering wheel, custom LED tachometer for my car (see my github repo), voice controlled LEDs and so on. Recently I bought Raspberry PI 3 and around all the IoT hype, I decided to start automating my home.

The Technology Stack
=======
Since I'm pretty familiar with javascript and its ecosystem I decided to create my own phone app via `react native` and connect it via `websockets` to `NodeJS` backend. I'm using ImmutableJS's Records for consistency of the data structure and the performance of the app. The data is sent between the client and the server via JSON strings, which are converted to  back to Immutable records, when received on both sides. I've separated the shared modules(between client and server) to a separate local npm packages - home-records and home-config. For GPIO controlling (pins of the raspberry) I've used `pi-blaster` library, together with `wiringPi`. Since I couldn't find codes for my AC, I've recorded them by myself and added them to `lirc` config file. `Duckdns` cron is used as dynamic dns, because my IP address changes periodically and I won't have to recompile the whole app or change config each time. The server broadcasts the changes to all connected users realtime. The phone app is located in **/phone-app** folder, the server is located in **/server**. Why don't you take a look?

The Hardware
=======
`Raspberry Pi 3` is the controlling unit. High-power devices, such as LED strips, are powered via external [`12V 5A power supply`](http://img.dxcdn.com/productimages/sku_152373_2.jpg) (shared ground with the PI). The AC is controlled via 950nm infrared LED. The heating system is wired via [relay](http://img.dxcdn.com/productimages/sku_121354_2.jpg) (on and off) and [servo](https://cdn.instructables.com/FCM/8DKT/IBXMML6A/FCM8DKTIBXMML6A.MEDIUM.jpg) for the thermostat as I was avoid disassembling. Both [white LED strip](http://www.saving-star.com/wp-content/uploads/2015/08/Flexible-Top-LED-Strips-FL-F5060W15F12-12-.jpg) and [the RGB strip](http://www.ledssuperbright.com/images/ledstrip5ft.jpg) are connected via `IRLZ34N` logical transistors to the PI. There is also [IR receiver](https://i.stack.imgur.com/rojKP.jpg), just in case I want to record anything else. Temperature is measured via DS18B20 temperature sensor.

The wiring looks like:

![Schematic](https://raw.githubusercontent.com/deepsyx/home-automation/master/Schematic.png)

New Ideas
=======
I'm open for all kind of ideas about different modules. If you have some ideas in mind, I'll be thankful if you add it in the issue tracker and label it as `Idea`.

Software dependencies
========
* Node & Npm
* Pi-Blaster
* WiringPi
* Lirc
