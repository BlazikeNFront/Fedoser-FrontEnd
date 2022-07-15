import CrudService from "@/services/base/CrudService";
import { NoteDto } from "@/types/Note";

class TankNotesService extends CrudService<NoteDto> {
  constructor() {
    super("tank-notes");
  }
}

export default new TankNotesService();
