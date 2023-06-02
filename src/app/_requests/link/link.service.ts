import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../../_modules/table-pagination/table-pagination.component';
import {
    LinkModel,
    Link_getAllListDTO,
    Link_getAllListSubMarketersDTO,
    Link_getAllPaginationDTO,
    Link_getLinkDTO,
    Link_getListPaginationByLinkCampaignIdDTO,
    Link_GetMediumListDto,
    Link_GetSourceListDto,
    Link_getSubMarketersLinkDTO
} from './linkModel';

@Injectable({
    providedIn: 'root',
})
export class LinkHttpService {

    private $Link: LinkModel;
    private readonly baseUrl: string = environment.apiUrl + `Link/`

    constructor(private http: HttpClient) { }

    getAllPagination(params: {
        'Params.PageNumber': number,
        'Params.PageSize': number,
        Name: string,
        UserId: number,
        Source: string,
        Medium: string
    }): Observable<PaginationModel<Link_getAllPaginationDTO[]>> {
        return this.http.get<PaginationModel<Link_getAllPaginationDTO[]>>(
            this.baseUrl + `getAllPagination`, { params: HttpParamsService.ExtractionParams(params) }
        );
    }

    getAllList(params: {
        Name?: string,
        UserId: number
    }): Observable<Link_getAllListDTO[]> {
        return this.http.get<Link_getAllListDTO[]>(this.baseUrl + `getAllList`, { params: HttpParamsService.ExtractionParams(params) });
    }

    delete(params: { Id: number }): Observable<any> {
        return this.http.delete(this.baseUrl, { responseType: 'text', params: HttpParamsService.ExtractionParams(params) });
    }

    getLink(params: { Id: number }): Observable<Link_getLinkDTO> {
        return this.http.get<Link_getLinkDTO>(this.baseUrl + `getLink`, { params: HttpParamsService.ExtractionParams(params) });
    }

    post(body: {
        name: string,
        userId: number,
        linkCampaignId: number,
        url: string,
        source: string,
        medium: string
    }): Observable<any> {
        return this.http.post(this.baseUrl, body, { responseType: 'text' });
    }

    put(body: {
        id: number,
        name: string,
        userId: number,
        linkCampaignId: number,
        url: string,
        source: string,
        medium: string
    }): Observable<any> {
        return this.http.put(this.baseUrl, body, { responseType: 'text' });
    }

    getListPaginationByLinkCampaignId(params: {
        'Params.PageNumber': number,
        'Params.PageSize': number,
        Name: string,
        UserId: number,
        LinkCampaignId: number,
        Source: string,
        Medium: string
    }): Observable<PaginationModel<Link_getListPaginationByLinkCampaignIdDTO[]>> {
        return this.http.get<PaginationModel<Link_getListPaginationByLinkCampaignIdDTO[]>>(
            this.baseUrl + `getListPaginationByLinkCampaignId`,
            { params: HttpParamsService.ExtractionParams(params) }
        );
    }

    getSubMarketersLink(params: {
        'Params.PageNumber': number,
        'Params.PageSize': number,
        userId: number,
        Name: string,
        Source: string,
        Medium: string
    }): Observable<PaginationModel<Link_getSubMarketersLinkDTO[]>> {
        return this.http.get<PaginationModel<Link_getSubMarketersLinkDTO[]>>(this.baseUrl + 'getSubMarketersLink', { params: HttpParamsService.ExtractionParams(params) });
    }

    getAllListSubMarketers(params: {
        Name: string,
        UserId: number
    }): Observable<Link_getAllListSubMarketersDTO[]> {
        return this.http.get<Link_getAllListSubMarketersDTO[]>(this.baseUrl + `getAllListSubMarketers`, { params: HttpParamsService.ExtractionParams(params) });
    }

    getSourceList(params: {
        Source: string,
        UserId: number
    }): Observable<Link_GetSourceListDto[]> {
        return this.http.get<Link_GetSourceListDto[]>(this.baseUrl + `getSourceList`, { params: HttpParamsService.ExtractionParams(params) });
    }

    getMediumList(params: {
        Medium: string,
        UserId: number
    }): Observable<Link_GetMediumListDto[]> {
        return this.http.get<Link_GetMediumListDto[]>(this.baseUrl + `getMediumList`, { params: HttpParamsService.ExtractionParams(params) });
    }

    get getStateLinkModel(): LinkModel {
        return this.$Link;
    }
    setStateLinkModel(item: LinkModel): void {
        this.$Link = item;
    }

}
