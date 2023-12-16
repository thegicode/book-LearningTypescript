var Wat;
(function (Wat) {
    Wat["FirstString"] = "first";
    Wat[Wat["SomeNumber"] = 9000] = "SomeNumber";
    Wat[Wat["ImpicitNumber"] = 9001] = "ImpicitNumber";
    Wat["AnotherString"] = "another";
    Wat[Wat["NotAllowed"] = void 0] = "NotAllowed";
})(Wat || (Wat = {}));
