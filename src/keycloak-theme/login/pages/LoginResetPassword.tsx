import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png"
import { useState } from "react";
import { urlToHttpOptions } from "http";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth } = kcContext;

    const { msg, msgStr } = i18n;
    const [showOverlayPopup, setShowOverlayPopup] = useState(true);

    const handleDismiss = () => {
        // Hide the overlay popup
        setShowOverlayPopup(false);
    };

    const handleInvalidInput = (event: React.FormEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity(errorMessage);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value);
        target.setCustomValidity(isValidEmail ? '' : errorMessage);     
    }; 

    const [message, setMessage] = useState({ summary: "", type: "" });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")} 
            infoNode={msg("emailInstruction")}
        >       
        <div style={{ height: "350px", paddingBottom: "100px" }}>
            <div>
                <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
                <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
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
                            // getClassName("kcButtonPrimaryClass"),
                            getClassName("kcButtonBlockClass"),
                            getClassName("kcButtonLargeClass")
                        )}
                        type="submit"
                        value="Reset Password"
                        style={{ backgroundColor: '#2C82F9', borderRadius: '6px', color: '#FFFFFF' }}
                    />
                </div>
                <div className={getClassName("kcFormGroupClass")} style={{ textAlign: 'center', marginTop: '20px' }}>
                    <div className={getClassName("kcFormOptionsWrapperClass")}>
                        <span>
                            <a href={url.loginUrl} tabIndex={5} style={{ fontSize: '14px', color: '#2C82F9', fontWeight: '400' }}>
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
