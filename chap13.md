# Chapter 13 구성 옵션

-   tsc에 전달되는 명령줄(CLI) 플래그
-   타입스크립트 구성 파일 TSCConfig

<br>

---

<br>

## 13.1 tsc 옵션

-   대부분 옵션을 -- 플래그로 사용

<br>

### 13.1.1 pretty 모드

-   CLI 색상과 간격의 스타일을 지정해 가독성을 높이는 pretty 모드를 지원한다.
-   간결한 출력을 선호한다면 --pretty false 플래그를 제공한다.

<br>

### 13.1.2 watch 모드

-   -w, -watch
-   타입오류를 일종의 체크리스트로 사용해 아직 정리해야 할 항목으로 사용할 수 있다.

<br>

---

<br>

## 13.2 TSConfig 파일

-   tsconfig.json의 존재는 해당 디렉터리가 타입스크립트 프로젝트의 루트임을 나타낸다.
    -   디렉터리에서 tsc를 실행하면 tsconfig.jspn 파일의 모든 구성 옵션을 읽는다.
-   tsc 명령에 tsconfig.json 파일이 있는 디렉터리 경로 또는 tsc가 tsconfig.json 대신 사용할 파일 경로를 -p 또는 --project 플래그에 전달한다.
    ```
    tsc -p path/to/toconfig.json
    ```
    -   가능한 타입스크립트 프로젝트에서 TSConfig 파일을 사용하기를 권장
    -   VS Code 같은 IDE는 IntelliSenese 기능을 제공할 때 TSConfig의 구성을 따른다.
-   TSConfig 파일에서 사용 가능한 모든 구성 옵션 목록은 https://aka.ms/tsconfig.json 참조

<br>

### 13.2.1 tsc --init

-   tsconfig.json 파일 생성
-   처음 몇 번의 타입스크립트 프로젝트에서는 구성 파일을 생성하기 위해 tsc --init을 사용하는 것을 권장한다.
    -   기본값은 대부분의 프로젝트에서 사용 가능하고, 문서의 주석은 구성 옵션을 이해하는 데 매우 유용한다.

<br>

### 13.2.2 CLI vs. 구성

-   TSConfig 파일을 살펴보면 구성 옵션이 "compilerOptions" 객체 내에 있다.
-   CLI와 TSConfig 파일에서 사용 가능한 대부분의 옵션은 다음 두 가지 범주 중 하나로 분류된다.
    -   컴파일러 : 포함된 각 파일이 타입스크립트에 따라 컴파일되거나 타입을 확인하는 방법
    -   파일 : 타입스크립트가 실행된 파일과 실행되지 않은 파일
-   두 가지 범주 이후에 이야기 할 프로젝트 레퍼런스(project reference)와 같은 다른 설정은 TSConfig 파일에서만 사용할 수 있다.

<br>

---

<br>

## 31.3 파일 포함

<br>

### 13.3.1 include

-   tsconfig.json의 최상의 "include" 속성
-   포함할 파일을 더 세밀하게 제어하기 위해 include 문자열에 glob 와일드카드가 허용된다.
    -   \- : 0개 이상의 문자와 일치(디렉터리 구분자 제외)
    -   ? : 하나의 문자와 일치(디렉터리 구분자 제외)
    -   \*\*/ : 모들 레벨에 중첩된 모든 디렉터리와 일치

<br>

### 13.3.2 exclude

-   기본적으로 exclude에는 컴파일된 외부 라이브러리 파일에 대해 타입스크립트 컴파일러가 실행되지 않도록 ["node_modules", "bower_components", "jspm_packasges"]가 포함된다.
-   exclude는 include의 시작 목록에서 파일을 제거하는 작업만 수행한다.
    -   타입스크립트는 비록 가져온 파일이 exclude 목록에 명시적으로 나열되어 있더라도 포함된 파일에 따라 가져온 모든 파일에서 실행된다.

<br>

---

<br>

## 31.4 대체 확장자

<br>

### 13.4.1 JSX 구문

-   파일에서 JSX 구문을 사용하기 위해 다음 두 가지를 수행해야 한다.
    -   구성 옵션에서 "jsx" 컴파일러 옵션을 활성화한다.
    -   .tsx 확장자로 파일의 이름을 지정한다.

#### **jsx**

| 값             | 입력 코드 | 출력 코드                 | 출력 파일 확장자 |
| -------------- | --------- | ------------------------- | ---------------- |
| "preserve"     | \<div />  | \<div />                  | .jsx             |
| "react"        | \<div />  | React.creatElement("div") | .js              |
| "react-native" | \<div />  | \<div />                  | .js              |

-   jsx에 대한 값은 tsc CLI 또는 TSConfig 파일에 제공한다.
    ```
    tsc --jsx preserve
    ```
-   바벨과 같은 별도의 도구로 코드를 변환하는 것처럼 타입스크립트의 내장된 트랜스파일러를 직접적으로 사용하지 않는 경우라면 "jsx" 에 대해 허용된 값을 사용할 수 있다.
-   Next.js 또는 리믹스Remix와 같은 최신 프레임워크로 구축된 대부분의 웹 앱은 리액트 구성 및 컴파일 구문을 처리한다. 이러한 프레임워크 중 하나를 사용하면 타입스크립트의 내장 트랜스파일러를 직접 구성할 필요가 없다.

<br>
<br>

### \*\*.tsx 파일의 제네릭 화살표 함수

-   제네릭 화살표 함수의 구문이 JSX 구문가 충돌한다.
    -   .tsx 파일에서 화살표 함수에 대한 타입 인수 <T>를 작성하려고 하면 T 요소의 시작 태그에 대한 종료 태그가 없기 때문에 구문 오류가 발생
    ```
    const identity = <T>(input: T) => input;
    // Error : JSX element 'T' has no correspoding closing tag.
    ```
-   이런 구문 모호성 ambiguity 을 해결하기 위해 타입 인수에 = unknown 제약 조건을 추가
    ```
    const identity = <T =  unknown>(input: T) => input;
    ```

<br>

### 13.4.2 resolveJsonModule

-   <ins>resolveJsonModule을 true로 설정하면 .json 파일을 읽을 수 있다.</ins>
-   .json 파일을 마치 객체를 내보내는 .ts 파일인 것처럼 가져오고 해당 객체의 타입을 const 변수인 것처럼 유추할 수 있다.

    [activist.json](./chap13/activist.json)

    ```
    {
        "activist": "Mary Atell"
    }
    ```

    [useActivist.ts](./chap13/useActivist.ts)

    ```
    import { activist } from "./activist.json";

    console.log(activist);
    ```

    ```
    npx tsc useActivist.ts --resolveJsonModule
    ```

-   뒷 부분에서 다루는 esModuleInterop 컴파일러 옵션이 활성화된 경우에도 기본 가져오기를 사용할 수 있다.
    -   (thegicode) esModuleInterop로 하니 실행되지 않음
-   <ins>array 또는 number 같은 다른 리터럴 타입을 포함한 JSON 파일이라면 import 구문으로 \*을 사용한다.</ins>

    -   activitists.json 파일에 문자열 배열을 정의한 다음 useActivists.ts 파일에서부터 가져온다.

    [activists.json](./chap13/activists.json)

    ```
    ["Ida B. wells", "Sojourner Trut"]
    ```

    [useActivists.tx](./chap13/useActivists.ts)

    ```
    import * as activists from "./activists.json";

    console.log(activists.length);
    ```

    ```
    npx tsc useActivists.ts --resolveJsonModule
    ```

<br>

---

<br>

## 13.5 자바스크립트로 내보내기

-   바벨 같은 전용 컴파일러 도구의 등장으로 일부 프로젝트에서는 타입스크립트의 역할이 타입 검사만으로 축소되었지만,
-   타입스크립트 구문을 자바스크립트로 컴파일하기 위해 여전히 타입 스크립트에 의존하고 있는 프로젝트도 많다.
-   프로젝트가 타입스크립트에 단일 의존성을 갖고, tsc 명령을 사용해 자바스크립트를 출력하는 작업은 매우 유용하다.

<br>

### 13.5.1 outDir

-   기본적으로 타입스크립트는 출력 파일을 해당 소스 파일과 동일한 위치에 생성한다.
-   outDir 옵션 사용하면
    -   출력 파일의 루트 디렉터리를 다르게 지정할 수 있다.
    -   출력 파일은 입력 파일과 동일한 디렉토리 구조를 유지한다.
-   <ins>tsc --outDir dist</ins>
-   모든 입력 파일을 src/ 디렉터리에 넣고 --outDir lib로 컴파일하면 lib/src/fruits/apple.js 대신 lib/fruis/apple.js가 생성된다.

<br>

### 13.5.2 target

-   자바스크립트 코드 구문을 지원하기 위해 <ins>어느 버전까지 변환해야 하는지를 지정하는 옵션</ins>
-   target을 지정하지 않으면 "es3"
-   tsc --init은 기본적은 "es2016"을 지정
-   <ins>오래된 환경에서 최신 자바스크립트 기능을 지원하려면 더 많은 자바스크립트 코드를 생성해야 하므로, 파일 크기가 조금 더 커지고 런타임 성능이 조금 저하된다.</ins>
-   가능한 한 최신 자바스크립트 구문을 사용하는 것이 좋다.
-   [TIP] 집필시점 대체적으로 "es2019" 사용

    [defaultNameAndLog](./chap13/defaultNameAndLog.ts)

    ES2015의 const와 ES2020의 nullish 병합 연산자인 ??를 포함한다.

    ```
    function defaultNameAndLog(nameMaybe: string | undefined) {
        const name = nameMaybe ?? "anonymouse";
        console.log("Form", nameMaybe, "to", name);
        return name;
    }
    ```

    tsc --target es2020 이상을 사용하면 const와 ??는 지원되는 구문 기능이므로 타입스크립트는 코드에서 : string | undefiend만 제거하면 된다.

    ```
    function defaultNameAndLog(nameMaybe) {
        const name = nameMaybe ?? "anonymouse";
        console.log("Form", nameMaybe, "to", name);
        return name;
    }
    ```

    tsc --target es2015에서 2019를 사용하면 ?? 구문은 다음 코드로 컴파일된다.

    ```
    function defaultNameAndLog(nameMaybe) {
        const name = nameMaybe !== null && nameMaybe !== void 0 ? nameMaybe : "anonymouse";
        console.log("Form", nameMaybe, "to", name);
    }
    ```

    tsc --target es3 또는 es5를 사용하면, const는 추가적으로 const에 상응하는 var로 변환해야 한다.

    ```
    function defaultNameAndLog(nameMaybe) {
        var name = nameMaybe !== null && nameMaybe !== void 0 ? nameMaybe : "anonymouse";
        console.log("Form", nameMaybe, "to", name);
        return name;
    }
    ```

<br>

### 13.5.3 내보내기 선언

-   대부분의 패키지는 타입스크립트의 delcaration 컴파일러 옵션을 사용해 소스 파일에서 .d.ts 출력 파일을 내보낸다.
    ```
    tsc --declaration
    ```
    ```
    "compilerOptions": {
        "declaration": true
    }
    ```
-   .d.ts 출력 파일은 outDir 옵션에 따라 .js 파일과 동일한 출력 규칙에 따라 내보내진다.

    ```
    fruits/
        apple.d.ts
        apple.js
        apple.ts
    vegetables/
        zucchini.d.ts
        zucchini.js
        zucchini.ts
    ```

#### **emitDeclarationOnly**

-   .js와 .jsx 파일 없이 선언 파일만 내보내도록 지시
-   외부 도구를 사용해 출력 자바스크립트를 사용하지만 여전히 타입스크립트를 사용해 출력 선언 파일을 생성하려는 프로젝트에 유용
    ```
    "compilerOptions": {
        "emitDeclarationOnly": true
    }
    ```
-   emitDeclarationOnly가 활성화된 경우 delaration 또는 composite 컴파일러 옵션을 활성화해야 한다.
    -   예) fruits, vegetables 가 있는 디렉터리에서 tsc --declaration --emitDeclarationOnly를 실행하면 출력 .js 없이 fruits/apple.d.ts와 vegetables/zucchini.d.ts 출력 선언 파일이 생성된다.
    ```
    fruits/
        apple.d.ts
        apple.ts
    vegetables/
        zucchini.d.ts
        zucchini.ts
    ```

<br>

### 13.5.4 소스 맵 source map

#### **source Map**

-   .js 또는 .jsx 출력 파일과 함께 .js.map 또는 .jsx.map 소스 맵을 출력할 수 있다.

    ```
    tsc --sourceMap

    fruits/
        apple.js
        apple.js.map
        apple.ts
    vegetables/
        zuchini.js
        zuchini.js.map
        zuchini.ts

    ```

#### **declarationMap**

-   .d.ts 선언 파일에 대한 소스맵을 생성할 수 있다.

    ```
    tsc --declaration --delclarationMap

    fruits/
        apple.d.ts
        apple.d.ts.map
        apple.js
        apple.ts
    vegetables/
        zucchini.d.ts
        zucchini.d.ts.map
        zucchini.js
        zucchini.ts
    ```

<br>

### 13.5.5 noEmit

-   타입스크립트 파일 생성을 건너뛴다.
-   타입스크립트가 온전히 타입 검사기로만 작동
-   tsc --noEmit 실행하면 어떠한 파일도 생성되지 않는다. 구문 또는 타입 오류만을 보고한다.

<br>

---

<br>

## 13.6 타입 검사

-   타입스크립트 구성 옵션은 타입 검사기를 제어한다.
-   구성 옵션을 느슨하게 구성해 오류가 완전히 확실할 때만 타입 검사 오류를 보고하거나
-   구성 옵션을 엄격하게 구성해 거의 모든 코드를 올바르게 잘 입력하도록 요구할 수 있다.

<br>

### 13.6.1 lib

-   타입스크립트가 런타임 한경에 있다고 가정하는 전역 API는 lib 컴파일러 옵션으로 구성할 수 있다.
-   브라우저 타입 포함을 나타내는 dom과 target 컴파일러 옵션을 기본값으로 하는 문자열 배열을 사용한다.
-   lib 설정을 변경하는 유일한 이유는 브라우저에서 실행되지 않는 프로젝트에서 기본으로 포함되니 dom을 제거하기 위함이다.

    ```
    tsc --lib es2020

    {
        "compilerOptions": {
            "lib": ["es2020"]
        }
    }
    ```

-   또는 최신 자바스크립트 API를 지원하기 위해 polyfill을 사용하는 프로젝트에서 dom과 ECMA 스크립트 특정 버전을 포함할 수 있다.

    ```
    tsc --lib dom, es2021

    {
        "compilerOptions": {
            "lib": ["dom", "es2021"]
        }
    }
    ```

-   올바른 런타임 폴리피을 모두 제공하지 않는 상태에서는 lib을 수정하지 않도록 주의한다.

    -   ES2020까지만 지원하는 플랫폼에서 실행되는 lib이 "es2021"로 설정된 프로젝트에서는 타입 검사 오류가 없을 수 있지만
    -   String.replaceAll과 같이 ES2021 이상에 정의된 API를 사용하려고 하면 여전히 런타임 오류가 발생할 수 있다.

    ```
    const value = "a b c";
    value.replaceAll(" ", ", ")
    // Uncauht TypeError: value.replaceAll is not function

    ```

-   [TIP] <ins>lib 컴파일러 옵션은 내장된 언어 API를 나타내는 데 사용하고 target 컴파일러 옵션은 존재하는 구문 기능을 나타내는데 사용한다고 생각하라. </ins>

    <br>

### 13.6.2 skipLibCheck

-   <ins>명시적으로 포함되지 않은 선언 파일에서 타입 검사를 건너뛴다.</ins>
-   공유된 라이브러리의 정의가 서로 다르고 충돌할 수 있는 패키지 의존성을 많이 사용하는 애플리케이션에 유용

    ```
    tsc --skipLibCheck

    {
        "compilerOptions": {
            "skipLibCheck": true
        }
    }
    ```

-   타입 검사 일부를 건너띄는 작업으로 타입스크립트 성능을 개선한다. 따라서 대부분의 프로젝트에서 skipLibCheck 옵션을 활성화하는 것이 좋다.

<br>

### 13.6.3 엄격 모드 strict mode

-   기본은 false, 활성화되면 타입 검사기에 일부 추가적인 검사를 켜도록 지시한다.
-   <ins>엄격 옵션 중에 noImplicitAny와 stringNullChecks는 타입 안전 코드를 적용하는 데 특히 유용하고 영향력이 있다.</ins>

    ```
    tsc --strict

    {
        "compilerOptions": {
            "strict": true
        }
    }
    ```

-   특정 검사를 제외한 모든 엄격 모드 검사를 활성화하고 싶다면 strict를 활성화하고 특정 검사를 명시적으로 비활성화할 수 있다.

    -   noImplicitAny를 제외한 모든 엄격 모드를 활성화

    ```
    tsc --strict --noImplicitAny false

    {
        "compilerOptions": {
            "noImplicitAny": false,
            "strict": true
        }
    }
    ```

#### **noImplicitAny**

-   타입스크립트가 매개변수 또는 속성의 타입을 유추할 수 없는 경우라면 any 타입으로 가정한다. any 타입은 타입스크립트의 타입 검사를 대부분 우회할 수 있으므로 코드에 이러한 암시적 타입을 허용하지 않는 것이 좋다.
-   <ins>noImplicitAny 컴파일러 옵션은 암시적 any로 대체될 때 타입스크립트에 타입 검사 오류가 발생하도록 지시</ins>

    ```
    const logMessage = (message) =. {
        // Error: Parameter 'message' implicitly has 'any' type.
        console.log(`Message: ${message}`);
    }

    // 타입 애너테이션 추가
    const logMessage = (message: string) =. {
        // Error: Parameter 'message' implicitly has 'any' type.
        console.log(`Message: ${message}`);
    }
    ```

-   <ins>함수 매개변수의 경우, 함수의 타입을 나타내는 위치에 부모 함수를 배치한다.</ins>

    ```
    type LogMessage = (message: string) => void;

    const logMessage: LogMessage = (message) => {
        console.log(`Message: ${message}`);
    }
    ```

-   [TIP] noImplicitAny는 프로젝트 전체에서 타입 안정성을 보장하는 훌륭한 플래그이다. 완전히 타입스크립트로만 작성된 프로젝트에서는 이 기능을 사용하는 것이 매우 좋다. 그러나 프로젝트가 여전히 자바스크립트에서 타입스크립트로 전환 중인 경우라면 먼저 모든 파일을 타입스크립트로 변환하는 것이 더 쉬울 수 있다.

<br>

#### **strictBindCallApply**

-   타입스크립트가 처음 출시되었을 때 내장된 Function.apply, Function.bind, Function.call 함수 유틸리트를 나타낼 수 있을 만큼 충분한 타입 시스템 기능이 없었다.

    ```
    function getLegnth(text: string, trim?: boolean) {
        return trim ? text.trim().length : text.length;
    }

    // 함수 타입: (thisArg: Function, argArray?: any) => any
    getLength.apply;

    // 반환 타입: any
    getLength.bind(undefined, "abc123");

    // 반환 타입: any
    getLength.call(undefiend, "abc123", true)
    ```

-   strictBinCallApply를 활성화하면 getLength 함수 변형에 대해 훨씬 더 정확한 타입을 사용할 수 있다.

    ```
    function getLegnth(text: string, trim?: boolean) {
        return trim ? text.trim().length : text.length;
    }

    // 함수 타입:
    // (thisArg: typeof getLength, args: [text: string, trim?: boolean]) => number
    getLength.apply;

    // 반환 타입: (trim?: boolean) => number
    getLength.bind(undefined, "abc123");

    // 반환 타입: number
    getLength.call(undefiend, "abc123", true)
    ```

-   <ins>타입스크립트의 모범 사례는 strictBindCallApply를 활성</ins>
-   내장된 함수 유틸리티에 대한 개선된 타입 검사는 이를 활용하는 프로젝트의 타입 안정성을 개선하는 데 도움이 된다.
    <br>

#### **strictFunctionTypes**

-   <ins>함수 매개변수 타입을 약간 더 엄격하게 검사한다.</ins>
-   매개변수가 다른 타입의 매개변수 하위 타입인 경우 함수 타입은 더 이상 다른 함수 타입에 할당 가능한 것으로 간주되지 않는다.

        ```
        function checkOnNumber(containsA: (input: number | string) => boolean) {
            return containsA(1337);
        }

        function stringContainsA(input: string) {
            return !!input.match(/a/i);
        }

        checkOnNumber(stringContainsA);
        // Argument of type '(input: string) => boolean' is not assignable to parameter of type '(input: string | number) => boolean'.
        // Types of parameters 'input' and 'input' are incompatible.
        // Type 'string | number' is not assignable to type 'string'.
        // Type 'number' is not assignable to type 'string'.

        npx tsc checkOnNumber --strictFunctionTypes
        ```

    <br>

#### **strictNullChecks**

-   <ins>strictNullChecks 플래그를 비활성화하면 코드의 모든 타입에 null | undefined가 추가되고, 모든 변수가 null 또는 undefined를 받을 수 있도록 허용한다.</ins>

    ```
    let value: string;

        value = "abc123";

        value = null;
        // npx tsc strictNullChecks --strictNullChecks
        // error TS2322: Type 'null' is not assignable to type 'string'.

    ```

-   타입스크립트의 모범 사례는 strictNullChecks를 활성화하

<br>

#### **strictPropertyInitialization**

-   <ins>타입스크립트의 strictPropertyInitialzation 플래그는 초기화가 없고, 생성자에 확실하게 할당되지 않은 클래스 속성에서 타입 오류를 발생</ins>
-   타입스크립트 모범 사례는 strictPropertyInitialization를 활성화
-   8장 클래스

<br>

#### **useUnknownInCatchVariables**

-   모든 함수는 사용자가 작성한 throw 문이나 undefined에서 속성을 읽는 것과 같은 극단적인 경우에 오류를 발생시킨다.
    -   발생한 오류가 Error 클래스의 인스턴스라는 보장은 없다. 코드는 항상 '다른 무언가'를 throw할 수 있다.
    -   오류는 그 어떤 것도 될 수 있으므로 타입스크립트는 오류의 기본 동작으로 any 타입을 제공한다.
    -   기본적으로 타입이 안전하지 않은 any에 의존하는 비용으로 오류 처리에 대한 유연성을 허용한다.
    ```
    try {
        someExtrnalFunction();
    } catch(error) {
        error; // 기본 타입: any
    }
    ```
-   대부분의 any 사용과 마찬가지로 오류를 억지로 명시적 타입 어서션 또는 내로잉하는 비용보다 unknown으로 처리하는 것이 기술적으로 더 타당하다.
-   catch 절의 오류는 any 또는 unknown 타입으로 애너테이션을 추가할 수 있다.
    ```
    try {
        someExtrnalFunction();
    } catch(error: unknown) {
        error; // 기본 타입: unknown
    }
    ```
-   <ins>엄격한 영역 플래그인 useUnknownInCatchVariables는 타입스크립트의 기본 catch 절 error 타입을 unknown으로 변경한다.</ins>
-   useUnknownInCatchVariables을 활성화하면 앞서 살펴본 두 개의 스티펫에서 error 타입은 unknown으로 설정된다.
-   타입스크립트의 모범 사례는 useUnknownInCatchVariablens를 활성화

<br>

---

<br>

## 13.7 모듈

<br>

### 13.7.1 module

-   타입스크립트는 어떤 모듈 시스템으로 변환된 코드를 사용할지 결정하기 위해 module 컴팡일러 옵션을 제공한다.

    -   ECMA스크립트 모듈로 소스 코드를 작성할 때 타입스크립트는 module 옵션에 따라 export와 import문을 다른 모듈 시스템으로 변환할 수 있다.

    ```
    // commonjs로 출력되도록
    npx --module commonjs

    {
        "compilerOptions": {
            "module": "commonjs"
        }
    }

    ```

-   <ins>target 컴파일러 옵션이 "es3" 또는 "es5"인 경우 module 컴파일러 옵션의 기본값은 "commonjs"가 된다.</ins>
-   그렇지 않으면 ECMA스크립트 모듈로 출력하도록 지정하기 위해 "es2015"로 기본 설정

<br>

### 13.7.2 moduleResolutiion

-   모듈 해석 module resolution은 import에서 가져온 경로가 module에 매핑되는 과정
-   타입스크립트는 해당 과정에 로직을 지정하는 데 사용할 수 있는 moduleResolution 옵션을 제공한다.
    -   node : 기존 Node.js와 같은 CommonJS resolver에서 사용하는 동작
    -   nodenext: ECMA스크립트 모듈에 대해 지정된 동작에 맞게 조정
-   두 전략은 유사하다. 대부분의 프로젝트는 둘 중 사용할 수 있으며 차이를 느끼지 못한다.
-   https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution
    -   모듈 해석 이면에 있는 복잡성에 대해 알아볼 수 있다.
-   [TIP] moduleResolution은 타입스크립트가 코드를 내보내는 방법을 전혀 변경하지 않는다. 따라서 코드가 실행되는 런타임 환경을 설명하기 위해서만 사용된다.

    ```
    tsc --moduleResolution nodenext

    {
        "comilerOptions": {
            "moduleResolution": "nodenext"
        }
    }
    ```

-   [TIP] 이전 버전과의 호환성을 위해 타입스크립트는 기본 moduleRsolution 값을 수년전의 프로젝트에 사용된 classic 값으로 유지한다.

<br>

### 13.7.3 CommonJS와의 상호 운용성

-   자바스크립트 모듈로 작업할 때 모듈의 default 내보내기와 namespace 출력 간에는 차이점이 있다.

    -   모듈의 default 내보내기는 내보낸 객체의 **.default 속성**
    -   namespace 내보내기는 내보낸 **객체 자체**

-   CommonJS와 ECMA스크립트 모듈 내보내기 및 가져오기 방식

| 구문 영역             | CommonJS                                  | ECMA 스크립트                 |
| --------------------- | ----------------------------------------- | ----------------------------- |
| 기본 내보내기         | module.exports.default = value;           | export default value          |
| 기본 가져오기         | const { default: value } = require("...") | imoort value from "..."       |
| 네임스페이스 내보내기 | module.exports = value;                   | 지원 안 함                    |
| 네임스페이스 가져오기 | const value = require("...")              | import \* as value from "..." |

-   타입스크립테는 모듈 형식 간의 상호 운용 interoperability을 개선하는 몇 가지 컴파일러 옵션을 제공한다.

<br>

**esModuleInterop**

-   module이 "es2015" 또는 "esnext"와 같은 ECMA스크립트 모듈 형식이 아닌 경우 타입스크립트에서 내보낸 자바스크립트 코드에 소량의 로직을 추가한다.
    -   해당 로직은 ECMA스크립트 모듈이 기본 또는 네임스페이스 가져오기에 대한 ECMA크스립트 모듈의 규칙을 준수하지 않는 경우에도 모듈에서 가져올 수 있도록 한다.
-   "react" 같은 패키지 위해
-   내보낸 자바스크립트 코드가 가져오기로 작동하는 방식에 대해서만 직접 변경한다.

<br>

**allowSyntheticDefaultImports**

-   ECMA스크립트 모듈이 호환되지 않는 CommonJS 네임스페이스 내보내기 파일에서 기본 가져오기를 할 수 있음을 타입 시스템에 알린다.
-   다음 중 하나가 true인 경우에만 true로 기본적으로 설정된다.
    -   module이 "system"ㅇㄴ 경우(거의 사용하지 않는 모듈 방식)
    -   esModuleInterop이 true이고 module이 "es2015" 또는 "esnext"와 같은 ECMA스크립트 모둘 형식이 아닌 경우
-   esModuleInterop이 true이고 module이 "esnext"인 경우 타입스크립트는 출력 자바스크립트 코드가 가져오기 상호 운용성 지원을 사용하지 않는다고 가정한다.

<br>

### 13.7.4 isolatedModules

-   한 번에 하나의 파일에서만 작동하는 바벨과 같은 외부 트랜스파일러는 타입 시스템 정보를 사용해 자바스크립트를 내보낼 수 없다.
-   결과적으로 타입 정보에 의존하며 자바스크립트를 내보내는 타입스크립트 구문 기능은 바벨 같은 트랜스파일러에서는 지원되지 않는다.

    -   14장 '구문 확장'에서 다룰 const 열거형
    -   스크립트(모듈이 아닌) 파일
    -   14장 '구문 확장'에서 다룰 독립 실행형 상태 내보내기

-   프로젝트에서 타입스크립트가 아닌 다른 도구를 사용해 자바스크립트로 변화하는 경우에는 isolatedModules를 활성화

<br>

---

<br>

## 13.8 자바스크립트

-   기본적으로 .js 또는 .jsx 확장자를 가진 파일을 무시하지만, allowJS와 checkJs 컴파일러 옵션을 사용하면 자바스크립트 파일을 읽고, 컴파일하고, 제한된 기능이지만 타입 검사도 할 수 있다.

<br>

### 13.8.1 allowJs

-   자바스크립트 파일에 선언된 구문을 타입스크립트 파일에서 타입 검사를 하도록 허용한다.

    [values](./chap13/values.js)

    ```
    // values.js
    export const value = "We cannot succeed when half of us are held back";
    ```

    [allowJs](./chap13/allowJs.ts)

    ```
    // allowJs.ts
    import { value } from "./values";
    console.log(value);

    // 모듈 './values'에 대한 선언 파일을 찾을 수 없습니다. '~/values.js'에는 암시적으로 'any' 형식이 포함됩니다.

    ```

-   target에 맞게 컴파일되고 자바스크립트로 내보내진 파일 목록에 자바스크립트 파일을 추가한다.

    -   소스 맵과 선언파일도 생성된다.

    ```
    tsc ---allowJs

    {
        "compilerOptions": {
            "allowJs": true
        }
    }

    ```

-   allowJs가 활성화되면 allowJs.ts의 value는 string 타입이 된다.

-   [thegicode] '~/chap10/identity.js' 파일은 입력 파일을 덮어쓰므로 쓸 수 없습니다. outDir를 설정해야 한다.

<br>

### 13.8.2 checkJs

-   단순히 자바스크립트 파일을 타입 검사
-   checkJs 컴파일러 옵션은 다음 두 가지 용도로 사용된다.

    -   allowJs 옵션이 아직 true가 아니라면 기본값을 true로 설정하기
    -   .js와 .jsx 파일에서 타입 검사기 활성화하기

    ```
    tsc --checkJs

    {
        "comilerOptions": {
            "checkJs": true
        }
    }
    ```

-   타입 불일치, 철자가 틀린 변수명 등 타입스크립트 파일에서 일반적으로 발생하는 모든 오류를 발생시킨다.
    [checkJs](./chap13/checkJs.js)

    ```
    let myQyote = "soieogoeoeoeo";

    console.log(quote);
    // 'quote' 이름을 찾을 수 없습니다.

    ```

    -   checkJs가 활성화되지 않았다면 타입스크립트는 해당 버그에 대한 오류를 보고하지 않는다.

<br>

**@ts-check**

-   파일 상단에 // @ts-check 주석을 사용해 파일별로 checkJs를 활성화한다.

### 13.8.3 jSDoc 지원

-   allowJs와 checkJs가 활성화되면 타입스크립트는 코드의 모든 JSDoc 정의를 인식한다.
    [jsDoc.js](./chap13/jsDoc.js)

    ```
    /**
    *   @param {string} text
    */

    function sentenceCase(text) {
    return `${text[0].toUpperCase()} ${text.slice(1)} `;
    }

    sentenceCase("hello world");

    sentenceCase(["hello"], ["world"]);
    // 1개의 인수가 필요한데 2개를 가져왔습니다.

    ```

-   jsDoc.js은 string 타입을 받는 sentenceCase 함수에 대한 jsDoc을 선언한다. 그러면 타입스크립트는 해당함수가 string을 반환한다고 유추한다.
    -   checkJs가 활성화되면 타입스크립트는 string[]을 전달하는 것에 대해서 타입 오류가 보고되어야 한다는 것을 알게 된다.
-   타입스크립트의 jsDoc 지원은 시간이 충분하지 앟은 프로젝트나 타입스크립트로 변환하는 데 익숙하지 않은 개발자를 위해 타입 검사를 점진적으로 추가하는 데 유용하다.
-   [jsdoc-supported-types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#handbook-content)

<br>

---

<br>

## 13.9 구성 확장

<br>

### 13.9.1 extends

<br>

### 13.9.2 구성 베이스

<br>

---

<br>

## 13.10 프로젝트 레퍼런스

<br>

### 13.10.1 composite

<br>

### 13.10.2 references

<br>

### 13.10.3 빌드 모드

<br>

---

<br>

## 13.11 마치며

```

```

```

```
