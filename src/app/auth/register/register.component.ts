import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

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
    
    //private storageService: StorageServiceService,
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
      HospitalName: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Gender: ['', Validators.required],
      Password: ['', Validators.required],
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
    this.router.navigate(["/dashboard/home"])
    // if (this.signupForm.valid) {

    //   this.auth.postRequest('Patient/insert', this.signupForm.value).subscribe({
    //     next: (res: any) => {
    //       this.toastr.success(res.message + " Kindly Login to the site");
    //       // Redirect to the login page after a successful signup
    //      // const token = this.storageService.get('token')
          
          
    //       // if (token != null) {
    //       //   this.route.navigate(['/list-patients']);
    //       // } else {
    //       //   this.route.navigateByUrl('/login');
    //       // }



    //     },
    //     error: (res: any) => {
    //       this.toastr.error(res.message);
    //     }
    //   });
    // } else {
    //   //ValiadateForm.validateAllFormFileds(this.signupForm);
    //   this.toastr.error('You form is invalid');
    // }

  }

viewButton(){
 // this.storageService.get('token')
}

}
