

class User {
    constructor(id, name, password, playList) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.playList = [];
    }

    static login(name, password){
        const user = users.find(u => u.name === name && u.password === password) ;
        const date = new Date();

        if(user){
            return `${name}@${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
        else{
            throw new Error('Username or Password is incorrect');
        }
    }s

}

const users = [
    new User(1, 'Benefo','12345', null),
    new User(2, 'Gam', '12345', null),
    new User(3, 'Htet', '12345', null)
];



module.exports =User;