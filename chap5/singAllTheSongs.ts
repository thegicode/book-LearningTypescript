function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
        console.log(`${song}, by ${singer}`);
    }
}

singAllTheSongs("Alicia keys");

singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");
// Logs :
// Bad Romance, by Lady Gaga
// Just Dance, by Lady Gaga
// Poker Face, by Lady Gaga

singAllTheSongs("Ella Fitzgerald", 2000);
// Error : Argument of type 'number' is not assignable to parameter of type 'string'.
// Logs : 2000, by Ella Fitzgerald
