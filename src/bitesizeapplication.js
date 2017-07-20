'use strict';

let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');

class BitesizeApplication {
	constructor(file) {
		this.jsonYamlObj = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), file), 'utf8'));
		this.file = file;
	}

	setDependencyVersion(application, dependency, version) {
		const appIdx = this.jsonYamlObj.applications.findIndex((app, idx) => {
			return app.name === application;
		});
		const app = this.jsonYamlObj.applications[appIdx];

		const dependencyIdx = app.dependencies.findIndex((dep, idx) => {
			return dep.name === dependency;
		});

		app.dependencies[dependencyIdx].version = version;

		const yamlString = yaml.safeDump(this.jsonYamlObj);

		try {
			fs.writeFileSync(this.file, yamlString);
			return app;
		} catch(e) {
			throw e;
		}
	}

	setApplicationVersion(application, version) {
		const appIdx = this.jsonYamlObj.applications.findIndex((app, idx) => {
			return app.name === application;
		});

		const app = this.jsonYamlObj.applications[appIdx];

		app.version = version;

		const yamlString = yaml.safeDump(this.jsonYamlObj);

		try {
			fs.writeFileSync(this.file, yamlString);
			return app;
		} catch(e) {
			throw e;
		}
	}

}

module.exports = BitesizeApplication;
