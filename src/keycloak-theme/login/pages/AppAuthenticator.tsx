import React, { useState } from "react";
import QRCode from "react-qr-code";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png";

export default function AppAuthenticator(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });
    const { url } = kcContext;
    const { msg } = i18n;

    // Replace with real values from kcContext if available
    const otpAuthUrl = kcContext.totp?.qrUrl ?? "otpauth://totp/YourApp:username?secret=NJ1&%#H#$*KNHGTRDFE&issuer=YourApp";
    const secret = kcContext.totp?.totpSecretEncoded ?? "NJ1&%#H#$*KNHGTRDFE";

    // For the 6-digit code input
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleOtpChange = (idx: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);
        // Optionally, move to next input
        if (value && idx < 5) {
            const next = document.getElementById(`otp-input-${idx + 1}`);
            if (next) (next as HTMLInputElement).focus();
        }
    };

    // Copy secret to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(secret);
    };

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")} 
            infoNode={msg("emailInstruction")}
        >
           <div>
                <img src={logo} alt="Rise HR" style={{ height: 32, marginBottom: 24 }} />
                <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 24, color: "#253053" }}>
                    Two-factor Authentication
                </h2>
                <ol style={{ paddingLeft: 18, marginBottom: 0 }}>
                    <li style={{ marginBottom: 18 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
                            <div style={{ flex: 1 }}>
                                You will need an authenticator mobile app to complete this process for{" "}
                                <a
                                    href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#2F6FED" }}
                                >
                                    Microsoft Authenticator
                                </a>
                                .
                            </div>
                            <div style={{ flexShrink: 0 }}>
                                <QRCode value={otpAuthUrl} size={90} />
                            </div>
                        </div>
                    </li>
                    <li style={{ marginBottom: 18 }}>
                        Scan the QR code with your authenticator<br />
                        <span style={{ color: "#888", fontSize: 13 }}>
                            If you can't scan the code, you can enter this secret key into your authenticator App
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 8,
                                background: "#F5F6FA",
                                borderRadius: 6,
                                padding: "8px 12px",
                                fontSize: 20,
                                fontFamily: "monospace",
                                letterSpacing: 2,
                                fontWeight: 500,
                                width: "fit-content",
                                minWidth: 320,
                            }}
                        >
                            <input
                                type="text"
                                value={secret}
                                readOnly
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    fontSize: 20,
                                    flex: 1,
                                    outline: "none",
                                    letterSpacing: 2,
                                    fontWeight: 500,
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleCopy}
                                title="Copy"
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    marginLeft: 8,
                                    fontSize: 18,
                                }}
                            >📋</button>
                        </div>
                    </li>
                    <li style={{ marginBottom: 18 }}>
                        After scanning the QR code above, enter the six-digit code generated by your authenticator.
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    id={`otp-input-${idx}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleOtpChange(idx, e.target.value)}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        textAlign: "center",
                                        fontSize: 24,
                                        border: "1.5px solid #D1D5DB",
                                        borderRadius: 8,
                                        outline: "none",
                                        background: "#fff",
                                    }}
                                />
                            ))}
                        </div>
                    </li>
                </ol>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        background: "#2F6FED",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "14px 0",
                        fontSize: 20,
                        fontWeight: 600,
                        marginTop: 24,
                        marginBottom: 8,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(47,111,237,0.08)",
                    }}
                >
                    Verify
                </button>
                <div style={{ textAlign: "center" }}>
                    <a href={url.loginUrl} style={{ color: "#2F6FED", textDecoration: "none", fontSize: 16 }}>
                        Cancel
                    </a>
                </div>
            </div>
        </Template>
    );
}