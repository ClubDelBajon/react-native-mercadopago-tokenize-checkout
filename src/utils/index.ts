// import get from 'lodash.get';

// const tokenizerAttributes = {
//   amount: 'totalAmount',
//   action: 'backUrl',
// };

// const summaryAttributes = {
//   'summary.discountLabel': 'discountLabel',
//   'summary.productLabel': 'productLabel',
//   'summary.maxInstallments': 'installments',
//   'summary.discount': 'discount',
//   'summary.shipping': 'shipping',
//   'summary.amount': 'totalAmount',
//   'summary.action': 'backUrl',
//   'summary.arrears': 'arrears',
//   'summary.charge': 'charge',
//   'summary.taxes': 'taxes',
//   // 'customerId': 'data-customer-id',
//   // 'publicKey': 'data-public-key',
//   // 'cardsIds': 'data-card-ids',
// };

// const themeAttributes = {
//   'theme.header': 'headerColor',
//   'theme.elements': 'elementsColor',
// };

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
              totalAmount: 4000,
              backUrl: 'https://www.mi-sitio.com/procesar-pago',
            },
            autoOpen: true,
          });
        </script>

        <style>
          body {
            background: ${props.theme?.elements};
          }

          button.mercadopago-button {
            visibility: hidden;
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
