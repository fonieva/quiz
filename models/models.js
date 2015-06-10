var path = require('path');

//Postgress DATABASE_URL = postgres://user:paswd@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);  
var DB_name = (url[6]||null); 
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;
//Cargar el modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite3
var sequelize = new Sequelize(DB_name, user, pwd, 
	{	dialect: protocol, 
		protocol: protocol,
		port: port,
		host: host,
		storage: storage, // solo SQLite (.env)
		omitNull: true }); // solo Postgress

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync crea e inicializa la tabla de pregunas en DB
sequelize.sync().then(function() {
	//success ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){	
		if (count === 0) { //Inicializo la tabla solo si esta vacia
			Quiz.bulkCreate([
				{ pregunta: "Capital de Italia?", respuesta: "Roma" },
				{ pregunta: "Capital de Portugal?", respuesta: "Lisboa" }										
			]).then(function(){console.log("BD inicializada")});
		};
	});
});