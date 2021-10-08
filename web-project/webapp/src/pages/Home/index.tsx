import { AppBar, Button, Card, CardActionArea, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import { useEffect, useState } from "react";
import { ErrorType } from "../../App";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import serverAPI from "../../services/serverAPI";

import './style.scss';

export function Home() {

    const { user, token } = useAuth();

    const [error, setError] = useState({} as ErrorType);

    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const [projects, setProjects] = useState<any[]>([] as any);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        //Atribui o token salvo na requisição
        serverAPI.defaults.headers['Authorization'] = `Bearer ${token}`;

        //Carrega os projetos do servidor 
        serverAPI.get('/projects')
            .then(result => {
                setProjects(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    function handleNewProject() {
        setName('');
        setDescription('');
        setOpenDialog(true);
    }
    function handleCreateProject() {

        //Reset de variáveis
        setError({} as ErrorType);

        //Validar se o campo name foi preenchido
        if (name.trim() === '') {
            setError({
                type: 'invalid-name',
                message: 'Campo obrigatório'
            });

            return;
        }

        //Coloco a aplicação em modo loading
        setLoading(true);

        //Alimento um project para enviar ao servidor
        const project = {
            name: name,
            description: description,
            owner: user
        }

        //Envio o novo projeto para o servidor
        serverAPI.post('/projects', project)
            .then(result => {
                setProjects([...projects, result.data]);
                setLoading(false);
                setOpenDialog(false);
            })
            .catch(error => {
                setError({
                    type: 'exception',
                    message: error.message
                })
            })
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
                        {projects.map(project => {
                            return (
                                <div
                                    key={project.id}
                                    className="project-card-content">
                                    <Card
                                        className="project-card">
                                        <CardActionArea>
                                            
                                        </CardActionArea>    
                                    </Card>    
                                </div>
                            )
                        })}
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
                        autoFocus
                        label="Nome do Projeto"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        disabled={loading}
                        error={error.type === 'invalid-name'}
                        helperText={error.type === 'invalid-name' && error.message}
                    />

                    <TextField
                        type="text"
                        fullWidth
                        label="Descrição do Projeto"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        margin="normal"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        disabled={loading}
                    />

                </DialogContent>

                <DialogActions>
                    
                    {loading && <CircularProgress size={24} />}

                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => setOpenDialog(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        onClick={handleCreateProject}
                        disabled={loading}
                    >
                        Confirmar
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}