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
    ```

<br>

---

<br>

## 5.3 함수 타입

<br>

### 5.3.1 함수 타입 괄호

<br>

### 5.3.2 매개변수 타입 추론

<br>

### 5.3.3 함수 타입 별칭

<br>

---

<br>

## 5.4 그 외 반환 타입

<br>

### 5.4.1 void 변환 타입

<br>

### 5.4.2 never 변환 타입

<br>

---

<br>

## 5.5 함수 오버로드

<br>

### 5.5.1 호출 시그니처 호환성

<br>

---

<br>

## 5.6 마치켜
