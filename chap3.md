# Chapter 3 유니언과 리터럴

타입스크립트가 해당 값을 바탕으로 추론을 수행하는 두 가지 핵심 개념

-   유니언 union : 값에 허용된 타입을 두 개 이상의 타입으로 확장하는 것
-   내로잉 narrowing : 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

## 1 유니언 타입

```
// mathematician.ts
let mathematician = Math.random() > 0.5 ? undefined : "Mark Goldberg";

```

-   '이거 혹은 저거'와 같은 타입을 유니언이라고 한다.
-   유니언 타입은 값이 정확히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나라는 것을 알고 있는 경우에 코드를 처리하는 개념
-   타입스크립트는 가능한 값 또는 구성 요소 사이에 |(수직선) 연산자를 사용해 유니언 타입을 나타낸다.
    -   앞에서 나온 mathematician은 stirng | undfined 타입으로 간주된다.

<br>

### 1.1 유니언 타입 선언

-   변수의 초기값이 있더라도 변수에 대한 명시적 타입 애너테이션을 제공하는 것이 유용할 때 유니언 타입을 사용한다.

    ```
    let thinker: stirng | null = nlll;

    if (Math.random() > 0.5) {
        thinker = "Susanne Langer";
    }
    ```

-   [NOTE] 유니언 타입 선언의 순서는 중요하지 않다. 타입스크립트에서는 boolean | number 나 number | boolean 모두 똑같이 취급한다.

<br>

### 1.2 유니언 속성

-   값이 유니언 타입일 때 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다.

    ```
    // physicist.ts

    let physicist = Math.random() > 0.5 ? "Marie Curie" : 84;
    physicist.toString();

    physicist.toUpperCase();
    // Error : Property 'toUpperCase' does not exist on type 'string | number'.
    // Property 'toUpperCase' does not exist on type 'number'.

    physicist.toFixed();
    // Error : Property 'toFixed' does not exist on type 'string | number'.
    // Property 'toFixed' does not exist on type 'string'.

    ```

-   유니언 타입으로 정의된 여러 타입 중 하나의 타입으로 된 값의 속성을 사용하려면 코드에서 값이 보다 구체적인 타입 specific type 중 하나라는 것을 타입스크립트에 알려야 한다. 이 과정을 내로잉이라고 부른다.

<br>

---

<br>

## 2 내로잉

-   내로잉은 값이 정의, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것이다.
-   타입스크립트가 값의 타입이 이전에 알려진 것보다 더 좁혀졌다는 것을 알게 되면 값을 더 구체적인 타입으로 취급한다.
-   타입을 좁히는 데 사용할 수 있는 논리적 검사를 타입 가드 type quard라고 한다.

<br>

### 2.1 값 할당을 통한 내로잉

-   변수에 값을 직접 할당하면 타입스크립트는 변수의 타입을 할당된 값의 타입으로 좁힌다.

    ```
    // admiral.ts

    let admiral: number | string;

    admiral = "Grace Hopper";

    admiral.toUpperCase();

    admiral.toFixed();
    // Error: Property 'toFixed' does not exist on type 'string'.
    ```

-   변수에 유니언 타입 애너테이션이 명시되고 초깃값이 주어질 때 값 할당 내로잉이 작동한다.

    ```
    // inventor.ts

    let inventor: number | string = "Hedy Lamarr";

    inventor.toUpperCase();

    inventor.toFixed();
    // Error: Property 'toFixed' does not exist on type 'string'
    ```

    -   초깃값으로 문자열이 할당되었기 때문에 타입스크립트는 즉시 string 타입으로 바로 좁혀졌다는 것을 알 수 있다.

<br>

### 2.2 조건 검사를 통한 내로잉

-   일반적으로 타입스크립트에서는 변수가 알려진 값과 같은지 확인하는 if 문을 통해 변수의 값을 좁히는 방법을 사용한다.

    ```
    // scientist.ts

    let scientist = Math.random() > 0.5 ? "Rosalind Franklin" : 51;

    if (scientist === "Rosalind Franklin") {
        scientist.toUpperCase();
    }

    scientist.toUpperCase();
    // Error : Property 'toUpperCase' does not exist on type 'string | number'.
    //  Property 'toUpperCase' does not exist on type 'number'.

    ```

<br>

### 2.3 typeof 검사를 통한 내로잉

```
// researcher.ts

let researcher = Math.random() > 0.5 ? "Rosalind Franklin" : 51;

if (typeof researcher === "string") {
    researcher.toUpperCase();
}

if (!(typeof researcher === "string")) {
    researcher.toFixed();
} else {
    researcher.toUpperCase();
}

typeof researcher === "string"
    ? researcher.toUpperCase()
    : researcher.toFixed();

```

-   어떤 방법으로 작성하든 typeof 검사는 타입을 좁히기 위해 자주 사용하는 실용적인 방법이다.

<br>

---

<br>

## 3 리터럴 타입 literal type

-   원시 타입 값 중 어떤 것이 아닌 특정 원싯값으로 알려진 타입이 리터럴 타입이다.
    ```
    const philosopher = "Hypatia";
    ```
    -   philosopher는 string 타입이 아닌 "Hypatia"라는 특별한 값이다.
-   유니온 타입과 리터럴 타입을 섞어서 사용할 수 있다.

    ```
    // lifespan.ts

    let lifespan: number | "ongoing" | "uncertaion";

    lifespan = 89;
    lifespan = "ongoing";

    lifespan = true;
    // Error: Type 'true' is not assignable to type 'number | "ongoing" | "uncertaion"'.

    ```

<br>

### 3.1 리터럴 할당 가능성

```
let specificallyAda = "Ada";

specificallyAda = "Ada";

specificallyAda = "Byron";
// error가 발생하지 않음.
// 책에서는 아래의 오류 발생
// Error : Type "Byron" is not assignable to type "Ada"

let someString = "";

specificallyAda = someString;
// error가 발생하지 않음.
// 책에서는 아래의 오류 발생
// Error: Type 'string' is not assignable to type "Ada"

```

<br>

---

<br>

## 4 엄격한 null 검사 strice null checking

<br>

### 4.1 십억 달러의 실수

-   '십억 달러의 실수'는 다른 타입이 필요한 위치에서 null 값을 사용하도록 허용하는 많은 타입 시스템을 가리키는 업계 용어이다.

```
// nameMaybe.ts

// strictNullChecks = false

let nameMaybe = Math.random() > 0.5 ? "Tony Hoare" : undefined;

nameMaybe.toUpperCase();
// Potential runtime error : Cannot read property 'toLowerCase' of undefined.
```

```
// strictNullChecks = true


let nameMaybe = Math.random() > 0.5 ? "Tony Hoare" : undefined;

nameMaybe.toUpperCase();
// Error:  Object is possibly 'undefiend'

```

-   타입스크립트의 모범 사례는 일반적으로 엄격한 null 검사를 활성화하는 것이다. 그렇게 해야만 충돌을 방지하고 샆업 달러의 실수를 제저할 수 있다.

<br>

### 4.2 참 검사를 통한 내로잉

-   자바스크립트에서 참 또는 truely 는 && 연산자 또는 if 문처럼 boolean 문맥에서 true로 간주된다. 자바스크립트에서 false, 0, -0, 0n, "", undefined, NaN 처럼 falsy로 정의된 값을 제외한 모든 값은 모두 참이다.
-   타입스크립트는 잠재적인 값 중 truely로 확인된 일부에 한해서만 변수의 타입을 좁힐 수 있다.
-   다음 토드에서 if문의 코드 블록에서는 geneticist가 string 타입이 되어야 한다고 추론할 수 있다.

    ```
    // geneticist.ts

    let geneticist = Math.random() > 0.5 ? "Barbara McDlintock" : undefined;

    if (geneticist) {
        geneticist.toUpperCase(); // Ok : string
    }

    geneticist.toUpperCase();
    // Error: 'geneticist'은(는) 'undefined'일 수 있습니다.
    ```

-   논리 연산자인 &&와 ?는 참 여부를 검사하는 일도 잘 수행합니다. 하지만 참 여부 확인 외에 다른 기능은 제공하지 않는다. string | undefined 값에 대해 알고 있는 것이 falsy라면, 그것이 빈 문자열인지 undefined인지는 알 수 없다.
    ```
    geneticist && geneticist.toUpperCase(); // Ok : string | undefined
    geneticist?.toUpperCase(); // Ok : string | undefined
    ```
-   다음 코드에서 biologist는 false | string 타입이고, if 문에서는 string으로 좁힐 수 있지만, else 문에서 biologist가 빈 문자열인 경우에는 여전히 string이 될 수 있음을 알 수 있다.

    ```
    // biologist.ts
    let biologist = Math.random() > 0.5 && "Rachel Carson";

    if (biologist) {
        biologist; // 타입 : string
    } else {
        biologist; // 타입 : false | string
    }

    ```

<br>

### 4.3 초깃값이 없는 변수

-   타입스크립트는 값이 할당될 때까지 변수가 undefined임을 이해할 만큼 충분히 영리하다. 값이 할당되기 전에 속성 중 하나에 접근하려는 것처럼 변수를 사용하려고 시도하면 다음과 같은 어류 메시지가 나타난다.

    ```
    let mathematician2: string;

    mathematician2?.length;
    // Error : 'mathematician2' 변수가 할당되기 전에 사용되었습니다.

    mathematician2 = "Mark Goldberg";
    mathematician2.length; // Ok

    ```

-   변수 타입에 undefined가 포함되어 있는 경우에는 오류가 보고되지 않는다. 변수 타입에 | undefined를 추가하면, undefined는 유효한 타입이기 때문에 사용전에는 정의할 필요가 없음을 타입스크립트에 나타낸다.
-   이전 코드 스니펫에서 mathematician2의 타입이 string | undefiend 이면 어떤 오류도 발생하지 않는다.

    ```
    // mathematician22.ts

    let mathematician22: string | undefined;

    mathematician22?.length; // Ok

    mathematician22 = "Mark Goldberg";
    mathematician22.length; // Ok

    ```

<br>

---

<br>

## 5 타입 별칭 type alias

-   긴 형태의 유니언 타입인 경우
    ```
    let rawDataFrist: boolean | number | string | null | undefined;
    let rawDataSecond: boolean | number | string | null | undefined;
    let rawDataThird: boolean | number | string | null | undefined;
    ```
-   타입스크립트에는 재사용하는 타입에 더 쉬운 이름을 할당하는 타입 별칭이 있다.
-   type 새로운 이름 = 타입
-   편의상 타입 별칭은 파스칼 케이스 PascalCase로 이름을 지정
    ```
    type MyName = ...;
    ```
-   타입 별칭은 타입 시스템의 '복사해서 붙여넣기'처럼 작동한다.

    ```
    // rawData.ts
    type RawData = boolean | number | string | null | undefined;

    let rawDataFrist: RawData;
    let rawDataSecond: RawData;
    let rawDataThird: RawData;
    ```

<br>

### 5.1 타입 별칭은 자바스크립트가 아닙니다

-   타입 별칭은 타입 애너테이션처럼 자바스크립트로 컴파일되지 않는다.
-   앞서 다룬 스니펫은 다음 자바스크립트로 컴파일된다.
    ```
    var rawDataFrist;
    var rawDataSecond;
    var rawDataThird;
    ```
-   타입 별칭은 순전히 타입 시스템에만 존재하므로 런타임 코드에서는 참조할 수 없다.

    ```
    // SomeType.ts
    type SomeType = string | undefined;

    console.log(SomeType);
    // Error : 'SomeType' only refers to a type, but is being used as a value here.

    ```

<br>

### 5.2 타입 별칭 결합

-   타입 별칭은 다른 타입 별칭을 참조할 수 있다.

    ```
    type Id = number | string;

    type IdMaybe = Id | undefined | null;
    // IdMaybe 타입은 다음과 같음 : number | string | undefined | null

    ```

-   순서는 상관없다.

    ```
    type IdMaybe = Id | undefined | null; // Ok
    type Id = number | string;

    ```

<br>

---

<br>

## 6 마치며

-   유니언 타입으로 두 개 이상의 타입 중 하나일 수 있는 값을 나타내는 방법
-   타입 애너테이션으로 유니언 타입을 명시적으로 표시하는 방법
-   타입 내로잉으로 값의 가능한 타입을 좁히는 방법
-   리터럴 타입의 const 변수와 원시 타입의 let 변수의 차이점
-   '십억 달러의 실수'와 타입스크립트가 엄격한 null 검사를 처리하는 방법
-   존재하지 않을 수 있는 값을 나타내는 명시적인 | undefined
-   할당되지 않는 변수를 위한 암묵적인 | undefined
-   반복적으로 사용하고 입력이 긴 유니언 타입을 타입 별칭에 저장하는 방법

[TIP] https://www.learningtypescript.com/unions-and-literals 에서 배운 내용 연습
