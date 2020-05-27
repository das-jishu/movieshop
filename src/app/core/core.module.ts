import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootNavbarComponent } from './components/boot-navbar/boot-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    BootNavbarComponent,
    HomeComponent,    
    LoginComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  exports: [
    BootNavbarComponent
  ]
})
export class CoreModule { }
