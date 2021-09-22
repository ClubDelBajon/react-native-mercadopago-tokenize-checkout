import get from 'lodash.get';

const tokenizerAttributes = {
  amount: 'totalAmount',
  action: 'backUrl',
};

const summaryAttributes = {
  'summary.discountLabel': 'discountLabel',
  'summary.productLabel': 'productLabel',
  'summary.discount': 'discount',
  'summary.shipping': 'shipping',
  'summary.amount': 'totalAmount',
  'summary.action': 'backUrl',
  'summary.arrears': 'arrears',
  'summary.charge': 'charge',
  'summary.taxes': 'taxes',
};

const themeAttributes = {
  'theme.header': 'headerColor',
  'theme.elements': 'elementsColor',
};

const installmentsAttributes = {
  'installments.minInstallments': 'minInstallments',
  'installments.maxInstallments': 'maxInstallments',
};

export const getHtmlCode = ({ publicKey, ...props }: any) => ({
  html: `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </head>
      <body>
        <script src="https://sdk.mercadopago.com/js/v2"></script>
        <script>
          const mp = new MercadoPago('${publicKey}', {locale: 'es-AR'});

          mp.checkout({
            tokenizer: {
              ${Object.entries(tokenizerAttributes).reduce(
                (acum, [key, value]) =>
                  get(props, key)
                    ? acum + ` ${value}:"${get(props, key)}", `
                    : acum,
                ''
              )}
              installments: {
                ${Object.entries(installmentsAttributes).reduce(
                  (acum, [key, value]) =>
                    get(props, key)
                      ? acum + ` ${value}:"${get(props, key)}", `
                      : acum,
                  ''
                )}
              },
              summary: {
                ${Object.entries(summaryAttributes).reduce(
                  (acum, [key, value]) =>
                    get(props, key)
                      ? acum + ` ${value}:"${get(props, key)}", `
                      : acum,
                  ''
                )}
              },
            },
            theme: {
              ${Object.entries(themeAttributes).reduce(
                (acum, [key, value]) =>
                  get(props, key)
                    ? acum + ` ${value}:"${get(props, key)}", `
                    : acum,
                ''
              )}
            },
            autoOpen: true,
          });
        </script>

        <style>
          body {
            background: ${props.theme?.elements};
          }
        </style>
      </body>
    </html>
  `,
});

export const getQueryParams = (url: string) => {
  try {
    const [, params] = url.split('?');
    if (params && params.length > 0) {
      const tuples = params.split('&');
      return Object.fromEntries(tuples.map((element) => element.split('=')));
    } else {
      return {};
    }
  } catch {
    return {};
  }
};

export const log = (...args: any) => {
  if (__DEV__) {
    console.info(...args);
  }
};
