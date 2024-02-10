class NumericGrade {
    constructor() {
        this.value = 0;
    }
}
class ValueGrade extends NumericGrade {
    constructor() {
        super(...arguments);
        this.value = Math.random() > 0.5 ? 1 : "...";
        //  Error: Property 'value' in type 'ValueGrade' is not assignable to the same property in base type 'NumericGrade'.
        //   Type 'string | number' is not assignable to type 'number'.
        //   Type 'string' is not assignable to type 'number'.
    }
}
const instance = new ValueGrade();
// 에상 타입:  number
// 실제 타입: number | string
instance.value;
export {};
