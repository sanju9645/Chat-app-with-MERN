# Chat-app-with-MERN
Buildin' a Realtime Chat App with MERN Stack

-----------------------------
Step 1
-----------------------------

Hop into the frontend folder

npm create vite@latest .

recovery@RecoverY/frontend% npm create vite@latest .

Using the period will kickstart a React app right in the current spot

npm i


-----------------------------
Step 2
-----------------------------

Head back..

RecoverY Chat-app-with-MERN% npm init -y


That'll whip up a package.json file, now on to tweakin' it:

-----------------------------
Step 3
-----------------------------

Switch up the "main" from "index.js" to "server.js"

-----------------------------
Step 4
-----------------------------

Load up them dependencies in the main project folder

npm install express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken nodemon

Nodemon ain't needed in the big leagues, so it's just for the devs

npm uninstall nodemon

Then, set up:

npm i nodemon --save-dev

-----------------------------
Step 5
-----------------------------
Now, let's craft up that "server.js" file in the 'backend' folder

Make some edits to the package.json file

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "backend/server.js",
    "dev": "nodemon backend/server.js"
  }




-----------------------------
Step 5
-----------------------------

Time to whip up a .env file

And add "type": "module" in the package.json



https://avatar-placeholder.iran.liara.run/document/#username


-----------------------------
Step 6 - Frontend Dependencies
-----------------------------
Add some tailwind css flavor

https://tailwindcss.com/docs/guides/vite

Toss in some daisy UI
https://daisyui.com/docs/install/

npm i -D daisyui@latest

For that sweet glassmorphism look

https://tailwindcss-glassmorphism.vercel.app/




npm install react-icons --save

Grab some icon code from here,
https://react-icons.github.io/react-icons/


For a touch of toast action

react-hot-toast



-----------------------------
Step 6 - React Router
-----------------------------
npm i react-router-dom

Slip a BrowserRouter in the main.jsx file

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
Once a user logs in, stash it in the local storage for all to see, with 'Context', peep AuthContext

That's your global state right there

You can also kick it up a notch with ZUSTAND

npm install zustand

So when someone taps a chat, we'll save that convo and the messages in a global state using zustand


Next up, craft a hook to snag all them convos



-----------------------------
Step 8 - Installing Socket client on react
-----------------------------

npm i socket.io-client




.env file 

PORT=3000

MONGODB_URI=
JWT_SECRET = gF4&h@#JL!pR3$WzZ7*E^+i%C
JWT_TOKEN_EXPIRY_DAYS=2

NODE_ENV=development






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




Create a free account in render.com

New -> Web Service -> 
Select 'Build and deploy from a Git repository'

