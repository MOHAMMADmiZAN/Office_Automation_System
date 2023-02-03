import {createStore, persist} from "easy-peasy";
import AuthModel from "./models/AuthModel";

export  interface StoreModel {
    Auth: typeof AuthModel


}


const store = createStore<StoreModel>({
    Auth: persist(AuthModel, {storage: "localStorage"}),


})

export default store