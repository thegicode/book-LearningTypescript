var FieldTrip = /** @class */ (function () {
    function FieldTrip(destination) {
        this.destination = destination;
        console.log("we're goging to ".concat(this.destination));
        this.noneexistent = destination;
        // Error : Property 'noneexistent' does not exist on type 'FieldTrip'.
    }
    return FieldTrip;
}());
var trip = new FieldTrip("place");
trip.destination;
trip.noneexistent;
