var models = require('../models/models.js');


//Factorizar el codigo si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz){
			req.quiz = quiz;
			next();
		} else { next(new Error("No existe quizId = " + quizId));	}
	}).catch(function(error) { next(error); });
};

// GET index
exports.index = function(req, res, next){
	if (req.query.search){
		var search = '%' + req.query.search.replace(/\s/g,"%") + '%';
		models.Quiz.findAll({ 
	 		where: ["pregunta like ?", search], 
 			order: [['pregunta', 'ASC']]
 		}).then(function(quizes){
	 		res.render('quizes/index', { quizes: quizes });
	 	}).catch(function(error) { next(error); });
	} else {
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', { quizes: quizes });
		}).catch(function(error) { next(error); });
	}
};

//GET /quizes/:id
exports.show = function(req, res) {	
	res.render('quizes/show', { quiz: req.quiz });	
};


//GET /quizes/:id/answer
exports.answer = function(req, res){
	if (req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'});
	}		
};

 //GET /author
exports.author = function(req, res){
	res.render('author', {author: "Francisco José Onieva"});
};
