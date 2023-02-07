Heartrate Data Visualization App
A simple app for visualizing heartrate data, utilizing sample data from a Huawei wrist band 6 strap, but also capable of using your own data from your Huawei device.

Features
Display heartrate data using a bottom graph, with the ability to select specific time intervals by clicking and holding the left button on your mouse.

How to run
The app is built using React and JavaScript for the frontend, and Node.js TypeScript for the backend.

Before you run the app, you need to create a .env file in the "server" folder with the following information:

NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://Github:Np1Xufzreb8e0LBN@heartratecluster.astkcqz.mongodb.net/healthDetailData?retryWrites=true&w=majority
CLIENT_URL = "http://localhost:3000"
LOCAL_DATA_STORAGE = "C:\\MyFiles\\projects\\heartRateData\\server\\src\\data\\healthDetailData.json"

Note: Make sure to replace the path to the healthDetailData.json (LOCAL_DATA_STORAGE variable) file with your own file location.

Note: To use your own heartrate data, download it from the Huawei server, unpack the archive, and copy the "health detail data.json" file from the "Health detail data & description" folder. Provide the path to this file in the .env file under the LOCAL_DATA_STORAGE variable.

Note: If you have something else running on PORT 5000 and can't use it, make sure to also change it in frontend configuration.
To do this navigate to

client/src/config.json

Specify the port you chose in both variables (http://localhost:\*\*\*\*)

Note: Also if you can't run your frontend on default 3000 port, react will prompt you to use another port.
Make sure to change this port in your .env file variable PORT

To launch the app:
Make sure you have Node.js installed. You can download it here https://nodejs.org/en/download/
You will also need TypeScript installed. https://www.typescriptlang.org/download

Start the local server by navigating to the "server" folder and run:

~$ npm install

then run

~$ npm start

\*\*If the server fails to launch 1st time just run "npm start" one more time.

To launch the frontend you will need React

~$ npm install -g react

After the React is installed, to launch the app frontend, navigate to the "client" folder and run:

~$ npm install

then run

~$ npm start

The app should open in your default browser.

Note: If the defualt port 3000 is taken, react will prompt you to use another port. In this case specify the new PORT variable in ".env" file in the project "server" folder.
