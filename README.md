# 🎾 Argon Tennis (아르곤 테니스)

> **Wii Sports-inspired 3D Arcade Tennis in Web Browser**  
> 닌텐도 Wii Sports의 경쾌한 손맛을 웹 브라우저에서 그대로 재현한 3D 아케이드 테니스 게임입니다.  
> Three.js 기반의 부드러운 물리 엔진, 개성 넘치는 Mii 아바타, 웹캠 광학 흐름(Optical Flow) 및 스마트폰 모션 센서(자이로스코프/가속도계) 조작, 그리고 한국어/영문 다국어 지원을 제공합니다.

---

## 🌐 라이브 데모 (Live Demo)

- **GitHub Pages 배포 URL**: [https://djai32521.github.io/Argon_Tennis/](https://djai32521.github.io/Argon_Tennis/)

---

## ✨ 핵심 기능 (Key Features)

1. **실감나는 3D 스타디움 & 라켓 물리 (Three.js & Kinematics)**
   - 스윗 스팟(Sweet Spot) 타이밍 판정 및 궤적 역학 계산
   - 탑스핀(Topspin), 슬라이스(Slice), 로브(Lob), 스매시(Smash), 플랫(Flat) 등 다양한 구질
   - 다이내믹 카메라 (Rally, Serve, Close-up, Aerial, Instant Replay)
2. **다양한 컨트롤 인터페이스 (Multi-modal Controls)**
   - **키보드 & 마우스**: 직관적인 스윙/토스 키 및 마우스 스와이프 제스처
   - **웹캠 모션 (Webcam Motion)**: 카메라를 통해 플레이어의 손/몸 스윙을 실시간 광학 흐름 및 MediaPipe로 추적
   - **스마트폰 라켓 (Pocket Racket)**: 스마트폰 자이로/가속도 센서를 연동하여 실제 Wii 리모컨처럼 휘두르는 모션 플레이
3. **완벽한 한국어 / 영문 다국어 지원 (i18n)**
   - 기본 언어 한국어(Korean) 설정
   - 원클릭 한/영 전환 버튼 (`🌐 한국어` / `🌐 English`)
   - 게임 상태, 스코어보드, 판정 배너, 타이밍 팝업, Web Speech API 음성 안내 콜아웃까지 모두 번역 지원
4. **Wii 감성의 오디오 & 사운드 시스템**
   - Lyria 3 기반 경쾌한 스타디움 사운드트랙 (랠리, 클럽 광장, 승리 팡파레)
   - 타구감 넘치는 신디사이저 효과음 (라켓 스트링 임팩트, 공 바운드, 관중 함성)

---

## 🎮 조작 방법 (Controls)

| 키 / 입력 | 동작 (한국어) | Action (English) |
|---|---|---|
| `Space` / `Enter` | 라켓 스윙 (타이밍에 맞춰 스윙) | Racket Swing |
| `T` / `W` / `↑` | 서브 토스 (공 위로 띄우기) | Serve Toss |
| `A` / `Q` / `←` | 코스 좌측 에이밍 (크로스/역크로스) | Aim Course Left |
| `D` / `E` / `→` | 코스 우측 에이밍 | Aim Course Right |
| `1` / `2` / `3` / `4` | 구질 선택 (탑스핀 / 슬라이스 / 로브 / 스매시) | Shot Type Selection |
| `C` | 카메라 시점 순환 변경 (랠리 / 서브 / 근접 / 부감) | Cycle Camera View |
| `R` | 즉시 리플레이 (Instant Replay) | Toggle Replay |
| **마우스 드래그** | 화면을 라켓처럼 스와이프하여 스윙 방향/파워 결정 | Swipe to Swing/Toss |
| **웹캠 모션** | 웹캠 앞에서 손을 휘둘러 모션 스윙 | Motion Swing via Camera |
| **🌐 버튼** | 한국어 / 영어 언어 즉시 전환 | Toggle Language (KO/EN) |

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: Vite, React, TypeScript, Three.js, Tailwind CSS
- **Vision & Motion Tracking**: MediaPipe Hands, Canvas 2D Optical Flow (Luminance Difference & Energy Map)
- **Audio Engine**: Web Audio API (Synthesizers, Noise Buffers, Reverb), Web Speech API (Korean Voice Callout)
- **Deployment**: GitHub Pages, GitHub Actions CI/CD

---

## 🚀 로컬 실행 방법 (Local Development)

```bash
# 1. 저장소 클론
git clone https://github.com/djai32521/Argon_Tennis.git
cd Argon_Tennis

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 프로덕션 빌드
npm run build
```

---

## 📄 라이선스 (License)

MIT License
