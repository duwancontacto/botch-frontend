import { create } from "zustand";

export type UserType = "distributor" | "point_of_sale";

export const useUserType = create<{
  userType: UserType;
  setUserType: (userType: UserType) => void;
}>((set) => ({
  userType: "distributor",
  setUserType: (userType) => set({ userType }),
}));
