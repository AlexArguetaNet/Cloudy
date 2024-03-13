# Cloudy
A single page website that brings the user current and future weather information.

# Technologies used
  . Express.js
  . React.js

# How to run

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
   you device. To get an API key, go to https://openweathermap.org/ and create an account.

   Your ```.env``` file should look similar to this:

   ```
    PORT=4001
    API_KEY={ Your API key here }
   ```



