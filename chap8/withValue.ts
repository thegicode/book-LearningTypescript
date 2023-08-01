class WithValue {
    immediate = 0; // Ok
    later: number; // Ok(constructor에서 할당)
    mayBeUndefined: number | undefined; // Ok(undefined)가 되는 것이 허용됨
    unused: number;
    // Error : 속성 'unused'은(는) 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다.

    constructor() {
        this.later = 1;
    }
}
