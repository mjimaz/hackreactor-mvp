var app = angular.module('tvshows', []);

app.factory('IMDBapi', function($http) {

	/*

	https://api.themoviedb.org/3/movie/550?api_key=8353f37b04124bdd138f12db75c775dd

	search for tv shows
	http://api.themoviedb.org/3/search/tv?api_key=API_KEY&query=game
	
	*/
  var searchTVShow = function( tvshow ) {
    return $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/search/tv?api_key=8353f37b04124bdd138f12db75c775dd&query='+tvshow,
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    searchTVShow: searchTVShow,
  }; 

});  // end of factory IMDBapi

app.controller('TVShowsController', function($scope, IMDBapi) {

	$scope.tvshows;

  $scope.getTVShow = function( tvshow ) {
    IMDBapi.searchTVShow( 'the walking dead' )
    .then(function (tvshows){
    });
  }
});  // end of controller TVShowsController