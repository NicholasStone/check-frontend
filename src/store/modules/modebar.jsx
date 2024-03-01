import { createSlice } from "@reduxjs/toolkit";

const modebarStore = createSlice({
    name: "modebar",
    initialState: {
        selectedMode: "editor"
    },
    reducers: {
        setSelectedMode(state, action) {
            state.selectedMode = action.payload
        }
    }
})

//解构出actionCreater

const { setSelectedMode } = modebarStore.actions

//获取reducer函数

const modebarReducer = modebarStore.reducer

export { setSelectedMode }

export default modebarReducer