import { defineStore } from "pinia";
import { TankStore } from "@/types/store/TankStore";
import { TankNote } from "@/types/Tank";
import { Tank } from "@/types/Tank";
import { CurrentTankFeed, FeedDose } from "@/types/Feed";
import { TankCurrentFeeService } from "@/services/endpoints/TankFeedInformation";
import { Weight } from "@/constants/global";
import { roundTo2Decimals } from "@/helpers/global";
export const useTankStore = defineStore("TankStore", {
  state: () =>
    ({
      tank: null,
    } as TankStore),
  actions: {
    setTank(tank: Required<Tank>) {
      this.tank = tank;
    },
    filterTankNotes(noteId: string) {
      if (this.tank)
        this.tank.annotations = this.tank.annotations.filter(
          (note) => note.id !== noteId
        );
    },
    addNoteToTank(note: Required<TankNote>) {
      if (this.tank) this.tank.annotations.push(note);
    },
    async changeCurrentTankFeed(newCurrentTankFeed: CurrentTankFeed) {
      if (!this.tank) return;

      const { success } = await TankCurrentFeeService.update(
        this.tank._id,
        newCurrentTankFeed,
        "current-tank-feed"
      );
      if (success) this.tank.feedInformation.currentFeed = newCurrentTankFeed;
    },
    terminateTankFeedProgramDose(dose: FeedDose) {
      if (!this.tank?.feedInformation.currentLivestockWeight) return;
      this.tank.feedInformation.feedProgram.push(dose);
      const { currentLivestockWeight, usedFeedTotalWeight } =
        this.tank.feedInformation;
      this.tank.feedInformation.currentLivestockWeight = roundTo2Decimals(
        currentLivestockWeight + dose.weightGainAfterDose
      );
      this.tank.feedInformation.usedFeedTotalWeight = roundTo2Decimals(
        usedFeedTotalWeight + dose.amount
      );
    },
  },
  getters: {
    currentLivestockInformations: (state) => {
      if (!state.tank) return null;
      if (!state.tank.feedInformation.currentLivestockWeight)
        return state.tank.livestockInformation;
      const { initialLivestockWeight } = state.tank.livestockInformation;
      const gainedWeight =
        state.tank.feedInformation.currentLivestockWeight -
        initialLivestockWeight;

      return {
        initialLivestockWeight:
          state.tank.feedInformation.currentLivestockWeight,
        livestock: [...state.tank.livestockInformation.livestock].map(
          (specie) => {
            const specieCopy = { ...specie };
            const specieShareInOverallLivestockWeight =
              specieCopy.weight / initialLivestockWeight;

            specieCopy.weight =
              specie.weight +
              gainedWeight * specieShareInOverallLivestockWeight;

            specieCopy.meanWeight = roundTo2Decimals(
              (specieCopy.weight / specie.quantity) * Weight.GRAMS_IN_KILOGRAMS
            );

            return specieCopy;
          }
        ),
      };
    },
  },
});
