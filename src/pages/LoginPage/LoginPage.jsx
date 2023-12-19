import React, { useEffect, useState } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Services";
import Notification from "../../Components/Notification/Notification";

import loginImage from "../../assets/images/login.svg";

import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";
import { useContext } from "react";
import MainContent from "../../Components/MainContent/MainContent";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, SetUser] = useState({});
  const [notifyUser, setNotifyUser] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.nome) navigate("/");
  }, [userData, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email.length > 3 && user.senha.length > 3) {
      try {
        const promise = await api.post("/Login", {
          email: user.email,
          senha: user.senha,
        });
        const userFullToken = userDecodeToken(promise.data.token);
        setUserData(userFullToken);

        localStorage.setItem("token", JSON.stringify(userFullToken));
        navigate("/");
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Logado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Email ou senha incorretos!`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }
    } else {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Preencha os dados corretamente!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      <div className="layout-grid-login">
        <div className="login">
          <div className="login__illustration">
            <div className="login__illustration-rotate"></div>
            <ImageIllustrator
              imageRender={loginImage}
              altText="Imagem de um homem em frente de uma porta de entrada"
              additionalClass="login-illustrator"
            />
          </div>

          <div className="frm-login">
            <img src={logo} className="frm-login__logo" alt="" />

            <form className="frm-login__formbox" onSubmit={handleSubmit}>
              <Input
                aditionalClass="frm-login__entry"
                type="email"
                id="login"
                name="login"
                required={true}
                value={user.email}
                manipulationFunction={(e) => {
                  SetUser({ ...user, email: e.target.value.trim() });
                }}
                placeholder="Username"
              />
              <Input
                aditionalClass="frm-login__entry"
                type="password"
                id="senha"
                name="senha"
                required={true}
                value={user.senha}
                manipulationFunction={(e) => {
                  SetUser({ ...user, senha: e.target.value.trim() });
                }}
                placeholder="****"
              />

              <a href="/esqueceu-a-senha" className="frm-login__link">
                Esqueceu a senha?
              </a>

              <Button
                textButton="Login"
                id="btn-login"
                name="btn-login"
                type="submit"
                aditionalClass="frm-login__button"
              />
            </form>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default LoginPage;
