import React, { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { Switch, Route, Redirect } from "react-router";
import { Tracks } from "./tracks/Track";
import { Create } from "./tracks/create";
import { Link } from "react-router-dom";
import { Login } from "./login/Login";
import { Register } from "./Register";

export const Principle = () => {
    const [storage, setStorage] = useState(localStorage.getItem("token"))
    const logOut = () => {
        localStorage.removeItem("token")
        window.location.href="/login";
    }
    useEffect(()=>{
        setStorage(localStorage.getItem("token"))
    })
    return (
        <div className="principle">
            <div className="UpperNavbar">
                <Link to="/signup">
                    {storage == null
                        ? <button className="logBtn">
                            Sign Up
                        </button>
                        : ""
                    }

                </Link>
                <Link to="/login">
                    {storage == null
                        ? <button className="logBtn">
                            LOG IN
                        </button>
                        : ""
                    }

                </Link>
                {storage !== null
                    ? <button onClick={logOut} className="logBtn">
                        LOG OUT
                    </button>
                    : ""
                }

            </div>
            <div className="principleContent">
                <Switch>
                    <Route path="/" exact component={Categories}></Route>
                    <Route path="/search">Search</Route>
                    <Route path="/library" exact component={Tracks}></Route>
                    <Route path="/tracks/create" component={Create}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/signup" exact component={Register}></Route>
                </Switch>
            </div>
        </div>
    )
}