import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseURL = environment.api_url;
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  loader: any;
  constructor(private httpClient: HttpClient, 
    private ngxUiLoaderService: NgxUiLoaderService,) {this.loader = this.ngxUiLoaderService.getLoader(); }

  getRequest(url: string): Observable<any> {
    this.ngxUiLoaderService.startLoader(this.loader.loaderId);
    return this.httpClient.get(baseURL + url).pipe(map((response : any) => {
      setTimeout(() => this.ngxUiLoaderService.stopLoader(this.loader.loaderId), 500)

      return response;
    }));
  }

  postRequest(url: string, data: any, isLoader: boolean = true): Observable<any> {
    if (isLoader) {
      this.ngxUiLoaderService.startLoader(this.loader.loaderId);
    }
  
    return this.httpClient.post(baseURL + url, data).pipe(
      map((response: any) => {
        // Stop loader immediately after receiving a response (success or failure)
        this.ngxUiLoaderService.stopLoader(this.loader.loaderId);
        return response;
      }),
      catchError((error) => {
        // Stop loader immediately on error
        this.ngxUiLoaderService.stopLoader(this.loader.loaderId);
        // Rethrow the error so it can be handled in the component
        return throwError(error);
      })
    );
  }
  
}
