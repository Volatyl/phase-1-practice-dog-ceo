console.log("%c HI", "color: firebrick");

window.addEventListener("DOMContentLoaded", () => {
    displayImages();
  displayBreed(null); // Call displayBreed() with null to display all breeds initially
  const dropdown = document.getElementById("breed-dropdown");
  dropdown.addEventListener("change", () => {
    const selectedAlphabet = dropdown.value;
    displayBreed(selectedAlphabet);
  });
});

//function to display images
function displayImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((res) => res.json())
    .then((data) => {
      const images = data.message;
      images.forEach((image) => {
        const imageContainer = document.getElementById("dog-image-container");
        const imagesEl = document.createElement("div");
        imagesEl.innerHTML = `
          <img src="${image}" style="width: 200px"/>
        `;

        imageContainer.appendChild(imagesEl);
      });
    });
}

//function to display breed
function displayBreed(selectedAlphabet = null) {
  // Accept selectedAlphabet as an optional parameter with default value of null
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((data) => {
      const breeds = data.message;
      const ul = document.getElementById("dog-breeds");
      ul.innerHTML = "";
      console.log(selectedAlphabet)
      for (const breed in breeds) {
        if (
          !selectedAlphabet || // Display all breeds if selectedAlphabet is null
          breed.charAt(0).toLocaleLowerCase() ===
            selectedAlphabet.toLocaleLowerCase()
        ) {
          const li = document.createElement("li");
          li.textContent = breed;
          ul.appendChild(li);

          li.addEventListener("click", (e) => {
            console.log(e.target.textContent);
            e.target.style.color = "red";
          });
        }
      }
    });
}
