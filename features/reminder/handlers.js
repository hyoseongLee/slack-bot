const service = require('./service');

function register(app) {
  // 리마인더 완료 버튼 클릭 처리
  app.action('remind_complete', async ({ body, ack, say }) => {
    await ack(); // Slack에 이벤트 수신 확인
    const reminderId = body.actions[0].value; // 버튼에서 전달된 리마인더 ID 가져오기
    const result = await service.completeReminder(reminderId);
    await say(result); // 완료 메시지 전송
  });
}

module.exports = { register };
