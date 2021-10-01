import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import serverAPI from "../../services/serverAPI";

import './style.scss';

export function Home() {

    const { user, token } = useAuth();

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        //Atribui o token salvo na requisição
        serverAPI.defaults.headers['Authorization'] = `Bearer ${token}`;

        //Carrega os projetos do servidor 
        serverAPI.get('/projects')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    function handleNewProject() {
        setOpenDialog(true);
    }

    function handleCreateProject() {

    }

    return (
        <div id="page-home">
            <Header />

            <main className="container">
                <div className="project-container">
                    <AppBar className="app-bar" position="static">
                        <Toolbar>
                            <Typography variant="h5" color="primary">
                                Projetos
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={handleNewProject}>
                                Adicionar Projeto
                            </Button>

                            <TextField
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                            
                            <IconButton title="Ordenar">
                                <SortIcon color="primary" />
                            </IconButton>

                        </Toolbar>

                    </AppBar>
                
                    <div className="project-content">

                    </div>
                </div>
            </main>

            <Dialog
                open={openDialog}
                fullWidth
                maxWidth="sm">

                <DialogTitle>
                    Novo Projeto
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Informe o nome e descrição do projeto
                    </DialogContentText>

                    <TextField
                        type="text"
                        fullWidth
                        label="Nome do Projeto"
                        variant="outlined"
                        size="small"
                        margin="normal"
                    />

                    <TextField
                        type="text"
                        fullWidth
                        label="Nome do Projeto"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        margin="normal"
                    />


                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={handleCreateProject}>
                        Confirmar
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}