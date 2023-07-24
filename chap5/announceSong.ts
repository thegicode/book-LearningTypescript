function announceSong(song: string, singer?: string) {
    console.log(`Song: ${song}`);

    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}

announceSong("GreensLeeves"); // Ok
// Logs : Song: GreensLeeves
announceSong("GreensLeeves", undefined); // Ok
// Logs : Song: GreensLeeves
announceSong("Chandelier", "Sia"); // Ok
// Logs :
// Song: Chandelier
// Singer: Sia
