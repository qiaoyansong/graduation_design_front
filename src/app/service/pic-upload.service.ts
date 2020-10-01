import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicUploadService {

  constructor(private httpClient: HttpClient) { }
  public upLoadPic(body: any): Observable<any>{
    console.log(body);
    return this.httpClient.post('http://localhost:8080/test', body);
  }
}
