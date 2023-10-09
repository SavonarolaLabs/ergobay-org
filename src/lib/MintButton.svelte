	<button style="min-width:400px;"><slot></slot>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
    </button>

    <style>
        * {
	box-sizing: border-box;
}

button {
	border-radius: 12px;
	border: 3px outset #888;
	position: relative;
	display: inline-block;
	padding: 15px 30px;
	color: #eee;
	text-transform: uppercase;
	letter-spacing: 4px;
	overflow: hidden;
	
	box-shadow: 0 0 10px rgb(0, 0, 0, 1);
	font-family: verdana;
	font-size: 28px;
	font-weight: bolder;
	text-decoration: none;
	background:linear-gradient(160deg, #666, #444);
	text-shadow: 0px 0px 2px rgba(0, 0, 0, .5);

	transition: 0.2s;

}
button:active {
	border: 3px outset #ddd;
	color: #fff;
	background: linear-gradient(160deg, #666, #444);
	text-shadow: 0px 0px 4px #ccc;
	box-shadow: 0 0 10px #fff, 0 0 40px #fff, 0 0 80px #fff;
	transition-delay: 1s;
}

button span {
	position: absolute;
	display: block;
}

button span:nth-child(1) {
	top: 0;
	left: -100%;
	width: 100%;
	height: 2px;
	background: linear-gradient(90deg, transparent, #eee);
}
button:active span:nth-child(1) {
	left: 100%;
	transition: 1s;
}
button span:nth-child(2) {
	top: -100%;
	right: 0;
	width: 2px;
	height: 100%;
	background: linear-gradient(180deg, transparent, #eee);
}
button:active span:nth-child(2) {
	top: 100%;
	transition: 1s;
	transition-delay: 0.25s;
}
button span:nth-child(3) {
	bottom: 0;
	right: -100%;
	width: 100%;
	height: 2px;
	background: linear-gradient(270deg, transparent, #eee);
}
button:active span:nth-child(3) {
	right: 100%;
	transition: 1s;
	transition-delay: 0.5s;
}

button span:nth-child(4) {
	bottom: -100%;
	left: 0;
	width: 2px;
	height: 100%;
	background: linear-gradient(360deg, transparent, #eee);
}
button:active span:nth-child(4) {
	bottom: 100%;
	transition: 1s;
	transition-delay: 0.75s;
}

    </style>