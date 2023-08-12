# Chapter 11 선언 파일

타입스크립트는 구현과 별도로 타입 형태를 선언할 수 있다. 타입 선언은 파일 이름이 d.t.ds 확장자로 끝나는 선언 파일 declaratin file에 작성된다.
선언 파일은 일반적으로 프로젝트 내에서 작성되고, 프로젝트의 컴파일된 npm 패키지로 빌드 및 배포되거나 독립 실행 standalond typings 패키지로 공유된다.

## 11.1 선언 파일

-   d.ts 선언 파일은 사용 가능한 런타임 값, 인터페이스, 모듈, 일반적인 타입의 설명만 포함된다.
-   선언 파일은 다른 타입스크립트 파일과 마찬가지로 임포트해서 사용할 수 있다.

    ```
    // types.d.ts
    expport interface Character {
        catchpharase?: string;
        name: string
    }
    ```

    ```
    // index.ts
    import { Character } from "./types"

    export const character: Character = {
        catchpharase: "Yee-haw!",
        name: "Sandy Cheeks
    }
    ```

-   [TIP] 선언 파일은 값이 아닌 타입만 선언할 수 있는 코드 영역을 의미하는 앰비언트 컨텍스트 ambient context를 생성한다.

<br>

---

<br>

## 11.2 런타임 값 선언

-   선언 파일은 함수 또는 변수 같은 런타임 값을 생성하지 않을 수 있지만, declare 키워드를 사용해 이러한 구조체가 존재한다고 선언할 수 있다.
-   웹 페이지의 \<script> 태그 같은 외부 작업이 특정 타입의 이름을 사용해 값을 생성했음을 타임 시스템에 알린다.
-   declare로 변수를 선언하면 초깃값이 허용되지 않는다는 점을 제외하고는 일반적인 변수 선언과 동일한 구문을 사용한다.

    ```
    // types.d.ts
    declare let declared: string; // Ok

    declare let initializer: string = "Wanda";
    // Error: Initilizers are not allowed in ambient contexts.
    ```

    -   declared 변수를 성공적으로 선언하지만 initializer 변수에 값을 제공하려고 하면 타입 오류가 발생한다.

-   함수와 클래스도 일반적인 형식과 유사하게 선언되자만 함수 또는 메서드의 본문이 없다.

    ```
    declare function canGrantWish(wish: string): boolen;

    declare function grantWish(wish: string) {
        return true;
    };
    // Error: An implementation cannot be declared in ambient contexts.

    class Fairy {
        canGrantWish(wish: string): boolean;

        grantWish(wish: string) {
            // Error: An implementation cannot be declared in ambient contexts.
            return true;
        }
    }

    ```

    -   canGrantWish 함수와 메서드는 본문 없이 올바르게 선언되었지만, grantWish 함수와 메서드는 본문을 설정하려는 부적절한 시도로 인해 구문 오류가 발생한다.

-   declared 키워드를 사용한 타입 선어는 .d.ts 선언 파일에서 사용하는 게 가장 일반적이지만, 선언 파일 외부에서도 사용할 수 있다.
-   모듈 또는 스크립트 파일에서도 declared 키워드를 사용할 수 있다.
-   <ins>전역으로 사용 가능한 변수가 해당 파일에서만 사용되어야 하는 경우 declare 키워드가 유용하다.</ins>

    [index.ts](./chap11/index.ts)

    ```
    declare const myGlobalValue: string;

    console.log(myGlobalValue);
    ```

    -   myGlobalValue 변수는 index.ts 파일에 정의되었으므로 해당 파일에서 사용할 수 있다.

-   인터페이스와 같은 타입 형태는 .d.ts 선언 파일에서 declare 키워드 유모와는 관계없이 허용되지만, 함수나 변수 같은 런타임 구문에 declare 키워드가 없다면 타입 오류가 발생한다.
    [index.d.ts](./chap11/index.d.ts)

    ```
    interface Writer {} // Ok
    declare interface Writer {} // Ok

    declare const fullName: string; // Ok: 타입은 원시 타입 string
    declare const firstName: "Liz"; // Ok: 타입은 리터럴 값

    const lastName = "lemon";
    // Error: Top-level declarations in .d.ts files must start with either a 'declare' or 'export' modifier.
    ```

<br>

### 11.2.1 전역 변수

-   import 또는 export 문이 없는 타입스크립트 파일은 모듈이 아닌 스크립트로 취급되기 때문에 여기에 선언된 타입을 포함한 구문은 전역으로 사용된다.
-   <ins>import 또는 export 가 없는 선언 파일은 해당 동작의 이점을 사용해 전역으로 선언할 수 있다.</ins>
-   전역 선언 파일은 애플리케이션의 모든 파일에 걸쳐서 사용할 수 있는 전역 타입 또는 변수를 사용하는 데 특히 유용하다.

    -   [global.d.ts](./chap11/global.d.ts)

    ```
    declare const version: string;
    ```

    -   [version.d.ts](./chap11/version.d.ts)

    ```
    export function logVersion() {
        console.log(`Version: ${version}`); // Ok
    }

    ```

-   전역으로 선언된 값은 전역 변수를 사용하는 브라우저 애플리케이션에서 가장 자주 사용된다.
-   대부분의 최신 웹 프레임워크는 일반적으로 ECMA스크립트 모듈 같은 최신 기술을 사용하지만, 변수를 저장하는 작업은 특히 작은 프로젝트에서는 여전히 유용하다.

<br>

### 11.2.2 전역 인터페이스 병합

-   변수는 타입스크립트의 타입 시스템에서 떠돌아다니는 유일한 전역은 아니다. 전역 API와 값에 대한 많은 타입 선언이 전역적으로 존재한다.
-   인터페이스는 동일한 이름의 다른 인터페이스아 병합되기 때문에 import와 export문이 없는 .d.ts 선언 파일 같은 전역 스크립트 컨텍스트에서 인터페이스를 선언하면 해당 인터페이스가 전역으로 확장된다.
-   예, 서버에 따라 설정된 전역 변수에 의존하는 웹 애플리케이션은 해당 변수를 전역 Window 인터페이스에 존재하도록 선언하고 싶을 수 있다.

    -   인터페이스 병합을 이용하면 types/www.d.ts와 같은 파일에서 Window 타입의 전역 window 변수에 존재하는 변수를 선언할 수 있도록 허용한다.

    ```
    <scirpt type="text/javascript">
    window.myVersion = "3.1.1"
    </script>
    ```

    ```
    // types/window.d.ts
    interface Window {
        myVersion: string;
    }
    ```

    ```
    // index.ts
    export function logWindowVersion() {
        console.log(`window version is: ${window.myVersion}`);
        window.alert("Build-in window types still work! Hooray!");
    }
    ```

<br>

### 11.2.3 전역 확장

-   다른 곳에 정의된 타입을 가져와서 전역 정의를 크게 단순화할 때와 같이 전역 범위로 확장이 필요한 .d.ts 파일에 import 또는 export 문을 항항 금지할 수 있는 것은 아니다. 경우에 따라서 모듈에 선언된 타입이 전역으로 사용되어야 한다.
-   타입스크립트에서 <ins>declare global</ins> 코드 블록 구문을 사용해 해당 블록 내용이 전역 컨텍스트에 있다고 표시한다.

    ```
    // types.d.ts
    // (모듈 컨텍스트)

    declare global {
        // (전역 컨텍스트)
    }

    // (모듈 컨텍스트)
    ```

-   다음 typs/data.d.ts 파일은 Data 인터페이스를 내보내고, 나중에 types/global.d.ts 와 런타임 index.ts 파일에서 이 인터페이스를 가져온다.

    -   [data.d.ts](./chap11/global/types/data.d.ts)

    ```
    export interface Data {
        version: string;
    }

    ```

    -   [global.d.ts](./chap11/global/types/global.d.ts)

    ```
    import { Data } from "./data";

    declare global {
        const globalDeclared: Data;
    }

    declare const locallyDeclared: Data;

    ```

    -   [index.ts](./chap11/global/index.ts)

    ```
    import { Data } from "./types/data";
    import { locallyDeclared } from "./types/global";

    function logData(data: Data) {
        // Ok
        console.log(`Data version is: ${data.version}`);
    }

    logData(globalDeclared); // Ok

    logData(locallyDeclared);
    // Error: Cannot find name 'globalDeclared'

    ```

-   전역 선언과 모듈 선언이 함께 잘 작동하도록 랭글링 wrangling 하는 것은 까다로울 수 있다.
-   타입스크립트의 declare와 global 키워드를 적절히 사용하면 프로젝트에서 전역으로 사용 가능한 타입 정의를 설명할 수 있다.

<br>

---

<br>

## 11.3 내장된 선언

<br>

### 11.3.1 라이브러리 선언

<br>

### 11.3.2 DOM 선언

<br>

---

<br>

## 11.4 모듈 선언

<br>

### 11.4.1 와일드카드 모듈 선언

<br>

---

<br>

## 11.5 패키지 타입

<br>

### 11.5.1 선언

<br>

### 11.5.2 패키지 타입 의존성

<br>

### 11.5.3 패키지 타입 노출

<br>

---

<br>

## 11.6 Definitely Typed

<br>

### 11.6.1 타입 사용 가능성

<br>

---

<br>

## 11.7 마치며
