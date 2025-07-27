import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidates = [
    { firstName: 'Monica', lastName: 'Sharma', email: 'Test@gmail.com', testTopic: 'Pre-Visit and In-Hospital Behavior Assessment', score: null, needsCheck: true },
    { firstName: 'Vinay', lastName: 'Singh', email: 'Test@gmail.com', testTopic: 'Human Behavior Assessment', score: 38, needsCheck: false },
    { firstName: 'Roshini', lastName: 'Singh', email: 'Test@gmail.com', testTopic: 'Human Behavior Assessment', score: 27, needsCheck: false },
    // more...
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  answerview(){
    this.router.navigateByUrl('dashboard/candidate-list/answer-view')
  }

}
