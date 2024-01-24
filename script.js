let highestZ = 1;

class Paper {
	holdingPaper = false;
	mouseTouchX = 0;
	mouseTouxhY = 0;
	mouseX = 0;
	mouseY = 0;
	prevMouseX = 0;
	prevMouseY = 0;
	velX = 0;
	velY = 0;
	rotation = Math.random() * 30 - 15;
	currentPaperX = 0;
	currentPaperY = 0;
	rotating = false;

	init(paper) {
		document.addEventListener("mousemove", (e) => {
			if (!this.rotating) {
				this.mouseX = e.clientX;
				this.mouseY = e.clientY;
				this.velX = this.mouseX - this.prevMouseX;
				this.velY = this.mouseY - this.prevMouseY;
			}

			const dirX = e.clientX - this.mouseTouchX;
			const dirY = e.clientY - this.mouseTouxhY;

			const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);

			const dirNormalizedX = dirX / dirLength;
			const dirNormalizedY = dirY / dirLength;

			const angle = Math.atan2(dirNormalizedY, dirNormalizedX);

			let degrees = (180 * angle) / Math.PI;

			degrees = (360 + Math.round(degrees)) % 360;

			if (this.rotating) this.rotation = degrees;

			if (this.holdingPaper) {
				if (!this.rotating) {
					this.currentPaperX += this.velX;
					this.currentPaperY += this.velY;
				}
				this.prevMouseX = this.mouseX;
				this.prevMouseY = this.mouseY;

				paper.style.transform = `translateX(${this.currentPaperX}px translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg))`;
			}
		});

		paper.addEventListener("mousedown", (e) => {
			if (this.holdingPaper) return;
			this.holdingPaper = true;

			paper.style.zIndex = highestZ;
			highestZ + 1;

			if (e.button === 0) {
				this.mouseTouchX = this.mouseX;
				this.mouseTouxhY = this.mouseY;
				this.prevMouseX = this.mouseX;
				this.prevMouseY = this.mouseY;
			}

			if (e.button === 2) {
				this.rotating = true;
			}
		});

		window.addEventListener("mouseup", (e) => {
			this.holdingPaper = false;
			this.rotating = false;
		});

		// For two-finger rotation on touch screens
		paper.addEventListener("gesturestart", (e) => {
			e.preventDefault();
			this.rotating = true;
		});
		paper.addEventListener("gestureend", () => {
			this.rotating = false;
		});
	}
}

const papers = Array.from(document.querySelector(".paper"));
papers.forEach((paper) => {
	const p = new Paper();
	p.init(paper);
});
