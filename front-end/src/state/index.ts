import { createSlice } from "@reduxjs/toolkit";
import { CampsiteType } from "../App";

const initialState = {
        mode: "light",
        user: null,
        campsites: [],
}


export const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
                setModeLightDark: (state) => {
                        state.mode= state.mode === "light" ? "dark" : "light"
                },
                setLogin: (state,action) => {
                        state.user = action.payload.user
                },
                setLogout: (state) => {
                        state.user = null
                },
                setCampsites: (state, action) => {
                        state.campsites=action.payload.campsites
                },
                setCampsite: (state, action) => {
                        const campsiteUpdate = action.payload.campsites((campsite: CampsiteType) => {
                                if (campsite._id === action.payload.campsite._id) return action.payload.campsite;
                                return campsiteUpdate;
                        })
                        state.campsites=campsiteUpdate
                }

        }
})

export const { setModeLightDark, setLogin, setLogout, setCampsite, setCampsites } =
  authSlice.actions;
export default authSlice;