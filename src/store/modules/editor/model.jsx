import { createSlice } from "@reduxjs/toolkit";

const modelStore = createSlice({
    name: "model",
    initialState: {
        declaration: "//Place global declarations here.",
        autos:[
            {
                name:"Template",
                parameters:[],
                locations:[
                    {
                        id:1,
                        name:"start",
                        x:250,
                        y:200,
                    },
                    {
                        id:2,
                        name:"end",
                        x:500,
                        y:200,
                    },
                ],//id name x y
                transitions:[],//id source_id target_id guard update
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
        setAutosName(state, action){
            state.autos[0].name = action.payload
        },
        setAutosLocations(state, action){
            state.autos[0].locations = action.payload
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

const { setDeclaration,setAutosName,setAutosDeclaration,setSystemDeclaration } = modelStore.actions

//获取reducer函数

const modelReducer = modelStore.reducer

export { setDeclaration,setAutosName,setAutosDeclaration,setSystemDeclaration }

export default modelReducer