require('should')
const repository = require('./repository')

describe('Repository', () => {
  it('should connect with a promise', () => {
    repository.connect({ resolve: function() { return undefined }}).should.be.a.Promise()
  })
})