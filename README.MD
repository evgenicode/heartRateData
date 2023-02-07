Heartrate Data Visualization App<br>
A simple app for visualizing heartrate data, utilizing sample data from a Huawei wrist band 6 strap, but also capable of using your own data from your Huawei device.<br>
<br><br>
Features<br>
Display heartrate data using a bottom graph, with the ability to select specific time intervals by clicking and holding the left button on your mouse.<br>

How to run<br>
The app is built using React and JavaScript for the frontend, and Node.js TypeScript for the backend.<br>

Before you run the app, you need to create a .env file in the "server" folder with the following information:<br>

NODE_ENV = development<br>
PORT = 5000<br>
MONGO_URI = mongodb+srv://Github:Np1Xufzreb8e0LBN@heartratecluster.astkcqz.mongodb.net/healthDetailData?retryWrites=true&w=majority<br>
CLIENT_URL = "http://localhost:3000"<br>
LOCAL_DATA_STORAGE = "C:\\MyFiles\\projects\\heartRateData\\server\\src\\data\\healthDetailData.json"<br>

Note: Make sure to replace the path to the healthDetailData.json (LOCAL_DATA_STORAGE variable) file with your own file location.<br>

Note: To use your own heartrate data, download it from the Huawei server, unpack the archive, and copy the "health detail data.json" file from the "Health detail data & description" folder. Provide the path to this file in the .env file under the LOCAL_DATA_STORAGE variable.<br>

Note: If you have something else running on PORT 5000 and can't use it, make sure to also change it in frontend configuration.
To do this navigate to<br>

client/src/config.json<br>

Specify the port you chose in both variables (http://localhost:portnumber)<br>

Note: Also if you can't run your frontend on default 3000 port, react will prompt you to use another port.<br>
Make sure to change this port in your .env file variable CLIENT_URL<br>

To launch the app:<br>
Make sure you have Node.js installed. You can download it here https://nodejs.org/en/download/<br>
You will also need TypeScript installed. https://www.typescriptlang.org/download<br>

Start the local server by navigating to the "server" folder and run:<br>

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

Note: If the defualt port 3000 is taken, react will prompt you to use another port. In this case specify the new CLIENT_URL variable in ".env" file in the project "server" folder.
