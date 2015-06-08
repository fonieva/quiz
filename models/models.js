var path = require('path');

//Cargar el modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite3
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite" });

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync crea e inicializa la tabla de pregunas en DB
sequelize.sync().success(function() {
	//success ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0) { //Inicializo la tabla solo si esta vacia
			Quiz.create({ 
				pregunta: "Capital de Roma?", 
				respuesta: "Roma" 
			}).success(function(){console.log("BD inicializada")});
		};
	});
});