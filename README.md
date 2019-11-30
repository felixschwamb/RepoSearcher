# RepoSearcher
## Installation
cd RepoSearcher  
npm install  

cd client  
npm install  

## Run project
npm run dev

## Functionalities
### Search for GitHub repositories
Search for GitHub repositories by entering the repository name

### Display of search results
* Search results are displayed as a list of max 100 entries, sorted by number of stars in descending order
* Details of search results contain owner and name of repository, data of last update and number of stars

### Bookmark repository
A repository can be bookmarked by clicking on the bookmark icon of the respective entry in the search result list

### Display of bookmarks
A list of bookmarked repositories is displayed on a separate page ('/bookmarks')

### Remove bookmark of repository
After a repository was bookmarked, the bookmark can also be removed by clicking on the bookmark icon again. 
This also removes the repository from the list of bookmarked repositories.

## API documentation
### Fetch repositories with a specific name
```
GET /api/repositories/:name
```
Endpoint receives information about search term as a parameter.  
Middleware gets applied to fetch repositories from GitHub API, according to the provided search term.  
Endpoint sends fetched repositories back.  

The following endpoint of GitHub API is used for this request:
```
GET https://api.github.com/search/repositories?q=${repoName}&per_page=100&sort=stars&order=desc
```

### Fetch all bookmarked repositories
```
GET /api/bookmarks
```
Endpoint receives no additional information as parameter, body, etc..  
Endpoint sends all repositories back that are stored as a bookmark on a file on the server.  

### Add a repository to the list of bookmarks
```
POST /api/bookmarks
```
Endpoint receives information about the repository that should be stored as a bookmark in the request body.  
Information gets stored in the respective file on the server.  
Endpoint sends success status back.  

### Remove a specific repository from the list of bookmarks
```
DELETE /api/bookmarks/:id
```
Endpoint receives Id of the repository that should be removed as a bookmark as a parameter.  
Information about respective repository gets removed from the storage file on the server.  
Endpoint sends success status back.
