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
-   unknown 타입과 any 타입의 주요 차이점으로는 타입스크립트는 <ins>unknown 타입의 값을 훨씬 더 제한적으로 취급</ins>한다.

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
    -   <ins>[getCountKeyof.ts](./chap9/getCountKeyof.ts)</ins>

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

-   값의 타입을 수동으로 작성하는 것이 짜증날 정도로 복잡한 경우에 사용하면 매우 유용

    -   [original.ts](./chap9/original.ts)

    ```
    const original = {
        medium: "movie",
        title: "Mean Girls",
    };

    let adaptation: typeof original;

    if (Math.random() > 0.5) {
        adaptation = { ...original, medium: "play" }; // Ok
    } else {
        adaptation = { ...original, medium: 2 };
        // Error: Type 'number' is not assignable to type 'string'.
    }

    ```

-   자바스크립트의 typeof 연산자는 타입에 대한 문자열 이름을 변환하는 런타임 연산

<br>

#### **keyof typeof**

-   typeof는 값의 타입 검색, keyof는 타입에 허용된 키를 검색
    -   두 키워드를 연결해 값의 타입에 허용된 키를 간결하게 검색할 수 있다.
-   [logRatins.ts](./chap9/logRating.ts)

    ```
    const ratings = {
        imdb: 8.4,
        metacritic: 82,
    };

    function logRating(key: keyof typeof ratings) {
        console.log(ratings[key]);
    }

    logRating("imdb"); // Ok

    logRating("invalid");
    // Error: Argument of type '"invalid"' is not assignable to parameter of type '"imdb" | "metacritic"'

    ```

    -   logRating 함수는 rating 값의 키 중 하나를 받는다.
    -   <ins>코드는 인터페이스를 생성하는 대신, keyof typeof를 사용해 키가 ratings 값 타입의 키 중 하나여야 함을 나타낸다.</ins>

-   keyof와 typeof를 결합해서 사용하면 명시적 인터페이스 타입이 없는 객체에 허용된 키를 나타내는 타입에 대한 코드를 작성하고 업데이트하는 수고를 줄일 있다.

<br>

---

<br>

## 9.4 타입 어서션 type assertion

-   타입스크립트는 코드가 강력하게 타입화 strongly typed 될 때 가장 잘 작동한다.
-   경우에 따라서 코드가 어덯게 작동하는지 타입 시스템에 100% 정확하게 알리는 것이 불가능할 때가 있다.
-   타입스크립트는 값의 타입에 대한 타입 시스템의 이해를 재정의하기 위한 구문으로 타입 어서션 type assertion(또는 타입 캐스트 type cast)를 제공한다.
-   다른 타입을 의미하는 값의 타입 다음에 as 키워드를 배치한다. 타입 시스템은 어서션을 따르고 값을 해당 타입으로 처리한다.
-   [rawData.ts](./chap9/rawData.ts)

    ```
    const rawData = ["grace", "frankie"];

    // 타입: any
    JSON.parse(rawData);
    // Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

    // 타입: string[]
    JSON.parse(rawData) as string[];
    // Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

    // 타입: [string, string]
    JSON.parse(rawData) as [string, string];
    // Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

    // 타입: ["grace", "frankie"]
    JSON.parse(rawData) as ["grace", "frankie"];
    // Error: Argument of type 'string[]' is not assignable to parameter of type 'string'.

    ```

    -   다음과 같이 컴파일된다.

    ```
    var rawData = ["grace", "frankie"];

    // 타입: any
    JSON.parse(rawData);

    // 타입: string[]
    JSON.parse(rawData);

    // 타입: [string, string]
    JSON.parse(rawData);

    // 타입: ["grace", "frankie"]
    JSON.parse(rawData);
    ```

-   [NOTE] 이전 라이브러리나 코드로 작업하는 경우 item as type 대신 \<type>item 같은 캐스팅 구문을 볼 수 있다.

    -   이 구문은 JSX 구문과 호환되지 않고 .tsx 파일에서도 작동되지 않기 때문에 권장하지 않는다.

-   타입스크립트 모범 사례는 가능한 한 타입 어서션을 사용하지 않는 것이다.

<br>

### 9.4.1 포착된 오류 타입 어서션

-   코드 영역이 Error 클래스의 인스턴스를 발생시킬 거라 틀림없이 확신한다면 타입 어서션을 사용해 포착된 어서션을 오류로 처리할 수 있다.
-   다음 스니펫은 Error 클래스의 인스턴스라고 가정된 error의 message 속성에 접근한다.

    ```
    try {
        // (오류를 발생시키는 코드)
    } catch(error) {
        console.warn("Oh, no!", (error as Error).message)
    }
    ```

-   <ins>발생된 오류가 예상된 오류 타입인지를 확안하기 위해 instanceof와 같은 타입 내로잉을 사용하는 것이 더 안전하다.</ins>

    ```
    try {
        // (오류를 발생시키는 코드)
    } catch(error) {
        console.warn("Oh, no!", error instanceof Error ? error.message : error)
    }
    ```

<br>

### 9.4.2 non-null 어서션

-   <ins>null과 undefined를 제외한 값의 전체타입을 작성하는 대신 !를 사용한다.</ins>
-   non-null 어서션은 타입이 null 또는 undefined가 아니라고 간주하다.
-   다음 두 가지 타입 어서션은 둘 다 Date | undefined가 아니고 Date가 된다는 점에서 동일하다.

    -   [maybeDate.ts](./chap9/maybeDate.ts)

    ```
    // 타입 유추: Date | undefined
    let maybeDate = Math.random() > 0.5 ? undefined : new Date();

    // 타입이 Date라고 간주됨
    maybeDate as Date;

    // 타입이 Date라고 간주됨
    maybeDate;

    export {};

    ```

-   non-null 어서션은 값을 반환하거나 존재하지 않는 경우 undefined를 반환하는 Map.get과 같은 API에서 특히 유용한다.

    -   [seasonCounts.ts](./chap9/seasonCounts.ts)
    -   다음 seasonCounts는 일반적인 Map<string, number>이다. knownValue 변수는 !을 사용해 해당 타입에서 | undefined를 제거할 수 있다.

    ```
    const seasonCounts = new Map([
        ["I love Lucy", "6"],
        ["The Golden Grils", "7"],
    ]);

    // 타입: string : undefined
    let maybeValue = seasonCounts.get("I love Lucy");

    console.log(maybeValue.toUpperCase());
    // Error: 'maybeValue'은(는) 'undefined'일 수 있습니다.

    // 타입: string
    const knownValue = seasonCounts.get("I love Lucy")!;

    console.log(knownValue.toUpperCase());

    //  1. Map
    // Cannot find name 'Map'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    // 구글 검색 결과 :  npm i @types/node 로 해결
    // 2. Property 'toUpperCase' does not exist on type 'number'.
    // 책에서는 언급이 없다. 코드 예제가 내용에 적당하지 않는 것 같다.
    // number를 string으로 바꿔서 적용

    ```

<br>

### 9.4.3 타입 어서션 주의사항

-   꼭 필요한 경우가 아니라면 가능한 한 사용하지 말아야 한다.
-   값에 타입에 대해 더 쉽게 어서션하는 것보다 코드를 나타내는 더 정확한 타입을 갖는 것이 좋다.
-   이러한 어서션은 종종 잘못되기도 한다.

    -   [seasonCount2.ts](./chap9/seasonCounts2.ts)

    ```
    const seasonCounts = new Map([
        ["Broad City", "6"],
        ["Community", "7"],
    ]);

    // type: string
    const knownValue = seasonCounts.get("I love lucy")!;

    console.log(knownValue.toUpperCase()); // 타입 오류는 아니지만, 런타임 오류가 발생함
    // Runtime TypeError: Cannot read properties of undefined (reading 'toUpperCase')

    ```

-   타입 어서션은 자주 사용하면 안되고, 사용하는 것이 안전하다고 확신할 때만 사용해야 한다.

<br>

#### **어서션 vs 선언**

-   변수 타입을 선언하기 위해 타입 애너테이션을 사용하는 것과 초깃값으로 변수 타입을 변경하기 위해 타입 어서션을 사용하는 것 사이에는 차이가 있다.
-   타입 어서션은 타입스크립트에 타입 검사 중 일부를 건너띄도록 명시적으로 지시한다.

        -   [entertainer.ts](./chap9/entertainer.ts)

        ```
        interface Entertainer {
            acts: string[];
            name: string;
        }

        const declared: Entertainer = {
            // Error: Property 'acts' is missing in type '{ name: string; }' but required in type 'Entertainer'.
            name: "Moms Mabley",
        };

        const asserted = {
            name: "Moms Mabley",
        } as Entertainer;

        console.log(declared.acts.join(", "));
        // Runtime TypeError: Cannot read properties of undefined (reading 'join')
        console.log(asserted.acts.join(", "));

        ```

        -   Entertainer 타입 애너테이션으로 인해 declared 변수에서 오류를 잡을 수 있다.
        -   타입 어서션 때문에 asserted 변수에 대해서는 오류를 잡을수 없다.

    <br>

#### **어서션 할당 가능성 double type assertion**

-   타입스크립트는 타입 중 하나가 다른 타입에 할당 가능한 경우에만 두 타입 간의 타입 어서션을 허용한다.
-   [myValue.ts](./chap9/myValue.ts)

    ```
    let myValue = "Stellla!" as number;
    // Error: Conversion of type 'string' to type 'number' may be a mistake
    // because neither type sufficiently overlaps with the other.
    // If this was intentional, convert the expression to 'unknown' first.

    ```

-   하나의 타입에서 값을 완전히 관련 없는 타입으로 전환해야 하는 경우 이중 타입 어서션 double type assertion을 사용한다.
    ```
    let myValueDoubble = "1337" as unknown as number;
    // 허용되지만 이렇게 사용하면 안 됨
    ```
    -   as unknown as ... 이중 타입 어서션은 위험하고 항상 코드의 타입이 잘못되었다는 징후를 나타낸다.

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
