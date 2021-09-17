import { Switch, Route } from "react-router";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
        </Switch>
    )
}