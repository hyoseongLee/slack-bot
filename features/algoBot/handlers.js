const {scrapeAlgorithm} = require("./service");

function sampleCode(app) {
  app.action('sample-code-list', async ({ body, ack, say }) => {
    await ack(); // Slack에 이벤트 수신 확인
    const result = ["queue", "heap", "stack", "sort", "DFS", "BFS"]
    await say(result.join(", "));
  });
}

function scrape(app) {
  app.action('scrape-algorithm', async ({body, ack, say}) => {
    console.log('hello!')
    await ack();
    const test = await scrapeAlgorithm()
    await say('finished!');
  })
}

module.exports = {
  sampleCode,
  scrape
};
