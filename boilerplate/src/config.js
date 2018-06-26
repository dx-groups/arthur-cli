let baseUrl = '/'

if (process.env.NODE_ENV === 'production') {
  switch (process.env.BUILD_ENV) {
    case 'test': {
      console.log('in TEST')
      baseUrl = 'http://test-***.***.com'
      break
    }
    default: {
      console.log('in PROD')
      baseUrl = 'https://***.***.com'
    }
  }
}

export { baseUrl }
