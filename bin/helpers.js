const { spawn } = require('child_process')
module.exports = {
  start: (bin, args) => {
    const proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] })
    proc.on('close', code => process.exit(code))
    proc.on('error', err => {
      console.error(err)
      process.exit(1)
    })

    return proc
  },

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
