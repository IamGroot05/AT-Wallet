import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent } from './login/login.component';
import { EWalletComponent } from './e-wallet/e-wallet.component'
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from './services/auth-guard.guard';

export const routes: Routes = [
  {path: '' , redirectTo: 'login',pathMatch: 'full'},
  { path: 'dashboard', component: EWalletComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: loginComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
