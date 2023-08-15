
export interface CartState {
    cart: [];
    errorMessage: string;
    success: boolean;
}

export type CartAction= | {
    type: 'addToCart';
    payload: {
        cart: [], errorMessage: string,
    }
}


export const CartReducer = ( state: CartState, action: CartAction): CartState =>{
    switch (action.type) {
        case 'addToCart':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
            };
            default:
                return state;
    }

   
};