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
import InputMask from 'react-input-mask';
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const { request } = useHttp();
  const [formData, setFormData] = React.useState({
    phone: "", password: ""
  });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  const handleChange = (event) => {
      setFormData({ ...formData, [ event.target.name ]: event.target.value });
  };

  const registerHandler = async () => {
      if (!formData.phone || !formData.password) return setErrorMessage("Заполните поля");

      try {
          const isExist = await request("users?phone=%2B" + formData.phone.replace(/\D/g, ''));
          if (isExist.length) return setErrorMessage("Пользователь уже существует");
          await request('users', 'POST', {...formData, phone: '+' + formData.phone.replace(/\D/g, "")});
          setErrorMessage(null);
          setSuccessMessage("Пользователь успешно зарегистрирован");
      } catch(e) {
          console.error(e);
      }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Регистрация
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Введите свой номер телефона и пароль для регистрации
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
            <MDBox>
              <MDInput type="password" value={formData.password} name='password' label="Password" fullWidth onChange={(event) => handleChange(event)}/>
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
            <MDBox mt={1} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={registerHandler}>
               Регистрация 
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Аккаунт уже есть?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                 Войдите
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
