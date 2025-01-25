import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileImportComponent } from './file-import/file-import.component';
import { QuestionTypeComponent } from './shared/modals/question-type/question-type.component';
import { QuestionDisplayComponent } from './question-display/question-display.component';


const routes: Routes = [
  {path:'',component:FileImportComponent},
  {path:'file-import',component:FileImportComponent},
  {path:'question-type',component:QuestionTypeComponent},
  { path: 'question-display', component: QuestionDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
