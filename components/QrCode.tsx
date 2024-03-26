import { JSX } from "preact";
import { useMemo } from "preact/hooks";
import { QRCodeSVG } from 'npm:@akamfoad/qrcode';

type QrCodeProps = {
  children: string
};

export function QrCode(props: QrCodeProps)  {
  const { children } = props;
  const qrCodeMarkup = useMemo(() => new QRCodeSVG(children).toString(), [children]);

  return (
    <div className="c-qr-code" dangerouslySetInnerHTML={{__html: qrCodeMarkup}}></div>
  );
}
