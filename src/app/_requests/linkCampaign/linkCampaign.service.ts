import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../../_modules/table-pagination/table-pagination.component';
import { LinkCampaign_getAllListSubMarketers, LinkCampaign_getAllPaginationDTO, LinkCampaign_getDTO, LinkCampaign_getListAllDTO, LinkCampaign_getSubMarketersLinkCampaign } from './linkCampaignModel';

@Injectable({
    providedIn: 'root',
})
export class CampaignHttpService {

    private $LinkCampaignId: number = 0;
    private $LinkCampaignName: string = '';
    private readonly baseUrl: string = environment.apiUrl + `LinkCampaign/`

    constructor(private http: HttpClient) { }

    getAllPagination(params: {
        'Params.PageNumber': number,
        'Params.PageSize': number,
        Name: string,
        UserId: number,
        Source: string,
        Medium: string
    }): Observable<PaginationModel<LinkCampaign_getAllPaginationDTO[]>> {
        return this.http.get<PaginationModel<LinkCampaign_getAllPaginationDTO[]>>(this.baseUrl + `getAllPagination`, { params: HttpParamsService.ExtractionParams(params) });
    }

    getListAll(params: {
        UserId: number,
        Name?: string
    }): Observable<LinkCampaign_getListAllDTO[]> {
        return this.http.get<LinkCampaign_getListAllDTO[]>(this.baseUrl + `getAllList`, { params: HttpParamsService.ExtractionParams(params) });
    }

    get(params: { Id: number }): Observable<LinkCampaign_getDTO> {
        return this.http.get<LinkCampaign_getDTO>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
    }

    post(body: {
        name: any,
        userId: any,
        linkId: any
    }): Observable<any> {
        return this.http.post(this.baseUrl, body, { responseType: 'text' });
    }

    put(body: {
        id: any,
        name: any,
        userId: any,
        linkId: any
    }): Observable<any> {
        return this.http.put(this.baseUrl, body, { responseType: 'text' });
    }

    delete(params: {
        Id: number
    }): Observable<any> {
        return this.http.delete(this.baseUrl, { responseType: 'text', params: HttpParamsService.ExtractionParams(params) });
    }

    get getStateLinkCampaignId(): number {
        return this.$LinkCampaignId;
    }
    setStateLinkCampaignId(item: number): void {
        this.$LinkCampaignId = item;
    }

    get getStateLinkCampaignName(): string {
        return this.$LinkCampaignName;
    }
    setStateLinkCampaignName(item: string): void {
        this.$LinkCampaignName = item;
    }

    getListPaginationChildren(params: {
        'Params.PageNumber': number,
        'Params.PageSize': number,
        Name: string,
        UserId: number,
        Source: string,
        Medium: string
    }): Observable<PaginationModel<LinkCampaign_getSubMarketersLinkCampaign[]>> {
        return this.http.get<PaginationModel<LinkCampaign_getSubMarketersLinkCampaign[]>>
            (this.baseUrl + 'getSubMarketersLinkCampaign', { params: HttpParamsService.ExtractionParams(params) });
    }

    getAllListSubMarketers(params: {
        Name: string,
        UserId: number
    }): Observable<LinkCampaign_getAllListSubMarketers[]> {
        return this.http.get<LinkCampaign_getAllListSubMarketers[]>(this.baseUrl + 'getAllListSubMarketers', { params: HttpParamsService.ExtractionParams(params) });
    }

}
