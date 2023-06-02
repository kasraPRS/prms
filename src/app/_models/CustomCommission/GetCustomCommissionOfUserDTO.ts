export interface GetCustomCommissionOfUserDTO {
    userId?: number;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    parentFullName?: string;
    rmCommission?: number;
    dmCommission?: number;
    level3Commission?: number;
    level4Commission?: number;
    level5Commission?: number;
    totalShareCommission?: number;
    hasCustomCommission?: boolean;
}
