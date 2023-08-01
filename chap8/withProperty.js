class WithProperty {
    myProperty: () => {};
}

new WithProperty().myProperty = new WithProperty().myProperty; // false
