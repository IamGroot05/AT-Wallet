import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(
    public auth: AuthService, 
    private router: Router, 
    private route :ActivatedRoute,
    ) { }     
  
  logOut() {
    this.auth.logout();
    this.router.navigate(['login']);
}

}
