import { Injectable } from '@angular/core';
import { APIServiceService } from './apiservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) { }

  public generateUUID() {
    const vmsUUID = uuid.v4();
    return vmsUUID;
  }

  public saveEvent(search:any):Observable<any> {
    var uuid = this.generateUUID();
    var sear = new URLSearchParams(search);
    const url = "https://prd.srgvmsapi.com/vms/promotionevent/v1/create";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(search), {headers:headers});
  }
  public searchEvent(search:any):Observable<any> {
    var uuid = this.generateUUID();
    var sear = new URLSearchParams(search);
    const url = "https://prd.srgvmsapi.com/vms/promotionevent/v1/search";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(search), {headers:headers});
  }
  public updateEvent(search:any):Observable<any> {
    var uuid = this.generateUUID();
    var sear = new URLSearchParams(search);
    const url = "https://prd.srgvmsapi.com/vms/promotionevent/v1/update";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(search), {headers:headers});
  }
}
