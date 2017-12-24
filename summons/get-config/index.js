const log = summon('log')(module),
      yaml = require('js-yaml'),
      fs = require('fs')

module.exports = () => {
    try {
        const file = fs.readFileSync('config.yml', 'utf8')
        return yaml.safeLoad(file)
    } catch(e) {
        log.error(e)
    }
}