'use strict';

let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');

class BitesizeBuild {
	constructor(file) {
		this.jsonYamlObj = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), file), 'utf8'));
		this.file = file;
	}

// components.console-server.repository.branch: master => newBranchName
// components.console-ui.repository.branch: master => newBranchName
// components.mongo3x.repository.branch: master --  NoChange
// components.consul-ui.repository.branch: master --  NoChange
// components.node6.9.5.repository.branch: master --  NoChange
// components.node6.10.3.repository.branch: master --  NoChange

	getComponent(matchComponent) {
		// should only ever have 1 componment that matches
		return this.jsonYamlObj.componments.filter((compObj) => {
			if (compObj.name === matchComponent) {
				return compObj;
			}
		})[0];
	}

	setBranchName(targetComponent, targetBranchName) {
    const component = getComponent(targetComponent);

    if (component && component.repository) {
      component.repository.branch = targetBranchName;
    }

		const yamlString = yaml.safeDump(this.jsonYamlObj);

		try {
			fs.writeFileSync(this.file, yamlString);
			return env;
		} catch(e) {
			throw e;
		}
	}
}

module.exports = BitesizeBuild;
