import { Route, Routes } from "react-router-dom";
import {Layout} from "./RoutList";

const Index = () => {
  return <Routes>
    {renderRoutes(Layout)}
  </Routes>
}

function renderRoutes(routes: any) {
  return routes.map((route: any, index: number) => (
    <Route
      key={index}
      path={route.path}
      element={<route.element />}
    >
      {route.child && renderRoutes(route.child)}
    </Route>
  ));
}

export default Index
