import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { checkPropTypes } from 'prop-types';

type SideDrawerProps = {
    closed: () => void;
    open: boolean;
}

const sideDrawer = (props: SideDrawerProps) => {
    const attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open)
        attachedClasses[1] = classes.Open;
    return (
        <>
            <Backdrop show={props.open} click={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;