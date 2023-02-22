import { Role } from "@prisma/client";

export type RoleCreateUpdate = Omit<Role, 'id' | 'created_at' | 'updated_at'>;

