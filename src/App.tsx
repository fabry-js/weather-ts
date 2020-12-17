import React from "react";
import { SearchAppBar } from "./components/AppBar";
import { CardComponent } from "./components/CardComponent";

import "./App.css"


const App: React.FC = () => {
  return (
    <div className="App">
        <SearchAppBar title="Il Meteo!"/>
        <CardComponent />
    </div>
  );
};


export default App;
