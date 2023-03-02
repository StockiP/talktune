import './App.css';
import withRoot from './modules/withRoot';
import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import * as React from "react";

function App() {
  return (
        <React.Fragment>
            <AppAppBar />

            <AppFooter />
        </React.Fragment>
  );
}


export default withRoot(App);
