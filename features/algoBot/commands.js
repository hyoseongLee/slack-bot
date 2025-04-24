const service = require('./service');
const {chooseAlgorithm} = require("./service");

function algoBot(app) {
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
        }
      ]
    })
  })
  app.command('/algobot', async ({command, ack, say}) => {
    await ack();
    const order = command.text.trim().toLowerCase();
    if (order === 'recommend') {
      await say({
        text: "알고리즘 문제 추천 진행",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*🤖 안녕하세요! 저는 데브코스의 AlgoBot 입니다.*\n\n당신에게 맞는 알고리즘 문제를 추천해드릴게요.\n아래 조건을 골라주세요!"
            }
          },
          {
            type: "divider"
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'static_select',
                action_id: 'select_difficulty',
                placeholder: {
                  type: "plain_text",
                  text: "난이도 선택 (0 - 5)"
                },
                options: [0, 1, 2, 3, 4, 5].map((level) => ({
                  text: {
                    type: 'plain_text',
                    text: `${level}`
                  },
                  value: `difficulty_${level}`
                }))
              },
              {
                type: 'static_select',
                action_id: 'select_accuracy',
                placeholder: {
                  type: 'plain_text',
                  text: '정답률'
                },
                options: [
                  { text: { type: 'plain_text', text: '0~30%' }, value: 'accuracy_0_30' },
                  { text: { type: 'plain_text', text: '30~70%' }, value: 'accuracy_30_70' },
                  { text: { type: 'plain_text', text: '70% 이상' }, value: 'accuracy_70_up' }
                ]
              },
              {
                type: 'static_select',
                action_id: 'select_solved_count',
                placeholder: {
                  type: 'plain_text',
                  text: '문제 풀이 수'
                },
                options: [
                  { text: { type: 'plain_text', text: '하 (1,000명 이하)' }, value: 'solved_low' },
                  { text: { type: 'plain_text', text: '중 (10,000명 이하)' }, value: 'solved_mid' },
                  { text: { type: 'plain_text', text: '상 (10,000명 이상)' }, value: 'solved_high' }
                ]
              },
            ]
          },
          {
            type: "divider"
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "난이도, 정답률, 문제 풀이 수 모두 선택했으면, 아래의 버튼을 눌러 문제 추천을 받아보세요!"
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: "🚀 AlgoBot의 추천 문제는?"
                },
                action_id: 'check_selected',
              }
            ]
          }
        ]
      })
    } else {
      await say("준비중입니다.")
    }
  })
}

module.exports = { algoBot };
