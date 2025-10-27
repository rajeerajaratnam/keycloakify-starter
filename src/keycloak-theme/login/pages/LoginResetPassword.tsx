import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logoHCM.png"
import { useState } from "react";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm } = kcContext;

    const { msg } = i18n;

    const handleInvalidInput = (event: React.FormEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity(errorMessage);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value);
        target.setCustomValidity(isValidEmail ? '' : errorMessage);     
    }; 


    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")} 
            infoNode={msg("emailInstruction")}
        >       
        <div className="reset-container">
                <div className="reset-header-container">
                    <img src={logo} className="login-logo" />
                    <div className="reset-title">
                        Forgot Password
                    </div>
                </div>
            <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post">              
                <div className={getClassName("kcFormGroupClass")}>
                    <div className="floating-label-group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={getClassName("kcInputClass") + " form-control"}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"                                             
                            onInvalid={(e) => handleInvalidInput(e, 'Enter a valid Email Address')}
                            onChange={(e) => handleInputChange(e, 'Enter a valid Email Address')}
                            required

                        />
                        <label htmlFor="username" className={getClassName("kcLabelClass") + " floating-label"} >
                            Email Address
                        </label>
                    </div>
                </div>
                <div id="kc-form-buttons">
                    <input
                        className={clsx(
                            getClassName("kcButtonClass"),
                            getClassName("kcButtonBlockClass"),
                            getClassName("kcButtonLargeClass"),
                            "reset-submit-btn"
                        )}
                        type="submit"
                        value="Reset Password"
                    />
                </div>
                <div className={clsx(getClassName("kcFormGroupClass"), "reset-form-group-margin20") }>
                    <div className={getClassName("kcFormOptionsWrapperClass")}>
                        <span>
                            <a href={url.loginUrl} tabIndex={5} className="reset-signin-link">
                                Sign - In
                            </a>
                        </span>
                    </div>
                </div>
            </form>
        </div>  
            
        </Template>
    );
}
