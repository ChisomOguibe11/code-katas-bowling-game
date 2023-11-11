import {Pin} from "./Pin.js";

export class Frame {
    constructor(frameNumber=1) {
        this.frameNumber = frameNumber
        this.pins = new Array(10).fill(new Pin())
        this.maxRolls = frameNumber === 10 ? 3 : 2
        this.isLast = frameNumber === 10
        this.scores = []
        this.strike = false
        this.spare = false
        this.rollsAvailable = 2
    }

    toString() {
        const frame =  `--------------------------------
        Frame Number: #${this.frameNumber}
        Rolls Taken: ${Math.max(this.scores.length, 1)}
        Pins Remaining: ${this.pins.length}
        Score: ${this.scores.reduce((prev, curr) => prev + curr, 0)}
        Strike: ${this.strike ? 'YES' : 'NO'}
        Spare: ${this.spare ? 'YES' : 'NO'}
        --------------------------------`;
        console.log(frame);
        return frame;
    }

    roll(pins) {
        console.log("Knocked Pins: " + pins)
        this.pins.splice(0, pins)
        this.scores.push(pins)
        this.rollsAvailable = this.rollsAvailable - 1
        if (pins === 10) {
            this.setStrike()
        } else if (this.scores.length >= 2 && !this.pins.length) {
            this.setSpare()
        }
    }

    get getPins() {
        return this.pins
    }

    resetPins(pins) {
        this.pins = new Array(10).fill(new Pin())
    }

    setSpare() {
        this.spare = true
        console.log("YOU GOT A SPARE!!!")
        if (this.isLast) {
            this.rollsAvailable = this.rollsAvailable + 1
            this.resetPins()
        }
    }

    setStrike() {
        this.strike = true
        console.log("YOU GOT A STRIKE!!!")
        if (this.isLast && this.scores.length === 1){
            this.rollsAvailable = this.rollsAvailable + 1
            this.resetPins()
        }
    }
}
