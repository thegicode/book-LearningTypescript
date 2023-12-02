class NumericGrade {
    value = 0;
}
class ValueGrade extends NumericGrade {
    value = Math.random() > 0.5 ? 1 : "...";
}
const instance = new ValueGrade();
// 에상 타입:  number
// 실제 타입: number | string
instance.value;
export {};
