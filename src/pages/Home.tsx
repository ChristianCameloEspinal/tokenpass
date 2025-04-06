import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

import LoginForm from "../components/forms/Login"
import RegisterForm from "../components/forms/Register";

export default function Home() {

    const [state, setState] = useState("login")
    const {user, logout} = useUser();

    if (!user) {
        if (state === "login") {
            return(<>
                <div className="page">
                <button onClick={logout}>Salir</button>
                    <div className="wrapper padding xl all" style={{ marginBottom: "400px" }}>
                        <h1 className="text-display">Authenticate</h1>
                        <LoginForm onSwitch={() => setState("register")}></LoginForm>
                    </div>
                </div>
            </>)
        }
        else {
            return(<>
                <div className="page">
                <button onClick={logout}>Salir</button>
                    <div className="wrapper padding xl all" style={{ marginBottom: "400px" }}>
                        <h1 className="text-display">Authenticate</h1>
                        <RegisterForm  onSwitch={() => setState("login")}></RegisterForm>
                    </div>
                </div>
            </>)
        }
    }
    else{
        return(<>
            <div className="page">
            <button onClick={logout}>Salir</button>
                <div className="wrapper padding xl all" style={{ marginBottom: "400px" }}>
                    <h1 className="text-display">Marketplace</h1>
                </div>
            </div>
        </>)
    }
}
