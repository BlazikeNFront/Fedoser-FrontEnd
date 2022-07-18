import { createEndpointAPI } from "@/newServices/middleware";
import { TankDto } from "@/types/Tank";
export const TankService = createEndpointAPI<TankDto>("tanks");
