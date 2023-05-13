# Installation Steps

Hey there !

To have a look at this project in your system, or for you to use it, there are certain steps to follow in order to make it run.

1. Clone this repo in a directory of your choice.
2. Install NodeJS.
3. Create a MongoDB account, and add a database to it.
4. Create a new .env file at the starting point of directory to store environment variables. 
### touch .env
5. Open the .env file, and add the following :
    a. PORT = 5000
    b. MONGO_URI = <Enter your mongo URI here, it starts with : "mongodb+srv://">, You can find it in your mongodb homepage
    c.JWT_SECRET = <A unique 32bit string>
6. While you are at the starting point of the directory, enter the following command :
### npm install
This will install all required packages to run the code.
7. cd over to frontend, and enter the following command :
### npm install
This will take a few minutes to install.
8. Get back to the home directory using <cd..>
