import { useState } from "react";
import Logo from '../../images/logo-mundowap.png';
import axios from 'axios';
import { setToken } from "../../service/auth";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Login = () => {
    const [form, setForm] = useState({account: '', username: '', password: ''});
    const formChange = (e: any) =>{
        setForm({... form, [e.target.name]: e.target.value});
    }
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.auth);

    const logar = () => {
        if(form.account && form.username && form.password){
            axios.post("https://api.xpto.ninja/v1/users/token",form)
            .then(response => {
                if(response.data.success && response.data.data.token){
                    dispatch(setToken(response.data.data.token));
                    localStorage.setItem("token",response.data.data.token);
                }
            })
            .catch(response => {
                alert("Erro")
            });
        }
        else{
            alert("Preencha todos os campos")
        }
    }

    return(
       isAuth ? <Redirect to="/dashboard"/> :
        (
            <div className="row h-center v-center" style={{marginTop: 50}}>
                <form className="col-sm-5 col-md-3 col-lg-2">
                    <div className="row">
                        <div className="col-10 m-1">
                            <img src={Logo}/>
                        </div>
                        <div className="col-10 m-1">
                            <label htmlFor="account">Conta</label>
                            <input onChange={formChange} value={form.account} id="account" name="account"/>
                        </div>
                        <div className="col-10 m-1">
                            <label htmlFor="username">Nome de Usuário</label>
                            <input onChange={formChange} value={form.username} id="username" name="username"/>
                        </div>
                        <div className="col-10 m-1">
                            <label htmlFor="password">Senha</label>
                            <input type="password" onChange={formChange} value={form.password} id="password" name="password"/>
                        </div>
                        <div className="col-10 m-1">
                            <button type="button" onClick={logar} className="btn"> Login </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    );
}

export default Login;