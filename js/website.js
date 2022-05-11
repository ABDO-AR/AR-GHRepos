// Initializing:
let userNameInput = document.getElementById("user-name-input");
let userPictureImg = document.getElementById("user-picture-img");
let reposSection = document.querySelector(".repos-section");

// Developing:
userNameInput.addEventListener("keyup", onInput);
reposSection.addEventListener("click", onRepo);

// Method(OnInput):
function onInput(event) {
  // Checking:
  if (event.keyCode === 13) {
    // Logging:
    console.log(userNameInput.value);
    // Fetching:
    let repositories = fetch(`https://api.github.com/users/${userNameInput.value}/repos`);
    // Writing:
    repositories.then((respone) => respone.json()).then((body) => writeRepos(body));
  }
}

// Method(OnRepo):
function onRepo(event) {
  // Logging:
  console.log(event.target.dataset.url);
  // Open:
  window.open(event.target.dataset.url);
}

// Method(WrtieRepos):
function writeRepos(body) {
  // Logging:
  console.log(body);
  console.log("#".repeat(10));
  // Setting:
  userPictureImg.src = body[0].owner["avatar_url"];
  // Looping:
  for (repo in body) {
    // Logging:
    console.log(body[repo]);
    // Appending:
    reposSection.innerHTML += getRepoView(body[repo].owner["login"], body[repo].name, body[repo].description, body[repo]["html_url"]);
  }
}

// Method(GetRepoView):
function getRepoView(login, name, description, url) {
  // Logging:
  console.log(url);
  // Retunring:
  return `<article data-url="${url}">
            <header data-url="${url}">
              <h1 data-url="${url}">${login}</h1>
              <h1 data-url="${url}">${name}</h1>
            </header>
            <p data-url="${url}">${description}.</p>
          </article>`;
}
