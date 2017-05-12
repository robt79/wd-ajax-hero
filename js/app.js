(function() {
  'use strict';

  let movies = [];


  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };






  //ADD YOUR CODE HERE

  //Listen for submissions and prevent default
  //validate user input not blank
  //clear previous search results
  //send an HTTP request to OMDB api search endpoint
  //handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array.
  //render movies array to page by calling renderMovies() function with no arguments
  $('form').on('submit', function(event) {
    event.preventDefault();
    movies = [];

    if ($("#search")[0].value === "") {
      Materialize.toast('Enter a movie', 5000);
    } else {

      let userInput = $('#search')[0].value;
      let $xhr = $.getJSON('http://www.omdbapi.com/?s=' + userInput);
      $xhr.done(function(data) {
        if ($xhr.status !== 200) {
          return;
        }
        for (let i = 0; i < data.Search.length; i++) {
          if (data.Search[i].Title === undefined) {
            alert('invalid movie name')
          } else {
            let movie = {
              id: data.Search[i].imdbID,
              poster: data.Search[i].Poster,
              tile: data.Search[i].Title,
              year: data.Search[i].Year
            }
            //console.log(movies);

            movies.push(movie);
          }
        }

        renderMovies();
      });
    }
  });




})();
