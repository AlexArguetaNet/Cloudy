# Cloudy
A single page website that brings the user current and and five-day weather forecast for
their current location or a city that they choose to look up. This application uses
the openweathermap API the retrieve weather data from a specified location.

## Project structure
The project is devided into two folders: sever and client. The sever folder 

## Future improvements
Currently, the user can only search the weather forecast by entering the name of a city/town
in the search bar. The app will return the forecast of a location with the most similar name
that was entered. This location may not be what the user expected.

For example, the user might enter "Boone" in the search bar and expect the forecast
for Boone, NC, while they recieved the forecast for Boone, IL instead.

I plan to create a dedicated react component to handle user input so the user
can specify the location they would like to see the weather for.


## Technologies used
  *  Express.js
  *  React.js

## How to run on your computer

As of March 13, 2024, Cloudy is not available on the internet yet. However,
you can still run it locally on your desktop or laptop computer. Below are the
instruction on how to do so.

1) Your computer will need the following programs to run Cloudy
on your local machine:

    ```Node.js version 20.11.1 LTS```

2) Download the zip folder from Github
3) Extract the zip folder
4) Open your terminal and change into the main project folder
  This can be done by going to your file explorer, finding the folder,
  then right clicking on it to open the context menu. There may be an
  option that allows you to open the folder in the terminal.
5) Change into the ``` server ``` folder by enter the following command:
    ``` cd server ```
6) Enter the command to install dependencies:
   ``` npm i ```
7) Create a file called ``` .env ``` and place it in the ``` server ``` folder
8) The ```.env``` file will need variables for the port numbe and openweathermap API key.
   The port number can be any four digit number that is not in use by another process on
   you device, but the port number that the front-end code uses to communicate with the server
   is 4001. To get an API key, go to https://openweathermap.org/ and create an account.

   Your ```.env``` file should look similar to this:

   ```
    PORT=4001
    API_KEY={ Your API key here }
   ```

  **This step is crucial. The application will throw an error if there is no .env present with the following variables** 
   
9) Start the backend server by entering ``` npm run dev ``` in the terminal. keep this server running
10) Open a new terminal window, then change into the ``` client ``` by entering this command: ``` cd client ```
11) Enter the command to install the dependencies:
    ```
    cd client
    npm i
    ```
13) Start the front-end server by entering ``` npm run dev ```
14) A message will with the url that you would enter in your web browser
15) Remember, severs for the server folder and client folder should be running
    at the same time for the app to work.
16) Cloudy should be running now!



