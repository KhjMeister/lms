﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { AlertifyService } from '@app/_services/alertify.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    url:any = '/';
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertify:AlertifyService,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
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
                    this.alertify.success('با موفقیت وارد شدید');
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
