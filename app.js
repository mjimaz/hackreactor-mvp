var app = angular.module('tvshows', []);

app.factory('IMDBapi', function($http) {

	/*

	https://api.themoviedb.org/3/movie/550?api_key=8353f37b04124bdd138f12db75c775dd

	search for tv shows
	http://api.themoviedb.org/3/search/tv?api_key=API_KEY&query=game
	
	*/
  var searchTVShows = function( tvshow ) {
    return $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/search/tv?api_key=8353f37b04124bdd138f12db75c775dd&query='+tvshow
    })
    .then(function ( resp ) {
      return resp.data;
    });
  };

  var getTVShowInfo = function( tvshowid ) {
  	return $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/tv/'+tvshowid+'?api_key=8353f37b04124bdd138f12db75c775dd'
    })
    .then(function ( resp ) {
      return resp.data;
    });
  }
    //http://api.themoviedb.org/3/tv/id

  return {
    searchTVShows: searchTVShows,
    getTVShowInfo: getTVShowInfo
  }; 

});  // end of factory IMDBapi

app.controller('TVShowsController', function($scope, IMDBapi) {

  $scope.getTVShowsListByName = function( tvshow ) {
    IMDBapi.searchTVShows( 'the walking dead' )
    .then(function (tvshows){
    	console.log(tvshows.results[0].id);

    	$scope.getTVShowDetails(tvshows.results[0].id);
    });
  };

  $scope.getTVShowDetails = function( tvshowid ) {
    IMDBapi.getTVShowInfo( tvshowid )
    .then(function (tvshowdetails){
    	console.log('tvshowdetails:', tvshowdetails);
    });
  };

});  // end of controller TVShowsController

app.controller('TabController', function( $scope ) {
	$scope.tab = 0;

	$scope.setTab = function ( tab ) {
		$scope.tab = tab;
	};

	$scope.isSet = function ( tab ) {
		return $scope.tab === tab;
	};

}); // end of controller TabController