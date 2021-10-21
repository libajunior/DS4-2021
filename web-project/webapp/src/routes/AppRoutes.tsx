import { Switch, Route } from "react-router";
import { Home } from "../pages/Home";
import { Kanban } from "../pages/Kanban";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projects" exact component={Home} />
            <Route path="/projects/:id" component={Kanban} />
            <Route component={NotFound} />
        </Switch>
    )
}