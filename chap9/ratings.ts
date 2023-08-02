interface Ratings {
    audience: number;
    critics: number;
}

function getRating(ratings: Ratings, key: string): number {
    return ratings[key];
    // Error: 'string' 형식의 식을 'Ratings' 인덱스 형식에 사용할 수 없으므로 요소에 암시적으로 'any' 형식이 있습니다.
    //   'Ratings' 형식에서 'string' 형식의 매개 변수가 포함된 인덱스 시그니처를 찾을 수 없습니다.
}

const ratings: Ratings = { audience: 66, critics: 84 };

getRating(ratings, "audience"); // Ok

getRating(ratings, "not valid"); // 허용되지만 사용하면 안 됨

export { Ratings };
