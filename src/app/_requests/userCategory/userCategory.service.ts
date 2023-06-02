import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationModel as Pagination } from '../../_modules/table-pagination/table-pagination.component';
import { HttpParamsService } from '../../_services/http-params.service';
import { UserCategory_GetAllDTO, UserCategory_getDTO, UserCategory_GetUserCategoriesByUserCountDTO } from './userCategoryModel';

@Injectable({
    providedIn: 'root',
})
export class UserCategoryHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'UserCategory/'
    constructor(private http: HttpClient) { }

    get(params: {
        Name: string | null,
        PageNumber: number | null,
        PageSize: number | null,
    }): Observable<Pagination<UserCategory_getDTO[]>> {
        return this.http.get<Pagination<UserCategory_getDTO[]>>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
    }
    GetAll(): Observable<Pagination<UserCategory_GetAllDTO[]>> {
        return this.http.get<Pagination<UserCategory_GetAllDTO[]>>(`${this.baseUrl}`);
    }
    GetUserCategoriesByUserCount(params?: { userId: number }): Observable<UserCategory_GetUserCategoriesByUserCountDTO[]> {
        return this.http.get<UserCategory_GetUserCategoriesByUserCountDTO[]>(
            `${this.baseUrl}GetUserCategoriesByUserCount`,
            { params: HttpParamsService.ExtractionParams(params || {}) }
        );
    }
    post(body: { name: string }): Observable<any> {
        return this.http.post<any>(this.baseUrl, body);
    }
    AddCategoryAndAddUser(body: { name: string, userIds: number[] }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}AddCategoryAndAddUser`, body);
    }
    AddUser(body: { userCategoryId: number, userId: number }) {
        return this.http.post<any>(`${this.baseUrl}AddUser`, body);

    }
    AddMultiUser(body: { userCategoryId: number, userIds: number[] }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}AddMultiCategoryToUser`, body);
    }
    AddMultiCategoryToUser(body: { userId: number, categoryIds: number[], }): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'AddMultiCategoryToUser', body);
    }
    RemoveMultiCategoryToUser(body: { userId: number, categoryIds: number[], }): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'RemoveMultiCategoryToUser', body);
    }
    DeleteUserFromUserCategory(body: { userId: number, userCategoryId: number }): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}DeleteUserFromUserCategory`, { body: body });
    }
    DeleteUserCategory(body: { id: number }): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}DeleteUserCategory`, { body: body });
    }

}
