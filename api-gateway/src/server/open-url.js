const openURL = {
  'autenticar': [
    {
      url: '/autenticar',
      methods: [ 'POST' ]
    }
  ],
  'municipios': [
    {
      url: '/municipios',
      methods: [ 'GET' ]
    },
    {
      url: '/municipios/*',
      methods: [ 'GET' ]
    },
  ],
  'denuncias': [
    {
      url: '/denuncias',
      methods: [ 'GET', 'POST' ]
    },
    {
      url: '/denuncias?*',
      methods: [ 'GET' ]
    },
    {
      url: '/denuncias/*',
      methods: [ 'GET' ]
    },
  ]
}

module.exports = openURL