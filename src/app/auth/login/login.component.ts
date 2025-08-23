import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/Valiadate';
import { ApiService } from 'src/app/service/api.service';
import { LayoutService } from 'src/app/service/service/layout.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // @Input() public modalData: any;

  modalRef!: NgbModalRef;
  loginForm!: FormGroup;
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'password';
  submitted = false;
  fieldTextType: boolean = false;

  constructor(
    //  public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private authService: ApiService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.clearToken();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && event.url === '/login') {
        location.reload();
      }
    });
  }

  submitLogin() {
    //console.log("hhiii");
    this.layoutService.showSidebar(true);
    //this.router.navigateByUrl('dashboard/candidate-list');

    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.postRequest('Auth/login', loginData).subscribe(
        (res: any) => {
          if (res && res.status) {
            console.log(res);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', res.userdetails.token);
            this.storageService.set('user', res.data);
            this.storageService.set('token', res.userdetails.token);
            this.storageService.set('role', res.userdetails.role);
            this.toastr.success(res.message || 'Login successful');

            if (res.userdetails.role === '1') {
              
               this.authService.getRequest('ListApiEndpoint').subscribe(
              (listRes: any) => {
                this.storageService.set('dashboardList', listRes.data);
                this.router.navigateByUrl('/dashboard/home');
              },
              (err) => {
                this.toastr.error('Failed to load dashboard list');
                this.router.navigateByUrl('/dashboard/home'); // still navigate
              }
            );
          
              //this.close();
            } else {
              this.router.navigateByUrl('/list-appointment');
              this.storageService.set('patientuserId', res.userdetails.userId);
              //this.close();
            }
          } else {
            this.toastr.error(res.message || 'Login unsuccessful');
          }
        },
        (err) => {
          this.toastr.error(err?.message || 'Login request failed');
        }
      );
    } else {
      ValiadateForm.validateAllFormFileds(this.loginForm);

      this.toastr.error('Your form is invalid');
    }
  }

  // close(type: number = 0) {
  //   this.activeModal.close({ status: type });
  // }

  hideshowpass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }

  private clearToken() {
    localStorage.removeItem('token');
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
