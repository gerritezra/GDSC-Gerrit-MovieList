const mainUrl = 'https://api.themoviedb.org/3/';
const apiKey = '1d2c306bdbd50caa1c4dc11301c06f4c';
const apiReadKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDJjMzA2YmRiZDUwY2FhMWM0ZGMxMTMwMWMwNmY0YyIsInN1YiI6IjYxN2JmY2IyZDIzNmU2MDA2NTA1NmJiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yO7s9o4gsCOySpPnELmWYdh5AyadHAPfZx8N-zChv9s';

function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        type: 'get',
        dataType: 'json',
        data: {
            'api_key': apiKey,
            'query': $('#search-input').val()
        },
        success: function (result) {
                let movies = result.results;
            if (result.total_results !== 0) {
                $.each(movies, function (i, data) {
                    // console.log(data);
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="card-img-top" alt="Movie poster">
                                <div class="card-body">
                                <h5 class="card-title">${data.original_title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.release_date}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Rating :<b>${data.vote_average}</b></h6>
                                <a href="#" class="card-link see-detail2" data-toggle="modal" data-target="#exampleModal" data-id="${data.id}" data-url="https://api.themoviedb.org/3/movie/${data.id}">Selengkapnya</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h3 class="text-center">Maaf Pencarian Anda Tidak Ditemukan <br/> Silakan Cari Film Lain </h3>
                    </div>
                `)
            }
                
        },
        error: (xhr) => {
            $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'i' : 'tt3896198',
            'apikey': 'e311c4d8',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                                    <li class="list-group-item">Released : `+ movie.Released + `</li>
                                    <li class="list-group-item">Genre : `+ movie.Genre + `</li>                 
                                    <li class="list-group-item">Director : `+ movie.Director + `</li>                 
                                    <li class="list-group-item">Director : `+ movie.Actors + `</li>                 
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

            }
        }
    });

});

$(document).ready(function () {
    index();
})

function index() {
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/popular',
        type: 'get',
        dataType: 'json',
        data: {
            // 'i' : 'tt3896198',
            'api_key': apiKey,
            // 'language': '   '
        },
        success: function (result) {
            // alert("asdads");
            let movies = result.results;
            // conosle.log(movies)
            $.each(movies, function (i, data) {
                // console.log(data);
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="card-img-top" alt="Movie poster">
                                <div class="card-body">
                                <h5 class="card-title">${data.original_title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.release_date}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Rating :<b>${data.vote_average}</b></h6>
                                <a href="#" class="card-link see-detail2" data-toggle="modal" data-target="#exampleModal" data-id="${data.id}" data-url="https://api.themoviedb.org/3/movie/${data.id}">Selengkapnya</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

            $('#search-input').val('');

        },
        error: () => {
            $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">Ga ada</h1>
                    </div>
                `)
        }
    });
}

$('#movie-list').on('click', '.see-detail2', function () {
    const url = $(this).data("url")
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        data: {
            'api_key': apiKey,
        },
        success: function (movie) {
            console.log(movie);
            $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>${movie.original_title}</h3></li>
                                <li class="list-group-item">Tanggal Rilis : `+ movie.release_date + `</li>
                                <li class="list-group-item">Bahasa : `+ movie.original_language + `</li>                 
                                <li class="list-group-item">Durasi : `+ movie.runtime + ` menit</li>                 
                                <li class="list-group-item">Sinopsis : `+ movie.overview + `</li>                 
                            </ul>
                        </div>
                    </div>
                </div>
            `);

        }
    });

});

$("body").on("click", "#kembali", function (e) {
    e.preventDefault();
    $('#movie-list').html('');

    index();
})