import { createSlice } from "@reduxjs/toolkit";

const synLongStore = createSlice({
    name: "parsedItems",
    initialState: {
        nodes: [
            { id: 'node_1', name: 'node_A' },
            { id: 'node_2', name: 'node_B' }
        ],
        stateMachines: [
            { id: 'stm_1', name: 'stm1' },
            { id: 'stm_2', name: 'stm2' }
        ],
        variables: [
            { id: 'var_1', name: 'v1' },
            { id: 'var_2', name: 'v2' }
        ],
        others: [
            { id: 'other_1', name: 'content' }
        ],
    },
    reducers: {
        setParsedSynLong(state, action) {
            state.parsedItems = action.payload
            // Object.assign(state, action.payload);
        }
    }
})

//解构出actionCreater

const { setParsedSynLong } = synLongStore.actions

//获取reducer函数

const synLongReducer = synLongStore.reducer

export { setParsedSynLong }

export default synLongReducer