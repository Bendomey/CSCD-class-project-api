# UG Residential Application
_Go through these steps to successfully run the `student resedential application server`_
1.  **Create** a `.env` file in the root folder and copy the content of the `.env.sample` file.
_Note: I use a mongodb service that is rendered by mlab_
2.  **Next**, run `npm run dev` or `yarn run dev` to start server.
3. Clone `https://github.com/Bendomey/CSCD-class-project-web.git` repository for the user interface and open login page 

_NB_: ID = `10606785` and PIN = `67252` for logging in as an administrator

## How the system works
1. The application is categorized with two users. Thus the `Administrator` and the `User`
2. The `Administrator`registers student, add halls and their rooms and adds Deparmtents.
3. The  `User` _selects_ their rooms they wish to be in. Room can be _deleted_ too.
