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
-   tsc 명령에 tsconfig.json 파일이 있는 디렉터리 경로 또는 tsc가 tsconfig.json 대신 사용할 파일 경롤 -p 또는 --project 플래그에 전달한다.
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
-   tsc --outDir dist
-   모든 입력 파일을 src/ 디렉터리에 넣고 --outDir lib로 컴파일하면 lib/src/fruits/apple.js 대신 lib/fruis/apple.js가 생성된다.

<br>

### 13.5.2 target

-   자바스크립트 코드 구문을 지원하기 위해 어느 버전까지 변환해야 하는지를 지정하는 옵션
-   target을 지정하지 않으면 "es3"
-   tsc --init은 기본적은 "es2016"을 지정
-   오래된 환경에서 최신 자바스크립트 기능을 지원하려면 더 많은 자바스크립트 코드를 생성해야 하므로, 파일 크기가 조금 더 커지고 런타임 성능이 조금 저하된다.
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

<br>

### 13.5.4 소스 맵

<br>

### 13.5.5 noEmit

<br>

---

<br>

## 13.6 타입 검사

<br>

### 13.6.1 lib

<br>

### 13.6.2 skipLibCheck

<br>

### 13.6.3 엄격 모드

<br>

---

<br>

## 13.7 모듈

<br>

### 13.7.1 module

<br>

### 13.7.2 moduleResolutiion

<br>

### 13.7.3 CommonJS와의 상호 운용성

<br>

### 13.7.4 isolatedModules

<br>

---

<br>

## 13.8 자바스크립트

<br>

### 13.8.1 allowJs

<br>

### 13.8.2 checkJs

<br>

### 13.8.3 jSDoc 지원

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
