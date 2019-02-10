import React from 'react';
import classes from './Backdrop.module.css';

type BackdropProps = {
    show: boolean;
    click?: () => void;
}

const backdrop = (props: BackdropProps) => (
    props.show? <div className={classes.Backdrop} onClick={props.click}></div> : null
)

export default backdrop;