# Online-retail-system

an ORS or Online Ordering system I'm making for a school project with my classmates

# Pre-requisites

- NodeJS
- Xampp or you can use whatever mysql server you want.

# Note

I'm honestly not sure how people structure their projects ( I have no experience and is open to suggestions and criticism), so I'll just do whatever put both in one repository. Backend and Frontend will be in their own folders. I will just try to keep commits as clean as possible.

- Backend
- Fronted (GUI)
  - Staff App or the administrator's application
  - User App or the commercial website

I decided to use VueJS + Vuetify for frontend and ExpressJS for backend in this project as its a painless frameworks to use.

# Running

Backend and frontend are separate applications, cuz my senior says so.

**Step 1.1**

We will need to setup backend first.

You will need to create a file named `.env` in the backend root directory with your MYSQL and File Server credentials.

See?

![output0](/assets//o0.png)

Then you paste this within that file you created with your credentials:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PORT=3306
MYSQL_PASS=
MYSQL_DB=name_of_your_database_here
FILE_SERVER_PORT=8080
FILE_SERVER_ADDRESS=localhost
```

**Step 1.2**

You will need to setup the database, obviously. For now, the script for creating one is not provided but I will in the future as at the moment it is subject to constant change. I'm the only writing the code, have mercy lol

**Step 1.3**

Run the mysql database server then run the `startBackend.bat`, this script will install the needed NodeJs libraries and run backend application in development mode ( you can change it if you want). If all goes well, It'll run with no errors and if there was... please let me know.

You should see a CMD window pop up with the following output:

![output1](/assets//o1.png)

CONGRATS! our backend is running. haha..

**Step 2.0**

Now the frontend, honestly there's nothing much here...
You just need to run `startFrontend.bat` and it will run the frontend application in development mode.

Default username and password is `admin`. For development purposes, it is hardcoded cuz its currently not the priority and its a pain to keep changing cuz as I said, I keep changing the database... means I constantly wipe and rewrite it lol.

However, you can change the default credentials in `ors-staffapp/src/store/app.js` under `useCredentialsStore`.

# TODO

- [ ] Add a script for creating the database

- [ ] Add a proper logging system for backend (maybe winston or I could Just make my own.. i can't be that hard... right?)

- [ ] Add a proper error handling system

- [ ] Honestly, I'm not sure what else to add...
