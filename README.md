# Employee Management System

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#what-is-employee-madness">What is employee madness?</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built with</a>
      <ul>
        <li><a href="#server-side">Server side</a></li>
        <li><a href="client-side">Client side</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
		 <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#server-side">Server side</a></li>
       <li><a href="#client-side">Client side</a></li>
     </ul>
    </li>
  </ol>
</details>

## About the project
![About The Project Screenshot][starting-image]
### What is employee madness?

This project was a task during my studies at Codecool. <br>
Employee Madness is a full-stack web application built using Node.js, Express, MongoDB, and React. It allows you to manage employee data, including adding, updating, and deleting employee records. <br>
The project consists of both a server and a client-side application. The server is responsible for handling CRUD (Create, Read, Update, Delete) operations on employee data, while the client-side application provides a user-friendly interface for interacting with the data. <br>
Employee Madness has several branches, and each of them has some different features, but the basics of the applictaion is the same everywhere.

### Features
<ul>
  <li>Add new employees with various details.</li>
  <li>Update employee information.</li>
  <li>Delete employee records.</li>
  <li>View a list of all employees.</li>
  <li>Navigate between different pages using React Router.</li>
  <li>Server API for handling employee data.</li>
</ul>

#### Journey tasks branch
<ul>
  <li>The list of the employees are filterable by their Position and Level.</li>
  <li>The list of the employees are arrangeable by their First name, Last name, Middle name, Position and Level.</li>
  <li>There is also an equipment entity which is editable from the client side.</li>
  <li>There is a checkbox next to every employee indicating whether the given employee is present.</li>
  <li>There is pagination at the bottom of the screen.</li>
</ul>

#### PA practice 1 branch
<ul>
  <li>There is a confirmation for the delete action.</li>
</ul>

#### PA practice 2 branch
<ul>
  <li>You can also store employee's starting date, current salary, favourite color and desired salary.</li>
  <li>The background color of the row of an employee is actually the employee's favourite color.</li>
</ul>

![Employee List Screenshot][favourite-color-image]

#### PA practice 4 branch
<ul>
  <li>Employee's salaray is randomly generated between 20 and 60.</li>
  <li>There is a "/top-paid" route that shows the 3 highest-salary employees.</li>
</ul>

#### PA practice 5 branch
<ul>
  <li>You can now also store tools besides employees, which are listed at "/tools" route.</li>
  <li>Tools are filterable based on their names.</li>
</ul>

#### PA practice 6 branch
<ul>
  <li>You can store kittens for each employee.</li>
  <li>There is a button next to each employee that leads to the "/kittens/:employeeId" route.</li>
</ul>

#### PA practice 7 branch
<ul>
  <li>Same functionalities like at the previous branch, but in the database kittens are stored with reference fields.</li>
</ul>

#### PA practice 8 branch
<ul>
  <li>You can also store board games.</li>
  <li>You can choose a favourite board game for each employee from a dropdown list.</li>
</ul>

![Update Employee Screenshot][board-game-image]

## Built with
### Server side
* [![NodeJS][node.js]][node-url]
* [![Express.js][express.js]][express-url]
* [![MongoDB][mongoDB]][mongoDB-url]

### Client side
* [![React][react.js]][react-url]
* [![React Router][reactRouter]][reactRouter-url]

## Getting started
### Prerequisites
<ul>
  <li>Node.js installed on your machine.</li>
  <li>MongoDB set up and running.</li>
</ul>
  
### Server side

#### 1. Install dependencies
```bash
cd ./server
npm install
```

#### 2. .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connection url.

#### 3. Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database.

#### 4. Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

#### 5. Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



### Client side

#### 1. Install dependencies

```bash
cd ./client
npm install
```

#### 2. Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

#### 3. Runnig the code

```bash
cd ./client
npm start
```

Open your web browser and visit http://localhost:3000 to access the Employee Management System.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en
[express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com/
[mongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongoDB-url]: https://www.mongodb.com/
[react.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-url]: https://react.dev/
[reactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[reactRouter-url]: https://reactrouter.com/en/main
[favourite-color-image]: images/screenshot1.png
[board-game-image]: images/screenshot2.png
[starting-image]: images/screenshot3.png

