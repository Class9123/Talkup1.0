import {
  create
} from "zustand";

const useUserStore = create((set, get) => ({
  islogin: false,
  setIslogin: (value) => {
    set({
      islogin: value
    });
  },

  credentials: null,
  setCredentials: (value) => {
    set({
      credentials: value
    });
  },

  data: [], //data = friend list
  setData: (value) => {
    set({
      data: value
    });
  },
  appendFriend: (friendId) => {
    const currentData = get().data; // Access current state
    set({
      data: [...currentData, friendId]
    }); // Update immutably
  },

  currentChattingFriendIndex: 0,
  setChattingFriendIndex: (value)=> {
    set({
      currentChattingFriendIndex: value
    })
  }
}));

export default useUserStore;