import * as Action_Types from "../actionsTypes";
import { ProductByMount } from "../../utils/modals";

export interface IstatePro {
  productsList: ProductByMount[];
  amountProducts: number;
}
const initialState: IstatePro = {} as IstatePro;

export const productInListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action_Types.GET_PURCHASE_LIST:
      return {
        productsList: action.payload.productsList,
        amountProducts: action.payload.amountProducts,
      };
    case Action_Types.REMOVE_PRODUCT:
      return {
        ...state,
        productsList: [
          ...state.productsList.map((i: ProductByMount) => {
            if (i.id === action.payload.id) {
              i.amount = 0;
            }
            return i;
          }),
        ],
        amountProducts: state.amountProducts - 1,
      };
    case Action_Types.DECREASE_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.map((i: ProductByMount) => {
          if (i.id === action.payload.id) {
            i.amount -= 1;
            if (i.amount === 0) state.amountProducts = state.amountProducts - 1;
          }
          return i;
        }),
      };
    case Action_Types.INCREAES_PRODUCT:
      if (
        state.productsList?.find(
          (i: ProductByMount) => i.id === action.payload.id
        )
      )
        return {
          ...state,
          productsList: [
            ...state.productsList.map((i: ProductByMount) => {
              if (i.id === action.payload.id) {
                console.log(i.amount, action.payload.amount);
                i.amount = i.amount + action.payload.amount;
              }
              return i;
            }),
          ],
        };
      else
        return {
          ...state,
          productsList: [...(state.productsList || []), action.payload],
          amountProducts: state.amountProducts + 1,
        };
    case Action_Types.CLEAR_PURCHASE_LIST:
      return {
        productsList: [],
        amountProducts: 0,
      };
  }

  return state;
};
