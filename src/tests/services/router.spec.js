import { router } from '@/services'
import { common, location } from '@/utils'

describe('services/router', () => {
  let sandbox, origin, pathname
  beforeEach(() => {
    sandbox = sinon.createSandbox()
    origin = 'foo'
    pathname = 'bar'
    sandbox.stub(location, 'getOrigin').returns(origin)
    sandbox.stub(location, 'getPathname').returns(pathname)
  })
  afterEach(() => {
    sandbox.restore()
  })
  describe('#loadState', () => {
    it('navigates to the home view by default', () => {
      sandbox.stub(location, 'getHash').returns(undefined)
      const setHrefStub = sandbox.stub(location, 'setHref')
      router.loadState()
      setHrefStub.calledWith(origin + pathname + '/#!/' + router.$HOME).should.be.true
    })
    it('loads the home path', () => {
      const path = '#!/home'
      const loadMainViewStub = sandbox.stub(common, 'loadMainView')
      sandbox.stub(location, 'getHash').returns(path)
      router.loadState()
      loadMainViewStub.calledWith('home').should.be.true
    })
  })
  describe('#go', () => {
    it('navigates to a path', () => {
      const hashPath = 'some-path'
      const setHrefStub = sandbox.stub(location, 'setHref')
      router.go(hashPath)
      setHrefStub.calledWith(origin + pathname + '/#!/' + hashPath).should.be.true
    })
  })
})
