import ajax from 'superagent';
import SERVER_URL from '../config';

class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.userData = {};
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }

    isAdmin() {
        return this.isAdmin;
    }

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.removeItem('jwt-token');
        window.localStorage.removeItem('profile-id');
        window.location.replace('/');
    }
    checkUserType(userType) {
        this.isAdmin = userType === "admin" ? true : false;
    }

    checkForToken(callback) {
        let token = window.localStorage.getItem('jwt-token');

        if (!token) {
            this.isAuthenticated = false;
            callback(false);
        } else {
            this.checkTokenOnServer(token, callback);
        }
    }

    // the callback is not needed
    checkTokenOnServer(token, callback) {
        let postParams = {
            token: token
        };

        ajax.post(SERVER_URL + '/user/check-token')
            .send(postParams)
            .end((error, response) => {
                if (!!error) {
                    alert(error);
                    return;
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

    getUserData(callback) {

        this.checkForToken(() => {
            if (this.isAuthenticated) {
                let userId = window.localStorage.getItem('profile-id');

                ajax.post('http://localhost:3001/user/profile-data', { userId: userId })
                    .end((error, data) => {
                        if (!!error) {
                            this.isAdmin = false;
                            this.isAuthenticated = false;
                            callback({
                                user: {},
                                isAdmin: this.isAdmin,
                                isAuthenticated: this.isAuthenticated
                            })
                        }
                        else {
                            let userData = JSON.parse(data.text);
                            this.checkUserType(userData.type);
                            this.userData = userData;
                            callback({
                                user: userData,
                                isAdmin: this.isAdmin,
                                isAuthenticated: this.isAuthenticated
                            });
                        }
                    });
            }

        });
    }


}

export default new Auth();


