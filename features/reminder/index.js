const commands = require('./commands');
const handlers = require('./handlers');

function init(app) {
  // 슬래시 명령어와 액션 핸들러 등록
  commands.register(app);
  handlers.register(app);
}

module.exports = { init };
