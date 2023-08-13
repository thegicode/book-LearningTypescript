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

-   Array, Function, Map, Set과 같은 전역 객체는 타입 시스템이 알아야 하지만 코드에서 선언되지 않는 구문이다.
-   이와 같은 전역 객체는 디노, Node.js, 웹 브라우저 등에서 실행되는 런타임 코드에 의해 제공된다.

<br>

### 11.3.1 라이브러리 선언

-   모든 자바스크립트 런타임에 존재하는 Array, Function 같은 내장된 전역 객체는 lib.\[target].d.ts 파일 이름으로 선언된다.
-   여기에서 target은 ES5, ES2020 또는 ESNext와 같이 프로젝트에서 대상으로 하는 자바스크립트의 최소 지원 버전이다.
-   [lib.es5.d.ts](/node_modules/typescript/lib/lib.es5.d.ts)

    ```
    interface Array<T> {
    /**
     * Gets or sets the length of the array. This is a number one higher than the highest index in the array.
     */
    length: number;
    /**
     * Returns a string representation of an array.
     */
    toString(): string;
    ```

-   VS Code : 내장 메서드에서 오른쪽 마우스 클릭, [Go to Definition]

<br>

#### 라이브러리 target

-   타입스크립트는 기본적으로 tsc CLI 또는 프로젝트의 tsconfig.json(기본값은 es5)에서 제공된 target 설정에 따라 적절한 lib 파일을 포함한다.
-   자바스크립트 최신 버전에 대한 연속적인 lib 파일들은 인터페이스 병합을 사용해 서로 빌드된다.
-   예, ES2015에 추가된 EPSILON, ifFinite와 같은 정적 Number 멤버는 lib2015.d.ts에 나열된다.

    -   [lib.es2015.core.d.ts](/node_modules/typescript/lib/lib.es2015.core.d.ts)

    ```
    interface NumberConstructor {
    /**
     * The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1
     * that is representable as a Number value, which is approximately:
     * 2.2204460492503130808472633361816 x 10‍−‍16.
     */
    readonly EPSILON: number;

    /**
     * Returns true if passed value is finite.
     * Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a
     * number. Only finite values of the type number, result in true.
     * @param number A numeric value.
     */
    isFinite(number: unknown): boolean;

    /**
     * Returns true if the value passed is an integer, false otherwise.
     * @param number A numeric value.
     */
    isInteger(number: unknown): boolean;
    ```

-   타입스크립 프로젝트는 target으로 지정한 자바스크립트 버전의 모든 최소 버전 lib 파일을 포함한다.

    -   예, target이 es2016인 프로젝트에는 lib.es5.d.ts, lib.es2015.d.ts, lib.es2016.d.ts까지 포함된다.

-   [TIP] target보다 최신 버전의 자바스크립트에서만 사용할 수 있는 기능은 타입 시스템에서 사용할 수 없다.
    -   예, target이 es5이면 String.prototype.startsWith와 같은 es2015 이상의 기능은 인식되지 않는다.

<br>

### 11.3.2 DOM 선언

-   DOM Document Object Model 타입이라고 하는 웹 브라우저 타입은 localStorage와 같은 API와 웹 브라우저에서 주로 사용하는 HTMLElement와 같은 타입 형태를 다룬다.
-   DOM 타입은 lib.dom.d.ts 파일과 다른 lib.\*.d.ts 선언 파일에도 저장된다.
-   많은 내장 전역 타입처럼 전역 DOM 타입은 종종 전역 인터페이스로 설명된다.
    -   [lib.dom.d.ts](/node_modules/typescript/lib/lib.dom.d.ts)
    ```
    interface Storage {
        /**
        * Returns the number of key/value pairs.
        *
        * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/length)
        */
        readonly length: number;
        /**
        * Removes all key/value pairs, if there are any.
        *
        * Dispatches a storage event on Window objects holding an equivalent Storage object.
        *
        * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/clear)
        */
        clear(): void;
        /**
        * Returns the current value associated with the given key, or null if the given key does not exist.
        *
        * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/getItem)
        */
        getItem(key: string): string | null;
        /**
        * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
        *
        * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/key)
        */
    ```
-   lib 컴파일러 옵션을 재정의하지 않는 타입스크립트 프로젝트는 DOM 타입을 기본으로 포함한다.

<br>

---

<br>

## 11.4 모듈 선언

-   선언 파일의 또 다른 중요한 기능은 모듈의 상태를 설명하는 기능이다.
-   모듈의 문자열 이름 앞에 declare 키워드를 사용하면 모듈의 내용을 타입 시스템에 알릴 수 있다.
-   다음 "my-example-lib"은 module.d.ts 선언 스크립트 파일에 존재하도록 선언한 다음, index.ts 파일에서 사용된다.

    ```
    // modules.d.ts
    declare module "my-example-lib" {
        export const value: string;
    }
    ```

    ```
    // index.ts
    import { value } from "mu-example-lib"

    console.log(value)
    ```

-   코드에서 declare module을 자주 사용해서는 안된다.

<br>

### 11.4.1 와일드카드 모듈 선언

-   모듈 선언은 자바스크립트와 타입스크립트 파일 확장자가 아닌 특정 파일의 내용을 코드로 가져올 수 있음을 웹 애플리케이션에 알리기 위해 사용한다.
-   모듈 선언으로 하나의 \* 와일드카드를 포함해 해당 패텬과 일치하는 모든 모듈을 나타낼 수 있다.
-   예, create-reat-app과 create-next-app 같은 인기 있는 리액트 starter에 미리 구성된 것처럼 많은 웹 프로젝트는 CSS 모듈을 지원하면 CSS 파일에서 런타임에 사용할 수 있는 객체로 스타일을 가져온다.

    ```
    // style.d.ts
    declare module = "*.module.css" {
        const styles: { [i: string]: string};
        export default styles;
    }
    ```

    ```
    // component.ts
    import styles form "./styles.module.css";

    styles.anyClassName; // type: string
    ```

-   [Warning] 와일드카드 모듈을 사용해 로컬 파일을 나타내는 방식이 타입 안정성을 완벽히 보장하지는 않는다.
    -   타입스크립트가 가져온 모듈 경로가 로컬 파일과 일치하는지 확인하는 매커니즘을 제공하지는 않는다.
    -   일부 프로젝트는 웹팩같은 빌드 시스템을 사용하거나 로컬 파일에서 .d.ts 파일을 생성해 가져오기가 가능한지 확인한다.

<br>

---

<br>

## 11.5 패키지 타입

<br>

### 11.5.1 선언

-   타입스크립트는 입력된 파일에 대한 .d.ts 출력 파일과 자바스크립트 출력 파일을 함께 생성하는 선언 옵션을 제공한다.

    ```
    // index.ts
    export const greet = (text: string) => {
        console.log(`Hello, ${text}!`);
    }
    ```

    -   module은 es2015, target은 2015인 선언 옵션을 사용해 다음 출력 파일을 생성한다.

    ```
    // index.d.ts
    export declare const greet: (text: string) => void;
    ```

    ```
    // index.ts
    export const greet = (text) => {
        console.log(`Hello, ${text}!`)
    }
    ```

-   자동으로 생성된 .d.ts 파일은 프로젝트에서 사용자가 사용할 타입 정의를 생성하는 가장 좋은 방법
-   일반적으로 .js 파일을 생성하는 타입스크립트도 작성된 대부분의 패키지도 해당 파일과 함께 .d.ts를 번들로 묶는 것이 좋다.
-   13장 '구성 옵션'에서 자세히

<br>

### 11.5.2 패키지 타입 의존성

-   타입스크립트는 프로젝트의 node_modules 의존성 dependency 내부에서 번들로 제공되는 .d.ts 파일을 감지하고 활용할 수 있다 .
-   이러한 파일은 해당 패키지에서 내보낸 타입 형태에 대해 마치 동일한 프로젝트에서 작성되었거나 선언 모듈 블록으로 선언된 것처럼 타입 시스템에 알린다.
-   자체 .d.ts 선언 파일과 함께 제공되는 npm 모듈은 대부분 다음과 같은 파일 구조를 갖는다.
    ```
    lib/
        index.js
        index.d.ts
    package.json
    ```
-   예, 테스트 프레임워크 Jest는 타입스크립트로 작성되었으면 jest 패키지 내에 자체 번들 .d.ts 파일을 제공한다.

    -   describe, it과 같은 함수를 제공하는 @jest/globals 패키지에 대한 의존성을 가지면 jest 전역으로 사용할 수 있다.

    ```
    // using-globals.d.ts
    describe("MyAPI", () => {
        it("works", () => { /* ... */ });
    });

    ```

    ```
    // using-imported.d.ts
    import { describe, it } from "@jest/globals";
    describe("MyAPI", () => {
        it("works", () => { /* ... */ });
    });
    ```

-   jest 패키지의 매우 제한적인 하위 구성을 처음부터 다시 만들면 다음 파일과 유사하다.
-   @jest/globals 패키지는 describe와 it을 내보낸다.
-   그런 다음 jest 패키지는 해당 함수를 가져오고, 해당 함수 타입의 describe와 it 변수를 가지고 전역 스코프로 확장한다.

    ```
    // node_modules/@jest/globals/index.d.ts
    export function describe(name: string, test: () => void): void;
    export function it(name: string, test: () => void): void
    ```

    ```
    // node_modules/jest/index.d.ts
    import * as globals from "@jest/globals"

    declare global {
        const describe: typeof globals.describe;
        const it: typeof globals.it;
    }
    ```

    -   이 구조는 제스트를 사용하는 프로젝트가 describe와 itd의 전역 버전을 참조할 수 있도록 허용한다.
    -   프로젝트 대안으로 @jest/globals 패키지에서 해당 함수를 가져오도록 선택할 수 있다.

<br>

### 11.5.3 패키지 타입 노출

-   <ins>프로젝트가 npm에 배포되고 사용자를 위한 타입을 제공하면서 패키지의 package.json 파일에 types 필드를 추가해 루트 선언 파일을 가리킨다.</ins>
-   types 필드는 main 필드와 유사하게 작동하고 종종 동일한 것처럼 보이지만 .js 확장자 대신에 .d.ts 확장자를 사용한다.
-   예, <ins>다음 가상의 패키지 파일에서 main 런타임 파일인 ./lib/index.js는 types 파일인 ./lib/index.d.ts와 병렬 처리된다.</ins>
    ```
    {
        "author": "Pendant Publishing",
        "main": "./lib/index.js",
        "name": "./coffetable",
        "types": "./lib/index.d.ts",
        "version": "0.5.22",
    }
    ```
-   그런 다음 타입스크립트는 유틸리티 패키지에서 가져온 파일을 사용하기 위해 제공해야 하는 것으로 ./lib/index.d.ts의 내용을 사용한다.
-   [NOTE] types 필드가 패키지의 package.json에 존재하지 않으면 타입스크립트는 ./index.d.ts를 기본값으로 가정한다.
-   대부분의 패키지는 타입스크립트의 선언 컴파일러 옵션을 사용해 소스 파일로부터 .js 파일과 함께 .d.ts 파일을 생성한다.

<br>

---

<br>

## 11.6 Definitely Typed

-   타입스크립트 팀과 커뮤니티는 작성된 패키지 정의를 수용하기 위해 DefinitelyTyped 라는 거대한 저장소를 만들었다.
-   DefinitelyTyped. 짧게 줄여서 DT는 깃허브에서 가장 활발한 저장소 중 하나다.
-   저장소에는 변경 제안 검토 및 업데이트 게시와 관련된 자동화 부분과 수천 개의 .d.ts 정의 패키지가 포함되어 있다.
-   DT 패키지는 타입을 제공하는 동일한 이름으로 npm에 @types 범위로 게시된다.
-   예, 별도의 @types/loasdash 패키지가 있고, loadash에 의존하는 유틸리티 패키지는 package.json에 다음과 같은 줄이 포함된다.
    ```
        "dependencies": {
            "@types/loadash": "^4.14.182",
            "loadash":"^4.17.21"
        }
    ```
-   예, @types/react는 리액트 패키지에 대한 타입 정의를 제공한다.

    ```
    // package.json
    "dependencies": {
        "react": "^18.1.0"
    }
    "devDependencies": {
        "@types/react": "^18.0.9"
    }

    ```

-   [Warning] 이러한 파일은 커뮤니티에서 작성되므로 상위 프로젝트보다 뒤쳐지거나 약간 부정확할 수 있다.
    -   프로젝트가 성공적으로 컴파일되었지만 라이브러리를 호출할 때 런타임 오류가 발생하면, 접근하고 있는 API의 서명이 변경되었는지 확안하라.
    -   안정적인 API를 가진 성숙한 프로젝트라면 일반적으로 발생하지 않지만 전례가 없는 것은 아니다.

<br>

### 11.6.1 타입 사용 가능성

-   아직 사용 가능한 타입이 없는 패키지에서 타입을 얻는 일반적인 세 가지 옵션
    -   @types/ 패키지를 생성하기 위해 DefinitelyTyped에 풀 리퀘스트 pullrequest를 보낸다.
    -   앞서 소개한 declare module 구문을 사용해 프로젝트 내에서 타입을 작성한다.
    -   13장 '구성 옵션'에서 다루게 될 npImplicityAny 옵션을 비활성하고 강력하게 경고한다.

<br>

---

<br>

## 11.7 마치며

-   선언 파일과 값 선언을 사용해 소스 코드에 선언되지 않는 모듈과 값에 대한 정보를 타입스크립트에 제공했다.

    -   .d.ts로 선언 파일 생성하기
    -   declare 키워드로 타입과 값 선언하기
    -   전역 변수, 전역 인터페이스 병합 및 전역 확장을 사용해서 전력 타입 변경하기
    -   타입스크립트의 내장 tareg, 라이브러리 및 DOM 선언 구성과 사용법
    -   와일드카드 모듈을 포함한 모둘 타입 선언하기
    -   타입스크립트가 패키지에서 타입을 선택하는 방법
    -   타입을 포함하지 않는 패키지에 대해 DefinitelyTyped를 사용해 타입 얻기

-   [TIP] https://www.learningtypescript.com/declaration-files 에서 연습
