import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navList = ["Home", "Tv Shows", "News & Popular", "My List", "Browse by Language"];
  auth = inject(AuthService);
  name = JSON.parse(localStorage.getItem("loggedInUser")!).name;
  userProfileIMG = JSON.parse(localStorage.getItem("loggedInUser")!).picture;
  userEmail = JSON.parse(localStorage.getItem("loggedInUser")!).email;

  signOut()
  {
    this.auth.signOut();
  }
}
