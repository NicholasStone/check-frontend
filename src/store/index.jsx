import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./modules/editor/model";
import barReducer from "./modules/editor/bar";

//组合redux子模块+导出store实例
const store = configureStore({
    reducer:{
        bar:barReducer,
        model:modelReducer
    }
})

export default store