import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useEffect, useState, type FormEventHandler } from "react";
import eyeicon from "../assets/eyeIcon.svg";
import eyeiconInvisible from "../assets/eyeIconInvisible.svg";
import logo from "../assets/logoHCM.png";
import microsoft from "../assets/microsoft.svg";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";


export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        updateGreeting();
    }, []);

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, message, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    const handleInvalidInput = (event: React.FormEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity(errorMessage);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value);
        target.setCustomValidity(isValidEmail ? '' : errorMessage);
    };

    const updateGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreeting('Good Morning');
        } else if (hour >= 12 && hour < 17) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    };

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")
            }
            displayMessage={true}
        >


            <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
                <div id="kc-form-wrapper">
                    <div className="login-header-container">
                        <img src={logo} className="login-logo" />
                        <div className="login-greeting">
                            {greeting} !
                        </div>
                        <div className="login-subtitle">
                            Work Smarter. Lead Better. Rise Higher.
                        </div>
                    </div>

                    {realm.password && (
                        <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                            <div className={clsx(getClassName("kcFormGroupClass"), "login-form-group-margin30") }>
                                {!usernameHidden &&
                                    (() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;
                                        return (
                                            <>
                                                <div className="floating-label-group login-floating-label-group">
                                                    <input
                                                        tabIndex={1}
                                                        id={autoCompleteHelper}
                                                        name={autoCompleteHelper}
                                                        defaultValue={login.username ?? ""}
                                                        type="text"
                                                        autoFocus={true}
                                                        autoComplete="off"
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                        onInvalid={(e) => handleInvalidInput(e, 'Enter a Valid Email Address')}
                                                        onChange={(e) => handleInputChange(e, 'Enter a Valid Email Address')}
                                                        required
                                                        className={clsx(getClassName("kcInputClass"), "form-control", "login-input-transparent")}
                                                    />
                                                    <label htmlFor={autoCompleteHelper} className={getClassName("kcLabelClass") + " floating-label"}>
                                                        Email Address
                                                    </label>
                                                </div>
                                            </>
                                        );
                                    })()}
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), "login-form-group-margin30") }>
                                <div className="floating-label-group login-floating-label-group">
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        name="password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        autoComplete="off"
                                        onInvalid={(e) => handleInvalidInput(e, 'Enter a Password')}
                                        onChange={(e) => handleInputChange(e, '')}
                                        required
                                        className={clsx(getClassName("kcInputClass"), "form-control", "login-input-transparent")}
                                    />
                                    <label htmlFor="password" className={getClassName("kcLabelClass") + " floating-label"}>
                                        Password
                                    </label>
                                    <img
                                        src={isPasswordVisible ? eyeicon : eyeiconInvisible}
                                        alt="Toggle password visibility"
                                        className="password-toggle-icon login-password-toggle"
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"), "login-form-group-margin15") }>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    {...(login.rememberMe === "on"
                                                        ? {
                                                            "checked": true
                                                        }
                                                        : {})}
                                                    className="login-checkbox-radius"
                                                />
                                                <span className="login-rememberme-span"> {msg("rememberMe")} </span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className="top-center">
                                    {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                    {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                    {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                    {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            "__html": message.summary
                                        }}
                                        className={clsx("kc-feedback-text", "login-feedback-span", message.type === "success" && "login-feedback-success", message.type === "error" && "login-feedback-error")}
                                    />
                                </div>
                            )}
                            <div id="kc-form-buttons" className={clsx(getClassName("kcFormGroupClass"), "login-form-group-margin10") }>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    {...(auth?.selectedCredential !== undefined
                                        ? {
                                            "value": auth.selectedCredential
                                        }
                                        : {})}
                                />
                                <input
                                    tabIndex={4}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={"Sign - In"}
                                    disabled={isLoginButtonDisabled}
                                    className={clsx(getClassName("kcButtonClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass"), "login-submit-btn")}
                                />
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), "login-form-group-margin10") } style={{ textAlign: 'center' }}>
                                <div className={getClassName("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={5} href={url.loginResetCredentialsUrl} className="login-reset-link">
                                                Forgot Password?
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), "login-form-group-margin20") } >
                                <div className="separator">
                                    <span className="login-or-continue">or continue with:</span>
                                </div>
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), "login-form-group-margin10") }>
                                {realm.password && social.providers !== undefined && (
                                    <div
                                        id="kc-social-providers"
                                    >
                                        <ul
                                            className={clsx(
                                                getClassName("kcFormSocialAccountListClass"),
                                                social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass")
                                            )}
                                        >
                                            {social.providers.map(p => (
                                                <li key={p.providerId} className={getClassName("kcFormSocialAccountListLinkClass")}>
                                                    <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId, "login-social-link")} >
                                                        <img src={microsoft} className="login-social-img" />
                                                        <span>{p.displayName}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </form>
                    )}
                </div>
            </div>

        </Template>
    );
}
