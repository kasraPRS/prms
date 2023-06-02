import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UTaskModelFilter, UTask_getAllUTasksFilter, UTask_getUTask } from './utaskModel';

@Injectable({
    providedIn: 'root',
})
export class UTaskHttpService {

    private readonly baseUrl: string = environment.apiUrl + `UTask`

    constructor(private http: HttpClient) { }

    getAllUTasksFilter(data: UTaskModelFilter): Observable<UTask_getAllUTasksFilter[]> {
        const url = this.baseUrl + `/getAllUTasksFilter?Type=${data.type}&UserId=${data.assiegnedToId}&Date=${data.date}&Priority=${data.priority}&State=${data.state}`
        const result = this.http.get<UTask_getAllUTasksFilter[]>(url);
        return result;
    }

    getUTask(_id: number) {
        const url = this.baseUrl + `/getUTask?id=${_id}`
        const result = this.http.get<UTask_getUTask>(url);
        return result;
    }

    create(_data: any): Observable<any> {
        const url = this.baseUrl
        const data = {
            title: _data._title,
            description: _data._description,
            dueDate: _data._dueDate,
            reminderTime: _data._reminderTime,
            assiegnedToId: _data._assiegnedToId,
            type: _data._type,
            priority: _data._priority,
            reminder: _data._reminder,
            isActive: _data._isActive,
            sms: _data._sms,
            email: _data._email
        }
        const request = this.http.post(url, data, { responseType: 'text' });
        return request
    }

    update(_data: any): Observable<any> {
        const url = this.baseUrl
        const data = {
            id: _data._id,
            title: _data._title,
            description: _data._description,
            dueDate: _data._dueDate,
            reminderTime: _data._reminderTime,
            assiegnedToId: _data._assiegnedToId,
            type: _data._type,
            priority: _data._priority,
            reminder: _data._reminder,
            isActive: _data._isActive,
            sms: _data._sms,
            email: _data._email
        }
        const request = this.http.put(url, data, { responseType: 'text' });
        return request
    }

}
