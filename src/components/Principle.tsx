import React from "react";
import { Categories } from "./Categories";
import { Switch, Route } from "react-router";
import { Tracks } from "./tracks/Track";
import { Create } from "./tracks/create";
import { Link } from "react-router-dom";
import { Login } from "./login/Login";

export const Principle = () => {
    return (
        <div className="principle">
            <div className="UpperNavbar">text
                <button className="singBtn">
                    SING UP
                </button>   
                <Link to="/login">
                <button className="logBtn">                    
                    LOG IN
                </button> 
                <button className="logBtn">                    
                    LOG OUT
                </button>
                </Link>              
            </div>
            <div className="principleContent">
                <Switch>
                    <Route path="/" exact component={Categories}></Route>
                    <Route path="/search">Search</Route>
                    <Route path="/library" exact component={Tracks}></Route>
                    <Route path="/tracks/create" component={Create}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </div>
        </div>
    )
}