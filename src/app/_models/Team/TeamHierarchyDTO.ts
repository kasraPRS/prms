import { UsersDTO } from "../Users/UsersDTO";


export interface TeamHierarchyDTO {
    value?: {
        id?: number,
        firstName?: string,
        lastName?: string,
        marketerTypeTitle?: string,
        profileImageId?: string,
        parentId?: number
    },
    children?: TeamHierarchyDTO[]
}