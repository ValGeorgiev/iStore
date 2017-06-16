import ajax from 'superagent';

class Auth{
	constructor() { 
        this.isAuthenticated = false;
        this.isAdmin= false; 
	}

    isAuthenticated(){
        return this.isAuthenticated;
    }
    isAdmin(){
        return this.isAdmin;
    }
    login(){
        this.isAuthenticated= true ; 
    }
    logout(){
        this.isAuthenticated= false ;         
    }
    checkForToken(callback){
        let token = window.localStorage.getItem('jwt-token');
        token = JSON.parse(token);
        if(token == null ||  token == undefined ){
              this.isAuthenticated= false;
              callback(false);
        }else{ 
            this.checkTokenOnServer(token,callback);
        }

    }

    checkTokenOnServer(token,callback){
        let postParams = {token:token};
        ajax.post('http://localhost:3001/user/check-token',postParams)
        .end((error,response)=>{
            if(!!error){
                alert(error);
                return 0; 
            }
            if(response.body.success == true){
                this.isAuthenticated = true; 
            }else{
                this.isAuthenticated = false;
                alert(response.body.err);
            } 
            callback(this.isAuthenticated);           
        });
    }

}
var auth = new Auth(); 
export default auth;


