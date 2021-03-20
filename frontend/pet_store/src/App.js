import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import SearchContainer from "./components/searchContainer";
import Edit from "./components/Edit";
import About from "./components/about";
import Footer from "./components/footer";
import PetForm from "./components/common/petForm";
import NotFound from "./components/common/notFound";
import PetStoreContext from "./context/petStoreContext";
import { httpService } from "./services/httpService";

function App() {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    httpService
      .getAll()
      .then((response) => response.json())
      .then((data) => setPetList(data));
  }, [setPetList]);

  return (
    <PetStoreContext.Provider value={{ petList, setPetList }}>
      <NavBar />
      <main className="container">
        <center>
          <Switch>
            <Route path="/search" exact component={SearchContainer} />
            <Route path="/search/:keyword" exact component={SearchContainer} />
            <Route path="/edit" component={Edit} />
            <Route path="/about" component={About} />
            <Route path="/pets" component={PetForm} />
            <Route path="/not-found" exact component={NotFound} />
            <Redirect from="/" exact to="/about" />
            <Redirect to="/not-found" />
          </Switch>
        </center>
      </main>
      <Footer />
    </PetStoreContext.Provider>
  );
}

export default App;
