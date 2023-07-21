let geneticist = Math.random() > 0.5 ? "Barbara McDlintock" : undefined;

if (geneticist) {
    geneticist.toUpperCase(); // Ok : string
}

geneticist.toUpperCase();
// Error: 'geneticist'은(는) 'undefined'일 수 있습니다.

geneticist && geneticist.toUpperCase(); // Ok : string | undefined
geneticist?.toUpperCase(); // Ok : string | undefined
