"use strict";
class WithValue {
    // Error : 속성 'unused'은(는) 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다.
    constructor() {
        this.immediate = 0; // Ok
        this.later = 1;
    }
}
