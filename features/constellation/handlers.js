const { WebClient } = require('@slack/web-api');
const { getConstellationFortune } = require('./service');
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

const handleConstellationCommand = async ({ body, ack }) => {
  await ack();

  const birthday = body.text.trim();
  if (!/^\d{8}$/.test(birthday)) {
    await slack.chat.postMessage({
      channel: body.channel_id,
      text: '생년월일 형식이 잘못되었습니다. 예: `/constellation 20000615`'
    });
    return;
  }

  try {
    const { sign, fortune } = await getConstellationFortune(birthday);

    await slack.chat.postMessage({
      channel: body.channel_id,
      text: `🌟 *${sign}*의 오늘 운세\n\n${fortune}`
    });
  } catch (error) {
    console.error(error);
    await slack.chat.postMessage({
      channel: body.channel_id,
      text: '운세를 가져오는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }
};

module.exports = {
  handleConstellationCommand
};
