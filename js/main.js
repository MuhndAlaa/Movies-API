// auto call function
selectList("movie/now_playing");
let currentCategeory = "movie/now_playing";

// ***************************** start of Events *****************************

// xmlrequest events
$("#nowPlaying").click(function(){
    selectList("movie/now_playing");
    currentCategeory = "movie/now_playing";
})

$("#popular").click(function(){
    selectList("movie/popular")
    currentCategeory = "movie/popular";
})

$("#topRated").click(function(){
    selectList("movie/top_rated")
    currentCategeory = "movie/top_rated";
})

$("#trending").click(function(){
    selectList("trending/all/day")
    currentCategeory = "trending/all/day";
})


$("#home").click(function(){
    selectList("movie/now_playing");
    currentCategeory = "movie/now_playing";
})

// search events

$("#search").keypress(function(){
    searchMovies(this.value,currentCategeory);
})


// ***************************** end of Events *****************************

// ***************************** start of effects *****************************

let navBtn = false;
$("#toggleBtn").click(function(){
    if(!navBtn){
        $(".nav-toggle").animate({left:"250px"},500);
        $(".nav-menu").animate({left:"0"},500);
        $("#toggleBtn").html("X");
        $("#nowPlaying").animate({top:"0"},800)
        $("#popular").animate({top:"0"},1000)
        $("#topRated").animate({top:"0"},1200)
        $("#trending").animate({top:"0"},1400)
        $("#upcoming").animate({top:"0"},1600)
        $("#contactUs").animate({top:"0"},1800)
        navBtn = true;
    }
    else{
        $(".nav-toggle").animate({left:"0"},500);
        $(".nav-menu").animate({left:"-250px"},500);
        $("#toggleBtn").html(`<div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>`);
        $(".nav-menu-items a").animate({top:"500px"},1000)
        navBtn = false;
    }
})



// ***************************** end of effects *****************************


// ***************************** start of functions *****************************


//request function

async function selectList(categeory) {
    let respones = await fetch(`https://api.themoviedb.org/3/${categeory}?api_key=428738f72b78f80e7d92b4fcfe26ee94`);
    let movies = await respones.json();
    displayMovies(movies.results);
    return movies.results;
}  

function displayMovies(list) {
    let box = ``;
    for(let i = 0; i < list.length; i++) {
        box += `<div class="col-md-6 col-lg-4 my-3 px-3">
                    <div class="movie">
                        <img src="https://image.tmdb.org/t/p/w500/${list[i].poster_path}"
                        class="img-fluid rounded-3" alt="">
                        <div class="movie-overlay rounded-3 d-flex flex-column justify-content-center text-center">
                            <p class="movie-title">${list[i].title}</p>
                            <p class="movie-content">${list[i].overview}</p>
                            <p class="movie-content">rate:${list[i].vote_average}</p>
                            <p class="movie-content">${list[i].release_date}</p>
                         </div>
                    </div>
                </div>`
    }
    document.getElementById("moviesRow").innerHTML = box;
}



//search function

async function searchMovies(searchItem,categeory)
{   
    let respones = await fetch(`https://api.themoviedb.org/3/${categeory}?api_key=428738f72b78f80e7d92b4fcfe26ee94`);
    let list = await respones.json();
    list = list.results
    let box = "";
    for(let i = 0; i < list.length; i++) {
        if(list[i].title.toLowerCase().includes(searchItem.toLowerCase()))
        {
            box += `<div class="col-md-6 col-lg-4 my-3 px-3">
                        <div class="movie">
                            <img src="https://image.tmdb.org/t/p/w500/${list[i].poster_path}" class="img-fluid rounded-3" alt="">
                            <div class="movie-overlay rounded-3 d-flex flex-column justify-content-center text-center">
                                <p class="movie-title">${list[i].title}</p>
                                <p class="movie-content">${list[i].overview}</p>
                                <p class="movie-content">rate:${list[i].vote_average}</p>
                                <p class="movie-content">${list[i].release_date}</p>
                            </div>
                        </div>
                    </div>`
        }     
    }
    document.getElementById("moviesRow").innerHTML = box;
}

// ***************************** end of functions *****************************


