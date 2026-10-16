// Argon Tennis - Internationalization (i18n) Engine
// Default language: Korean ('ko'), with full English ('en') support.

const STORAGE_KEY = 'argon_tennis_lang';

export const TRANSLATIONS = {
  ko: {
    // App & Header
    app_title: "아르곤 테니스 - Wii 스타일 3D 테니스",
    logo_argon: "Argon",
    logo_tennis: "테니스",
    
    // Top Scoreboard & Badges
    player_title: "플레이어 세트 획득",
    opponent_title: "상대 세트 획득",
    player_default_name: "플레이어",
    player_skill: "실력 레벨 1050",
    server_tag: "서버",
    you: "나",
    player_1: "플레이어 1",
    player_2: "플레이어 2",
    club_ai: "클럽 AI",
    matt: "맷 (챔피언)",
    
    // Opponent presence
    waiting_for_p2: "상대 플레이어 대기 중…",
    waiting_for: (name) => `${name} 대기 중…`,
    ready_to_serve: "서브 준비 완료!",
    connected_ready: (name) => `${name} 접속됨 • 서브 준비 완료!`,
    racket_ready: (name) => `${name} 라켓 준비됨 • 서브 준비 완료!`,
    
    // Banners
    banner_start: "경기 시작!",
    banner_game_point: "게임 포인트",
    banner_match_point: "매치 포인트",
    banner_break_point: "브레이크 포인트",
    banner_deuce: "듀스",
    banner_advantage: "어드밴티지",
    banner_fault: "폴트!",
    banner_double_fault: "더블 폴트!",
    banner_out: "아웃!",
    banner_net: "네트!",
    banner_winner: "위너!",
    banner_ace: "서브 에이스!",
    
    // Timing Gauge & Controls
    gauge_mode_timing: "스윙 타이밍",
    gauge_mode_toss: "서브 토스 준비",
    gauge_mode_impact: "서브 임팩트",
    gauge_mode_whiff: "헛스윙!",
    gauge_ready: "준비",
    gauge_flick: "위로 튕기기 / 스페이스",
    gauge_late: "너무 늦음",
    zone_early: "빠름 (크로스)",
    zone_sweet: "스윗 스팟",
    zone_late: "늦음 (다운더라인)",
    
    // Bottom Controls & Status
    btn_webcam: "웹캠 모션",
    btn_phone: "스마트폰 라켓",
    btn_replay: "리플레이",
    cam_mode_prefix: "시점:",
    cam_auto: "자동",
    cam_rally: "랠리",
    cam_serve: "서브",
    cam_close: "네트 근접",
    cam_aerial: "부감",
    audio_lyria_prefix: "BGM:",
    audio_muted: "음소거",
    audio_sunny_rally: "활기찬 랠리",
    audio_plaza: "클럽 광장",
    audio_fanfare: "승리 팡파레",
    pip_webcam_swing: "웹캠 스윙 감지",
    
    // Title Modal
    difficulty_casual: "캐주얼 AI",
    difficulty_pro: "프로 AI",
    difficulty_1v1: "1v1 대전",
    games_1: "1 게임",
    games_3: "3판 2선승",
    games_5: "5판 3선승",
    btn_start_match: "게임 시작",
    lang_btn_text: "한국어",
    lang_switch_tooltip: "영문으로 변경 (Switch to English)",
    
    // Keyboard instructions strip
    keyboard_help: "조작: [Space/Enter] 스윙 | [T/W/↑] 서브 토스 | [A/D 또는 방향키] 코스 조절 | [1~4] 구질 선택 (탑스핀/슬라이스/로브/스매시) | [C] 시점 | [R] 리플레이",

    // Timing popups
    timing_perfect: "완벽함!",
    timing_early: "빠름",
    timing_very_early: "너무 빠름",
    timing_late: "늦음",
    timing_very_late: "너무 늦음",
    timing_whiff: "헛스윙! • 너무 늦음",
    timing_ball_passed: "공이 지나감",
    timing_power_serve: "파워 서브!",
    timing_early_serve: "빠른 서브",
    timing_good_serve: "굿 서브",
    timing_sweet_spot_apex: "스윗스팟 정점",
    timing_low_contact: "낮은 임팩트",
    timing_service_box: "서비스 박스 안착",
    shot_topspin: "탑스핀",
    shot_power_topspin: "파워 탑스핀",
    shot_slice: "슬라이스",
    shot_lob: "로브",
    shot_smash: "스매시",
    shot_power_smash: "파워 스매시!",
    
    // Victory Modal
    victory_header: "클럽 실력 레이팅",
    victory_win: "승리!",
    victory_lose: "패배!",
    victory_final_games: (p, o) => `최종 세트 스코어: ${p} - ${o}`,
    btn_play_again: "다시 하기",
    btn_menu: "메인 메뉴",
    
    // Companion (Phone Controller) Modal
    companion_title: "📱 스마트폰 컨트롤러",
    companion_desc: "스마트폰 기본 카메라로 QR 코드를 스캔하세요",
    companion_link_text: "컨트롤러 링크 직접 열기 ↗",
    companion_back_btn: "코트로 돌아가기",
    companion_status_scan: "QR 스캔 대기",
    companion_status_court_ready: "코트 준비 완료",
    companion_status_connected: "스마트폰 연결됨 ✓",
    
    // Voice announcements
    voice_start: "게임 시작",
    voice_game_point: "게임 포인트",
    voice_break_point: "브레이크 포인트",
    voice_match_point: "매치 포인트",
    voice_game_won: "게임!",
    voice_deuce: "듀스",
    voice_ad_in: "어드밴티지 서버",
    voice_ad_out: "어드밴티지 리시버",
    voice_out: "아웃!",
    voice_net: "네트!",
    voice_nice_shot: "나이스 샷!",
    voice_power_serve: "파워 서브!",
    voice_smash: "스매시!"
  },
  en: {
    // App & Header
    app_title: "Argon Tennis - Wii Sports-inspired 3D Arcade Tennis",
    logo_argon: "Argon",
    logo_tennis: "Tennis",
    
    // Top Scoreboard & Badges
    player_title: "Player Games Won",
    opponent_title: "Opponent Games Won",
    player_default_name: "Ammaar",
    player_skill: "Skill Level 1050",
    server_tag: "Server",
    you: "You",
    player_1: "Player 1",
    player_2: "Player 2",
    club_ai: "Club AI",
    matt: "Matt",
    
    // Opponent presence
    waiting_for_p2: "Waiting for Player 2…",
    waiting_for: (name) => `Waiting for ${name}…`,
    ready_to_serve: "Ready to Serve!",
    connected_ready: (name) => `${name} Connected • Ready to Serve!`,
    racket_ready: (name) => `${name}'s Racket Ready • Ready to Serve!`,
    
    // Banners
    banner_start: "Start",
    banner_game_point: "Game Point",
    banner_match_point: "Match Point",
    banner_break_point: "Break Point",
    banner_deuce: "Deuce",
    banner_advantage: "Advantage",
    banner_fault: "Fault",
    banner_double_fault: "Double Fault",
    banner_out: "Out!",
    banner_net: "Net!",
    banner_winner: "Winner!",
    banner_ace: "Ace!",
    
    // Timing Gauge & Controls
    gauge_mode_timing: "SWING TIMING",
    gauge_mode_toss: "SERVE TOSS",
    gauge_mode_impact: "SERVE IMPACT",
    gauge_mode_whiff: "SWING WHIFF!",
    gauge_ready: "READY",
    gauge_flick: "UPWARD FLICK / SPACE",
    gauge_late: "LATE",
    zone_early: "EARLY (Cross)",
    zone_sweet: "SWEET SPOT",
    zone_late: "LATE (Line)",
    
    // Bottom Controls & Status
    btn_webcam: "Webcam Motion",
    btn_phone: "Pocket Racket",
    btn_replay: "Replay",
    cam_mode_prefix: "Cam:",
    cam_auto: "Auto",
    cam_rally: "Rally",
    cam_serve: "Serve",
    cam_close: "Net Close",
    cam_aerial: "Aerial",
    audio_lyria_prefix: "Lyria:",
    audio_muted: "Muted",
    audio_sunny_rally: "Sunny Rally",
    audio_plaza: "Club Breeze",
    audio_fanfare: "Grand Slam",
    pip_webcam_swing: "Webcam Swing",
    
    // Title Modal
    difficulty_casual: "Casual AI",
    difficulty_pro: "Pro AI",
    difficulty_1v1: "1v1 Match",
    games_1: "1 Game",
    games_3: "Best of 3",
    games_5: "Best of 5",
    btn_start_match: "Start Match",
    lang_btn_text: "English",
    lang_switch_tooltip: "한국어로 변경 (Switch to Korean)",
    
    // Keyboard instructions strip
    keyboard_help: "Controls: [Space/Enter] Swing | [T/W/↑] Serve Toss | [A/D or Arrows] Direction | [1~4] Shots (Topspin/Slice/Lob/Smash) | [C] Camera | [R] Replay",

    // Timing popups
    timing_perfect: "PERFECT",
    timing_early: "EARLY",
    timing_very_early: "VERY EARLY",
    timing_late: "LATE",
    timing_very_late: "VERY LATE",
    timing_whiff: "TOO LATE! • WHIFF",
    timing_ball_passed: "BALL PASSED",
    timing_power_serve: "POWER SERVE!",
    timing_early_serve: "EARLY SERVE",
    timing_good_serve: "GOOD SERVE",
    timing_sweet_spot_apex: "SWEET SPOT APEX",
    timing_low_contact: "LOW CONTACT",
    timing_service_box: "SERVICE BOX",
    shot_topspin: "TOPSPIN",
    shot_power_topspin: "POWER TOPSPIN",
    shot_slice: "SLICE",
    shot_lob: "LOB",
    shot_smash: "SMASH",
    shot_power_smash: "POWER SMASH!",
    
    // Victory Modal
    victory_header: "Club Skill Rating",
    victory_win: "YOU WIN!",
    victory_lose: "TRY AGAIN!",
    victory_final_games: (p, o) => `Final Games: ${p} - ${o}`,
    btn_play_again: "Play again",
    btn_menu: "Menu",
    
    // Companion (Phone Controller) Modal
    companion_title: "📱 Phone Controller",
    companion_desc: "Scan with your phone camera",
    companion_link_text: "Open controller link ↗",
    companion_back_btn: "Back to Court",
    companion_status_scan: "Scan QR",
    companion_status_court_ready: "Court Ready",
    companion_status_connected: "Connected ✓",
    
    // Voice announcements
    voice_start: "Start",
    voice_game_point: "Game Point",
    voice_break_point: "Break Point",
    voice_match_point: "Match Point",
    voice_game_won: "Game Won",
    voice_deuce: "Deuce",
    voice_ad_in: "Ad In",
    voice_ad_out: "Ad Out",
    voice_out: "Out",
    voice_net: "Net",
    voice_nice_shot: "Nice Shot",
    voice_power_serve: "Power Serve",
    voice_smash: "Smash"
  }
};

let currentLang = 'ko';

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'ko') {
    currentLang = saved;
  } else {
    // Default is Korean as requested
    currentLang = 'ko';
    localStorage.setItem(STORAGE_KEY, 'ko');
  }
} catch {
  currentLang = 'ko';
}

const listeners = new Set();

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  const next = lang === 'en' ? 'en' : 'ko';
  if (currentLang !== next) {
    currentLang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    listeners.forEach(fn => {
      try { fn(next); } catch (e) { console.error(e); }
    });
    updateDomTexts();
  }
}

export function toggleLang() {
  setLang(currentLang === 'ko' ? 'en' : 'ko');
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ko;
  const val = dict[key] ?? TRANSLATIONS.en[key] ?? key;
  if (typeof val === 'function') {
    return val(...args);
  }
  return val;
}

export function updateDomTexts() {
  document.documentElement.lang = currentLang;
  
  // Title
  document.title = t('app_title');
  
  // Data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // Specific elements updates
  const langLabel = document.getElementById('lang-current-label');
  if (langLabel) {
    langLabel.textContent = currentLang === 'ko' ? '한국어' : 'English';
  }
  
  const titleLangLabel = document.getElementById('title-lang-label');
  if (titleLangLabel) {
    titleLangLabel.textContent = currentLang === 'ko' ? '한국어' : 'English';
  }

  // Language button tooltips
  const langBtns = document.querySelectorAll('.btn-lang-toggle');
  langBtns.forEach(btn => {
    btn.setAttribute('title', t('lang_switch_tooltip'));
  });

  // Nameplate info
  const plateName = document.querySelector('.plate-name');
  if (plateName) {
    plateName.textContent = t('player_default_name');
  }
  const plateSkill = document.querySelector('.plate-skill');
  if (plateSkill) {
    plateSkill.textContent = t('player_skill');
  }

  // Server tag
  const serverTag = document.querySelector('.server-tag-text');
  if (serverTag) {
    serverTag.textContent = t('server_tag');
  }

  // Timing zones
  const zoneEarly = document.querySelector('.zone-early');
  if (zoneEarly) zoneEarly.textContent = t('zone_early');
  const zoneSweet = document.querySelector('.zone-sweet');
  if (zoneSweet) zoneSweet.textContent = t('zone_sweet');
  const zoneLate = document.querySelector('.zone-late');
  if (zoneLate) zoneLate.textContent = t('zone_late');

  // Mini court marker tags
  const youTag = document.querySelector('.you-tag');
  if (youTag) youTag.textContent = t('you');
  
  // Replay label
  const replayLabel = document.querySelector('.replay-label');
  if (replayLabel) replayLabel.textContent = t('btn_replay');

  // Controls bar / help text
  const helpText = document.getElementById('keyboard-help-strip');
  if (helpText) helpText.textContent = t('keyboard_help');
}

// Run update on module load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateDomTexts());
  } else {
    setTimeout(updateDomTexts, 0);
  }
}
