# Part 3 - Backend

- The phonebook app has been deployed to https://phonebook-helsinki.herokuapp.com/ (unavailable after November 28, 2022)
- As the current folder is not the root directory of the git repo, only the subfolder needs to be deployed to heroku. This is done by performing the following commands in the root directory:
  ```sh
  $ heroku git:remote -a phonebook-helsinki
  $ git subtree push --prefix part-3 heroku main
  ```
