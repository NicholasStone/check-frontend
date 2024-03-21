import { createSlice } from "@reduxjs/toolkit";

const propertyStore = createSlice({
    name: "property",
    initialState: {
        properties:[
            {
                id:1,
                content:'A[] forall (i:id_t) forall (j:id_t) P(i).cs && P(j).cs imply i == j',
                note:'Mutex requirement.',
                result:'unknown'
            },
            {
                id:2,
                content:'A[] not deadlock',
                note:'The system is deadlock free.',
                result:'unknown'
            },
            {
                id:3,
                content:'P(1).req --> P(1).wait',
                note:'Whenever P(1) requests access to the critical section it will eventually enter the wait state.',
                result:'unknown'
            }
        ]
    },
    reducers: {
        setProperties(state, action) {
            state.properties = action.payload
        }
    }
})

//解构出actionCreater

const { setProperties } = propertyStore.actions

//获取reducer函数

const propertyReducer = propertyStore.reducer

export { setProperties }

export default propertyReducer