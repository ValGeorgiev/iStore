import ajax from 'superagent';
import SERVER_URL from '../config';

class Auth {
	constructor() { 
        this.isAuthenticated = false;
        this.isAdmin= false; 
	}

    isAuthenticated() {
        return this.isAuthenticated;
    }

    isAdmin() {
        return this.isAdmin;
    }

    login() {
        this.isAuthenticated= true ; 
    }

    logout() {
        this.isAuthenticated= false ;         
        window.localStorage.removeItem('jwt-token');
        window.localStorage.removeItem('profile-id');   
        window.location.replace('/');
    }

    checkForToken(callback) {
        let token = window.localStorage.getItem('jwt-token');
        token = JSON.parse(token);
        if (!token) {
            this.isAuthenticated = false;
            callback(false);
        } else { 
            this.checkTokenOnServer(token,callback);
        }
    }

    checkTokenOnServer(token, callback){
        let postParams = {
            token: token
        };

        ajax.post(SERVER_URL + '/user/check-token', postParams)
            .end((error,response) => {
                if (!!error) {
                    alert(error);
                    return 0; 
                }
                if (response.body.success) {
                    this.isAuthenticated = true; 
                } else {
                    this.isAuthenticated = false;
                    alert(response.body.err);
                } 
                callback(this.isAuthenticated);           
            });
    }
}

export default new Auth();


