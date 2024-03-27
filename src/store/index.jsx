import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./modules/editor/model";
import barReducer from "./modules/editor/bar";
import propertyReducer from "./modules/verifier/property";
import drawerReducer from "./modules/editor/drawer";

//组合redux子模块+导出store实例
const store = configureStore({
    reducer:{
        bar:barReducer,
        drawer:drawerReducer,
        model:modelReducer,
        property:propertyReducer
    }
})

export default store