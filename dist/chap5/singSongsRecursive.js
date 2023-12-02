"use strict";
// function singSongsRecursive(songs: string[], count = 0): number {
//     return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
// }
const singSongsRecursive = (songs, count = 0) => songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
