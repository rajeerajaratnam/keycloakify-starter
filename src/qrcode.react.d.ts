declare module "qrcode.react" {
    import * as React from "react";
    export interface QRCodeProps {
        value: string;
        size?: number;
        [key: string]: any;
    }
    export default class QRCode extends React.Component<QRCodeProps> {}
}