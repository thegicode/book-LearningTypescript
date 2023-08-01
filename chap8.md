# Chapter 8 클래스

## 8.1 클래스 메서드

-   타입스크립트는 독립 함수 standalone function를 이해하는 것과 동일한 방식으로 메서드를 이해한다.
-   매개변수 타입에 타입이나 기본값을 지정하지 않으면 any 타입을 기본으로 갖는다.

    -   [greeter.ts](./chap8/greeter.ts)
    -   string 타입의 단일 필수 매개변수를 갖는 greet 클래스 메서드를 가진 Greeter 클래스를 정의하는 코드

    ```
    class Greeter {
        greet(name: string) {
            console.log(`${name}, do tyour stuff!`);
        }
    }

    new Greeter().greet("Miss Frizzle");

    new Greeter().greet();
    // Error : Expected 1 arguments, but got 0.
    ```

-   클래스 생성자 constructor는 매개변수와 관련하여 전형적인 클래스 메서드처럼 취급된다.
-   [greeted.ts](./chap8/greeted.ts)

    -   Greeted 생성자는 message: string으로 매개변수가 제공되어야 한다.

    ```
    class Greeted {
        constructor(message: string) {
            console.log(`As I always say: ${message}`);
        }
    }

    new Greeted("take chances, make mistackes, get messy");

    new Greeted();
    // Error : Expected 1 arguments, but got 0.
    ```

<br>

---

<br>

## 8.2 클래스 속성

-   타입스크립트에서 클래스의 속성을 읽거나 쓰려면 클래스에 명시적으로 선언해야 한다.
-   타입스크립트는 생성자 내의 할당에 대해서 그 멤버가 클래스에 존재하는 멤버인지 추론하려고 시도하지 않는다.
-   [fieldTrip.ts](./chap8/fieldTrip.ts)

    -   클래스가 noneexistent 속성을 선언하지 않았기 때문에 생성자에서 this.noneexistent 할당은 허용되지 않는다.

    ```
    class FieldTrip {
        destination: string;

        constructor(destination: string) {
            this.destination = destination;
            console.log(`we're goging to ${this.destination}`);

            this.noneexistent = destination;
            // Error : Property 'noneexistent' does not exist on type 'FieldTrip'.
        }
    }

    ```

-   클래스 속성을 명시적으로 선언하면 타입스크립트는 클래스 인스턴스에서 무엇이 허용되고 허용되지 않는지 빠르게 이해할 수 있다.

    ```
    const trip = new FieldTrip("place");

    trip.destination;

    trip.noneexistent;
    // Error : Property 'noneexistent' does not exist on type 'FieldTrip'.

    ```

<br>

### 8.2.1 함수 속성

-   메서드 접근 방식을 함수를 클래스 프로토타입에 할당하므로 모든 클래스 인스턴스는 동일한 함수 정의를 사용한다.

    -   [withMethod.js](./chap8/withMethod.js)

    ```
    class WithMethod {
        myMethod() {}
    }

    new WithMethod().myMethod === new WithMethod().myMethod; // true

    ```

-   값이 함수인 속성을 선언하는 방식

    -   클래스의 인스턴스당 새로운 함수가 생성되며, 항상 클래스 인스턴스를 가리켜야 하는 화살표 함수에서 this 스코프를 사용하면 클래스 인스턴스당 새로운 함수를 생성하는 시간과 메모리 비용 측면에서 유용하다.
    -   [withProperty.js](./chap8/withProperty.js)

    ```
    class WithProperty {
        myProperty: () => {};
    }

    new WithProperty().myProperty = new WithProperty().myProperty; // false
    ```

-   함수 속성은 클래스 멤버로 할당된 값이고, 그 값은 함수이다.
-   [withPropertyParameters.ts](./chap8/withPropertyParametrs.ts)

    ```
    class WithPropertyParameters {
        tackesParameters = (input: boolean) => (input ? "yes" : "No");
    }

    const instance = new WithPropertyParameters();

    instance.tackesParameters(true); // Ok

    instance.tackesParameters(123);
    // Error : Argument of type 'number' is not assignable to parameter of type 'boolean'.
    ```

<br>

### 8.2.2 초기화 검사

-   엄격한 컴파일러 설정이 활성화된 상태에서 타입스크립트는 undefined 타입으로 선언된 각 속성이 생성자에 할당되었는지 확인한다.
-   [withValue.ts](./chap8/withValue.ts)

    ```
    class WithValue {
        immediate = 0; // Ok
        later: number; // Ok(constructor에서 할당)
        mayBeUndefined: number | undefined; // Ok(undefined)가 되는 것이 허용됨
        unused: number;
        // Error : 속성 'unused'은(는) 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다.

        constructor() {
            this.later = 1;
        }
    }

    ```

-   엄격한 초기화 검사가 없다면, 비록 타입 시스템이 undefined 값에 접근할 수 없다고 말할지라도 클래스 인스턴스는 undefined 값에 접근할 수 있다.

        -   [missingInitializer.ts](./chap8/missingInitializer.ts)

        ```
        class MissingInitializer {
            property: string;
            // Error : 속성 'property'은(는) 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다.
        }

        new MissingInitializer().property.length;
        // Runtime error : Cannot read properties of undefined (reading 'length')
        ```
        - 12장 'IDE 기능 사용', strictPropertyInitialization 컴파일러 옵션

<br>

#### 확실하게 할당된 속성

-   클래스 생성자 다음에 클래스 속성을 의도적으로 할당하지 않는 경우가 있을 수 있다.
-   엄격한 초기화 검사를 적용하면 안 되는 속성인 경우에는 이를 뒤에 !를 추가해 검사를 비활성화하도록 설정한다.

    -   타입스크립트에 속성이 처음 사용되기 전에 undefined 값이 할당된다.
    -   [activitiesQueue.ts](./chap8/activitiesQueue.ts)
    -   ActivitiesQueue 클래스는 생성자와는 별도로 여러 번 다시 초기화될 수 있으므로 pending 속성은 !와 함께 할당되어야 한다.

    ```
    class ActivitiesQueue {
        pending!: string[]; // Ok

        initialize(pending: string[]) {
            this.pending = pending;
        }

        next() {
            return this.pending.pop();
        }
    }

    const activities = new ActivitiesQueue();

    activities.initialize(["eat", "sleep", "learn"]);
    activities.next();
    ```

-   [Warning] 클래스 속성에 대해 엄격한 초기화 검사를 비활성화하는 것은 종종 타입 검사에는 적합하지 않은 방식으로 코드가 설정되어 있다는 신호. ! 어서션을 추가하고 속성에 대한 타입 안정성을 줄이는 대신 클래스를 리팩터링해서 어서션이 더 이상 필요하지 않도록 하라.

<br>

### 8.2.3 선택적 속성

-   선택적 속성은 | undefined를 포함하는 유니언 타입과 동일하게 작동한다.
-   엄격한 초기화 검사는 생성자에서 선택적 속성을 명시적으로 설정하지 않아도 문제가 되지 않는다

    -   [missingIntitializer2.ts](./chap8/missingIntitializer2.ts)
    -   property를 옵션으로 정의했으므로 엄격한 속성 초기화 검사와 관계없이 클래스 생성자에서 할당하지 않아도 된다.

    ```
    class MissingInitializer {
        property?: string;
    }

    new MissingInitializer().property?.length;

    new MissingInitializer().property.length;
    // Error : 개체가 'undefined'인 것 같습니다.

    export {};

    ```

<br>

### 8.2.4 읽기 전용 속성

-   readonly로 선언되는 속성은 선언된 위치 또는 생성자에서 초깃값만 할당할 수 있다.

    -   [quote.ts](./chap8/quote.ts)
    -   text 속성은 생성자에서는 값이 지정되지만 다른 곳에서 값을 지정하려고 하면 타입 오류 발생

    ```
    class Quote {
        readonly text: string;

        constructor(text: string) {
            this.text = text;
        }

        emphaisze() {
            this.text += "!";
            // Error : Cannot assign to 'text' because it is a read-only property.
        }
    }

    const quote = new Quote(
        "There is a brilliant child locked inside every stdent."
    );
    quote.text = "Hai";
    // Error : Cannot assign to 'text' because it is a read-only property.

    ```

-   [Warning] 여러분이 npm 패키지로 게시한 코드를 사용하는 외부인이 readonly 제한자를 존중하지 않을 수 있다.

    -   특히 자바스크립트를 작성 중이고 타입 검사를 하지 않는 사용자라면 더욱 그렇다.
    -   진정한 읽기 전용 보호가 필요하다면 # private 필드나 get() 함수 속성 사용을 고려해보라.

-   원시 타입의 초깃값을 갖는 readonly로 선언된 속성은 다른 속성과 조금 다르다. - 더 넓은 원싯값이 아니라 값의 타입이 가능한 한 좁혀진 리터럴 타입으로 유추된다.

    -   [randomQuote.ts](./chap8/randomQuote.ts)
    -   클래스 속성은 처음에는 모두 문자열 리터럴로 선언되므로 둘 중 하나를 string으로 확장하기 위해서는 타입 애너테이션이 필요하다

    ```
    class RandomQuote {
        readonly explicit: string = "Home is the nicest word there is";
        readonly implicit = "Home is the nicest word there is";

        constructor() {
            if (Math.random() > 0.5) {
                this.explicit = "We start learnig the minute we're born";
                this.implicit = "We start learnig the minute we're born";
                // Error : Type '"We start learnig the minute we're born"' is not assignable to type '"Home is the nicest word there is"'.
            }
        }
    }

    const quote = new RandomQuote();

    console.log(quote.explicit); // 타입: string
    console.log(quote.implicit); // 타입: "Home is the nicest word there is"

    ```

<br>

---

<br>

## 8.3 타입으로서의 클래스

-   타입 시스템에서의 클래스는 클래스 선언이 런타입 값(클래스 자체)과 타입 애너테이션에서 사용할 수 있는 타입을 모두 재생한다는 점에서 상대적으로 독특하다.
-   [teacher.ts](./chap8/teacher.ts)

    ```
    class Teacher {
        sayHello() {
            console.log(`Take changes, make mistake, get messy!`);
        }
    }

    let teacher: Teacher;

    teacher = new Teacher();

    teacher = "Wahoo!";
    // Error : Type 'string' is not assignable to type 'Teacher'.
    ```

-   타입스크립트는 클래스의 동일한 멤버를 모두 포함하는 모든 객체 타입을 클래스에 할당할 수 있는 것으로 간주한다.
-   타입스크립트의 구조적 타이핑이 선언되는 방식이 아니라 객체의 형태만 고려하기 때문이다.

    -   [withSchoolBus.ts](./chap8/withSchoolBus.ts)

    ```
    class SchoolBus {
        getAbilities() {
            return ["magic", "shapeshifting"];
        }
    }

    function withSchoolBus(bus: SchoolBus) {
        console.log(bus.getAbilities());
    }

    withSchoolBus(new SchoolBus()); // Ok

    // Ok
    withSchoolBus({
        getAbilities: () => ["transmogrification"],
    });

    withSchoolBus({
        getAbilities: () => 123,
        // Error : Type 'number' is not assignable to type 'string[]'.
    });

    ```

-   [TIP] 대부분의 실제 코드에서 개발자는 클래스 타입을 요청하는 위치에 객체이 값을 전달하지 않는다.

<br>

---

<br>

## 8.4 클래스와 인터페이스

-   타입스크립트는 클래스 이름 뒤에 implements 키워드와 인터페이스 이름을 추가함으로써 클래스와 해당 인스턴스가 인터페이스를 준수한다고 선언할 수 있다.

    -   [students.ts](./chap8/student.ts)
    -   Student 클래스는 name 속성과 study 메서드를 포함해 Leadrner 인터페이스를 올바르게 구현했지만 Slaker에는 study가 누락되어 타입 오류 발생

    ```
    interface Learner {
        name: string;
        study(hours: number): void;
    }

    class Student implements Learner {
        name: string;

        constructor(name: string) {
            this.name = name;
        }

        study(hours: number) {
            for (let i = 0; i < hours; i++) {
                console.log(`...studying...`);
            }
        }
    }

    class Slaker implements Learner {
        // Error : Class 'Slaker' incorrectly implements interface 'Learner'.
        //   Type 'Slaker' is missing the following properties from type 'Learner': name, study
    }
    ```

-   [NOTE] 클래스에 의해 구현되는 인터페이스는 Learner 인터페이스에서 사용된 것처럼 인터페이스 멤버를 함수로 선언하기 위해 메서드 구문을 사용한다.
-   타입스크립트는 인터페이스에서 클래스의 메서드 또는 속성 타입을 유추하지 않는다.

    -   Slaker 예제에서 study(hours){} 메서드를 추가했다면 타입 애너테이션을 지정하지 않는 한 hours 매개변수를 암시적 any로 간주한다.

    ```
    class Student2 implements Learner {
        name;
        // Error : 'name' 멤버에는 암시적으로 'any' 형식이 포함됩니다.

        study(hours) {
            // Error : 'hours' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.
        }
    }
    ```

<br>

### 8.4.1 다중 인터페이스 구현

-   클래스에 구현된 인터페이스 목록은 인터페이스 이름 사이에 쉼표를 넣고, 개수 제한 없이 인터페이스를 사용할 수 있다.

    -   [reportedCard.ts](./chap8/reportedCard.ts)
    -   Empty 클래스에 Graded, Reporter 인터페이스를 제대로 구현하지 못했으므로 두 가지 타입 오류 발생

    ```
    interface Graded {
        grades: number[];
    }

    interface Reporter {
        report: () => string;
    }

    class ReportCard implements Graded, Reporter {
        grades: number[];

        constructor(grades: number[]) {
            this.grades = grades;
        }

        report() {
            return this.grades.join(", ");
        }
    }

    class Empty implements Graded, Reporter {}
    // Error: Class 'Empty' incorrectly implements interface 'Graded'.
    //   Property 'grades' is missing in type 'Empty' but required in type 'Graded'.
    // Error:  Class 'Empty' incorrectly implements interface 'Reporter'.
    //   Property 'report' is missing in type 'Empty' but required in type 'Reporter'.

    ```

-   클래스가 한 번에 두 인터페이스를 구현할 수 없도록 정의하는 인터페이스가 있을 수 있다.

    -   두 개의 충돌하는 인터페이스를 구현하는 클래스를 선언하려고 하면 클래스에 하나 이상의 타입 오류가 발생한다.
    -   [asNumber.ts](./chap8/asNumber.ts)

        ```
        interface AgeIsNumber {
            age: number;
        }

        interface AgeIsNotANumber {
            age: () => string;
        }

        class AsNumber implements AgeIsNumber, AgeIsNotANumber {
            age = 0;
            // Error:  Property 'age' in type 'AsNumber' is not assignable to the same property in base type 'AgeIsNotANumber'.
            //   Type 'number' is not assignable to type '() => string'.
        }

        class NotAsNumber implements AgeIsNumber, AgeIsNotANumber {
            age() {
                return "";
            }
            // Error:  Property 'age' in type 'NotAsNumber' is not assignable to the same property in base type 'AgeIsNumber'.
            //   Type '() => string' is not assignable to type 'number'.
        }
        ```

<br>

---

<br>

## 8.5 클래스 확장

-   [studentTeacher.ts](./chap8/studentTeacher.ts)

    ```
    class Teacher {
        teach() {
            console.log("The surest test of discipline is its absenece.");
        }
    }

    class StudentTeacher extends Teacher {
        learn() {
            console.log("I cannpt affored the luxury of a closed mind.");
        }
    }

    const teacher = new StudentTeacher();
    teacher.teach();
    teacher.learn();

    teacher.other();
    // Error: Property 'other' does not exist on type 'StudentTeacher'.

    ```

<br>

### 8.5.1 할당 가능성 확장

-   하위 클래스의 인스턴스는 기본 클래스의 모든 멤버를 가지므로 기본 클래스의 인스턴스가 필요한 모든 곳에서 사용할 수 있다.
-   [lesson.ts](/chap8/lesson.ts)

    ```
    class Lesson {
        subject: string;

        constructor(subject: string) {
            this.subject = subject;
        }
    }

    class OnlineLesson extends Lesson {
        url: string;

        constructor(subject: string, url: string) {
            super(subject);
            this.url = url;
        }
    }

    let lesson: Lesson;
    lesson = new Lesson("coding");
    lesson = new OnlineLesson("coding", "orelly.com");

    let online: OnlineLesson;
    online = new OnlineLesson("coding", "orelly.com");

    online = new Lesson("coding");
    // Error: Property 'url' is missing in type 'Lesson' but required in type 'OnlineLesson'.
    ```

-   타입스크립트의 구조적 타입에 따라 하위 클래스의 모든 멤버가 동일한 타입의 기본 클래스에 이미 존재하는 경우 기본 클래스의 인스턴스를 하위 클래스 대신 사용할 수 있다.
-   [subClass.ts](./chap8/subClass.ts)

    ```
    class PastGrades {
        grades: number[] = [];
    }

    class LabeledPastGrades extends PastGrades {
        label?: string;
    }

    let subClass: LabeledPastGrades;

    subClass = new LabeledPastGrades(); // Ok
    subClass = new PastGrades(); // Ok
    ```

-   [TIP] 대부분의 실제 코드에서 하위 클래스는 일반적으로 기본 클래스 위에 새로운 필수 타입 정보를 추가한다.

<br>

### 8.5.2 재정의된 생성자

-   [gradeAnnouncer.ts](./chap8/gradeAnnouncer.ts)

    ```
    class GradeAnnouncer {
        message: string;

        constructor(grade: number) {
            this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
        }
    }

    class PassingAnnouncer extends GradeAnnouncer {
        constructor() {
            super(100);
        }
    }

    class FailingAnnouncer extends GradeAnnouncer {
        constructor() {}
        // Error: Constructors for derived classes must contain a 'super' call.
    }
    ```

    -   PassingAnnouncer의 생성자는 number 인수를 사용해 기본 클래스인 GradeAnnouncer의 생성자를 올바르게 호출하는 반면,
        -   FailingAnnouncer는 기본 생성자를 올바르게 호출하지 않아 타입 오류 발생

-   자바스크립트 규칙에 따르면 하위 클래스의 생성자는 this 또는 super에 접근하기 전에 반드시 기본 클래스의 생성자를 호출해야 한다.

    -   타입스크립트는 super()를 호출하기 전에 this 또는 super를 접근하려고 하는 경우 타입 오류를 보고한다.
    -   [gradesTally.ts](./chap8/gradesTally.ts)

    ```
    class GradesTally {
        grades: number[] = [];

        addGrades(...grades: number[]) {
            this.grades.push(...grades);
            return this.grades.length;
        }
    }

    class ContinueGradesTally extends GradesTally {
        constructor(previousGrades: number[]) {
            this.grades = [...previousGrades];
            // Error:  'super' must be called before accessing 'this' in the constructor of a derived class.

            super();

            console.log("Starting with length", this.grades.length);
        }
    }
    ```

<br>

### 8.5.3 재정의된 메서드

-   기본 클래스에서 사용하는 모든 곳에 하위 클래스를 사용할 수 있으므로 새 메서드의 타입도 기본 메서드 대신 사용할 수 있어야 한다.

    -   [gradeCounter.ts](./chap8/gradeCounter.ts)

    ```
    class GradeCounter {
        countGrades(grades: string[], letter: string) {
            return grades.filter((grade) => grade === letter).length;
        }
    }

    class FailureCounter extends GradeCounter {
        countGrades(grades: string[]) {
            return super.countGrades(grades, "F");
        }
    }

    class AnyFailureChecker extends GradeCounter {
        countGrades(grades: string[]) {
            // Error: TS2416: Property 'countGrades' in type 'AnyFailureChecker' is not assignable to the same property in base type 'GradeCounter'.
            //   Type '(grades: string[]) => boolean' is not assignable to type '(grades: string[], letter: string) => number'.
            //   Type 'boolean' is not assignable to type 'number'.
            return super.countGrades(grades, "F") !== 0;
        }
    }

    const counter: GradeCounter = new AnyFailureChecker();

    // 실제 타입 : boolean
    const count = counter.countGrades(["A", "C", "F"]);

    ```

<br>

### 8.5.4 재정의된 속성

-   속성을 다시 선언하는 대부분의 하위 클래스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 기본 클래스 속성 타입에서 확장되는 타입으로 만든다.

    -   [assignment.ts](./chap8/assignment.ts)

    ```
    class Assignment {
        grade?: number;
    }

    class GradesAssignment extends Assignment {
        grade: number;

        constructor(grade: number) {
            super();
            this.grade = grade;
        }
    }
    ```

-   속성의 유니언 타입의 허용된 값 집합을 확장할 수는 없다. 만약 확장한다면 하위 클래스 속성은 더 이상 기본 클래스 속성 타입에 할당할 수 없다.

    -   [numericGrade.ts](./chap8/numericGrade.ts)

    ```
    class NumericGrade {
        value = 0;
    }

    class ValueGrade extends NumericGrade {
        value = Math.random() > 0.5 ? 1 : "...";
        //  Error: Property 'value' in type 'ValueGrade' is not assignable to the same property in base type 'NumericGrade'.
        //   Type 'string | number' is not assignable to type 'number'.
        //   Type 'string' is not assignable to type 'number'.
    }

    const instance: NumericGrade = new ValueGrade();

    // 에상 타입:  number
    // 실제 타입: number | string
    instance.value;
    ```

<br>

---

<br>

## 8.6 추상 클래스

-   때로는 일부 메서드의 구현을 선언하지 않고, 대신 하위 클래스가 해당 메서드를 제공할 것을 예상하고 기본 클래스를 만드는 방법이 유용할 수 있다.
-   추상화 메서드 선언은 추상화 기본 클래스에서 메서드의 본문을 제공하는 것을 건너띄고, 대신 인터페이스와 동일한 방식으로 선언된다.
-   [school.ts](./chap8/school.ts)

    ```

    abstract class School {
        readonly name: string;

        constructor(name: string) {
            this.name = name;
        }

        abstract getStudentTypes(): string[];
    }

    class Preschool extends School {
        getStudentTypes() {
            return ["preschooler"];
        }
    }

    // Absence: 결석
    class Absence extends School {}
    // Error: Non-abstract class 'Absence' does not implement all abstract members of 'School'
    // 비추상 클래스 'Absence'은(는) 'School' 클래스에서 상속된 추상 멤버 'getStudentTypes'을(를) 구현하지 않습니다.

    ```

    -   School 클래스와 getStudentTypes 메서드는 abtract로 표시된다. 그러므로 하위 클래스인 Preschool과 Absences는 getStudentTypes를 구현해야 한다.

-   구현이 존재한다고 가정할 수 있는 일부 메서드에 대한 정의가 없기 때문에 추상 클래스는 직접 인스턴스화할 수 없다. 추상 클래스가 아닌 클래스만 인스턴스화할 수 있다.
-   계속해서 School 예제에서 new Scholl을 호출하려고 하면 타입스크립트 오류가 발생한다.

    ```
    let school: School;
    school = new Preschool("Sunnyside Daycare");
    school = new School("somewhere else");
    // Error: Cannot create an instance of an abstract class.
    ```

-   추상 클래스는 클래스의 세부 사항이 채워질 거라 예상되는 프레임워크에서 자주 사용된다.

<br>

---

<br>

## 8.7 멤버 접근성

-   자바스크립트에서는 클래스 멤버 이름 앞에 #을 추가해 private 클래스 멤버 임을 나타낸다.
-   private 클래스 멤버는 해당 클래스 인스턴스에서만 접근할 수 있다.
-   자바스크립트 런타임은 클래스 외부 코드 영역에서 private 메서드나 속성에 접근하려고 하면 오뉴를 발생시킴으로서 프라이버시 privacy를 강화한다.
-   타입스크립트는 private 클래스 멤버를 지원하지만, 타입 시스템에만 존재하는 클래스 메서드와 속성에 대해 조금 더 미묘한 프라이버시 정의 집합을 허용한다.
    -   public(기본값): 모든 곳에서 누구나 접근 가능
    -   protected: 클래스 내부 또는 하위 클래스에서만 접근 가능
    -   private: 클래스 내부에서만 접근 가능
-   [base.ts](./chap8/base.ts)

    ```
    class Base {
        isPublicImpicit: 0;
        public isPublicExplicit = 1;
        protected isProtected = 2;
        private isPrivate = 3;
        #truePrivate = 4;
        // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
    }

    class SubClass extends Base {
        examples() {
            this.isPublicImpicit; // Ok
            this.isPublicExplicit; // Ok
            this.isProtected; // Ok

            this.isPrivate;
            // Error: Property 'isPrivate' is private and only accessible within class 'Base'.

            this.#truePrivate;
            // Error: Property '#truePrivate' is not accessible outside class 'Base' because it has a private identifier.
        }
    }

    new SubClass().isPublicImpicit; // Ok
    new SubClass().isPublicExplicit; // Ok

    new SubClass().isProtected;
    // Error: Property 'isProtected' is protected and only accessible within class 'Base' and its subclasses.

    new SubClass().isPrivate;
    // Error: Property 'isPrivate' is private and only accessible within class 'Base'.

    ```

-   타입스크립트의 멤버 접근성은 타입 시스템에서만 존재하는 반면 자바스크립트의 private 선언은 런타임에도 존재한다는 점이 주요 차이점이다.
-   protected 또는 private으로 선언된 자바스크립트 클래스 멤버는 명시적으로 또는 암묵적으로 public으로 선언된 것처럼 동일한 자바스크립트 코드로 컴파일된다.
-   인터페이스와 타입 애너테이션처럼 접근성 키워드는 자바스크립트로 컴파일될 때 제거됩니다.
-   자바스크립트 런타임에서는 #private 필드만 진정한 private이다.

-   접근성 제한자는 readonly와 함께 표시할 수 있다.

    -   [twoKeywords.ts](./chap8/twoKeywrods.ts)

    ```
    class TwoKeywords {
        private readonly name: string;

        constructor() {
            this.name = "Anne Sulivan";
        }

        log() {
            console.log(this.name);
        }
    }

    const two = new TwoKeywords();

    two.name = "Savitribal Phule";
    // Error: Property 'name' is private and only accessible within class 'TwoKeywords'.
    // Cannot assign to 'name' because it is a read-only property.

    ```

<br>

### 8.7.1 정적 빌드 제한자

-   자바스크립트는 static 키워드를 사용해 클래스 자체에서 멤버를 선언하다.
-   [question.ts](./chap8/question.ts)

    ```
    class Question {
        protected static readonly answer: "bash";
        protected static readonly prompt =
            "What's an ogre's favorite programing language?";

        geuss(getAnswer: (prompt: string) => string) {
            const answer = getAnswer(Question.prompt);

            if (answer === Question.answer) {
                console.log("You got is!");
            } else {
                console.log("Try again...");
            }
        }
    }

    Question.answer;
    // Error: Property 'answer' is protected and only accessible within class 'Question' and its subclasses.
    ```

-   static 클래스 필드에 대해 readonly와 접근성 제한자를 사용하면 해당 필드가 해당 클래스 외부에서 접근되거나 수정되는 것을 제한하는데 유용하다.

<br>

---

<br>

## 8.8 마치며

-   클래스 메서드 및 속성 선언과 사용법
-   읽기 전용(readonly) 또는 선택적 속성으로 표시하기
-   타입 애너테이션에서 타입으로 클래스 이름 사용하기
-   클래스 인스턴스 형태를 적용하기 위한 인터페이스 구현하기
-   하위 클래스에 대한 할당 가능성과 재정의 규칙으로 클래스 확장하기
-   abstract 클래스와 abstract 메서드로 표시하기
-   클래스 필드에 타입 시스템 제한자 추가하기

[TIP] https://www.learningtypescript.com/classes 에서 배운 내용 연습
