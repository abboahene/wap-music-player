const Song = require('./song');

class User {
    constructor(id, name, password, playList) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.playList = [];
    }

    static login(name, password) {
        const user = users.find(u => u.name === name && u.password === password);
        const date = new Date();

        if (user) {
            const data = {
                username: user.name,
                token: `${name}@${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
            }

            return data;
        }
        else {
            throw new Error('Username or Password is incorrect');
        }
    }

    static getPlayList(name) {
        const user = users.find(u => u.name === name);
        if (user) {
            return {
                playlist: user.playList
            };
        } else {
            throw new Error('User not found!');
        }
    }

    static addSongToPlayList(name, songId) {
        const user = users.find(u => u.name === name);
        if (user) {
            if (songId) {
                if(user.playList.find(s=>s.id == songId)){
                    throw new Error('This song already added to the playlists');
                }
                user.playList.push(Song.getSong(songId));
                return {
                    playlist: user.playList
                };
            } else {
                throw new Error('Song cannot be empty!');
            }

        } else {
            throw new Error('User not found!')
        }
    }

    static deleteSongFromPlayList(name,songId){
        const user = users.find(u => u.name === name);
        if (user) {
            if (songId) {
                const index = user.playList.findIndex(s=>s.id==songId);
                if(index>-1){
                    user.playList.splice(index,1);
                    return {
                        playlist: user.playList
                    };
                }else{
                    throw new Error('Song not found with Id: '+songId);
                }
                
            } else {
                throw new Error('Song cannot be empty!');
            }

        } else {
            throw new Error('User not found!')
        }
    }

    static checkUser(name){
        const u = users.find(u=>u.name === name);
        if(u){
            return true;
        }
        throw new Error('Authentication failed!');
    }

}

const users = [
    new User(1, 'Benefo', '12345', []),
    new User(2, 'Gam', '12345', []),
    new User(3, 'Htet', '12345', [])
];



module.exports = User;