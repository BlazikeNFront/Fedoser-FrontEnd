import { Feed } from "@/types/Feed";
export interface FeedsStore {
  feeds: Feed[] | null;
  loader: false;
}
