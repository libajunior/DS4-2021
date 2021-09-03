import { Typography } from '@material-ui/core';
import imageAside from '../../assets/img/aside-img.png';
import './style.scss';

export function AuthAside() {
    return (
        <aside className="auth-aside">
            <img src={imageAside} alt="Imagem que ilustra uma gestão de projetos" />
            
            <Typography variant="h4">
                WEB Project - Gestão de Projetos
            </Typography>
            
            <Typography variant="subtitle1">
                Sua ferramenta para gerir projetos e processos
            </Typography>

        </aside>
    )
}
