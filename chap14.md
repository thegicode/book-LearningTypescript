# Chapter 14 구문 확장

-   타입스크립트와 같은 상위 집합 언어에 특정 새로운 런타임 기능으로 자바스크립트 구문을 확장하는 방식은 다음과 같은 이유로 나쁜 사례로 간주한다.

    -   런타임 구문 확장이 최신 버전 자바스크립트의 새로운 구문과 충돌할 수 있다는 점이 가장 중요하다.
    -   언어를 처음 접하는 프로그래머가 자바스크립트가 끝나는 곳과 다른 언어가 시작하는 곳을 이해하기 어렵게 만든다.
    -   상위 집합 언어 코드를 사용하고 자바스크립트를 내보내는 트랜스파일러의 복잡성을 증가시킨다.

-   초기 타입스크립트 설계자들이 타입스크립트 언어로 자바스크립트의 세 가지 구문 확장을 도입했다.
    -   클래스 : 사양이 승인됨에 따라 자바스크립트 클래스에 맞춘 클래스
    -   열거형 enum : 키와 값의 일반 객체와 유사한 간단한 구문
    -   네임스페이스 : 코드를 구조화하고 배열하는 최신 모듈보다 앞선 해결책

<br>

---

<br>

## 14.1 클래스 매개변수 속성

-   [TIP] 클래스를 많이 사용하는 프로젝트나 클래스 이점을 갖는 프레임워크가 아니라면 클래스 매개변수 속성을 사용하지 않는 것이 좋다.

[Engineer.ts](./chap14/Engineer.ts)

```
class Engineer {
    readonly area: string;

    constructor(area: string) {
        this.area = area;
        console.log(`I work in ther ${area} area`);
    }
}

new Engineer("mechanical").area;

```

-   타입스크립트는 이러한 종류의 매개변수 속성 parameter property을 선언하기 위한 단축 구문을 제공한다.
-   속성은 클래스 생성자의 시작 부분에 동일한 타입의 멤버 속성으로 할당된다.
-   생성자의 매개변수 앞에 readonly 또는 public, protected, private 제한자 중 하나를 배치하면 타입스크립트가 동일한 이름과 타입의 속성도 선언하도록 지시한다.

[Engineer2.ts](./chap14/Engineer2.ts)

```
class Engineer {
    constructor(readonly area: string) {
        console.log(`I work in ther ${area} area`);
    }
}

new Engineer("mechanical").area;

```

-   매개변수 속성은 클래스 생성자의맨 처음에 할당된다. (또는 기본 클래스로부터 파생된 클래스인 경우 super()를 호출한 이후 할당된다.)
-   매개변수 속성은 다른 매개변수 또는 클래스 속성과 혼합될 수 있다.

[NamedEngineer.ts](./chap14/NamedEngineer.ts)

```
class NamedEngineer {
    fullName: string;

    constructor(name: string, public area: string) {
        this.fullName = `${name}, ${area} engineer`;
    }
}
```

-   매개변수 속성이 없는 이와 동등한 타입스크립트 코드는 비슷해 보이지만 area를 명시적으로 할당하기 위한 코드가 몇 줄 더 있다.

[NamedEngineer2.ts](./chap14/NamedEngineer2.ts)

```
class NamedEngineer {
    fullName: string;
    area: string;

    constructor(name: string, area: string) {
        this.area = area;
        this.fullName = `${name}, ${area} engineer`;
    }
}

```

-   매개변수 속성은 타입스크립트 커뮤니티에서 가끔 논의되는 주제이다.
-   대부분의 프로젝트는 런타임 구문 확장이르모 앞에서 언급했던 단점으로 인해 어려움을 겪기 때문에 매개변수를 완전히 사용하지 않는 것을 선호한다.
-   또한 매개변수 속성은 새로운 #클래스 private 필드 굼ㄴ과 함께 사용할 수 없다.

-   반면에 클래스 생성을 매우 선호하는 프로젝트에서는 매개변수 속성을 사용하면 좋다.
    -   매개변수 속성은 매개변수 속성 이름과 타입을 두 번 선언해야 하는 편의 문제를 해결하는데, 이 선언은 자바스크립트가 아닌 타입스크립트 고유의 것이다.

<br>

---

<br>

## 14.2 실험적인 데코레이터

-   [TIP] ECMA스크립트 버전이 데코레이터 구문으로 승인될 때까지 가능하면 데코레이터를 사용하지 않는 것이 좋다.
-   클래스를 포함하는 많은 다른 언어에서는 클래스와 클래스의 멤버를 수정하기 위한 일종의 런타임 로직으로 주석을 달거나 데코레이팅할 수 있다.
-   데코레이터 함수는 @와 함수 이름을 먼저 배치해 클래스와 멤버에 주석을 달 수 있도록 하는 자바스크립트를 위한 제안이다.
-   MyClass 클래스에 데코레이트를 사용하기 위한 구문

    ```
    @myDecorator
    class MyClass { /* ... */ }
    ```

-   ECMA스크립트에서는 아직 데코레이터를 승인하지 않았으므로 타입스크립트 버전 4.72.에서는 기본적으로 데코레이터를 지원하지 않는다.
-   타입스크립트는 데코레이터의 오래된 실험적인 버전을 코드에서 사용할 수 있도록 제공하는 experimentalDecorators 컴파일러 옵션을 제공한다.
-   experimentalDecorators 컴파일러 오션은 tsc CLI 또는 책에서 다룬 다른 컴팡이러 옵션과 마찬기지로 TSConfig 파일을 통해 활성화 할 수 있다.

```
    "compilerOptions": {
        "experimentalDecorators": true
    }
```

-   데코레이터의 각 사용법은 데코레이팅하는 엔티티가 생성되자마자 한 번 실행된다.
-   각 종류의 데코레이터(접근자, 클래스, 메서드, 매개변수, 속성)는 데코레이팅하는 엔티티를 설명하는 서로 다른 인수 집합을 받는다.

<br>

---

<br>

## 14.3 열거형

-   [TIP] 자주 반복되는 리터럴 집합이 있고, 그 리터럴 집합을 공통 이름으로 설명할 수 있으며, 열거형으로 전환했을 때 훨씬 더 읽기 쉽지 않은 경우라면 열거형을 사용해서는 안 됩니다.
-   대부분의 프로그래밍 언어는 연관된 값 집합을 나타내는 enum 또는 열거형 enum 타입의 개념을 포함한다.
    -   열거형은 각 값에 대해 친숙한 이름을 사용한 객체에 저장된 리터럴 값 집합으로 생각할 수 있다.
-   자바스크립트는 열거형 구문을 포함하지 않으므로 열거형을 배치해야 하는 곳에 일반적인 객체를 사용한다.
    -   예) HTTP 상태 코드를 숫자로 저장하고 사용할 수 있지만, 개발자들은 친숙한 이름으로 키를 지정해 저장하는 방식인 더 읽기 쉬운 방법을 찾아냈다.
        [StatusCodes.ts](./chap14/StatusCodes.ts)
    ```
    const StatusCodes = {
        InternalServerError: 500,
        NotFound: 404,
        Ok: 200,
        // ...
    } as const
    ```
    StatusCodes.InternalServerError; // 500
-   타입스크립트에서 열거형 같은 객체를 사용할 때 까다로운 점은 값이 해당 객체의 값 중 하나여야 함을 나타내는 훌륭한 타입 시스템 방법이 없다.

    -   한 가지 일반적인 방법은 9장 '타입 제한자'의 keyof와 typeof 타입 제한자를 함께 사용해 하나의 값을 해킹하는 것이지만, 이렇게 하려면 상당한 야의 구문을 입력해야 한다.

    ```
    type StatusCodeValue = (typeof StatusCodes)[keyof typeof StatusCodes];

    let StatusCodeValue: StatusCodeValue;

    StatusCodeValue = 200;

    StatusCodeValue = -1;
    // Type '-1' is not assignable to type 'StatusCodeValue'.
    ```

-   타입스크립트는 타입으 number 또는 string인 리터럴 값들을 갖는 객체를 생성하기 위한 enum 구문을 제공한다.

[StatusCodes2.ts](./chap14/StatusCodes2.ts)

```
enum StatusCode {
    InternalServerError = 500,
    NotFound = 404,
    Ok = 200,
}

StatusCode.InternalServerError;

let statusCode: StatusCode;

statusCode = StatusCode.Ok; // ok
statusCode = 200; // ok

```

-   [Warning] 타입스크립트는 약간의 타입 안정성을 희생하여 편의상 숫자 열거형값에 임의의 숫자를 할당할 수 있다.

    -   statusCode = -1 은 이전 코드 스니펫에서도 허용된다.

-   열거형은 타입스크립트 커뮤니티에서 다소 논쟁의 여지가 있는 주제이다.

    -   이 장 후반부에서 다룰 preserveConstEnums와 같은 옵션에 대한 몇 가지 결함을 갖는다.

-   알려진 값 집합을 명시적으로 선언하는 데 열거형이 매우 유용하다.

<br>

---

<br>

### 14.3.1 자동 숫잣값

-   열거형의 멤버는 명시적인 초깃값을 가질 필요가 없다. 값이 생략되면 타입스크립트는 첫번째 값을 0으로 시작하고 각 후속 값을 1씩 증가시킨다. - 열거형 멤버의 값이 고유하고 키 이름과 연결되는 것 외에는 중요하지 않다면 타입스크립트에서 열거형 멤버의 값을 선택하도록 하는 것은 좋은 옵션이다.

[VisualTheme.ts](./chap14/VisualTheme.ts)

```
enum VisualTheme {
    Dark, //10
    Light, // 1
    System, // 2
}
```

[VisualTheme.js](./chap14/VisualTheme.js)

```
var VisualTheme;
(function (VisualTheme) {
    VisualTheme[VisualTheme["Dark"] = 0] = "Dark";
    VisualTheme[VisualTheme["Light"] = 1] = "Light";
    VisualTheme[VisualTheme["System"] = 2] = "System";
})(VisualTheme || (VisualTheme = {}));

```

-   숫자값이 있는 열거형에서 명시적 값을 갖지 않는 모든 멤버는 이전 값보다 1 더 큰 값을 갖는다.

[Direction.ts](./chap14/Direction.ts)

```
enum Direction {
    Top = 1,
    Right,
    Bottom,
    Left,
}

```

[Direction.js](./chap14/Direction.js)

```
var Direction;
(function (Direction) {
    Direction[Direction["Top"] = 1] = "Top";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Bottom"] = 3] = "Bottom";
    Direction[Direction["Left"] = 4] = "Left";
})(Direction || (Direction = {}));

```

-   [Warning] 열거형의 순서를 수정하면 기본 번호가 변경된다.
    -   열거형 순서를 변경하거나 제거할 때 주의.

<br>

---

<br>

### 14.3.2 문자열값을 갖는 열거형

-   열거형은 멤버로 숫자 대신 문자열값을 사용할 수 있다.

[LoadStyle.ts](./chap14/LoadStyle.ts)

```
enum LoadStyle {
    AsNeeded = "as-needed",
    Eager = "eager",
}

```

[LoadStyle.js](./chap14/LoadStyle.js)

```
var LoadStyle;
(function (LoadStyle) {
    LoadStyle["AsNeeded"] = "as-needed";
    LoadStyle["Eager"] = "eager";
})(LoadStyle || (LoadStyle = {}));

```

-   문자열값을 갖는 열거형은 읽기 쉬운 이름으로 공유 상수의 별칭을 지정하는 데 유용하다.
-   문자열 리터럴 유니언 타입을 사용하는 대신 문자열값을 갖는 열거형을 사용하면 12장 'IDE 기능 사용'에서 다룬 더 강력한 편집기 자동 완성과 해당 속성의 이름 변경이 가능해진다.
-   문자열값의 한 가지 단점은 타입스크립트에 따라 자동으로 계산할 수 없다는 것. 숫자값이 있는 멤버 뒤에 오는 열거형 멤버만 자동으로 계산할 수 있다.

[Wat.ts](./chap14/Wat.ts)

```
enum Wat {
    FirstString = "first",
    SomeNumber = 9000,
    ImpicitNumber,
    AnotherString = "another",
    NotAllowed,
    // Enum member must have initializer.
}
```

-   [TIP] 이론적으로 숫자와 문자열 모두를 멤버로 갖는 열거형을 만들 수 있다. 하지만 실제로 이런 형태의 열거형은 불필요하고 혼란스러울 수 있으므로 사용해서는 안된다.

<br>

---

<br>

### 14.3.3 const 열거형

-   열거형은 런타입 객체를 생성하므로 리터럴 값 유니언을 사용하는 일반적인 전략보다 더 많은 코드를 생성한다.
-   타입스크립트는 const 제한자로 열거형을 선언해 컴파일된 자바스크립트코드에서 객체 정의와 속성 조회를 생략하도록 지시한다.

[DisplayHint.ts](./chap14/DisplayHint.ts)

```
const enum DisplayHint {
    Opaque = 0,
    Semitransparent,
    Transparent,
}

let displayHint = DisplayHint.Transparent;
```

-   컴파일된 자바스크립트 코드에는 열거형 선언이 모두 누락되고 열거형의 값에 대한 주석을 사용한다.

[DisplayHint.js](./chap14/DisplayHint.js)

```
var displayHint = 2 /* DisplayHint.Transparent */;
```

-   열거형 객체 정의를 생성하는 것이 여전히 바람직한 프로젝트라면 열거형 정의 자체가 존재하도록 만드는 preserveConstEnums 컴파일러 옵션을 사용한다.
    -   여전히 값은 열거형 객체에 접근하는 대신에 리터럴을 직접 사용한다.

[DisplayHint.js](./chap14/DisplayHint.js)

```
var DisplayHint;
(function (DisplayHint) {
    DisplayHint[DisplayHint["Opaque"] = 0] = "Opaque";
    DisplayHint[DisplayHint["Semitransparent"] = 1] = "Semitransparent";
    DisplayHint[DisplayHint["Transparent"] = 2] = "Transparent";
})(DisplayHint || (DisplayHint = {}));
var displayHint = 2 /* DisplayHint.Transparent */;

```

-   preserveConstEnums는 생성된 자바스크립트 코드의 크기를 줄이는 데 유용하지만 타입스크립트 코드를 변환하는 모든 방법이 이를 지원하는 것은 아니다.
    -   isolateModules 컴팡일러 옵션과 const 열거형을 지원하지 않는 경우와 좐련된 자세한 내용은 13장 '구성 옵션'을 참조
