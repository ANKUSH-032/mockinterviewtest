import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuestionTypeComponent } from '../shared/modals/question-type/question-type.component';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss'],
})
export class FileImportComponent implements OnInit {
  file: File | null = null;
  fileName: string | null = null;
  errorMessage: string | null = null;
  modalRef!: NgbModalRef;
  question_type: any[] = []
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private route : Router,
    private modalService: NgbModal, 
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      // Validate MIME type for Excel files
      const validTypes = [
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      ];

      if (!validTypes.includes(selectedFile.type)) {
        this.errorMessage =
          'Invalid file type. Please upload a .xls or .xlsx file.';
        this.file = null;
        this.fileName = null;
      } else {
        this.errorMessage = null;
        this.file = selectedFile;
        this.fileName = selectedFile.name;
      }
    }
  }
  onSubmit(): void {
    if (!this.file) {
      this.toastr.warning('Please select a file before submitting.');
      return;
    }
  
    const formData = new FormData();
    formData.append('ImportFile', this.file);
  
    const url = 'BulkImport/questionimport';
  
    this.apiService.postRequest(url, formData).subscribe(
      (res: any) => {
        // Success case
        if (res.status) {
          this.toastr.success(res.message || 'File imported successfully!');
  
          // Wait for the questionget API response before opening the modal
          setTimeout(() => {
            this.apiService.getRequest('BulkImport/questionget').subscribe(
              (res: any) => {
                this.question_type = res.data;
  
                // Prepare modal data
                const modaldata = {
                  title: 'Select any langauge from dropdown.',
                  des: 'Your email address is required for video class registration',
                  showConfirmButton: true,
                  confirmButtonText: 'Ok',
                  showCancelButton: true,
                  question_type: this.question_type,
                };
  
                const ngbModalOptions: NgbModalOptions = {
                  backdrop: 'static',
                  keyboard: false,
                  ariaLabelledBy: 'delete-modal',
                  centered: true,
                  size: 'md',
                };
  
                // Open the modal
                this.modalRef = this.modalService.open(QuestionTypeComponent, ngbModalOptions);
                this.modalRef.componentInstance.modalData = modaldata;
  
              },
              (error) => {
                // Handle error in questionget API
                this.toastr.error('Failed to retrieve question data.');
                console.error('Error fetching question data:', error);
              }
            );
          }, 300); // Optional delay before opening modal
        } else {
          this.toastr.error(res.message || 'Duplicate data found.');
        }
      },
      (error) => {
        // Error case (such as 400 Bad Request)
        if (error.status === 400) {
          this.toastr.error(error.error?.message || 'Duplicate data found.');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again.');
        }
  
        console.error('API Error:', error);
      }
    );
  }
  
  
  
  // onSubmit(): void {
  //   if (!this.file) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('ImportFile', this.file);

  //   this.spinner.show(); // Show spinner
  //   let url = 'BulkImport/questionimport';
  //   this.apiService.postRequest(url, formData).subscribe((res) => {
  //     console.log(res);
  //     const result = res.json();

  //     this.spinner.hide(); // Hide spinner on success

  //     if (res.status) {
  //       this.toastr.success(res.message || 'File imported successfully!');
  //     } else {
  //       this.toastr.error(res.message || 'Duplicate data found.');
  //     }
  //   });
  // }
}
