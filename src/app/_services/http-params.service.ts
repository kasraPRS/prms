import { HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

export interface ParamsInterface { [index: string]: any; }

@Injectable({ providedIn: 'root' })
export class HttpParamsService {
    // Extraction Params
    static ExtractionParams(params: ParamsInterface): HttpParams {
        var extractedParams: HttpParams = new HttpParams();
        Object.keys(params).forEach(
            key => {
                extractedParams = 
                    extractedParams.append(key, (params[key]?.toString() || ''));
            }
        );
        return extractedParams;
    }
}
