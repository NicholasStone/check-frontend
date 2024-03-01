import { createSlice } from "@reduxjs/toolkit";

const toolbarStore = createSlice({
    name: "toolbar",
    initialState: {
        selectedTool: ""
    },
    reducers: {
        setSelectedTool(state, action) {
            state.selectedTool = action.payload
        }
    }
})

//解构出actionCreater

const { setSelectedTool } = toolbarStore.actions

//获取reducer函数

const toolbarReducer = toolbarStore.reducer

export { setSelectedTool }

export default toolbarReducer