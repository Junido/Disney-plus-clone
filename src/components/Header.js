import React, { useEffect,useContext, useState } from 'react'
import Context  from "./Wrapper";
import {auth, provider } from "../firebase"
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import EmojiNatureOutlinedIcon from '@material-ui/icons/EmojiNatureOutlined';
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from '../features/user/userSlice';
import { 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core'
import {
    Link
} from "react-router-dom"; 
import { useDispatch, useSelector } from  "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

function Header() {

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));
    const classes = useStyles();
   
    const BootstrapInput = withStyles((theme) => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(3),
          },
        },
        input: {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: "black",
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }))(InputBase);


    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email:  user.email,
                    photo: user.photoURL
                }))
                //history.push("/");
            } else {
                history.push("/login");
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email:  user.email,
                photo: user.photoURL
            }))
            history.push("/");
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push("/login");
        })
    }

    const context = useContext(Context);
    const [lang, setLang] = useState("fr");

    const ChangeLang = (evt) => {
        var lg = evt.target.value;
        console.log(lg);
        setLang(lg);
        
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            { !userName ?
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer> :
                <>
                    <NavMenu>
                        <Link to="/" >
                            <img src="/images/home-icon.svg" />
                            <span>HOME</span>
                        </Link>
                        <Link to="/calculateur" >
                            <EmojiNatureOutlinedIcon/>
                            <span>NATURE</span>
                        </Link>
                        <a>
                            <img src="/images/search-icon.svg" />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src="/images/watchlist-icon.svg" />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src="/images/movie-icon.svg" />
                            <span>ORIGINAL</span>
                        </a>
                        <a>
                            <img src="/images/series-icon.svg" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <FormControl className={classes.margin}>
                        <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={lang}
                        onChange={ChangeLang}
                        input={<BootstrapInput />}
                        >
                        <MenuItem value="fr">
                            <img width="20px" src="/images/france.png" alt="Français" />
                        </MenuItem>
                        <MenuItem value="en">
                            <img width="20px" src="/images/united-kingdom.png" alt="English" />
                        </MenuItem>
                        </Select>
                    </FormControl>
                    <UserImg onClick={signOut} src={userPhoto} />
                </>
            }
            
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height:70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding:0 36px;
    overflow-x: hidden;
`
const Logo = styled.img`
    width: 80px;
`
const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 20px;
    cursor: pointer;
    align-items: center;
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        color: #fff;
        img {
            height:20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0px;
                bottom: -6px;
                opacity:0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;

            }
        }
    }
`
const UserImg  = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`
const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`