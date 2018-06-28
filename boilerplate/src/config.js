let baseUrl = '/'; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
  switch (process.env.BUILD_ENV) {
    case 'test': {
      console.log('in TEST'); // eslint-disable-line no-console
      baseUrl = 'http://test-***.***.com';
      break;
    }
    default: {
      console.log('in PROD'); // eslint-disable-line no-console
      baseUrl = 'https://***.***.com';
    }
  }
}

export { baseUrl };
