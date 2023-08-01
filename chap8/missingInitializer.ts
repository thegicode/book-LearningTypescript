class MissingInitializer {
    property: string;
    // Error : 속성 'property'은(는) 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다.
}

new MissingInitializer().property.length;
// Runtime error : Cannot read properties of undefined (reading 'length')

export {};
