"use strict";
class WithProperty {
}
new WithProperty().myProperty = new WithProperty().myProperty; // false
