import { Button, TextField, Typography } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ErrorType } from "../App";
import { AuthAside } from "../components/AuthAside";
import { useAuth } from "../hooks/useAuth";

import '../styles/auth.scss';

export function SignIn() {
    const history = useHistory();

    const [error, setError] = useState<ErrorType>({} as ErrorType);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { user, signIn } = useAuth();

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

        const credential = {
            username: username,
            password: password
        }

        signIn(credential)
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                setError({
                    type: error.response.data.name,
                    message: error.response.data.message
                })
            });
    }

    return (
        <div id="page-signin" className="page-auth">
            <AuthAside />
            <main>
                <div className="main-content">
                    <Typography variant="h4">
                        Seja bem vindo! {user?.name}
                    </Typography>

                    <form onSubmit={handleSignIn}>
                        <TextField 
                            label="E-mail" 
                            variant="outlined" 
                            fullWidth
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            error={error.type === 'auth-invalid-username'} 
                            helperText={error.type === 'auth-invalid-username' && error.message}
                        />

                        <TextField 
                            label="Senha" 
                            variant="outlined"
                            type="password" 
                            fullWidth
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            error={error.type === 'auth-invalid-password'} 
                            helperText={error.type === 'auth-invalid-password' && error.message}
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