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
    let url = environment.apiUrl + '/cms/update-campaign-channel';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, payload, { headers });
  }
  //Delete Campaing Channel
  deleteCampaingChannel(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload._id,null,2))
    let url = environment.apiUrl + `/cms/campaign-delete/${payload._id}`;
    let params = {id:payload._id}
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url,{headers});
  }
  //Get message for table
  getMessages(pageNumber:any, size:any){
    //console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
    let url = environment.apiUrl + '/cms/messages';
    let headers = new HttpHeaders()
    let params ={
      pageNumber:pageNumber,
      size:size
    }
    return this.http.get<any>(url, { params,headers },)
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
    let url = environment.apiUrl + `/cms/update-campaign-message/${payload._id}`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, payload, { headers });
  }
  //Delete Message
  deleteCampaingMessage(payload: any){
    console.log("Received paylod for POST Request \n",JSON.stringify(payload._id,null,2))
    let url = environment.apiUrl + `/cms/delete-campaign-message/${payload._id}`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url,{headers});
  }
    //Get message for table
    getCampaign(pageNumber:any, size:any){
      //console.log("Received paylod for POST Request \n",JSON.stringify(payload,null,2))
      let url = environment.apiUrl + '/cms/campaigns';
      let headers = new HttpHeaders()
      let params ={
        pageNumber:pageNumber,
        size:size
      }
      return this.http.get<any>(url, { params,headers },)
    }
  //Get Message By Id
  //Map message



}
