import React from 'react';
import classes from './BurgerIngredient.module.css';

export type BurgerIngredients =
    'meat' | 'cheese' | 'salad' | 'bacon'

type BurgerInredientProps = {
    type: BurgerIngredients;
}

const burgerIngredient = (props: BurgerInredientProps) => {
    switch (props.type) {
        case 'meat':
            return <div className={classes.Meat}></div>
        case 'bacon':
            return <div className={classes.Bacon}></div>
        case 'cheese':
            return <div className={classes.Cheese}></div>
        case 'salad':
        default:
            return <div className={classes.Salad}></div>
    }
};

export default burgerIngredient;