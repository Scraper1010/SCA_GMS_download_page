/* Hero pointer glow */
(() => {
  "use strict";
  const hero = document.querySelector(".hero");
  const glow = document.getElementById("heroGlow");
  if (!hero || !glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    glow.style.setProperty("--mx", `${x}%`);
    glow.style.setProperty("--my", `${y}%`);
  });
})();
