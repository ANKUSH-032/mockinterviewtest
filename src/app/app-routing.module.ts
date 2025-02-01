import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileImportComponent } from './file-import/file-import.component';
import { QuestionTypeComponent } from './shared/modals/question-type/question-type.component';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { MainPageComponent } from './auth/main-page/main-page.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { HomeComponent } from './auth/home/home.component';


const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'login',component:MainPageComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
  { path: 'home', component: HomeComponent },
   // { path: 'profile', component: ProfileComponent },
    //{ path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]},
  {path:'file-import',component:FileImportComponent},
  {path:'question-type',component:QuestionTypeComponent},
  { path: 'question-display', component: QuestionDisplayComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 // { path: '**', redirectTo: '/dashboard' } // Handle any other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
