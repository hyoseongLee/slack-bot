const service = require('./service');
const {chooseAlgorithm} = require("./service");

function sampleCode(app) {
  app.command('/sample-code', async ({ command, ack, say }) => {
    await ack();
    const dataStructure = command.text.trim(); // example 인 경우 분기쳐서 결과 리턴
    const example = chooseAlgorithm(dataStructure);
    await say({
      text: "자료구조 예시 코드",
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: example
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: "📚 목록 확인하기"
              },
              action_id: 'sample-code-list',
              value: dataStructure
            }
          ]
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: "scrape"
              },
              action_id: 'scrape-algorithm',
              value: dataStructure
            }
          ]
        }
      ]
    })
  })
}

module.exports = { sampleCode };
