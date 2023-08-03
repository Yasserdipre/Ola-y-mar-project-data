import { useContext } from "react";
import { SaveContext } from "../context/Save";


export const useSave = () =>{
    const save = useContext(SaveContext)

    if (save === undefined){
        throw new Error('useSave must be used within a SaveProvider')
    }

    return save
}














