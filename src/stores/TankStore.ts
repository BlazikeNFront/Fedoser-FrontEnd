import { defineStore } from "pinia";
import { TankStore } from "@/types/store/TankStore";
import { NoteDto } from "@/types/Note";
import { TankDto } from "@/types/Tank";
import { CurrentTankFeedDto, FeedDoseDto } from "@/types/Feed";
import { TankCurrentFeeService } from "@/services/endpoints/TankFeedInformation";
import { roundTo2Decimals } from "@/helpers/global";
import { calcLivestockWeight } from "@/helpers/calcLivestockWeight";
import { findMainSpecieInLivestock } from "@/helpers/findMainSpecieInLivestock";
import { TankCurrentLivestockService } from "@/services/endpoints/TankLivestock";
import { ChangeSpecieWeightDto } from "@/types/ChangeSpecieWeight";
import { EndFeedProgramService } from "@/services/endpoints/TankFeedInformation";
import { LivestockInformationDto } from "@/types/Livestock";
import { FeedInformationDto } from "@/types/Feed";

export const useTankStore = defineStore("TankStore", {
  state: () =>
    ({
      tank: null,
    } as TankStore),
  actions: {
    setTank(tank: Required<TankDto>) {
      this.tank = tank;
    },
    filterTankNotes(noteId: string) {
      if (this.tank)
        this.tank.annotations = this.tank.annotations.filter(
          (note) => note.id !== noteId
        );
    },
    addNoteToTank(note: Required<NoteDto>) {
      if (this.tank) this.tank.annotations.push(note);
    },
    async changeCurrentTankFeed(newCurrentTankFeed: CurrentTankFeedDto) {
      if (!this.tank) return;

      const { success } = await TankCurrentFeeService.update(
        this.tank._id,
        newCurrentTankFeed,
        "current-tank-feed"
      );
      if (success) this.tank.feedInformation.currentFeed = newCurrentTankFeed;
    },
    terminateTankFeedProgramDose(dose: FeedDoseDto) {
      if (!this.tank) return;
      this.tank.feedInformation.feedProgram.push(dose);
      const indexOfSpecie = this.tank.livestockInformation.current.findIndex(
        (specieData) => specieData.specie === dose.specie
      );
      const currentSpecieData =
        this.tank.livestockInformation.current[indexOfSpecie];
      currentSpecieData.weight += dose.weightGainAfterDose;
      currentSpecieData.meanWeight += roundTo2Decimals(
        (dose.weightGainAfterDose * 1000) / currentSpecieData.quantity
      );
      this.tank.livestockInformation.current[indexOfSpecie] = currentSpecieData;
    },
    async updateCurrentLivestock(payload: ChangeSpecieWeightDto) {
      if (!this.tank?._id) return false;
      const result = await TankCurrentLivestockService.update(
        this.tank._id,
        payload
      );
      if (result.success) {
        const {
          after,
          after: { specie },
        } = payload;
        const indexOfSpecie = this.tank.livestockInformation.current.findIndex(
          (livestockSpecie) => livestockSpecie.specie === specie
        );
        this.tank.livestockInformation.current[indexOfSpecie] = after;
        this.tank.livestockInformation.changes.push(payload);
      }
      return result.success;
    },
    async endCurrentFeedProgram() {
      if (!this.tank) return;

      const result = await EndFeedProgramService.update(this.tank._id, {
        livestockInformation: { ...this.tank.livestockInformation },
        feedInformation: { ...this.tank.feedInformation },
      });
      if (result.success) {
        this.tank.history.push({
          livestockInformation: this.tank.livestockInformation,
          feedInformation: this.tank.feedInformation,
        });
        this.tank.livestockInformation = new LivestockInformationDto({});
        this.tank.feedInformation = new FeedInformationDto({});
      }
    },
  },
  getters: {
    tankLivestockWeight: (state) =>
      calcLivestockWeight(state.tank?.livestockInformation.current || []),
    tankMainSpecie: (state) =>
      findMainSpecieInLivestock(state.tank?.livestockInformation.current || []),
  },
});
