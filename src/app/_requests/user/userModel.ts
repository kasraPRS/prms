export enum AddressType {
  workAddress,
  homeAddress,
}
export interface User_loginDTO {
  jwt: string;
  loginStep: number;
  userId: number | null;
  twoStepVerification: boolean;
  email?: string; // custom add for handle
}
export interface User_generateUserByLink_body {
  userRegisterByLinkDto: {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    gender: number,
    addresss: {
      id: number;
      addr: string;
      type: AddressType;
      phoneNumber: string;
      phoneNumberExtension: string;
      isPrimary: boolean;
      cityId: number;
      contactPhone: string;
      zipCode: string;
      place: number;
      no: string;
    }[];
    logoFile: string;
    profileImageUrl: string;
    taxId: string;
    socialSecurityNumber: string;
    creationDate: null;
  };
}
export interface User_updateProfile_body {
  updateUserDto: {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    gender: number,
    taxId: string;
    socialSecurityNumber: string;
    addresss: {
      id: number;
      addr: string;
      type: AddressType;
      phoneNumber: string;
      phoneNumberExtension: string;
      isPrimary: boolean;
      cityId: number;
      zipCode: string;
      contactPhone: string;
      place: number;
      no: string;
    }[];
    logoFile: string;
    profileImageUrl: string;
    isSameWorkAndHomeAddress: boolean;
    creationDate: null;
  };
}
export interface User_getAllUsersDTO {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  state?: any;
  userCategoryName: string;
  groupingId?: any;
  marketerTypeId: number;
  marketerTypeTitle: string;
  teamName: string;
  profileImageUrl: string;
  gender: number;
  teamId?: any;
  parentId: number;
  parentName: string;
  addresss: {
    id: number;
    addr: string;
    type: AddressType;
    phoneNumber: string;
    isPrimary: boolean;
    cityId: number;
    zipCode: string;
    contactPhone: string;
  }[];
}
export interface User_getAllUsersIdAndNameDTO {
  id: number;
  fullName: string;
  profileImageUrl: string;
  marketerTypeId: number;
  marketerTypeLevel: number;
  marketerTypeTitle: string;
}
export interface User_GetSubUsersDTO {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  state?: any;
  userCategoryName: string;
  groupingId?: any;
  marketerTypeId: number;
  marketerTypeTitle: string;
  teamName: string;
  profileImageUrl: string;
  gender: number;
  teamId?: any;
  parentId: number;
  parentName: string;
  addresss: {
    id: number;
    addr: string;
    type: AddressType;
    phoneNumber: string;
    isPrimary: boolean;
    cityId: number;
    zipCode: string;
    contactPhone: string;
  }[];
}
export interface User_GetParentUsersDTO {
  fullName: string;
  id: number;
  marketerTypeId: number;
  marketerTypeTitle: string;
  profileImageUrl: string;
  addresss: {
    id: number;
    stateId: number;
    stateName: string;
  }[];
}
export interface User_getAllListDTO {
  id: number;
  fullName: string;
}
export interface User_isUserInParents {
  haveAccess: boolean;
}
export interface User_isUserParentOrChild {
  type: 'Parent' | 'Child' | 'None'
}
