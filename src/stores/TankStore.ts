import { defineStore } from "pinia";
import { TankStore } from "@/types/store/TankStore";
import { TankNote } from "@/types/Tank";
import { Tank } from "@/types/Tank";
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
  },
});
