const overview = document.querySelector(".overview");
const username = "hasnodgra";
const repoList = document.querySelector(".repo-list");

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
};4

//fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

//display info about repos
const displayRepos = function (repos) {
    for (const repo of repos) {
        cosnt repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};