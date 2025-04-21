const commands = require('./commands');
const handlers = require('./handlers');

function init(app) {
  commands.sampleCode(app);
  handlers.sampleCode(app);
  handlers.scrape(app);
}

module.exports = { init };
