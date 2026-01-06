import { Timestamp } from "firebase/firestore";

export type UserRole = "admin" | "manager" | "user";

export type RolesMap = Record<string, UserRole>;

export interface IInstitute {
  id: string;
  institute: string;
  campus: string;
  members: string[];
  roles: RolesMap;
  createdAt: Timestamp;
}

export interface InstituteMember {
  id: string;
  displayName: string;
  email: string;
  role: "reader" | "editor" | "admin";
}

export interface UseGetInstituteMembersParams {
  instituteId: string;
}
