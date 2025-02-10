import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d.*)(?=.*\\W.*)[a-zA-Z0-9\\S]{8,}$';
  firstNamePattern = '^[a-zA-Z ,.\'-]*$';
  numberPattern = '^[1-9]+[0-9]*$';
  nameWithSpacePattern = /^[a-zA-Z ,.'-]*$/i;
  addressPattern = '^[A-Za-z0-9\'\\.\\-\\s\\,\\:\\/\\?]*$';
  constructor() { }
}
