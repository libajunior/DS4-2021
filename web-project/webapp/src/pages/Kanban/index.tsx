import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Toolbar, Tooltip, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Project } from '../../@types';
import { ErrorType } from '../../App';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import serverAPI from '../../services/serverAPI';
import {TwitterPicker, ColorResult} from 'react-color';

import './style.scss';

type ProjectParams = {
    id: string;
}

export function Kanban() {

    const params = useParams<ProjectParams>();
    const projectId = Number(params.id);

    const [error, setError] = useState({} as ErrorType);

    const [loading, setLoading] = useState(false);

    const [project, setProject] = useState({} as any);

    //Column
    const [openDialogColumn, setOpenDialogColumn] = useState(false);
    const [columnName, setColumnName] = useState('');
    const [columnColor, setColumnColor] = useState('#FF6900');
    

    const { token } = useAuth();

    useEffect(() => {

        //Atribui o token salvo na requisição
        serverAPI.defaults.headers['Authorization'] = `Bearer ${token}`;

        //Carrega os projetos do servidor 
        serverAPI.get(`/projects/${projectId}`)
            .then(result => {
                setProject(result.data);
            })
            .catch(error => {
                console.log('PAU', error);
            });

    }, []);

    function handleOpenDialogNewColumn() {
        //Resetar as variaveis
        setColumnName('');
        setColumnColor('#FF6900');

        setOpenDialogColumn(true);
    }

    function handleSelectColor(color: ColorResult, event: ChangeEvent) {
        setColumnColor(color.hex);
    }

    function handleCreateColumn() {
        if (columnName.trim() === '') {
            setError({
                type: 'invalid-name',
                message: 'Campo obrigatório'
            });

            return;
        }

        //Coloco a aplicação em modo loading
        setLoading(true);

        //Alimento um objeto
        const column = {
            name: columnName,
            color: columnColor
        }

        //Chamo server para gravar
        serverAPI.post(`/projects/${project.id}/statuscolumn`, column)
            .then(result => {
                setOpenDialogColumn(false);
                setProject({...project, statusColumns: [...project.statusColumns, result.data]})
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

    return (
        <div id="page-kanban">
            <Header />

            <main className="container">
                <AppBar className="app-bar" position="static">
                    <Toolbar>
                        <Typography variant="h5" color="primary">
                            {project.name}
                        </Typography>
                        
                        <IconButton title="Ordenar">
                            <MoreVertIcon color="primary" />
                        </IconButton>

                    </Toolbar>

                </AppBar>

                <div className="kanban-content">
                    {project.statusColumns && project.statusColumns.map((statusColumn: any) => {
                        return (
                            <div 
                                key={statusColumn.id}
                                className="kanban-column kanban-column-content"
                                style={{'borderTopColor': statusColumn.color}}>
                                <div className="kanban-header">
                                    <Typography variant="subtitle1">
                                        {statusColumn.name}
                                    </Typography>
                                
                                    <Tooltip title="Adicionar tarefa">
                                        <IconButton
                                            size="small">
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        )
                    })}
                    <div className="kanban-column">
                        <Button
                            color="default"
                            variant="outlined"
                            size="medium"
                            onClick={handleOpenDialogNewColumn}>
                            Adicionar Coluna
                        </Button>
                    </div>

                </div>

            </main>

            <Dialog
                open={openDialogColumn}
                fullWidth
                maxWidth="xs">

                <DialogTitle>
                    Novo Coluna
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Informe um nome e uma cor para a coluna.
                    </DialogContentText>

                    <TextField
                        type="text"
                        fullWidth
                        autoFocus
                        label="Nome da Coluna"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        value={columnName}
                        onChange={event => setColumnName(event.target.value)}
                        disabled={loading}
                        error={error.type === 'invalid-name'}
                        helperText={error.type === 'invalid-name' && error.message}
                    />
                    <TwitterPicker
                        color={columnColor}
                        width="100%"
                        onChange={handleSelectColor}
                         />
                    

                </DialogContent>

                <DialogActions>
                    
                    {loading && <CircularProgress size={24} />}

                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => setOpenDialogColumn(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        onClick={handleCreateColumn}
                        disabled={loading}
                    >
                        Confirmar
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}