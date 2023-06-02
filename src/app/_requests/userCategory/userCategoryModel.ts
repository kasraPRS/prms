export interface UserCategory_getDTO {
    id: number;
    name: string;
}
export interface UserCategory_GetAllDTO {
    id: number;
    name: string;
}
export interface UserCategory_GetUserCategoriesByUserCountDTO {
    id: number;
    name: string;
    userCategoryUsers: {
        id: number;
        fullName: string;
        profileImageUrl: string;
        marketerTypeId: number;
        marketerTypeLevel: number;
        marketerTypeTitle: string;
    }[];
    totalUsers: number;
}