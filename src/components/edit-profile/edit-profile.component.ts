import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Gender, User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  constructor(private localStorageService: LocalStorageService, private routerService: RouterService) {}

  currentUser: User = this.localStorageService.getItem("currentUser") as User;
  users: User[] = this.localStorageService.getItem("users") as User[];
  gender: string = this.currentUser.gender == Gender.Male ? "male" : "female";

  onInputDone() {
    this.localStorageService.setItem("currentUser", this.currentUser);
    
    this.saveCurrentUser();
  }



  saveCurrentUser() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.currentUser.id) {
        this.users[i] = this.currentUser;
        this.localStorageService.setItem("users", this.users);
        return;
      }
    }
  }

  onGenderDone() {
    this.currentUser.gender = Gender.Female;
    if (this.gender == "male")
      this.currentUser.gender = Gender.Male;

    this.onInputDone();
  }

  goToUnimplemented() {
    this.routerService.navigateTo("unimplemented");
  }
}
