import { defineStore } from "pinia";
import { TankStore } from "@/types/store/TankStore";
import { TankNote } from "@/types/Tank";
import { Tank } from "@/types/Tank";
import { CurrentTankFeed, FeedDose } from "@/types/Feed";
import { TankCurrentFeeService } from "@/services/endpoints/TankFeedInformation";
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
      if (!this.tank) return;
      this.tank.feedInformation.feedProgram.push(dose);
      const { usedFeedTotalWeight } = this.tank.feedInformation;
      this.tank.feedInformation.usedFeedTotalWeight = roundTo2Decimals(
        usedFeedTotalWeight + dose.amount
      );
    },
  },
});
