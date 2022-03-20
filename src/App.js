import { ThemeProvider } from "@material-ui/styles";
import Navigation from "./firebase/components/Navigation";
import { BrowserRouter, Switch } from "react-router-dom";
import theme from "./Theme";
import { Grid } from "@material-ui/core";
import PrivateRoute from "./firebase/components/PrivateRoute";
import PublicRoute from "./firebase/components/PublicRoute";
import SignUp from "./firebase/pages/SignUp";
import Login from "./firebase/pages/Login";
import { useEffect, useState } from "react";
import { auth } from './firebase/services/index';
import Homepage from "./firebase/pages/Homepage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    })
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <BrowserRouter>
          <Grid item md={3}>
            {isAuthenticated && <Navigation />}
          </Grid>
          <Grid item md={6}>
            <Switch>
              <PublicRoute
                path="/register"
                isAuthenticated={isAuthenticated}
                component={SignUp}
              ></PublicRoute>
              <PublicRoute
                path="/login"
                isAuthenticated={isAuthenticated}
                component={Login}
              ></PublicRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} />
              {/* <PublicRoute isAuthenticated={isAuthenticated} /> */}
            </Switch>
          </Grid>
          <Grid item md={3}></Grid>
        </BrowserRouter>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
