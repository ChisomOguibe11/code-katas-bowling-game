export class Pin {
    constructor() {
        this.knocked = false;
    }

    get getPinStatus() {
        return this.knocked
    }
    knock(){
        this.knocked = true;
    }
}
