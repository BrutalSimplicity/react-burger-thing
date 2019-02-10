import React from 'react';
import { Ingredients } from '../Burger/Burger';
import Button from '../UI/Button/Button';
import _ from 'lodash';

type OrderSummaryProps = {
    ingredients: Ingredients;
    price: number;
    purchaseContinued: () => void;
    purchaseCancelled: () => void;
}

const orderSummary = (props: OrderSummaryProps) => {
    const ingredientSummary = _.map(props.ingredients, (quantity, ingredient) => (
        <li key={ingredient}><span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {quantity}</li>
    ));
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType='Danger'
                clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button
                btnType='Success'
                clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    )
}

export default orderSummary;