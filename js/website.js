// Initializing:
let userNameInput = document.getElementById("user-name-input");
let userPictureImg = document.getElementById("user-picture-img");
let reposSection = document.querySelector(".repos-section");
let connectionDiv = document.querySelector(".connection");
let counter = document.getElementById("counter-h1");

// Disabling:
userPictureImg.ondragstart = () => false;

// Developing(Views):
userNameInput.addEventListener("keyup", onInput);
reposSection.addEventListener("click", onRepo);
// Developing(Window):
window.onload = onWindowLoads;
window.addEventListener("online", onOnline);
window.addEventListener("offline", onOffline);

// Method(OnWindowLoads):
function onWindowLoads() {
  // Logging:
  console.log("Loading window's");
  // Initializing:
  let isOnline = window.navigator.onLine;
  // Checking:
  if (isOnline) onOnline(null);
  else onOffline(null);
  // Logging:
  console.log(`Is connection avialable -> ${isOnline}`);
}

// Method(OnOnline):
function onOnline(event) {
  // Inactiviting:
  connectionDiv.classList.remove("offline");
  connectionDiv.classList.add("online");
  connectionDiv.classList.add("hide");
  // Logging:
  console.log(connectionDiv);
  console.log("From: onOnline");
}

// Method(OnOffline):
function onOffline(event) {
  // Activiting:
  connectionDiv.classList.remove("hide");
  connectionDiv.classList.remove("online");
  connectionDiv.classList.add("offline");
  // Logging:
  console.log(connectionDiv);
  console.log("From: onOffline");
}

// Method(OnInput):
function onInput(event) {
  // Checking:
  if (event.keyCode === 13) {
    // Logging:
    console.log(userNameInput.value);
    // Fetching:
    let repositories = fetch(`https://api.github.com/users/${userNameInput.value}/repos`);
    // Writing:
    write(repositories);
  }
}

// Method(Write):
async function write(repositories) {
  // Catching:
  try {
    // Initialzing:
    let response = await repositories;
    let body = await response.json();
    // Logging:
    console.log(response);
    console.log(body);
    // Writing:
    writeRepos(body);
  } catch (e) {
    // Logging:
    console.log(e);
  }
}

// Method(OnRepo):
function onRepo(event) {
  // Initializing:
  let url = event.target.dataset.url;
  // Logging:
  console.log(url);
  // Checking:
  if (url !== undefined) {
    // Open:
    window.open(event.target.dataset.url);
  }
}

// Method(WrtieRepos):
function writeRepos(body) {
  // Logging:
  console.log(body);
  console.log("#".repeat(10));
  // Setting:
  userPictureImg.src = body[0].owner["avatar_url"];
  counter.innerText = body.length;
  // Hiding:
  connectionDiv.classList.add("hide");
  // Removing:
  reposSection.innerHTML = "";
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
