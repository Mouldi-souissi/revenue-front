import create from "zustand";

type UI_State = {
  isSidebarHidden: boolean;
  toggleSideBar: () => void;
};

const store_ui = create<UI_State>((set) => ({
  isSidebarHidden: false,

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
}));

export default store_ui;
