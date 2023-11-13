import {Frame} from "./Frame.js";
import {STATUS} from "./utils/index.js";


export class Round {
    constructor(roundNumber){
        this.numFrames = 10;
        this.roundNumber = roundNumber;
        this.frames = Array(this.numFrames)
            .fill(undefined)
            .map((val, index) => new Frame(index+1))
        this.frameIndex = 0;
        this.score = 0;
        this.status = STATUS.NOT_STARTED
    }

    addToScore(score){
        this.score += score;
    }

    printRound(){
        this.frames.forEach(f => f.toString())
    }

    set resetRound(game){
        this.frames = Array(10).fill(new Frame())
    }

    /*nextFrame() {
        console.log("Current Frame Index: " + this.frameIndex)
        if (this.frame.isLast) {
            this.status = STATUS.COMPLETE
        } else {
            this.frameIndex = this.frameIndex + 1
            this.frame = this.frames[this.frameIndex]
        }
    }*/
}
