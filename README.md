\# Richfield Connect - Student Social Platform



Richfield Connect is a responsive, single-page React web application designed for students to interact, share posts, and manage their profiles. Built with React, React Router, and the React Context API with Local Storage persistence.



\---



\##  Student Details



Student Name:

Student ITS Number:

Qualification:

Module: Web Development (React.js)



\---



\##  Features \& Components Structure



The application consists of 5 main views and modular components structured as follows:



\### \*\*Views (`/src/views`)\*\*

\* \*\*Home (`/`):\*\* Hero section welcoming students with quick nav links.

\* \*\*About (`/about`):\*\* Overview of the Richfield Connect platform mission and features.

\* \*\*SignUp (`/signup`):\*\* Interactive user registration form with live state validation.

\* \*\*Profile (`/profile`):\*\* User profile page with editable information.

\* \*\*Feed (`/feed`):\*\* Main community feed where students can view and publish posts.



\### \*\*Components (`/src/components`)\*\*

\* `Navbar`: Navigation bar present across all views.

\* `Footer`: Responsive page footer with links and institutional branding.

\* `CreatePost`: Form allowing users to submit new posts to the feed.

\* `Post`: Individual post cards displaying user, content, and timestamp.

\* `ProfilePreview`: Lightweight preview card displaying user profile metrics.



\### \*\*State Management \& Persistence (`/src/context`)\*\*

\* `AppContext.jsx`: React Context API implementation managing global state for registered users, active sessions, and post feeds. Includes automatic sync with `localStorage`.



\---



\##  Prerequisites \& Installation



Ensure you have \*\*Node.js\*\* (v18 or higher) installed on your machine.



\### \*\*1. Clone or Extract Project\*\*

Unzip the `connect.zip` archive to your local working directory.Like VsCode 



\### \*\*2. Install Dependencies\*\*

Open your terminal in the project root folder and run:



```bash

npm install





Once started, open your browser and navigate to the provided local URL



