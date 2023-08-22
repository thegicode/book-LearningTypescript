"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldTrip {
    destination;
    constructor(destination) {
        this.destination = destination;
        console.log(`we're goging to ${this.destination}`);
        this.noneexistent = destination;
        // Error : Property 'noneexistent' does not exist on type 'FieldTrip'.
    }
}
const trip = new FieldTrip("place");
trip.destination;
trip.noneexistent;
