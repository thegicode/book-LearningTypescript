# Chapter 2 타입 시스템

## 1 타입의 종류

일곱 가지 원시 타입

-   null
-   undefined
-   boolean
-   stirng
-   number
-   bigint
-   symbol

타입스크립트는 다음 값을 일곱 가지 기본 타입 중 하나로 간주

-   null; // null
-   undefined; // undefined
-   true; // boolean
-   "Louse"; // string
-   1337; // number
-   1337n; // bigint
-   Symbol("Franklin); // symbol

<br>

### 1.1 타입 시스템 type system

타입 시스템은 프로그래밍 언어가 프로그램에서 가질 수 있는 타입을 이해하는 방법에 대한 규칙 집합이다.
기본적으로 타입스크립트의 타입 시스템은 다음과 같이 작동한다.

1. 코드를 읽고 존재하는 모든 타입과 값을 이해한다.
2. 각 값이 선언에서 가질 수 있는 타입을 확인한다.
3. 각 값이 추후 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인한다.
4. 값의 사용법이 타입과 일치하지 않으면 사용자에게 오류를 표시한다.

-   2.1.1\_타입시스템.mov

<br>

### 1.2 오류 종류

타입스크립트를 작성하는 동안 가장 자주 접하게 되는 오류 두 가지

-   구문 오류 : 타입스크립트가 자바스크립트로 변환되는 것을 차단한 경우
-   타입 오류 : 타입 검사기에 따라 일치하지 않는 것이 감지된 경우

> **구문 오류** <br>

-   구문 오류는 타입스크립트가 코드로 이해할 수 없는 잘못된 구문을 감지할 떄 발생
-   이는 타입스크립트가 타입스크립트 파일에서 자바스크립트 파일을 올바르게 생성할 수 없도록 차단
-   도구와 설정에 따라 자바스크립트 코드를 얻을 수도 있지만 결과가 예상과 상당히 다를 수 있다.

-   2.1.1.2\_오류종류.mov

-   [TIP] 타입스크립트는 구문 오류와 상관없이 자바스크립트 코드를 출력하기 위해 최선을 다하지만, 원하는 출력 결과가 아닐 수 있다. 따라서 구문 오류를 수정하는 것이 좋다.

> **타입 오류** <br>

-   타입스크립티의 타입 검사기가 프로그램의 타입에서 오류를 감지했을 때 발생
-   구문이 자바스크립트로 변환되는 것을 차단하지는 않는다.
-   하지만 코드가 실행되면 무언가 충돌하거나 예기치 않게 작동할 수 있다.

[NOTE] 어떤 프로젝트에서는 구문 오류뿐만 아니라 모든 타입스크립트 타입 오류가 수정될 떄까지 코드 실행을 차단하기도 한다. 이 방식이 성가시고 불가피하다고 생각한다. 대부분의 프로젝트는 13장의 구성 옵션과 tsconfig.json 파일을 사용해 차단하지 않도록 설정한다.

<br>

---

<br>

## 2 할당 가능성 assignability

-   타입스크립트는 변수의 초깃값을 읽고 해당 변수가 허용되는 타입을 결정
-   타입스크립트에서 함수 호출이나 변수에 값을 제공할 수 있는지 여부를 확인하는 것, 즉 전달된 값이 예상된 타입으로 할당 가능한지 여부를 확인한다.

<br>

### 2.1 할당 가능성 오류 이해하기

'Type...is not assignable to type...'

-   첫 번째 Type : 코드에서 변수에 할당하려고 시도하는 값
-   두 번째 type : 첫 번째 타입, 즉, 값이 할당되는 변수

<br>

---

<br>

## 3 타입 애너테이션 type annotattion

-   초기 타입을 유추할 수 없는 변수는 진화하는 any라고 부른다. 특정 타입을 강제하는 대신 새로운 값이 할당될 때마다 변수 타입에 대한 이해를 발전시킨다.
-   타입스크립트는 초기값을 할당하지 않고도 변수의 타입을 선언할 수 있는 구문인 타입 애너테이션을 제공한다. 타입 애너테이션은 변수 이름 뒤에 배치되면 콜론(:)과 타입 이름을 차례대로 기재한다.
    ```
    let rocker: string;
    rocker = "Joan Jett";
    ```
-   타입 애너테이션은 타입스크립트에만 존재하며 런타임 코드에 영향을 주지 않고, 유효한 자바스크립트 구문도 아니다. tsc 명령어를 실행해 타입스크립트 소스 코드를 자바스크립트로 컴파일하면 해당 코드가 삭제된다.
    ```
    // 출력된 .js 파일
    let rocker;
    rocker = "Joan Jett";
    ```
-   [NOTE] 타입스크립트 타입은 컴파일을 통해 생성된 자바스크립트에 어떠한 영향도 주지 않는다.

<br>

### 3.1 불필요한 타입 애너테이션

-   다음 코드에서 string 타입 애너테이션은 중복

    ```
    let firstName: string = "Tina";
    ```

-   아무것도 변하지 않는 변수에는 타입 애너테이션을 추가하지 않기를 선호한다.
-   코드를 명확하게 문서화하거나 실수로 변수 타입이 변경되지 않도록 타입스크립트를 보호하기 위해 변수에 명시적으로 타입 애너테이션을 포함하는 것이 경우에 따라서는 유용하다.

<br>

---

<br>

## 4 타입 형태

-   타입스크립트는 객체에 어떤 멤버 속성이 존재하는지 알고 있다.

    ```
    let rapper = "Queen Ltifah";
    rapper.length;

    rapper.push();
    // Property 'push' does not exist on type 'string'.

    ```

    ```
    let cher = {
        firstName: "cleryilyn",
        lastName: "sarkisian",
    };
    cher.middleName;

    // Property 'middleName' does not exist on type '{ firstName: string; lastName: string; }'.
    ```

-   타입스크립트는 객체의 형태에 대한 이해를 바탕으로 할당 가능성뿐만 아니라 객체 사용과 관련된 문제도 알려준다.

<br>

### 4.1 모듈

-   ECMA스크립트 2015에는 파일 간에 가져오고 import 내보내는 export 구문을 표준화하기 위해 ECMA스크립트 모듈 ECMAScript Modules(ESM)이 추가되었다.

    ```
    import { value } from "./values;

    export const dobuled = value *2;
    ```

-   ECMA스크립트 사양과 일치시키기 위해 이 책에서는 다음 명명법을 사용한다.

    -   모듈 : export 또는 import가 있는 파일
    -   스크립트 : 모듈이 아닌 파일

-   한 모둘에서 다른 파일에 선언된 변수와 동일한 이름으로 선언된 변수는 다른 파일의 변수를 가져오지 않는 한 이름 충돌로 간주하지 않는다.

        ```
        // a.ts
        export const shared = "Cher";

        // b.ts
        export const shared = "Cher
        ```

        ```
        // c.ts
        import { shared } from "./a";
        // Error : Import declaration conflicts with local declaration of 'shared'.


        export const shared = "Cher"
        // Error: Individual declarations in merged declaration 'shared' must be all exported or all local.

        ```

-   파일이 스크립트이면 타입스크립트는 해당 파일을 전역 스코프로 간주하므로 모든 스크립트가 파일의 내용에 접근할 수 있다. 즉, 스크립트 파일에 선언된 변수는 다른 스크립트 파일에 선언된 변수와 동일한 이름을 가질 수 없다.

    ```
    // d.ts
    const shared = "Cher";
    // Error : Cannot redeclare block-scoped variable 'shared'


    // e.ts
    const shared = "Cher";
    // Error : 블록 범위 변수 'shared'을(를) 다시 선언할 수 없습니다.

    ```

-   타입스크립트 파일에 Cannot redeclare... 라는 오류가 표시되면 파일에 아직 export 또는 import 문을 추가하지 않았기 때문일 수도 있다.

    -   export{}; 를 추가해 강제로 모듈이 되도록 만든다.

    ```
    // d.ts and e.ts
    const shared = "Cher";

    export {};

    ```

-   [Warning] 타입스크립트는 CommonJS와 같은 이전 모듈을 사용해서 작성된 타입스크립트 파일의 import, export 형태는 인식하지 못한다. 타입스크립트는 일반적으로 CommonJS 스타일의 require 함수에서 반환된 값을 any 타입으로 인식한다.
    <br>

---

<br>

## 5 마치며

-   '타입'은 무엇인지 알아보고 타입스크립트가 인식하는 원시 타입 이해하기
-   '타입 시스템'은 무엇인지 알아보고 타입스크립트의 타입 시스템이 코드를 이해하는 방법 살펴보기
-   타입 오류와 구문 오류의 차이점
-   유추된 변수타입가 변수 할당 가능성
-   타입 애너테이션으로 변수 타입을 명시적으로 선언하고 any 타입의 진화 방지하기
-   타입 형태에서 객체 멤버 확인하기
-   스크립트 파일과는 다른 ECMA스크립트 모듈 파일의 선언 스코프

[TIP] https://www.learningtypescript.com/the-type-system/ 에서 배운 내용을 연습
