export interface Note_getDTO {
    id: number;
    fromUserProfileImage: string;
    fromUserName: string;
    date: Date;
    private: boolean;
    description: string;
    fileId: number;
    attachLink: string;
}