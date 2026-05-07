import { EMAIL_FROM, EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USERNAME } from '../helpers/enviroment';

const parsePort = (value: string | undefined) => {
  const port = Number(value);
  return Number.isFinite(port) && port > 0 ? port : 587;
};

const getTransportSecurity = (host: string | undefined, port: number) => {
  const isGmail = /(^|\.)gmail\.com$/i.test(host ?? '') || /googlemail\.com$/i.test(host ?? '');

  return {
    secure: port === 465,
    requireTLS: port === 587 || isGmail,
    tls: isGmail ? { rejectUnauthorized: false } : undefined,
  };
};

export const createMailerConfig = () => {
  const port = parsePort(EMAIL_PORT);
  const security = getTransportSecurity(EMAIL_HOST, port);

  return {
    defaults: {
      from: EMAIL_FROM,
    },
    transport: {
      host: EMAIL_HOST,
      port,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
      ...security,
    },
  };
};
