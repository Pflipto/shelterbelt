const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const numberOr = (value, fallback) => {
  if (value === "" || value == null) return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

/** A single, restrained camera approach; progress follows normal page scrolling. */
export function cameraForProgress(progress, destination = {}) {
  const position = clamp(numberOr(progress, 0), 0, 1);
  const eased = position * position * (3 - 2 * position);
  const x = clamp(numberOr(destination.x, 0), -30, 30);
  const y = clamp(numberOr(destination.y, 0), -30, 30);
  const scale = clamp(numberOr(destination.scale, 1.3), 1, 1.8);
  return { x: x * eased, y: y * eased, scale: 1 + (scale - 1) * eased };
}

function enhanceFarm() {
  const farm = document.querySelector("[data-farm]");
  const stage = farm?.querySelector(".farm-stage");
  const camera = farm?.querySelector(".farm-camera");
  const project = document.getElementById("grain-bin");
  const hotspot = farm?.querySelector(".farm-hotspot");
  if (!farm || !stage || !camera || !project || !hotspot) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const smallScreen = matchMedia("(max-width: 760px)");
  const destination = {
    x: farm.dataset.cameraX,
    y: farm.dataset.cameraY,
    scale: farm.dataset.cameraScale,
  };
  let visible = true;
  let frame = 0;

  function positionProjectCard() {
    if (typeof project.showPopover !== "function" || !project.matches(":popover-open")) return;
    const bounds = farm.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= innerHeight) {
      project.hidePopover();
      return;
    }
    const anchor = hotspot.getBoundingClientRect();
    const card = project.getBoundingClientRect();
    const margin = 16;
    const gap = 20;
    const preferredLeft = anchor.left - card.width - gap;
    const left = preferredLeft >= margin ? preferredLeft : anchor.right + gap;
    const top = anchor.top + (anchor.height - card.height) / 2;
    project.classList.add("is-positioned");
    project.style.left = `${clamp(left, margin, Math.max(margin, innerWidth - card.width - margin))}px`;
    project.style.top = `${clamp(top, margin, Math.max(margin, innerHeight - card.height - margin))}px`;
  }

  function paint() {
    frame = 0;
    const travel = Math.max(0, farm.offsetHeight - stage.offsetHeight);
    const stickyTop = numberOr(parseFloat(getComputedStyle(stage).top), 0);
    const progress = travel > 0 ? (stickyTop - farm.getBoundingClientRect().top) / travel : 0;
    const value = cameraForProgress(reducedMotion.matches || smallScreen.matches ? 0 : progress, destination);
    camera.style.setProperty("--camera-x", `${value.x.toFixed(3)}%`);
    camera.style.setProperty("--camera-y", `${value.y.toFixed(3)}%`);
    camera.style.setProperty("--camera-scale", value.scale.toFixed(4));
    positionProjectCard();
  }

  function schedulePaint() {
    if (visible && !frame) frame = requestAnimationFrame(paint);
  }

  function refresh() {
    if (frame) cancelAnimationFrame(frame);
    paint();
  }

  // The scene and its hotspot share one transform, keeping their coordinates aligned.
  document.documentElement.classList.add("farm-enhanced");
  refresh();

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) refresh();
      else {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        if (typeof project.hidePopover === "function" && project.matches(":popover-open")) project.hidePopover();
      }
    }, { rootMargin: "200px 0px" }).observe(farm);
  }
  addEventListener("scroll", schedulePaint, { passive: true });
  addEventListener("resize", refresh, { passive: true });
  reducedMotion.addEventListener("change", refresh);
  smallScreen.addEventListener("change", refresh);

  // Native popovers provide click-away/Escape dismissal, focus restoration,
  // and a working click interaction even when JavaScript is disabled.
  project.addEventListener("toggle", event => {
    if (event.newState === "open") refresh();
    else {
      project.classList.remove("is-positioned");
      project.style.removeProperty("left");
      project.style.removeProperty("top");
    }
  });

}

if (typeof document !== "undefined") enhanceFarm();
