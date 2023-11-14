import { describe , test, expect } from '@jest/globals';
import {Game} from "../app/Game";
import {Round} from "../app/Round";
import {Frame} from "../app/Frame";


describe('Test Jest Setup', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
});

describe('Game setup', () => {
    test('A new game has 3 rounds', () => {
        const g = new Game()
        expect(g.rounds.length).toBe(3)
    })
})

describe('Round setup', () => {
    test('A new Round has 10 rounds', () => {
        const r = new Round()
        expect(r.frames.length).toBe(10)
    })

    test('Calling the nextFrame method increments the current frame by 1', () => {
        const r = new Round()
        let frame = null
        frame = r.nextFrame()
        expect(r.frameIndex).toBe(1)
        r.nextFrame()
        expect(r.frameIndex).toBe(2)
        r.nextFrame()
        expect(r.frameIndex).toBe(3)
    })

    test('Calling the nextFrame method on the last frame of the round should not increment', () => {
        const r = new Round()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        r.nextFrame()
        /** Last Frame **/
        r.nextFrame()
        expect(r.frameIndex).toBe(9)
        r.nextFrame()
        expect(r.frameIndex).toBe(9)
    })

    test('A new Round has 10 frames', () => {
        const r = new Round()
        expect(r.frames.length).toBe(10)
    })
})

describe('Frame setup', () => {

    test('A normal frame has a maximum of 2 rolls', () => {
        const f = new Frame()
        expect(f.maxRolls).toBe(2)
    })

    test('A new frame has 10 pins', () => {
        const f = new Frame()
        expect(f.pins.length).toBe(10)
    })

    test('A normal frame of a round should have max. 2 rolls', () => {
        let f1 = new Frame(1)
        let f2 = new Frame(4)
        let f3 = new Frame(8)
        expect(f1.maxRolls).toBe(2)
        expect(f2.maxRolls).toBe(2)
        expect(f3.maxRolls).toBe(2)
    })

    test('Last frame of a round should have max. 3 rolls', () => {
        const f = new Frame(10)
        expect(f.maxRolls).toBe(3)
    })
})

describe('Game logic', () => {

    test('Making a roll should reduce the number of pins left in the frame', () => {
        const f = new Frame()
        let knockedPins = Math.floor(Math.random() * (f.pins.length));
        let pinsLeft = f.pins.length - knockedPins;
        f.roll(knockedPins);
        f.toString()
        expect(f.pins.length).toBe(pinsLeft)

        knockedPins = Math.floor(Math.random() * (f.pins.length));
        pinsLeft = f.pins.length - knockedPins;
        f.roll(knockedPins);
        f.toString()
        expect(f.pins.length).toBe(pinsLeft)
    })

    test('Making a roll should reduce update score tally in the frame', () => {
        const f = new Frame()
        let knockedPins = Math.floor(Math.random() * (f.pins.length));
        f.roll(knockedPins);
        f.toString()
        expect(f.scores[0]).toBe(knockedPins)

        knockedPins = Math.floor(Math.random() * (f.pins.length));
        f.roll(knockedPins);
        f.toString()
        expect(f.scores[1]).toBe(knockedPins)
    })

    test('Making a roll of 10 pins should mark the Frame with a strike', () => {
        const f = new Frame()
        f.roll(10)
        f.toString()
        expect(f.strike).toBe(true)
        expect(f.spare).toBe(false)
    })

    test('Making 2 rolls which sum to 10 should mark the Frame with a spare', () => {
        const f = new Frame()
        f.roll(5)
        f.roll(5)
        f.toString()
        expect(f.spare).toBe(true)
        expect(f.strike).toBe(false)
    })

    test('Getting a spare on the last frame of a round should grant an extra roll', () => {
        const f = new Frame(10)
        f.roll(4)
        f.toString()
        f.roll(6)
        f.toString()
        expect(f.rollsAvailable).toBe(1)
    })

    test('Getting a strike on the last frame of a round should grant an extra roll', () => {
        const f = new Frame(10)
        f.roll(10)
        f.toString()
        f.roll(10)
        f.toString()
        expect(f.rollsAvailable).toBe(1)
    })

    test('Getting a strike and a spare on the last frame of a round', () => {
        const f = new Frame(10)
        f.roll(10)
        f.toString()
        f.roll(3)
        f.toString()
        f.roll(7)
        expect(f.strike).toBe(true)
        expect(f.spare).toBe(true)
        expect(f.scores.reduce((prev, acc) => prev + acc)).toBe(20)
    })
})
