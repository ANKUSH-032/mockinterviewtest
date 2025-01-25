import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.scss']
})
export class QuestionTypeComponent implements OnInit {
  @Input() public modalData: any;
  selectedLanguage: any;
  questionTypes: any[] = []; 
  question_list: any[] = [];
  constructor(public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if modalData contains the question_type array
    if (this.modalData && this.modalData.question_type) {
      this.questionTypes = this.modalData.question_type; // Assign to local array
    }
  }

  close(type: number = 0): void {
    // Closes the modal and sends data back (if needed)
    this.activeModal.close({ status: type });
  }

  onSubmit(): void {
    console.log('Selected Language:', this.selectedLanguage);
    const formData = {
      "questionType": this.selectedLanguage
    }
    
    // You can call activeModal.close() here as well if you want to close the modal on submit.
   this.apiService.postRequest('BulkImport/questionlist',formData).subscribe((res : any)=>{
  if(res.status){
    console.log(res.data);
    this.question_list = res.data;

    this.activeModal.close();
      this.router.navigate(['/question-display'], { state: { questions: res.data } });
  }

})

    this.activeModal.close({ status: 1, language: this.selectedLanguage });
  }
}
