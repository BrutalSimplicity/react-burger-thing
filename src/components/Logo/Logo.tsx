import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props: unknown) => (
    <div className={classes.Logo} >
        <img src={burgerLogo} alt="Kory's Burger" />
    </div>
)

export default logo;