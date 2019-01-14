var app={
	inicio:function(){
		this.iniciarFast();
		this.iniciarBotones();
	},

	iniciarFast: function(){
		FastClick.attach(document.body);
	},

	iniciarBotones: function(){
		var buttonAction = document.querySelector('#button-action');
		buttonAction.addEventListener('click',this.tomarFoto);

		var botonesFiltro = document.querySelectorAll('.button-filter');
		botonesFiltro[0].addEventListener('click', function(){
			app.aplicarFiltro('gray');
		});

		botonesFiltro[1].addEventListener('click', function(){
			app.aplicarFiltro('negative');
		});

		botonesFiltro[2].addEventListener('click', function(){
			app.aplicarFiltro('sepia');
		});

		var botonGaleria = document.querySelector('#button-gallery');
		botonGaleria.addEventListener('click', function(){
			app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
		});
	},

	cargarFoto: function(pictureSourceType){
		var opciones = {
			quality:50,
			sourceType: pictureSourceType,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight: 300,
			correctOrientacion: true
		};
		navigator.camera.getPicture(app.fotoCargada, app.errorCargar, opciones);
	},

	fotoCargada: function(imageURI){
		var img = document.createElement('img');
		img.onload = function(){
			app.pintarFoto(img);
		}
		img.src = imageURI;
	},

	tomarFoto: function(){
		var opciones={
			quality:50,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight: 300,
			correctOrientacion: true
		};
		navigator.camera.getPicture(app.Tomada, app.errorFoto, opciones);
	},

	Tomada: function(imageURI){
		var img = document.createElement('img');
		img.onload = function(){
			app.pintarFoto(img);
		}
		img.src = imageURI;
	},

	pintarFoto: function(img){
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0, img.width, img.height);
	},

	errorFoto: function(message){
		console.log('Fallo al tomar la foto o la toma fue cancelada : ' + message);
	},

	errorCargar: function(message){
		console.log('Fallo al cargar la imagen : ' + message);
	},

	aplicarFiltro: function(filterName){
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		datosImagen = context.getImageData(0, 0, canvas.width, canvas.height);

		effects[filterName](datosImagen.data);

		context.putImageData(datosImagen, 0 , 0);
	}
};

var datosImagen;
if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
}