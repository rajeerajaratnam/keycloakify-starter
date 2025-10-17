import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logoHCM.png"
import random from "../assets/Random.svg"

export default function MyExtraPage2(props: PageProps<Extract<KcContext, { pageId: "my-extra-page-3.ftl"; }>, I18n>) {

    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const {  realm, url,  auth } = kcContext;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")}
            infoNode={msg("emailInstruction")}
        >
           <div>
                <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
                <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
                    Set Your Password
                </div>
            </div>
            <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post">              
            <div className={getClassName("kcFormGroupClass")}>                                     
                    <div className="floating-label-group">
                        <input
                            type="password"
                            id="Passowrd"
                            name="Passowrd"
                            className={getClassName("kcInputClass") + " form-control"}
                            required
                            
                        />
                        <label htmlFor="Passowrd" className={getClassName("kcLabelClass") + " floating-label"} >
                            Password
                        </label>
                    </div>                  
                </div>               
                <div id="kc-form-buttons">
                    <button
                        className={clsx(
                            getClassName("kcButtonClass"),
                            getClassName("kcButtonPrimaryClass"),
                            getClassName("kcButtonBlockClass"),
                            getClassName("kcButtonLargeClass")
                        )}
                        type="submit"
                        style={{ borderRadius: '6px', fontSize: '14px', border: '1px solid #1E24323B', background: '#FFFFFF', color: '#2C82F9', fontWeight: '400px', paddingRight: '0px' }}
                    >
                        <img src={random} style={{ width: '14px', height: '14px', marginRight: '5px', marginBottom:'2px'}} />
                        Generate Password
                    </button>
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
                        value="Confirm"
                        style={{ backgroundColor: '#2C82F9', borderRadius: '6px', color: '#FFFFFF' }}
                    />
                </div>
                <div className="separator" style={{ marginTop: '30px'}}>
                    <span style={{ fontSize: '14px', color: '#8C8C8C' }}>or</span>
                </div>               
                 <div className={getClassName("kcFormGroupClass")} style={{ textAlign: 'center',marginTop:'20px'  }}>
                    <div className={getClassName("kcFormOptionsWrapperClass")}>                   
                            <span>
                                <a tabIndex={5} style={{ fontSize: '13px', color: '#2C82F9', fontWeight: '400px'}}>
                                    Create Password Manually
                                </a>
                            </span>
                    </div>
                </div>
            </form>
        </Template>
    );
}
