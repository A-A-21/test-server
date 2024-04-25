// require("@babel/register")
const express = require('express');
// const React = require("react")
// const ReactDOMServer = require("react-dom/server")
const fs = require('fs');
const CORS = require('cors');
// const MainPage = require("./src/components/MainPage/MainPage")
// const { Post, User } = require("./db/models")

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));
app.use(CORS());

// User.create({name: "Thomas"})

app.get('/todos', (req, res) => {
	try {
		const todos = fs.readFileSync('./db.json', 'utf-8');
		res.json(JSON.parse(todos));
	} catch (e) {
		console.error(e);
	}
});

app.post('/todo', async (req, res) => {
	try {
		const newTodo = req.body;
		const todos = fs.readFileSync('./db.json', 'utf-8');
		const newTodos = JSON.parse(todos);
		newTodos.push(newTodo);
		fs.writeFileSync('./db.json', JSON.stringify(newTodos));
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
	}
});

app.delete('/todo/:uuid', async (req, res) => {
	try {
		const todos = fs.readFileSync('./db.json', 'utf-8');
		let newTodos = JSON.parse(todos);
		newTodos = newTodos.filter(todo => todo.uuid !== req.params.uuid);
		fs.writeFileSync('./db.json', JSON.stringify(newTodos));
		res.sendStatus(200);
	} catch (error) {
		console.log('ERROR WHILE CREATE POST: ', error);
	}
});

// CREATE
// READ
// UPDATED
// DELETE

// CRUD

app.listen(PORT, () => {
	console.log('SERVER STARTED ON PORT: ', PORT);
});
