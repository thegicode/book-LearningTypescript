# Chapter 10 제네릭 generic

-   코드에서 호출하는 방식에 따라 다양한 타입으로 작동하도록 의도할 수 있다.
-   [identity.js](./chap10/identity.js)

    ```
    function identity(input) {
        return input;
    }

    identity("abc");
    identity(123);
    identity({ quote: "I think ~" });

    ```

    -   identity 함수는 모든 가능한 타입으로 input을 받고, 동일한 input을 출력으로 반환한다.
    -   input이 모든 입력을 허용한다면, input 타입과 함수 반환 타입 간의 관계를 말할 수 있는 방법이 필요하다.

-   타입스크립트는 제네릭을 사용해 타입 간의 관례를 알아낸다.
-   타입스크립트에서 함수와 같은 구조체는 제네릭 타입 매개변수를 원하는 수만큼 선언할 수 있다.
-   타입 매개변수는 구조체의 각 인스턴스에 대해 타입 인수라고 하는 서로 다른 타입을 제공할 수 있지만, 타입 인수가 제공된 인스턴스 내에서는 일관성을 유지한다.
-   타입 매개변수는 전형적으로 T와 U같은 단일 문자 이름 또는 Key와 Value 같은 파스칼 케이스 이름을 갖는다.
    -   이 장에서 다루는 모든 구조체에서는 <, >를 사용해 someFunction\<T> 또는 someInterface\<T>처럼 제네릭을 선언한다.

<br>

---

<br>

## 10.1 제네릭 함수

-   매개변수 괄호 바로 앞 홑화살괄호(<, >)로 묶어 타입 매개변수에 별칭을 배치해 함수를 제네릭으로 만든다.
-   [identityGeneric.ts](./chap10/identityGeneric.ts)

    -   identityGeneric 함수는 input 매개변수에 대한 타입 매개변수 T를 선언하다.
    -   이를 통해 타입스크립트는 함수의 반환 타입이 T임을 유추한다.

    ```
    function identityGeneric<T>(input: T) {
        return input;

    }

    const numeric = identityGeneric("me"); // type: "me"
    const stringy = identityGeneric(123); // type: 123

    ```

-   화살표 함수

    ```
    const identityArrow = <T>(input: T) => input;

    identityArrow(123); // type: 123
    ```

-   [Warning] 제네릭 함수 구문은 .tsx 파일에서 JSX 구문과 충돌하므로 일부 제한이 있다. JSX 및 리액트 지원 구성과 해결 방법은 13장 '구성 옵션'

<br>

### 10.1.1 명시적 제네릭 호출 타입

-   클래스 멤버와 변수 타입과 마찬가지로 때로는 타입 인수를 해석하기 위해 타입스크립트에 알려줘야 하는 호출 정보가 충분하지 않을 수도 있다.
-   이러한 현상은 타입 인수를 알 수 없는 제네릭 구문이 다른 제네릭 구문에 제공된 경우 주로 발생
-   [logWrapper.ts](./chap10/logWrapper.ts)

    ```
    function logWrapper<Input>(callback: (input: Input) => void) {
        return (input: Input) => {
            console.log("Input: ", input);
            callback(input);
        };
    }

    // type: (input: string) => void
    logWrapper((input: string) => {
        console.log(input.length);
    });

    // type: (input: unknown) => void
    logWrapper((input) => {
        console.log(input.length);
        // Error: Property 'length' does not exist on type 'unknown'.
    });

    ```

    -   logWrapper 함수는 매개변수 타입이 logWrapper의 타입 매개변수 Input으로 설정된 callback을 받는다.
    -   <매개변수 타입이 명시적으로 선언된 callback과 logWrapper가 함께 호출되는 경우 타입스크립트는 타입 인수를 유추할 수 있다.

-   <ins>기본값이 unknown으로 설정되는 것을 피하기 위해 타입스크립트에 해당 타입 인수가 무엇인지 명시적으로 알려주는 **명시적 제네릭 타입 인수**를 사용해 함수를 호출할 수 있다.</ins>

    ```
    // type: (input: string) => void
    logWrapper<string>((input) => {
        console.log(input.length);
    });

    logWrapper<string>((input: boolean) => {
        // Error : Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
        //   Types of parameters 'input' and 'input' are incompatible.
        //   Type 'string' is not assignable to type 'boolean'.
    });

    ```

-   명시적 타입 인수는 제네릭 함수에 지정할 수 있지만 때로는 필요하지 않다. 필요할 때만 명시적 타입 인수를 지정한다.
    ```
    logWrapper<string>((input: string) => {
        //
    });
    ```
    -   타입 인수와 함수 매개변수 타입을 모두 string으로 명시적으로 지정. 둘 중 하나는 제거할 수 있다.

<br>

### 10.1.2 다중 함수 타입 매개변수

-   임의의 수의 타입 매개변수를 쉼표로 구분해 함수를 정의

    -   [makeTuple.ts](./chap10/makeTutple.ts)

        ```
        function makeTuple<First, Second>(first: First, second: Second) {
            return [first, second] as const;
        }

        let tuple = makeTuple(true, "abc");
        // value: readonly [boolean, string] 타입

        ```

        -   두 개의 타입 매개변수를 선언하고, 입력된 값을 읽기 전용 튜플로 반환

-   함수가 여러 개의 매개변수를 선언하면 해당 함수에 대한 호출은 명시적으로 제네릭 타입을 모두 선언하지 않거나 모두 선언해야 한다.

    -   타입스크립트는 아직 제네릭 호출 중 일부 타임만을 유추하지 못한다.
    -   [makePair.ts](./chap10/makePair.ts)

    ```
    function makePair<Key, Value>(key: Key, value: Value) {
        return { key, value };
    }

    // Ok: 타입 인수가 둘 다 제공되지 않음
    makePair("abc", 123);
    // type: {key: string, value: number}

    // Ok: 두 개의 타입 인수가 제공됨
    makePair<string, number>("abc", 123);
    // type: {key: string, value: number}

    makePair<string>("abc", 123);
    // Error: Expected 2 type arguments, but got 1.

    ```

    -   두 개의 타입 매개변수를 받으르모 두 개를 모두 명시적으로 지정하거나 지정하지 않아야 한다.

-   [TIP] 제네릭 구조체에서 두 개보다 많은 타입 매개변수를 사용하지 말라. 런타임 함수 매개변수처럼 많이 사용할수록 코드를 읽고 이해하는 것이 점점 어려워진다.

<br>

---

<br>

## 10.2 제네릭 인터페이스

-   인터페이스는 함수와 유사한 제네릭 규칙을 따르며 인터페이스 이름 뒤 \< 과 \> 사이에 선언된 임의의 수의 타입 매개변수를 갖는다.
-   해당 제네릭 타입은 나중에 멤버 타입과 같이 선언의 다른 곳에서 사용할 수 있다.

    -   [box.ts](./chap10/box.ts)

    -   속성에 대한 매개변수 T 타입 매개변수가 있다.
    -   타입 인수로 Box로 선언된 객체를 생성하면 inside의 T 속성이 해당 타입 인수와 일치된다.

        ```
        interface Box<T> {
            inside: T;
        }

        let stringBox: Box<string> = {
            inside: "abc",
        };

        let numberBox: Box<number> = {
            inside: 123,
        };

        let incorrectBox: Box<number> = {
            inside: false,
            // Error: Type 'boolean' is not assignable to type 'number'.
        };
        ```

-   타입스크립트에서 내장 Array 메서드는 제네릭 인터페이스로 정의된다.

    -   [array.ts](./chap10/array.ts)
    -   <ins>Array는 타입 매개변수 T를 사용해서 배열 안에 저장된 데이터의 타입을 나타낸다.</ins>

        ```
        interface Array<T> {
            /**
            * 배열에서 마지막 요소를 제거하고 그 요소를 반환
            * 배열이 비어 있는 경우 undefined를 반환하고 배열은 수정되지 않음
            */
            pop(): T | undefined;

            /**
            * 배열의 끝에 새로운 요소를 추가하고 배열의 길이를 반환
            * @param items 배열에 추가된 새로운 요소
            */
            push(...items: T[]): number;
        }

        ```

<br>

### 10.2.1 유추된 제네릭 인터페이스 타입

-   타입스크립트는 제네릭 타입을 취하는 것으로 선언된 위치에 제공된 값의 타입에서 타입 인수를 유추한다.

    -   [getLast.ts](./chap10/getLast.ts)

    ```
    interface LinkedNode<Value> {
        next?: LinkedNode<Value>;
        value: Value;
    }

    function getLast<Value>(node: LinkedNode<Value>): Value {
        return node.next ? getLast(node.next) : node.value;
    }

    // 유추된 Value 타입 인수: Date
    let lastDate = getLast({
        value: new Date("09-13-1993"),
    });
    console.log("lastDate: ", lastDate);
    // Log : lastDate: 1993-09-12T15:00:00.000Z

    // 유추된 Value 타입 인수: string
    let lastFruit = getLast({
        next: {
            value: "banana",
        },
        value: "apple",
    });
    console.log("lastFruit: ", lastFruit);
    // Log: lastFruit: banana

    // 유추된 Value 타입 인수: number
    let lastMismatch = getLast({
        next: {
            value: 123,
        },
        value: false,
        // Error: Type 'boolean' is not assignable to type 'number'.
    });
    console.log("lastMismatch: ", lastMismatch);
    // Log: lastMismatch: 123

    ```

    -   타입 매개변수 Value를 선언한 다음 Value를 node 매개변수로 사용한다.
    -   타입스크립트는 인수로 전달된 값의 타입에 따라 Value를 유추한다.

-   인터페이스가 타입 매개변수를 선언하는 경우, 해당 인터페이스를 참조하는 모든 타입 에너테이션은 이에 상응하는 타입 인수를 제공해야 한다.

    -   [createLike.ts](./chap10/createLike.ts)

    ```
    interface CreateLike<T> {
        contents: T;
    }

    let missingGeneric: CreateLike = {
        // Error: Generic type 'CreateLike<T>' requires 1 type argument(s).
        inside: "??",
    };
    ```

<br>

---

<br>

## 10.3 제네릭 클래스

-   인터페이스처럼 클래스도 나중에 멤버에서 사용할 임의의 타입 매개변수를 선언할 수 있다.
-   클래스의 각 인스턴스는 타입 매개변수로 각자 다른 타입 인수 집합을 가진다.

    -   [secret.ts](./chap10/secret.ts)

    ```
    class Secret<Key, Value> {
        key: Key;
        value: Value;

        constructor(key: Key, value: Value) {
            this.key = key;
            this.value = value;
        }

        getValue(key: Key): Value | undefined {
            return this.key === key ? this.value : undefined;
        }
    }

    const storage = new Secret(12345, "luggage"); // type: Secet<number, string>

    storage.getValue(1987); // type: string | undefined
    // undefined

    ```

-   제네릭 인터페이스와 마찬가지로 클래스를 사용하는 타입 애너테이션은 해당 클래스의 제네릭 타입이 무엇인지를 타입스크립트에 나타내야 한다.

<br>

### 10.3.1 명시적 제네릭 클래스 타입

-   <ins>생성자에서 전달된 인수에서 클래스 타입 인수를 유추할 수 없는 경우에는 타입 인수의 기본값은 unknown이 된다.</ins>

    -   [curriedCallback.ts](./chap10/curriedCallback.ts)

    ```
    class CurriedCallback<Input> {
        #callback: (input: Input) => void;
        // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
        // 설정을 바꿔봤으나 해결이 안된다.

        constructor(callback: (input: Input) => void) {
            this.#callback = (input: Input) => {
                console.log("Input", input);
                callback(input);
            };
        }
    }

    new CurriedCallback((input: string) => {
        console.log(input.length);
    });

    new CurriedCallback((input) => {
        console.log(input.length);
        // Error: Property 'length' does not exist on type 'unknown'.
    });

    ```

-   <ins>클래스 인스턴스는 다른 제네릭 함수 호출과 동일한 방식으로 명시적 타입 인수를 제공해서 기본값 unknown이 되는 것을 피할 수 있다.</ins>

    -   [curriedCallback2.ts](./chap10/curriedCallback2.ts)

    ```
    new CurriedCallback<string>((input) => {
        console.log(input.length);
    });

    new CurriedCallback<string>((input: boolean) => {});
    // Error: Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
    //   Types of parameters 'input' and 'input' are incompatible.
    //   Type 'string' is not assignable to type 'boolean'.

    ```

    -   CurriedCallback의 Input 타입 인수를 string으로 명시적으로 제공하므로 타입스크립트는 해당 콜백의 Input 타입 매개변수가 string으로 해석됨을 유추할 수 있다.

<br>

### 10.3.2 제네릭 클래스 확장

-   제네릭 클래스는 extends 키워드 다음에 오는 기본 클래스로 사용할 수 있다.
-   기본값이 없는 모든 타입 인수는 명시적 타입 애너테이션을 사용해 지정해야 한다.

    -   [quote.ts](./chap10/quote.ts)

    ```
    class Quote<T> {
        lines: T;

        constructor(lines: T) {
            this.lines = lines;
        }
    }

    class SpokenQuote extends Quote<string[]> {
        speak() {
            console.log(this.lines.join("\n"));
        }
    }

    const a = new Quote("The only real faiure is the failure to try.").lines; // type: string
    console.log(a);
    // Log: The only real faiure is the failure to try.

    const b = new Quote([4, 8, 15, 16, 25, 42]).lines; // type: number[]
    console.log(b);
    // Log: [ 4, 8, 15, 16, 25, 42 ]

    const c = new SpokenQuote(["Good is so descructive", "It destroys everything"])
        .lines;
    console.log(c);
    // Log: [ 'Good is so descructive', 'It destroys everything' ]

    const d = new SpokenQuote([4, 8, 15, 16, 25, 42]);
    // Error: Type 'number' is not assignable to type 'string'.
    console.log(d);
    // Log: SpokenQuote { lines: [ 4, 8, 15, 16, 25, 42 ] }

    ```

    -   SpokenQuote 클래스는 기본 클래스 Quote\<T>에 대한 T 타입 인수로 string을 제공한다

-   <ins>제네릭 파생 클래스는 자체 타입 인수를 기본 클래스에 번갈아 전달할 수 있다.</ins>

    -   [attributeQuote.ts](./chap10/attributeQuote.ts)

    ```
    class AttributeQuote<Value> extends Quote<Value> {
        speaker: string;

        constructor(value: Value, speaker: string) {
            super(value);
            this.speaker = speaker;
        }
    }

    // type: AttirbuteQuote<string>
    // (Quote<string> 확장하기)
    const a = new AttributeQuote(
        "The road to success is always under construction.",
        "Lily tomlin"
    );

    console.log("attributeQuote", a);
    // Log :
    // AttributeQuote {
    //   lines: 'The road to success is always under construction.',
    //   speaker: 'Lily tomlin'
    // }

    ```

    -   <ins>AttributeQuote는 다름 이름의 Value 타입 인수를 기본 클래스 Quote\<T>에 전달한다.</ins>

<br>

### 10.3.3 제네릭 인터페이스 구현

-   제네릭 클래스는 모든 필요한 매개변수를 제공함으로써 제네릭 인터페이스를 구현한다.
-   제네릭 인터페이스는 제네릭 기본 클래스를 확장하는 것과 유사하게 작동한다.
-   <ins>기본 인터페이스의 모든 타입 매개변수는 클래스에 선언되어야 한다.</ins>

    -   [actingCredit.ts](./chap10/actingCredit.ts)

    ```
    interface ActingCredit<Role> {
        role: Role;
    }

    class MoviePart implements ActingCredit<string> {
        role: string;
        speaking: boolean;

        constructor(role: string, speaking: boolean) {
            this.role = role;
            this.speaking = speaking;
        }
    }

    const part = new MoviePart("Miranda Priestly", true);

    const a = part.role; // type: string
    console.log(a); // Log:  Miranda Priestly

    class IncorrectExtension implements ActingCredit<string> {
        role: boolean;
        // Error: Property 'role' in type 'IncorrectExtension' is not assignable to the same property in base type 'ActingCredit<string>'.
        //   Type 'boolean' is not assignable to type 'string'.
    }

    ```

<br>

### 10.3.4 메서드 제네릭

-   <ins>제네릭 클래스 메서드에 대한 각각의 호출은 각 타입 매개변수에 대해 다른 타입 인수를 갖는다.</ins>

    -   [createPairFactory.ts](./chap10/createPairFactory.ts)

    ```
    class CreatePairFacotory<Key> {
        key: Key;

        constructor(key: Key) {
            this.key = key;
        }

        createPair<Value>(value: Value) {
            return {
                key: this.key,
                value,
            };
        }
    }

    const facotry = new CreatePairFacotory("role");
    // type: CreatePairFacotory<stirng>
    console.log("facotry: ", facotry);
    // Log: CreatePairFacotory { key: 'role' }

    const numberPair = facotry.createPair(10);
    // type: { key: string, value: number}
    console.log("numberPair: ", numberPair);
    // Log: { key: 'role', value: 10 }

    const stringPair = facotry.createPair("Sophine");
    // type: { key: string, value: string }
    console.log("stringPair: ", stringPair);
    // Log: { key: 'role', value: 'Sophine' }
    ```

    -   CreatePairFacotory 클래스는 Key 타입을 선언하고 별도의 Value 제네릭 타입을 선언하는 creatPair 메서드를 포함한다.
    -   createPair 반환 타입은 { key: Key, value: Value}로 유추된다.

<br>

### 10.3.5 정적 클래스 제네릭

-   클래스의 정적 static 멤버는 인스턴스 멤버와 구별되고 클래스의 특정 인스턴스와 연결되어 있지 않다.
-   <ins>정적 클래스 메서드는 자체 타입 매개변수를 선언할 수 있지만 클래스에 선언된 어떤 타입 매개변수에도 접근할 수 없다.</ins>

    -   [bothLogger.ts](./chap10/bothLogger.ts)

    ```
    class BothLogger<OnInstance> {
        instanceLog(value: OnInstance) {
            console.log(value);
            return value;
        }

        static staticLog<OnStatic>(value: OnStatic) {
            let fromInstance: OnInstance;
            // Error: Static members cannot reference class type parameters.

            console.log(value);
            return value;
        }
    }

    const logger = new BothLogger<number[]>();
    logger.instanceLog([1, 2, 3]); // type: number[]
    // Log: [ 1, 2, 3 ]

    // 유추된 OnStatic 타입 인수 : boolean[]
    BothLogger.staticLog([false, true]);
    // Log: [ false, true ]

    // 유추된 OnStatic 타입 인수 : string
    BothLogger.staticLog<string>("You can't change the music of your soul.");
    // Log: You can't change the music of your soul.

    ```

    -   클래스 인스턴스에 대해 OnInstance가 선언되었으므로 static 메서드는 OnInstance 인스턴스에 접근할 수 없다.

<br>

---

<br>

## 10.4 제네릭 타입 별칭

-   <ins>각 타입 별칭에는 T를 받는 Nullish 타입과 같은 임의의 수의 타입 매개변수가 주어진다.</ins>
    ```
    type Nullish<T> = T | null | undefined;
    ```
-   <ins>제네릭 타입 별칭은 일반적으로 제네릭 함수의 타입을 설명하는 함수와 함께 사용된다.</ins>

    -   [createsValue.ts](./chap10/createsValue.ts)

    ```
    type CreatesValue<Input, Output> = (input: Input) => Output;

    // type: (input: string) => number
    let creater: CreatesValue<string, number>;

    creater = (text) => text.length; // Ok

    creater = (text) => text.toUpperCase();
    // Error: Type 'string' is not assignable to type 'number'.

    ```

<br>

### 10.4.1 제네릭 판별된 유니언

-   4장 '객체'에서 언급한 판별된 유니언은 우아한 자바스크립트 패텬과 타입스크립트의 내로잉을 아름답게 결합하므로 타입스크립트에서 필자가 가장 좋아하는 기능
-   <ins>판별 유니언 사용법 중 필자가 가장 좋아하는 용도는 데이터의 성공적인 결과 또는 오류로 인한 실패를 나타내는 제네릭 '결과' 타입을 만들기 위해 타입 인수를 추가하는 것</ins>

    -   [result.ts](./chap10/result.ts)

    ```
    type Result<Data> = FailureResult | SuccessfullResult<Data>;

    interface FailureResult {
        error: Error;
        successed: false;
    }

    interface SuccessfullResult<Data> {
        data: Data;
        successed: true;
    }

    function handleResult(result: Result<string>) {
        if (result.successed) {
            // result: SuccessfullResult<string>의 타입
            console.log(`We did it! ${result.data}`);
        } else {
            // result: FailureResult의 타입
            console.error(`Awww... ${result.error}`);
            // Error: Property 'error' does not exist on type 'Result<string>'.
            //   Property 'error' does not exist on type 'SuccessfullResult<string>'.
            // 책에서는 이 에러에 대한 언급이 없음.
        }

        result.data;
        // Error:  Property 'data' does not exist on type 'Result<string>'.
        //   Property 'data' does not exist on type 'FailureResult'.
    }

    ```

    -   Result을 반환하는 모든 작업은 오류 또는 데이터 결과를 나타내며 이를 사용하는 곳에서는 result의 succeeded가 true인지 여부를 확인해야 한다.
    -   제네릭 타입과 판별된 타입을 함께 사용하면 Result와 같은 재사용 가능한 타입을 모델링하는 훌륭한 방법을 제공할 수 있다.

<br>

---

<br>

## 10.5 제네릭 제한자

-   타입스크립트는 제네릭 타입 매개변수의 동작을 수정하는 구문도 제공한다.

<br>

### 10.5.1 제네릭 기본값

-   <ins>타입 매개변수 선언 뒤에 =와 기본 타입을 배치해 타입 인수를 명시적으로 제공할 수 있다.</ins>
-   기본값은 타입 인수가 명시적으로 선언되지 않고 유추할 수 없는 모든 후속 타입에 사용될 수 있다.

    -   [quoteTypes.ts](./chap10/quoteType.ts)

    ```
    interface Quote<T = string> {
        value: T;
    }

    let expicit: Quote<number> = { value: 123 };

    let implicit: Quote = { value: "Be your slef" };

    let mismatch: Quote = { value: 123 };
    // Error: Type 'number' is not assignable to type 'string'.
    ```

-   타입 매개변수는 동일한 선언 안의 앞선 타입 매개변수를 기본값으로 가질 수 있다.
-   각 타입 매개변수는 선언에 대한 새로운 타입을 도입하므로 해당 선언 이후의 타입 매개변수에 대한 기본값으로 이를 사용할 수 있다.

    -   [keyValuePair.ts](./chap10/keyValuePair.ts)

    ```
    interface KeyValuePair<Key, Value = Key> {
       key: Key;
       value: Value;
    }

    // type: KeyValuePair<string, number>
    let allExpicit: KeyValuePair<string, number> = {
       key: "rating",
       value: 10,
    };

    // type: KeyValuePair<string>
    let OneDEfaulting: KeyValuePair<string> = {
       key: "rating",
       value: "ten",
    };

    let firstMissing: KeyValuePair = {
       // Error: Generic type 'KeyValuePair<Key, Value>' requires between 1 and 2 type arguments.
       key: "rating",
       value: 10,
    };

    ```

-   <ins>모든 기본 타입 매개변수는 기본 함수 매개변수처럼 선언 목록의 제일 마지막에 와야 한다.</ins>
-   기본값이 없는 제네릭 타입은 기본값이 있는 제네릭 타입 뒤에 오면 안된다.

    -   [inTheEnd.ts](./chap10/inTheEnd.ts)

    ```
    function inTheEnd<First, Second, Third = number, Foruth = string>() {} // Ok

    function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {}
    // Error: Required type parameters may not follow optional type parameters.

    ```

<br>

---

<br>

## 10.6 제한된 제네릭 타입

-   <ins>타입 매개변수를 제한하는 구문은 매개변수 이름 뒤에 extends 키워드를 배치하고 그 뒤에 이를 제한할 타입을 배치한다.</ins>

    -   [withLength.ts](./chap10/withLength.ts)

    ```
    interface WithLength {
        length: number;
    }

    function logWithLength<T extends WithLength>(input: T) {
        console.log(`Length: ${input.length}`);
        return input;
    }

    logWithLength("No one can figure out your worth but you."); // type: string
    logWithLength([false, true]); // type: boolean[]
    logWithLength({ length: 123 }); // type: { length: number }

    logWithLength(new Date());
    // Error: Argument of type 'Date' is not assignable to parameter of type 'WithLength'.
    //   Property 'length' is missing in type 'Date' but required in type 'WithLength'.

    ```

    -   length: number를 가진 모든 것을 설명하기 위해 WithLength 인터페이스를 생성하면 제네릭 함수가 T 제네릭에 대한 length를 가진 모든 타입을 받아들이도록 구현할 수 있다.

<br>

### 10.6.1 kyeof와 제한된 타입 매개변수

-   9장 '타입 제한자'에서 소개한 keyof 연산자는 제한된 타입 매개변수와도 잘 작동한다.
-   <ins>extends와 keyof를 함께 사용하면 타입 매개변수를 이전 타입 매개변수의 키로 제한할 수 있다.</ins>
-   또한 제네릭 타입의 키를 지정하는 유일한 방법이기도 하다.

    -   [get.ts](./chap10/get.ts)

    ```
    function get<T, Key extends keyof T>(container: T, key: Key) {
        return container[key];
    }

    const roles = {
        favorite: "fargo",
        others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
    };

    const favorite = get(roles, "favorite"); // type: string
    const others = get(roles, "others"); // type: string[]

    const missing = get(roles, "extras");
    // Error: Argument of type '"extras"' is not assignable to parameter of type '"favorite" | "others"'.
    ```

    -   인기있는 Loadash의 get 메서드의 간단한 버전이다.
    -   Key 타입 매개변수는 keyof T로 제한되기 때문에 타입스크립트는 이 함수가 T\[Key]를 반환
    -   keyof가 없었다면 제네릭 key 매개변수를 올바르게 입력할 방법이 없었을 것이다.

-   타입 매개변수로 T만 제공되고 key 매개변수가 모든 keyof T일 수 있는 경우라면 Container에 있는 모든 속성값에 대한 유니언 타입이 된다.

    -   [get2.ts](./chap10/get2.ts)

    ```
    function get<T>(container: T, key: keyof T) {
        return container[key];
    }

    const roles = {
        favorite: "fargo",
        others: ["Alomist Famous", "Burn after Reading", "Nomadland"],
    };

    const found = get(roles, "favorite"); // type: string | string[]
    ```

-   제네릭 함수를 작성할 때 매개변수의 타입이 이전 매개변수 타입에 따라 달라지는 경우를 알아야 한다. 이러한 경우 올바른 매개변수 타입을 위해 제한된 타입 매개변수를 자주 사용하게 된다.

<br>

---

<br>

## 10.7 Promise

-   각 Promise는 대기 중인 작업이 'resolve' 또는 'reject'하는 경우 콜백을 등록하기 위한 메서드를 제공한다.
-   임의의 값 타입에 대해 유사한 작업을 나타내는 Promise의 기능은 타입스크립트의 제네릭과 자연스럽게 융합된다.
-   Promise는 타입스크립트 타입 시스템에서 최종적으로 resolve된 값을 나타내는 단일 타입 매개변수를 가진 Promise 클래스로 표현된다.

<br>

### 10.7.1 Promise 생성

-   타입스크립트에서 Promise 생성자는 단일 매개변수를 받도록 작성된다.
-   해당 매개변수의 타입은 제네릭 Promise 클래스에 선언된 매개변수에 의존한다.
-   <ins>축소된 형식은 다음과 같다.</ins>

    -   [promiseLike.ts](./chap10/promiseLike.ts)

    ```
    class PromiseLike<Value> {
        constructor(
            executor: (
                resolve: (value: Value) => void,
                reject: (reason: unknown) => void
            ) => void
        ) {
            //
        }
    }
    ```

-   결과적으로 값을 resolve하려는 Promise를 만들려면 Promise의 타입 인수를 명시적으로 선언해야 한다.
-   Promise 생성자에 타입 인수를 명시적으로 제공하면 타입스크립트가 결과로서 생기는 Promise 인스턴스의 resolve된 타입을 이해할 수 있다.

    -   <ins>[resolve.ts](./chap10/resolve.ts)</ins>

    ```
    // type: Promise<unknown>
    const resolveUnknown = new Promise((resolve) => {
        setTimeout(() => resolve("Done!"), 1000);
    });

    // type: Promise<string>
    const resolveString = new Promise<string>((resolve) => {
        setTimeout(() => resolve("Done!"), 1000);
    });
    ```

-   <ins>Promise의 제네릭 .then 메서드는 반환되는 Promise의 resolve된 값을 나타내는 새로운 타입 매개변수를 받는다.</ins>

    -   [then.ts](./chap10/then.ts)

    ```
    // type: Promise<string>
    const textEventually = new Promise<string>((resolve) => {
        setTimeout(() => resolve("Done!"), 1000);
    });

    // type: Promise<number>
    const lengthEvnetually = textEventually.then((text) => text.length);

    ```

<br>

### 10.7.2 async 함수

-   자바스크립트에서 async 키워드를 사용해 선언한 모든 함수는 Promise를 반환한다.
-   자바스크립트에서 async 함수에 따라서 반환된 값이 Thenable(.then() 메서드가 있는 객체, 실제로는 거의 항상 Promise)이 아닌 경우, Promise.resolve가 호출된 것처럼 Promise로 wrapping된다.

    -   [lefthAfterSecond.ts](./chap10/lefthAfterSecond.ts)

    ```
    // type: (text: string) => Promise<number>
    async function lengthAfterSecond(text: string) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return text.length;
    }

    // type: (text: string) => Promise<number>
    async function lengthImmediately(text: string) {
        return text.length;
    }
    ```

    -   lengthAfterSecond는 Promise\<number>를 직접적으로 반환하는 반면,
    -   lengthImmediately는 async 함수이고, 직접 number를 반환하기 때문에 Promise\<number>를 반환하는 것으로 간주된다.

-   그러므로 Promise를 명시적으로 언급하지 않더라도 async 함수에서 수동으로 선언된 반환 타입은 항상 Promise 타입이 된다.

    -   [givesPromiseForString.ts](./chap10/givesPromiseForString.ts)

    ```
    async function givesPromiseForString(): Promise<string> {
        return "Done!";
    }

    async function giveString(): string {
        // Error: Type 'string' is not a valid async function return type in ES5/ES3 because it does not refer to a Promise-compatible constructor value.
        return "Done!";
    }
    ```

<br>

---

<br>

## 10.8 제네릭 올바르게 사용하기

-   타입스크립트의 모범 사례는 필요할 때만 제네릭을 사용하고, 제네릭을 사용할 때는 무엇을 위해 사용하는지 명확히 해야 한다.

<br>

### 10.8.1 제네릭 황금률

-   함수에 타입 매개변수가 필요한지 여부를 판단할 수 있는 간단하고 빠른 방법은 타입 매개변수가 최소 두 번 이상 사용되었는지 확인하는 것이다.
    -   [logInput.ts](./chap10/logInput.ts)
    ```
    function logInput<Input extends string>(input: Input) {
        console.log("Hi!", input);
    }
    ```
    -   Input 타입 매개변수를 정확히 한 번 사용한다.
    -   logInput은 타입 매개변수로 더 많은 매개변수를 반환하거나 선언하는 작업을 하지 않는다.
    -   따라서 Input 타입 매개변수를 선언하는 것은 별로 쓸모가 없다.
-   다음과 같이 다시 작성
    ```
    function logInput2(input: string) {
        console.log("Hi!", input);
    }
    ```
-   댄 밴더캄의 "이펙티브 타입스크립트"(인사이트, 2021)는 '제네릭 황금률'을 설명하며 제네릭으로 작업할 때 유용하고 훌륭한 팁도 소개한다.

<br>

### 10.8.2 제네릭 명명 규칙

-   타입스크립트를 포함한 많은 언어가 지키는 타임 매개변수에 대한 표준 명명 규칙 namning convention은
    기본적으로 첫 번재 타입 인수로 T를 사용하고,
    후속 타입 매개변수가 존재하면 U, V 등을 사용하는 것이다.
-   타입 인수가 어떻게 사용되어야 하는지 맥락과 관련된 정보가 알려진 경우 명명 규칙은 경우에 따라 해당 용어의 첫 글자를 사용하는 것으로 확장된다.
    -   상태 관리 라이브러리에서는 제네릭 상태를 S
    -   데이터 구조의 키와 값은 K와 V
-   하지만 하나의 문자를 사용하는 타입 인수명은 하나의 문자로 함수나 변수의 이름을 사용하는 것만큼 혼란스러울 수 있다.
    ```
    // L과 V는 과연 무엇?
    function labelBox<L, V>(l: L, v:V) {}
    ```
-   제네릭의 의도가 단ㄴ일 문자 T에서 명확하지 않은 경우에는 사용되는 용도를 가리키는 설명적인 제네릭 타입 이름을 사용하는 것이 가장 좋다.
    ```
    function labelBox<Label, Value>(label: Label, value: Value) {}
    ```

<br>

---

<br>

## 10.9 마치며

    - 구조체 간에 다른 타입을 나타내기 위한 타입 매개변수 사용법
    - 제네릭 함수를 호출할 때 명시적 또는 암시적 인수 제공하기
    - 제네릭 객체 타입을 표현하느는 제네릭 인터페이스
    - 클래스에서 타입 매개변수를 추가하고 클래스의 타입에 미치는 영향 확인하기
    - 타입 별칭, 특히 판별된 타입 유니언에 타입 매개변수 추가하기
    - 기본값(=)과 제한자(extends)를 사용한 제네릭 타입 매개변수 수정하기
    - Promise와 async 함수가 제네릭을 사용해 비동기 데이터 흐름을 나타내는 방법
    - 제네릭 황금률과 명명 규칙을 포함한 제네릭 모범 사례

[TIP] https://www.learningtypescript.com/generics 에서 배운 내용 연습

<br>

---

<br>
