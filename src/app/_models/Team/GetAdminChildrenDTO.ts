export interface GetAdminChildrenDTO {
    id: number;
    firstName: string;
    lastName: string;
    marketerTypeTitle: string;
    profileImageId?: any;
    hasCustomCommission: boolean;
    rmCommission: number;
    dmCommission: number;
    level3Commission: number;
    level4Commission: number;
    level5Commission: number;
    customteamCommissionCnt: number;
    profileImageUrl: string;
    editMood?: boolean
}