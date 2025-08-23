import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileImportComponent } from './file-import/file-import.component';
import { QuestionTypeComponent } from './shared/modals/question-type/question-type.component';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { MainPageComponent } from './auth/main-page/main-page.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthguardService } from './service/authguard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './auth/register/register.component';
import { CandidateListComponent } from './admin/candidate-list/candidate-list.component';
import { AnswerViewComponent } from './admin/answer-view/answer-view.component';


const routes: Routes = [
 // { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  {path:'',component:NotfoundComponent},
 //{ path: '**', redirectTo: '/main-page' },
  //{path:'main-page',component:MainPageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  // {path:'login',component:MainPageComponent},
    { path: 'dashboard', component: DashboardComponent,  children: [
    { path: 'home', component: HomeComponent },
    {path:'file-import',component:FileImportComponent, canActivate: [AuthguardService]},
    // { path: 'profile', component: ProfileComponent },
      //{ path: 'settings', component: SettingsComponent },
   // { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]},
  {path:'dashboard/file-import',component:FileImportComponent, canActivate: [AuthguardService]},
  {path:'dashboard/candidate-list',component:CandidateListComponent},
  {path:'question-type',component:QuestionTypeComponent, canActivate: [AuthguardService]},
  { path: 'question-display', component: QuestionDisplayComponent },
  {path:'dashboard/candidate-list/answer-view',component:AnswerViewComponent},
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/main-page' } // Handle any other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
