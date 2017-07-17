'use strict';

let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');

class BitesizeEnvironment {
	constructor(file) {
		this.jsonYamlObj = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), file), 'utf8'));
		this.file = file;
	}

	getOrderedEnvironments() {
		const environments = this.jsonYamlObj.environments;
		let orderedEnvList = environments.filter(function(env) {
			return !env.next_environment;
		});

		for(let i = 0; i < environments.length; i++) {
			let env = environments[i];
			if(env.next_environment) {
				let idx = 0;
				for(let j = 0; j < orderedEnvList.length; j++) {
					let orderedEnv = orderedEnvList[j];
					if(env.name === orderedEnv.next_environment) {
						idx = j+1;
						break;
					}
				}
				orderedEnvList.splice(idx, 0, env);
			}
		}
		return orderedEnvList;
	}

	getEnvironment(matchEnv) {
		// should only ever have 1 environment that matches
		return this.jsonYamlObj.environments.filter((envObj) => {
			if (envObj.name === matchEnv) {
				return envObj;
			}
		})[0];
	}

	toggleActiveDeployment(matchEnv) {
		const envIdx = this.jsonYamlObj.environments.findIndex((envObj, idx) => {
			return envObj.name === matchEnv;
		});
		const env = this.jsonYamlObj.environments[envIdx];

		if(env.deployment && env.deployment.method === 'bluegreen') {
			env.deployment.active = env.deployment.active  === 'green' ? 'blue' : 'green';
		}

		const yamlString = yaml.safeDump(this.jsonYamlObj);

		try {
			fs.writeFileSync(this.file, yamlString);
			return env;
		} catch(e) {
			throw e;
		}


	}

	setActiveDeploymentColor(matchEnv, color) {
		const envIdx = this.jsonYamlObj.environments.findIndex((envObj, idx) => {
			return envObj.name === matchEnv;
		});
		const env = this.jsonYamlObj.environments[envIdx];

		env.deployment.active = color;

		const yamlString = yaml.safeDump(this.jsonYamlObj);


		try {
			fs.writeFileSync(this.file, yamlString);
		} catch(e) {
			throw e;
		}
	}
}

module.exports = BitesizeEnvironment;
