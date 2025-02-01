import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() public modalData:any;
  modalRef!: NgbModalRef;
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
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

 

  close(type:number = 0){
    this.activeModal.close({status: type});
  }

  submitLogin() {
    this.activeModal.close();
    this.router.navigate(["/dashboard/home"])
    // if (this.username && this.password) {
    //   //alert(`Welcome, ${this.username}!`);
    //  // this.closeLogin();
    // } else {
    //   alert('Please enter valid credentials.');
    // }
  }
  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
