import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient, { BurgerIngredients } from './BurgerIngredient/BurgerIngredient';
import Bun from './BurgerIngredient/Bun/Bun';
import _ from 'lodash';

export type Ingredients = {
    [k in BurgerIngredients]: number;
}

type BurgerProps = {
    ingredients: Ingredients;
}

let genKey = (key: string, index: number) => key + index;

const burger = (props: BurgerProps) => {
    let ingredientsView: JSX.Element[] | JSX.Element = _.flatMap(props.ingredients, (quantity, ingredient) =>
        _.times(quantity, i => (
            <BurgerIngredient key={genKey(ingredient, i)} type={ingredient as BurgerIngredients} />
        ))
    );
    ingredientsView = ingredientsView.length === 0 ? 
        <p>Please start adding ingredients!</p> : ingredientsView;

    return (
        <div className={classes.Burger}>
            <Bun>
                {ingredientsView}
            </Bun>
        </div>
    );
}

export default burger;