import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentContact: null,
  contacts: [],
  isLoaading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
  },
});

export const { reset, setCurrentContact, setContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
