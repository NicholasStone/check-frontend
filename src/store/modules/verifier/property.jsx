import {createSlice} from "@reduxjs/toolkit";

const propertyStore = createSlice({
  name: "property",
  initialState: {
    properties: [
      {
        id: 1,
        content: 'E<> P.cs imply i == j',
        note: 'Mutex requirement.',
        result: 'unknown'
      },
      {
        id: 2,
        content: 'A[] not deadlock',
        note: 'The system is deadlock free.',
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