class Song{
    constructor(id,title,singer,releaseDate,path){
        this.id = id;
        this.title = title;
        this.singer = singer;
        this.releaseDate = releaseDate;
        this.path = path;
    }

    static getAll(){
        return songs;
    }

}

const songs = [
    new Song(1,'Attention','Charlie Puth','May 20, 2024','/songs/Attention.mp3'),
    new Song(2,'Common Person','Burna Boy','May 20, 2024','/songs/CommonPerson.mp3'),
    new Song(3,'Country Side','Sarkodie','May 20, 2024','/songs/CountrySide.mp3'),
    new Song(4,'Ghost','Justin Bieber','May 20, 2024','/songs/Ghost.mp3'),
    new Song(5,'It Will Rain','Bruno Mars','May 20, 2024','/songs/ItWillRain.mp3'),
    new Song(6,'Last Last','Burna Boy','May 20, 2024','/songs/LastLast.mp3'),
    new Song(7,'Muse','Asake','May 20, 2024','/songs/Muse.mp3'),
    new Song(8,'The Lazy Song','Bruno Mars','May 20, 2024','/songs/TheLazySong.mp3'),
    new Song(9,'Tomorrow','Stonebwoy','May 20, 2024','/songs/Tomorrow.mp3'),
    new Song(10,'Uptown Funk','Bruno Mars','May 20, 2024','/songs/UptownFunk.mp3'),
];

module.exports = Song;