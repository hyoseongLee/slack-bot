const {codeDescription} = require("./const/codeDescription");
const {sampleCodes} = require("./const/sampleCodes");
const fs = require("fs");
const path = require("path");

function chooseAlgorithm(dataStructure) {
  const data = dataStructure.toLowerCase();
  return codeDescription[data] + sampleCodes[data];
}

const problems = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/algorithm_problems.json'), 'utf-8'))

// 필터링 로직
function matchConditions(problem, difficulty, accuracy, solvedCount) {
  const level = parseInt(difficulty.split('_')[1]);
  const accRange = accuracy.split('_').slice(1).join('_'); // '0_30' 등
  const solvedTag = solvedCount.split('_')[1]; // 'low' 등

  const acc = problem.acceptanceRate;
  const solved = problem.finishedCount;

  // 정답률 조건 체크
  let accValid = false;
  if (accRange === '0_30') accValid = acc < 30;
  else if (accRange === '30_70') accValid = acc >= 30 && acc < 70;
  else if (accRange === '70_up') accValid = acc >= 70;

  // 풀이 수 조건 체크
  let solvedValid = false;
  if (solvedTag === 'low') solvedValid = solved <= 1000;
  else if (solvedTag === 'mid') solvedValid = solved <= 10000;
  else if (solvedTag === 'high') solvedValid = solved > 10000;

  return problem.level === level && accValid && solvedValid;
}

function chooseProblem(difficulty, solvedCount, accuracy) {
  const filtered = problems.result.filter(p => matchConditions(p, difficulty, accuracy, solvedCount));
  if (filtered.length === 0) {
    return {
      found: false,
      message: []
    };
  }
  return {
    found: true,
    message: filtered,
  };
}

module.exports = {
  chooseAlgorithm,
  chooseProblem,
};
