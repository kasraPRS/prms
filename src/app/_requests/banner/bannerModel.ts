export interface Banner_GetListAllDto {
    id: number;
    url: string;
    fileName: string;
    linkId: number;
}
export interface Banner_GetListByLinkDto {
    id: number;
    url: string;
    fileName: string;
    linkId: number;
    code: string;
}
export interface Banner_GetByIdDto {
    id: number;
    url: string;
    fileName: string;
    linkId: number;
}
export interface BannerModel {
    id: number;
    url: string;
    fileName: string;
    linkId: number;
}