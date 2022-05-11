import { ActionTypes } from "@mui/base";
import * as Action_Types from "../actionsTypes";
import { ProductByMount } from "../../utils/modals";
import { removeProductFromList } from "../Actions/ProductInList";
import React, { useState } from "react";
import axios from "axios";
//  export function ExternalFunc(){
//     const [data, setData] = useState<ProductByMount[]>([{id:123,
//         name :"name",
//         category:1,
//         PurchasesHistoryId:"123",
//         PurchasePrognosisId:"fgvhj",
//         amount:3}]);
// React.useEffect(() => {
//     var peoplePromise = axios.get("https://localhost:44378/api/PurchasePrognosis").then((response) => {
//         setData(response.data);
//         console.log("hhhh")
//     });
// }, []);
//     return data;
// }

const initialState = {
    productsList: [] = [{
        id: 123,
        name: "name",
        category: 1,
        PurchasesHistoryId: "123",
        PurchasePrognosisId: "fgvhj",
        amount: 3
    }]
}
// function handleRemove(id:number) {
//     const newList = state.productsList.filter((item) => item.id !== id);

//     setList(newList);
//   }
export const productInListReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case Action_Types.REMOVE_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.filter(i => i !== action.payload)],
            }
        case Action_Types.DECREASE_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount == 1 ? removeProductFromList(i) : i.amount -= 1 : i)]//check recurse
            }
        case Action_Types.INCREAES_PRODUCT:
            if (state.productsList.find((i: ProductByMount) => i == action.payload))
                return {
                    ...state,
                    productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount += action.payload.amount : i)]
                }
            else return {
                ...state,
                productsList: [...state.productsList, action.payload]
            }
    }

    return state;
}