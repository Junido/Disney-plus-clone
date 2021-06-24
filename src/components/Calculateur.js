import React,{useState} from 'react'
import styled from 'styled-components'
import Alert from '@material-ui/lab/Alert'
import { FormattedMessage, injectIntl } from 'react-intl';

import { 
    Button, 
    TextField,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Collapse 
} from '@material-ui/core'

function Calculateur() {

    const [state, setState] = useState({
        Name: "",
        Prenom: "",
        Email: "",
        Mobile: "",
        error_name:false,
        error_name_text:"",
        error_email: false,
        error_email_text: "",
        IsAnyError: false,
    });

    const [open, setOpen] = useState(false);

    const BtnClick = () => {
        var form = document.getElementsByClassName("FormGrid")[0];
        var elements = form.getElementsByTagName('input');
        if(!Validate(elements))
            setOpen(true);

    }

    const handleChange =  (event) => {
        let myListEvent = [];
        myListEvent.push(event.target);
        Validate(myListEvent);
    };

    const Validate = (elements) => {
        state.IsAnyError = false;
        for (var i=0; i < elements.length ;i++) {
          
            let Name = elements[i].name;
            let value = elements[i].value;
            
            switch (Name) {
                case 'Name':
                    if (value === "") {
                        state.IsAnyError = true;
                        state.error_name = true;
                        state.error_name_text="Le nom ne doit pas être vide";
                    } else {
                        state.error_name = false;
                        state.error_name_text="";
                    }
                    break;
                case 'Email':
                    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))) {
                        state.IsAnyError = true;
                        state.error_email = true;
                        state.error_email_text="Email invalide";
                    } else {
                        state.error_email = false;
                        state.error_email_text="";
                    }
                    break;
                default:
            }
            setState({
                ...state,
                [Name]:value
            });
           
        }
        setOpenAlert(state.IsAnyError);
        return state.IsAnyError;
    }

    const [openAlert, setOpenAlert] = React.useState(false);
   
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = (value) => {
        setOpen(false);
    };

    // const [scroll, setScroll] = React.useState('paper');
   

    return (
        
        <Container>
            <Grid className="FormGrid" container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Collapse in={openAlert}>
                        <Alert className="AlertMsg" severity="error" variant="outlined"><FormattedMessage id="calculateur.alertInput" /></Alert>
                    </Collapse>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField  fullWidth id="inputLastName" helperText={state.error_name_text} error={state.error_name} name="Name" label="Nom" value={state.Name} onChange={handleChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="inputFirstName" name="Prenom" label="Prenom" value={state.Prenom} onChange={handleChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField type="email" fullWidth id="inputEmail" name="Email" helperText={state.error_email_text} error={state.error_email} label="Email" value={state.Email} onChange={handleChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField  fullWidth id="inputMobile" name="Mobile" label="Mobile" value={state.Mobile} onChange={handleChange} variant="outlined" />
                </Grid>
                <Grid className="btn-zone" item xs={12}>
                    <Button onClick={BtnClick}  variant="contained" color="secondary">Secondary</Button>
                </Grid>
            </Grid>
            <Dialog 
                onClose={handleClose} 
                aria-labelledby="simple-dialog-title" 
                open={open}
            >
                <DialogTitle id="simple-dialog-title" onClose={handleClose}>Création de compte</DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                       Bonjour monsieur {state.Name} {state.Prenom} votre compte est desormé actif.
                    </Typography>
                </DialogContent>
            </Dialog>
        </Container>
       
    )
}

export default Calculateur

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;

    .MuiGrid-container {
        max-width: 800px;
        margin-top:25px;
        margin-left: auto;
        margin-right: auto;
        background-color: #f8f8ff;
        border-radius: 5px;
        border: 3px solid rgba(249, 249, 249, 0.1);
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        .btn-zone {
            text-align: right;
        }
    }

    &:before {
        background: url("/images/home-background.png") center center / cover 
        no-repeat fixed;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`
