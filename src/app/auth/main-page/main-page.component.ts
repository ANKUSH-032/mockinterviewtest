import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  modalRef!: NgbModalRef;
  constructor(private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  login() {
    console.log("hi")
   // this.router.navigate(['/login']);
    //alert('Redirecting to Login Page!');
    // console.log("yes1");
    // const modaldata = {
      
    //   //title: 'Confirmation Message',
    //   // des: 'Thank you for joining the waitlist for this class. An email will be sent when a space opens up or if we open another class for this topic.',
    //   showConfirmButton: true,
    //   confirmButtonText: 'Yes',
    //   showCancelButton: true,
    //   cancelButtonText: 'No',
    // };
    // const ngbModalOptions: NgbModalOptions = {
      
    //   backdrop: 'static',
    //   keyboard: false,
    //   ariaLabelledBy: 'delete-modal',
    //   centered: true,
    //   size: 'md',
    // };
    // this.modalRef = this.modalService.open(LoginComponent, ngbModalOptions);
    // this.modalRef.componentInstance.modalData = modaldata;
    // console.log("yes");
    this.router.navigateByUrl('/login');
  }

  register() {
    const modaldata = {
      //title: 'Confirmation Message',
      // des: 'Thank you for joining the waitlist for this class. An email will be sent when a space opens up or if we open another class for this topic.',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
    };
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'delete-modal',
      centered: true,
      size: 'md',
    };
    this.modalRef = this.modalService.open(RegisterComponent, ngbModalOptions);
    this.modalRef.componentInstance.modalData = modaldata;
  }
}
