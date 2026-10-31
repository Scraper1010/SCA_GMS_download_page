/* Version tags and installer links, driven by json/version.json. */
(() => {
  "use strict";

  const CONFIG_URL = "json/version.json";
  const FALLBACK = {
    version: "0.0.1",
    downloadFile: "SCA_GMS_Setup_{version}.exe",
  };

  function apply(config) {
    const version = String(config.version || FALLBACK.version)
      .trim()
      .replace(/^v/i, "");
    const template = String(config.downloadFile || FALLBACK.downloadFile);
    const fileName = template.replace(/\{version\}/g, version);
    const href = `download/${fileName}`;

    document.querySelectorAll("[data-version]").forEach((element) => {
      const format = element.dataset.versionFormat || "prefixed";
      element.textContent = format === "plain" ? version : `v${version}`;
    });

    document.querySelectorAll("[data-download]").forEach((link) => {
      if (!(link instanceof HTMLAnchorElement)) return;
      link.href = href;
      link.setAttribute("download", fileName);
    });

    document.querySelectorAll("[data-download-filename]").forEach((element) => {
      element.textContent = fileName;
    });
  }

  apply(FALLBACK);

  // file:// pages cannot fetch local JSON; the HTML fallback above stays active.
  if (window.location.protocol === "file:") return;

  fetch(CONFIG_URL, { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : null))
    .then((config) => {
      if (config) apply(config);
    })
    .catch(() => {
      // Keep the fallback when the JSON is missing or malformed.
    });
})();
