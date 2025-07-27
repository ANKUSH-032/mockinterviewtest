import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  taketest(){
    console.log("hello")
    this.router.navigateByUrl('/question-display');
  }
}
