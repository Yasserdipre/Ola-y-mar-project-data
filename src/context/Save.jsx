import { createContext, useReducer, useState } from "react";
import { SaveReducer, SaveinitialState } from "../reducers/Save";
import { SAVE_ACTION_TYPES } from "../reducers/Save";

export const SaveContext = createContext();




export const SaveProvider = ({ children }) => {
   const [state, dispatch] = useReducer(SaveReducer, SaveinitialState)


    const addToSave = product => dispatch({
        type: SAVE_ACTION_TYPES.ADD_TO_SAVE,
        payload: product
    })

    const removeFromSave = product => dispatch({
        type: SAVE_ACTION_TYPES.REMOVE_FROM_SAVE,
        payload: product
    })

    const clearSave = product => dispatch({
        type: SAVE_ACTION_TYPES.CLEAR_SAVE,
        payload: product
    })


  return (
    <SaveContext.Provider
      value={{
        save: state,
        addToSave,
        removeFromSave,
        clearSave,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};














