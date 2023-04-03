import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GetconfigService {

  constructor(private http: HttpClient) { }
  public generateUUID() {
    const vmsUUID = uuid.v4();
    return vmsUUID;
  }
  public getConfiguration():Observable<any> {
    var uuid = this.generateUUID();
    var usrName = {
      userName: 'admin'
    }
    const url = "https://prd.srgvmsapi.com/vms/config/v1/fetch";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(usrName), {headers: headers});
  }
  public getConfigurationUser(uname:any):Observable<any> {
    var uuid = this.generateUUID();
    var usrName = {
      userName: uname
    }
    const url = "https://prd.srgvmsapi.com/vms/config/v1/fetch";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    // return this.http.get(url, {headers:headers});
    return this.http.post(url, JSON.stringify(usrName), {headers: headers});
  }
  getConfigData() {
    return new Promise((resolve, reject)=> {
      let configData = JSON.parse(localStorage.getItem("configData") || '{}');
      resolve(configData);
    })
  }
}
