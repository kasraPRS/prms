export interface Reward_GetTeamRewardDTO {
    id: number;
    Title: string;
    Creator: string;
    RewardAction: number;
    ActionAmountGoal: number;
    RewardedmarketersCount: number;
    TargetUsersCount: number;
    Amount: number;
    FromDate: string;
    DueDate: string;
    Marketers: {
        UserId: number;
        TargetUserId: number;
        ParentFullName: string;
        MarketerType: number;
        ProfileImageUrl: string;
    }[];
}
