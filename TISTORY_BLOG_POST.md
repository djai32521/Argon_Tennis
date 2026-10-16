# [개발기] Google AI Studio로 부활시킨 전설의 Wii Sports 테니스! 🎾 브라우저 3D 웹게임 'Argon Tennis' 제작기 (Three.js, 웹캠 모션, 폰 컨트롤러, GitHub Pages 배포)

> **"어린 시절 거실에서 온 가족이 TV 앞을 뛰어다니며 즐기던 닌텐도 Wii Sports 테니스의 그 짜릿한 손맛, 이제 크롬 브라우저 하나만으로 설치 없이 즐길 수 있을까?"**

안녕하세요! 오늘은 **Google AI Studio**를 적극 활용하여 최신 웹 기술(Three.js, Web Audio, MediaPipe, Optical Flow)을 총동원해 개발한 3D 아케이드 테니스 웹게임, **Argon Tennis(아르곤 테니스)**의 전체 개발 과정과 핵심 아키텍처, 코드 구현 비하인드를 상세하게 공유하고자 합니다.

단순한 키보드 조작 게임에 그치지 않고, **웹캠을 이용한 핸드 트래킹 스윙**, **스마트폰 자이로 센서를 연동한 포켓 라켓(Pocket Racket)**, **정교한 스윗스팟 타격 판정과 공 궤적 물리**, 그리고 **한국어/영문 다국어 i18n 시스템**까지 풀스택으로 완성하여 **GitHub Pages**에 배포한 과정을 길고 생생하게 정리했습니다.

---

## 📌 목차 (Table of Contents)
1. **프로젝트 기획 및 목표: 왜 브라우저 3D 테니스인가?**
2. **Google AI Studio를 활용한 개발 워크플로우 (Vibe Coding)**
3. **전체 시스템 아키텍처 (System Architecture)**
4. **핵심 구현 1: Three.js 기반 3D 경기장 & 라켓 키네마틱스 (Kinematics)**
5. **핵심 구현 2: 웹캠 광학 흐름(Optical Flow) & 제스처 스윙 인식**
6. **핵심 구현 3: 스마트폰 센서 연동 (Pocket Racket) 시스템**
7. **핵심 구현 4: 한국어 기본화 & 실시간 다국어(i18n) + 음성 해설 시스템**
8. **GitHub Pages 원클릭 배포 & 트러블슈팅**
9. **플레이 링크 & 오픈소스 GitHub 저장소**
10. **개발을 마치며: AI와 함께 만든 웹 게임의 미래**

---

## 1. 프로젝트 기획 및 목표: 왜 브라우저 3D 테니스인가?

2006년 출시되어 전 세계를 강타했던 *Wii Sports*. 그중에서도 **테니스**는 리모컨을 실제 라켓처럼 휘두르는 직관적인 플레이 덕분에 남녀노소 누구나 몰입할 수 있었던 최고의 명작이었습니다.

하지만 2020년대 오늘날, 우리는 대부분의 업무와 여가를 웹 브라우저에서 보냅니다.
**"별도의 앱 설치나 콘솔 장비 없이, URL 링크 하나만 누르면 누구나 즉시 웹 브라우저에서 그 경쾌한 아케이드 테니스를 즐길 수 없을까?"** 하는 생각이 이 프로젝트의 시작점이었습니다.

### 🎯 핵심 목표
- **Zero Install, Infinite Access**: 크롬/사파리/엣지 등 웹 표준 브라우저에서 즉각 구동
- **60FPS+ 부드러운 3D 렌더링**: Three.js 경량 지오메트리 & 텍스처 최적화
- **실감 나는 라켓 타구감**: 탑스핀, 슬라이스, 로브, 스매시 등 구질별 궤적과 스윗스팟 판정
- **멀티모달 인터랙션**: 키보드/마우스뿐 아니라 **웹캠 모션 제스처** 및 **스마트폰 모션 컨트롤** 지원
- **글로벌 사용자 친화성**: 한국어를 기본 언어로 채택하고 영문 전환을 즉시 지원하는 i18n 엔진 탑재

---

## 2. Google AI Studio를 활용한 개발 워크플로우 (Vibe Coding)

이번 프로젝트는 **Google AI Studio**의 고성능 멀티모달 LLM(Gemini)을 브레인으로 삼아, 기획부터 3D 수학 계산, 셰이더/파티클 이펙트, 모션 센싱 알고리즘 구현까지 전 과정을 페어 프로그래밍 방식으로 진행했습니다.

```
+-------------------------------------------------------------------+
|                     Google AI Studio Prompt Engine                |
|  - 물리 법칙 및 궤적 방정식 설계                                 |
|  - Three.js 씬 그래프 및 GLTF 로더 파이프라인                     |
|  - Optical Flow & MediaPipe 모션 벡터 추출 알고리즘 구현          |
|  - 실시간 i18n & Web Audio 사운드 신디사이징 로직 조율            |
+-------------------------------------------------------------------+
                                  │
                                  ▼
+-------------------------------------------------------------------+
|               Vite + TypeScript + React 개발 환경                 |
|  - hot-reload & 빠른 빌드 파이프라인                              |
|  - 모듈화된 엔진 아키텍처 (Game, Audio, Motion, Kinematics, HUD)  |
+-------------------------------------------------------------------+
```

### 💡 AI Studio 활용 꿀팁
1. **물리 모델링 세분화**: 복잡한 테니스 공 바운드 탄성(Restitution), 마찰력(Friction), 마그누스 효과(Magnus Effect)에 따른 공의 낙하지점 예측 공식을 AI에게 단계별로 수식화하도록 요청했습니다.
2. **코드 모듈 분리 원칙**: 3D 렌더링(`game_engine.js`), 라켓 애니메이션(`racket_kinematics.js`), 카메라/사운드(`audio_engine.js`), UI 오버레이(`hud_ui.js`), 다국어(`i18n.js`)를 명확한 단일 책임 원칙(SRP)으로 설계하여 유지보수성을 극대화했습니다.

---

## 3. 전체 시스템 아키텍처 (System Architecture)

Argon Tennis는 웹 프론트엔드의 성능 한계를 넘기 위해 고성능 파이프라인으로 구성되어 있습니다:

```
┌─────────────────────────────────────────────────────────────────┐
│                          Argon Tennis                           │
├─────────────────┬───────────────────┬───────────────────────────┤
│    렌더링 & 물리 │    입력 컨트롤     │       오디오 & UI         │
├─────────────────┼───────────────────┼───────────────────────────┤
│ • Three.js 씬   │ • 키보드 / 마우스 │ • Web Audio 신디사이저     │
│ • GLTF 3D 모델  │ • 웹캠 OpticalFlow│ • Lyria 3 배경음악 엔진   │
│ • 공 궤적 계산  │ • MediaPipe Hands │ • Web Speech API 한글 음성│
│ • Mii 아바타 리깅│ • 스마트폰 자이로 │ • Wii 스타일 HUD & i18n   │
└─────────────────┴───────────────────┴───────────────────────────┘
```

---

## 4. 핵심 구현 1: Three.js 기반 3D 경기장 & 라켓 키네마틱스

테니스 게임에서 가장 중요한 것은 **"공을 라켓 면의 중심(스윗 스팟)에 맞춰 시원하게 때리는 쾌감"**입니다. 이를 위해 공의 Z 위치와 라켓 스윙 타이밍을 정밀하게 계산하는 키네마틱스 시스템을 구축했습니다.

### 📝 라켓 타격 판정 및 공 발사 궤적 알고리즘 예시 (`game_engine.js` 발췌)

```javascript
// 스윙 타이밍과 임팩트 위치에 따른 구질 및 속도 계산
_executeRallyShot(actor, targetPos, swingEvt) {
  const isSweetSpot = Math.abs(swingEvt.timingOffset) < 0.08;
  const shotType = (swingEvt.shotType || "topspin").toUpperCase();
  
  // 기본 속도 및 발사 각도 계산
  let flightSpeed = 16.5 * (swingEvt.speed || 1.15);
  let flightDuration = 0.72;
  let arcHeight = 1.2;
  let topspinFactor = 15;
  let sidespinFactor = (swingEvt.dirX || 0) * -8;

  switch(shotType) {
    case "SMASH":
      flightSpeed = 24.0;
      flightDuration = 0.48;
      arcHeight = 0.4; // 낮고 강하게 내리꽂음
      topspinFactor = 28;
      break;
    case "SLICE":
      flightSpeed = 13.5;
      flightDuration = 0.88;
      arcHeight = 0.9;
      topspinFactor = -12; // 백스핀 적용
      break;
    case "LOB":
      flightSpeed = 11.2;
      flightDuration = 1.35;
      arcHeight = 3.6; // 높은 포물선 궤적
      topspinFactor = 5;
      break;
    default: // TOPSPIN
      flightSpeed = 18.2;
      flightDuration = 0.68;
      arcHeight = 1.3;
      topspinFactor = 22;
      break;
  }

  // 물리 궤적 시드(Seed) 생성 및 파티클 버스트 트리거
  this._launchBallToTarget(this.ball.pos, targetPos, flightDuration, {
    topspin: topspinFactor,
    sidespin: sidespinFactor,
    height: arcHeight
  });

  // 라켓 타격 리코일(반동) 및 카메라 트라우마 효과
  this.racketKinematics.triggerImpactRecoil(actor, isSweetSpot ? 1.4 : 0.9);
  if (isSweetSpot) {
    this.cameraTrauma = 0.28; // 화면 진동 연출
    this.swingVfx.spawnImpactBurst(this.ball.pos, { shotType, isPower: true, count: 20 });
  }
}
```

이 코드를 통해 플레이어가 언제 스윙을 시작했느냐에 따라 **크로스(대각선)** 코스로 깊게 꺾이거나, **다운더라인(직선)** 코스로 날카롭게 꽂히는 실제 테니스의 원리가 그대로 구현되었습니다.

---

## 5. 핵심 구현 2: 웹캠 광학 흐름(Optical Flow) & 제스처 스윙

별도의 콘트롤러가 없어도 노트북이나 웹캠만 있으면 모션 플레이가 가능하도록 **실시간 영상 분석 파이프라인**을 내장했습니다.

1. **저해상도 오프스크린 캔버스(64x48) 추출**: 프레임 레이트 저하를 방지하기 위해 그레이스케일 루미넌스(Luminance) 맵을 초고속 다운샘플링합니다.
2. **프레임 간 밝기 차이(Optical Motion Energy) 계산**: 이전 프레임과 현재 프레임의 픽셀 변화량을 비교해 모션 에너지가 집중된 중심점(Centroid)을 계산합니다.
3. **가속도 및 벡터 방향성 판정**: 일정 임계치 이상의 순간 속도(Velocity)가 우측에서 좌측으로 이동하면 **포핸드**, 좌측에서 우측으로 이동하면 **백핸드**, 위로 솟구치면 **서브 토스**로 변환합니다.

### 📝 웹캠 모션 벡터 추출 코드 (`motion_controls.js` 발췌)

```javascript
_processWebcamFrame() {
  if (!this.webcamActive || !this.videoElem) return;
  const now = performance.now();
  const w = this.flowWidth, h = this.flowHeight;
  
  // 좌우 반전 거울 모드로 캔버스에 영상 렌더링
  this.offscreenCtx.save();
  this.offscreenCtx.scale(-1, 1);
  this.offscreenCtx.drawImage(this.videoElem, -w, 0, w, h);
  this.offscreenCtx.restore();

  const imgData = this.offscreenCtx.getImageData(0, 0, w, h).data;
  let totalMotion = 0, weightedX = 0, weightedY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      // 루미넌스 계산 (인간의 시각 감도 반영 공식)
      const luma = (imgData[idx] * 0.299 + imgData[idx+1] * 0.587 + imgData[idx+2] * 0.114) / 255;
      const prev = this.prevLuma[y * w + x];
      const diff = Math.abs(luma - prev);

      if (diff > 0.12) { // 유의미한 움직임 필터링
        totalMotion += diff;
        weightedX += (x / w) * diff;
        weightedY += (y / h) * diff;
      }
      this.prevLuma[y * w + x] = luma;
    }
  }

  // 모션 에너지가 임계값을 넘을 때 스윙 이벤트 방출
  if (totalMotion > 4.2) {
    const cx = weightedX / totalMotion;
    const cy = weightedY / totalMotion;
    this._evaluateSwingTrajectory(cx, cy, now);
  }
}
```

---

## 6. 핵심 구현 3: 스마트폰 센서 연동 (Pocket Racket)

스마트폰의 크롬이나 사파리 브라우저에서 `DeviceOrientationEvent`와 `DeviceMotionEvent`를 사용하면, **스마트폰이 영락없는 Wii 리모컨**으로 변신합니다!

- PC 화면에 생성된 전용 QR 코드를 스마트폰 카메라로 스캔
- 휴대폰에서 스윙을 휘두르면 가속도 벡터와 회전 각도(Pitch, Roll, Yaw)가 50ms 주기로 서버 릴레이를 통해 동기화
- 타격 순간 스마트폰의 **진동(Haptic Feedback API)** 모터가 작동하여 실제 공을 때린 듯한 손맛 선사

---

## 7. 핵심 구현 4: 한국어 기본화 & 실시간 다국어(i18n) + 음성 해설

국내 게이머들이 언어의 장벽 없이 직관적으로 플레이할 수 있도록 **기본 언어를 한국어(Korean)**로 설정하고, 상단 및 하단 독에서 원클릭으로 영문과 상호 전환할 수 있는 반응형 i18n 엔진을 구현했습니다.

### 📝 i18n 엔진 구조 (`src/i18n.js` 발췌)

```javascript
export const TRANSLATIONS = {
  ko: {
    app_title: "아르곤 테니스 - Wii 스타일 3D 테니스",
    banner_start: "경기 시작!",
    banner_game_point: "게임 포인트",
    banner_match_point: "매치 포인트",
    banner_deuce: "듀스",
    banner_fault: "폴트!",
    timing_perfect: "완벽함!",
    timing_early: "빠름 (크로스)",
    timing_late: "늦음 (다운더라인)",
    gauge_mode_timing: "스윙 타이밍",
    difficulty_casual: "캐주얼 AI",
    difficulty_pro: "프로 AI",
    difficulty_1v1: "1v1 대전",
    btn_start_match: "게임 시작",
    keyboard_help: "조작: [Space/Enter] 스윙 | [T/W/↑] 서브 토스 | [A/D 또는 방향키] 코스 조절 | [1~4] 구질 선택 | [C] 시점 | [R] 리플레이"
  },
  en: {
    app_title: "Argon Tennis - Wii Sports-inspired 3D Arcade Tennis",
    banner_start: "Start",
    banner_game_point: "Game Point",
    ...
  }
};
```

### 🎙️ Web Speech API 기반 실시간 한국어 심판 음성
게임 포인트나 듀스, 폴트 상황에서 영어 녹음 파일 대신 브라우저의 고품질 한국어 음성 합성 엔진(`SpeechSynthesisUtterance`)이 **"게임 포인트!", "듀스", "서브 에이스!"**를 실시간으로 또렷하게 외쳐줍니다.

```javascript
// 한국어 모드일 때 실시간 한국어 음성 콜아웃
if (getLang() === 'ko' && 'speechSynthesis' in window) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(koreanText);
  utterance.lang = "ko-KR";
  utterance.rate = 1.08;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}
```

---

## 8. GitHub Pages 원클릭 배포 & 트러블슈팅

### 🛠️ GitHub Pages 배포 시 맞닥뜨린 문제와 해결책
1. **서브 디렉터리 경로 문제 (`404 Asset Not Found`)**
   - GitHub Pages는 보통 `https://<username>.github.io/<repo-name>/` 형태의 서브 패스에서 서비스됩니다.
   - Vite의 기본 `base: '/'` 설정으로 빌드하면 자바스크립트와 CSS 경로가 루트(`/assets/...`)를 찾아 404가 발생합니다.
   - **해결책**: `vite.config.ts`에 `base: './'`(상대 경로)를 지정하여 어느 경로에 호스팅되더라도 완벽하게 리소스를 불러오도록 구성했습니다.

2. **정적 3D 모델 및 MediaPipe WASM 바이너리 번들링**
   - 빌드 스크립트(`scripts/download-assets.mjs`)를 패키지 빌드 라이프사이클(`npm run build`)에 사전 연동하여 대용량 `.glb` 모델과 MediaPipe WASM 파일이 `public/assets/`에 정확히 포함되도록 자동화했습니다.

3. **GitHub Actions CI/CD 워크플로우 구성**
   - `.github/workflows/deploy.yml`을 추가하여 `main` 브랜치에 코드가 푸시되면 자동으로 빌드 후 GitHub Pages 환경으로 배포되도록 구축했습니다.

---

## 9. 플레이 링크 & 오픈소스 GitHub 저장소

모든 코드는 GitHub에 100% 오픈소스로 공개되어 있으며, 지금 바로 브라우저에서 직접 플레이해 보실 수 있습니다!

- 🎮 **라이브 플레이 웹사이트 (GitHub Pages)**:  
  👉 **[https://djai32521.github.io/Argon_Tennis/](https://djai32521.github.io/Argon_Tennis/)**

- 💻 **공식 GitHub 오픈소스 저장소**:  
  👉 **[https://github.com/djai32521/Argon_Tennis](https://github.com/djai32521/Argon_Tennis)**

---

## 10. 개발을 마치며: AI와 함께 만든 웹 게임의 미래

과거에는 복잡한 3D 렌더링 엔진, 물리 시뮬레이션, 컴퓨터 비전 제스처 추적, 오디오 신디사이징을 하나의 웹앱으로 완성하려면 수개월의 시간과 다수의 전문 엔지니어가 필요했습니다.

하지만 이번에 **Google AI Studio**를 활용하면서, 복잡한 3차원 벡터 연산이나 브라우저 제약 조건(HTTPS, 미디어 권한, 오디오 컨텍스트 언락)을 AI와 실시간으로 논의하며 단 하루 만에 프로덕션 수준의 완성도를 끌어낼 수 있었습니다.

추억 속의 Wii Sports 감성을 현대적인 웹 브라우저에서 다시 한번 느껴보고 싶으시다면, 지금 바로 라켓을 쥐고(스페이스바를 누르거나 손을 흔들어) 첫 서브를 넣어보세요! 🎾🔥

---
*글이 유익하셨다면 공감(❤️)과 댓글, 그리고 GitHub 저장소의 Star(⭐) 한 번씩 부탁드립니다! 프로젝트에 관한 질문이나 개선 아이디어는 언제든 댓글로 남겨주세요.*
