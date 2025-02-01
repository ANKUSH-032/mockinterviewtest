import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isMenuClosed = false;
  constructor() { }

  ngOnInit(): void {
  }
 

  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }
}
