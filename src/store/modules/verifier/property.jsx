import {createSlice} from "@reduxjs/toolkit";

const propertyStore = createSlice({
  name: "property",
  initialState: {
    properties: [
      {
        id: 1,
        content: 'A[] not deadlock',
        note: '系统永远不会死锁',
        result: 'unknown'
      },
    ]
  },
  reducers: {
    setProperties(state, action) {
      state.properties = action.payload
    }
  }
})

//解构出actionCreater

const {setProperties} = propertyStore.actions

//获取reducer函数

const propertyReducer = propertyStore.reducer

export {setProperties}

export default propertyReducer