import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useAuth } from "../../hooks/useAuth";

import './style.scss';

export function Header() {

    const { user } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar
                className="header-toolbar">
                <Typography variant="h6">
                    WEB Project
                </Typography>
                
                <Tooltip title={user?.name || ''}>
                    <IconButton
                        color="primary">
                        <Avatar
                            alt={user?.name || ''}
                            src={`../assets/avatar/${user?.avatar}`}
                        />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}