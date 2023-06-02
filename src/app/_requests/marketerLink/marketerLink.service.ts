import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleType } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: "root" })
export class MarketerLinkHttpService {
  private readonly baseUrl: string = environment.apiUrl + 'MarketerLink/';
  constructor(private http: HttpClient) { }

  GeneretLink(body: { marketerTypeName: string }): Observable<any> {
    return this.http.post(this.baseUrl + 'GeneretLink', body, { responseType: 'text' });
  }
  adminGeneretLink(body: { marketerTypeName: string }) {
    return this.http.post(this.baseUrl + 'AdminGeneretLink', body, { responseType: 'text' });
  }
  adminGeneretLinkForUsers(body: { marketerTypeName: RoleType, userId: number }) {
    return this.http.post(this.baseUrl + 'AdminGeneretLinkForUsers', body, { responseType: 'text' });
  }
}
