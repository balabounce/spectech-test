/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";

import { useHttp } from "hooks/http.hook";

// react-router-dom components
import { Link } from "react-router-dom";

import InputMask from "react-input-mask";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const { request } = useHttp();
  const [formData, setFormData] = React.useState({
    phone: "",
    password: "",
  }); 
  const [confirmMessage, setConfirmMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [forgetCardVisible, setForgerCardVisible] = React.useState(false);

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!formData.phone || !formData.password) return setErrorMessage("Заполните поля") 
    try {
      const data = await request("users?phone=%2B" + formData.phone.replace(/\D/g, ''));
      if (!data.length) return setErrorMessage("Такой пользователь не зарегистрирован");
      if (data[0].password !== formData.password) return setErrorMessage("Пароль введен неправильно");
      setSuccessMessage("Авторизация прошла успешно");
    } catch (e) {
        console.error(e);
    }
  };

  const handleSendMessage = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if(!formData.phone) return setErrorMessage("Введите номер");
    try {
      const data = await request("forgetPassword?phone=%2B" + formData.phone.replace(/\D/g, ""));
      if (!data.length) return setErrorMessage("Такой пользователь не зарегистрирован");
      setErrorMessage(null);
      setSuccessMessage("Сообщение было отправлено");
    } catch (e) {
      console.error(e);
    }
  };

  const checkConfirmMessage = async () => {
    if(!confirmMessage) return setErrorMessage("Введите сообщение");
    try {
      const data = await request("forgetPassword?message=" + confirmMessage);
      if(!data.length) return setErrorMessage("Неправильный код");
      setErrorMessage("");
      setSuccessMessage("Сообщение верно");
      setTimeout(() => {
        setSuccessMessage(null);
        setForgerCardVisible(false);
      }, 3000);
    } catch(e) {
        console.error(e);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <BasicLayout image={bgImage}>
      { forgetCardVisible 
        ?  
        <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                { successMessage ? "Введите код, который пришел к Вам на телефон" : "Введите номер телефона"}
              </MDTypography>
             <MDTypography variant="span" fontWeight="light" color="white" mt={1}>
                { !successMessage && "На ваш номер придет сообщения с кодом" } 
             </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={formData.phone}
                    name="phone"
                    onChange={(event) => handleChange(event)}
                    disabled={false}
                  >
                    {(inputProps) => <MDInput type="phone" {...inputProps} label="Phone" fullWidth />}
                  </InputMask>
                </MDBox>
                { successMessage && 
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Message"
                        value={confirmMessage}
                        name="message"
                        fullWidth
                        onChange={(event) => setConfirmMessage(event.target.value)}
                      />
                    </MDBox>
                }
                { errorMessage && 
                    <MDBox mt={1} textAlign="center">
                       <MDTypography
                         variant="span"
                         color="error"
                         fontSize="20px"
                         fontWeight="medium"
                         textGradient
                       >
                        { errorMessage }
                      </MDTypography>
                    </MDBox>
                }
                { successMessage && 
                    <MDBox mt={1} textAlign="left">
                       <MDTypography
                         variant="span"
                         color="info"
                         fontSize="15px"
                         fontWeight="light"
                         textGradient
                       >
                        { successMessage }
                      </MDTypography>
                    </MDBox>
                }
              </MDBox>
              { successMessage ? 
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={checkConfirmMessage}>
                      Подтвердить 
                    </MDButton>
                  </MDBox>
                      :
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={handleSendMessage}>
                      Оправить сообщение 
                    </MDButton>
                  </MDBox>
              }
          </MDBox>
        </Card>
        :
        <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Авторизация
              </MDTypography>
              <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <FacebookIcon color="inherit" />
                  </MDTypography>
                </Grid>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <GitHubIcon color="inherit" />
                  </MDTypography>
                </Grid>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <GoogleIcon color="inherit" />
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={formData.phone}
                    name="phone"
                    onChange={(event) => handleChange(event)}
                    disabled={false}
                  >
                    {(inputProps) => <MDInput type="phone" {...inputProps} label="Phone" fullWidth />}
                  </InputMask>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Password"
                    value={formData.password}
                    name="password"
                    fullWidth
                    onChange={(event) => handleChange(event)}
                  />
                </MDBox>
                { errorMessage && 
                    <MDBox mt={1} textAlign="center">
                       <MDTypography
                         variant="span"
                         color="error"
                         fontSize="20px"
                         fontWeight="medium"
                         textGradient
                       >
                        { errorMessage }
                      </MDTypography>
                    </MDBox>
                }
                { successMessage && 
                    <MDBox mt={1} textAlign="center">
                       <MDTypography
                         variant="span"
                         color="success"
                         fontSize="20px"
                         fontWeight="medium"
                         textGradient
                       >
                        { successMessage }
                      </MDTypography>
                    </MDBox>
                }
                <MDBox mt={2} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                    Авторизация
                  </MDButton>
                </MDBox>
                <MDBox mt={3} textAlign="center">
                  <MDButton variant="text" color="secondary" onClick={() => setForgerCardVisible(true)}>
                      Забыли пароль?
                  </MDButton>
                </MDBox>
                <MDBox mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Регистрация 
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
      }
          </BasicLayout>
  );
}

export default Basic;
