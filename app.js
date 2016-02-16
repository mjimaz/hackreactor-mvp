var app = angular.module('tvshows', []);

app.factory('IMDBapi', function($http) {

  var currentTVShows = [];

  var searchTVShows = function( tvshow ) {

  	var searchkey = tvshow.split(' ').join('+'); 

    return $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/search/tv?api_key=8353f37b04124bdd138f12db75c775dd&query='+searchkey
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

  };

  var addToCurrentTVShows = function( tvshow ) {
  	var newTVShow = {};
  	newTVShow.id = tvshow.id;
  	newTVShow.name = tvshow.name;
  	newTVShow.seasons = tvshow.seasons;
  	newTVShow.currentSeason = 0;
  	newTVShow.currentEpisode = 0;
	  currentTVShows.push(newTVShow);
  };

  var getCurrentTVShows = function( ) {
	  return currentTVShows;
  };

  var updateTVShowInfo = function(index, currentSeason, currentEpisode) {
    currentTVShows[index].currentSeason = currentSeason;
    currentTVShows[index].currentEpisode = currentEpisode;
  };

  return {
    searchTVShows: searchTVShows,
    getTVShowInfo: getTVShowInfo,
    addToCurrentTVShows: addToCurrentTVShows,
    getCurrentTVShows: getCurrentTVShows,
    updateTVShowInfo: updateTVShowInfo
  }; 

});  // end of factory IMDBapi

app.controller('TVShowsController', function($scope, IMDBapi) {

	$scope.tvshowslist = [];

  $scope.getTVShowsListByName = function( tvshow ) {
    IMDBapi.searchTVShows( tvshow )
    .then(function (tvshows){
    	$scope.tvshowslist = tvshows.results;
    });
  };

  $scope.getTVShowDetails = function( tvshowid ) {
    IMDBapi.getTVShowInfo( tvshowid )
    .then(function (tvshowdetails){
    	IMDBapi.addToCurrentTVShows( tvshowdetails );
    });
  };

});  // end of controller TVShowsController

app.controller('WatchingListController', function( $scope, IMDBapi ) {
  $scope.watchingList = IMDBapi.getCurrentTVShows();

  $scope.updateTVshow = function(index, currentSeason, currentEpisode ) {
  	IMDBapi.updateTVShowInfo( index, currentSeason, currentEpisode );
  }
});  // end of controller WatchingListController

app.controller('TabController', function( $scope ) {
	$scope.tab = 1;

	$scope.setTab = function ( tab ) {
		$scope.tab = tab;
	};

	$scope.isSet = function ( tab ) {
		return $scope.tab === tab;
	};

}); // end of controller TabController