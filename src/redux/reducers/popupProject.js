// import {POPUPPROJECT} from "../types/popupProject";
import React from "react";

const initialState = {
  visible: false,
  ComponentContentPopup: <p>Default Content</p>,
  callBackSubmit: () => {
    alert("Click demo!");
  },
};

export const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_POPUP":
      return { ...state, visible: true };

    case "CLOSE_POPUP":
      return { ...state, visible: false };

    case "OPEN_FORM_EDIT_PROJECT":
      return {
        ...state,
        visible: true,
        ComponentContentPopup: action.Component,
      };

    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    default:
      return state;
  }
};
