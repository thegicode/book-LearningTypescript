const fruits = {
    apple: 1,
    brocoli: 2,
    cherry: 1,
};

type NewType = typeof fruits;

export type FruitName = keyof NewType;
