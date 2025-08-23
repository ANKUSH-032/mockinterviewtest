import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

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
  dashboardList: any[] = [];
  loading = false;
  constructor(private router: Router,
     private authService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDashboardList();
  }

  loadDashboardList() {
    this.loading = true;
    this.authService.getRequest('ListApiEndpoint').subscribe(
      (res: any) => {
        this.dashboardList = res.data || [];
        this.loading = false;
      },
      (err) => {
        this.toastr.error('Failed to load dashboard list');
        this.loading = false;
      }
    );
  }
  taketest(){
    console.log("hello")
    this.router.navigateByUrl('/question-display');
  }
}
