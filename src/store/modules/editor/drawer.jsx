import {createSlice} from "@reduxjs/toolkit";

const drawerStore = createSlice({
  name: "drawer",
  initialState: {
    locationOpen: false,
    transitionOpen: false,
    openLocation: {
      name: {
        content: '',
      },
      invariant: {
        content: '',
      },
    },
    openTransition: {
      select: {
        content: '',
      },
      guard: {
        content: '',
      },
      sync: {
        content: '',
      },
      update: {
        content: '',
      }
    }

  },
  reducers: {
    setLocationOpen(state, action) {
      state.locationOpen = action.payload
    },
    setTransitionOpen(state, action) {
      state.transitionOpen = action.payload
    },
    setOpenLocation(state, action) {
      state.openLocation = action.payload
    },
    setOpenTransition(state, action) {
      state.openTransition = action.payload
    }
  }
})

//解构出actionCreater

const {setLocationOpen, setTransitionOpen, setOpenLocation, setOpenTransition} = drawerStore.actions

//获取reducer函数

const drawerReducer = drawerStore.reducer

export {setLocationOpen, setTransitionOpen, setOpenLocation, setOpenTransition}

export default drawerReducer