const service = require('./service');

function register(app) {
  // 리마인더 생성 명령어 처리
  app.command('/reminder', async ({ command, ack, say }) => {
    await ack();
    const reminderId = Date.now(); // 고유 ID 생성
    const result = await service.createReminder(command.text, command.user_id, reminderId);

    // Block 메시지 전송 (버튼 포함)
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `리마인더가 생성되었습니다: *${command.text}*\n아래 버튼을 눌러 완료하세요.`
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '완료하기'
            },
            action_id: 'remind_complete',
            value: reminderId.toString()
          }
        }
      ]
    });
  });
}

module.exports = { register };
