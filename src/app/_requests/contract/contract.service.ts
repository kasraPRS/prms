import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../../_modules/table-pagination/table-pagination.component';
import { Contract_getDTO, Contract_getListPaginationDTO } from './contractModel';

@Injectable({
    providedIn: 'root',
})
export class ContractHttpService {

    private $ContractId: number = 0;
    private readonly baseUrl: string = environment.apiUrl + `Contract/`

    constructor(private http: HttpClient) { }

    getListPagination(params: {
        PageNumber: number,
        PageSize: number,
        UserId: number,
        SearchTerm: string
    }): Observable<PaginationModel<Contract_getListPaginationDTO[]>> {
        return this.http.get<PaginationModel<Contract_getListPaginationDTO[]>>
            (
                this.baseUrl + `getListPagination`,
                { params: HttpParamsService.ExtractionParams(params) }
            );
    }

    get(params: { id: number }): Observable<any> {
        return this.http.get<Contract_getDTO>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
    }

    post(body: {
        contractTemplateId: number | any;
        period: number | any;
        periodId: number | any;
        name: string | any;
        content: string | any;
        userId: number | any;
    }): Observable<any> {
        return this.http.post(this.baseUrl, body, { responseType: 'text' });
    }

    update(body: {
        id: number,
        contractTemplateId: number | any;
        period: number | any;
        periodId: number | any;
        name: string | any;
        content: string | any;
        userId: number | any;
    }): Observable<any> {
        return this.http.put(this.baseUrl, body, { responseType: 'text' });
    }

    delete(params: { id: number }): Observable<any> {
        return this.http.delete(this.baseUrl, { params: params, responseType: 'text' });
    }

    get getStateContractId(): number {
        return this.$ContractId;
    }
    setStateContractId(item: number): void {
        this.$ContractId = item;
    }

    changeStatus(body: { id: number, status: number }): Observable<any> {
        return this.http.put(this.baseUrl + `changeStatus`, body, { responseType: 'text' });
    }

}
