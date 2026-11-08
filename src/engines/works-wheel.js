/**
 * WorksWheel - 3D Vertical Drum & Ring Portfolio Index Component
 * Vanilla JavaScript Implementation of the WorksWheel React Component
 */

const CARD_H = 0.38; // front card height, of the stage
const CARD_H_SMALL = 0.44; // taller front card on phones — the drum IS the section
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_MAX_W_SMALL = 0.74; // front card fills most of a phone stage
const SMALL_STAGE = 700;
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 1.5; // drum radius, in card heights — keeps neighbours' tips inside the stage
const DRUM_SMALL = 1.45; // tighter drum on phones — neighbours must stay in frame
const LENS = 2.7; // perspective distance
const RING_R = 1.14; // ring radius
const BOW = 1.82;
const TITLE = 0.115; // ring label and front-card title
const INDEX = 0.038; // the index down the right-hand side
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const WHEEL_UNITS_SMALL = 550;
const DRAG_UNITS_SMALL = 260;
const SETTLE = 140;
const EASE = 0.12;
const EASE_SMALL = 0.16;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rad = (deg) => (deg * Math.PI) / 180;
const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

// Ported from ECHO (github.com/Jishnu09-siuu/ECHO-WEBSITE); items are supplied by the caller.
export const DEFAULT_WORKS = [];

export function initWorksWheel(container, options = {}) {
  if (!container) return null;

  const items = options.items || DEFAULT_WORKS;
  const label = options.label || "Works '26";
  const action = options.action !== undefined ? options.action : "View";
  const hint = options.hint || "SCROLL OR DRAG DRUM TO CYCLE";
  const onSelect = options.onSelect || null;

  const count = items.length;
  const last = Math.max(count - 1, 0);

  let stage = { w: container.clientWidth || 800, h: container.clientHeight || 600 };
  // On phones the ring affordance reads as clutter — start straight on the
  // drum with a large readable front card. Desktop still opens on the ring.
  const startInDrum = stage.w < SMALL_STAGE;
  let turn = startInDrum ? 1 : 0;
  let target = startInDrum ? 1 : 0;
  let active = 0;
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build DOM Structure
  container.innerHTML = "";
  container.classList.add("relative", "w-full", "h-full", "overflow-hidden", "select-none");

  const section = document.createElement("section");
  section.setAttribute("aria-label", label);
  section.className = "relative w-full h-full min-h-[24rem] overflow-hidden select-none bg-transparent text-white";

  // Stage (perspective container)
  const stageEl = document.createElement("div");
  stageEl.tabIndex = 0;
  stageEl.role = "listbox";
  stageEl.setAttribute("aria-label", label);
  stageEl.className = "absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:outline-violet-400 focus-visible:-outline-offset-4 active:cursor-grabbing";

  // Wheel (preserve-3d anchor)
  const wheelEl = document.createElement("div");
  wheelEl.className = "absolute top-1/2 left-1/2 pointer-events-none";
  wheelEl.style.transformStyle = "preserve-3d";

  // Cards
  const cardRefs = [];
  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.id = `works-wheel-${i}`;
    card.role = "option";
    card.setAttribute("aria-selected", i === 0 ? "true" : "false");
    card.className = "group absolute cursor-pointer pointer-events-auto [backface-visibility:hidden]";
    card.style.transformStyle = "preserve-3d";
    card.style.willChange = "transform, opacity";

    const face = document.createElement("div");
    face.className = "relative block w-full h-full overflow-hidden rounded-2xl bg-[#0d0f20] border border-white/15 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9),0_0_0_1px_rgba(139,92,246,0.06)] transition-all duration-300 hover:shadow-[0_28px_60px_-12px_rgba(124,77,255,0.45)] hover:border-violet-400/60";
    face.style.willChange = "transform";
    face.style.transformOrigin = "center center";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.draggable = false;
    img.className = "w-full h-full object-cover select-none pointer-events-none";
    img.loading = "eager";

    face.appendChild(img);

    // Subtle gradient overlay for card readability
    const gradientOverlay = document.createElement("div");
    gradientOverlay.className = "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060e]/85 via-transparent to-transparent";
    face.appendChild(gradientOverlay);

    // Bottom subtle info badge on card
    const cardInfo = document.createElement("div");
    cardInfo.className = "pointer-events-none absolute left-3.5 bottom-3.5 right-3.5 flex items-center justify-between";
    cardInfo.innerHTML = `
      <span class="text-[11px] font-mono tracking-wider text-white drop-shadow-sm font-semibold truncate max-w-[70%]">
        ${item.title}
      </span>
      <span class="bg-white text-[#0b0b18] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 group-hover:scale-105 transition-transform">
        ${action} ↗
      </span>
    `;
    face.appendChild(cardInfo);

    card.appendChild(face);

    // Click on card
    card.addEventListener("click", (e) => {
      if (dragDelta > 6) return; // Ignore drag clicks
      if (active === i) {
        if (onSelect) {
          onSelect(i, item);
        } else if (item.href && item.href.startsWith("http")) {
          window.open(item.href, "_blank");
        }
      } else {
        to(i + 1);
      }
    });

    wheelEl.appendChild(card);
    cardRefs.push(card);
  });

  stageEl.appendChild(wheelEl);
  section.appendChild(stageEl);

  // Center ring label ("Works '26" or "Landing Pages")
  const labelEl = document.createElement("div");
  labelEl.className = "pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-black uppercase text-center text-white select-none z-10 transition-opacity duration-300";
  labelEl.textContent = label;
  section.appendChild(labelEl);

  // Front-card title
  const titleEl = document.createElement("div");
  titleEl.className = "pointer-events-none absolute top-[4%] inset-x-0 text-center md:text-left md:top-1/2 md:left-[7%] md:right-auto md:-translate-y-1/2 tracking-tight font-black uppercase text-white opacity-0 select-none z-10 md:max-w-[42%] leading-[1.05]";
  titleEl.textContent = items[0] ? items[0].title : "";
  section.appendChild(titleEl);

  // Side Index List
  const indexList = document.createElement("ol");
  indexList.className = "hidden md:block text-white/40 absolute top-[7%] right-[3%] text-right leading-[1.75] z-20 space-y-0.5 select-none font-mono max-w-[46%]";
  const indexButtons = [];

  items.forEach((item, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.title;
    btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-white/40 hover:text-white block ml-auto";
    if (i === 0) {
      btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-white font-bold block ml-auto underline decoration-2 decoration-violet-400 underline-offset-4";
    }
    btn.addEventListener("click", () => {
      to(i + 1);
    });
    li.appendChild(btn);
    indexList.appendChild(li);
    indexButtons.push(btn);
  });
  section.appendChild(indexList);

  // Bottom helper pill
  const hintPill = document.createElement("div");
  hintPill.className = "pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0f20]/90 border border-white/10 shadow-sm backdrop-blur-md text-[10px] md:text-[11px] font-mono text-white/60 uppercase tracking-wider";
  hintPill.innerHTML = `
    <svg class="w-3 h-3 text-violet-300 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>${hint}</span>
  `;
  section.appendChild(hintPill);

  container.appendChild(section);

  // Geometry computation
  let currentMetrics = calculateMetrics();

  function calculateMetrics() {
    const w = stage.w || 800;
    const h = stage.h || 600;
    const maxW = w < SMALL_STAGE ? CARD_MAX_W_SMALL : CARD_MAX_W;
    const cardW = Math.min(h * (w < SMALL_STAGE ? CARD_H_SMALL : CARD_H) * CARD_RATIO, w * maxW);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * (w < SMALL_STAGE ? DRUM_SMALL : DRUM);
    // Ring must fit inside the stage — on phones it stays fully within the
    // side edges so no card is ever cropped by the viewport. Vertically the
    // same rule: the farthest card tip (ringR + scaled half-height) keeps a
    // 14px margin, so top/bottom ring cards are never sliced by the frame.
    const rFit = (h / 2 - 14) / (1 + (Math.PI * cardH * 0.82) / ((count || 1) * (cardW || 1)));
    const ringR = Math.min(cardH * (w < SMALL_STAGE ? 1.45 : RING_R), w * (w < SMALL_STAGE ? 0.3 : 0.34), rFit);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * (w < SMALL_STAGE ? 0.9 : BOW),
      depth: cardH * LENS,
      title: Math.max(22, cardH * TITLE),
      index: Math.max(10, cardH * INDEX),
    };
  }

  function applyMetrics() {
    currentMetrics = calculateMetrics();
    stageEl.style.perspective = `${currentMetrics.depth}px`;
    // Phones: vertical swipes belong to the page (pan-y), horizontal ones drive
    // the drum. Desktop keeps the natural vertical-drag drum.
    const small = stageEl.clientWidth < SMALL_STAGE;
    stageEl.classList.toggle("touch-pan-y", small);
    stageEl.classList.toggle("touch-pan-x", !small);

    cardRefs.forEach((card) => {
      card.style.width = `${currentMetrics.cardW}px`;
      card.style.height = `${currentMetrics.cardH}px`;
      card.style.marginLeft = `${-currentMetrics.cardW / 2}px`;
      card.style.marginTop = `${-currentMetrics.cardH / 2}px`;
    });

    labelEl.style.fontSize = `${currentMetrics.title}px`;
    titleEl.style.fontSize = `${currentMetrics.title * 0.9}px`;
  }

  applyMetrics();

  // ResizeObserver
  const ro = new ResizeObserver(() => {
    stage = { w: stageEl.clientWidth, h: stageEl.clientHeight };
    applyMetrics();
    if (sleeping) { sleeping = false; frameId = requestAnimationFrame(draw); }
  });
  ro.observe(stageEl);

  // Target steering
  function to(next) {
    // Phones never unwind into the ring — the drum starts at 1 and the
    // minimum stays there, so swiping back past the first card can never
    // morph the stack into the circle.
    const lo = stage.w < SMALL_STAGE ? 1 : 0;
    target = clamp(next, lo, last + 1);
    wake();
  }

  // Wheel interaction
  let settlingTimer = null;
  const onWheel = (event) => {
    const delta = event.deltaY;
    const next = target + delta / (stageEl.clientWidth < SMALL_STAGE ? WHEEL_UNITS_SMALL : WHEEL_UNITS);
    // Page scroll passes through only once the drum has VISIBLY reached an
    // end (turn, the eased position — not just the target) and the gesture
    // keeps pushing outward. Mid-rotation the page never moves.
    const lo = stageEl.clientWidth < SMALL_STAGE ? 1 : 0;
    const atStart = target <= lo + 0.001 && turn <= lo + 0.05 && delta < 0;
    const atEnd = target >= last + 0.999 && turn >= last + 0.9 && delta > 0;
    // And the drum only owns the wheel while it actually fills the viewport —
    // a half-visible drum at the screen edge must not hijack page scrolling.
    const r = stageEl.getBoundingClientRect();
    const visible = (Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / r.height;
    if (!atStart && !atEnd && visible > 0.55) {
      event.preventDefault();
    }
    to(clamp(next, 0, last + 1));
    clearTimeout(settlingTimer);
    settlingTimer = setTimeout(() => {
      to(Math.round(target));
    }, SETTLE);
  };
  stageEl.addEventListener("wheel", onWheel, { passive: false });

  // Pointer drag interaction — vertical on desktop, horizontal on phones
  // (where vertical scrolling must stay with the page).
  let isPointerDown = false;
  let dragStart = 0;
  let dragDelta = 0;
  const dragCoord = (e) =>
    stageEl.clientWidth < SMALL_STAGE ? e.clientX : e.clientY;

  stageEl.addEventListener("pointerdown", (event) => {
    isPointerDown = true;
    dragStart = dragCoord(event);
    dragDelta = 0;
  });

  stageEl.addEventListener("pointermove", (event) => {
    if (!isPointerDown) return;
    const diff = dragStart - dragCoord(event);
    dragDelta += Math.abs(diff);
    // Capture only once it is a real drag, otherwise the capture retargets the card's click to the stage.
    if (dragDelta > 6 && !stageEl.hasPointerCapture(event.pointerId)) {
      try {
        stageEl.setPointerCapture(event.pointerId);
      } catch (_) {}
    }
    to(target + diff / (stageEl.clientWidth < SMALL_STAGE ? DRAG_UNITS_SMALL : DRAG_UNITS));
    dragStart = dragCoord(event);
  });

  const endDrag = (event) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    try {
      stageEl.releasePointerCapture(event.pointerId);
    } catch (_) {}
    // Always magnet back to the nearest card — never rest mid-turn.
    to(Math.round(target));
  };

  stageEl.addEventListener("pointerup", endDrag);
  stageEl.addEventListener("pointercancel", endDrag);
  stageEl.addEventListener("pointerleave", endDrag);

  // If the section leaves the viewport mid-turn, settle to the nearest card.
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting && target % 1 > 0.001) to(Math.round(target));
  }).observe(stageEl);

  // Keyboard navigation
  stageEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      to(Math.round(target) + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      to(Math.round(target) - 1);
    }
  });

  // UI Active State Update
  function updateActiveUI(near) {
    stageEl.setAttribute("aria-activedescendant", `works-wheel-${near}`);
    cardRefs.forEach((card, idx) => {
      card.setAttribute("aria-selected", idx === near ? "true" : "false");
    });

    indexButtons.forEach((btn, idx) => {
      if (idx === near) {
        btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-white font-bold block ml-auto scale-105 underline decoration-2 decoration-violet-400 underline-offset-4";
      } else {
        btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-white/40 hover:text-white block ml-auto";
      }
    });

    const counter = document.getElementById("works-wheel-counter");
    if (counter) {
      counter.textContent = `${String(near + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
    }

    if (items[near]) {
      titleEl.textContent = items[near].title;
    }
  }

  // Animation Loop (Single rAF pass writing direct DOM transforms)
  let frameId = 0;
  let isRunning = true;

  // Sleeps once the drum settles; to() / resize wake it up again.
  let sleeping = false;
  function wake() {
    if (sleeping && isRunning) {
      sleeping = false;
      frameId = requestAnimationFrame(draw);
    }
  }

  const draw = () => {
    if (!isRunning) return;

    const gap = target - turn;
    if (Math.abs(gap) < 0.0005) {
      turn = target;
      sleeping = true;
    } else {
      turn += gap * (reduced ? 1 : stage.w < SMALL_STAGE ? EASE_SMALL : EASE);
      frameId = requestAnimationFrame(draw);
    }

    const t = turn;
    const m = clamp(t, 0, 1);
    const pos = Math.max(0, t - 1);

    const { ringR, ringScale, drumR, bow } = currentMetrics;

    if (wheelEl) {
      wheelEl.style.transform = `translateZ(${-m * drumR}px)`;
    }

    for (let i = 0; i < count; i++) {
      const d = i - pos;
      const drumDeg = d * STEP;
      const card = cardRefs[i];
      if (card) {
        card.style.transform = place(
          d * (360 / count),
          drumDeg,
          ringR,
          drumR,
          bow,
          m
        );
        card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
      }
      const face = card ? card.firstElementChild : null;
      if (face) {
        face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }
    }

    if (labelEl) labelEl.style.opacity = String(1 - m);
    if (titleEl) titleEl.style.opacity = String(m);

    const near = clamp(Math.round(pos), 0, last);
    if (near !== active) {
      active = near;
      updateActiveUI(near);
    }
  };

  frameId = requestAnimationFrame(draw);

  return {
    to,
    next: () => to(Math.min(last + 1, Math.round(target) + 1)),
    prev: () => to(Math.max(0, Math.round(target) - 1)),
    getActive: () => active,
    destroy: () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      stageEl.removeEventListener("wheel", onWheel);
      clearTimeout(settlingTimer);
    }
  };
}
