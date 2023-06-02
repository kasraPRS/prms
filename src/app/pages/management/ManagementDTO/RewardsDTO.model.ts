import { MarketerDTO } from './MarketerDTO.model';

export class RewardDTO {
  title: string;
  action: string;
  rewardedMarketers: number;
  reward: number;
  total: number;
  date: string;
  marketers: MarketerDTO[];
}
