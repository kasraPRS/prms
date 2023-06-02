export interface Meeting_getDTO {
    id: number;
    date: Date;
    participants: {
        id: number;
        fullName: string;
        profileImageUrl?: any;
        userId?: any;
    }[];
    createdBy: string;
    creatorUserFullName: string;
    title: string;
    description: string;
    duration: number;
    result?: any;
}
export interface Meeting_post_body {
    title: string;
    description: string;
    date: Date;
    duration: number;
    participantUserIds: number[];
    thirdPartyParticipants: {
        fullName: string;
        email: string;
    }[];
}
export interface Meeting_put_body {
    id: number;
    title: string;
    description: string;
    date: Date;
    duration: number;
    removedParticipantIds: number[];
    newAddedParticipantUserIds: number[];
    newAddedThirdPartyParticipants: {
        fullName: string;
        email: string;
    }[];
    result: string;
}