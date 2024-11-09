class DependencyInjector {
    constructor() {
        this.dependencies = {};
    }

    register(name, dependecy) {
        this.dependencies[name] = dependecy;
    }

    get(name) {
        if (!this.dependencies[name]) {
            throw new Error(`Dependência ${name} nao encontrada`);
        }

        return this.dependencies[name];
    }

}

module.exports = new DependencyInjector();