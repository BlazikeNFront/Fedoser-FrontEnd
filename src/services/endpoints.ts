import { createEndpointAPI } from "@/services/requestHandler";
import { TankDto } from "@/types/Tank";
import {
  FeedForSpecie,
  Feed,
  FeedInformationDto,
  FeedDoseDto,
  CurrentTankFeedDto,
} from "@/types/Feed";
import { AuthPayloadDto, SignUpDto } from "@/types/AuthPayload";
import { LivestockInformationDto } from "@/types/Livestock";
import { ChangeSpecieWeightDto } from "@/types/ChangeSpecieWeight";
import { NoteDto } from "@/types/Note";

export const LoginService = createEndpointAPI<AuthPayloadDto>("user/signIn");
export const SignUpService = createEndpointAPI<SignUpDto>("user/signUp");

export const TankService = createEndpointAPI<TankDto>("tanks");
export const TankNoteService = createEndpointAPI<NoteDto>("tank-notes");

// tank livestock
// tank livestock
export const TankLivestockInformationService =
  createEndpointAPI<LivestockInformationDto>("tank-livestock");
export const TankCurrentLivestockService =
  createEndpointAPI<ChangeSpecieWeightDto>("tank-livestock");
export const TankFeedInformationService = createEndpointAPI<FeedInformationDto>(
  "tank-feed-information"
);

//tank-feed-information
//tank-feed-information
export const TankFeedDoseService = createEndpointAPI<FeedDoseDto>(
  "tank-feed-information/feedProgram"
);
export const TankCurrentFeedService = createEndpointAPI<CurrentTankFeedDto>(
  "tank-feed-information/current-tank-feed"
);
export const EndFeedProgramService = createEndpointAPI<
  Pick<TankDto, "feedInformation" | "livestockInformation">
>("tank-feed-information/end-feed-program");

//feeds
//feeds
export const FeedsService = createEndpointAPI<Feed>("feeds");
export const FeedsTablesPdfService = createEndpointAPI<Blob>("feed-tables");
export const FeedsForSpecieService =
  createEndpointAPI<FeedForSpecie>("feeds-for-species");
