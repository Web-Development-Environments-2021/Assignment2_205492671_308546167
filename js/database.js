
const db = [
	{
		username: "k",
		password: "k",
        fullname: "k",
        email: "k@k.com",
        dateOfBirth: "19-04-2021"
	}
];

var onlineUser = null;


function addToDB(userID, pass, fname, mail, birthDate){
    newUser = {
        username: userID,
		password: pass,
        fullname: fname,
        email: mail,
        dateOfBirth: birthDate
    }
    db.push(newUser);

}

function verifyUser(UserID, pass){
    for(let i=0;i<db.length;i++){
        let user = db[i];
        if(user.username === UserID && user.password === pass){
            return true;
        } 
    }
    return false;
}