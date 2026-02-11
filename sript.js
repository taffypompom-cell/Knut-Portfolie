"use strict";

// Mini data for the sidebar projects list (matches the sketch: projects + github link)
const projects = [
  { title: "Prosjekt 1", tech: "HTML/CSS", github: "#", live: "#" },
  { title: "Prosjekt 2", tech: "Nettverk", github: "#", live: "#" },
  { title: "Prosjekt 3", tech: "Azure", github: "#", live: "#" },
];

function renderProjects() {
  const host = document.getElementById("projectsList");
  if (!host) return;

  host.innerHTML = projects
    .map(
      (p) => `
      <div class="project-mini">
        <strong>${escapeHtml(p.title)}</strong>
        <div class="muted" style="font-size:12px; margin-bottom:8px;">${escapeHtml(p.tech)}</div>
        <div class="row">
          <a class="btn btn-small btn-ghost" href="${p.github}">GitHub</a>
          <a class="btn btn-small" href="${p.live}">Live</a>
        </div>
      </div>
    `
    )
    .join("");
}

function setupNavScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("active", isActive);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { root: null, threshold: [0.25, 0.5, 0.75] }
  );

  sections.forEach((s) => observer.observe(s));

  // Smooth scroll
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupToggles() {
  document.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle");
      const target = document.getElementById(targetId);
      if (!target) return;
      const isHidden = target.style.display === "none";
      target.style.display = isHidden ? "" : "none";
    });
  });
}

function setupMobileSidebar() {
  const btn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  if (!btn || !sidebar) return;

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function main() {
  renderProjects();
  setupNavScrollSpy();
  setupToggles();
  setupMobileSidebar();

  // Placeholder GitHub button
  const githubBtn = document.getElementById("githubBtn");
  if (githubBtn) {
    githubBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Legg inn din ekte GitHub-link her.");
    });
  }
}

document.addEventListener("DOMContentLoaded", main);
