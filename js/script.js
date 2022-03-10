const overview = document.querySelector(".overview");
const username = "hasnodgra";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//fetch API JSON data
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`); 
    //Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username}. 
    const data = await userInfo.json(); //resolve the JSON response
    displayUserInfo(data);
};

gitUserInfo();

//fetch and display user info
const displayUserInfo = function (data) // JSON data is the parameter
{   const div = document.createElement("div"); //creating new div
    div.classList.add("user-info");  //giving new div a class
    div.innerHTML =`
        <figure>
          <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Bio:</strong> ${data.bio}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `;
    overview.append(div);
    gitRepos();
};4

//fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
  };
  
  //display info about repos
  const displayRepos = function (repos) {
      filterInput.classList.remove("hide");
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  }

  //li click event
  repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
  });

  //function to get specfic repo info
  const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
  
    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
  
    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
      languages.push(language);
    }
  
    displayRepoInfo(repoInfo, languages);
  };

  //function to display specifc repo info and create a new div element
  const displayRepoInfo = function (repoInfo, languages) {
    viewReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(div);
  };

//click event to back button
viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
  });
  
  // // Dynamic search
  filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();
  
    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
  });