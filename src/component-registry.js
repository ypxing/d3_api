class ComponentRegistry {
  constructor() {
    this.components = {}
  }

  setComponent(name, component) {
    this.components[name] = component
  }

  getComponent(name) {
    return this.components[name]
  }
}

var componentRegistry = new ComponentRegistry

export default componentRegistry
