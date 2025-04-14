const service = require('./service');

function register(app) {
  // 리마인더 완료 버튼 클릭 이벤트 처리
  app.action('remind_complete', async ({ body, ack, say }) => {
    await ack();
    const result = await service.completeReminder(body.actions[0].value);
    await say(result);
  });
}

module.exports = { register };
