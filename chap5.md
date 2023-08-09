# Chapter 5 함수

## 5.1 함수 배개변수

-   함수 매개변수 타입이 없는 경우 타입스크립트가 any 타입으로 간주하며 매개변수의 타입은 무엇이든 될 수 있다.
-   변수와 마찬가지로 타입 애너테이션으로 함수 매개변수의 타입을 선언할 수 있다.

    ```
    function sing(song: string) {
        console.log(`Singing: ${song}`)
    }
    ```

<br>

### 5.1.1 필수 매개변수 required parameters

-   [singTwo.ts](./chap5/singTwo.ts)

    ```
    function singTwo(first: string, second: string) {
        console.log(`${first} / ${second}`);
    }

    singTwo("Ball and Chain");
    // Error : Expected 2 arguments, but got 1.
    // Logs : Ball and Chain / undefined

    singTwo("I Will Surive", "Higher Love");
    // Logs : I Will Surive / Higher Love

    singTwo("Go Your Own Way", "The Chain", "Dreams");
    // Error : Expected 2 arguments, but got 3.
    // Logs : Go Your Own Way / The Chain

    ```

-   함수에 필수 매개변수를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화하는 데 도움이 된다.

<br>

### 5.1.2 선택적 매개변수 optional parameter

-   선택적 객체 타입 속성과 유사하게 타입 애너테이션의 : 앞에 ?을 추가해 매개변수가 선택적이라고 표시한다.
-   선택적 매개변수에는 항상 | undefiend가 유니언 타입으로 추가되어 있다.
-   [announceSong.ts](./chap5/announceSong.ts)

    ```
    function announceSong(song: string, singer?: string) {
        console.log(`Song: ${song}`);

        if (singer) {
            console.log(`Singer: ${singer}`);
        }
    }

    announceSong("GreensLeeves"); // Ok
    // Logs : Song: GreensLeeves
    announceSong("GreensLeeves", undefined); // Ok
    // Logs : Song: GreensLeeves
    announceSong("Chandelier", "Sia"); // Ok
    // Logs :
    // Song: Chandelier
    // Singer: Sia
    ```

-   선택적 매개변수는 항상 암묵적으로 undefined가 될 수 있다.
-   위 코드에서 singer는 string | undefined 타입으로 시작한 후 if 문에 따라 string 타입으로 좁혀진다.

-   [announceSongBy.ts](./chap5/announceSongBy.ts)

    ```
    function announceSongBy(song: string, singer: string | undefined) {
        console.log(`Song: ${song}`);

        if (singer) {
            console.log(`Singer: ${singer}`);
        }
    }

    announceSongBy("Greenleeves");
    // Error : Expected 2 arguments, but got 1.
    // Logs : Song: Greenleeves
    announceSongBy("Greenleeves", undefined);
    // Logs : Song: Greenleeves
    announceSongBy("Chandelier", "Sia");
    // Logs :
    // Song: Chandelier
    // Singer: Sia
    ```

    -   singer 매개변수는 명시적으로 제공되어야 한다.

-   함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다.
-   [announceSinger.ts](./chap5/announceSinger.ts)

    ```
    function announceSinger(singer?: string, song: string) {}
    // Error :  A required parameter cannot follow an optional parameter.
    ```

<br>

### 5.1.3 기본 매개변수

-   자바스크립트에서 선택적 매개변수를 선언할 때 =와 값이 포함된 기본값을 제공할 수 있다.
-   선택적 매개변수에는 기본적으로 값이 제공되기 때문에 해당 타입스크립트 타입에는 암묵적으로 함수 내부에 | undefined 유니언 타입이 추가된다.
-   매개변수에 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기본으로 매개변수 타입을 유추한다.
-   [rateSong.ts](./chap5/rateSong.ts)

    ```
    function rateSong(song: string, rating = 0) {
        console.log(`${song} gets ${rating}/5 starts!`);
    }

    rateSong("Photograph");
    // Logs : Photograph gets 0/5 starts!

    rateSong("Set fire to the Rain", 5);
    // Logs : Set fire to the Rain gets 5/5 starts!

    rateSong("Set fire to the Rain", undefined);
    // Logs : Set fire to the Rain gets 0/5 starts!

    rateSong("At Last!", "100");
    // Error : Argument of type 'string' is not assignable to parameter of type 'number'.
    // Logs : At Last! gets 100/5 starts!
    ```

<br>

### 5.1.4 나머지 매개변수 rest parameter

-   타입스크립트는 나머지 매개변수의 타입을 일반 매개변수와 유사하게 선언할 수 있다.
-   단, 인수 배열을 나타내기 위해 끝에 [] 구문이 추가된다는 점만 다르다.
-   [singAllTheSongs](./chap5/singAllTheSongs.ts)

    ```
    function singAllTheSongs(singer: string, ...songs: string[]) {
        for (const song of songs) {
            console.log(`${song}, by ${singer}`);
        }
    }

    singAllTheSongs("Alicia keys");

    singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");
    // Logs :
    // Bad Romance, by Lady Gaga
    // Just Dance, by Lady Gaga
    // Poker Face, by Lady Gaga

    singAllTheSongs("Ella Fitzgerald", 2000);
    // Error : Argument of type 'number' is not assignable to parameter of type 'string'.
    // Logs : 2000, by Ella Fitzgerald
    ```

    -   songs 나머지 매개변수에 대해 0개 이상의 string 타입 인수를 사용할 수 있다.

<br>

---

<br>

## 5.2 반환 타입

-   함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있다.
-   [singSongs.ts](./chap5/singSongs.ts)

    ```
    // 타입: (songs: string[]) => number
    function singSongs(songs: string[]) {
        for (const song of songs) {
            console.log(`${song}`);
        }

        return songs.length;
    }
    ```

-   함수에 다른 값을 가진 여러 개의 반환문을 포함하고 있다면, 타입스크립트는 반환 타입 return type을 가능한 모든 반환 타입의 조합으로 유추한다.
-   [getSongAt.ts](./chap5/getSongAt.ts)
    ```
    // 타입: (songs: string[], index: number) => string | undefined
    function getSongAt(songs: string[], index: number) {
        return index < songs.length ? songs[index] : undefined;
    }
    ```
    -   getSongAt 함수는 string | undefined를 반환하는 것으로 유추된다.

<br>

### 5.2.1 명시적 반환 타입

-   변수와 마찬가지로 타임 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는 것이 좋다.
-   그러나 특히 함수에서 반환 타입을 명시적으로 선언하는 방식이 매우 유용할 때가 종종 있다.
    -   가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제한다.
    -   타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부한다.
    -   수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있다.
-   [singSongsRecursive.ts](./chap5/singSongsRecursive.ts)

    ```
    function singSongsRecursive(songs: string[], count = 0): number {
        return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
    }

    // 화살표 함수의 경우 => 앞에 배치된다.
    const singSongsRecursive = (songs: string[], count = 0): number =>
    songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
    ```

-   함수의 반환문이 함수의 반환 타입으로 할당할 수 없는 값을 반환하는 경우 타입스크립트는 할당 가능성 오류를 표시한다.
-   [getSongRecordingDate.ts](./chap5/getSongRecordingDate.ts)
    ```
    function getSongRecordingDate(song: string): Date | undefined {
        switch (song) {
            case "Strange Fruit":
                return new Date("April 20, 1939");
            case "Greenleeves":
                return "unknown";
            // Error : Type 'string' is not assignable to type 'Date'.
            default:
                return undefined;
        }
    }
    ```
    -   반환문 중 하나가 string을 반환하도록 잘못 제공하고 있다.

<br>

---

<br>

## 5.3 함수 타입 function type

-   자바스크립트에서는 함수를 값으로 전달할 수 있다. 즉, 함수를 가지기 위한 매개변수 또는 변수의 타입을 선언하는 방법이 필요하다.
-   함수 타입은 화살표 함수와 유사하지만 함수 본문 대신 타입이 있다.
    ```
    let nothingGiveString: () => string;
    ```
    -   nothingGiveString 변수 타입은 매개변수가 없고 string 타입을 반환하는 함수이다.
-   다음 inputAndOuput 변수 타입은 string[] 매개변수와 count 선택적 매개변수 및 number 값을 반환하는 함수이다.
    ```
    let inputAndOuput: (songs: string[], count?: number) => number;
    ```
-   함수 타입은 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용된다.
-   [runOnSongs.ts](./chap5/runOnSongs.ts)

    ```
    const songs = ["Juice", "Shake It Off", "What's Up"];

    function runOnSongs(getSongAt: (index: number) => string) {
        for (let i = 0; i < songs.length; i++) {
            console.log(getSongAt(i));
        }
    }

    function getSongAt(index: number) {
        return `${songs[index]}`;
    }

    runOnSongs(getSongAt);

    function logSong(song: string) {
        return `${song}`;
    }

    runOnSongs(logSong);
    // Error : Argument of type '(song: string) => string' is not assignable to parameter of type '(index: number) => string'.
    // Types of parameters 'song' and 'index' are incompatible.
    // Type 'number' is not assignable to type 'string'.

    ```

    -   runOnSongs에 대한 오류 메시지는 할당 가능성 오류의 예로 몇 가지 상세한 단계까지 제공한다.
        1. 첫 번째 들여쓰기 단계는 두 함수 타입을 출력한다.
        2. 다음 들여쓰기 단계는 일치하지 않는 부분을 지정한다.
        3. 마지막 들여쓰기 단계는 일치하지 않는 부분에 대한 정확한 할당 가능성 오류를 출력한다.

<br>

### 5.3.1 함수 타입 괄호

-   유니언 타입의 애너테이션에서 함수 반환 위치를 나타내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용한다.

    ```
    // 타입은 string | undefined 유니언을 반환하는 함수
    let returnStringOrUndefined: () => string | undefined;

    // 타입은 undefined나 string을 반환하는 함수
    let maybeRetrunString = (() => string) | undfined;
    ```

<br>

### 5.3.2 매개변수 타입 추론

-   타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있다.

    ```
    let singer: (song: string) => string;

    singer = function (song) {
        // song: string의 타입
        return `Singing: ${song.toUpperCase()}`;
    };

    ```

-   함수를 매개변수로 갖는 함수에 인수로 전달된 함수는 해당 매개변수 타입도 잘 유추할 수 있다.

    -   다음 코드에서 song과 index 매개변수는 타입스크립트에 따라 각각 string과 number로 유추된다.

    ```
    const songs = ["Call Me", "Jelene", "The Chain"]

    // song: string
    // index: number
    songs.forEach((song, index) => {
        console.log(`${song} is at index ${index}`)
    });
    ```

<br>

### 5.3.3 함수 타입 별칭

-   함수 타입에서도 동일하게 타입 별칭을 사용할 수 있다.

    -   [stringToNumber.ts](./chap5/stringToNumber.ts)

    ```
    type StringToNumber = (input: string) => number;

    let stringToNumber: StringToNumber;

    stringToNumber = (input) => input.length;

    stringToNumber = (input) => input.toUpperCase();
    // Error : Type 'string' is not assignable to type 'number'.
    ```

-   함수 매개변수도 함수 타입을 참조하는 별칭을 입력할 수 있다.

    -   [numberToString.ts](./chap5/numberToString.ts)

    ```
    type NumberToStrong = (input: number) => string;

    function usesNumberToString(numberToString: NumberToStrong) {
        console.log(`The string is : ${numberToString(1234)}`);
    }

    usesNumberToString((input) => `${input}! Hooray!`);

    usesNumberToString((input) => input * 2);
    // Error : Type 'number' is not assignable to type 'string'.
    ```

-   <ins>타입 별칭은 특히 함수 타입에 유용하다. 타입 별칭을 이용하면 반복적으로 작성하는 매개변수와 반환 타입을 갖는 코드 공간을 많이 절약할 수 있다.</ins>

<br>

---

<br>

## 5.4 그 외 반환 타입

-   void와 never 반환 타입

<br>

### 5.4.1 void 변환 타입

-   일부 함수는 어떤 값도 반환하지 않는다.

```
function longSong(song: string | undefined): void {
    if (!song ) {
        return; // Ok
    }
    console.log(`${song}`);

    return true;
    // Error: Typs 'boolean' is not assignable to type 'void'.
}
```

-   함수 타입 선언 시 void 반환 타입은 매우 유용하다. 함수 타입을 선언할 때 void를 사용하면 함수에서 반환되는 모든 값은 무시된다.

    -   [songLogger.ts](./chap5/songLogger.ts)

    ```
    let songLogger: (song: string) => void;

    songLogger = (song) => {
        console.log(`${song}`);
    };

    songLogger("Heart of Glass");
    ```

-   자바스크립트 함수는 실젯값이 반환되지 않으면 기본적으로 모두 undefined를 반환한다.
-   void는 함수의 반환 타입을 무시된다는 의미이고, undefined는 반환되는 리터럴 값이다.

    -   [returnsVoid.ts](./chap5/returnsVoid.ts)

    ```
    function returnsVoid() {
        return;
    }

    let lazyValue: string | undefined;

    lazyValue = returnsVoid();
    // Error : Type 'void' is not assignable to type 'string'.

    ```

-   undefined와 void를 구분해서 사용하면 매우 유용하다. 특히 void를 반환하도록 선언된 타입 위치에 전달된 함수가 반환된 모든 값을 무시하도록 설정할 때 유용하다.

    -   [saveRecords.ts](./chap5/saveRecords.ts)

    ```
    const records: string[] = [];

    function saveRecords(newRecords: string[]) {
        newRecords.forEach((record) => records.push(record));
    }

    saveRecords(["21", "Come On Over", "The Bodyguard"]);
    ```

    -   배열의 내장 forEach 메서드는 void를 반환하는 콜백을 받는다. forEach에 제공되는 함수는 원하는 모든 값을 반환할 수 있다.
    -   다음 saveRedords 함수의 records.push(record)는 number(배열의 .push()에서 반환된 값)을 반환하지만
    -   여전히 newRecords.forEach에 전달된 화살표 함수에 대한 반환값이 허용된다.

<br>

### 5.4.2 never 변환 타입

-   never 반환 함수는 (의도적으로) 항상 오류를 발생시키거나 무한 루프를 실행하는 함수이다.

    -   [never.ts](./chap5/never.ts)

    ```
    function fail(message: string): never {
        throw new Error(`Invariant failure: ${message}`);
    }

    function workWithUnsafeParam(param: unknown) {
        if (typeof param !== "string") {
            fail(`param should be a string, not ${typeof param}`);
        }

        // 여기에서 param의 타입은 string으로 알려진다.
        param.toUpperCase();
    }

    workWithUnsafeParam(123);

    ```

    -   함수가 절대 반환하지 않도록 의도하려면 명시적 : never 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 코드가 실행되지 않음을 나타낸다.
    -   다음 fail 함수는 오류를 발생시키므로 param의 타입을 string으로 좁혀서 타입스크립트의 제어 흐름 분석 control flow analysis을 도와준다.

-   [NOTE] void는 아무것도 반환하지 않는 함수를 위한 것이고, never는 절대 반환하지 않는 함수를 위한 것이다.

<br>

---

<br>

## 5.5 함수 오버로드

-   일부 자바스크립트 함수는 선택적 매개변수나 나머지 매개변수만으로 표현할 수 없는 매우 다른 매개변수들로 호출될 수 있다.
-   이러한 함수는 오버로드 시그니처 overload signature라고 불리는 타입스크립트 구문으로 설명할 수 있다.
-   즉, 하나의 최종 구현 시그니처 implementation signature와 그 함수의 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 반환 타입을 여러 번 선언한다.
-   오버로드된 함수 호출에 대하 구문 오류를 생성할지 여부를 결정할 때 타입스크립트는 함수의 오버로드 시그니처만 확인한다. 구현 시그니처는 함수의 내부 로직에서만 사용된다.
-   [createDate.ts](./chap5/createDate.ts)

    ```
    function createDate(timsstamp: number): Date;

    function createDate(month: number, day: number, year: number): Date;

    function createDate(monthOrTimestamp: number, day?: number, year?: number) {
        return day === undefined || year === undefined
            ? new Date(monthOrTimestamp)
            : new Date(year, monthOrTimestamp, day);
    }

    createDate(554346880);

    createDate(7, 28, 1987);

    createDate(4, 1);
    // Error : No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.

    ```

    -   처음 두 줄은 오버로드 시그니처이고, 세 번째 줄은 구현 시그니처 코드이다.

-   타입스크립트를 컴파일해 자바스크릅트로 출력하면 다른 타입 시스템 구문처럼 오버로드 시그니처도 지워진다.

-   [Warning] 함수 오버로드는 복잡하고 설명하기 어려운 함수 타입에 사용하는 최후의 수단이다. 함수를 단순하게 유지하고 가능하면 함수 오버로드를 사용하지 않는 것이 좋다.

<br>

### 5.5.1 호출 시그니처 호환성

-   함수의 오버로드 시그니처에 있는 반환 타입과 각 매개변수는 구현 시그니처에 있는 동일한 인덱스의 매개변수에 할당할 수 있어야 한다.
-   구현 시그니처는 모든 오버로드 시그니처와 호환되어야 한다.

    -   [format.ts](./chap5/format.ts)

    ```
    function format(data: string): string;

    function format(data: string, needle: string, haystack: string): string;

    function format(getData: () => string): string;
    // Error : This overload signature is not compatible with its implementation signature.

    function format(data: string, needle?: string, haystack?: string) {
        return needle && haystack ? data.replace(needle, haystack) : data;
    }
    ```

<br>

---

<br>

## 5.6 마치며

-   타입 애너테이션으로 함수 매개변수 타입 선언하기
-   타입 시스템의 동작을 변경하기 위한 선택적 매개변수, 기본 매개변수, 나머지 매개변수 선언하기
-   타입 애너테이션으로 함수 반환 타입 선언하기
-   void 타입으로 사용 가능한 값을 반환하지 않는 함수 알아보기
-   never 타입으로 절대 반환하지 않는 함수 알아보기
-   함수 오버로드를 사용해서 다양한 함수 호출 시그니처 설명하기

[TIP] https://www.learningtypescript.com/functions 에서 배운 내용 연습
