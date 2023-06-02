export interface UsersDTO {
    id: number;
    fullName: string;
    firstName: string;
    lastName?: string;
    state?: any;
    groupName: string;
    groupingId?: number;
    marketerTypeId?: number;
    marketerTypeTitle: string;
    teamName: string;
    profileImageUrl: string;
    gender: number;
    teamId?: number;
    parentId?: number;
    parentName?: string;
}