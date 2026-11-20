/*
  LINK SPACE - project content
  Add or edit projects here. Keep order values unique.
  status: "live" | "development" | "archived"
  Set visible: false to hide a project without deleting its data.
*/

const projects = [
  {
    id: "noviq",
    name: "NOVIQ",
    description:
      "Guides, systems and resources to help you learn, build and create.",
    category: "DIGITAL RESOURCE STORE",
    tags: ["PRODUCT", "EDUCATION", "WEB"],
    url: "https://noviq-ar.pages.dev",
    status: "live",
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: "fintrack",
    name: "FinTrack",
    description:
      "A simple, privacy-first way to track expenses, budgets and money habits.",
    category: "PERSONAL FINANCE",
    tags: ["FINANCE", "PWA", "OFFLINE"],
    url: "https://fintrack-ar.pages.dev",
    status: "live",
    featured: false,
    visible: true,
    order: 2,
  },
  {
    id: "python-utilities",
    name: "Python Utilities",
    description:
      "A collection of practical Python command-line tools, from calculators to converters and automation utilities.",
    category: "PYTHON CLI TOOLS",
    tags: ["PYTHON", "CLI", "AUTOMATION"],
    url: "https://github.com/ayush-rathour/python-projects",
    status: "live",
    featured: false,
    visible: true,
    order: 3,
  },
  {
    id: "c-projects",
    name: "C Projects",
    description:
      "A collection of C programming projects focused on problem-solving, programming logic and core fundamentals.",
    category: "C PROGRAMMING",
    tags: ["C", "LOGIC", "PROGRAMMING"],
    url: "https://github.com/ayush-rathour/c-projects",
    status: "live",
    featured: false,
    visible: true,
    order: 4,
  },
];

const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const year = document.querySelector("#year");
const copyButton = document.querySelector("#copy-page");
const toast = document.querySelector("#toast");

const escapeHTML = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );

function statusMarkup(status) {
  const labels = {
    live: "LIVE",
    development: "IN DEVELOPMENT",
    archived: "ARCHIVED",
  };
  const safeStatus = labels[status] ? status : "live";
  return `<span class="status ${safeStatus}"><i class="status-dot"></i>${labels[safeStatus]}</span>`;
}

function renderProjects() {
  const visibleProjects = projects
    .filter(
      (project) => project.visible !== false && project.status !== "archived",
    )
    .sort((a, b) => a.order - b.order);

  projectCount.textContent = `(${String(visibleProjects.length).padStart(2, "0")})`;

  projectList.innerHTML = visibleProjects
    .map((project, index) => {
      const tags = (project.tags || [])
        .map((tag) => `<span>${escapeHTML(tag)}</span>`)
        .join("");

      return `
      <a class="project-card" href="${escapeHTML(project.url)}"
         target="_blank" rel="noopener noreferrer"
         aria-label="Explore ${escapeHTML(project.name)} (opens in a new tab)">
        <div class="project-top">
          <span class="project-meta">${String(index + 1).padStart(2, "0")} / ${escapeHTML(project.category)}</span>
          ${project.featured ? '<span class="featured-label">✳ FEATURED</span>' : statusMarkup(project.status)}
        </div>
        <div class="project-title-row">
          <h3>${escapeHTML(project.name)}</h3>
          <span class="project-arrow" aria-hidden="true">↗</span>
        </div>
        <p>${escapeHTML(project.description)}</p>
        <div class="card-bottom">
          <div class="tags">${tags}</div>
          ${project.featured ? statusMarkup(project.status) : ""}
        </div>
      </a>`;
    })
    .join("");
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1900);
}

async function copyPageLink() {
  const pageURL = window.location.href;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(pageURL);
    } else {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = pageURL;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "absolute";
      temporaryInput.style.left = "-9999px";
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      const copied = document.execCommand("copy");
      temporaryInput.remove();
      if (!copied) throw new Error("Copy command failed");
    }
    showToast("Link Space URL copied");
  } catch {
    showToast("Unable to copy - please copy the URL from your browser");
  }
}

year.textContent = new Date().getFullYear();
renderProjects();
copyButton.addEventListener("click", copyPageLink);
