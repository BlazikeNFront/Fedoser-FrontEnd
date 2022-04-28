import CrudService from "@/services/base/CrudService";
import { TankNoteDto } from "@/utils/DTOs/TankNote.dto";

class TankNotesService extends CrudService<TankNoteDto> {
  constructor() {
    super("tank-notes");
  }
}

export default new TankNotesService();
