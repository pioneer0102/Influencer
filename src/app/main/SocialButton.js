// import React from "react";
// import SocialLogin from "react-social-login";

// class SocialButton extends React.Component {
//   render() {
//     const { children, triggerLogin, ...props } = this.props;
//     return (
//       <button onClick={triggerLogin} {...props}>
//         {children}
//       </button>
//     );
//   }
// }

// export default SocialLogin(SocialButton);

import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Img } from './Img';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function SocialButton(props) {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, props.container)}>
            {
                props.to !== undefined ?
                <Button
                    component={Link}
                    to={props.to}
                    className={props.className}
                    variant={props.variant}
                >
                    {
                        props.src !== undefined ?
                        <Img
                            src={props.src}
                            className={props.iconClass !== undefined ? props.iconClass : "w-24 h-24 mr-8"}
                            alt="logo"
                        />
                        :
                        <></>
                    }
                    <span className={props.textStyle}>{props.text}</span>
                </Button>
                :
                <Button
                    onClick={props.onClick}
                    className={props.className}
                    variant={props.variant}
                >
                    {
                        props.src !== undefined ?
                        <Img
                            src={props.src}
                            className={props.iconClass !== undefined ? props.iconClass : "w-24 h-24 mr-8"}
                            alt="logo"
                        />
                        :
                        <></>
                    }
                    <span className={props.textStyle}>{props.text}</span>
                </Button>
            }
        </div>
    );
}

export default SocialButton;