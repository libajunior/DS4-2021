
import { Button, LinearProgress, Snackbar, TextField, Typography } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { ErrorType } from "../App";
import { AuthAside } from "../components/AuthAside";
import serverAPI from "../services/serverAPI";

import '../styles/auth.scss';

export function SignUp() {
    const history = useHistory();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<ErrorType>({} as ErrorType);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [loading, setLoading] = useState(false);

    function navigationToSignIn() {
        history.push('/');
    }
    function handleCancel() {
        navigationToSignIn();
    }

    function handleSignUp(event: FormEvent) {
        event.preventDefault();

        //reseta variáveis de controle
        setError({} as ErrorType);

        //Valida se o campo NAME foi preenchido
        if (name.trim() === '') {
            setError({
                type: 'invalid-name',
                message: 'Campo obrigatório'
            });
            return;
        }

        //Valida se o campo EMAIL foi preenchido
        if (email.trim() === '') {
            setError({
                type: 'invalid-email',
                message: 'Campo obrigatório'
            });
            return;
        }

        //Valida se o campo PASSWORD foi preenchido
        if (password.trim() === '') {
            setError({
                type: 'invalid-password',
                message: 'Campo obrigatório'
            });
            return;
        }

        //Valida se o campo CONFIRM possuiu o mesmo valor do campo PASSWORD
        if (password !== confirm) {
            setError({
                type: 'invalid-confirm',
                message: 'Senhas diferentes'
            });
            return;
        }

        //Habilita o loading da página
        setLoading(true);

        //Cria um objeto do tipo USER para enviar para server
        const newUser = {
            name: name,
            email: email,
            password: password,
            avatar: `avatar${Math.floor(Math.random() * 17) + 1}.svg`
        }

        serverAPI.post('/auth/signup', newUser)
            .then(result => {
                setSuccess(true);
            })
            .catch(error => {
                setError({
                    type: 'exception',
                    message: error.response.data.message,
                })
            })
            .finally(() => {
                setLoading(false);
            })

    }

    function handleCloseError() {
        setError({} as ErrorType);
    }
    function handleCloseSuccess() {
        setSuccess(false);
        navigationToSignIn();
    }

    return (
        <div id="page-signup" className="page-auth">
            <main>
                <div className="main-content">
                    <Typography variant="h4">
                        Novo Usuário
                    </Typography>

                    <form onSubmit={handleSignUp}>

                        <TextField
                            label="Nome Completo"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={event => setName(event.target.value)}
                            error={error.type === 'invalid-name'}
                            helperText={error.type === 'invalid-name' && error.message}
                            disabled={loading}
                        />

                        <TextField
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            error={error.type === 'invalid-email'}
                            helperText={error.type === 'invalid-email' && error.message}
                            disabled={loading}
                        />

                        <div className="form-inline">
                            <TextField
                                label="Senha"
                                variant="outlined"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                error={error.type === 'invalid-password'}
                                helperText={error.type === 'invalid-password' && error.message}
                                disabled={loading}
                            />

                            <TextField
                                label="Confirmar"
                                variant="outlined"
                                type="password"
                                fullWidth
                                value={confirm}
                                onChange={event => setConfirm(event.target.value)}
                                error={error.type === 'invalid-confirm'}
                                helperText={error.type === 'invalid-confirm' && error.message}
                                disabled={loading}
                            />
                        </div>

                        {loading && <LinearProgress />}

                        <Snackbar 
                            open={success} 
                            autoHideDuration={3000}
                            onClose={handleCloseSuccess}>
                            <Alert 
                                variant="filled"
                                severity="success">
                                Usuário criado com sucessso!
                            </Alert>
                        </Snackbar>

                        <Snackbar 
                            open={error.type === 'exception'} 
                            autoHideDuration={6000}
                            onClose={handleCloseError}>
                            <Alert 
                                variant="filled"
                                severity="error"
                                onClose={handleCloseError}>
                                {error.message}
                            </Alert>
                        </Snackbar>

                        <div className="toolbar">
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleCancel}
                                disabled={loading}>
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                disabled={loading}>
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