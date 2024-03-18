import { createSlice } from "@reduxjs/toolkit";

const barStore = createSlice({
    name: "bar",
    initialState: {
        selectedMode: "editor",
        selectedTool: "",
        selectedMenuItem: "model"
    },
    reducers: {
        setSelectedMode(state, action) {
            state.selectedMode = action.payload
        },
        // select location branch edge nail
        setSelectedTool(state, action) {
            state.selectedTool = action.payload
        },
        setSelectedMenuItem(state, action) {
            state.selectedMenuItem = action.payload
        },
    }
})

//解构出actionCreater

const { setSelectedMode,setSelectedTool,setSelectedMenuItem } = barStore.actions

//获取reducer函数

const barReducer = barStore.reducer

export { setSelectedMode,setSelectedTool,setSelectedMenuItem }

export default barReducer