import { configureStore } from "@reduxjs/toolkit";
import todoSlise from "./todo-slise";

export default configureStore({
    reducer:{
        todos: todoSlise,
    }
})