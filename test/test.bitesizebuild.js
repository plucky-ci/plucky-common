const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const BitesizeBuild = require('../src/bitesizeBuild');

const testFile = './test/test-files/build.bitesize';

describe('BitesizeBuild', ()=>{
	it('should locate a specific component', (done) => {
    const bitesizeBuild = new BitesizeBuild(testFile);
    
    expect(bitesizeBuild.getComponent('console-ui')).to.exist();
    expect(bitesizeBuild.getComponent('console-server')).to.exist();
    expect(bitesizeBuild.getComponent('bogus')).to.not.exist();
    
    done();
	});

	it('should set console-ui branct to TeSt', (done) => {
    const bitesizeBuild = new BitesizeBuild(testFile);
    
    bitesizeBuild.setBranchName('console-ui', 'TeSt');
    
    done();
	});

});
