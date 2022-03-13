import { ThemeProvider } from "@material-ui/styles";
import Navigation from "./firebase/components/Navigation";
import { BrowserRouter, Switch } from "react-router-dom";
import theme from "./Theme";
import { Grid } from "@material-ui/core";
import RouteComponent from "./firebase/components/RouteComponent";
import { useEffect, useState } from "react";
import { auth} from './firebase/services/index';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    })
  },[]);
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <BrowserRouter>
          <Grid item md={3}>
            <Navigation />
          </Grid>
          <Grid item md={6}>
            <Switch>
              <RouteComponent isAuthenticated={isAuthenticated} />
            </Switch>
          </Grid>
          <Grid item md={3}></Grid>
        </BrowserRouter>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
