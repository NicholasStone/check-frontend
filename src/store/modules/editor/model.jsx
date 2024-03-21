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
                        name:"A",
                        invariant:"",
                        x:250,
                        y:100,
                    },
                    {
                        id:2,
                        name:"req",
                        invariant:"x<=k",
                        x:500,
                        y:100,
                    },
                    {
                        id:3,
                        name:"cs",
                        invariant:"",
                        x:250,
                        y:350,
                    },
                    {
                        id:4,
                        name:"wait",
                        invariant:"",
                        x:500,
                        y:350,
                    },
                ],//id name x y
                transitions:[
                    {
                        id:1,
                        sourceId:1,
                        targetId:2,
                        nails:[],
                        guard:"id == 0",
                        update:"x = 0"
                    },
                    {
                        id:2,
                        sourceId:2,
                        targetId:4,
                        nails:[],
                        guard:"x <= k",
                        update:"x = 0 ,\nid = pid"
                    },
                    {
                        id:3,
                        sourceId:4,
                        targetId:3,
                        nails:[],
                        guard:"x > k && id == pid",
                        update:""
                    },
                    {
                        id:4,
                        sourceId:3,
                        targetId:1,
                        nails:[],
                        guard:"",
                        update:"id = 0"
                    },
                    {
                        id:5,
                        sourceId:4,
                        targetId:2,
                        nails:[
                            {
                                x:550,
                                y:300,
                            },
                            {
                                x:550,
                                y:150
                            }
                        ],
                        guard:"id == 0",
                        update:"x = 0"
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

const { setDeclaration,setAutosName,setAutosLocations,setAutosDeclaration,setSystemDeclaration } = modelStore.actions

//获取reducer函数

const modelReducer = modelStore.reducer

export { setDeclaration,setAutosName,setAutosLocations,setAutosDeclaration,setSystemDeclaration }

export default modelReducer