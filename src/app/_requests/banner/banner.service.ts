import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerModel, Banner_GetByIdDto, Banner_GetListAllDto, Banner_GetListByLinkDto } from './bannerModel';

@Injectable({ providedIn: "root" })
export class BannerHttpService {

    private $bannerModel: BannerModel;
    private readonly baseUrl: string = environment.apiUrl + `Banner`

    constructor(private http: HttpClient) { }

    getListAll(): Observable<Banner_GetListAllDto[]> {
        const url = this.baseUrl + `/getList`
        const result = this.http.get<Banner_GetListAllDto[]>(url);
        return result;
    }

    getListByLink(_linkId: number): Observable<Banner_GetListByLinkDto[]> {
        const url = this.baseUrl + `/getListByLink?LinkId=${_linkId}`
        const result = this.http.get<Banner_GetListByLinkDto[]>(url);
        return result;
    }

    delete(params: { id: number }): Observable<any> {
        return this.http.delete(this.baseUrl, { params: params, responseType: 'text' });
    }

    deleteBannerLink(params: { id: number }): Observable<any> {
        return this.http.delete(this.baseUrl + '/deleteBannerLink', { params: params, responseType: 'text' });
    }

    getById(_id: number) {
        const url = this.baseUrl + `/getLink?Id=${_id}`
        const result = this.http.get<Banner_GetByIdDto>(url);
        return result;
    }

    create(_data: any): Observable<any> {
        const url = this.baseUrl
        const request = this.http.post(url, _data, { responseType: 'text' });
        return request
    }

    put(_data: any): Observable<any> {
        const url = this.baseUrl
        const request = this.http.put(url, _data, { responseType: 'text' });
        return request
    }

    get getStateBannerModel(): BannerModel {
        return this.$bannerModel;
    }
    setStateBannerModel(item: BannerModel): void {
        this.$bannerModel = item;
    }

}
