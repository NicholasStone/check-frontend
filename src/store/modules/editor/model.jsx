import { createSlice } from "@reduxjs/toolkit";

const modelStore = createSlice({
    name: "model",
    initialState: {
        declaration: "//Place global declarations here.",
        autos:[
            {
                name:"Template",
                parameters:"int id",
                locations:[
                    {
                        id:1,
                        name:{
                            content:"start",
                            x:250,
                            y:100
                        },
                        invariant:{
                            content:"",
                            x:250,
                            y:100
                        },
                        x:250,
                        y:100,
                    },
                    {
                        id:2,
                        name:{
                            content:"end",
                            x:500,
                            y:200
                        },
                        invariant:{
                            content:"x<=k",
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
                            content:"select",
                            x:270,
                            y:90
                        },
                        guard:{
                            content:"id == 0",
                            x:270,
                            y:90
                        },
                        sync:{
                            content:"sync",
                            x:270,
                            y:90
                        },
                        update:{
                            content:"x = 0",
                            x:450,
                            y:90
                        }
                    },
                ],//id source_id target_id guard update
                init:1,
                declaration:"// Place local declarations here."
            }
        ],
        systemDeclaration:"// Place template instantiations here.\nProcess = Template();\n// List one or more processes to be composed into a system.\nsystem Process;"
    },
    reducers: {
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