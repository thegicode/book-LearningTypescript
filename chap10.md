# Chapter 10 제네릭 generic

-   코드에서 호출하는 방식에 따라 다양한 타입으로 작동하도록 의도할 수 있다.
-   [identity.js](./chap10/identity.js)
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
    -   매개변수 타입이 명시적으로 선언된 callback과 logWrapper가 함께 호출되는 경우 타입스크립트는 타입 인수를 유추할 수 있다.

-   기본값이 unknown으로 설정되는 것을 피하기 위해 타입스크립트에 해당 타입 인수가 무엇인지 명시적으로 알려주는 <ins>**명시적 제네릭 타입 인수**</ins>를 사용해 함수를 호출할 수 있다.

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

-   명시적 타입 인수는 제네렉 함수에 지정할 수 있지만 때로는 필요하지 않다. 필요할 때만 명시적 타입 인수를 지정한다.
    ```
    logWrapper<string>((input: string) => {
        //
    });
    ```
    -   타입 인수와 함수 매개변수 타입을 모두 string으로 명시적으로 지정. 둘 중 하나는 제거할 수 있다.

<br>

### 10.1.2 다중 함수 타입 매개변수

<br>

---

<br>

## 10.2 제네릭 인터페이스

<br>

### 10.2.1 유추된 제네릭 인터페이스 타입

<br>

---

<br>

## 10.3 제네릭 클래스

<br>

### 10.3.1 명시적 제네릭 클래스 타입

<br>

### 10.3.2 제네릭 클래스 확장

<br>

### 10.3.3 제네릭 인터페이스 구현

<br>

### 10.3.4 메서드 제네릭

<br>

### 10.3.5 정적 클래스 제네릭

<br>

---

<br>

## 10.4 제네릭 타입 별칭

<br>

### 10.4.1 제네릭 판별된 유니언

<br>

---

<br>

## 10.5 제네릭 제한자

<br>

### 10.5.1 제네릭 기본값

<br>

---

<br>

## 10.6 제한된 제네릭 타입

<br>

### 10.6.1 kyeof와 제한된 타입 매개변수

<br>

---

<br>

## 10.7 Promise

<br>

### 10.7.1 Promise 생성

<br>

### 10.7.2 async 함수

<br>

---

<br>

## 10.8 제네릭 올바르게 사용하기

<br>

### 10.8.1 제네릭 황금율

<br>

### 10.8.2 제네릭 명명 규칙

<br>

---

<br>

## 10.9 마치며

<br>

---

<br>
