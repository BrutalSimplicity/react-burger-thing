import React, { Component } from 'react';
import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { BurgerIngredients } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import _ from 'lodash';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    loading: boolean;
    error: boolean;
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
            purchasing: false,
            loading: false,
            error: false,
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

    purchaseContinueHandler = async () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kory Taborn',
                address: {
                    street: 'Teststreet 1',
                    city: 'Plano',
                    zipCode: '75024',
                    state: 'Texas'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        try
        {
            await axios.post('/orders.json', order);
        }
        finally
        {
            this.setState({ loading: false, purchasing: false });
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    async componentDidMount() {
        try
        {
            const response = await axios.get('/ingredients.json');
            let ingredients = response.data as Ingredients;
            let cost = _.reduce(ingredients, (acc, q, ing) => acc + q * INGREDIENT_PRICE_LIST[ing as BurgerIngredients], 0);
            this.setState({
                ingredients: ingredients,
                totalPrice: this.state.totalPrice + cost
            });
        }
        catch
        {
            this.setState({ error: true });
        }
    }

    render() {
        let disabledInfo =  _.reduce(this.state.ingredients, (acc, quantity, ingredient) => {
            acc[ingredient] = quantity <= 0;
            return acc;
        }, {} as {[x: string]: boolean});

        let orderSummary: JSX.Element | null = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <>
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
            orderSummary = 
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler} 
                    purchaseContinued={this.purchaseContinueHandler}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);