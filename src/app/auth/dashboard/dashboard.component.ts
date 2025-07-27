import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/service/service/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isMenuClosed = false;
  constructor(private router: Router,private layoutService: LayoutService,) { }

  ngOnInit(): void {
  }
 

  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    // clear token or session storage if needed
    localStorage.clear();
    this.layoutService.showSidebar(false);
    this.router.navigate(['/login']);
  }
}
