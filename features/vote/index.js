function init(app) {
  app.command("/vote", async ({ command, ack, say, client }) => {
    await ack();
    // 예: "/vote 점심 뭐먹지? 한식 중식 일식"
    const [question, ...options] = command.text.split(" ");
    if (options.length < 2) {
      await say("옵션을 두 개 이상 입력하세요.");
      return;
    }
    // 이모지 배열 (옵션 수만큼)
    const emojis = ["one", "two", "three", "four", "five"];
    // 투표 메시지 생성
    let pollMsg = `*${question}*\n`;
    options.forEach((opt, idx) => {
      pollMsg += `:${emojis[idx]}: ${opt}\n`;
    });
    // 메시지 전송
    const result = await say(pollMsg);

    // 각 옵션별 이모지 리액션 추가
    for (let i = 0; i < options.length; i++) {
      await client.reactions.add({
        channel: result.channel,
        name: emojis[i],
        timestamp: result.ts,
      });
    }
  });
}

module.exports = { init };
