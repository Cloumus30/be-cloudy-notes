import { NoteImages } from "@prisma/client";

export type noteImageCreateUpdate = Omit<NoteImages, 'id' | 'created_at' | 'updated_at'>;

export const noteImageRootPath = __dirname+'/public/note_image';
