const container = document.querySelector('.gifs');
let searchbox=document.getElementById('searchbox');

const apiKey = 'sn5SiZ85xMWAYLdOZ3M9kp4Cqfn8raPA';
const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=50`;

async function tranding(){
const response=await fetch(endpoint);
const data=await response.json();
    data.data.forEach(gif => {
      let img = document.createElement('img');
      img.id='images';
      img.src = gif.images.original.url;
      img.alt = gif.title;
      container.appendChild(img);
    });
  }
tranding();

document.addEventListener("keydown",(e)=>{
  let keypressed=e.key;
  if (keypressed == "Enter") {
    async function searchedmemes() {
      let find = searchbox.value;
      if (find) {
        const url = `http://api.giphy.com/v1/gifs/search?q=${find}&api_key=${apiKey}&limit=50`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.data.length === 0) { // Check if data.data is empty
          document.getElementById('result_type').innerHTML = "";
          container.innerHTML="";
          alert('No memes found for your search!');
        } else {
          document.getElementById('result_type').innerHTML = "Your Search";
          container.innerHTML = "";
          data.data.forEach(gif => {
            let img = document.createElement('img');
            img.id = 'images';
            img.src = gif.images.original.url;
            img.alt = gif.title;
            container.appendChild(img);
          })
        }
      } else {
        document.getElementById('result_type').innerHTML = "Trending";
        container.innerHTML = "";
        tranding();
      }
    }
  
    try {
      searchedmemes();
    } catch (e) {
      console.log(e);
    }
  }
  
})
