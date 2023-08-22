"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingInitializer {
    property;
}
new MissingInitializer().property?.length;
new MissingInitializer().property.length;
