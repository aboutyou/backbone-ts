import {createProductsByIdsEndpointRequest} from '../productsByIds';

it('Builds correct query', () => {
  expect(
    createProductsByIdsEndpointRequest({
      productIds: [1, 2],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "ids": "1,2",
  },
}
`);

  expect(
    createProductsByIdsEndpointRequest({
      productIds: [1, 2],
      with: {
        attributes: 'all',
        variants: {
          attributes: {
            withKey: ['name'],
          },
        },
      },
      includeSellableForFree: false, // don't send, it's the default
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "ids": "1,2",
    "with": "attributes,variants,variants.attributes:key(name),images.attributes:legacy(false)",
  },
}
`);

  expect(
    createProductsByIdsEndpointRequest({
      productIds: [10],
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "ids": "10",
    "includeSellableForFree": true,
  },
}
`);
});
