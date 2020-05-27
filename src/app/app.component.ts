import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieshop';
  constructor( private userService: UserService, private auth: AuthService, private router: Router ) {
    this.auth.user$.subscribe(user => {
      if (user) 
      {
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl)
        {
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
        
      }
    });
  }


}
