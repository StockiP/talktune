import './App.css';
import withRoot from './modules/withRoot';
import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import * as React from "react";
import MainContent from "./modules/views/MainContent";

function App() {
  return (
        <React.Fragment>
            <AppAppBar />
            <MainContent />
            <AppFooter />
        </React.Fragment>
  );
}


export default withRoot(App);
