const chai = require('chai'),
  expect = chai.expect,
  server = require('../src/api/server'),
  http = require('http')

describe('Server', () => {
  let srv
  before(() => {
    srv = new server()
    srv.addRoute({
      path: '/',
      handler: (req, res) => {
        res.end('It works!!!')
      }
    })

    srv.addRoute({
      method: 'POST',
      path: '/',
      handler: (req, res) => {
        res.end('Post works too!!!')
      }
    })
    srv.start()
  })

  after(() => {
    srv.stop()
  })

  describe('has a property called', () => {
    it('config', () => {
      expect(srv).to.have.property('config')
    })

    it('routes', () => {
      expect(srv).to.have.property('routes')
    })

    it('server', () => {
      expect(srv).to.have.property('server')
    })

    it('errorHandler', () => {
      expect(srv).to.have.property('errorHandler')
    })

    it('start', () => {
      expect(srv).to.have.property('start')
    })

    it('stop', () => {
      expect(srv).to.have.property('stop')
    })
  })

  it('Get request to / responds with It works!!!', (done) => {
    http.get('http://localhost:3002', (res) => {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        expect(rawData).to.equal('It works!!!')
        done()
      })
    })
  })

  it('Post request to / responds with Post works too!!!', (done) => {
    var options = {
      host: 'localhost',
      port: '3002',
      path: '/',
      method: 'POST'
    };

    // Set up the request
    var post_req = http.request(options, function (res) {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        expect(rawData).to.equal('Post works too!!!')
        done()
      })
    });

    post_req.end();
  })
})