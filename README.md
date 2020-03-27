# Movie App

Getting up and running:

## If you are using npm

```
$ npm install
$ cd frontend/ && npm install
$ cd .. && npm run start
```

## If you are using yarn

```
$ yarn
$ cd frontend && yarn
$ cd .. && yarn start
```

## Please implement the following features:

- As a user, when I fetch the list of popular movies,
  - I should be able to view the next page of movies
  - I should be able to view the previous page if one exists
  - I should not be able to navigate forward if a next page does not exist
  - I should not be able to navigate back if a previous page does not exist
  - **Bonus points** for implementing infinite scroll

- As a user, I should see a loading state when the app is fetching data
  - On the popular movies list
  - On the movie details page

- As a user, when searching for a movie, I should see search results appear only after I have finished typing 
  - **Bonus points** for implementing without use of third-party lib
