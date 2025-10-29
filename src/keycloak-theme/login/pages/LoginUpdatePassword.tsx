import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logoHCM.png"
import random from "../assets/Random.svg"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import eyeicon from "../assets/eyeIcon.svg";
import eyeiconInvisible from "../assets/eyeIconInvisible.svg";

const LoginUpdatePassword: React.FC<PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>> = (props) => {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth , username} = kcContext;

    const { msg, msgStr } = i18n;
    
  function handleInvalidInput(event: React.FormEvent<HTMLInputElement>, errorMessage: string) {
    const target = event.target as HTMLInputElement;
    target.setCustomValidity(errorMessage);
  }

  const [isPasswordVisible , setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible , setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Helper to generate a valid password
  const generateValidPassword = (): string => {
    // Try until a valid password is generated
    let pwd = "";
    let error = "";
    let attempts = 0;
    while (attempts < 10) {
      // Generate a random password with required rules
      // 2 digits, 1 lowercase, 1 uppercase, 1 special, 3-5 random
      const lower = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      const upper = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const digits = Array.from({length:2}, () => String.fromCharCode(48 + Math.floor(Math.random() * 10))).join("");
      const specials = "!@#$%^&*()_+-=~[]{}|;:,.<>?";
      const special = specials[Math.floor(Math.random() * specials.length)];
      const restLength = 8 + Math.floor(Math.random() * 3) - 5; // 3-5 random chars
      const rest = Array.from({length: restLength}, () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");
      pwd = lower + upper + digits + special + rest;
      // Shuffle
      pwd = pwd.split('').sort(() => 0.5 - Math.random()).join('');
      error = validatePassword(pwd);
      if (!error) break;
      attempts++;
    }
    return pwd;
  };

  const handleGeneratePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newPwd = generateValidPassword();
    setPassword(newPwd);
    setConfirmPassword(newPwd);
    setPasswordError("");
    // Set the value in the DOM fields as well
    const pwdInput = document.getElementById("password-new") as HTMLInputElement;
    const confirmInput = document.getElementById("password-confirm") as HTMLInputElement;
    if (pwdInput) {
      pwdInput.value = newPwd;
      pwdInput.setCustomValidity("");
    }
    if (confirmInput) {
      confirmInput.value = newPwd;
      confirmInput.setCustomValidity("");
    }
  };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    
    const validatePassword = (password: string): string => {
        // Password must contain minimum of 8 characters
        if (password.length < 8) {
            return "Password must contain minimum of 8 characters";
        }
        // Password must contain maximum of 10 characters
        if (password.length > 10) {
            return "Password must contain maximum of 10 characters";
        }
        // Password must contain at least 1 lowercase character
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least 1 lowercase character";
        }
        // Password must contain at least 1 uppercase character
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least 1 uppercase character";
        }
        // Password must contain at least 2 numbers
        if ((password.match(/\d/g) || []).length < 2) {
            return "Password must contain at least 2 numbers";
        }
        // Password must contain at least 1 Special Character
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return "Password must contain at least 1 Special Character";
        }
        return ""; // No error
    };

    // Enhanced validation for password and confirm password
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
        let error = "";
        if (!value) {
            error = "Enter a Password";
        } else {
            error = validatePassword(value);
        }
        setPasswordError(error);
        event.target.setCustomValidity(error);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConfirmPassword(value);
        let error = "";
        if (!value) {
            error = "Enter a Password";
        } else if (password !== value) {
            error = "Passwords do not match";
        }
        event.target.setCustomValidity(error);
    };

    // handleConfirmPasswordChange is now enhanced above
    return (
      <Template
        {...{ kcContext, i18n, doUseDefaultCss, classes }}
        headerNode={msg("updatePasswordTitle")}
      >
        <div>
          <div className="totp-header-container">
            <img src={logo} className="totp-logo" />
            <div className="totp-title">
              Set Your Password
            </div>
          </div>
        </div>

        <form
          id="kc-passwd-update-form"
          className={getClassName("kcFormClass")}
          action={url.loginAction}
          method="post"
        >
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            readOnly={true}
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            style={{ display: "none" }}
          />

          <div className={getClassName("kcFormGroupClass")}>
            <div className="floating-label-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password-new"
                name="password-new"
                className={getClassName("kcInputClass") + " form-control"}
                value={password}
                onInvalid={e => {
                  if (!password) {
                    handleInvalidInput(e, "Enter a Password");
                  } else {
                    handleInvalidInput(e, validatePassword(password));
                  }
                }}
                onChange={handlePasswordChange}
                required
              />
              <label
                htmlFor="password-new"
                className={getClassName("kcLabelClass") + " floating-label"}
              >
                New Password
              </label>
              <img
                src={isPasswordVisible ? eyeicon : eyeiconInvisible}
                alt="Toggle password visibility"
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>
          <div
            className={getClassName("kcFormGroupClass")}
            style={{ marginTop: "20px" }}
          >
            <div className="floating-label-group">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="password-confirm"
                name="password-confirm"
                className={getClassName("kcInputClass") + " form-control"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onInvalid={e => {
                  if (!confirmPassword) {
                    handleInvalidInput(e, "Enter a Password");
                  } else if (password !== confirmPassword) {
                    handleInvalidInput(e, "Passwords do not match");
                  } else {
                    handleInvalidInput(e, "");
                  }
                }}
                required
              />
              <label
                htmlFor="password-confirm"
                className={getClassName("kcLabelClass") + " floating-label"}
              >
                Confirm Password
              </label>
              <img
                src={isConfirmPasswordVisible ? eyeicon : eyeiconInvisible}
                alt="Toggle password visibility"
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>
          <div id="kc-form-buttons">
            <input
              className={clsx(
                getClassName("kcButtonClass"),
                // getClassName("kcButtonPrimaryClass"),
                getClassName("kcButtonBlockClass"),
                getClassName("kcButtonLargeClass")
              )}
              type="submit"
              value="Reset Password"
              style={{
                backgroundColor: "#2C82F9",
                borderRadius: "6px",
                color: "#FFFFFF",
              }}
            />
          </div>
          <div className="separator" style={{ marginTop: "30px" }}>
            <span style={{ fontSize: "14px", color: "#8C8C8C" }}>or</span>
          </div>
          <div id="kc-form-buttons">
            <button
              className={clsx(
                getClassName("kcButtonClass"),
                getClassName("kcButtonPrimaryClass"),
                getClassName("kcButtonBlockClass"),
                getClassName("kcButtonLargeClass")
              )}
              type="button"
              onClick={handleGeneratePassword}
              style={{
                borderRadius: "6px",
                fontSize: "14px",
                border: "1px solid #1E24323B",
                background: "#FFFFFF",
                color: "#2C82F9",
                fontWeight: "400px",
                paddingRight: "0px",
              }}
            >
              <img
                src={random}
                style={{
                  width: "14px",
                  height: "14px",
                  marginRight: "5px",
                  marginBottom: "2px",
                }}
              />
              Generate Password
            </button>
          </div>
        </form>
      </Template>
    );
};
export default LoginUpdatePassword;
