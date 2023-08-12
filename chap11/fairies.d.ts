declare function canGrantWish(wish: string): boolen;

declare function grantWish(wish: string) {
    return true;
};

class Fairy {
    canGrantWish(wish: string): boolean;

    grantWish(wish: string) {
        return true;
    }
}
