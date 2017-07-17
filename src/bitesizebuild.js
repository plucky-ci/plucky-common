'use strict';

let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');

class BitesizeBuild {
	constructor(file) {
		this.jsonYamlObj = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), file), 'utf8'));
		this.file = file;
	}

	getComponent(matchComponent) {
		// should only ever have 1 componment that matches
		return this.jsonYamlObj.components.filter((compObj) => {
			if (compObj.name === matchComponent) {
				return compObj;
			}
		})[0];
	}

	setBranchName(targetComponent, targetBranchName) {
    const component = this.getComponent(targetComponent);

    if (component && component.repository) {
      component.repository.branch = targetBranchName;
    }

		const yamlString = yaml.safeDump(this.jsonYamlObj);

		try {
			fs.writeFileSync(this.file, yamlString);
			return component;
		} catch(e) {
			throw e;
		}
	}
}

module.exports = BitesizeBuild;
