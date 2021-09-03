import { Button, TextField, Typography } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorType } from "../App";
import { AuthAside } from "../components/AuthAside";

import '../styles/auth.scss';

export function SignIn() {

    const [error, setError] = useState<ErrorType>({} as ErrorType);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn(event: FormEvent) {
        event.preventDefault();

        //Valido se o campo EMAIL foi preenchido
        if (username.trim() === '') {
            setError({
                type:'invalid-username',
                message: 'Campo obrigatório'
            })
        }

        //Valido se o campo SENHA foi preenchido
        if (password.trim() === '') {
            setError({
                type:'invalid-password',
                message: 'Campo obrigatório'
            })
        }

        console.log('->', username)
    }

    return (
        <div id="page-signin" className="page-auth">
            <AuthAside />
            <main>
                <div className="main-content">
                    <Typography variant="h4">
                        Seja bem vindo!
                    </Typography>

                    <form onSubmit={handleSignIn}>
                        <TextField 
                            label="E-mail" 
                            variant="outlined" 
                            fullWidth
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            error={error.type === 'invalid-username'} 
                            helperText={error.message}
                        />

                        <TextField 
                            label="Senha" 
                            variant="outlined"
                            type="password" 
                            fullWidth
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            error={error.type === 'invalid-password'} 
                            helperText={error.message}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            type="submit">
                            Entrar
                        </Button>
                    </form>

                    <Link
                        to="/signup">
                        Não sou cadastrado    
                    </Link>
                </div>
            </main>
        </div>
    )
}