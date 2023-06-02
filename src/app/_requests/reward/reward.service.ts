import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpParamsService } from '../../_services/http-params.service';
import { Reward_GetTeamRewardDTO } from './rewardModel';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';



@Injectable({ providedIn: "root" })
export class RewardHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'Reward/';
    constructor(private http: HttpClient) { }

    GetTeamReward(params: { teamId: number, PageNumber?: number, PageSize?: number }): Observable<PaginationModel<Reward_GetTeamRewardDTO[]>> {
        return this.http.get<PaginationModel<Reward_GetTeamRewardDTO[]>>(
            this.baseUrl + 'GetTeamReward',
            { params: HttpParamsService.ExtractionParams(params) }
        );
    }

}
