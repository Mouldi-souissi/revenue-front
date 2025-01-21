import create from "zustand";

const store_ui = create((set) => ({
  isSidebarHidden: false,

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
}));

export default store_ui;
