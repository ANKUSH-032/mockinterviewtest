import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})
export class AnswerViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
