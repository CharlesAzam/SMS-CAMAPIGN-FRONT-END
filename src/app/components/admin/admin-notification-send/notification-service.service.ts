import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private http: HttpClient) { }

  //Send Group Notification and Single No
  sendNotification(data) {
   console.log("Send Notification caled with data \n",data)
   console.log("API ",environment.apiUrl)
    let url = environment.apiUrl + '/cms/send-notification';
    // let headers = new HttpHeaders()
    //   .set('Accept', 'application/json');
    return this.http.post<any>(url, data);
  }
}
