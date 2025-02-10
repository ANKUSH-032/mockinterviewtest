import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/Valiadate';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;
  genderOptions: any;
  roleOptions: any;
  constructor(private fb: FormBuilder,
    private auth: ApiService, 
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router : Router,
    private storageService: StorageService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ];


    this.signupForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email: ['', Validators.required],
      Address: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Gender: ['', Validators.required],
      Password: [Validators.required, Validators.pattern(this.commonService.passwordPattern)],
      ConfirmPassword:['',Validators.required],
    });
  }
  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  close(type:number = 0){
    this.activeModal.close({status: type});
  }

  onSignup() {
    this.activeModal.close();
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth.postRequest('Candidate/insert', this.signupForm.value).subscribe({
        next: (res: any) => {
          this.activeModal.close();
          this.toastr.success(res.message + " Kindly Login to the site");
          const token = this.storageService.get('token');
  
          if (token != null) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigateByUrl('/login');
          }
        },
        error: (res: any) => {
          if (res.status === 409) {
            this.toastr.error('A user with the same details already exists. Please try with different credentials.');
          } else {
            this.toastr.error(res.message || 'An unexpected error occurred.');
          }
        }
      });
    } else {
      ValiadateForm.validateAllFormFileds(this.signupForm);
      this.toastr.error('Your form is invalid');
    }
  }
  
viewButton(){
  this.storageService.get('token')
}

}
