// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import twitter from "./assets/twitter.svg";
import linkedIn from "./assets/linkedin.svg";
import facebook from "./assets/facebook.svg";
import youtube from "./assets/youtube.svg";
import vimeo from "./assets/vimeo.svg";
import { useState } from "react";

export default function Template(props: TemplateProps<KcContext, I18n> & { height?: string , bottom?: string }) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode = null,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children,
        height = '500px',
        bottom = "0px"
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const [showOverlayPopup, setShowOverlayPopup] = useState(true);

    const handleDismiss = () => {
        // Hide the overlay popup
        setShowOverlayPopup(false);
    };

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    if (!isReady) {
        return null;
    }

    return (
        
        <div className={getClassName("kcLoginClass")}>
            
            {/* Validation Messages */}   
            {/* {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                <>
                    {message.type === "info" && (
                         <div className={showOverlayPopup ? "popup-overlay" : "hidden"}>
                         <div className="popup-content">                   
                             <span style={{color:'#253053', fontSize:'16px'}}>Forgot Password</span>                  
                             <p
                                 className="kc-feedback-text"
                                 dangerouslySetInnerHTML={{
                                     "__html": message.summary
                                 }} style={{ textAlign: 'center', margin:'10px 0px 10px' }}
                             />
                             <button onClick={handleDismiss} className="ok-button">OK</button>
                         </div>
                     </div>
                    )}
                    {message.type !== "info" && (
                        <div className="top-center">
                            {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                            {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                            {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}

                            <span
                                className="kc-feedback-text"
                                dangerouslySetInnerHTML={{
                                    "__html": message.summary
                                }} style={{ marginLeft: '5px' }}
                            />
                        </div>
                    )}
                </>
            )} */}

            <div className="middle-container" style={{ paddingTop: '10%', paddingLeft: '109px' }}>
                {/* Left Side Container */}
                 <div className="left-side">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                        <div style={{ color: "var(--White, #FFF)", textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "#535E82", fontFamily: "DaytonaPro-Semibold", fontSize: "96px", fontStyle: "normal", fontWeight: 400, lineHeight: "normal", letterSpacing: "-2.88px", textAlign: "left" }}>
                            Empower People
                        </div>
                        <div style={{ color: "var(--White, #FFF)", textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "#535E82", fontFamily: "DaytonaPro-Semibold", fontSize: "96px", fontStyle: "normal", fontWeight: 400, lineHeight: "normal", letterSpacing: "-2.88px", textAlign: "left" }}>
                            Elevate HR
                        </div>
                        <div style={{ color: "var(--White, #FFF)", textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "var(--Icon-active, #535E82)", fontFamily: "DaytonaPro-Regular", fontSize: "32px", fontStyle: "normal", fontWeight: 400, lineHeight: "normal" ,textAlign: "left"}}>
                            Where modern HR meets real impact
                        </div>
                        <div style={{ color: "var(--White, #FFF)", textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "var(--Icon-active, #535E82)", fontFamily: "DaytonaPro-Regular", fontSize: "24px", fontStyle: "normal", fontWeight: 400, lineHeight: "37px", textAlign: "left", marginTop: "20px" }}>
                            Help every employee rise <br/>with workflows, insights and care
                        </div>
                    </div>
                </div>

                {/* Right Side Container */}
                <div className="right-side">
                    <div className={clsx(getClassName("kcFormCardClass"), displayWide && getClassName("kcFormCardAccountClass"))} style={{ width: '420px', minHeight: height, borderRadius: '25px', marginBottom: bottom, padding:'40px'}}>
                        <div id="kc-content">
                            <div id="kc-content-wrapper"> 
                                {children}
                                {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                    <form
                                        id="kc-select-try-another-way-form"
                                        action={url.loginAction}
                                        method="post"
                                        className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                    >
                                        <div
                                            className={clsx(
                                                displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                            )}
                                        >
                                            <div className={getClassName("kcFormGroupClass")}>
                                                <input type="hidden" name="tryAnotherWay" value="on" />
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a
                                                    href="#"
                                                    id="try-another-way"
                                                    onClick={() => {
                                                        document.forms["kc-select-try-another-way-form" as never].submit();
                                                        return false;
                                                    }}
                                                >
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {displayInfo && (
                                    <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                        <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                            {infoNode}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ bottom: '0', width: '100%', textAlign: 'center', paddingBottom: '20px' }}>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <img src={twitter} alt="Twitter" style={{ width: '20px', height: '20px', margin: '0 5px' }} />
                    <img src={facebook} alt="Twitter" style={{ width: '20px', height: '20px', margin: '0 5px' }} />
                    <img src={vimeo} alt="Twitter" style={{ width: '20px', height: '20px', margin: '0 5px' }} />
                    <img src={linkedIn} alt="Twitter" style={{ width: '20px', height: '20px', margin: '0 5px' }} />
                    <img src={youtube} alt="Twitter" style={{ width: '20px', height: '20px', margin: '0 5px' }} />
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize:'12px',color:'#ffffff',fontWeight:'400' }}>
                    Copyright © 2023 Rise HR Software (Pvt) Ltd. All Rights Reserved.
                </div>
            </div>
        </div>
    );
}
