# LEGO SHOP

## Overview

## DevDependencies and installations

* ```npm i```
* Even though ```npm i``` will install all the dependencies needed, the list of the dependencies below are the npm packages used throughout the development process.
  * ```npm i http-server```
  * ```npm i express```
  * ```npm i -g nodemon```
  * ```npm i sqlite@3.0.6```
  * ```npm i fs```
  * ```npm i path```
  * ```npm i uuid```
  * ```npm install --save multer```
  * ```npm i uuid-random```

After installing all the dependencies to start the server, it can be done by running:

* ```npm start``` or
* ```nodemon server/svr.js```

## Key Features and Functionalilty (need to discuss all app.put)

need to explain how a user can't see wishlist, design and checkout button

### API

* list all bricks, sorted bricks, kits and videos from the database.
* specify a brick or kit from the database.
* see below

### Management

* This is managed in git(private repo).

## API and Documentation

* /bricks
  * GET: retrieve all the bricks from the database.
  * POST: upload a brick
* /bricks/:sort
  * GET: retrieves list of sorted bricks
* /brick
  * GET: retrieve a brick from the database.
* /kits
  * GET: retrieve all the kits from the database.
* /kit
  * GET: retrieve a kit from the database.
* /videos
  * GET: retrieve all the videos from the database. This is used for "coming soon feature in the homepage"
* /auth-config
    Serves auth0 configuration file
* redirect
    Handles any URL error. It redirects to 404error page.

## Reasons for a specific paradigm

| Paradigm used | Reasons for a specific paradigm |
|----| ----|
|Auth0| Auth0 provides functionality to ensure authorization and authentication using a passwordless login. The benefit of Auth0 is developer won't be worried about having to store user credentials in the database. Thus making the application more secured from attackers. Implementing |
|Multiple-page Application| Choosing between Single page and Multiple page in this coursework, i took some pros and cons into consideration. I started the intial development using a SPA because it is fast and are loaded once. SPA caches any local storage pretty well but, it is very tricky to manipulate the URLs and it's becomes slow especially when we have a lot of content on a page. I had issues with the history API. I swtiched my application to a multiple page as the URLs manipulation is easy even though SPA creates a better user experince. Also, it allows new pages for each lego and implementing any change to a specific page. if a JS file should fail not the whole app throws an error or crashes. |
|Sorting by price, type, and color| There are two ways i approached sorting. First is by selecting two different columns and use "LIKE" and "OR" to check if the option clicked on the website is the same as the text in the database as shown in the image below.![sort alternative considered](./client/images/sort.png) It worked when i tried it on the Uni VM but i couldn't get it to work on the website. ![sort alternative considered](./client/images/sort2.png) The other option i considered was to make another column which contains all the sorting options in the website and use "LIKE" to check if the option clicked matches any of the value within that database column. ![sort alternative considered](./client/images/sort4.png) ![sort alternative considered](./client/images/sort3.png) This is an insufficient way in my opinion it would be better if i can select from two different column this is one of the things i need to improve in the future.|
|Top picks and coming soon| Suggesting to a user some items is a good feature in a shopping website. I fetched from the server kits, bricks and two videos and set the src to random. Suggestion for a website like this should not be guessable hence, why i set the src to be random.|
|Reason for using multiple database||
|Reason for including only the first letter of the name as profile| I realised when using auth0 when i login with google i can retrieve the username as we were taught in the authentication lecture. But whenever i login using email as password i.e. as a registered auth0 user it returns undefined hence, i decided to just get the first letter of just the email address and capitalize it.|
|why use 404.html for redirecting URL| If for example a user enters a wrong URL it should display a well designed error message. This can help users identify if a link is valid or not.|
|Reason for using SQLite||
|LocalStorage| There were two different approach i did for storing the bricks in the localstorage. The first approach was to store the whole brick object in the localstorage and create a column in the database and set it to zero then use that to count number of the brick on each addToCart. ![localstorage alternative considered](./client/images/localstorage1.png) But, it looks inefficient as there is no need of storing everything about a brick to the localstorage. The second approach was to store the id of the brick and it's quantity to the localstorage. This is efficient because we can access all the information about a brick from storing the id only. ![localstorage alternative considered](./client/images/localstorage2.png)|

### Assumptions

i am assuming that the person who logs in is an administrator. So they get the luxury to upload a new brick.
also, for the customer i assume they should have all the features required to checkout and buy a product without being forced to login.

## Known Issues and Future improvements

* The sorting of the bricks works properly but can be improved. It has been explained above in reasons for specific paradigm's section.

* Auth0 redirecting back to homepage. This is bad for usability, if there is time in the future i will check the auth0 library properly so that if a user logs in, it should redirect to the page they were in.

* Due to the lack of time, some features i desired to achieve were not implemented. If there was time i would have implemented search for inventories using array.filter to create a new array of inventories that matches the input.value of being entered.

* Wishlist: A new database file using HTTP request of POST. I already implemented that only if a user is logged in they can see the wish list tab. If i had created a database file for wish list, it will get a handler on the wish list button then, forEach lego being added to wish list it POST to the database. And also will display the OBJECT.value of that database file.

* Design Kit:

* Continue as guest:

### Reference List

* *LEGO CatalogDatabase Download*. (n.d.). Rebrickable. <https://rebrickable.com/downloads/>

Copyright information:
![rebrickable](./client/images/rebrickable.png)

* *RegEx for matching UK Postcodes*. (2013, June 25). Stackoverflow. <https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes>

* *ws_api*. (2019, November 26). Github. <https://github.com/portsoc/ws_api>
* <https://github.com/portsoc/staged-simple-message-board>
* *simple-staged-message-board*. (2022, January 17). Github. <https://github.com/portsoc/staged-simple-message-board>

*
*
*
*
