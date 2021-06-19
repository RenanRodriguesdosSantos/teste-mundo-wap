import { useState } from "react";
import Logo from '../../images/logo-mundowap.png';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser } from "./fetch";

const Login = () => {
    const [form, setForm] = useState({ account: '', username: '', password: '' });
    const [message, setMessage] = useState("");
    const formChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const isAuth = useAppSelector((state) => state.authUser);
    const dispatch = useAppDispatch();
    
    const logar = () => {
        if (form.account && form.username && form.password) {
            axios.post("https://api.xpto.ninja/v1/users/token", {...form, force: 1}, {
                headers:{
                    Accept: 'application/json',
                    ContentType: 'application/json'
                }
            })
            .then(response => {
                if (response.data.success && response.data.data.token) {
                    dispatch(getUser());
                    localStorage.setItem("token", response.data.data.token);
                }
            })
            .catch(error => {
                const divMessege = document.querySelector("#alert");
                setMessage(error.response.data.data.message)
                if(divMessege){
                    divMessege.classList.remove("d-none");
                }
            });
        }
        else {
            const divMessege = document.querySelector("#alert");
            setMessage("Preencha todos os campos")
            if(divMessege){
                divMessege.classList.remove("d-none");
            }
        }
    }

    const isUserLogadoReload = () => {
        const token  = localStorage.getItem("token");
        if(token){
            return <Redirect to="/dashboard" />
        }
        else{
            return (
                <div className="row h-center v-center" style={{ marginTop: 80 }}>
                    <form className="col-sm-5 col-md-3 col-lg-2">
                        <div className="row">
                            <div className="col-10 m-1">
                                <img src={Logo} />
                            </div>
                            <div className="col-10 m-1">
                                <label htmlFor="account">Conta</label>
                                <input onChange={formChange} value={form.account} id="account" name="account" />
                            </div>
                            <div className="col-10 m-1">
                                <label htmlFor="username">Nome de Usuário</label>
                                <input onChange={formChange} value={form.username} id="username" name="username" />
                            </div>
                            <div className="col-10 m-1">
                                <label htmlFor="password">Senha</label>
                                <input type="password" onChange={formChange} value={form.password} id="password" name="password" />
                            </div>
                            <div className="col-10 m-1">
                                <button type="button" onClick={logar} className="btn"> Login </button>
                            </div>
                            <div className="col-10 m-1">
                                <div className="alert d-none" id="alert">{message}</div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }

    return (
        isAuth ? <Redirect to="/dashboard" /> : isUserLogadoReload() 
    );
}

export default Login;