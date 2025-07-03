import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PermissionEnum } from '../../model/permission-enum';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  
  loginForm: any;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { if(this.loginForm!=null) return this.loginForm.controls; else return null }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm==null || this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    var username = (this.f != null) ? this.f['username'].value : '';
    this.authenticationService.login(username, this.f!=null? this.f['password'].value:'')
      .pipe(first())
      .subscribe(
        data => {
          const defaultUrl = this.getDefaultUrlForUser();
          this.router.navigate([defaultUrl]);
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
  getDefaultUrlForUser() {
    var returnValue = this.returnUrl;
    var permissions = this.authenticationService.currentUserPermissions;
    var permissionId = -1;
    if (!!permissions && permissions.length > 0) {
      permissionId = parseInt(permissions[0].toString(), 10);
    }
    if (!!permissionId) {
      switch (permissionId) {
        case PermissionEnum.Player:
          returnValue = '/home';
          break;
        case PermissionEnum.Admin:
          returnValue = '/home';
          break;
        default:
          break;
      }
    }
    return returnValue;
  }
}
