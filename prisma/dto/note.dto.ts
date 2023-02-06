import { Notes } from "@prisma/client";

export type noteCreate = Omit<Notes, 'id' | 'created_at'|'updated_at'>

export type noteUpdate = Omit<Notes, 'id' | 'user_id' |'created_at'|'updated_at'>