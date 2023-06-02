export interface LinkCampaign_getAllPaginationDTO {
    id: number;
    name: string;
    date: string;
    time: string;
    createdById: number;
    createdBy: string;
}
export interface LinkCampaign_getListAllDTO {
    id: number;
    name: string;
}
export interface LinkCampaign_getDTO {
    id: number;
    name: string;
    linkId: [];
}
export interface LinkCampaign_getSubMarketersLinkCampaign {
    id: number;
    name: string;
    linkId: any[];
    date: string;
    time: string;
    createdById: number;
    createdBy: string;
}
export interface LinkCampaign_getAllListSubMarketers {
    id: number;
    name: string;
}