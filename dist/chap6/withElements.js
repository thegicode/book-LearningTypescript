"use strict";
function withElements(elements) {
    console.log(elements[9001].length); // 타입 오류 없음
}
withElements(["It's", "over"]);
