import { Component, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user?: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getLoggedInUser();
    console.log(this.user);
  }
  closeSesion() {
    this.authService.logout();
  }
}
