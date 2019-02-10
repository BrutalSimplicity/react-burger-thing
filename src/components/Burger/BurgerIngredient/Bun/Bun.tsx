import React from 'react';
import classes from './Bun.module.css';

const bun = (props: {children: React.ReactNode}) => (
    <>
        <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
        </div>
        {props.children}
        <div className={classes.BreadBottom}></div>
    </>
)
    
export default bun;