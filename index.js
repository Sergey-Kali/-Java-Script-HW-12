const mainImage = document.querySelector(".main-image");
const projectsText = document.querySelector(".projects-text");

function scaleMainImage() {
  mainImage.classList.toggle("main-image__scale");
}

mainImage.addEventListener("click", scaleMainImage);

const navSpan = document.querySelectorAll(".nav-span");

function pressTheKeyToNavigate(e) {
  [...navSpan].forEach((element) => {
    if (e.code[e.code.length - 1] === element.textContent) {
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
}

document.addEventListener("keydown", pressTheKeyToNavigate);

const getMyRepos = async () => {
  const response = await fetch(
    "https://api.github.com/users/Sergey-Kali/repos"
  );
  const repos = await response.json();

  const markup = repos
    .map(
      (repo) => `<li><p class="projects-text__name">${repo.full_name}</p>
          <a class="projects-text__link" href="${
            repo.html_url
          }" target="_blank">${repo.name}</a>
          ${
            repo.description
              ? `<p class="projects-text__description">${repo.description}</p>`
              : ""
          }</li>`
    )
    .join("");
  projectsText.innerHTML = markup;
};

document.addEventListener("DOMContentLoaded", getMyRepos);
