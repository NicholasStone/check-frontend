import { createSlice } from "@reduxjs/toolkit";

const modelStore = createSlice({
    name: "model",
    initialState: {
        id:'',
        declaration: "// 在这里编写全局变量、函数等.",
        autos:[
            {
                name:"Template",
                parameters:"id int",
                locations:[
                    {
                        id:1,
                        name:{
                            content:"start",
                            x:250,
                            y:170
                        },
                        invariant:{
                            content:"",
                            x:250,
                            y:200
                        },
                        x:250,
                        y:200,
                    },
                    {
                        id:2,
                        name:{
                            content:"end",
                            x:500,
                            y:170
                        },
                        invariant:{
                            content:"",
                            x:500,
                            y:100
                        },
                        x:500,
                        y:200,
                    },
                ],//id name x y
                transitions:[
                    {
                        id:1,
                        sourceId:1,
                        targetId:2,
                        nails:[],
                        select:{
                            content:"",
                            x:270,
                            y:90
                        },
                        guard:{
                            content:"",
                            x:270,
                            y:90
                        },
                        sync:{
                            content:"",
                            x:270,
                            y:90
                        },
                        update:{
                            content:"",
                            x:450,
                            y:90
                        }
                    },
                ],//id source_id target_id guard update
                init:1,
                declaration:"// 在这里编写局部变量、函数等."
            }
        ],
        systemDeclaration:"// 在这里填写模型的声明.\nProcess = Template();\nsystem Process;"
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload
        },
        setDeclaration(state, action) {
            state.declaration = action.payload
        },
        setAutos(state, action) {
            state.autos = action.payload
        },
        setAutosName(state, action){
            state.autos[0].name = action.payload
        },
        setAutosParameters(state, action){
            state.autos[0].parameters = action.payload
        },
        addAutosLocation(state, action){
            state.autos[0].locations.push(action.payload)
        },
        updateAutosLocation(state, action){
            const tmp = action.payload
            state.autos[0].locations = state.autos[0].locations
            .map((location)=>{
                if(location.id===tmp.id){
                    return tmp
                }
                else{
                    return location
                }
            })
        },
        deleteAutosLocation(state, action){
            const locationId = action.payload
            state.autos[0].locations = state.autos[0].locations.filter((location)=>location.id!==locationId)
            //delete related transitions
            state.autos[0].transitions = state.autos[0].transitions.filter((transition)=>transition.sourceId!==locationId&&transition.targetId!==locationId)
        },
        addAutosTransition(state, action){
            state.autos[0].transitions.push(action.payload)
        },
        updateAutosTransition(state, action){
            const tmp = action.payload
            state.autos[0].transitions = state.autos[0].transitions
            .map((transition)=>{
                if(transition.id===tmp.id){
                    return tmp
                }
                else{
                    return transition
                }
            })
        },
        deleteAutosTransition(state, action){
            const transitionId = action.payload
            state.autos[0].transitions = state.autos[0].transitions.filter((transition)=>transition.id!==transitionId)
        },
        setAutosDeclaration(state, action){
            state.autos[0].declaration = action.payload
        },
        setSystemDeclaration(state, action){
            state.systemDeclaration = action.payload
        }
    }
})

//解构出actionCreater

const {
    setId,
    setDeclaration,
    setAutos,
    setAutosName,
    setAutosParameters,
    addAutosLocation,
    updateAutosLocation,
    deleteAutosLocation,
    addAutosTransition,
    updateAutosTransition,
    deleteAutosTransition,
    setAutosDeclaration,
    setSystemDeclaration
    
} = modelStore.actions

//获取reducer函数

const modelReducer = modelStore.reducer

export { 
    setId,
    setDeclaration,
    setAutos,
    setAutosName,
    setAutosParameters,
    addAutosLocation,
    updateAutosLocation,
    deleteAutosLocation,
    addAutosTransition,
    updateAutosTransition,
    deleteAutosTransition,
    setAutosDeclaration,
    setSystemDeclaration

}

export default modelReducer