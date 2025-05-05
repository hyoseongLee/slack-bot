const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data');

/**
 * JSON 파일 읽기 함수
 */
function readJson(fileName) {
  try {
    const filePath = path.join(DATA_PATH, fileName);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

/**
 * JSON 파일 쓰기 함수
 */
function writeJson(fileName, data) {
  try {
    const filePath = path.join(DATA_PATH, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
  }
}

/**
 * 데이터 추가 함수
 */
function addItem(fileName, newItem) {
  const data = readJson(fileName);
  data.push(newItem);
  writeJson(fileName, data);
}

/**
 * 데이터 업데이트 함수 (ID 기반)
 */
function updateItem(fileName, id, updatedItem) {
  const data = readJson(fileName);
  const updatedData = data.map(item => (item.id === id ? updatedItem : item));
  writeJson(fileName, updatedData);
}

/**
 * 데이터 삭제 함수 추가 (ID 기반)
 */
function deleteItem(fileName, id) {
  const data = readJson(fileName);
  const updatedData = data.filter(item => item.id !== id);
  writeJson(fileName, updatedData);
}

module.exports = {
  readJson,
  writeJson,
  addItem,
  updateItem,
  deleteItem
};
