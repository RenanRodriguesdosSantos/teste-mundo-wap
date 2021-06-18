import { useState } from "react";
import Logo from '../../images/logo-mundowap.png';
import axios from 'axios';
import { setUser } from "../../service/auth";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Login = () => {
    const [form, setForm] = useState({ account: '', username: '', password: '' });
    const [message, setMessage] = useState("");
    const formChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.authUser);
    var token = localStorage.getItem("token");

    const logar = () => {
        if (form.account && form.username && form.password) {
            axios.post("https://api.xpto.ninja/v1/users/token", form, {
                headers:{
                    Accept: 'application/json',
                    ContentType: 'application/json'
                }
            })
            .then(response => {
                if (response.data.success && response.data.data.token) {
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

    const setUserLogado = () => {
        axios.post("https://api.xpto.ninja/v1/users/me", {}, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
                ContentType: 'application/json'
            }
        }).then(res => {
            if(res.data.sucess){
                dispatch(setUser(res.data.data));
            }
        })
        return <Redirect to="/dashboard" />
    }

    return (
        token ? setUserLogado() :
            (
                <div className="row h-center v-center" style={{ marginTop: 50 }}>
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
            )
    );
}

export default Login;