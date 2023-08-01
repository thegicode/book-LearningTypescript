class MissingInitializer {
    property?: string;
}

new MissingInitializer().property?.length;

new MissingInitializer().property.length;
// Error : 개체가 'undefined'인 것 같습니다.

export {};
