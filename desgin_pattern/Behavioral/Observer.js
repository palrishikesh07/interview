/*

Problem Without Observer Pattern
Imagine we have a Weather Station.

Whenever temperature changes, we need to update:
Mobile App
Website
LED Display
*/


class WeatherStation {
    setTemperature(temp) {
        console.log("Temperature updated: ", temp)
        this.updateMobile(temp);
        this.updateWebsite(temp);
        this.updateDisplay(temp);
    }

    updateMobile(temp) {
        console.log("Mobile app updated: ", temp)
    }

    updateWebsite(temp) {
        console.log("Website updated: ", temp)
    }

    updateDisplay(temp) {
        console.log("LED Display updated: ", temp)
    }
}


const weather = new WeatherStation();
weather.setTemperature(29)

/*
Problem Without Observer Pattern

Imagine we have a Weather Station.

Whenever temperature changes, we need to update:

Mobile App

Website

LED Display

*/

/*
Observer Pattern Idea

Instead of directly calling systems:
Observers subscribe to the subject.

Structure:
Subject → Observers

When state changes:
Subject → notify() → all observers

*/