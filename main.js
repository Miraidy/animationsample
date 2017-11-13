var animationSample = new function(){
	
	var parent = this;

	var movingObjects = [];

	this.svgName = 'star'; //the svg can be changed here
	this.objectCount = 50;
	this.increment = 8; // x function increment, so it can be used to change the speed
	this.interval = 40; // the setInterval param to call the timer function to move the elements
	this.xDeltaMax = 800; //x initial position variation so every object is not in the same position
	this.yDeltaMax = 100; // y initial position variation...
	this.movementFunction = movementFunction1; //movement function

	var intervalId;
	this.clear = function(){
		clearInterval(intervalId);
		document.getElementsByClassName("objectBox")[0].innerHTML = "";
		movingObjects = [];
	}

	this.start = function (){
		parent.clear();
		
		var svgElement = document.getElementsByClassName(parent.svgName)[0];
		
		for (var i = 0; i < parent.objectCount; i++){
			movingObjects.push(new movingObject());
		}
		
		//"class" movingObject
		function movingObject(){
		
			//construction
			var xDelta = parent.xDeltaMax * Math.random();
			var yDelta = parent.yDeltaMax * Math.random();
			var xInitialPosition = -1 * xDelta;
			var yInitialPosition = window.innerHeight/2 + yDelta;
			
			var element = svgElement.cloneNode(true);
				//initial position
			element.style.left = xInitialPosition + 'px';
			element.style.top = yInitialPosition + 'px';
				//adding element
			document.getElementsByClassName('objectBox')[0].appendChild(element); 
			
			this.getElement = function(){
				return element;
			}
			
			this.advance = function(){
				var windowWidth = window.innerWidth;
				var windowHeight = window.innerHeight;
				var x = element.style.left;
				var y = element.style.top;

				x = Number(x.replace('px', '')) + parent.increment;
				y = yInitialPosition + parent.movementFunction(x);
				
				if (x > windowWidth){
					//go to initial position
					xDelta = parent.xDeltaMax * Math.random();
					yDelta = parent.yDeltaMax * Math.random();
					xInitialPosition = -1 * xDelta;
					yInitialPosition = windowHeight/2 + yDelta;
					x = xInitialPosition;
					y = yInitialPosition;
				}
				element.style.left = x + 'px';
				element.style.top = y + 'px';
			}
		}
	
		function moveObjects(){			
			for (var j = 0; j < parent.objectCount; j++){
				movingObjects[j].advance();
			}
		}
		
		intervalId = setInterval(moveObjects, parent.interval);
	};


};

function movementFunction1(x){
	return 100 * ( Math.sin(x/200));
}
function movementFunction2(x){
	return 100 * ( Math.sin(x/20));
}
function movementFunction3(x){
	return 400 * ( Math.sin(x/200));
}
function movementFunction4(x){
	return 1/2 * x * ( Math.sin(x/80));
}
function movementFunction5(x){
	return -(x * x)/5000;
}

animationSample.start();

document.getElementById("default").onclick = function() {
	animationSample.svgName = 'star';
	document.getElementById("svgName").value = animationSample.svgName;
	animationSample.objectCount = 50;
	document.getElementById("objectCount").value = animationSample.objectCount;
	animationSample.increment = 8; 
	document.getElementById("increment").value = animationSample.increment;
	animationSample.interval = 40;
	document.getElementById("interval").value = animationSample.interval;
	animationSample.xDeltaMax = 800;
	document.getElementById("xDeltaMax").value = animationSample.xDeltaMax;
	animationSample.yDeltaMax = 100; 
	document.getElementById("yDeltaMax").value = animationSample.yDeltaMax;
	animationSample.movementFunction = movementFunction1;
	document.getElementById("movementFunction").value = "movementFunction1";
	animationSample.start();
};

document.getElementById("increment").onchange = function() {
	animationSample.increment = Number(this.value);
};

document.getElementById("yDeltaMax").onchange = function() {
	animationSample.xDeltaMax = Number(this.value);
};

document.getElementById("yDeltaMax").onchange = function() {
	animationSample.yDeltaMax = Number(this.value);
};

document.getElementById("objectCount").onchange = function() {
	animationSample.objectCount = Number(this.value);
	animationSample.start();
};

document.getElementById("interval").onchange = function() {
	animationSample.interval = Number(this.value);
	animationSample.start();
};

document.getElementById("svgName").onchange = function() {
	animationSample.svgName = this.value;
	animationSample.start();
};

document.getElementById("movementFunction").onchange = function() {
	animationSample.movementFunction = window[this.value];
	animationSample.start();
};