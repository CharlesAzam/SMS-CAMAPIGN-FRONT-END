import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment }from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SmsCampaignService {
  private static header = new HttpHeaders().set('Accept','application/json');
  constructor(private http: HttpClient) {
  }

  //Create Campaing Channel
  createCampaingChannel(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/create-campaign-channel';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<any>(url, payload, { headers });
  }
  //Update Capmpaing Channel
  updateCampaingChannel(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/campaign-create';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.patch<any>(url, payload, { headers });
  }
  //Delete Campaing Channel
  deleteCampaingChannel(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/campaign-delete';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, payload);
  }
  //Get Channel by ID
  //Get All channels

  //Create message
  createCampaingMessage(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl +'/cms/create-campaign-message';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<any>(url, payload, { headers });
  }
  //Update Message
  updateCampaingMessage(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/update-campaign-message';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.patch<any>(url, payload, { headers });
  }
  //Delete Message
  deleteCampaingMessage(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/delete-campaign-message';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.patch<any>(url, payload, { headers });
  }
  //Get Message By Id
  //Map message



}
