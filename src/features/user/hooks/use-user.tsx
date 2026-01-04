import { useContext } from "react";

import { UserContext } from "@/features/user/contexts/user-context";

export const useUser = () => useContext(UserContext);
