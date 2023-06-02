export interface Document_GetDocumentDTO {
    id: number;
    displayName: string;
    fileId: number;
    documentViewType: number;
    userId: number;
    userName: string;
    url: string;
    fileName: string;
    createdByUserName: string;
    createdByUserId: number;
    created: Date;
}