import { renderAllHudMiiAvatars as renderAllMii, renderMiiAvatar as drawMii } from "./mii_avatars.js";
import { t, getLang, onLangChange } from "./i18n.js";

const BANNER_TRANSLATIONS = {
  "start": "banner_start",
  "game point": "banner_game_point",
  "match point": "banner_match_point",
  "break point": "banner_break_point",
  "deuce": "banner_deuce",
  "advantage": "banner_advantage",
  "fault": "banner_fault",
  "double fault": "banner_double_fault",
  "out": "banner_out",
  "out!": "banner_out",
  "net": "banner_net",
  "net!": "banner_net",
  "winner": "banner_winner",
  "winner!": "banner_winner",
  "ace": "banner_ace",
  "ace!": "banner_ace"
};

const TIMING_TRANSLATIONS = {
  "perfect": "timing_perfect",
  "perfect!": "timing_perfect",
  "early": "timing_early",
  "very early": "timing_very_early",
  "late": "timing_late",
  "very late": "timing_very_late",
  "too late! • whiff": "timing_whiff",
  "power serve!": "timing_power_serve",
  "early serve": "timing_early_serve",
  "good serve": "timing_good_serve"
};

export class HudUI {
  constructor(callbacks = {}) {
    this.callbacks = callbacks;
    this.bannerTimer = null;
    this.timingPopupTimer = null;
    this.skillHistory = [980, 1005, 1030, 1065, 1120];
    this.selectedGamesToWin = 2;
    this.selectedInputMode = "mouse";
    this.selectedDifficulty = "casual";
    this.currentRoomId = "default";
    this.currentTunnelUrl = "https://argon-tennis-sandbox-170440.uc.r.appspot.com";

    // Cached elements
    this.elTitleModal = document.getElementById("title-modal");
    this.elCompanionModal = document.getElementById("companion-modal");
    this.elVictoryModal = document.getElementById("victory-modal");
    this.elScoreCenter = document.getElementById("score-center-display");
    this.elScorePlayer = document.getElementById("score-player-text");
    this.elScoreSep = document.getElementById("score-separator");
    this.elScoreOpponent = document.getElementById("score-opponent-text");
    this.elGamesPlayer = document.getElementById("games-pill-player");
    this.elGamesOpponent = document.getElementById("games-pill-opponent");
    this.elServerTag = document.getElementById("server-tag");
    this.elPlayerNameplate = document.getElementById("player-nameplate");
    this.elTimingPopup = document.getElementById("timing-popup");
    this.elTimingGrade = document.getElementById("timing-popup-grade");
    this.elTimingDetail = document.getElementById("timing-popup-detail");
    this.elBannerLayer = document.getElementById("center-banner-layer");
    this.elBannerText = document.getElementById("center-banner-text");
    this.elBannerSub = document.getElementById("center-banner-sub");
    this.elReplayBadge = document.getElementById("replay-badge");
    this.elTimingCursor = document.getElementById("timing-cursor");
    this.elGaugeModeTitle = document.getElementById("gauge-mode-title");
    this.elGaugeSpeedReadout = document.getElementById("gauge-speed-readout");
    this.elAudioDot = document.getElementById("audio-status-dot");
    this.elAudioLabel = document.getElementById("audio-track-label");
    this.elCameraLabel = document.getElementById("camera-mode-label");
    this.elWebcamPip = document.getElementById("webcam-pip-card");
    this.elWebcamDot = document.getElementById("webcam-status-dot");
    this.elPhoneDot = document.getElementById("phone-status-dot");
    this.elPhoneLabel = document.getElementById("phone-status-label");
    this.elOpponentPresencePill = document.getElementById("opponent-presence-pill");
    this.elOpponentPresenceText = document.getElementById("opponent-presence-text");

    this._lastRoomStatus = {};
    this._lastOtherReady = false;
    this._justJoinedTimer = null;
    this._lastRawBanner = "";
    this._lastRawBannerStyle = "style-gold";

    this._renderAllMiiPortraits();
    this._bindEvents();
    this._initUrlParamsState();

    onLangChange(() => {
      this._onLanguageChanged();
    });
  }

  _onLanguageChanged() {
    this._updateDifficultyLabels();
    this.updateOpponentPresence(this._lastRoomStatus || {});
    if (this.elServerTag) {
      const txt = this.elServerTag.querySelector(".server-tag-text");
      if (txt) txt.textContent = t("server_tag");
    }
    if (this.elPlayerNameplate) {
      const name = this.elPlayerNameplate.querySelector(".plate-name");
      if (name) name.textContent = t("player_default_name");
      const skill = this.elPlayerNameplate.querySelector(".plate-skill");
      if (skill) skill.textContent = t("player_skill");
    }
    if (this._lastRawBanner && !this.elBannerLayer?.classList.contains("hidden")) {
      this.showCenterBanner(this._lastRawBanner, { style: this._lastRawBannerStyle, durationMs: 0, persistent: true });
    }
  }

  _renderAllMiiPortraits() {
    renderAllMii();
  }

  _drawMiiFace(canvas, opts = {}) {
    drawMii(canvas, opts.characterId || canvas?.id || "player1", opts);
  }

  _initUrlParamsState() {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") || "").trim().toUpperCase();
    const role = (params.get("role") || "p1").trim().toLowerCase() === "p2" ? "p2" : "p1";
    const mode = (params.get("mode") || params.get("difficulty") || "").toLowerCase();

    this.playerRole = role;

    if (room && room !== "DEFAULT") {
      this.currentRoomId = room;
      this._setDifficultySelection("1v1", { notify: false });
    } else if (["casual", "pro", "1v1"].includes(mode)) {
      this._setDifficultySelection(mode, { notify: false });
    }

    if (role === "p2") {
      const youTag = document.querySelector(".you-tag");
      if (youTag) youTag.textContent = t("player_1");
      const oppLabel = document.getElementById("setup-opponent-label");
      if (oppLabel) oppLabel.textContent = t("you");
    }

    this.updateMultiplayerRoomInfo({
      roomId: this.currentRoomId,
      tunnelUrl: this.currentTunnelUrl,
      role: this.playerRole
    });
  }

  _updateDifficultyLabels() {
    const oppLabel = document.getElementById("setup-opponent-label");
    if (oppLabel && this.playerRole !== "p2") {
      if (this.selectedDifficulty === "1v1") {
        oppLabel.textContent = t("player_2");
      } else if (this.selectedDifficulty === "pro") {
        oppLabel.textContent = t("matt");
      } else {
        oppLabel.textContent = t("club_ai");
      }
    }
  }

  _setDifficultySelection(diff, { notify = true } = {}) {
    const valid = ["casual", "pro", "1v1"].includes(diff) ? diff : "casual";
    this.selectedDifficulty = valid;

    document.querySelectorAll("#difficulty-mode-group .wii-green-choice").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.difficulty === valid);
    });

    const matchLenSec = document.getElementById("match-length-section");
    if (valid === "1v1") {
      if (matchLenSec) matchLenSec.classList.add("hidden");
      this.selectedGamesToWin = 1;
      this.configureGameBubbles(1);
      if (notify && this.callbacks.onSelectMatchLength) {
        this.callbacks.onSelectMatchLength(1);
      }
    } else {
      if (matchLenSec) matchLenSec.classList.remove("hidden");
      const selBtn = document.querySelector("#match-length-group .wii-green-choice.selected");
      const games = parseInt(selBtn?.dataset?.games || "3", 10);
      this.selectedGamesToWin = Math.ceil(games / 2);
      this.configureGameBubbles(this.selectedGamesToWin);
      if (notify && this.callbacks.onSelectMatchLength) {
        this.callbacks.onSelectMatchLength(this.selectedGamesToWin);
      }
    }

    this._updateDifficultyLabels();
    this.updateOpponentPresence(this._lastRoomStatus || {});

    if (notify && this.callbacks.onSelectDifficulty) {
      this.callbacks.onSelectDifficulty(valid);
    }
  }

  _bindEvents() {
    document.querySelectorAll("#difficulty-mode-group .wii-green-choice").forEach(btn => {
      btn.addEventListener("click", () => {
        const diff = btn.dataset.difficulty || "casual";
        this._setDifficultySelection(diff, { notify: true });
      });
    });

    const lenBtns = document.querySelectorAll("#match-length-group .wii-green-choice");
    lenBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        lenBtns.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        const games = parseInt(btn.dataset.games || "3", 10);
        this.selectedGamesToWin = Math.ceil(games / 2);
        this.configureGameBubbles(this.selectedGamesToWin);
        if (this.callbacks.onSelectMatchLength) {
          this.callbacks.onSelectMatchLength(this.selectedGamesToWin);
        }
      });
    });

    const startBtn = document.getElementById("btn-start-match");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        this.hideTitleModal();
        if (this.callbacks.onStartMatch) {
          this.callbacks.onStartMatch({
            gamesToWin: this.selectedGamesToWin,
            inputMode: this.selectedInputMode,
            difficulty: this.selectedDifficulty
          });
        }
      });
    }

    const audioBtn = document.getElementById("btn-audio-toggle");
    if (audioBtn) {
      audioBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.callbacks.onToggleAudio) this.callbacks.onToggleAudio();
      });
    }

    const camBtn = document.getElementById("btn-camera-cycle");
    if (camBtn) {
      camBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.callbacks.onCycleCamera) this.callbacks.onCycleCamera();
      });
    }

    const replayBtn = document.getElementById("btn-replay-trigger");
    if (replayBtn) {
      replayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.callbacks.onToggleReplay) this.callbacks.onToggleReplay();
      });
    }

    const camToggleBtn = document.getElementById("btn-webcam-toggle");
    if (camToggleBtn) {
      camToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.callbacks.onToggleWebcam) this.callbacks.onToggleWebcam();
      });
    }

    const phoneBtn = document.getElementById("btn-phone-racket");
    if (phoneBtn) {
      phoneBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openMultiplayerModal();
      });
    }

    const closeCompanion = document.getElementById("btn-close-companion");
    if (closeCompanion) {
      closeCompanion.addEventListener("click", () => {
        if (this.elCompanionModal) this.elCompanionModal.classList.add("hidden");
      });
    }

    const playAgainBtn = document.getElementById("btn-play-again");
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        this.hideVictoryModal();
        if (this.callbacks.onPlayAgain) this.callbacks.onPlayAgain();
      });
    }

    const returnTitleBtn = document.getElementById("btn-return-title");
    if (returnTitleBtn) {
      returnTitleBtn.addEventListener("click", () => {
        this.hideVictoryModal();
        this.showTitleModal();
      });
    }
  }

  async openMultiplayerModal() {
    if (this.elCompanionModal) {
      this.updateMultiplayerRoomInfo({ roomId: this.currentRoomId, tunnelUrl: this.currentTunnelUrl });
      this.elCompanionModal.classList.remove("hidden");
    }
  }

  hideTitleModal() {
    document.documentElement.classList.add("autoplay-mode");
    if (this.elTitleModal) {
      this.elTitleModal.classList.add("hidden");
      this.elTitleModal.style.display = "none";
    }
  }

  showTitleModal() {
    document.documentElement.classList.remove("autoplay-mode");
    if (this.elTitleModal) {
      this.elTitleModal.classList.remove("hidden");
      this.elTitleModal.style.display = "flex";
    }
  }

  hideVictoryModal() {
    if (this.elVictoryModal) this.elVictoryModal.classList.add("hidden");
  }

  showVictoryModal({ playerWon = false, playerGames = 0, opponentGames = 0 }) {
    if (!this.elVictoryModal) return;

    const banner = document.getElementById("victory-result-banner");
    const score = document.getElementById("victory-match-score");
    const ratingVal = document.getElementById("skill-rating-value");
    const playerName = document.getElementById("skill-player-name");

    if (banner) {
      banner.textContent = playerWon ? t("victory_win") : t("victory_lose");
      banner.style.color = playerWon ? "#ffea28" : "#9ad4ff";
    }

    if (score) {
      score.textContent = t("victory_final_games", playerGames, opponentGames);
    }

    const newRating = playerWon ? 1145 : 1020;
    if (ratingVal) ratingVal.textContent = String(newRating);
    if (playerName) {
      const pName = t("player_default_name");
      playerName.textContent = `${pName} (${playerWon ? '+120' : '-30'})`;
    }

    this._drawSkillGraph(playerWon);
    this.elVictoryModal.classList.remove("hidden");
  }

  _drawSkillGraph(playerWon) {
    const canvas = document.getElementById("skill-graph-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f8fbff";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#d0dce8";
    ctx.lineWidth = 1;
    for (let y = 25; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const proLine = h * 0.56;
    ctx.strokeStyle = "#9aaab8";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, proLine);
    ctx.lineTo(w, proLine);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#6c7c8c";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("PRO 1000", 8, proLine - 5);

    const pts = playerWon ? [0.74, 0.66, 0.58, 0.45, 0.24] : [0.74, 0.66, 0.58, 0.52, 0.55];
    ctx.strokeStyle = "#1f96f2";
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    pts.forEach((normY, idx) => {
      const x = 24 + (idx / (pts.length - 1)) * (w - 48);
      const y = h * normY;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const endX = w - 24;
    const endY = h * pts[pts.length - 1];
    ctx.fillStyle = "#ffea28";
    ctx.beginPath();
    ctx.arc(endX, endY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#006cc4";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  configureGameBubbles(count = 2) {
    [this.elGamesPlayer, this.elGamesOpponent].forEach(pill => {
      if (!pill) return;
      pill.querySelectorAll(".game-bubble").forEach((bubble, idx) => {
        if (idx < Math.max(1, count)) {
          bubble.classList.remove("hidden");
        } else {
          bubble.classList.add("hidden");
        }
      });
    });
  }

  updateScoreboard({
    playerScoreText = "00",
    opponentScoreText = "00",
    deuceLabel = null,
    playerGames = 0,
    opponentGames = 0,
    gamesToWin = 2
  }) {
    if (this.elScoreCenter) {
      if (deuceLabel) {
        this.elScoreCenter.classList.add("deuce-mode");
        const translatedDeuce = deuceLabel.toLowerCase().includes("deuce") ? t("banner_deuce") :
                                deuceLabel.toLowerCase().includes("ad") ? t("banner_advantage") : deuceLabel;
        this.elScorePlayer.textContent = translatedDeuce;
        this.elScoreSep.classList.add("hidden");
        this.elScoreOpponent.classList.add("hidden");
      } else {
        this.elScoreCenter.classList.remove("deuce-mode");
        this.elScorePlayer.textContent = playerScoreText;
        this.elScoreSep.classList.remove("hidden");
        this.elScoreOpponent.classList.remove("hidden");
        this.elScoreOpponent.textContent = opponentScoreText;
      }

      this.configureGameBubbles(gamesToWin);
      if (this.elGamesPlayer) {
        this.elGamesPlayer.querySelectorAll(".game-bubble").forEach((b, i) => {
          b.classList.toggle("won", i < playerGames);
        });
      }
      if (this.elGamesOpponent) {
        this.elGamesOpponent.querySelectorAll(".game-bubble").forEach((b, i) => {
          b.classList.toggle("won", i < opponentGames);
        });
      }
    }
  }

  updateServerTag(pos, visible) {
    if (!this.elServerTag) return;
    if (!visible || !pos || !pos.visible) {
      this.elServerTag.classList.add("hidden");
      return;
    }
    this.elServerTag.classList.remove("hidden");
    const x = Math.max(80, Math.min(window.innerWidth - 80, pos.x));
    const y = Math.max(95, Math.min(window.innerHeight - 90, pos.y));
    this.elServerTag.style.left = `${x.toFixed(1)}px`;
    this.elServerTag.style.top = `${y.toFixed(1)}px`;
  }

  updatePlayerNameplate(pos, visible) {
    if (!this.elPlayerNameplate) return;
    if (!visible || !pos || !pos.visible) {
      this.elPlayerNameplate.classList.add("hidden");
      return;
    }
    this.elPlayerNameplate.classList.remove("hidden");
    const x = Math.max(90, Math.min(window.innerWidth - 90, pos.x));
    const y = Math.max(120, Math.min(window.innerHeight - 50, pos.y));
    this.elPlayerNameplate.style.left = `${x.toFixed(1)}px`;
    this.elPlayerNameplate.style.top = `${y.toFixed(1)}px`;
  }

  showTimingPopup({
    grade = "PERFECT",
    detail = "POWER TOPSPIN • 176 KM/H",
    screenPos = null,
    durationMs = 1100
  }) {
    if (!this.elTimingPopup) return;
    if (this.timingPopupTimer) clearTimeout(this.timingPopupTimer);

    const rawGrade = String(grade).toLowerCase().trim();
    const transGradeKey = TIMING_TRANSLATIONS[rawGrade];
    const displayGrade = transGradeKey ? t(transGradeKey) : grade;

    let displayDetail = detail;
    if (getLang() === 'ko') {
      displayDetail = displayDetail
        .replace(/POWER TOPSPIN/gi, t("shot_power_topspin"))
        .replace(/TOPSPIN/gi, t("shot_topspin"))
        .replace(/SLICE/gi, t("shot_slice"))
        .replace(/LOB/gi, t("shot_lob"))
        .replace(/SMASH/gi, t("shot_smash"))
        .replace(/SWEET SPOT APEX/gi, t("timing_sweet_spot_apex"))
        .replace(/LOW CONTACT/gi, t("timing_low_contact"))
        .replace(/SERVICE BOX/gi, t("timing_service_box"))
        .replace(/BALL PASSED/gi, t("timing_ball_passed"));
    }

    this.elTimingGrade.textContent = displayGrade;
    this.elTimingGrade.className = "timing-grade";
    if (grade.includes("EARLY")) this.elTimingGrade.classList.add("grade-early");
    else if (grade.includes("LATE")) this.elTimingGrade.classList.add("grade-late");
    else this.elTimingGrade.classList.add("grade-perfect");

    this.elTimingDetail.textContent = displayDetail;

    if (screenPos && screenPos.visible) {
      const x = Math.max(110, Math.min(window.innerWidth - 110, screenPos.x));
      const y = Math.max(110, Math.min(window.innerHeight - 120, screenPos.y));
      this.elTimingPopup.style.left = `${x.toFixed(1)}px`;
      this.elTimingPopup.style.top = `${y.toFixed(1)}px`;
    } else {
      this.elTimingPopup.style.left = "50%";
      this.elTimingPopup.style.top = "54%";
    }

    this.elTimingPopup.classList.remove("hidden");
    if (durationMs > 0) {
      this.timingPopupTimer = setTimeout(() => {
        this.elTimingPopup.classList.add("hidden");
      }, durationMs);
    }
  }

  showCenterBanner(text, { style = "style-gold", subText = "", durationMs = 1500, persistent = false } = {}) {
    if (!this.elBannerLayer || !this.elBannerText) return;

    this._lastRawBanner = text;
    this._lastRawBannerStyle = style;

    if (this.bannerTimer) {
      clearTimeout(this.bannerTimer);
      this.bannerTimer = null;
    }

    const key = BANNER_TRANSLATIONS[String(text).toLowerCase().trim()];
    const displayText = key ? t(key) : text;

    this.elBannerText.textContent = displayText;
    this.elBannerText.className = `center-banner-text ${style}`;

    if (this.elBannerSub) {
      if (subText) {
        this.elBannerSub.textContent = subText;
        this.elBannerSub.classList.remove("hidden");
      } else {
        this.elBannerSub.classList.add("hidden");
      }
    }

    this.elBannerLayer.classList.remove("hidden");

    if (!persistent && durationMs > 0) {
      this.bannerTimer = setTimeout(() => {
        this.hideCenterBanner();
      }, durationMs);
    }
  }

  hideCenterBanner() {
    this._lastRawBanner = "";
    if (this.bannerTimer) {
      clearTimeout(this.bannerTimer);
      this.bannerTimer = null;
    }
    if (this.elBannerLayer) this.elBannerLayer.classList.add("hidden");
  }

  setReplayMode(active) {
    document.body.classList.toggle("replay-mode", !!active);
    if (this.elReplayBadge) this.elReplayBadge.classList.toggle("hidden", !active);
  }

  updateTimingGauge({ cursorNormalized = 0.5, modeTitle = "SWING TIMING", speedText = "READY" }) {
    if (this.elTimingCursor) {
      const pct = Math.max(4, Math.min(96, cursorNormalized * 100));
      this.elTimingCursor.style.left = `${pct.toFixed(1)}%`;
    }

    let transTitle = modeTitle;
    let transSpeed = speedText;

    if (modeTitle === "SWING TIMING") transTitle = t("gauge_mode_timing");
    else if (modeTitle === "SERVE TOSS") transTitle = t("gauge_mode_toss");
    else if (modeTitle === "SERVE IMPACT") transTitle = t("gauge_mode_impact");
    else if (modeTitle.includes("WHIFF")) transTitle = t("gauge_mode_whiff");

    if (speedText === "READY") transSpeed = t("gauge_ready");
    else if (speedText.includes("UPWARD FLICK")) transSpeed = t("gauge_flick");
    else if (speedText === "LATE") transSpeed = t("gauge_late");

    if (this.elGaugeModeTitle) this.elGaugeModeTitle.textContent = transTitle;
    if (this.elGaugeSpeedReadout) this.elGaugeSpeedReadout.textContent = transSpeed;
  }

  updateAudioStatus({ playing, trackName }) {
    if (this.elAudioDot) this.elAudioDot.classList.toggle("music-on", !!playing);
    if (this.elAudioLabel) {
      let tName = trackName || "Sunny Rally";
      if (tName.includes("Sunny Rally")) tName = t("audio_sunny_rally");
      else if (tName.includes("Plaza")) tName = t("audio_plaza");
      else if (tName.includes("Trophy") || tName.includes("Grand Slam")) tName = t("audio_fanfare");

      const prefix = t("audio_lyria_prefix");
      this.elAudioLabel.textContent = playing ? `${prefix} ${tName}` : `${prefix} ${t("audio_muted")}`;
    }
  }

  updateCameraLabel(label) {
    if (this.elCameraLabel) {
      let trans = label;
      if (label === "Rally") trans = t("cam_rally");
      else if (label === "Serve") trans = t("cam_serve");
      else if (label === "Net Close") trans = t("cam_close");
      else if (label === "Aerial") trans = t("cam_aerial");
      else if (label === "Auto") trans = t("cam_auto");
      this.elCameraLabel.textContent = trans;
    }
  }

  updateMotionStatus({ webcamActive = false, phoneConnected = false, p1Phone = false, p2Phone = false }) {
    if (this.elWebcamPip) this.elWebcamPip.classList.toggle("hidden", !webcamActive);
    if (this.elWebcamDot) this.elWebcamDot.classList.toggle("active", !!webcamActive);
    const active = !!(phoneConnected || p1Phone || p2Phone);
    if (this.elPhoneDot) this.elPhoneDot.classList.toggle("active", active);
    if (this.elPhoneLabel) {
      this.elPhoneLabel.textContent = active ? (getLang() === 'ko' ? "라켓 연결됨" : "Racket Connected") : t("btn_phone");
    }
  }

  updateMultiplayerRoomInfo(info = {}) {
    this._lastRoomStatus = { ...this._lastRoomStatus, ...info };
    if (info.roomId) this.currentRoomId = String(info.roomId).toLowerCase();
    if (info.role) this.playerRole = String(info.role).toLowerCase() === "p2" ? "p2" : "p1";
    this.updateOpponentPresence(this._lastRoomStatus);
  }

  updateOpponentPresence(status = {}) {
    const isMulti = !!(status.isMultiplayer || this.selectedDifficulty === "1v1" || (this.currentRoomId && this.currentRoomId !== "default"));
    const oppBadge = document.querySelector(".mii-side-opponent .mii-avatar-badge:not(.secondary-mii)");

    if (!isMulti) {
      if (this.elOpponentPresencePill) this.elOpponentPresencePill.classList.add("hidden");
      if (oppBadge) oppBadge.classList.remove("opponent-ready");
      this._lastOtherReady = false;
      return;
    }

    const hostName = status.hostName?.trim() || t("player_1");
    const guestName = status.guestName?.trim() || t("player_2");
    const isP2 = this.playerRole === "p2";

    let ready = false;
    let label = "";

    if (isP2) {
      ready = !!(status.p2Phone || status.p1Phone || status.p1Online);
      label = status.p2Phone ? `${t("racket_ready", hostName)}` :
              (status.p1Phone || status.p1Online) ? `${t("connected_ready", hostName)}` :
              t("waiting_for", hostName);
    } else {
      ready = !!(status.p2Phone || status.p2Online);
      label = (status.p2Phone && status.p2Online) ? t("connected_ready", guestName) :
              status.p2Phone ? t("racket_ready", guestName) :
              status.p2Online ? t("connected_ready", guestName) :
              t("waiting_for", guestName);
    }

    if (this.elOpponentPresencePill) {
      this.elOpponentPresencePill.classList.remove("hidden");
      this.elOpponentPresencePill.classList.toggle("ready", ready);
    }
    if (this.elOpponentPresenceText) {
      this.elOpponentPresenceText.textContent = label;
    }
    if (oppBadge) oppBadge.classList.toggle("opponent-ready", ready);
    this._lastOtherReady = ready;
  }
}

export default HudUI;
