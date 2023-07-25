var songs = ["Juice", "Shake It Off", "What's Up"];
function runOnSongs(getSongAt) {
    for (var i = 0; i < songs.length; i++) {
        console.log(getSongAt(i));
    }
}
function getSongAt(index) {
    return "".concat(songs[index]);
}
runOnSongs(getSongAt);
function logSong(song) {
    return "".concat(song);
}
runOnSongs(logSong);
