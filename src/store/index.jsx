import { configureStore } from "@reduxjs/toolkit";
import toolbarReducer from "./modules/toolbar";
import modebarReducer from "./modules/modebar";

//组合redux子模块+导出store实例
const store = configureStore({
    reducer:{
        toolbar:toolbarReducer,
        modebar:modebarReducer
    }
})

export default store