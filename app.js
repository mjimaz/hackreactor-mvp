var app = angular.module('tvshows', []);

app.controller('MoviesController', function($scope, $http) {

	/*

	https://api.themoviedb.org/3/movie/550?api_key=8353f37b04124bdd138f12db75c775dd

	search for tv shows
	http://api.themoviedb.org/3/search/tv?api_key=API_KEY&query=game
	
	*/
	$scope.getMovie = function() {
		console.log('running getmovie');
	return $http({
		method: 'GET',
    url: 'http://api.themoviedb.org/3/search/tv?api_key=8353f37b04124bdd138f12db75c775dd&query=the walking dead',
	 })
   .then(function (resp) {
   	console.log('The data:', resp.data)
     return resp.data;
    });
  }

});