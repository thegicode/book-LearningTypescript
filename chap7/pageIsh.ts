const pageIsh = {
    text: "Hello, world!",
};

// Ok: pageIsh는 Page 객체가 아니라 text가 있는, 유추된 객체이다.
pageIsh.text += "!";

// Ok: pageIsh는의 더 구체적인 버전인 Page를 읽는다.
read(pageIsh);
