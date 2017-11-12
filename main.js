(function startAnimation(){
				
	var svgName = 'star'; //the svg can be changed here
	var svgElement = document.getElementsByClassName(svgName)[0];
	var objectCount = 100;
	var movingObjects = [];
	var increment = 8; // x function increment, so it can be used to change the speed
	var interval = 40; // the setInterval param to call the timer function to move the elements
	var xDeltaMax = 500; //x initial position variation so every object is not in the same position
	var yDeltaMax = 100; // y initial position variation...
	
	for (var i = 0; i < objectCount; i++){
		movingObjects.push(new movingObject());
	}
	
	//"class" movingObject
	function movingObject(){
	
		//construction
		var xDelta = xDeltaMax * Math.random();
		var yDelta = yDeltaMax * Math.random();
		var xInitialPosition = -1 * xDelta;
		var yInitialPosition = window.innerHeight/2 + yDelta;
		
		var element = svgElement.cloneNode(true);
			//initial position
		element.style.left = xInitialPosition + 'px';
		element.style.top = yInitialPosition + 'px';
			//adding element
		document.getElementsByClassName('objectBox')[0].appendChild(element); 
		//construction-end
		
		this.getElement = function(){
			return element;
		}
		
		this.advance = function(){
			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;
			var x = element.style.left;
			var y = element.style.top;

			x = Number(x.replace('px', '')) + increment;
			y = yInitialPosition + 100 * ( Math.sin(x/200));
			
			if (x > windowWidth || y > windowHeight){
				//go to initial position
				xDelta = xDeltaMax * Math.random();
				yDelta = yDeltaMax * Math.random();
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
		for (var j = 0; j < objectCount; j++){
			movingObjects[j].advance();
		}
	}
	
	setInterval(moveObjects, interval);
})()