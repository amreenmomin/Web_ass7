function getGitHubData() {
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}`;
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const user = JSON.parse(xhr.responseText);
          showUserData(user);
          getRepositories(username);
        } else if (xhr.status === 404) {
          showError("User not found!");
        } else {
          showError("Error occurred while fetching user data.");
        }
      }
    }
    
    xhr.open('GET', url);
    xhr.send();
  }
  
  function getRepositories(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const repositories = JSON.parse(xhr.responseText);
          showRepositoryNames(repositories);
        } else {
          showError("Error occurred while fetching repositories.");
        }
      }
    }
    
    xhr.open('GET', url);
    xhr.send();
  }
  
  function showUserData(user) {
    const outputDiv = document.getElementById('output');
    
    const userElement = document.createElement('div');
    userElement.innerHTML = `<h2>${user.login}</h2>
                             <p>Name: ${user.name}</p>
                             <p>Location: ${user.location}</p>`;
    
    outputDiv.appendChild(userElement);
  }
  
  function showRepositoryNames(repositories) {
    const outputDiv = document.getElementById('output');
    
    const repoElement = document.createElement('div');
    repoElement.innerHTML = `<h3>Repositories:</h3>`;
    
    const listElement = document.createElement('ul');
    repositories.forEach(function(repo) {
      const listItem = document.createElement('li');
      listItem.textContent = repo.name;
      listElement.appendChild(listItem);
    });
    
    repoElement.appendChild(listElement);
    outputDiv.appendChild(repoElement);
  }
  
  function showError(errorMessage) {
    const outputDiv = document.getElementById('output');
    
    const errorElement = document.createElement('div');
    errorElement.innerHTML = `<p>Error: ${errorMessage}</p>`;
    
    outputDiv.appendChild(errorElement);
  }
  