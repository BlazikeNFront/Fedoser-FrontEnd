import { SingleLivestockSpecie } from "@/types/Livestock";
export interface ChangeSpecieWeightPayload {
  before: SingleLivestockSpecie;
  after: SingleLivestockSpecie;
  reason: string;
  date: string;
}
export class ChangeSpecieWeightDto implements ChangeSpecieWeightPayload {
  before: SingleLivestockSpecie;
  after: SingleLivestockSpecie;
  reason: string;
  date: string;
  constructor({ before, after, reason, date }: ChangeSpecieWeightPayload) {
    this.before = before;
    this.after = after;
    this.reason = reason;
    this.date = date;
  }
}
