import { Injectable } from '@angular/core';;
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '../../../../environments/environment';
import { notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private http: HttpClient) { }

  //Send Group Notification and Single No
  sendNotification(data) {
   console.log("Send Notification caled with data \n",data)
   console.log("API ",API)
    let url = API.BASE_URL + '/cms/send-notification';
    // let headers = new HttpHeaders()
    //   .set('Accept', 'application/json');
    return this.http.post<any>(url, data);
  }
}
