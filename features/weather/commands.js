const service = require('./service');
const cityMap = {
  '서울': 'Seoul',
  '부산': 'Busan',
  '인천': 'Incheon',
  '대구': 'Daegu',
  '대전': 'Daejeon',
  '광주': 'Gwangju',
  '울산': 'Ulsan',
  '수원': 'Suwon',
};

function registerWeatherCommand(app) {
  app.command('/weather', async ({ command, ack, respond, say }) => {
    await ack();

    const inputCity = (command.text || '서울').trim();
    const engCity = cityMap[inputCity];

    if (!engCity) {
      await respond(`죄송합니다. 현재 지원하는 도시는 다음과 같습니다: ${Object.keys(cityMap).join(', ')}`);
      return;
    }

    // 3초 이내에 즉시 안내 메시지 응답
    await respond(`${inputCity}의 날씨 정보를 조회 중입니다. 잠시만 기다려주세요!`);

    try {
      const weather = await service.getWeather(engCity);
      await say({
        text: `${inputCity}의 오늘 날씨: ${weather.description}, 온도: ${weather.temp}°C (체감: ${weather.feels_like}°C), 습도: ${weather.humidity}%, 초미세먼지(PM2.5): ${weather.pm2_5} ㎍/㎥ (${weather.pm2_5_grade})`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                `*${inputCity}*의 오늘 날씨입니다:\n` +
                `> ${weather.description}\n` +
                `> 온도: ${weather.temp}°C (체감: ${weather.feels_like}°C)\n` +
                `> 습도: ${weather.humidity}%\n` +
                `> *초미세먼지(PM2.5):* ${weather.pm2_5} ㎍/㎥ (${weather.pm2_5_grade})`
            },
            accessory: {
              type: 'image',
              image_url: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
              alt_text: 'weather icon'
            }
          }
        ]
      });
    } catch (err) {
      await say('날씨 정보를 가져오는 데 실패했습니다.');
    }
  });
}

module.exports = { registerWeatherCommand };
