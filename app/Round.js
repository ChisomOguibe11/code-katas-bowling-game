import {Frame} from "./Frame.js";
import {STATUS} from "./utils/index.js";


export class Round {
    constructor(roundNumber){
        this.roundNumber = roundNumber;
        this.frames = Array(10).map((val, index) => new Frame(index+1))
        this.frameIndex = 0;
        this.frame = this.frames[0]
        this.score = 0;
        this.status = STATUS.NOT_STARTED
    }

    printRound(){
        this.frames.forEach(f => f.toString())
    }

    nextFrame() {
        console.log("Current Frame Index: " + this.frameIndex)
        if (this.frame.isLast) {
            this.status = STATUS.COMPLETE
        } else {
            this.frameIndex = this.frameIndex + 1
            this.frame = this.frames[this.frameIndex]
        }
    }

    get getFrames(){
        return this.frames
    }

    set resetRound(game){
        this.frames = Array(10).fill(new Frame())
    }

    setScore(score){
        this.score = score;
    }
}
