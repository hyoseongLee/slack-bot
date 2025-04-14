const commands = require('./commands');
const handlers = require('./handlers');

function init(app) {
  // 슬래시 명령어 등록
  commands.register(app);

  // 이벤트 핸들러 등록
  handlers.register(app);
}

module.exports = { init };
