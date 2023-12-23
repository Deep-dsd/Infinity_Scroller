const count = 30;
const apiKey = "Unsplash Api Key";

//Unsplash api
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainerEl = document.querySelector("#img-container");
const loaderEl = document.querySelector("#loader");

let imageArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let isReady = false;

const imageLoader = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loaderEl.hidden = true;
    isReady = true;
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const showImages = () => {
  imagesLoaded = 0;
  totalImages = imageArray.length;
  imageArray.forEach((image) => {
    const imageLink = document.createElement("a");

    setAttributes(imageLink, { href: image.links.html, target: "_blank" });

    const imageElement = document.createElement("img");

    setAttributes(imageElement, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });

    imageElement.addEventListener("load", imageLoader);

    imageLink.appendChild(imageElement);
    imageContainerEl.appendChild(imageLink);
  });
};

const dataFetcher = async () => {
  try {
    const resp = await fetch(apiUrl);
    imageArray = await resp.json();
    showImages();
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isReady
  ) {
    dataFetcher();
    isReady = false;
  }
});

dataFetcher();
