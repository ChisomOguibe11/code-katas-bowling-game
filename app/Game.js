import {Round} from "./Round.js";

export class Game {
    constructor() {
        this.rounds = new Array(3).map((val, index) => new Round(index+1))
        this.roundIndex = 0
        this.averageScore = undefined
    }

    start() {
        for (let round of this.rounds) {
            round.setScore(10)
            break;
            for (let frame of round.frames) {
                let knockedPins = Math.floor(Math.random() * (frame.pins.length));
                do {
                    frame.roll(knockedPins)
                    frame.toString()
                } while (frame.rollsAvailable)
                break;
            }
            break;
        }
        console.log(this.rounds[0].score)
    }
}
