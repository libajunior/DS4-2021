import { AppBar, Avatar, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Snackbar, TextField, Toolbar, Tooltip, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import { useEffect, useState } from "react";
import { ErrorType } from "../../App";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import serverAPI from "../../services/serverAPI";

import imgBgCard from '../../assets/img/card-background.png';

import './style.scss';
import { useHistory } from "react-router";
import { Project } from "../../@types";
import { Alert } from "@material-ui/lab";

export function Home() {
    const history = useHistory();

    const { user, token } = useAuth();

    const [error, setError] = useState({} as ErrorType);
    const [success, setSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');

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
                setOpenDialog(false);

                setSuccess(true);
                setMessageSuccess('Projeto criado com sucesso!')
            })
            .catch(error => {
                setError({
                    type: 'exception',
                    message: error.message
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleOpenProject(project: Project): void {
        history.push(`/projects/${project.id}`);
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
                                    className="project-card-container">
                                    <Card
                                        className="project-card">
                                        <CardActionArea
                                            onClick={() => handleOpenProject(project)}>
                                            
                                            <CardContent
                                                className="project-card-title">
                                                {project.name.length >= 28 ? (

                                                    <Tooltip title={project.name}>
                                                        <Typography variant="h6" component="span">
                                                            {`${project.name.substring(0, 25)}...`}
                                                        </Typography>   
                                                    </Tooltip>

                                                ) : (

                                                    <Typography component="span">
                                                        {project.name}
                                                    </Typography>

                                                ) }
                                            </CardContent>

                                            <CardMedia
                                                className="project-card-media"
                                                image={imgBgCard}/>
                                        </CardActionArea>    
                                    </Card> 

                                    <Avatar
                                        className="project-avatar"
                                        src={`../assets/avatar/${project.owner.avatar}`} 
                                        alt={project.owner.name}/>   
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

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}>
                
                <Alert 
                    variant="filled" 
                    severity="success"
                    onClose={() => setSuccess(false)}>
                    {messageSuccess}
                </Alert>
            </Snackbar>

            <Snackbar
                open={error.type === 'exception'}
                autoHideDuration={6000}
                onClose={() => setError({} as ErrorType)}>
                
                <Alert 
                    variant="filled" 
                    severity="error"
                    onClose={() => setError({} as ErrorType)}>
                    {error.message}
                </Alert>
            </Snackbar>            
        </div>
    )
}