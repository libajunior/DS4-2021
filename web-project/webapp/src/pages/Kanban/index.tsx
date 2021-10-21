import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Project } from '../../@types';
import { Header } from '../../components/Header';
import serverAPI from '../../services/serverAPI';
import './style.scss';

type ProjectParams = {
    id: string;
}

export function Kanban() {

    const params = useParams<ProjectParams>();
    const projectId = Number(params.id);

    const [project, setProject] = useState<Project>({} as Project)

    useEffect(() => {

        serverAPI.get(`/projects/${projectId}`)
            .then(result => {
                console.log('OK', result);
            })
            .catch(error => {
                console.log('PAU', error);
            });

    }, []);

    return (
        <div id="page-kanban">
            <Header />

            <main className="container">
                <AppBar className="app-bar" position="static">
                    <Toolbar>
                        <Typography variant="h5" color="primary">
                            Projetos
                        </Typography>
                        
                        <IconButton title="Ordenar">
                            <MoreVertIcon color="primary" />
                        </IconButton>

                    </Toolbar>

                </AppBar>
            </main>
        </div>
    );
}