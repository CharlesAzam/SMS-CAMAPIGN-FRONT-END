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

  //Create Campaing Channel
  createCampaingCahnnel(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/campaign-create';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<any>(url, payload, { headers });
  }
  //Update Capmpaing Channel
  //Delete Campaing Channel
  //Get Channel by ID
  //Get All channels

  //Create message
  //Update Message
  //Delete Message
  //Get Message By Id
  //Map message



}
