import React, { useState } from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { TextField } from "../components/input/text";
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

    return (
        <div className="flex md:flex-row flex-col items-center h-screen">
            {appParams.logo && 
                <div className="flex-1 w-full grid place-items-center">
                    <div 
                        style={{
                            background: `url(${appParams.logo}) center/contain no-repeat`
                        }} 
                        className="object-contain w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[700px] xl:h-[700px]"
                    />
                </div>
            }
            <div className="flex-1 w-full">
                <div className="flex justify-center">
                    <div className="flex-1 text-center max-w-[400px]">
                        <h1 className="text-4xl font-black opacity-80 m-0">{appParams.title}</h1>
                        {appParams.subtitle && <h3 className="text-sm font-black opacity-60 m-0">{appParams.subtitle}</h3>}
                        <TextField 
                            type="password" 
                            placeholder="password" 
                            error={invalid} 
                            onConfirm={loginTask}
                            value={password} 
                            onChange={(p) => setPassword(p)} 
                            autofocus
                            className="mt-4"
                        />
                        <TaskButton 
                            className="w-full my-2 mx-0" 
                            task={loginTask} 
                            disabled={loading}
                        >
                            Login
                        </TaskButton>
                        {appParams.notice && <p className="text-sm font-black opacity-30 m-0">{appParams.notice}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default as<PageMeta>({
    needsAuth: false,
    redirWhenAuthed: true,
    fileName: "login",
    pageTitle: (ctx) => ctx.title + " - Login",
    root: pageRoot
});
