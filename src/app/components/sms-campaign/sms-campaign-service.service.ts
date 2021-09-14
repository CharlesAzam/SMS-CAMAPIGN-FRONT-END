import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment }from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SmsCampaignServiceService {
  private static header = new HttpHeaders().set('Accept','application/json');
  constructor(private http: HttpClient) {
  }

  //Create Channel
  //Update Channel
  //Delete Channel
  //Get Channel by ID
  //Get All channels

  //Create message
  //Update Message
  //Delete Message
  //Get Message By Id
  //Map message



}
