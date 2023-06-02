import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { Team_getAdminChildrenDTO, Team_GetDTO, Team_GetMarketerHierarchyDTO, Team_GetSubMarketersDTO, Team_GetTeamDataDTO, Team_GetTeamMarketerPaggingByTeamIdQueryDTO, Team_GetTeamMarketerPaggingQueryDTO, Team_QuickReviewDTO } from './teamModel';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';


@Injectable({
    providedIn: 'root'
})
export class TeamHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'Team/';
    constructor(private http: HttpClient) { }

    GetMarketerHierarchy(params: { userId: number }): Observable<Team_GetMarketerHierarchyDTO[]> {
        return this.http.get<Team_GetMarketerHierarchyDTO[]>(`${this.baseUrl}GetMarketerHierarchy`, { params: HttpParamsService.ExtractionParams(params) })
    }
    GetSubMarketers(params: { userId: number }): Observable<Team_GetSubMarketersDTO[]> {
        return this.http.get<Team_GetSubMarketersDTO[]>(`${this.baseUrl}GetSubMarketers`, { params: HttpParamsService.ExtractionParams(params) })
    }
    QuickReview(params: { userId: number }): Observable<Team_QuickReviewDTO[]> {
        return this.http.get<Team_QuickReviewDTO[]>(`${this.baseUrl}QuickReview`, { params: HttpParamsService.ExtractionParams(params) })
    }
    Get(params: { PageNumber: number, PageSize: number, rmId: number }): Observable<PaginationModel<Team_GetDTO[]>> {
        return this.http.get<PaginationModel<Team_GetDTO[]>>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) })
    }
    GetTeamMarketerPaggingQuery(params: {
        'TeamHeadUserId'?: number | null,
        'Name'?: string | null,
        'Email'?: string | null,
        'UserName'?: string | null,
        'RoleName'?: string | null,
        'UserCategoryIds'?: string | null,
        'Gender'?: string | null,
        'IncludeAdmin'?: boolean | null,
        'PageNumber'?: number | null,
        'PageSize'?: number | null
    }): Observable<PaginationModel<Team_GetTeamMarketerPaggingQueryDTO[]>> {
        return this.http.get<PaginationModel<Team_GetTeamMarketerPaggingQueryDTO[]>>(this.baseUrl + 'GetTeamMarketerPaggingQuery', { params: HttpParamsService.ExtractionParams(params) })
    }
    GetTeamMarketerPaggingByTeamIdQuery(params: {
        TeamId?: number | null,
        Name?: string | null,
        Email?: string | null,
        UserName?: string | null,
        RoleName?: string | null,
        UserCategoryIds?: string | null,
        Gender?: string | null,
        IncludeAdmin?: boolean | null,
        PageNumber?: number | null,
        PageSize?: number | null
    }): Observable<PaginationModel<Team_GetTeamMarketerPaggingByTeamIdQueryDTO[]>> {
        return this.http.get<PaginationModel<Team_GetTeamMarketerPaggingByTeamIdQueryDTO[]>>(this.baseUrl + 'GetTeamMarketerPaggingByTeamIdQuery', { params: HttpParamsService.ExtractionParams(params) })
    }
    GetAdminChildren(params: {
        Name: string,
        Email: string,
        UserName: string,
        RoleName: string,
        UserCategoryIds: string,
        Gender: string,
        PageNumber: number,
        PageSize: number
    }): Observable<PaginationModel<Team_getAdminChildrenDTO[]>> {
        return this.http.get<PaginationModel<Team_getAdminChildrenDTO[]>>(`${this.baseUrl}GetAdminChildren`, { params: HttpParamsService.ExtractionParams(params) })
    }
    GetTeamData(params: { TeamId: number }): Observable<Team_GetTeamDataDTO> {
        return this.http.get<Team_GetTeamDataDTO>(this.baseUrl + 'GetTeamData', { params: HttpParamsService.ExtractionParams(params) })
    }
    post(body: {
        headUserId: number;
        name: string;
        rmCommission: number;
        dmCommission: number;
        level3Commission: number;
        level4Commission: number;
        level5Commission: number;
    }): Observable<{ id: number }> {
        return this.http.post<{ id: number }>(this.baseUrl, body)
    }
    put(body: {
        teamId: number;
        name: string;
        rmCommission: number;
        dmCommission: number;
        level3Commission: number;
        level4Commission: number;
        level5Commission: number;
    }): Observable<any> {
        return this.http.put<any>(this.baseUrl, body)
    }
    DeleteTeaByRm(params: { headUserId: number }): Observable<any> {
        return this.http.delete<any>(this.baseUrl + 'DeleteTeaByRm', { params: HttpParamsService.ExtractionParams(params) })
    }
}
