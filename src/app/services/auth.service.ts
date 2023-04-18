import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  userData: Array<{}>;
  tocken: Number = 0;
  tockenDetails: String = '';
  showLogoutWarningMessage: boolean = false;
    constructor() {
        this.userData = [
            {emailId: 'soumya7890@gmail.com', password: 'soumya123'},
            {emailId: 'test@gmail.com', password: 'test123'}

        ]
    }
    setTocken() {
        this.tocken = new Date().getTime();
        sessionStorage.setItem('tocken', JSON.stringify(this.tocken));
    }
    validateUserTocken() {
        this.tockenDetails = sessionStorage.getItem('tocken');
        //let _tocken = JSON.parse
        if (this.tockenDetails != null) {
            return true;
        } else {
            return false;
        }

    }
    //Validating User input data 
    validateUserDetails(user) {
        let _userList = this.userData;
        for (var i = 0; i < _userList.length; i++) {
            if (user.emailId.toLowerCase() == _userList[i]['emailId'].toLowerCase() && user.password == _userList[i]['password']) {
                return true;
            }
        }
        return false;
    }
    logout() {
        sessionStorage.clear();
    }
  
}
