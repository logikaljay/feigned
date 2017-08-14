module.exports = {
  validate: function(routes) {
    var errors = []

    if (typeof routes.push === 'undefiend') {
      routes = [routes]
    }

    routes.forEach((route, i) => {
      ;['name', 'endpoint', 'method', 'responses'].forEach(prop => {
        if (!route.hasOwnProperty(prop)) {
          errors.push(`${this}[${i}] does not contain '${prop}'`)
        }
      })
    })

    return errors
  }
}
