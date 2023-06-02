export interface Link_getAllPaginationDTO {
    id: number;
    name: string;
    date: string;
    time: string;
    url: string;
    linkCampaignName: string;
    createdById: number;
    createdBy: string;
}
export interface Link_getAllListDTO {
    id: number;
    name: string;
    url: string;
    linkCampaignId: number;
    linkCampaignName: string;
}
export interface Link_getLinkDTO {
    id: number;
    name: string;
    url: string;
    linkCampaignId: number;
    linkCampaignName: string;
    source: string;
    medium: string;
    encriptedInfo: string;
}
export interface Link_getListPaginationByLinkCampaignIdDTO {
    id: number;
    name: string;
    date: string;
    time: string;
    url: string;
    linkCampaignName: string;
    createdById: number;
    createdBy: string;
}
export interface Link_getSubMarketersLinkDTO {
    id: number;
    name: string;
    date: string;
    time: string;
    url: string;
    linkCampaignName: string;
    createdById: number;
    createdBy: string;
}
export interface Link_getAllListSubMarketersDTO {
    id: number;
    name: string;
    url: string;
    linkCampaignId: number;
    linkCampaignName: string;
}
export interface LinkModel {
    id: number;
    name: string;
    url: string;
    linkCampaignId: number;
    linkCampaignName: string;
    source: string;
    medium: string;
}
export interface Link_GetSourceListDto {
    key: string;
    value: string;
}
export interface Link_GetMediumListDto {
    key: string;
    value: string;
}
