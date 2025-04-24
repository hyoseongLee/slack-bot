const commands = require('./commands');
const handlers = require('./handlers');

function init(app) {
  commands.algoBot(app);
  handlers.sampleCode(app);
  handlers.checkSelected(app);
  handlers.selectAccuracy(app);
  handlers.selectDifficulty(app);
  handlers.selectSolvedCount(app);
  handlers.refreshRecommendation(app);
}

module.exports = { init };
