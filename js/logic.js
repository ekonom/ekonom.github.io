
$(document).ready(function(){

	var game = new Game(new Array());
	
	function Game(players){
		this.players = players;
		this.started = false;
		this.time = 1;
		this.current = 0;
		this.sum = 0;
		
		this.create = function(){
			var tmp = "";
			for(var i = 0; i < this.players.length; i++)
				tmp += this.players[i].create((this.current==i)?true:false);
			console.log(tmp);
			return tmp
		}
		this.addPlayer = function(){
			if(this.started) return;
			var p = prompt("Введите имя игрока", "Игрок " + game.players.length);
			if(p != null)
				players.push(new Player(p));
			this.fill();
		}
		this.start = function(){
			if(!this.started){
				if(this.players.length <= 0){
					alert("Сначала добавте игроков");
					return;
				}
				this.started = true;
				this.time = prompt("Введите время игры в минутах", "60");
				this.sum =  this.time * this.players.length;
				$(".price").html("Стоимость мечты = " + this.sum + " тысяч");
				this.players = shuffle(this.players);
				this.players[this.current].isActive = true; 
				this.fill();
				$('.gameContent').css("visibility","visible");
				return;
			}
			if(++this.current == this.players.length) this.current = 0;
			this.fill();
			
			$('.progress-bar').css("width", game.getProcent(game.getCurrent().score) + "%");
			$('.progress-bar').html(game.getProcent(game.getCurrent().score) + "%");
			
			
		}
		this.fill = function(){
			$('#Players').html(this.create());
		}
		this.getCurrent = function(){return this.players[this.current];}
		this.getProcent = function(p){
			return ( p / this.sum * 100).toFixed(2);
		}
		this.isSuccess = function(){
			if(this.getCurrent().score >= this.sum)
				$('.gameContent').html("<div class='alert alert-success' role='alert'>Игрок " + this.getCurrent().name + " победил! Поздравляем!</div>");
		}
	}
	function Player(name){
		this.name = name;
		this.score = 0;
		
		this.create = function(isActive){
			if(isActive)
			return "<li class='list-group-item active'><h5>" + this.name + "<span class='badge pull-right'>" + parseFloat(this.score.toFixed(2)) + "</span></h5></li>\n";
			return "<li class='list-group-item'		  ><h5>" + this.name + "<span class='badge pull-right'>" + parseFloat(this.score.toFixed(2)) + "</span></h5></li>\n";
		}
		this.decrement = function(count){
			this.score -= count;
		}
		this.increment = function(count){
			this.score += count;
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.addPlayer').click(function(){game.addPlayer()});
	$('.startGame').click(function(){
		game.start(); 
		$('.addPlayer').fadeOut();
		$('.startGame').html("Сделать ход"); 
	});
	$('.rashod').click(function(){
		var tmp = parseFloat($(".form-control").val());
		if(isNaN(tmp)) {
			$('#alert').html("<div class='alert alert-danger' role='alert'>Неверно введено число</div>");
			return;
		}
		$('#alert').html("");
		game.getCurrent().decrement(parseFloat(tmp.toFixed(2)));
		$('.progress-bar').css("width", game.getProcent(game.getCurrent().score) + "%");
		$('.progress-bar').html(game.getProcent(game.getCurrent().score) + "%");
		game.fill();
		game.isSuccess();
	});
	$('.dohod').click(function(){
		var tmp = parseFloat($(".form-control").val());
		if(isNaN(tmp)) {
			$('#alert').html("<div class='alert alert-danger' role='alert'>Неверно введено число</div>");
			return;
		}
		$('#alert').html("");
		game.getCurrent().increment(parseFloat(tmp.toFixed(2)));
		$('.progress-bar').css('width', game.getProcent(game.getCurrent().score) + "%");
		$('.progress-bar').html(game.getProcent(game.getCurrent().score) + "%");
		game.fill();
		game.isSuccess();
	});
	
	$('.tratata').click(function(){
		game.players = [new Player("Stas"),
						new Player("Lena"),
						new Player("Egor"),
						new Player("Jenia")];
		game.fill();
	});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function random(min, max) {
		var range = max - min + 1;
		return Math.floor(Math.random()*range) + min;
	}
 
	/* перемешать массив */
	function shuffle(arr) {
		var r_i; // случайный индекс
		var v; // временная переменная
		for (var i = 0; i < arr.length-1; i++) {
			/* получаем случайный индекс (кроме последнего) */
			r_i = random(0, arr.length-1);
			/* меняем местами случайный элемент массива с последним */
			v = arr[r_i];
			arr[r_i] = arr[arr.length-1];
			arr[arr.length-1] = v;
		}
		return arr;
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
});
