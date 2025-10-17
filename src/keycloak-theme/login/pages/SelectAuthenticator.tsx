import type { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logoHCM.png";

export default function SelectAuthenticator(
    props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url } = kcContext;
    const { msg } = i18n;

    // You may need to adjust form actions and field names based on your Keycloak config
    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={ msg("emailForgotTitle")}            
        >
            <div> 
                <div>
                    <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
                    <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
                        Two-factor Authentication
                    </div>
                    <div style={{ color: "#666", fontSize: '15px', marginBottom: 24}}>
                        Choose how you’d like to verify your profile.
                    </div>
                </div>
            <form action={url.loginAction} method="post" >
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <button
                        type="submit"
                        name="authenticator"
                        value="app"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#F5F6FA",
                            border: "none",
                            borderRadius: 12,
                            padding: "18px 20px",
                            fontSize: 18,
                            fontWeight: 500,
                            cursor: "pointer",
                            gap: 16,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            transition: "background 0.2s",
                        }}
                    >
                        <span style={{ fontSize: 28, marginRight: 12 }}>🧩</span>
                        <span style={{ flex: 1, textAlign: "left" }}>
                            <div style={{ fontWeight: 600, color: "#253053" }}>Authenticator App</div>
                            <div style={{ fontSize: 14, color: "#666" }}>
                                Scan a QR code and use your authenticator app to generate a time-based code.
                            </div>
                        </span>
                        <span style={{ fontSize: 22, color: "#B0B0B0" }}>›</span>
                    </button>
                    <button
                        type="submit"
                        name="authenticator"
                        value="email"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#F5F6FA",
                            border: "none",
                            borderRadius: 12,
                            padding: "18px 20px",
                            fontSize: 18,
                            fontWeight: 500,
                            cursor: "pointer",
                            gap: 16,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            transition: "background 0.2s",
                        }}
                    >
                        <span style={{ fontSize: 28, marginRight: 12 }}>✉️</span>
                        <span style={{ flex: 1, textAlign: "left" }}>
                            <div style={{ fontWeight: 600, color: "#253053" }}>Email</div>
                            <div style={{ fontSize: 14, color: "#666" }}>
                                We’ll send a verification code to your email address.
                            </div>
                        </span>
                        <span style={{ fontSize: 22, color: "#B0B0B0" }}>›</span>
                    </button>
                    <button
                        type="submit"
                        name="authenticator"
                        value="phone"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#F5F6FA",
                            border: "none",
                            borderRadius: 12,
                            padding: "18px 20px",
                            fontSize: 18,
                            fontWeight: 500,
                            cursor: "pointer",
                            gap: 16,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            transition: "background 0.2s",
                        }}
                    >
                        <span style={{ fontSize: 28, marginRight: 12 }}>📞</span>
                        <span style={{ flex: 1, textAlign: "left" }}>
                            <div style={{ fontWeight: 600, color: "#253053" }}>Phone</div>
                            <div style={{ fontSize: 14, color: "#666" }}>
                                We’ll send an SMS with a verification code to your phone.
                            </div>
                        </span>
                        <span style={{ fontSize: 22, color: "#B0B0B0" }}>›</span>
                    </button>
                </div>
            </form>
            </div>   
        </Template>
    );
}