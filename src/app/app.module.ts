import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileImportComponent } from './file-import/file-import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './service/api.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";
import { HttpClientModule } from '@angular/common/http';
import { QuestionTypeComponent } from './shared/modals/question-type/question-type.component';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { MainPageComponent } from './auth/main-page/main-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { HomeComponent } from './auth/home/home.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { CandidateListComponent } from './admin/candidate-list/candidate-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 30,
  "bgsType": "cube-grid",
  "blur": 0.2,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "rgba(238, 143, 144, 1)",
  "fgsPosition": "center-center",
  "fgsSize": 30,
  "fgsType": "ball-spin",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40,40,40,0.29)",
  "pbColor": "rgba(238, 143, 144, 1)",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};
@NgModule({
  declarations: [
    AppComponent,
    FileImportComponent,
    QuestionTypeComponent,
    QuestionDisplayComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    AdminAddComponent,
    AdminListComponent,
    CandidateListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
