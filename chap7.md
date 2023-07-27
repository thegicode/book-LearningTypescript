# Chapter 7 인터페이스 interface

-   인터페이스는 연관된 이름으로 객체 형태를 설명하는 또 다른 방법
-   인터페이스는 별칭으로 된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와 더 나은 상호 운용성을 위해 선호된다.

<br>

## 7.1 타입 별칭 vs 인터페이스

-   [interface.ts](./chap7/interface.ts)

```
type PoetType = {
    born: number;
    name: string;
};

interface Poet {
    born: number;
    name: string;
}

```

-   [TIP] 세미콜론(;)을 선호하는 타입스크립트 개발자는 타입 별칭 뒤에 세미콜론을 넣는다.
    이 기본 설정은 세미콜론을 사용해 변수를 선언하는 것과 세미콜론 없이 클래스 또는 함수를 선언하는 것의 차이를 반영한다.

-   인터페이스에 대한 타입스크립트의 할당 가능성 검사와 오류 메시지는 객체 타입에서 실행되는 것과 동일하다.

    -   [valueLater](./chap7/valueLater.ts)

    ```
    let valueLater: Poet;

    valueLater = {
        born: 1935,
        name: "Sara Tesadale",
    };

    valueLater = "Emily Dickinson";
    // Error : Type 'string' is not assignable to type 'Poet'.

    valueLater = {
        born: true,
        // Error : Type 'boolean' is not assignable to type 'number'.
        name: "Sappho",
    };

    ```

-   인터페이스와 타입 별칭 사이에는 몇 가지 주요 차이점이 있다.
    -   인터페이스는 속성 증가를 위해 병합 merge 할 수 있다. 이 기능은 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용하다.
    -   인터페이스는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만 타입 별칭은 사용할 수 없다.
    -   일반적으로 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동한다. 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 더 쉽게 캐시할 수 있는 명명된 타입을 선언한다.
    -   인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는 (명명된) 객체로 간주되므로 어려운 특이 케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있다.

<br>

---

<br>

## 7.2 속성 타입

<br>

### 7.2.1 선택적 속성

-   타입 에너테이션 : 앞에 ?를 사용

    ```
    interface Book {
        author?: string;
        pages: number;
    }

    const ok: Book = {
        author: "Rita Dove",
        pages: 80,
    };

    const missing: Book = {
        pages: 880,
    };

    ```

    -   필수 속성 pages, 선택적 속성 author

-   undefined를 포함한 유니언 타입의 선택적 속성과 일반 속성 사이의 차이점과 관련된 주의 사항은 객체 타입뿐만 아니라 인터페이스에도 적용된다.

<br>

### 7.2.2 읽기 전용 속성

-   인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단
-   타입스크립트 속성 이름 앞에 readonly 키워드 추가
-   [page.ts](./chap7/page.ts)

    ```
    interface Page {
        readonly text: string;
    }

    function read(page: Page) {
        console.log(page.text);

        page.text += "!";
        // Error : Cannot assign to 'text' because it is a read-only property.
    }

    ```

-   readonly 제한자 modifier는 타입 시스템에만 존재하며 인터페이스에서만 사용할 수 있다.
-   readonly 제한자는 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에는 적용되지 않는다.

    -   [pageIsh.ts](./chap7/pageIsh.ts)

    ```
    const pageIsh = {
        text: "Hello, world!",
    };

    // Ok: pageIsh는 Page 객체가 아니라 text가 있는, 유추된 객체이다.
    pageIsh.text += "!";

    // Ok: pageIsh는의 더 구체적인 버전인 Page를 읽는다.
    read(pageIsh);

    ```

-   readonly는 타입 시스템 구성 요소일 뿐 컴파일된 자바스크립트 출력 코드에는 존재하지 않는다.
-   readonly는 단지 타입스크립트 타입 검사기를 사용해 개발 중에 그 속성이 수정되지 못하도록 보호하는 역할을 한다.

<br>

### 7.2.3 함수와 메서드

-   타입스크립트에서 인터페이스 멤버를 함수 타입으로 선언할 수 있다.
-   타입스크립트에서 인터페이스 멤버를 함수로 선언하는 두 가지 방법
    -   메서드 구문 : 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
    -   속성 구문 : 인터페이스 멤버를 member: () => void와 같이 독립 함수와 동일하게 선언
-   다음 코드의 method와 property 멤버는 둘 다 매개변수 없이 호출되어 string을 반환한다.
    [hasBothFunctionTypes](./chap7/hasBothFunctionTypes.ts)

    ```
    interface HasBothFunctionTypes {
        property: () => string;
        method(): string;
    }

    const hasBoth: HasBothFunctionTypes = {
        property: () => "",
        method() {
            return "";
        },
    };

    hasBoth.property();
    hasBoth.method();
    ```

-   두 가지 방법 모두 선택적 속성 키워드인 ?를 사용해 필수로 제공하지 않아도 되는 멤버로 나타낼 수 있다.
    ```
    interface OptionalReadonlyFunctions {
        optinalProperty? : () => string;
        optionalMehtod?() : string;
    }
    ```
-   현 시점에서 추천하는 스타일 가이드
    -   기본 함수가 this를 참조할 수 있다는 것을 알고 있다면 메서드 함수를 사용하라. 가장 일반적으로 클래스의 인스턴스에서 사용된다.
    -   반대의 경우는 속성 함수를 사용하라.

<br>

### 7.2.4 호출 시그니처 call signature

-   인터페이스와 객체 타입은 호출 시그니처로 선언할 수 있다.
-   호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명이다.
-   호출 시그니처가 선언한 방식으로 호출되는 값만 인터페이스에 할당할 수 있다.
-   즉, 할당 가능한 매개변수와 반환 타입을 가진 함수이다.
-   호출 시그니처는 함수 타입과 비슷하지만, 콜론(:) 대신 화살표(=>)로 표시한다.
-   [callSingnature.ts](./chap7/callSingnature.ts)

    -   FunctionAlias와 CallSignature 타입은 모두 동일한 함수 매개변수와 반환 타입을 설명한다.

    ```
    type FunctionAlias = (input: string) => number;

    interface CallSignature {
        (input: string): number;
    }

    // 타입: (input: string) => number
    const typedFunctioinAlias: FunctionAlias = (input) => input.length;

    // 타입: (nput: string) => number
    const typedCallSignature: CallSignature = (input) => input.length;

    ```

-   호출 시그니처는 사용자 정의 속성을 추가로 갖는 함수를 설명하는 데 사용할 수 있다.

    -   [hasCallCount.ts](./chap7/hasCallCount.ts)

    ```
    interface FunctionWithCount {
        count: number;
        (): void;
    }

    let hasCallCount: FunctionWithCount;

    function keepsTrackOfCalls() {
        keepsTrackOfCalls.count += 1;
        console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
    }

    keepsTrackOfCalls.count = 0;

    hasCallCount = keepsTrackOfCalls;

    function doesNoHaveCount() {
        console.log("No idea!");
    }

    hasCallCount = doesNoHaveCount;
    // Error : Property 'count' is missing in type '() => void' but required in type 'FunctionWithCount'.

    ```

<br>

### 7.2.5 인덱스 시그니처 index signature

-   타입스크립트는 인덱스 시그니처 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있음을 나타낸다.
-   자바스크립트 객체 속성 조회 lookup 은 암묵적으로 키를 문자열로 변환하기 때문에 인터페이스의 객체는 문자열 키와 힘께 가장 일반적으로 사용된다 .
-   인덱스 시그니처는 일반 속성 정의와 유사하지만 키 다음에 타입이 있고 {[i: string]: ...}과 같이 배열의 대괄호를 갖는다.
-   다음 WordCounts 인터페이스는 number 값을 갖는 모든 string 키를 허용하는 것으로 선언되었다.

    -   [wordCounts.ts](./chap7/wordCounts.ts)

    ```
    interface WordCounts {
        [i: string]: number;
    }

    const counts: WordCounts = {};

    counts.apple = 0;
    counts.banana = 1;

    counts.cherry = false;
    // Error : Type 'boolean' is not assignable to type 'number'.

    ```

-   인덱스 시그니처는 객체에 값을 할당할 때 편리하지만 타입 안정성을 완벽하게 보장하지는 않는다.

    -   다음 publishDates 값은 Date 타입으로 Frankenstein을 안전하게 반환하지만 타입스크립트는 Beloved가 정의되지 않았음에도 불구하고 정의되었다고 생각하도록 속인다.
    -   [publishDates.ts](./chap7/publishDates.ts)

    ```
    interface DatesByName {
        [i: string]: Date;
    }

    const publishDates: DatesByName = {
        Frankenstein: new Date("1 January 1954"),
    };

    publishDates.Frankenstein; // 타입: Date
    console.log(publishDates.Frankenstein.toString());

    publishDates.Beloved; // 타입은 Date이지만 런타임 값은 undefined
    console.log(publishDates.Beloved.toString());
    // 타입 시스템에서는 오류가 나지 않지만 실제 런타임에서는 오류가 발생함
    // Runtime error : Cannot read properties of undefined (reading 'toString')

    ```

-   키/값 쌍을 저장하려고 하는데 키를 미리 알 수 없다면 Map을 사용하는 편이 더 안전하다. .get 메서드는 항상 키가 존재하지 않음을 나타내기 위해서 | undefined 타입을 반환한다.

#### 속성과 인덱스 시그니처 혼합

-   인터페이스는 명시적으로 명명된 속성과 포괄적인 catchall 용도의 string 인덱스 시그니처를 한번에 포함할 수 있다.
-   각각의 명명된 속성의 타입은 포괄적인 용도의 인덱스 시그니처로 할당할 수 있어야 한다.
-   명명된 속성이 더 구체적인 타입을 제공하고, 다른 모든 속성은 인덱스 시그니처의 타입으로 대체하는 것으로 혼합해서 사용할 수 있다.
-   다음 HistoricalNovels는 모든 속성을 number 타입으로 선언했고 추가적으로 Oroonoko 속성이 존재해야 한다.

    -   [novels.ts](./chap7/novels.ts)

    ```
    interface HistoricalNovels {
        Oroonoko: number;
        [i: string]: number;
    }

    const novels: HistoricalNovels = {
        Outlander: 19991,
        Oroonoko: 1688,
    };

    const missingOroonoki: HistoricalNovels = {
        // Error : Property 'Oroonoko' is missing in type '{ Outlander: number; }' but required in type 'HistoricalNovels'.
        Outlander: 1991,
    };
    ```

-   다음 ChapterStarts는 preface 속성은 0으로, 다른 모든 속성은 더 일반적인 number를 갖도록 선언한다. 즉, ChapterStarts를 사용하는 모든 객체의 preface 속성은 반드시 0이어야 한다.

    -   [chapterStarts.ts](./chap7/chapterStarts.ts)

    ```
    interface ChapterStarts {
        preface: 0;
        [i: string]: number;
    }

    const correctPreface: ChapterStarts = {
        preface: 0,
        night: 1,
        shopping: 5,
    };

    const wrongPreface: ChapterStarts = {
        preface: 1,
        // Error :  Type '1' is not assignable to type '0'.
    };
    ```

<br>

#### 숫자 인덱스 시그니처

-   자바스크립트가 암묵적으로 객체 속성 조회 키를 문자열로 변환하지만 때로는 객체의 키로 숫자만 허용하는 것이 바람직할 수 있다.
-   타입스크립트 인덱스 시그니처는 키로 string 대신 number 타입을 사용할 수 있지만, 명명된 속성은 그 타입을 포괄적인 용도의 string 인덱스 시그니처의 타입으로 할당할 수 있어야 한다.

    -   [moreNarrowNumbers](./chap7/moreNarrowNumbers.ts)

    ```
    interface MoreNarrowNumbers {
        [i: number]: string;
        [i: string]: string | undefined;
    }

    const mixesNybersAndStrings: MoreNarrowNumbers = {
        0: "",
        key1: "",
        key2: undefined,
    };

    interface MoreNarrowStrings {
        [i: number]: string | undefined;
        // Error : 'number' 인덱스 유형 'string | undefined'을(를) 'string' 인텍스 유형 'string'에 할당할 수 없습니다.
        [i: string]: string;
    }
    ```

<br>

### 7.2.6 중첩 인터페이스

-   객체 타입이 다른 객체 타입의 속성으로 중첩될 수 있는 것처럼 인터페이스 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있다.
-   다음 Novel 인터페이스는 인라인 객체 타입인 author 속성과 Setting 인터페이스인 setting 속성을 포함한다.

    -   [novle.ts](./chap7/novel.ts)

    ```
    interface Novel {
        author: {
            name: string;
        };
        setting: Setting;
    }

    interface Setting {
        place: string;
        year: number;
    }

    let myNovel: Novel;

    myNovel = {
        author: {
            name: "Jane Aussten",
        },
        setting: {
            place: "england",
            year: 1812,
        },
    };

    myNovel = {
        author: {
            name: "Emily Bronte",
        },
        setting: {
            // Error : Property 'year' is missing in type '{ place: string; }' but required in type 'Setting'.
            place: "West Yorkshire",
        },
    };
    ```

<br>

---

<br>

## 7.3 인터페이스 확장

-   타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 확장 extend 인터페이스를 허용한다.
-   확장할 인터페이스의 이름 뒤에 extends 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시한다.
-   이렇게 하면 파생 인터페이스 detrived interface 를 준수하는 모든 객체가 기본 인터페이스 basic interface의 모든 멤버도 가져야 한다는 것을 타입스크립트에 알려준다.
-   다음 예제에서 Novella 인터페이스는 Writing을 확장하므로 객체는 최소한 Novella의 pages와 Writing의 title 멤버가 모두 있어야 한다.

    -   [novellat.ts](./chap7/novella.ts)

    ```
    interface Writing {
        title: string;
    }

    interface Novella extends Writing {
        pages: number;
    }

    let myNovella: Novella = {
        pages: 195,
        title: "Ethan Frome",
    };

    let missingPage: Novella = {
        // Error : Property 'pages' is missing in type '{ title: string; }' but required in type 'Novella'.
        title: "The Awakening",
    };

    let extraProperty: Novella = {
        page: 300,
        // Error :  Type '{ page: number; strategy: string; style: string; }' is not assignable to type 'Novella'.
        strategy: "baseline",
        style: "Naturalism",
    };
    ```

<br>

### 7.3.1 재정의된 속성

-   파생 인터페이스는 다른 타입으로 속성을 다시 선언해 기본 인터페이스와 속성을 재정의 override 하거나 대체할 수 있다.

    -   [withNulllableName.ts](./chap7/withNulllableName.ts)

    ```
    interface WithNullableName {
        name: string | null;
    }

    interface WithNonNullableName extends WithNullableName {
        name: string;
    }

    interface withNumericName extends WithNullableName {
        // Error : Interface 'withNumericName' incorrectly extends interface 'WithNullableName
        // Types of property 'name' are incompatible.
        //  Type 'string | number' is not assignable to type 'string'.
        //   Type 'number' is not assignable to type 'string'.
        name: number | string;
    }
    ```

    -   WithNullableName 타입은 WithNonNullableName 에서 null을 허용하지 않도록 적절하게 다시 설정된다.
    -   그러나 withNumericName이 name에는 number | string이 허용되지 않는다.
    -   number | string은 string | null에 할당할 수 없기 때문이다.

<br>

### 7.3.2 다중 인터페이스 확장

-   타입스크립트의 인터페이스는 여러 개의 다른 인터페이스를 확장해서 선언할 수 있다.
-   파생 인터페이스는 모든 기본 인터페이스의 모든 멤버를 받는다.
-   [useGivesBoth.ts](./chap7/useGivesBoth.ts)

    ```
    interface GivesNumber {
        giveNumber(): number;
    }

    interface GivesString {
        giveString(): string;
    }

    interface GivesBothAndEither extends GivesNumber, GivesString {
        giveEither(): number | string;
    }

    function useGivesBoth(instance: GivesBothAndEither) {
        instance.giveEither(); // 타입: number | string
        instance.giveNumber(); // 타입: number
        instance.giveString(); // 타입: string
    }
    ```

-   여러 인터페이스를 확장하는 방식으로 인터페이스를 사용하면 코드 중복을 줄이고 다른 코드 영역에서 객체의 형태를 더 쉽게 재사용할 수 있다.

<br>

---

<br>

## 7.4 인터페이스 병합

-   인터페이스의 중요한 특징 중 하나
-   두 개의 인터페이스가 동일한 이름으로 동일한 스코프에 선언된 경우, 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가된다.
-   [merged.ts](./chap7/merged.ts)

    ```
    interface Merged {
        fromFirst: string;
    }

    interface Merged {
        fromSecond: number;
    }

    // 다음과 같음
    // interface Merged {
    //     fromFirst: string;
    //     fromSecond: number;
    // }
    ```

-   일반적인 타입스크립트 개발에서는 인터페이스 병합을 자주 사용하지는 않는다.
-   인터페이스가 여러 곳에 선언되면 코드를 이해하기 어려워지므로 가능한 인터페이스 병합을 사용하지 않는 것이 좋다.
-   외부 패키지 또는 window 같은 내장된 인터페이스를 보강하는 데 특히 유용하다.
-   예, 기본 타입 스크립트 컴파일러 옵션을 사용할 때, 파일에서 myEnvironmentVariable 속성이 있는 Window 인터페이스를 선언하면 window.myEnvironmentVariable을 사용할 수 있다.

    -   [window.ts](./chap7/window.ts)

    ```
    interface Window {
        myEnvironmentVariable: string;
    }

    window.myEnvironmentVariable; // 타입: string
    ```

<br>

### 7.4.1 이름이 충돌되는 멤버

-   병합된 인터페이스는 타입이 다른 동일한 이름의 속성을 여러 번 선언할 수 없다.
-   속성이 이미 인터페이스에 선언되어 있다면 나중에 병합된 인터페이스에서도 동일한 타입을 사용해야 한다.

    -   [mergeProperties.ts](./chap7/mergeProperties.ts)

    ```
    interface MergeProperties {
        same: (input: boolean) => string;
        different: (input: string) => string;
    }

    interface MergeProperties {
        same: (input: boolean) => string;
        different: (input: number) => string;
        // Error : Subsequent property declarations must have the same type.  Property 'different' must be of type '(input: string) => string', but here has type '(input: number) => string'.
    }
    ```

    -   same의 속성이 모두 동일하므로 문제가 없지만 different 속성은 타입이 서로 다르기 때문에 오류가 발생

-   병합된 인터페이스는 동일한 이름과 다른 시그니처를 가진 메서드는 정의할 수 있다. 이렇게 하면 메서드에 대한 함수 오버로드가 발생한다.

    -   [mergeMethods.ts](./chap7/mergeMethods.ts)

    ```
    interface MergeMethods {
        different(input: string): string;
    }

    interface MergeMethods {
        different(input: number): string; // Ok
    }

    ```

<br>

---

<br>

## 7.5 마치며

-   타입 별칭 대신 인터페이스를 사용한 객체 타입 선언하기
-   선택적 속성, 읽기 전용 속성, 함수, 메서드 등 다양한 인터페이스 속성 타입 소개
-   객체의 포괄적인 속성을 담기 위한 인덱스 시그니처 사용하기
-   중첩된 인터페이스와 extedns 상속 확장으로 인테퍼에스 재사용하기
-   동일한 이름의 인터페이스 병합하기

[TIP] https://www.learningtypescript.com/interfaces 에서 배운 내용 연습
