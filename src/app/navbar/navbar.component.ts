import { Component, Input , Output, EventEmitter} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  @Input()showHistoryflag: boolean = false;
  @Input()showWalletflag: boolean = false;

  @Output() newHistoryflag = new EventEmitter<boolean>();
  @Output() newWalletflag = new EventEmitter<boolean>();



  constructor(
    public auth: AuthService, 
    private router: Router, 
    private route :ActivatedRoute,
  
    ) {}    
  
  showHistory(){
    this.newHistoryflag.emit(true);
    return this.showHistoryflag
  }

  showWallet(){
    this.newWalletflag.emit(true)
  } 
  
  logOut() {
    this.auth.logout();
    this.router.navigate(['login']);
}

closeButton(){
  this.auth.showLogoutWarningMessage = false;
}
}
