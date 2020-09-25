const fetch = require('node-fetch');

const API_URL = 'https://order.dominos.com/power/';

const orderTypes = {
  Delivery: 'Delivery',
  Carryout: 'Carryout',
};

async function getStoresNearAddress(orderType, cityRegionOrPostalCode) {
  const response = await fetch(
    `${API_URL}store-locator?type=${orderType}&c=${cityRegionOrPostalCode}&s=`,
  );
  return response.json();
}

async function getNearestDeliveryStore(cityRegionOrPostalCode, streetAddress) {
  const response = await getStoresNearAddress(
    orderTypes.Delivery,
    cityRegionOrPostalCode,
    streetAddress,
  );
  return response.Stores.find((store) => store.IsDeliveryStore);
}

async function getStoreInfo(storeId) {
  const response = await fetch(`${API_URL}store/${storeId}/profile`);
  return response.json();
}

async function getStoreMenu(storeId) {
  const response = await fetch(
    `${API_URL}store/${storeId}/menu?lang=en&structured=true`,
  );
  return response.json();
}

async function getStoreCoupon(couponId, storeId) {
  const response = await fetch(
    `${API_URL}store/${storeId}/coupon/${couponId}?lang=en`,
  );
  return response.json();
}

async function postOrder(order, endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(order),
    method: 'POST',
  });
  return response.json();
}

async function validateOrder(order) {
  return postOrder(order, 'validate-order');
}

async function priceOrder(order) {
  return postOrder(order, 'price-order');
}

async function placeOrder(order) {
  return postOrder(order, 'place-order');
}

module.exports = {
  orderTypes,
  getStoresNearAddress,
  getNearestDeliveryStore,
  getStoreInfo,
  getStoreMenu,
  getStoreCoupon,
  validateOrder,
  priceOrder,
  placeOrder,
};

// getStoresNearAddress(orderTypes.Carryout, 'Gloucester, MA')
//   .then(json => getStoreInfo(json.Stores[0].StoreID))
//   .then(data => {
//     console.log(data);
//   });

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
        Street: '1 MAIN ST',
        StreetName: 'MAIN ST',
        StreetNumber: '1',
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
      Phone: '978-325-2105',
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
          Code: 'B8PCCT',
          Qty: 1,
          ID: 3,
          isNew: true,
          Options: { SIDICE: 1 },
        },
      ],
      ServiceMethod: 'Delivery',
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

  // const validate = await priceOrder(order);
  // console.log(validate);

  // const Amount = validate.Order.Amounts.Customer;

  // validate.Order.Payments.push({
  //   Type: 'CreditCard',
  //   Amount,
  //   Number: '4242424242424242',
  //   CardType: 'VISA',
  //   Expiration: '0424',
  //   SecurityCode: '123',
  //   PostalCode: '01930',
  // });

  // const placedOrder = await placeOrder(validate);
  // console.log(placedOrder);
})();
