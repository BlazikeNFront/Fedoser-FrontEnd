export interface LivestockInformation {
  livestock: SingleLivestockSpecie[];
  initialLivestockWeight: number;
}

export interface SingleLivestockSpecie {
  name: string;
  weight: number;
  meanWeight: number;
  quantity: number;
}
