# 프로젝트 가이드

## 1. 레포지토리 구조

```
slack-bot/
├── common/                # 공통 모듈 (ex. 데이터베이스 로직)
├── data/                  # JSON 파일로 데이터 저장
├── features/              # 기능별 모듈
│   └── reminder/          # 리마인더 기능
│   └── .../               # 다른 기능 추가
├── main.js                # 앱 진입점
├── package.json           # 프로젝트 의존성 및 설정
└── package-lock.json      # 의존성 잠금 파일
```
---

1. **`main.js`**:
   - Slack 앱의 진입점입니다.
   - 모든 기능(`features`)을 초기화하며, Slack API 이벤트를 처리하는 역할을 합니다.

2. **`features/`**:
   - 각 기능별로 독립적인 폴더를 가지고 있습니다.
   - 예: `reminder` 폴더는 리마인더 기능과 관련된 모든 로직을 포함합니다.
     - `commands.js`: 슬래시 명령어(`/remind`)를 처리합니다.
     - `handlers.js`: 버튼 클릭 등 액션 이벤트를 처리합니다.
     - `service.js`: 리마인더 생성, 조회, 완료 등 비즈니스 로직을 처리합니다.

3. **`common/`**:
   - 공통적으로 사용되는 모듈이 위치합니다.
   - 예: `database.js`는 JSON 파일을 읽고 쓰는 로직을 제공합니다.

4. **`data/`**:
   - JSON 파일로 데이터를 저장하는 폴더입니다.
   - 예: `reminders.json`은 리마인더 데이터를 저장합니다.

5. **`package.json`**:
   - 프로젝트의 의존성을 관리하며, `npm install` 명령어로 필요한 모든 패키지를 설치할 수 있습니다.
  

## 2. Slack API 사용 방식 설명

Slack API는 크게 다음과 같은 방식으로 작동합니다:

#### (1) Slash Commands (슬래시 명령어)
- 사용자가 `/command [옵션]` 형식으로 입력하면 Slack 서버가 앱의 엔드포인트로 요청을 보냅니다.
- 앱은 요청 데이터를 기반으로 작업을 수행하고 응답 메시지를 반환합니다.
- `app.command()` 메서드를 사용하여 구현합니다.
- Slash Command는 앱이 속한 계정에서도 추가해야 합니다. 알려주시면 계속해서 추가하겠습니다.
  - 필요한 내용
    -  명령어 - `/command`
    -  명령어에 대한 짧은 설명 - `Launches the Rocket!`
    -  사용법에 대한 힌트입니다 - `[which rocket to launch]`
   - Slack에서 표기되는 방식
     - `/command [which rocket to launch] Launches the Rocket!`
- 예: `/remind` 명령어를 처리하는 코드:
  ```javascript
  app.command('/reminder', async ({ command, ack, say }) => {
    await ack();
    const reminderId = Date.now(); // 고유 ID 생성
    const result = await service.createReminder(command.text, command.user_id, reminderId);

    // Block 메시지 전송 (버튼 포함)
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `리마인더가 생성되었습니다: *${command.text}*\n아래 버튼을 눌러 완료하세요.`
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '완료하기'
            },
            action_id: 'remind_complete',
            value: reminderId.toString()
          }
        }
      ]
    });
  });
  ```

#### (2) Actions (액션 이벤트)
- 버튼 클릭, 드롭다운 선택 등 사용자 인터랙션이 발생하면 Slack 서버가 앱으로 요청을 보냅니다.
- 요청 데이터에는 `action_id`, 사용자 정보 등이 포함되며, 이를 기반으로 작업을 수행합니다.
- `app.action()` 메서드를 사용하여 구현됩니다.
 - 예: "완료하기" 버튼 클릭 이벤트를 처리하는 코드:
   ```javascript
   app.action('remind_complete', async ({ body, ack, say }) => {
    await ack(); // Slack에 이벤트 수신 확인
    const reminderId = body.actions[0].value; // 버튼에서 전달된 리마인더 ID 가져오기
    const result = await service.completeReminder(reminderId);
    await say(result); // 완료 메시지 전송
  });
   ```

#### (3) Block Kit (블록 메시지)
- UI 요소(버튼, 텍스트 등)를 포함한 메시지를 생성할 수 있습니다.
- 블록 메시지도 `say()`로 전달하면 됩니다.
- 블록 메시지 예제:
  ```javascript
  {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "리마인더가 생성되었습니다! 아래 버튼을 눌러 완료하세요.",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "완료하기",
          },
          action_id: "remind_complete", // 액션 ID
          value: "12345", // 전달할 데이터
        },
      },
    ],
  }
  ```
- [https://app.slack.com/block-kit-builder/](https://app.slack.com/block-kit-builder/)
- 위 링크를 통해 UI를 구성해서 복사해서 사용할 수도 있습니다.

## 3. 실행 방법
```
  npm install
  node main.js
```