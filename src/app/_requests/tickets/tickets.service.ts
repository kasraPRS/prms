import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private readonly baseUrl: string = environment.apiUrl + 'Reward/';

  constructor(private http: HttpClient) {}
}
