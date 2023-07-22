import '../style/main.scss';
import axios from 'axios';

// constants (API CREDENTIALS)
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL
const API_HOST = import.meta.env.VITE_API_HOST

const userPrompt = document.getElementById("userPrompt");
const gallery = document.getElementById("gallery");
const form = document.getElementById("form");
const loader = document.getElementById("loader");

form.addEventListener('submit', (e)=>{
   e.preventDefault();
   getImages();
})

async function getImages() {
   gallery.replaceChildren();
   loader.style.display = "block";
   const options = {
      method: "POST",
      url: API_URL,
      headers: {
         'content-type': 'application/json',
         'X-RapidAPI-Key': API_KEY,
         'X-RapidAPI-Host': API_HOST
      },
      data: {
         prompt: userPrompt.value,
         page: 1
      },
   }
   axios.request(options).then(res => {
      
      const unshuffledImages = res.data.results.images;
      const images = unshuffledImages
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 6)
      

      for(let image of images){
         let figure = document.createElement("figure");
         figure.className = "gallery__item";
         let img = document.createElement("img");
         img.className = "gallery__img";
         img.src = image;
         figure.appendChild(img);
         gallery.appendChild(figure);
      }
      loader.style.display = "none";

   }).catch(err => {
      console.log(err);
      loader.style.display = "none";
   });
};