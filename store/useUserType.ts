import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = "distributor" | "point_of_sale";

export const useUserType = create<{
  userType: UserType;
  setUserType: (userType: UserType) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}>()(
  persist(
    (set) => ({
      userType: "distributor",
      setUserType: (userType) => set({ userType }),
      _hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: "user-type-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userType: state.userType }),
      onRehydrateStorage: () => (state) => {
        console.log("Store rehydrated:", state);
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
