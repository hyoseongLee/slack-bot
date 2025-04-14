const db = require('../../common/database');

/**
 * 리마인더 생성 함수
 * @param {string} text - 리마인더 내용
 * @param {string} userId - 사용자 ID
 * @returns {string} - 결과 메시지
 */
async function createReminder(text, userId) {
  const reminder = {
    id: Date.now(),
    text,
    userId,
    createdAt: new Date(),
    isCompleted: false,
  };

  db.addItem('reminders.json', reminder); // JSON 파일에 저장
  return `리마인더가 생성되었습니다: "${text}"`;
}

/**
 * 사용자별 리마인더 목록 조회 함수
 * @param {string} userId - 사용자 ID
 * @returns {string} - 리마인더 목록 메시지
 */
async function listReminders(userId) {
  const reminders = db.readJson('reminders.json');
  const userReminders = reminders.filter(r => r.userId === userId && !r.isCompleted);

  if (userReminders.length === 0) {
    return '현재 설정된 리마인더가 없습니다.';
  }

  return userReminders.map(r => `- ${r.text} (ID: ${r.id})`).join('\n');
}

/**
 * 리마인더 완료 처리 함수
 * @param {string|number} reminderId - 완료할 리마인더 ID
 * @returns {string} - 결과 메시지
 */
async function completeReminder(reminderId) {
  const reminders = db.readJson('reminders.json');
  const reminder = reminders.find(r => r.id === parseInt(reminderId));

  if (!reminder) {
    return `리마인더를 찾을 수 없습니다: ID(${reminderId})`;
  }

  reminder.isCompleted = true;
  db.updateItem('reminders.json', reminder.id, reminder); // 업데이트된 데이터 저장

  return `리마인더가 완료되었습니다: "${reminder.text}"`;
}

module.exports = {
  createReminder,
  listReminders,
  completeReminder,
};
