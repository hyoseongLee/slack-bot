const service = require('./service');

function register(app) {
  // 리마인더 생성 명령어
  app.command('/remindtest', async ({ command, ack, say }) => {
    await ack();
    const result = await service.createReminder(command.text, command.user_id);
    await say(result);
  });

  // 리마인더 조회 명령어
  app.command('/list-reminders', async ({ command, ack, say }) => {
    await ack();
    const reminders = await service.listReminders(command.user_id);
    await say(reminders);
  });
}

module.exports = { register };
