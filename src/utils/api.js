// utils/api.js
const baseURL = 'https://test.sfgweb.co.za/wp-json/wc/v3';
const auth = btoa('ck_a4bc1094d5e8eb9b758c7fe477e41c99910463b3:cs_d6cc2ba7fa8c2e9634c8d37618e7f32645f53831');

export const getProducts = async () => {
  const res = await fetch(`${baseURL}/products`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return res.json();
};
