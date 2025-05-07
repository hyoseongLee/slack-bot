const handlers = require('./handlers');

module.exports = {
  command: {
    name: '/constellation',
    description: '별자리 오늘의 운세를 확인하세요!',
    handler: handlers.handleConstellationCommand
  }
};
