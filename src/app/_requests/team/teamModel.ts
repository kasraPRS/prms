export interface Team_GetMarketerHierarchyDTO {
    value?: {
        id?: number,
        firstName?: string,
        lastName?: string,
        marketerTypeTitle?: string,
        profileImageId?: string,
        parentId?: number
    },
    children?: Team_GetMarketerHierarchyDTO[]
}
export interface Team_GetSubMarketersDTO {
    id: number;
    firstName: string;
    lastName: string;
    marketerTypeTitle: string;
    profileImageId: number;
    profileImageUrl: string;
}
export interface Team_QuickReviewDTO {
    id: number;
    firstName: string;
    lastName: string;
    marketerTypeTitle: string;
    profileImageId: number;
    profileImageUrl: string;
}
export interface Team_GetDTO {
    teamId: number;
    teamName: string;
    headUserProfileImageId: number;
    headUserId: number;
    headUserFullName: string;
    marketerType: string;
    rmCommission: number;
    dmCommission: number;
    level3Commission: number;
    level4Commission: number;
    level5Commission: number;
    profileImageUrl: string;
}
export interface Team_getAdminChildrenDTO {
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
export interface Team_GetTeamMarketerPaggingQueryDTO {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    totalLinks: number;
    parentId: number;
    successfulLinks: number;
    profileImageUrl: string;
    parentName: string;
    creationDate?: any;
    marketerTypeId: number;
    marketerLevel: number;
    marketerTypeTitle: string;
}
export interface Team_GetTeamMarketerPaggingByTeamIdQueryDTO {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    totalLinks: number;
    parentId: number;
    successfulLinks: number;
    profileImageUrl: string;
    parentName: string;
    creationDate?: any;
    marketerTypeId: number;
    marketerLevel: number;
    marketerTypeTitle: string;
    addresss: {
        id: number;
        addr: string;
        type: number;
        phoneNumber: string;
        userId: number;
        isPrimary: boolean;
        cityId: number;
        cityName: string;
        stateId: number;
        stateName: string;
        countryId: number;
        countryName: string;
        zipCode?: any;
    }[],
    userCategories: {
        id: number,
        name: string
    }[]
}
export interface Team_GetTeamDataDTO {
    id: number;
    name: string;
    teamHeadUserId: number;
    totalMember: number;
    teamUserDtoes: {
        id: number;
        firstName: string;
        lastName: string;
        fullName: string;
        totalLinks: number;
        parentId: number;
        successfulLinks: number;
        profileImageUrl: string;
        parentName: string;
        creationDate?: any;
        marketerTypeId: number;
        marketerLevel: number;
        marketerTypeTitle: string;
    }[];
    commission: {
        teamId: number;
        id: number;
        rmCommission: number;
        dmCommission: number;
        level3Commission: number;
        level4Commission: number;
        level5Commission: number;
        totalShareCommission: number;
    };
}