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