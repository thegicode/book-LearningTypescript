# Chapter 6 배열

-   타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한한다.

## 6.1 배열 타입

-   다른 변수 선언과 마찬가지로 초깃값이 필요하지 않다. 변수는 undefiend로 시작해서 나중에 배열 값을 받을 수 있다.
-   타입스크립트는 변수에 타입 애너테이션을 제공해 배열이 포함해야 하는 값의 타입을 알려주려고 한다. 배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 []가 와야 한다.

    ```
    let arrayOfNumbers: number[];

    arrayOfNumbers = [4, 8, 26, 16, 23, 42];
    ```

-   [NOTE] 배열 타입은 Array\<number> 같은 구문으로도 작성할 수 있다. 하지만 개발자 대부분은 더 간단한 number[]를 선호한다.

<br>

---

<br>

### 6.1.1 배열과 함수 타입

-   배열 타입은 함수 타입에 무엇이 있는지를 구분하는 괄호가 필요한 구문 컨테이너의 예
-   괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지를 나타내기 위해 사용

    ```
    // 타입은 string 배열을 반환하는 함수
    let cresteStrings: () => string[];

    // 타입은 각각의 string을 반환하는 함수 배열
    let stringCreatros: (() => string)[]
    ```

<br>

### 6.1.2 유니언 타입 배열

-   배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내려면 유니언 타입을 사용한다.

    ```
        // 타입은 string 또는 number 배열
        let stringOrArrayOfNumbers : string | number[];

        // 타입은 각각 number 또는 string인 요소의 배열
        let arrayOfStringOrNumbers : (string | number)[];
    ```

-   배열의 요소 타입은 배열에 담긴 요소에 대한 모든 가능한 타입의 집합이다.
    ```
    // 타입: (string | undefined)[]
    const nameMaybe = [
        "Aqultune",
        "Blenda",
        undefined
    ];
    ```

<br>

### 6.1.3 any 배열의 진화

-   초기에 빈 배열로 설정된 변수에서 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 any[]로 취급하고 모든 콘텐츠를 받을 수 있다.
-   any[] 배열이 밴경되는 것을 좋아하지 않는다.

    -   타입 애너테이션이 없는 빈 배열은 잠재적으로 잘못된 값 추가를 허용해 타입스크립트이 타입 검사기의 타입 검사 목적을 부분적으로 무력화한다.

    ```
    // 타입: any[]
    let values = [];

    // 타입: string[]
    values.push(');

    // 타입: (number | string)[]
    values[0] = 0
    ```

<br>

### 6.1.4 다차원 배열

-   2차원 배열 또는 배열의 배열은 두 개의 []/(대괄호)를 갖는다.

    ```
    let arrayOfArrayOfNumbers: number[][];

    // (number[])[]로 나타낼 수도 있다.
    // let arrayOfArrayOfNumbers: (number[])[];


    arrayOfArrayOfNumbers = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    ```

<br>

---

<br>

## 6.2 배열 멤버

-   타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어이다.

    ```
    const defenders = ["Clarenza", "Dina"];

    // 타입: string
    const defender = defenders[0];
    ```

-   유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니언 타입이다.

    ```
    const soldiersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)];

    // 타입: string | Date
    const soldiersOrDate = soldiersOrDates[0];
    ```

<br>

### 6.2.1 주의 사항 : 불안정한 멤버

-   타입스크립트 타입 시스템은 기술적으로 불안정하다고 알려져 있다.
-   특히, 배열은 타입 시스템에서 불안정한 소스이다.
-   기본적으로 타입스크립트는 모든 배열의 멤버에 대한 접근이 해당 배열의 멤버를 반환한다고 가정하지만, 자바스크립트에서조차도 배열의 길이보다 큰 인덱스로 배열 요소에 접근하면 undefined를 제공한다.

    -   [withElements.ts](./chap6/withElements.ts)

    ```
    function withElements(elements: string[]) {
        console.log(elements[9001].length); // 타입 오류 없음
    }

    withElements(["It's", "over"]);
    ```

    -   타입스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않는다.
    -   elements[9001]은 undefeind가 아니라 string 타입으로 간주된다.

-   [NOTE] 타입스크립트에는 배열 조회를 더 제한하고 타입을 안전하게 만드는 noUncheckedIndexedAccess 플래그가 있지만 이 플래그는 매우 엄격해서 대부분의 프로젝트에서 사용하지 않는다.
    <br>

---

<br>

## 6.3 스프레드와 나머지 매개변수

-   ...연산자를 사용하는 나머지 매개변수와 배열 스프레드 spread는 자바스크립트에서 배열과 상호작용하는 핵심방법이다.

<br>

### 6.3.1 스프레드

-   서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해된다.

    ```
    // 타입: string[]
    const soldiers = ["Harriet Tuban", "Joan of Arc", "Khutulun"];

    // 타입: number[]
    const soliierAges = [99, 19, 45];

    // 타입: (string | number)[]
    const conjoined = [...soldiers, ...soliierAges];
    ```

<br>

### 6.3.2 나머지 매개변수 스프레드

-   나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 한다.

    -   [logWarriors.ts](./chap6/logWarriors.ts)

    ```
    function logWarriors(greeting: string, ...names: string[]) {
        for (const name of names) {
            console.log(`${greeting}, ${name}`);
        }
    }

    const warriors = ["Cathay Williams", "Lozen", "Nzinga"];

    logWarriors("Hello", ...warriors);

    const birthYears = [1844, 1840, 1583];

    logWarriors("Born in", birthYears);
    // Error : Argument of type 'number[]' is not assignable to parameter of type 'string'.
    ```

    -   logWarriors 함수는 ...names 나머지 매개변수로 string 값만 받는다.

<br>

---

<br>

## 6.4 튜플 tuple

-   자바스크립트는 때로 튜플 이라고 하는 고정된 크기의 배열을 사용하는 것이 유용하다.
-   튜플 배열은 각 인덱스에 알려진 특정 타입을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적이다.
-   튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 적는다.

    -   [yearAndWarrior](./chap6/yearAndWarrior.ts)

    ```
    let yearAndWarrior: [number, string];

    yearAndWarrior = [530, "Tomyris"];

    yearAndWarrior = [false, "Tomyris"];
    // Error : Type 'boolean' is not assignable to type 'number'.

    yearAndWarrior = [520];
    // Error : Type '[number]' is not assignable to type '[number, string]'
    //  Source has 1 element(s) but target requires 2.

    ```

-   자바스크립트에서는 단일 조건을 기반으로 두 개의 변수에 초깃값을 설정하는 것처럼 한 번에 여러 값을 할당하기 위해 튜플과 배열 구조 할당 array destructuring을 함께 자주 사용한다.
    ```
    // year 타입: number
    // warrior 타입: string
    let [year, warrior] = Math.random() > 0.5
        ? [340, "Archilamia"]
        : [1828, "Rani of Jhansi"]
    ```

<br>

### 6.4.1 튜플 할당 가능성

-   가변 길이의 배열 타입은 튜플 타입에 할당할 수 없다.

        -   [pairLoose.ts](./chap6/pairLoose.ts)

        ```
        // 타입: (boolean | number)[]
        const pairLoose = [false, 123];
        const pairTupleLoose: [boolean, number] = pairLoose;
        // Error : Type '(number | boolean)[]' is not assignable to type '[boolean, number]'.
        //  Target requires 2 element(s) but source may have fewer.
        ```
        -   pairLoose 내부에 [boolean, number]가 있을 있는 것을 볼 수 있지만, 타입스크립트는 더 일반적인 (boolean | number)[] 타입으로 유추한다.
        - pairLoose가 [boolean, number] 자체로 선언된 경우 pairTupleLoose에 대한 값 할당이 허용되었을 것이다.

-   타입스크립트는 튜플 타입의 튜플에 얼마나 많은 멤버가 있는지 알고 있기 때문에 길이가 서로 다른 튜플은 서로 할당할 수 없다.

    -   [tupleThree.ts](./chap6/tupleThree.ts)

    ```
    const tupleThree: [boolean, number, string] = [false, 1583, "Nzinga"];

    const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];

    const tupleTwoExtra: [boolean, number] = tupleThree;
    // Error:  Type '[boolean, number, string]' is not assignable to type '[boolean, number]'.
    //  Source has 3 element(s) but target allows only 2.
    ```

    -   tupleTwoExtra는 정확히 두 개의 멤버를 가져야 하므로 tupleThree가 올바른 멤버로 시작하더라도 세 번째 멤버는 tupleThree에 할당할 수 없다

<br>

#### 나머지 매개변수로서의 튜플

-   튜플은 구체적인 길이와 요소 타입 정보를 가지는 배열로 간주되므로 함수에 전달할 인수를 저장하는 데 특히 유용하다.

    -   [logPair.ts](./chap6/logPair.ts)

    ```
    function logPair(name: string, value: number) {
        console.log(`${name} is ${value}`);
    }

    const pairArray = ["Amage", 1];

    logPair(...pairArray);
    // Error :  A spread argument must either have a tuple type or be passed to a rest parameter.

    const pairTupleIncorrect: [number, string] = [1, "Amage"];

    logPair(...pairTupleIncorrect);
    // Error : Argument of type 'number' is not assignable to parameter of type 'string'.

    const pairTupleCorrect: [string, number] = ["Amage", 1];

    logPair(...pairTupleCorrect); // Ok

    ```

    -   (string | number)[] 타입의 값을 인수로 전달하려고 하면 둘 다 동일한 타입이거나 타입의 잘못된 순서로 인해 내용이 일치하지 않을 가능성이 있어 타입의 안전을 보장할 수 없다.

-   나머지 매개변수 튜플을 사용하고 싶다면 여러 번 함수를 호출하는 인수 목록을 배열에 저장해 함께 사용할 수 있다.

    -   [logTrio.ts](./chap6/logTrio.ts)

    ```
    function logTrio(name: string, value: [number, boolean]) {
        console.log(`${name} has ${value[0]} ${value[1]}}`);
    }

    const trios: [string, [number, boolean]][] = [
        ["Amanitore", [1, true]],
        ["Theland", [2, false]],
        ["Ann e. Durwoody", [3, false]],
    ];

    trios.forEach((trio) => logTrio(...trio)); // Ok

    trios.forEach(logTrio);
    // Error : Argument of type '(name: string, value: [number, boolean]) => void' is not assignable to parameter of type
    // '(value: [string, [number, boolean]], index: number, array: [string, [number, boolean]][]) => void'.
    //   Types of parameters 'name' and 'value' are incompatible.
    //   Type '[string, [number, boolean]]' is not assignable to type 'string'.

    ```

<br>

### 6.4.2 튜플 추론

-   타입스크립트는 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급한다. 배열이 변수의 초깃값 또는 함수에 대한 반환값으로 사용되는 경우, 고정된 크기의 튜플이 아니라 유연한 크기의 배열로 가정한다.

    -   [firstCharAndSize.ts](./chap6/firstCharAndSize.ts)

    ```
    // 반환 타입: (string | number)[]
    function firstCharAndSize(input: string) {
        return [input[0], input.length];
    }

    // firstChar 타입: string | number
    // size 타입: string | number
    const [firstChar, size] = firstCharAndSize("Gudit");

    ```

    -   firstCharAndSize 함수는 [string, number]가 아니라 (string | number)[]를 반환하는 것으로 유추된다.

-   타입스크립트에서는 값이 일반적인 배열 타입 대신 좀 더 구체적인 튜플 타입이어야 함을 나타내는 두 가지 방법
    -   명시적 투플 타입, const assertion

<br>

#### 명시적 튜플 타입

-   함수가 튜플 타입을 반환한다고 선언되고, 배열 리터럴을 반환한다면 해당 배열 리터럴은 일반적인 가변 길이의 배열 대신 튜플로 간주된다.

    -   [firstCharAndExplicit.ts](./chap6/firstCharAndExplicit.ts)

    ```
    // 반환 타입: [string, number]
    function firstCharAndExplicit(input: string): [string, number] {
        return [input[0], input.length];
    }

    // firstChar 타입: string
    // size 타입: number
    const [firstChar, size] = firstCharAndExplicit("Cathay Williams");
    ```

    -   firstCharAndExplicit 함수는 string과 number인 튜플을 반환한다고 명백하게 명시되어 있다.

<br>

#### const 어서션 assertion

-   const 어서션은 타입스크립트에 타입을 유추할 때 읽기 전용 read-only 이 가능한 값 형식을 사용하도록 지시한다.

    -   [unionArray.ts](./chap6/unionArray.ts)

    ```
    // 타입: (string | number)[]
    const unionArray = [1157, "tomoe"];

    // 타입: readonly [1157, "tomoe"]
    const readonlyTuple = [1157, "tomoe"] as const;

    ```

    -   배열 리터럴 뒤에 as const가 배치되면 배열이 튜플로 처리되어야 함을 나타낸다.

-   const 어서션은 유연한 크기의 배열을 고정된 크기의 튜플로 전환하는 것을 넘어서, 해당 튜플이 읽기 전용이고 값 수정이 예상되는 곳에서 사용할 수 없음을 나타낸다.

    -   [pairMutable](./chap6/pairMutable.ts)

    ```
    const pairMutable: [number, string] = [1157, "tomoe"];
    pairMutable[0] = 1247;

    const pairAlsoMutable: [number, string] = [1157, "tomoe"] as const;
    // Error :  The type 'readonly [1157, "tomoe"]' is 'readonly' and cannot be assigned to the mutable type '[number, string]'.

    const pairConst = [1157, "tomoe"] as const;
    pairConst[0] = 1247;
    // Error : Cannot assign to '0' because it is a read-only property.

    ```

    -   pairMutable은 전형적인 명시적 튜플 타입이므로 수정될 수 있다.
    -   as const는 값이 변경될 수 있는 pairAlsoMutable에 할당할 수 없도록 한다.
    -   상수 pairConst의 멤버는 수정을 허용하지 않는다.

-   실제로 읽기 전용 튜플은 함수 반환에 편리하다. 튜플을 반환하는 함수로서 반환된 값은 보통 즉시 구조화되지 않으므로 읽기 전용인 튜플은 함수를 사용하는 데 방해가 되지 않는다.

    -   [firstCharAndSizeAsConst.ts](./chap6/firstCharAndSizeAsConst.ts)

    ```
    // 반환 타입: readonly [string, number]
    function firstCharAndSizeAsConst(input: string) {
        return [input[0], input.length] as const;
    }

    // firstChar 타입 : string
    // size 타입 : number
    const [firstChar, size] = firstCharAndSizeAsConst("Ching Shin");
    ```

    -   firstCharAndSizeAsConst는 읽기 전용 [string, number]를 반환하지만, 이를 사용하는 코드는 해당 튜플에서 값을 찾는 것에만 관심을 둔다.

-   [NOTE] 읽기 전용 객체와 as const 어서션은 9장 '타입 제한자'에서 더 자세히

<br>

---

<br>

## 6.5 마치며

-   []로 배열 타입 선언하기
-   괄호를 사용해 함수의 배열 또는 유니언 타입의 배열 선언하기
-   타입스크립트가 배열 요소를 배열의 타입으로 이해하는 방법
-   ... 스프레드와 나머지 매개변수로 작업하는 방법
-   고정된 크기의 배열을 나타내는 튜플 타입 선언하기
-   타입 애너테이션 또는 as const 어서션으로 튜플 생성하기

[TIP] https://www.learningtypescript.com/arrays 에서 배운 내용 연습
