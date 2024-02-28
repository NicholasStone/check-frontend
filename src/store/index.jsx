import { configureStore } from "@reduxjs/toolkit";
import toolbarReducer from "./modules/toolbar";

//组合redux子模块+导出store实例
const store = configureStore({
    reducer:{
        toolbar:toolbarReducer
    }
})

export default store