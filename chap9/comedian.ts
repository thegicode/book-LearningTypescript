interface Comedian {
    funny: boolean;
}

interface StandupComedian extends Comedian {
    routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
    return "routine" in value;
}

function workWithComedian(value: Comedian) {
    if (isStandupComedian(value)) {
        // value: StandupComedian의 타입
        console.log(value.routine); // Ok
    }
    // value: Comedian의 타입
    console.log(value.routine);
    // Error: Property 'routine' does not exist on type 'Comedian'.
}

export {};
