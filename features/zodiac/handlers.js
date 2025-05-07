const { WebClient } = require('@slack/web-api');
const { getZodiacFortune, getZodiacImageUrl } = require('./service');

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

const handleZodiacCommand = async ({ body, ack }) => {
  await ack();

  const birthday = body.text.trim();
  if (!/^\d{8}$/.test(birthday)) {
    await slack.chat.postMessage({
      channel: body.channel_id,
      text: '생년월일 형식이 올바르지 않습니다. 예: `/zodiac 20010615`'
    });
    return;
  }

  const year = parseInt(birthday.slice(0, 4), 10);

  const { animal, fortune } = await getZodiacFortune(year);
  const imageUrl = await getZodiacImageUrl(animal);

  await slack.chat.postMessage({
    channel: body.channel_id,
    text: `🐾 ${animal}띠 운세`,
    blocks: [
      {
        type: 'image',
        image_url: imageUrl,
        alt_text: `${animal} 이미지`
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${animal}띠 운세*\n\n${fortune}`
        }
      }
    ]
  });
};

module.exports = {
  handleZodiacCommand
};
