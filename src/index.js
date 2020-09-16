const fetch = require('node-fetch');

const orderTypes = {
  Delivery: 'Delivery',
  Carryout: 'Carryout',
};

async function getStoresNearAddress(orderType, cityStateZip, streetAddress) {
  const response = await fetch(`https://order.dominos.com/power/store-locator?type=${orderType}&c=${cityStateZip}&s=${streetAddress}`, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'dpz-language': 'en',
      'dpz-market': 'UNITED_STATES',
      market: 'UNITED_STATES',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-dpz-d': '234fe337-3bf8-4a4a-b1fb-21d67c7327ba',
    },
    referrer: 'https://order.dominos.com/assets/build/xdomain/proxy.html',
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  });
  const json = await response.json();
  console.log(json);
}

getStoresNearAddress(orderTypes.Carryout, 'Gloucester, MA, 01930', '20 Brierwood st');
