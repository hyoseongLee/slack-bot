const commands = require('./commands');

function init(app) {
  commands.registerWeatherCommand(app);
}

module.exports = { init };
