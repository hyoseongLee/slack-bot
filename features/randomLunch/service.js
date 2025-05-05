// 랜덤 데이터
const lunchMenus = [
    "한식",
    "김치찌개",
    "된장찌개",
    "비빔밥",
    "불고기",
    "돈까스",
    "제육볶음",
    "순댓국",
    "국밥",
    "칼국수",
    "냉면",
    "중식",
    "짜장면",
    "차돌짬뽕",
    "볶음밥",
    "짬짜면",
    "양식",
    "파스타",
    "햄버거",
    "샐러드",
    "일식",
    "초밥",
    "일식덮밥",
    "냉모밀",
    "돈카츠"
]

// 랜덤값 출력 함수
function pickRandomLunchMenu() {
    const randomIndex = Math.floor(Math.random() * lunchMenus.length);
    return lunchMenus[randomIndex];
  }

  module.exports = {pickRandomLunchMenu};