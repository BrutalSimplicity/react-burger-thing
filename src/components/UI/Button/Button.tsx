import React from 'react';
import classes from './Button.module.css';

type ButtonProps = {
    clicked: () => void;
    children?: React.ReactNode;
    btnType: 'Danger' | 'Success';
}

const button = (props: ButtonProps) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
)

export default button;