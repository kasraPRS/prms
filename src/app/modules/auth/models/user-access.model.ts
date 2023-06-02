import { RoleType } from './user.model';

export enum UserRelationshipsMarketer {
  Parent,
  Child,
  Marketer,
  None,
}
interface AccessDTO {
  [index: string]: boolean | AccessDTO;
}
interface AccessConfigDTO {
  __AllowedRelationships?: UserRelationshipsMarketer[];
  __NotAllowedRelationships?: UserRelationshipsMarketer[];

  __AllowedRoles?: RoleType[];
  __NotAllowedRoles?: RoleType[];

  [index: string]: AccessConfigDTO | any;
}

const AccessConfig: AccessConfigDTO = {
  administration: {
    __AllowedRoles: ['admin'],
  },
  management: {
    __NotAllowedRoles: ['admin', 'level5'],
    rewards: {
      __AllowedRoles: ['rm'],
    },
    commissions: {
      __AllowedRoles: ['rm'],
    },
  },
  activities: {
    __NotAllowedRoles: ['admin'],
    overview: {
      profileDetails: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      monthlyIncome: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      recentLinks: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      recentCampaigns: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      rewards: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      paymentsPerOperation: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      undoneTasks: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      activities: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
      meeting: {
        __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
      },
    },
    hierarchy: {
      __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
    },
    activity: {
      __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
    },
    links: {
      __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
    },
    campaigns: {
      __NotAllowedRelationships: [UserRelationshipsMarketer.Child],
    },
    contracts: {
      __AllowedRelationships: [UserRelationshipsMarketer.Marketer],
    },
  },
  reports: {
    __AllowedRoles: ['admin'],
  },
  analytics: {
    __NotAllowedRoles: ['level5'],
  },
  tickets: {
    __NotAllowedRoles: ['level5'],
  },
  tasks: {
    __NotAllowedRoles: ['level5'],
  },
  myAccount: {},
};
export class UserAccess {
  private _role: RoleType;
  private _userRelationship: UserRelationshipsMarketer;
  private _access: AccessDTO = {};
  get access(): AccessDTO {
    return this._access;
  }
  constructor(
    role: RoleType,
    relationship: UserRelationshipsMarketer = UserRelationshipsMarketer.Marketer
  ) {
    this._role = role;
    this._userRelationship = relationship;
    this.generateAccessFor(this._access, AccessConfig);
  }
  private generateAccessFor(access: AccessDTO, config: AccessConfigDTO) {
    let keys = Object.keys(config);
    let keysLength = keys.length;
    for (let i = 0; i < keysLength; i++) {
      const key = keys[i];
      if (
        key === '__AllowedRoles' ||
        key === '__NotAllowedRoles' ||
        key === '__AllowedRelationships' ||
        key === '__NotAllowedRelationships'
      )
        continue;
      access[key] = {
        allowed:
          config[key].__AllowedRoles?.findIndex(
            (i: RoleType) => i === this._role
          ) !== -1 &&
          (config[key].__NotAllowedRoles || [])?.findIndex(
            (i: RoleType) => i === this._role
          ) === -1 &&
          config[key].__AllowedRelationships?.findIndex(
            (i: UserRelationshipsMarketer) => i === this._userRelationship
          ) !== -1 &&
          (config[key].__NotAllowedRelationships || [])?.findIndex(
            (i: UserRelationshipsMarketer) => i === this._userRelationship
          ) === -1,
      };
      this.generateAccessFor(<AccessDTO>access[key], config[key]);
    }
  }
}
