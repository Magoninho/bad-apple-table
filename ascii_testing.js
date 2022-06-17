let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let myvideo = document.getElementById("video");
canvas.width = myvideo.width;
canvas.height = myvideo.height;

let sample_size = 5; // "donwscale factor"

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
	document.body.appendChild(table);
	return table;
}

let table = createTable(canvas.width / sample_size, canvas.height / sample_size);


// fills a cell from a table
function fillCell(table, x, y, color) {
	// table.rows[y].cells[x].style.backgroundColor = color;
	table.rows[y].cells[x].innerHTML = color;
}


function getPixelRGB(ctx, x, y) {
	const pixel_data = ctx.getImageData(x, y, 1, 1).data;
	const ascii_map = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

	const grayscale = (pixel_data[0] + pixel_data[1] + pixel_data[2]) / 3;

	let index = Math.floor((grayscale * ascii_map.length) / 255);

	// return `rgb(${pixel_data[0]}, ${pixel_data[1]}, ${pixel_data[2]})`;
	// return `rgb(${grayscale}, ${grayscale}, ${grayscale})`;
	return `<span style="color: rgb(${pixel_data[0]}, ${pixel_data[1]}, ${pixel_data[2]})">${ascii_map.charAt(index)}</span>`;
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
		requestAnimationFrame(loop)
	}
	requestAnimationFrame(loop);
})

