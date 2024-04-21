# Chat-app-with-MERN
Build a Realtime Chat App with MERN Stack

-----------------------------
Step 1
-----------------------------

cd frontend

npm create vite@latest .

recovery@RecoverY frontend % npm create vite@latest .

the . will create a react app on the current directory

npm i


-----------------------------
Step 2
-----------------------------

cd ..

recovery@RecoverY Chat-app-with-MERN % npm init -y


This will create the package.json file, on the package.json file, 

-----------------------------
Step 3
-----------------------------

change   "main": "index.js", to "main": "server.js"

-----------------------------
Step 4
-----------------------------

install the dependencies on the main project folder

npm install express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken nodemon

'nodemon' is not required in prod env, so it is dev dependency

npm uninstall nodemon

Run, 

npm i nodemon --save-dev

-----------------------------
Step 5
-----------------------------
Then create this "server.js" file in the 'backend' folder

Edit the package.json file

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "backend/server.js",
    "dev": "nodemon backend/server.js"
  }




-----------------------------
Step 5
-----------------------------

Create .env file

Add "type": "module" in the package.json



https://avatar-placeholder.iran.liara.run/document/#username


-----------------------------
Step 6 - Frontend Dependencies
-----------------------------
Install tailwind css

https://tailwindcss.com/docs/guides/vite

Add daisy UI
https://daisyui.com/docs/install/

npm i -D daisyui@latest

To create glassmorphism

https://tailwindcss-glassmorphism.vercel.app/




npm install react-icons --save

find icon code from here,
https://react-icons.github.io/react-icons/


To use toast

react-hot-toast



-----------------------------
Step 6 - React Router
-----------------------------
npm i react-router-dom

Add BrowserRouter in main.jsx file

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BrowserRouter from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)


-----------------------------
Step 7 - Changing Port
-----------------------------
export default defineConfig({
  plugins: [react()],
  server: {
    port: "5000"
  }
})



-----------------------------
Step 8 - Handling login
-----------------------------
After a user logged in, we need to store it in the local storage and it should be globally available on every page, for that we use 'Context', check AuthContext

Which is a global state

We can also use ZUSTAND for this

npm install zustand

So when the user click on a chat, we will store the clicked conversation and messages on a global state using zustand


Then we need to create a hook to get all conversations



-----------------------------
Step 8 - Installing Socket client on react
-----------------------------

npm i socket.io-client




.env file 

PORT=3000

MONGODB_URI=
JWT_SECRET = gF4&h@#JL!pR3$WzZ7*E^+i%C
JWT_TOKEN_EXPIRY_DAYS=2

MODE_ENV=development






-----------------------------
Deployemnt
-----------------------------


On server.js 

import path from "path";

const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
 (This means any route except starts with 'api/' will render index.html)

when we run npm run build on 'frontend', this will create a dist folder 

On the root directory, edit package.json file

"scripts": {
		"server": "nodemon backend/server.js",
		"start": "node backend/server.js",
    "dev": "nodemon backend/server.js"
		"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
},

		"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
This will run ,
on root, npm install
cd frontend
npm install
npm run build


So, on root folder, just run 'npm run build'
then run 'npm start'

