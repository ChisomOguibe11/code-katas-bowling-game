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
        this.status = STATUS.NOT_STARTED
        this.score = 0;
    }

    calculateTotalScore() {
        let totalScore = this.frames[0].getFrameScore()
        this.frames.reduce((prev, curr, index) => {
            let bonus = 0;
            const frameScore = curr.getFrameScore()
            // check if penultimate frame was a strike
            if (prev.strike && curr.isLast) {
                bonus += curr.scores[0]
                bonus += curr.scores[1]
            }
            // checks if non-penultimate frame was a strike
            else if (prev.strike) {
                if (curr.strike) {
                    let nextFrame = this.nextFrame(index)
                    bonus += nextFrame.scores[0] ?? 0
                }
                bonus += frameScore
            }
            // check if prev frame is a spare
            else if (prev.spare) bonus += curr.scores[0] ?? 0
            totalScore = totalScore + frameScore + bonus
            // console.table({frameNumber: curr.frameNumber, frameScore: frameScore + bonus, bonus, totalScore})
            return curr
        })
        this.score = totalScore
    }

    printRound(){
        this.frames.forEach(f => f.toString())
    }

    set resetRound(game){
        this.frames = Array(10).fill(new Frame())
    }

    nextFrame(index=this.frameIndex) {
        console.log("Current Frame Index: " + index)
        let currFrame = this.frames[index]
        if (currFrame.isLast) {
            this.status = STATUS.COMPLETE
            return currFrame
        } else {
            this.frameIndex = index + 1
            return this.frames[this.frameIndex]
        }
    }
}
