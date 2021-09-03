
import { Button, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { AuthAside } from "../components/AuthAside";

import '../styles/auth.scss';

export function SignUp() {
    const history = useHistory();

    function handleCancel() {
        history.push('/');
    }

    return (
        <div id="page-signup" className="page-auth">
            <main>
                <div className="main-content">
                    <Typography variant="h4">
                        Novo Usuário
                    </Typography>

                    <form>
                        
                        <TextField 
                            label="Nome Completo" 
                            variant="outlined" 
                            fullWidth />

                        <TextField 
                            label="E-mail" 
                            variant="outlined" 
                            fullWidth />

                        <div className="form-inline">
                            <TextField 
                                label="Senha" 
                                variant="outlined"
                                type="password" 
                                fullWidth />

                            <TextField 
                                label="Confirmar" 
                                variant="outlined"
                                type="password" 
                                fullWidth />
                        </div>

                        <div className="toolbar">
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large">
                                Confirmar
                            </Button>
                        </div>
                    </form>                    
                </div>
            </main>

            <AuthAside />
        </div>
    )
}