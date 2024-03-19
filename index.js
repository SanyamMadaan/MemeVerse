const container = document.querySelector('.gifs');
let searchbtn=document.querySelector('#search_btn');
let searchbox=document.getElementById('searchbox');

const apiKey = 'sn5SiZ85xMWAYLdOZ3M9kp4Cqfn8raPA';
const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=50`;

async function tranding(){
const response=await fetch(endpoint);
const data=await response.json();
document.getElementById('result_type').innerHTML = "Trending";
container.innerHTML="";
    data.data.forEach(gif => {
      let img = document.createElement('img');
      img.id='images';
      img.src = gif.images.original.url;
      img.alt = gif.title;
      container.appendChild(img);
    });
  }

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
      alert('Redirecting Trending');
      tranding();
      searchbox.innerHTML="";
    } else {
      document.getElementById('result_type').innerHTML = "Your Search";
      container.innerHTML = "";
      searchbox.innerHTML="";
      data.data.forEach(gif => {
        let img = document.createElement('img');
        img.id = 'images';
        img.src = gif.images.original.url;
        img.alt = gif.title;
        container.appendChild(img);
      })
    }
  }
  else{
    container.innerHTML="";
    document.getElementById('result_type').innerHTML = "Trending";
    tranding();
  }
}


document.addEventListener("keydown",(e)=>{
  let keypressed=e.key;
  if (keypressed === "Enter"){ 
    try {
      searchedmemes();
    } catch (e) {
      console.log(e);
      tranding();
    }
  }
  console.log(searchbox.value);
  if(keypressed=="Enter" && searchbox.value==""){
    console.log('inside');
    tranding();
  }
  }
)

searchbtn.addEventListener("click",()=>{
  searchedmemes() 
})

tranding();