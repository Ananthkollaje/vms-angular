import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private http: HttpClient) { }
  public generateUUID() {
    const vmsUUID = uuid.v4();
    return vmsUUID;
  }

  public addSysConfig(add:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/change";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(add), {headers: headers});
  }
  public searchConfig(search:any):Observable<any> {
    var uuid = this.generateUUID();
    var sear = new URLSearchParams(search);
    const url = "https://prd.srgvmsapi.com/vms/config/v1/search";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(search), {headers:headers});
  }

  public deleteConfig(deleteCon:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/change";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    })
            const httpOptions = {
                headers: headers,
                body: deleteCon
            };
    return this.http.post(url, JSON.stringify(deleteCon), {headers:headers});
  }

  public updateSysConfig(update:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/change";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(update), {headers: headers});
  }

  public searchSourceSysConfig(update:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/searchsourcemarket";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(update), {headers: headers});
  }

  public createSourceSysConfig(update:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/changesourcemarket";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(update), {headers: headers});
  }

  public updateSourceSysConfig(update:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/changesourcemarket";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(update), {headers: headers});
  }

  public deleteSourceSysConfig(update:any):Observable<any> {
    var uuid = this.generateUUID();
    const url = "https://prd.srgvmsapi.com/vms/config/v1/changesourcemarket";
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-api-key': 'mR7AqpSu9A1uT2KeqYWdi1intOsippix6lmLt9LM',
      'x-consumedBy': 'VMSAPP',
      'x-correlationId': uuid.toString()
    });
    return this.http.post(url, JSON.stringify(update), {headers: headers});
  }

 }
