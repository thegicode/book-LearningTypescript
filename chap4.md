# Chapter 4 객체

## 1 객체 타입

```
// poet.ts

const poet = {
    born: 9135,
    name: "Mary Olover",
};

poet["born"];
poet.name;

poet.end;
// Error : Property 'end' does not exist on type '{ born: number; name: string; }'.

```

-   위 코드에서 두 개의 속성에 접근하는 것은 허용되지만, 다른 속성 이름으로 접근하려고 하면 해당 이름이 존재하지 않는다는 타입 오류 발생

-   null과 undefined를 제외한 모든 값은 그 값에 대한 실제 타입의 멤버 집합을 가지므로 타입스크립트는 모든 값의 타입을 확인하기 위해 객체 타입을 이해해야 한다.

<br>

### 1.1 객체 타입 선언

-   객체 타입은 객체 리터럴과 유사하게 보이지만 필드 값 대신 타입을 사용해 설명한다.

    ```
    let poetLatter: {
        born: number;
        name: string;
    };

    poetLatter = {
        born: 1935,
        name: "Mary Oliver",
    };

    poetLatter = "Sappho";
    // Error : Type 'string' is not assignable to type '{ born: number; name: string; }'.
    ```

<br>

### 1.2 별칭 객체 타임

-   {born: number, name: string}과 같은 객체 타입을 계속 작성하는 일은 매우 귀찮다.
-   각 객체 타입에 타워 별칭을 할당해 사용하는 방법이 더 일반적이다.

    ```
    type Poet = {
        born: number;
        name: string;
    };

    let poetLatter2: Poet;

    poetLatter2 = {
        born: 1935,
        name: "Mary Oliver",
    };

    poetLatter2 = "Sappho";
    // Error : Type 'string' is not assignable to type 'Poet'.
    ```

-   [NOTE] 대부분의 타입스크립트 프로젝트는 객체 타입을 설명할 때 인터페이스 interface 키워드를 사용하는 것을 선호한다. '7장 인터페이스'
    -   참고로 별칭 객체 타입과 인터페이스는 거의 동일하므로 이 장의 모든 내용은 인터페이스에도 적용되는 내용이다.

<br>

---

<br>

## 2 구조적 타이핑

-   타입스크립트의 타입 시스템은 구조적으로 타입화 structurally typed되어 있다.
-   타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다.

```
// withName.ts

type WithFirstName = {
    firstName: string;
};

type WithLastName = {
    lastName: string;
};

const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};

let withFirstName: WithFirstName = hasBoth;
// Ok :  'hashBoth'는 'string' 타입의 'firstName'을 포함함

let withLastName: WithLastName = hasBoth;
// Ok :  'hashBoth'는 'string' 타입의 'lastName'을 포함함
```

-   구조적 타이핑은 덕 타이핑 duck typing과는 다른다. 덕 타이핑은 '오리처럼 보이고 오리처엄 꽥꽥거리면, 오리일 것이다'라는 문구에서 유래했다.
    -   타입스크립트의 타입검사기에서 구조적 타이핑은 정적 시스템이 타입을 검사하는 경우이다.
    -   덕 타이핑은 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것을 말한다.
-   자바스크립트는 덕 타입인 반면 타입스크립트는 구조적으로 타입화된다.

<br>

### 2.1 사용 검사

-   객체 타입으로 애너테이션된 위치에 값을 제공할 때 타입스크립트는 값을 해당 객체 타입에 할당할 수 있는지 확인한다.

```
// firstAndLastNames.ts

type FirstAndLastNames = {
    firstName: string;
    lastName: string;
};

// Ok
const hasBoth: FirstAndLastNames = {
    firstName: "Lucille",
    lastName: "Clifton",
};

const hasOnlyOne: FirstAndLastNames = {
    first: "Sappho",
    // Error : Type '{ first: string; }' is not assignable to type 'FirstAndLastNames'.
    // Object literal may only specify known properties, and 'first' does not exist in type 'FirstAndLastNames'.
};

```

-   객체 타입은 필수 속성 이름과 해당 속성이 예상되는 타입을 모두 지정한다.

    ```
    // timeRange.ts

    type TimeRange = {
        start: Date;
    };

    const hasStartSTring: TimeRange = {
        start: "1879-02-13",
        // Error: Type 'string' is not assignable to type 'Date'.
    };

    ```

    -   hasStartSTring 객체의 start 속성이 Date가 아니라 string 타입이므로 타입 오류 발생

<br>

### 2.2 초과 속성 검사

-   변수가 객체 타입으로 선언되고, 초깃값에 객체 타입에서 정의된 것보다 많은 필드가 있다면 타입스크립트에서 타입 오류 발생

    ```
    // extraProperty.ts

    type Poet = {
        born: number;
        name: string;
    };

    const poetMatch: Poet = {
        born: 1928,
        name: "Maya Angelou",
    };

    const extraProperty: Poet = {
        activity: "walking",
        // Error: Type '{ activity: string; born: number; name: string; }' is not assignable to type 'Poet'.
        // Object literal may only specify known properties, and 'activity' does not exist in type 'Poet'.
        born: 1935,
        name: "Mary Oliver",
    };
    ```

-   초과 속성 검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어난다. 기존 객체 리터럴을 제공하면 초과 속성 검사를 우회한다.

    ```
    type Poet = {
        born: number;
        name: string;
    };

    const existingObject = {
        activity: "walking",
        born: 1935,
        name: "Mary Oliver",
    };

    const extraPropertyButOk: Poet = existingObject; // Ok
    ```

<br>

### 2.3 중첩된 객체 타입

```
// poemMatch.ts

type Poem = {
    author: {
        firstName: string;
        lastName: string;
    };
    name: string;
};

const poemMatch: Poem = {
    author: {
        firstName: "Sylyvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};

const poemMissmatch: Poem = {
    author: {
        name: "Sylyvia Plath",
        // Error: Type '{ name: string; }' is not assignable to type '{ firstName: string; lastName: string; }'.
        // Object literal may only specify known properties, and 'name' does not exist in type '{ firstName: string; lastName: string; }'.
    },
    name: "Tullips",
};

```

-   Poem 타입을 작성할 때 author 속성의 형태를 자체 별칭 객체 타입으로 추출하는 방법도 있다.
-   중첩된 타입을 자체 타입 별칭으로 추출하면 타입스크립트의 타입 오류 메시지에 더 많은 정보를 담을 수 있다.

```
// pemMissmatch.ts

type Author = {
    firstName: string;
    lastName: string;
};

type Poem = {
    author: Author;
    name: string;
};

const poemMisttMatch: Poem = {
    author: {
        name: "sylvia Plath",
        // Error :  Type '{ name: string; }' is not assignable to type 'Author'.
        // Object literal may only specify known properties, and 'name' does not exist in type 'Author'.
    },
    name: "Tulips",
};

```

-   [TIP] 중첩된 타입을 고유한 타입 이름으로 바꿔서 사용하면 코드와 오류 메시지가 더 읽기 쉬워진다.

<br>

### 2.4 선택적 속성

-   타입의 속성 애너테이션에서 : 앞에 ?를 추가하면 선책적 속성임을 나타낼 수 있다.

```
// book.ts

type Book = {
    author?: string;
    pages: number;
    // Error : 'pages' is declared here.
};

const ok: Book = {
    author: "Rita Dove",
    pages: 80,
};

const missing: Book = {
    // Error : Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.
    author: "Rita Dove",
};

```

-   선택적 속성과 undefined를 포함한 유니언 타입의 속성 사이에는 차이가 있다.
    -   ?를 사용해 선택적으로 선언된 속성은 존재하지 않아도 된다.
    -   필수로 선언된 속성과 | undefined는 그 값이 undefined일지라도 반드시 존재해야 한다.

```
// writers.ts

type Writers = {
    author: string | undefined;
    // Error :  'author' is declared here.
    editor?: string;
};

// Ok : author는 undefined으로 제공됨
const hasRequired: Writers = {
    author: undefined,
};

const missingRequired: Writers = {};
// Error :  Property 'author' is missing in type '{}' but required in type 'Writers'.

```

-   Writers 타입의 editor 속성은 ?를 사용해 선언했으므로 변수를 선언할 때 생략이 가능
-   author 속성은 ?가 없으므로 undefined여도 반드시 존재해야 한다.

-   7장 '인터페이스'에서 다른 종류의 속성을 살펴보고, 13장 '구성 옵션'에서 선택적 속성에 대한 타입스크립트의 엄격한 설정에 대해 알아본다.

<br>

---

<br>

## 3 객체 타입 유니언

<br>

### 3.1 유추된 객체 타입 유니언

```
// poem.ts

const poem =
    Math.random() > 0.5
        ? { name: "The Double Image", pages: 7 }
        : { name: "Her Kind", rhymes: true };

// 타입 :
// {
//     name: string;
//     pages: number;
//     rhymes?: undefined;
// }
// |
// {
//     name: string;
//     pages?: undefined;
//     rhymes: boolean;
// }

poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // booleans | undefined
```

-   위 poem 값은 항상 string 타입인 name 속성을 가지며 pages와 rhymes는 있을 수도 있고, 없을 수도 있다.

<br>

### 3.2 명시된 객체 타입 유니언

-   poem 변수는 name을 항상 갖는 유니언 타입으로 명시적으로 작성되었다.
-   pages와 rhymes는 항상 존재한다는 보장이 없다.

```
// poemWithPages.ts

type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
    Math.random() > 0.5
        ? { name: "The Double Image", pages: 7 }
        : { name: "Her Kind", rhymes: true };

poem.name; // Ok

poem.pages;
// Error : Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.

poem.rhymes;
// Error :  Property 'rhymes' does not exist on type 'Poem'.
// Property 'rhymes' does not exist on type 'PoemWithPages'.

```

-   잠재적으로 존재하지 않는 객체의 멤버에 대한 접근을 제한하면 코드의 안전을 지킬 수 있다.
-   객체 유니언도 타입을 좁혀야 한다.

<br>

### 3.3 객체 타입 내로잉

```
if ("pages" in poem) {
    poem.pages; // Ok :  poem은 PoemWithPages로 좁혀짐
} else {
    poem.rhymes; // Ok : poem은 PoemWithRhymes로 좁혀짐
}
```

-   타입스크립트는 if (peom.pages)와 같은 형식으로 참 여부를 확인하는 것을 허용하지 않는다.
-   존재하지 않는 객체의 속성에 접근하려고 시도하면 타입 가드처럼 작동하는 방식으로 사용되더라도 타입 오류로 간주된다.

```
if (poem.pages) { /* ... */}
// Error : Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
```

<br>

### 3.4 판별된 유니언 discriminated union

-   자바스크립트와 타입스크립트에서 유니언 타입으로 된 객체의 또 다른 인기 있는 형태는 객체의 속성이 객체의 형태를 나타내도록 하는 것이다.
-   이러한 타입 형태를 판별된 유니언이라 부르고, 객체의 타입을 가리키는 속성이 판별값이다.
-   타입스크립트는 코드에서 판별 속성을 사용해 타입 내로잉을 수행한다.

-   타입 내로잉 없이는 값에 존재하는 속성을 보장할 수 없다.

```
// poemUnions.ts

type PoemWithPages = {
    name: string;
    pages: number;
    type: "pages";
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
    type: "rhymes";
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
    Math.random() > 0.5
        ? { name: "The Double Image", pages: 7, type: "pages" }
        : { name: "Her Kind", rhymes: true, type: "rhymes" };

if (poem.type === "pages") {
    console.log(`It's got pages: ${poem.pages}`);
} else {
    console.log(`It rhymes: ${poem.rhymes}`);
}

poem.type;

poem.pages;
// Error :  Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
```

-   판별된 유니언은 우아한 자바스크립트 패턴과 타입스크립트의 타입 내로잉을 아름답게 결합하므로 타입스크립트에서 필자가 가장 좋아하는 기능이다.
-   10장 '제네릭'과 관련된 프로젝트에서 generic 데이터 운영을 위해 판별된 유니언을 사용하는 방법을 살펴본다.

<br>

---

<br>

## 4 교차 타입 intersection type

-   타입스크립트 유니언 타입은 둘 이상의 다른 타입 중 하나의 타입이 될 수 있음을 나타낸다.
-   타입스크립트에서 & 교차 타입을 사용해 여러 타입을 동시에 나타낸다.
-   교차 타입은 일반적으로 여러 기존 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성한다.
-   다음 Artwokr와 Writing 타입은 genere, name, pages 속성을 결합한 WrittenArt 타입을 형성하는 데 사용된다.

```
// intersectionType.ts

type Artwork = {
    genre: string;
    name: string;
};

type Writing = {
    pages: number;
    name: string;
};

type WrittenArt = Artwork & Writing;
// 다음과 같음
// {
//     genre: string;
//     name: string;
//     pages: number;
// }

```

-   교차 타입은 유니언 타입과 결합할 수 있으며, 이는 하나의 타입으로 판별된 유니언 타입을 설명하는 데 유용하다.
-   다음 shortPoem 타입은 항상 author 속성을 가지며 하니의 type 속성으로 판별된 유니언 타입이다.

```
// shortPoem.ts

type ShortPoem = { author: string } & (
    | { kigo: string; type: "haiku" }
    | { meter: number; type: "villanelle" }
);
// Error:  'meter' is declared here.

// Ok
const morningGlory: ShortPoem = {
    author: "Fukuda Chiyo-ni",
    kigo: "Morning Glory",
    type: "haiku",
};

const oneArt: ShortPoem = {
    // Error :  Type '{ author: string; type: "villanelle"; }' is not assignable to type 'ShortPoem'.
    //   Type '{ author: string; type: "villanelle"; }' is not assignable to type '{ author: string; } & { meter: number; type: "villanelle"; }'.
    //   Property 'meter' is missing in type '{ author: string; type: "villanelle"; }' but required in type '{ meter: number; type: "villanelle"; }'.
    author: "Elizabeth Bishop",
    type: "villanelle",
};
```

<br>

### 4.1 교차 타입의 위험성

-   교차 타입을 사용할 때는 가능한 한 코드를 간결하게 유지해야 한다.

#### 긴 할당 가능성 오류

-   유니언 타입과 결합하는 것처럼 복잡한 교차 타입을 만들게 되면 할당 가능성 오류 메시지는 읽기 어려워진다.
    -   복잡하면 복잡할수록 타입 검사기의 메시지도 이해하기 더 어려워진다.
-   이전 코드 shortPoem의 경우 타입스크립트가 해당 이름을 출력하도록 타입을 일련의 별칭으로 된 객체 타입으로 분할하면 읽기가 휠썬 쉬워진다.

```
// shortPoemBase.ts

type ShortPoemBase = { author: string };
type Haiku = ShortPoemBase & { kigo: string; type: "haiku" };
type Villanelle = ShortPoemBase & { meter: number; type: "villanelle" };
type ShortPoem = Haiku | Villanelle;

const oneArt: ShortPoem = {
    // Error : Type '{ author: string; type: "villanelle"; }' is not assignable to type 'ShortPoem'.
    //   Type '{ author: string; type: "villanelle"; }' is not assignable to type 'Villanelle'.
    //   Property 'meter' is missing in type '{ author: string; type: "villanelle"; }' but required in type '{ meter: number; type: "villanelle"; }'.

    author: "Elizabeth Bishop",
    type: "villanelle",
};
```

<br>

#### never

-   원시 타입의 값은 동시에 여러 타입이 될 수 없기 때문에 교차 타입의 구성 요소로 함께 결합할 수 없다.
-   두 개의 원시 타입을 함께 시도하면 never 키워드로 표시되는 never 타입이 된다.

```
// notPossible.ts

type NotPossible = number & string;

let notNumber: NotPossible = 0;
//  Type 'number' is not assignable to type 'never'.

let notString: never = "";
// Type 'string' is not assignable to type 'never'.

```

-   대부분의 타입스크립트 프로젝트는 never 타입을 거의 사용하지 않지만 코드에서 불가능한 상태를 나타내기 위해 가끔 등장한다.
-   하지만 대부분 교차 타입을 잘못 사용해 발생한 실수일 가능성이 높다.

---

<br>

## 5 마치며

다양한 객체를 다루는 방법을 살펴보며 타입 시스템에 대한 이해를 확장

-   타입스크립트가 객체 타입 리터럴의 타입을 해석하는 방법
-   중첩과 선택적 속성을 포함한 객체 리터럴 타입 소개
-   객체 리터럴 타입의 유니언 타입 선언, 추론 및 타입 내로잉
-   판별된 유니언 타입과 판별값
-   교차 타입으로 객체 타입을 결합하는 방법

[TIP] https://www.learningtypescript.com/objects 에서 배운 내용 연습
