import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  url:any = '/';
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertify:AlertifyService,
    private authenticationService: AuthenticationService) {
      // redirect to home if already logged in
      if (this.authenticationService.userValue) {
        this.router.navigate(['/']);
    }
     }

     ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
          password_confirmation: ['', Validators.required]
      },{ validator:this.PasswordMatchValidator('password','password_confirmation')
    });
  }

  PasswordMatchValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordMatchValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.firstName.value,this.f.lastName.value,this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page

                const user = this.authenticationService.userValue;
                if(user){
                    if (user.role == 'User') {
                        this.url = 'user/dashboard';
                    }else if (user.role == 'Admin'){
                        this.url = 'admin/dashboard';
                    }else if (user.role == 'Instructor'){
                        this.url = 'instructor/dashboard';
                    }
                }

                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.url;
                this.alertify.success('با موفقیت ثبت نام شدید');
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                this.error = error;
                this.alertify.error(error);
                this.loading = false;
            }
        });
}

}
