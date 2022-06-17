let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let myvideo = document.getElementById("video");
canvas.width = myvideo.width;
canvas.height = myvideo.height;
let sample_size = parseInt(prompt("pixel scale:")); // "donwscale factor"

if (isNaN(sample_size)) sample_size = 5;


function createTable(width, height) {
	var table = document.createElement('table');
	var tableBody = document.createElement('tbody');

	for (let y = 0; y < height; y++) {
		let row = table.insertRow(y);
		for (let x = 0; x < width; x++) {
			row.insertCell(x);
		}
	}

	table.appendChild(tableBody);
	return table;
}


let table = createTable(canvas.width / sample_size, canvas.height / sample_size);


// fills a cell from a table
function fillCell(table, x, y, color) {
	table.rows[y].cells[x].style.backgroundColor = color;
}


function getPixelRGB(ctx, x, y) {
	const pixel_data = ctx.getImageData(x, y, 1, 1).data;
	return `rgb(${pixel_data[0]}, ${pixel_data[1]}, ${pixel_data[2]})`;
}

myvideo.addEventListener("play", function () {
	let frame = myvideo;
	function loop() {
		ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
		for (let y = 0; y < myvideo.height; y += sample_size) {
			for (let x = 0; x < myvideo.width; x += sample_size) {
				// dividing by sample size because the table size is already downscaled
				fillCell(table, x / sample_size, y / sample_size, getPixelRGB(ctx, x, y));

			}
		}
		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);
});

document.body.appendChild(table);