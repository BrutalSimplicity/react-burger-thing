import React from 'react';
import { BurgerIngredients } from '../BurgerIngredient/BurgerIngredient';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

type Control = {
    label: string;
    type: BurgerIngredients;
}

const controls: Control[] = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

type BuildControlsProps = {
    price: number;
    ingredientsAdded: (type: BurgerIngredients) => void;
    ingredientsRemoved: (type: BurgerIngredients) => void;
    disabled: {[key: string]: boolean};
    purchaseable: boolean;
    ordered: () => void;
}

const buildControls = (props: BuildControlsProps) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => 
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientsAdded(ctrl.type)} 
                removed={() => props.ingredientsRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />)}
        <button 
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
)
export default buildControls;