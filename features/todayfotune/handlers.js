const { WebClient } = require('@slack/web-api');
const { getTodayFortune } = require('./service');
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

const handleTodayFortuneCommand = async ({ body, ack }) => {
  await ack();

  const birthday = body.text.trim();
  if (!/^\d{8}$/.test(birthday)) {
    await slack.chat.postMessage({
      channel: body.channel_id,
      text: '생년월일 형식이 올바르지 않습니다. 예: `/todayfortune 20010615`'
    });
    return;
  }

  try {
    const { fortune } = await getTodayFortune(birthday);

    await slack.chat.postMessage({
      channel: body.channel_id,
      text: `🔮 *${birthday}*생의 오늘의 운세\n\n${fortune}`
    });
  } catch (error) {
    console.error(error);
    await slack.chat.postMessage({
      channel: body.channel_id,
      text: '운세를 가져오는 중 오류가 발생했어요. 나중에 다시 시도해주세요!'
    });
  }
};

module.exports = {
  handleTodayFortuneCommand
};
