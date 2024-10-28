import { create } from "zustand"

type LoggedInState = {
  loggedInState: boolean
  setLoggedInState: (loggedInState: boolean) => void
}

export const useLoggedInState = create<LoggedInState>((set) => ({
  loggedInState: false,
  setLoggedInState: (loggedInState) => set({ loggedInState }),
}))
