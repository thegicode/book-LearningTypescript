function useGivesBoth(instance) {
    instance.giveEither(); // 타입: number | string
    instance.giveNumber(); // 타입: number
    instance.giveString(); // 타입: string
}
export {};
