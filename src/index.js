const fetch = require('node-fetch');

const orderTypes = {
  Delivery: 'Delivery',
  Carryout: 'Carryout',
};

const API_URL = 'https://order.dominos.com/power';

async function getStoresNearAddress(
  orderType,
  cityRegionOrPostalCode,
  streetAddress,
) {
  const response = await fetch(
    `${API_URL}/store-locator?type=${orderType}&c=${cityRegionOrPostalCode}&s=${streetAddress}`,
  );
  return response.json();
}

async function getNearestDeliveryStore(cityRegionOrPostalCode, streetAddress) {
  const storesResult = await getStoresNearAddress(
    orderTypes.Delivery,
    cityRegionOrPostalCode,
    streetAddress,
  );
  return storesResult.Stores.find((store) => store.IsDeliveryStore);
}

async function getStoreInfo(storeId) {
  const response = await fetch(`${API_URL}/store/${storeId}/profile`);
  return response.json();
}

async function getStoreMenu(storeId) {
  const response = await fetch(
    `${API_URL}/store/${storeId}/menu?lang=en&structured=true`,
  );
  return response.json();
}

async function getStoreCoupon(couponId, storeId) {
  const response = await fetch(
    `${API_URL}/store/${storeId}/coupon/${couponId}?lang=en`,
  );
  return response.json();
}

async function validateOrder(order) {
  const response = await fetch(
    'https://order.dominos.com/power/validate-order',
    {
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(order),
      method: 'POST',
    },
  );
  return response.json();
}

async function priceOrder(order) {
  const response = await fetch('https://order.dominos.com/power/price-order', {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(order),
    method: 'POST',
  });
  return response.json();
}

// getStoresNearAddress(orderTypes.Delivery, 'Gloucester, MA, 01930', '20 Brierwood st')
//   .then(json => console.log(json.Stores[0]));

(async () => {
  // const storeInfo = await getStoreInfo('3769');
  // const store = await getNearestDeliveryStore('Gloucester, MA, 01930', '1 Main st');
  // console.log(store);
  // const store = await getStoreMenu('3769');
  // const storeCoupon = await getStoreCoupon('8682', '3769');
  // console.log(storeCoupon);
  const order = {
    Order: {
      Address: {
        Street: '20 BRIERWOOD ST',
        StreetName: 'BRIERWOOD ST',
        StreetNumber: '20',
        City: 'GLOUCESTER',
        Region: 'MA',
        PostalCode: '01930-1223',
        Type: 'House',
      },
      Coupons: [
        {
          Code: '9193',
          Qty: 1,
          ID: 1,
          IsBelowMinimumOrderAmount: false,
          IsBelowMinimumPaymentAmount: false,
        },
      ],
      CustomerID: '',
      Email: '',
      Extension: '',
      FirstName: '',
      LastName: '',
      LanguageCode: 'en',
      OrderChannel: 'OLO',
      OrderID: 'NMuD3CWYMYiKOK1Zj3A_',
      OrderMethod: 'Web',
      OrderTaker: null,
      Payments: [],
      Phone: '',
      PhonePrefix: '',
      Products: [
        {
          Code: '12SCREEN',
          Qty: 1,
          ID: 2,
          isNew: true,
          Options: { X: { '1/1': '1' }, C: { '1/1': '1' } },
        },
        {
          Code: 'B8PCCT', Qty: 1, ID: 3, isNew: true, Options: { SIDICE: 1 },
        },
      ],
      ServiceMethod: 'Carryout',
      SourceOrganizationURI: 'order.dominos.com',
      StoreID: '3769',
      Tags: {},
      Version: '1.0',
      NoCombine: true,
      Partners: { DOMINOS: { Tags: {} } },
      HotspotsLite: false,
      OrderInfoCollection: [],
    },
  };

  const validate = await priceOrder(order);
  console.log(validate);
})();
