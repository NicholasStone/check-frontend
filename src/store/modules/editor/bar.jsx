import {createSlice} from "@reduxjs/toolkit";

const barStore = createSlice({
  name: "bar",
  initialState: {
    selectedMode: "lustre",
    selectedTool: "",
    selectedMenuItem: "model",
    zoom: 1
  },
  reducers: {
    //editor simulator verifier
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
    setZoom(state, action) {
      state.zoom = action.payload
    }
  }
})

//解构出actionCreater

const {setSelectedMode, setSelectedTool, setSelectedMenuItem, setZoom} = barStore.actions

//获取reducer函数

const barReducer = barStore.reducer

export {setSelectedMode, setSelectedTool, setSelectedMenuItem, setZoom}

export default barReducer