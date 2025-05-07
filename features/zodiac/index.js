const handlers = require('./handlers');

module.exports = {
  command: {
    name: '/zodiac',
    description: '띠 운세를 확인하세요!',
    handler: handlers.handleZodiacCommand
  }
};
