const handlers = require('./handlers');

module.exports = {
  command: {
    name: '/todayfortune',
    description: '오늘의 운세를 확인하세요!',
    handler: handlers.handleTodayFortuneCommand
  }
};
