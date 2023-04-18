import { Component, OnInit } from '@angular/core';
import { loginModel } from './login.module';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: '../login/login.component.html',
    styleUrls: ['./login.component.scss']
})

export class loginComponent {
    public model: loginModel;
    showLoginWarningMessage: boolean = false;
    showLogoutWarningMessage: boolean = false;

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute) {
        this.model = new loginModel();
        
    }
    ngOnInit() {
        //let _tocken = JSON.parse
        if (this.auth.validateUserTocken){
            console.log("logout first")
            this.auth.showLogoutWarningMessage = true
            return this.router.navigate(['/dashboard'])
            
        }
        return false
    }

    login() {
        this.showLoginWarningMessage = false;
        if (this.auth.validateUserDetails(this.model)) {
            this.auth.setTocken();
            this.router.navigate(['/dashboard']);
        } else {
            console.log('Invalid credentials');
            this.showLoginWarningMessage = true;
        }

    }
}