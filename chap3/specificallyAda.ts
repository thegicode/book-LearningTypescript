let specificallyAda = "Ada";

specificallyAda = "Ada";

specificallyAda = "Byron";
// error가 발생하지 않음.
// 책에서는 아래의 오류 발생
// Error : Type "Byron" is not assignable to type "Ada"

let someString = "";

specificallyAda = someString;
// error가 발생하지 않음.
// 책에서는 아래의 오류 발생
// Error: Type 'string' is not assignable to type "Ada"
