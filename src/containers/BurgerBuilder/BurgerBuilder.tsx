import React, { Component } from 'react';
import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { BurgerIngredients } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import _ from 'lodash';

const INGREDIENT_PRICE_LIST: {[k in BurgerIngredients]: number} = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


type BurgerBuilderState = {
    ingredients: Ingredients;
    totalPrice: number;
    purchaseable: boolean;
    purchasing: boolean;
}

class BurgerBuilder extends Component<{}, BurgerBuilderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4.00,
            purchaseable: false,
            purchasing: false
        };
    }

    addIngredientHandler = (type: BurgerIngredients) => {
        const quantity = this.state.ingredients[type];
        let updatedIngredients = {
            ...this.state.ingredients,
            [type]: quantity + 1
        };
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + INGREDIENT_PRICE_LIST[type]
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type: BurgerIngredients) => {
        const quantity = this.state.ingredients[type];
        if (quantity < 1)
            return;

        let updatedIngredients = {
            ...this.state.ingredients,
            [type]: quantity - 1
        };
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - INGREDIENT_PRICE_LIST[type]
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients: Ingredients) => {
        const sum = _.reduce(ingredients, (acc, quantity) => acc + quantity, 0);
        this.setState({ purchaseable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render() {
        let disabledInfo =  _.reduce(this.state.ingredients, (acc, quantity, ingredient) => {
            acc[ingredient] = quantity <= 0;
            return acc;
        }, {} as {[x: string]: boolean});
        
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler} 
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable} />
            </>
        );
    }
}

export default BurgerBuilder;