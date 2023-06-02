import { environment } from 'src/environments/environment';
import { RoleDTO } from '../services/token.service';
import { AuthInformation } from './auth-information';
import { UserAccess, UserRelationshipsMarketer } from './user-access.model';

const AllRoles: RoleDTO[] = [
  // Order is Important
  { title: 'Admin', value: 'admin' },
  { title: 'RM', value: 'rm' },
  { title: 'DM', value: 'dm' },
  { title: 'AM1', value: 'level3' },
  { title: 'AM2', value: 'level4' },
  { title: 'AM3', value: 'level5' },
];

export type RoleType = 'admin' | 'rm' | 'dm' | 'level3' | 'level4' | 'level5';

export enum Gender {
  Man = 0,
  Female,
  RatherNotToSay,
}
export enum PlaceType {
  unit = 1,
  apt,
}
export interface UserAddressDTO {
  id?: number;
  addr?: string;
  cityId?: number;
  cityName?: string;
  countryId?: number;
  countryName?: string;
  isPrimary?: boolean;
  phoneNumber?: string;
  stateId?: number;
  stateName?: string;
  type?: number;
  userId?: number;
  zipCode?: string;
  contactPhone?: string;
  place?: number;
  no?: string;
  phoneNumberExtension?: string;
}

export const GenderList = [
  { title: 'Male', value: Gender.Man },
  { title: 'Femail', value: Gender.Female },
  { title: 'Prefer not to Say', value: Gender.RatherNotToSay },
]
export const PlaceTypeList = [
  { title: 'Unit', value: PlaceType.unit },
  { title: 'Apt.', value: PlaceType.apt },
]

export class UserModel {
  id: number;
  email: string; //
  teamId: number;
  access: any;
  joinDate: Date;
  teamName: string;
  lastName: string;
  parentId: number;
  taxId: string;
  socialSecurityNumber: string;
  fullName: string;
  firstName: string;
  groupName: string;
  parentName: string;
  creationDate: Date;
  groupingId: number;
  marketerTypeId: number;
  profileImageUrl: string;
  marketerTypeTitle: RoleType;
  isSameWorkAndHomeAddress: boolean;
  state: any;
  gender: Gender;
  workAddress: UserAddressDTO;
  homeAddress: UserAddressDTO;
  addresss: UserAddressDTO[];

  phoneNumber: string;
  twoFactorEnabled: boolean;
  phoneNumberConfirmed: boolean;

  private _relationship: UserRelationshipsMarketer;
  private _decodedToken: AuthInformation | undefined;
  private _allowedRoles: RoleDTO[] = [];
  private _role: RoleType;

  set relationship(relationship: UserRelationshipsMarketer) {
    this._relationship = relationship;
    this.access = new UserAccess(this.role, relationship).access;
  }

  get relationship(): UserRelationshipsMarketer {
    return this._relationship;
  }
  get role(): RoleType {
    return this._decodedToken?.role!;
  }
  get allowedRoles(): RoleDTO[] {
    return this._allowedRoles.slice(0);
  }

  constructor(auth?: AuthInformation) {
    this._decodedToken = auth || ({} as AuthInformation);
    if (auth) this.id = Number(auth.nameid);
  }

  // Public Methods
  public setUser(_user: unknown) {
    const user = _user as UserModel;

    // Set User Data
    this.id = user.id;
    this.teamId = user.teamId || 0;
    this.parentId = user.parentId || 0;
    this.taxId = user.taxId || '';
    this.socialSecurityNumber = user.socialSecurityNumber || '';
    this.fullName = user.fullName || '';
    this.joinDate = user.joinDate || '';
    this.lastName = user.lastName || '';
    this.teamName = user.teamName || '';
    this.groupName = user.groupName || '';
    this.firstName = user.firstName || '';
    this.groupingId = user.groupingId || 0;
    this.parentName = user.parentName || '';
    this.creationDate = user.creationDate || '';
    this.marketerTypeId = user.marketerTypeId || 0;
    this.marketerTypeTitle = user.marketerTypeTitle || '';
    this.isSameWorkAndHomeAddress = user.isSameWorkAndHomeAddress || false;
    this.gender = user.gender || Gender.RatherNotToSay;
    this.state = user.state || null;
    this.email = user.email || '';

    this.phoneNumber = user.phoneNumber || '';
    this.twoFactorEnabled = user.twoFactorEnabled || false;
    this.phoneNumberConfirmed = user.phoneNumberConfirmed || false;

    // Set is Same Address with Addresses Arrays
    this.isSameWorkAndHomeAddress = user.addresss?.length === 1;

    // Set Address
    this.addresss = user.addresss || [];
    this.workAddress = user.addresss.length ? user.addresss[0] : {};
    if (this.isSameWorkAndHomeAddress) {
      this.homeAddress = JSON.parse(JSON.stringify(this.workAddress));
      this.homeAddress.id = 0;
    } else {
      this.homeAddress = user.addresss.length > 1 ? user.addresss[1] : {};
    }

    // Set Profile Image
    this.profileImageUrl = user.profileImageUrl
      ? user.profileImageUrl?.includes('http')
        ? user.profileImageUrl
        : environment.imagesUrl + user.profileImageUrl
      : environment.avatarImage;

    // Set Role & Allowed Roles
    this._role = this.marketerTypeTitle;
    if (!this.role)
      (<AuthInformation>this._decodedToken).role = this._role || 'admin';

    this.access = new UserAccess(this.role).access;
    this.setAllowedRolesForChilds();
  }
  public checkAllowed(allowedRoles: RoleType[] = []): boolean {
    // Get Allowed Roles and return Access User
    return allowedRoles.findIndex((role) => this.role === role) != -1;
  }
  public static getAllowedRoles(role: RoleType): RoleDTO[] {
    switch (role) {
      case 'admin':
        return AllRoles.slice(1, 3);
      case 'rm':
        return AllRoles.slice(2);
      case 'dm':
        return AllRoles.slice(3);
      case 'level3':
        return AllRoles.slice(4);
      case 'level4':
        return AllRoles.slice(5);
      // case 'level5': return [];
    }
    return [];
  }

  // Private Methods
  private setAllowedRolesForChilds() {
    this._allowedRoles = UserModel.getAllowedRoles(this._decodedToken?.role!);
  }
}
