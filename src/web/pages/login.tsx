import React, { useState } from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { TextField } from "../components/input/text";
import { Flex } from "../components/layout/flex";
import { TaskButton } from "../components/input/taskbutton";
import { tryLogin } from "../services/auth";

const pageRoot: PageRootComponent = ({appParams}) => {
    const [invalid, setInvalid] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const loginTask = async () => {
        setLoading(true);
        const success = await tryLogin(password);
        setLoading(false);

        if (success) {
            window.location.href = "/gallery";
        } else {
            setPassword("");
            setInvalid(true);
        }
    };

    return (<Flex className="fullpage twobreak" alignItems="center">
        {appParams.logo && <Flex.Child className="gcenter">
            <div style={{
                background: `url(${appParams.logo}) center/contain no-repeat`
            }} className="logo-image"/>
        </Flex.Child>}
        <Flex.Child style={{width: "100%"}}>
            <Flex justifyContent="center">
                <div className="login-container">
                    <h1>{appParams.title}</h1>
                    {appParams.subtitle && <h3>{appParams.subtitle}</h3>}
                    <TextField type="password" placeholder="password" error={invalid} onConfirm={loginTask}
                        value={password} onChange={(p) => setPassword(p)} autofocus/>
                    <TaskButton className="wide margin" task={loginTask} disabled={loading}>Login</TaskButton>
                    {appParams.notice && <aside className="thick">{appParams.notice}</aside>}
                </div>
            </Flex>
        </Flex.Child>
    </Flex>);
};

export default as<PageMeta>({
    needsAuth: false,
    redirWhenAuthed: true,
    fileName: "login",
    pageTitle: (ctx) => ctx.title + " - Login",
    root: pageRoot
});
