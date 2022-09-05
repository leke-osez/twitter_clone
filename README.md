# Twitter clone - A mini-version of twitter
A mini-version of twitter with its basic functionalities

## DESCRIPTION
This app was built with : __REACTJS__, __NodeJS__ and __MongoDB__.

ReactJS handles all the client-side functionalities like: <br>
State Management, UI rendering, Caching and so on.

NodeJS handles the server-side infastructure, such as: <br>
Authentication, CRUD operations, Storage etc. basically all operations you would normally do on the backend which is super-awesome!!!

MongoDB handles Database management

## FEATURES
- Authentication (Sign in and Sign up) with email and password or GOOGLE OAUTH.
- Tweet creation and deletion.
- Comment 
- Like engagement feature
- Profile update - set profile picture, bio and name 

## INSTALLATION GUIDE
1. Go ahead and clone this repo to your local machine.
2. Make sure you have node installed.
### Client Side 
Navigate into the client directory.
3. On your command line type and run `npm install` to install all dependencies.
4. The client uses some environment variables so create a __.env__ file
5. When done creating your .env file, you environment variables would contain your Google OAuth configurations for authentication
   See Google authentication and get the configuration parameters.
6. Now in your __.env__ file; ADD the following variables <br>
   __REACT_APP_GOOGLE_AUTH_ID __ is your GoogleAuthId <br>
   __REACT_APP_GOOGLE_SECRET__ is your Google secret <br>
7. now RUN `npm start`

### Server Side
Navigate into the server directory
8. On your command line type and run `npm install` to install all dependencies.
9. The server uses some environment variables so create a __.env__ file
10. When done creating your .env file, you environment variables would contain your Google OAuth configurations for authentication
   Create a MonogDB project and extract the configuration parameters.
11. Now in your __.env__ file; ADD the following variables <br>
   __CONNECTION_URL__ is your MongoDB connection URL <br>
   __GOOGLE_CLIENT_ID __ is your Google Client Id <br>
   __GOOGLE_SECRET__ is your Google secret <br>
12. now RUN `node start`

That is all you need to run the project 

## SOFT CAUTION
My idea of this app was for testing and fun purposes so when writing an ideal app for commercial purposes, you will want to move your CRUD operations to a cloud function on the server-side, and query by some sort of routing although this is still sufficient.
   

