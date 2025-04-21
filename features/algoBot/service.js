const {codeDescription} = require("./const/codeDescription");
const {sampleCodes} = require("./const/sampleCodes");
const axios = require("axios");
const cheerio = require("cheerio");

function chooseAlgorithm(dataStructure) {
  const data = dataStructure.toLowerCase();
  return codeDescription[data] + sampleCodes[data];
}

async function scrapeAlgorithm() {
  // https://school.programmers.co.kr/learn/challenges?order=acceptance_desc&page={pageNumber}&languages=javascript
  const url = 'https://school.programmers.co.kr/api/v2/school/challenges/?perPage=20&languages%5B%5D=javascript&order=acceptance_desc&search=&page=1';

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    console.log(JSON.stringify(response.data, null, 2)); // 예쁘게 출력
  } catch (error) {
    console.error('에러 발생:', error.message);
    console.error('request url', error.config?.url);
  }
}

module.exports = {
  chooseAlgorithm,
  scrapeAlgorithm,
};

