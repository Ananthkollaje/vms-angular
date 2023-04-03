import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private http: HttpClient) { }

  public generateUUID() {
    const vmsUUID = uuid.v4();
    return vmsUUID;
  }

  public getVouchers(search:any):Observable<any> {
    var uuid = this.generateUUID();
    var sear = new URLSearchParams(search);
    const url = "https://prd.srgvmsapi.com/vms/voucher/v1/search";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    console.log(search);
    return this.http.post(url, JSON.stringify(search), {headers:headers});
  }
}

