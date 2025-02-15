import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Route, Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/Valiadate';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // @Input() public modalData:any;
  // modalRef!: NgbModalRef;
  loginForm!: FormGroup;
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'Password';
  loginData: any;
  message: string = "Login Success"
  submitted = false;
  username: any;
  password: any;
  fieldTextType :boolean = false

  constructor(
   // public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router : Router,
    private authService: ApiService,
    private route : Router,
    private storageService : StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    // this.clearToken();
    // this.route.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd && event.url === '/login') {
    //     // Refresh the page when navigating back to the login page
    //     location.reload();
    //   } 
    // });
  }
  refreshPage() {
    throw new Error('Method not implemented.');
  }

 

  // close(type:number = 0){
  //   this.activeModal.close({status: type});
  // }

  // submitLogin() {
    
  //   this.router.navigate(["/dashboard/home"])
  //   if (this.username && this.password) {
  //     //alert(`Welcome, ${this.username}!`);
  //    // this.closeLogin();
  //   } else {
  //     alert('Please enter valid credentials.');
  //   }
  // }


  // submitLogin() {
  //   // debugger;
  //    this.submitted = true;
   
  //    if (this.loginForm.valid) {
  //      const loginData = this.loginForm.value;
 
  //      this.authService.postRequest('Auth/login', loginData).subscribe(
  //        (res: any) => {
           
  //          if (res && res.status) {
          
  //            localStorage.setItem('isLoggedIn', 'true');
  //            localStorage.setItem('token', res.userdetails.token);
  //            this.storageService.set('user', res.data);
  //            this.storageService.set('token', res.userdetails.token);
  //            this.storageService.set('role', res.userdetails.role);
  //            this.toastr.success(res.message || 'Login successful'); 
  //            console.log(res.userdetails.role);
             
  //            if(res.userdetails.role === 'admin'){
  //              this.route.navigateByUrl('/list-admin');
  //            }else if(res.userdetails.role === 'doctor'){
  //              this.route.navigateByUrl('/list-patients');
  //              this.storageService.set('doctoruserId', res.userdetails.userId);
  //            }else{
  //              this.route.navigateByUrl('/list-appointment');
  //              this.storageService.set('patientuserId', res.userdetails.userId);
  //            }
            
  //          } 
  //          else  {
            
  //            this.toastr.error(res.message || 'Login unsuccessful'); 
  //          }
  //        },
  //        (res) => {
  //          this.toastr.error(res.message || 'Login unsuccessful');
  //         // this.toastr.error('Error in login request'); 
  //        }
  //      );
   
  //    } else {
       
  //      ValiadateForm.validateAllFormFileds(this.loginForm);
  //      this.toastr.error('Your form is invalid');
  //    }
  //  }
  //  private clearToken() {
 
  //    localStorage.removeItem('token');
    
  //  }

  // hideshowpass() {
  //   this.isText = !this.isText;
  //   this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  //   this.isText ? (this.type = 'text') : (this.type = 'password');
  // }
}
