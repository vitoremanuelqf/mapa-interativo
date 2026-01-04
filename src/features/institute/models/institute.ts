import { Timestamp } from "firebase/firestore";

export type UserRole = "admin" | "manager" | "user";

export type RolesMap = Record<string, UserRole>;

export interface IInstitute {
  id: string;
  campus: string;
  members: string[];
  roles: RolesMap;
  createdAt: Timestamp;
}
