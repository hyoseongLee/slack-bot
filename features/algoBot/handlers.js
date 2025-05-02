const {chooseProblem, chooseAlgorithm} = require("./service");

function sampleCode(app) {
  app.action('sample-code-list', async ({ body, ack, say }) => {
    await ack();
    const result = ["Queue", "Stack", "DFS", "BFS", "LinkedList" ,"BinarySearchTree", "Heap"];

    const blocks = [{
      type: 'actions',
      elements: []
    }];

    result.forEach(item => {
      blocks[0].elements.push({
        type: 'button',
        text: {
          type: 'plain_text',
          text: item,
          emoji: true,
        },
        action_id: `say-algorithm-${item.toLowerCase()}`, // <-- 버튼별로 고유 action_id
        value: item.toLowerCase()
      });
    });


    await say({
      text: "자료구조를 선택해주세요.", // [필수] 최상단 text 추가
      blocks,
    });
  });
}

function sayAlgorithm(app) {
  app.action(/say-algorithm-.*/, async ({ body, ack, say }) => {
    await ack();
    const actionId = body.actions[0].action_id;
    const selectedDataStructure = actionId.replace('say-algorithm-', '');
    console.log('SELECTED!',selectedDataStructure)
    const algorithmMessage = chooseAlgorithm(selectedDataStructure);
    await say({
      text: "algorithmMessage",
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: algorithmMessage
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
            }
          ]
        }
      ]
    });
  });
}

const userSelection = {};

function selectDifficulty(app) {
  app.action('select_difficulty', async ({ body, ack, say }) => {
    await ack();
    const userId = body.user.id;
    const selected = body.actions[0].selected_option.value;
    userSelection[userId] = { ...(userSelection[userId] || {}), difficulty: selected };
  })
}

function selectAccuracy(app) {
  app.action('select_accuracy', async ({ ack, body }) => {
    await ack();
    const userId = body.user.id;
    const selected = body.actions[0].selected_option.value;
    userSelection[userId] = { ...(userSelection[userId] || {}), accuracy: selected };
  });
}

function selectSolvedCount(app) {
  app.action('select_solved_count', async ({ ack, body, say }) => {
    await ack();
    const userId = body.user.id;
    const selected = body.actions[0].selected_option.value;
    userSelection[userId] = {...(userSelection[userId] || {}), solvedCount: selected};
  })
}

function checkSelected(app) {
  app.action('check_selected', async ({ body, ack, say }) => {
    await ack();
    const userId = body.user.id;

    if (!userSelection[userId]) {
      await say({
        text: "알고리즘 문제 선정 오류",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "선택하지 않은 항목이 있어요!"
            }
          }
        ]
      });
      return;
    }

    const { difficulty, solvedCount, accuracy } = userSelection[userId];
    if (difficulty && solvedCount && accuracy) {
      await say({
        text: "알고리즘 문제 선정 시작",
        blocks: [
          {
            type: "divider"
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "🤔 AlgoBot이 어떤 문제를 추천할까 고민하고 있어요."
            }
          }
        ]
      });
      const results = await chooseProblem(difficulty, solvedCount, accuracy, app); // 배열로 받음
      if (results.found === false) {
        await say({
          text: "알고리즘 문제 선정 결과",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "\n ❌ 해당 조건에 맞는 문제를 찾지 못했어요. 낮은 난이도이면서 낮은 정답률, 높은 난이도이면서 높은 정답률을 검색하면 조건에 맞는 문제를 못찾을 수 있어요."
              }
            }
          ]
        });
      } else {
        userSelection[userId].results = results;
        console.log('cache', userSelection[userId].results)
        const randomSelect = Math.floor(Math.random() * userSelection[userId].results.message.length);
        const selected = userSelection[userId].results.message[randomSelect];
        await say({
          text: "알고리즘 문제 선정 결과",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `🎯 *추천 문제: ${selected.title}*\n\n 🏃🏻‍♂️‍ 완료한사람 : ${selected.finishedCount}명, 정답률 : ${selected.acceptanceRate}%\n\n 🔗 <https://school.programmers.co.kr/learn/courses/30/lessons/${selected.id}|문제 풀러가기>`
              }
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "\n 💡 문제 추천 완료! 마음에 들지 않으신다면 마지막에 있는 새로고침을 눌러 다시 추천받아보세요!"
              }
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "🔄 다시 추천받기"
                  },
                  action_id: "refresh_recommendation",
                  value: userId
                }
              ]
            }
          ]
        });
      }
    } else {
      await say("선택하지 않은 항목이 있어요!")
    }
  })
}

function refreshRecommendation(app) {
  app.action('refresh_recommendation', async ({ ack, body, say }) => {
    await ack();

    const userId = body.user.id;
    const state = userSelection[userId];

    if (!state || !state.results || state.results.length === 0) {
      await say("⚠️ 캐시된 추천 목록이 없어요. 다시 처음부터 선택해 주세요!");
      return;
    }

    const randomSelect = Math.floor(Math.random() * userSelection[userId].results.message.length);
    const selected = userSelection[userId].results.message[randomSelect];

    await say({
      text: "다시 추천된 문제",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🎯 *추천 문제: ${selected.title}*\n\n 🏃🏻‍♂️‍ 완료한사람 : ${selected.finishedCount}명, 정답률 : ${selected.acceptanceRate}%\n\n 🔗 <https://school.programmers.co.kr/learn/courses/30/lessons/${selected.id}|문제 풀러가기>`
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "🔄 다시 추천받기"
              },
              action_id: "refresh_recommendation"
            }
          ]
        }
      ]
    });
  });
}

module.exports = {
  selectDifficulty,
  selectAccuracy,
  selectSolvedCount,
  checkSelected,
  refreshRecommendation,
  sayAlgorithm,
  sampleCode,
};
