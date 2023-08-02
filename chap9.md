# Chapter 9 타입 제한자

<br>

## 9.1 top 타입

-   시스템에서 가능한 모든 값을 나타내는 타입
-   모든 타입은 top 타입에 할당할 수 있다.

<br>

### 9.1.1 any 다시 보기

-   any 타입은 모든 타입의 위치에 제공될 수 있다는 점에서 top 타입처럼 작동할 수 있다.
-   any는 일반적으로 console.log의 매개변수와 같이 모든 타입의 데이터를 받아들이는 위치에서 사용한다.
-   [anyValue.ts](./chap9/anyValue.ts)

    ```
    let anyValue: any;
    anyValue = "Lucille Ball";
    anyValue = 123;

    console.log(anyValue);
    ```

-   다만, any는 타입스크립트가 해당 값에 대한 할당 가능성 또는 멤버에 대해 타입 검사를 수행하지 않도록 명시적으로 지시한다는 문제점을 갖는다.
-   [greetComedian.ts](./chap9/greetComedian.ts)

    ```
    function greetComedian(name: any) {
        // 타입 오류 없음
        console.log(`Announcing ${name.toUpperCase()}!`);
    }

    greetComedian({ name: "Bea Arthur" });
    // Runtime error: name.toUpperCase is not a function
    ```

-   어떤 값이든 될 수 있음을 나타내려면 unknown 타입이 훨씬 안전하다.

<br>

### 9.1.2 unknown

-   타입스크립트에서 unknown 타입은 진정한 top 타입이다.
-   모든 객체를 unknown 타입의 위치로 전달할 수 있다는 점에서 any 타입과 유사하다.
-   unknown 타입과 any 타입의 주요 차이점으로는 타입스크립트는 <span class="emphasis">unknown 타입의 값을 훨씬 더 제한적으로 취급<span>한다.

    -   타입스크립트는 unknown 타입의 속성에 직접 접근할 수 없다.
    -   unknown 타입은 top 타입이 아닌 타입에는 발생할 수 없다.

-   [greetComedianUnknown.ts](./chap9/greetComedianUnknown.ts)

    ```
    function greetComedian(name: unknown) {
        console.log(`Announcing ${name.toUpperCase()}!`);
        // Error : Property 'toUpperCase' does not exist on type 'unknown'.
    }
    ```

    -   unknown 타입 값의 속성에 접근하려고 시도하면 타입스크립트는 타입 오류를 보고한다.
    -   타입스크립트가 unknown 타입인 name에 접근할 수 있는 유일한 방법은 instanceof나 typeof 또는 타입 어서션을 사용하는 것처럼 값의 타입이 제한된 경우이다.

        -   [greetComedianSafety.ts](./chap9/greetComedianSafety.ts)

        ```
        function greetComedianSafety(name: unknown) {
            if (typeof name === "string") {
                console.log(`Announcing ${name.toUpperCase()}`); // Ok
            } else {
                console.log("Well, I'm off");
            }
        }

        greetComedianSafety("Betty White");
        // Logs: Announcing BETTY WHITE
        greetComedianSafety({});
        // Logs: Well, I'm off

        ```

        -   책 코드가 오류가 있음(181쪽)

-   가능한 any 대신 unknown을 사용 추천

<br>

---

<br>

## 9.2 타입 서술어 type predicate

-   instanceof, typeof와 같이 자바스크립트 구문을 사용해 타입을 좁히는 방법은
    -   제한된 검사로 이 방법을 사용할 때는 괜찮지만,
    -   로직을 함수로 감싸면 타입을 좁힐 수 없게 된다.
-   [isNumberOrString.ts](./chap9/isNumberOrString.ts)

    ```
    function isNumberOrString(value: unknown) {
        return ["number", "string"].includes(typeof value);
        // Error : : Property 'includes' does not exist on type 'string[]'.
        // Do you need to change your target library? Try changing the 'lib' compiler option to 'es2016' or later.
        // tsconfig compilerOption - "lib": ["es2016", "dom"] 추가했으나 계속 메시지가 나온다.
    }

    function logValueIfExists(value: number | string | null | undefined) {
        if (isNumberOrString(value)) {
            value.toString();
            // Error: 'value'은(는) 'null' 또는 'undefined'일 수 있습니다.
        } else {
            console.log("Value does not exist", value);
        }
    }
    ```

    -   타입스크립트는 isNumberOrString이 boolean 값을 반환한다는 사실만 알 수 있고, 인수의 타입을 좁히기 위함이라는 건 알 수 없다.

-   타입 서술어
    -   타입스크립트에는 인수가 특정 타입인지 여부를 나타내기 위해 boolean 값을 반환하는 함수를 위한 특별한 구문
    -   '사용자 정의 타입 가드 user-defined type guard'
    -   개발자는 instanceof 또는 typeof와 유사한 자체 타입 가드를 생성한다.
    -   타입 서술어는 일반적으로 매개변수로 전달된 인수가 매개변수의 타입보다 더 구체적인 타입인지 여부를 나타내는데 사용된다.
-   타입 서술어의 반환 타입은 매개변수의 이름, is 키워드, 특정 타입으로 선언할 수 있다.
    ```
    function typePredicate(input: WideType): input is NarrowType;
    ```
-   [isNumberOrStringTypePredicate.ts](./chap9/isNumberOrStringTypePredicate.ts)

    ```
    function isNumberOrString(value: unknown): value is number | string {
        return ["number", "string"].includes(typeof value);
    }

    function logValueIfExists(value: number | string | null | undefined) {
        if (isNumberOrString(value)) {
            // value: number | string 타입
            value.toString();
        } else {
            // value: null | undefined의 타입
            console.log("Value does not exist", value);
        }
    }

    ```

-   타입 서술어는 이미 한 인터페이스의 인스턴스로 알려진 객체가 더 구체적인 인터페이스의 인스턴스인지 여부를 검사하는 데 자주 사용한다.

    -   [comedian.ts](./chap9/comedian.ts)

    ```
    interface Comedian {
        funny: boolean;
    }

    interface StandupComedian extends Comedian {
        routine: string;
    }

    function isStandupComedian(value: Comedian): value is StandupComedian {
        return "routine" in value;
    }

    function workWithComedian(value: Comedian) {
        if (isStandupComedian(value)) {
            // value: StandupComedian의 타입
            console.log(value.routine); // Ok
        }
        // value: Comedian의 타입
        console.log(value.routine);
        // Error: Property 'routine' does not exist on type 'Comedian'.
    }

    ```

-   타입 서술어는 false 조건에서 타입을 좁히기 때문에 타입 서술어가 입력된 타입 이상을 검사하는 경우 예상치 못한 결과를 얻을 수 있음을 주의

    -   [isLongString.ts](./chap9/isLongString.ts)

    ```
    function isLongString(input: string | undefined): input is string {
        return !!(input && input.length >= 7);
    }

    function workWithText(text: string | undefined) {
        if (isLongString(text)) {
            // text: string의 타입
            console.log("Long text:", text.length);
        } else {
            // text: undefined 타입
            console.log("Short text", text?.length);
            // Error: Property 'length' does not exist on type 'never'.
        }
    }

    ```

-   타입 서술어는 속성이나 값의 타입을 확인하는 것 이상을 수행해 잘못 사용하기 쉬우므로 가능하면 피하는 것이 좋다. 대부분은 간단한 타입 서술어만으로 충분하다.

<br>

---

<br>

## 9.3 타입 연산자

-   기존 타입의 속성 일부를 변환해서 두 타입을 결합하는 새로운 타입을 생성해야 할 때도 있다.

<br>

### 9.3.1 keyof

-   13장 구성 옵션 예제, ratings[key]에 대한 오류 보고

    -   [ratings.ts](./chap9/ratings.ts)

    ```
    interface Ratings {
        audience: number;
        critics: number;
    }

    function getRating(ratings: Ratings, key: string): number {
        return ratings[key];
        // Error: 'string' 형식의 식을 'Ratings' 인덱스 형식에 사용할 수 없으므로 요소에 암시적으로 'any' 형식이 있습니다.
        //   'Ratings' 형식에서 'string' 형식의 매개 변수가 포함된 인덱스 시그니처를 찾을 수 없습니다.
    }

    const ratings: Ratings = { audience: 66, critics: 84 };

    getRating(ratings, "audience"); // Ok

    getRating(ratings, "not valid"); // 허용되지만 사용하면 안 됨
    ```

    -   타입 string은 Ratings 인터페이스에서 속성으로 허용되지 않는 값을 허용하고, Ratings는 string 키를 허용하는 인덱스 시그니처를 선언하지 않는다.

-   또 다른 옵션은 허용되는 키를 위한 리터럴 유니언 타입을 사용하는 것이다. 이 경우 컨테이너 값에 존재하는 키만 적절하게 제한하는 것이 더 정확하다.

    -   [getRating.ts](./chap9/getRating.ts)

    ```
    function getRating(ratings: Ratings, key: "audience" | "critics"): number {
        return ratings[key]; // Ok
    }

    const ratings: Ratings = { audience: 66, critics: 84 };

    getRating(ratings, "audience"); // Ok

    getRating(ratings, "not valid");
    // Error: Argument of type '"not valid"' is not assignable to parameter of type '"audience" | "critics"'.

    ```

-   그러나 인터페이스에 수십 개 이상의 멤버가 있다면?
-   타입스크립트에서는 기존에 존재하는 타입을 사용하고, 해당 타입에 허용되는 모든 키의 조합을 변환하는 keyof 연산자를 제공한다.

    -   타입 에너테이션처럼 타입을 사용하는 모든 곳에서 타입 이름 앞에 keyof 연산자를 배치한다.
    -   <span class="emphasis">[getCountKeyof.ts](./chap9/getCountKeyof.ts)</span>

    ```
    function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
        return ratings[key]; // Ok
    }

    const ratings: Ratings = { audience: 66, critics: 84 };

    getCountKeyof(ratings, "audience"); // Ok

    getCountKeyof(ratings, "not valid");
    // Error: Argument of type '"not valid"' is not assignable to parameter of type 'keyof Ratings'.

    ```

    -   keyof Ratings는 'audience' | 'critics'과 동일하지만, 작성하는 것이 훨씬 빠르고 Ratings 인터페이스가 변경되더라도 수동으로 업데이트할 필요가 없다.

-   keyof는 존재하는 타입의 키를 바탕으로 유니언 타입을 작성하는 훌륭한 기능이다.
    -   15장 타입 운영

<br>

### 9.3.2 typeof

<br>

---

<br>

## 9.4 타입 어서션

<br>

### 9.4.1 포착된 오류 타입 어서션

<br>

### 9.4.2 non-null 어서션

<br>

### 9.4.3 타입 어서션 주의사항

<br>

---

<br>

## 9.5 constant 어서션

<br>

### 9.5.1 리터럴에서 원시 타입으로

<br>

### 9.5.2 읽기 전용 객체

<br>

---

<br>

## 9.6 마치며

<style>
    .emphasis {text-decoration:underline}
</style>
