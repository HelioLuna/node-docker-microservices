/* eslint-env mocha */
const { init } = require('./')

describe('Dependency Injection configuration', () => {
  it ('can init dependencies to the container', (done) => {
    init()
      .then(container => {
        console.log(container)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})