/* Scale the embedded dashboard mockup to its display frame. */
(() => {
  "use strict";

  const NARROW = "(max-width: 760px)";
  const stage = document.querySelector("[data-mockup-stage]");
  const frame = document.getElementById("mockupFrame");

  if (!stage || !frame) return;

  const narrowQuery = window.matchMedia(NARROW);
  let designWidth = 1440;
  let designHeight = 1000;
  let scheduled = 0;

  function applyDesign() {
    const narrow = narrowQuery.matches;
    const nextWidth = narrow ? 1024 : 1440;
    const nextHeight = narrow ? 900 : 1000;

    if (nextWidth === designWidth && nextHeight === designHeight) return;

    designWidth = nextWidth;
    designHeight = nextHeight;
    frame.style.width = `${designWidth}px`;
    frame.style.height = `${designHeight}px`;
    stage.style.aspectRatio = `${designWidth} / ${designHeight}`;
  }

  function fit() {
    scheduled = 0;
    applyDesign();

    const width = stage.clientWidth;
    if (!width) return;
    frame.style.transform = `scale(${width / designWidth})`;
  }

  function schedule() {
    if (scheduled) return;
    scheduled = window.requestAnimationFrame(fit);
  }

  frame.addEventListener("load", () => {
    schedule();

    // The screen stays fully interactive. Hide only the inner scrollbar so
    // the tilted surface remains clean; wheel, touch and keyboard scrolling
    // still work inside the mockup.
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      const style = doc.createElement("style");
      style.textContent = "html{scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar{display:none}";
      doc.head.appendChild(style);
    } catch {
      // Local files can block document access — the screen still works.
    }
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(schedule).observe(stage);
  } else {
    window.addEventListener("resize", schedule, { passive: true });
  }

  if (typeof narrowQuery.addEventListener === "function") {
    narrowQuery.addEventListener("change", schedule);
  } else if (typeof narrowQuery.addListener === "function") {
    narrowQuery.addListener(schedule);
  }

  window.addEventListener("load", schedule, { once: true });
  fit();
})();
