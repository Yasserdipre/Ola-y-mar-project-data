import { createContext, useReducer, useState } from "react";




export const SaveinitialState = JSON.parse(localStorage.getItem('save')) || []

export const SAVE_ACTION_TYPES = {
    ADD_TO_SAVE: 'ADD_TO_SAVE',
    REMOVE_FROM_SAVE: 'REMOVE_FROM_SAVE',
    CLEAR_SAVE: 'CLEAR_SAVE'
}

export const updateLocalStorageSave = state =>{
    window.localStorage.setItem('save', JSON.stringify(state))
}

export const SaveReducer = (state, action) =>{
    const {type: actionType, payload: actionPayload} = action

    switch (actionType) {
        case SAVE_ACTION_TYPES.ADD_TO_SAVE: {
            const {id} = actionPayload
            const productInSave = state.findIndex((item) => item.id === id);

            if (productInSave >= 0) {
                updateLocalStorageSave(newState)
                return;
              }

            const newState = [
                ...state,
                {
                    ...actionPayload
                }
            ]
            updateLocalStorageSave(newState)
            return newState
        }
        case SAVE_ACTION_TYPES.REMOVE_FROM_SAVE: {
            const {id} = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorageSave(newState)
            return newState
        }

        case SAVE_ACTION_TYPES.CLEAR_SAVE: {
            const newState = SaveinitialState
            updateLocalStorageSave(newState)
            return newState
        }
    }

    return state
}














