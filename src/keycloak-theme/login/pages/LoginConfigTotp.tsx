import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logoHCM.png";
import React from "react";
import eyeicon from "../assets/eyeIcon.svg";
import lefticon from "../assets/leftIcon.svg";
import eyeiconInvisible from "../assets/eyeIconInvisible.svg";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;
    const { msg } = i18n;
    const [showSecret, setShowSecret] = React.useState(false);
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    // State for 6-digit code
    const [code, setCode] = React.useState(["", "", "", "", "", ""]);
    const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

    // Handle input change
    const handleCodeChange = (idx: number, value: string) => {
        if (!/^[0-9a-zA-Z]?$/.test(value)) return; // Only allow single char
        const newCode = [...code];
        newCode[idx] = value;
        setCode(newCode);

        // Move to next input if filled
        if (value && idx < 5) {
            inputsRef.current[idx + 1]?.focus();
        }
    };
    
    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputsRef.current[idx - 1]?.focus();
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp")}
        >
            <div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src={logo} style={{ width: '175px', marginBottom: '20px' }} />
                    <div style={{ fontWeight: 400, fontSize: '24px', lineHeight: '40px', color: '#161F33', textAlign: 'center', marginBottom: '6px', filter: 'contrast(1.75)' }}>
                        Two-factor Authentication
                    </div>
                </div>

                
                <ol id="kc-totp-settings">
                    
                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p>
                                    <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                </p>
                                <p>
                                    <a href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul>
                                    <li id="kc-totp-type">
                                        {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                    </li>
                                    <li id="kc-totp-algorithm">
                                        {msg("loginTotpAlgorithm")}: {totp.policy.algorithm}
                                    </li>
                                    <li id="kc-totp-digits">
                                        {msg("loginTotpDigits")}: {totp.policy.digits}
                                    </li>
                                    {totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period">
                                            {msg("loginTotpInterval")}: {totp.policy.period}
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter">
                                            {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                            <li>
                                <div className="totp-step-row">
                                    <div className="totp-step-text">
                                        <span>
                                            You will need an authenticator mobile app to complete this process for 
                                            <a
                                                href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="totp-link"
                                            >
                                                Microsoft Authenticator
                                            </a>
                                        </span>
                                    </div>
                                    <div className="totp-step-qr">
                                        <img
                                            id="kc-totp-secret-qr-code"
                                            src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                            alt="QR code"
                                        />
                                    </div>
                                </div>
                            </li>
                    )}
                    <li>
                        <div className="totp-step-text">
                            Scan the QR code with your authenticator
                            {/* {msg("loginTotpStep2") || "Scan the QR code with your authenticator"} */}
                        </div>
                        <div className="totp-step2-subtext">
                            If you can't scan the code, you can enter this secret key into your authenticator App
                            {/* {advancedMsg("loginTotpStep2Subtext") || "If you can't scan the code, you can enter this secret key into your authenticator App"} */}
                        </div>                   
                        <div className="totp-secret-row">
                            <div className="totp-secret-input-wrapper">
                                <input
                                    type={showSecret ? "text" : "password"}
                                    value={totp.totpSecretEncoded}
                                    readOnly
                                    className="totp-secret-input"
                                    aria-label="Secret key"
                                />
                                <img
                                    src={showSecret ? eyeiconInvisible : eyeicon}
                                    alt={showSecret ? "Hide" : "Show"}
                                    className="totp-secret-icon"
                                    title={showSecret ? "Hide" : "Show"}
                                    onClick={() => setShowSecret(show => !show)}
                                    style={{ right: 30 }}
                                />
                                <img
                                    src={lefticon}
                                    alt="Copy"
                                    className="totp-secret-icon"
                                    title="Copy"
                                    onClick={() => navigator.clipboard.writeText(totp.totpSecretEncoded)}
                                    style={{ right: 5 }}
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                <div className="totp-step-text">
                    After scanning the QR code above, enter the six-digit code generated by your authenticator.
                </div>
                <div className="totp-code-inputs">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="totp-code-input"
                            value={digit}
                            ref={el => (inputsRef.current[idx] = el)}
                            onChange={e => handleCodeChange(idx, e.target.value.replace(/[^0-9a-zA-Z]/, ""))}
                            onKeyDown={e => handleKeyDown(idx, e)}
                            autoFocus={idx === 0}
                            name={`code-${idx}`}
                            style={{ textAlign: "center" }}
                        />
                    ))}
                </div>
            </li>
                </ol>

                <form action={url.loginAction} className={clsx("kcFormClass")} id="kc-totp-settings-form" method="post" style={{ paddingLeft: '20px' }}>
                    <div className={clsx("kcFormGroupClass")}>
                        <input type="hidden" name="totp" value={code.join("")} />
                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    {isAppInitiatedAction ? (
                        <div style={{ textAlign: "center" }}>
                            <div>
                                <input
                                    type="submit"
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonBlockClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    id="saveTOTPBtn"
                                    // value={msgStr("doSubmit")}
                                    value="Verify"
                                    style={{ backgroundColor: '#2C82F9', borderRadius: '6px', color: '#FFFFFF' }}
                                />
                            </div>
                            <div style={{ marginTop: "10px" }}>                              
                                <a
                                    href={url.loginRestartFlowUrl}
                                    className={clsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                    id="cancelTOTPBtn"
                                    style={{ fontSize: '14px', color: '#2C82F9', fontWeight: '400' }}
                                >
                                    {msg("doCancel")}
                                </a>
                            </div>

                        </div>
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            <div>
                                <input
                                    type="submit"
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonBlockClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    id="saveTOTPBtn"
                                    value="Verify"
                                    style={{ backgroundColor: '#2C82F9', borderRadius: '6px', color: '#FFFFFF' }}
                                />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <a
                                    href={url.loginRestartFlowUrl}
                                    className={clsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                    id="cancelTOTPBtn"
                                    style={{ fontSize: '14px', color: '#2C82F9', fontWeight: '400' }}
                                >
                                    {msg("doCancel")}
                                </a>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </Template>
    );
}