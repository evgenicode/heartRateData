Heartrate Data Visualization App
A simple app for visualizing heartrate data, utilizing sample data from a Huawei wrist band 6 strap, but also capable of using your own data from your Huawei device.

Features
Display heartrate data using a bottom graph, with the ability to select specific time intervals by clicking and holding the left button on your mouse.
How to run
The app is built using React and JavaScript for the frontend, and Node.js TypeScript for the backend.

To run the app, make sure you have the necessary dependencies installed and run the following commands in the root folder:

npm install
npm start

Before you run the app, you need to create a .env file in the server folder with the following information:

NODE_ENV = development
PORT = 5000
LOCAL_DATA_STORAGE = "C:\\MyFiles\\projects\\heartRateData\\server\\src\\data\\healthDetailData.json"

Note: Make sure to replace the path to the healthDetailData.json file with your own file location.

To use your own heartrate data, download it from the Huawei server, unpack the archive, and copy the health detail data.json file from the Health detail data & description folder. Provide the path to this file in the .env file under the LOCAL_DATA_STORAGE variable.
