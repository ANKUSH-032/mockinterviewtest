import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  totalCandidates = 150;
  totalInterviews = 80;
  upcomingInterviews = 10;
  interviewsPassed = 50;
  interviewsFailed = 30;
  constructor() { }

  ngOnInit(): void {
  }

}
