//requirenment: constant array of image file names
const imageFiles = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

// select required elements
const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");
 
 // requirement: loop starting at 1
 for (let i=1; i <= imageFiles.length; 
		i++)
		{ 
		// create thumbnail <img>
		const newImage = document.createElement("img");
		newImage.src = `https://mdn.github.io/shared-assets/images/examples/learn/gallery/pic${i}.jpg`;
		newImage.alt= `Thumbnail ${i}`;
		
		// add thumbnail to page
		thumbBar.appendChild(newImage);

		//requirenment: add click event listner to each thumbnail
		newImage.addEventListener("click", () => {
			displayedImage.src = newImage.src;
			displayedImage.alt = newImage.alt;});
}
// requirenment: lighten/darken button logic
btn.addEventListener("click", () => {
	const btnClass = btn.getAttribute("class");
	if (btnClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
	} else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
	}

});