import { AppBar, Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Slider, Snackbar, Tab, Tabs, TextField, Toolbar, Tooltip, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StatusColumn, Task } from '../../@types';
import { ErrorType } from '../../App';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import serverAPI from '../../services/serverAPI';
import { TwitterPicker, ColorResult } from 'react-color';

import './style.scss';
import { Alert, Rating } from '@material-ui/lab';

type ProjectParams = {
    id: string;
}

export function Kanban() {

    const params = useParams<ProjectParams>();
    const projectId = Number(params.id);

    const [error, setError] = useState({} as ErrorType);
    const [success, setSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');

    const [task, setTask] = useState<Task>({} as Task);
    const [tasks, setTasks] = useState<Task[]>([] as Task[]);

    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openDialogTask, setOpenDialogTask] = useState(false);

    const [abaAtiva, setAbaAtiva] = useState('geral');

    const [project, setProject] = useState({} as any);

    //Column
    const [openDialogColumn, setOpenDialogColumn] = useState(false);
    const [columnName, setColumnName] = useState('');
    const [columnColor, setColumnColor] = useState('#FF6900');


    const { token, user } = useAuth();

    useEffect(() => {

        //Atribui o token salvo na requisição
        serverAPI.defaults.headers['Authorization'] = `Bearer ${token}`;

        //Carrega os projetos do servidor 
        serverAPI.get(`/projects/${projectId}`)
            .then(result => {
                setProject(result.data);

                return serverAPI.get(`/projects/${projectId}/tasks`)
            })
            .then(resultTasks => {
                setTasks(resultTasks.data);
            })
            .catch(error => {
                setError({
                    type: 'exception',
                    message: error.message
                });
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
        serverAPI.post(`/projects/${project.id}/statuscolumns`, column)
            .then(result => {
                setOpenDialogColumn(false);
                setProject({ ...project, statusColumns: [...project.statusColumns, result.data] })

                setSuccess(true);
                setMessageSuccess('Coluna criada com sucesso!')
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

    function handleAddTask(statusColumn: StatusColumn) {

        setTask({
            statusColumn: statusColumn,
            owner: user,
            title: '',
            description: '',
            priority: 0,
            percentage: 0
        } as Task);

        setAdding(true);
    }
    function handleCancelAddTask() {
        setTask({} as Task);
        setAdding(false);
    }
    function handleCreateTask() {
        //Coloco a aplicação em modo loading
        setLoading(true);

        //Chamo server para gravar
        serverAPI.post(`/projects/${project.id}/tasks`, task)
            .then(result => {
                setAdding(false);
                setTask({} as Task);

                setTasks([...tasks, result.data])

                setSuccess(true);
                setMessageSuccess('Tarefa criada com sucesso!')
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
    function handleOpenTask(task: Task) {
        setTask(task);
        setOpenDialogTask(true);
    }
    function handleUpdateTask() {
        //Coloco a aplicação em modo loading
        setLoading(true);

        //Chamo server para gravar
        serverAPI.put(`/projects/${project.id}/tasks/${task.id}`, task)
            .then(result => {
                setOpenDialogTask(false);

                const filteredTasks = tasks.filter(itemFilter => itemFilter.id !== task.id);
                setTasks([...filteredTasks, result.data])

                setTask({} as Task);

                setSuccess(true);
                setMessageSuccess('Tarefa atualizada com sucesso!')
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
    function handleMudarAbaAtiva(event: ChangeEvent<{}>, aba: string) {
        setAbaAtiva(aba);
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
                                style={{ 'borderTopColor': statusColumn.color }}>
                                <div className="kanban-header">
                                    <Typography variant="subtitle1">
                                        {statusColumn.name}
                                    </Typography>

                                    <Tooltip title="Adicionar tarefa">
                                        <IconButton
                                            onClick={() => handleAddTask(statusColumn)}
                                            size="small">
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="kanban-body">
                                    {tasks.filter(item => statusColumn.id === item.statusColumn.id).map(task => {
                                        return (
                                            <div
                                                key={task.id}
                                                className="kanban-card card-task"
                                                onClick={() => handleOpenTask(task)}>
                                                <Typography variant="body2" component="h5">
                                                    {task.title}
                                                </Typography>

                                                <div className="card-task-detail">
                                                    <Rating
                                                        name="read-only"
                                                        readOnly
                                                        size="small"
                                                        value={task.priority}
                                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                                    />
                                                    <Avatar
                                                        className="card-task-avatar"
                                                        alt={task.owner.name}
                                                        src={`../assets/avatar/${task.owner.avatar}`}
                                                    />
                                                </div>

                                                <LinearProgress
                                                    variant="determinate"
                                                    value={task.percentage}
                                                />
                                            </div>
                                        );
                                    })}
                                    {(task.statusColumn && adding) && (
                                        <div
                                            className="kanban-card"
                                            hidden={statusColumn.id !== task.statusColumn.id}>
                                            <textarea
                                                autoFocus
                                                value={task.title}
                                                onChange={event => setTask({ ...task, title: event.target.value })}
                                                rows={2} />

                                            <div className="kanban-card-action">
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="default"
                                                    onClick={handleCancelAddTask}>
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={task.title.trim() === ''}
                                                    onClick={handleCreateTask}>
                                                    Adicionar
                                                </Button>
                                            </div>

                                        </div>
                                    )}
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

            <Dialog
                open={openDialogTask}
                fullWidth
                maxWidth="sm">

                <DialogTitle>
                    Editar Tarefa
                </DialogTitle>

                <DialogContent>
                    <Tabs value={abaAtiva}
                        onChange={handleMudarAbaAtiva}
                        indicatorColor="primary">
                        <Tab value="geral" label="Geral" />
                        <Tab value="descricao" label="Descrição" />
                    </Tabs>

                    {abaAtiva === 'geral' ? (
                        <div className="dialog-tab-content">
                            <TextField
                                fullWidth
                                label="Título da tarefa"
                                variant="outlined"
                                size="small"
                                type="text"
                                margin="normal"
                                value={task.title}
                                onChange={event => setTask({ ...task, title: event.target.value })}
                                error={error.type === 'invalid-task-title'}
                                helperText={error.type === 'invalid-task-title' && error.message}
                                disabled={loading} />

                            <div className="form-inline">
                                <Box component="fieldset" borderColor="transparent">
                                    <Typography variant="caption" component="legend">
                                        Prioridade
                                    </Typography>

                                    <Rating
                                        name="priority"
                                        value={task.priority}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        onChange={(event, newValue) => setTask({ ...task, priority: newValue || 0 })}
                                    />
                                </Box>
                                <Box component="fieldset" borderColor="transparent">
                                    <Typography variant="caption" component="legend">
                                        Percentual
                                    </Typography>

                                    <Slider
                                        value={task.percentage}
                                        min={0}
                                        max={100}
                                        step={5}
                                        valueLabelDisplay="auto"
                                        onChange={(event, newValue) => setTask({ ...task, percentage: newValue as number || 0 })}
                                    />

                                </Box>
                            </div>
                        </div>
                    ) : (
                        <div className="dialog-tab-content">
                            <TextField
                                fullWidth
                                label="Descrição da tarefa"
                                variant="outlined"
                                size="small"
                                type="text"
                                margin="normal"
                                value={task.title}
                                onChange={event => setTask({ ...task, description: event.target.value })}
                                disabled={loading}
                                multiline
                                rows={4} />
                        </div>
                    )}
                </DialogContent>

                <DialogActions>

                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => setOpenDialogTask(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        onClick={handleUpdateTask}
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
    );
}


