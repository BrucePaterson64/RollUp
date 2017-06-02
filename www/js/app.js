var angular, cordova, StatusBar;
var App = angular.module('App', ['angularjs-datetime-picker']);
var App = angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers']).run(function ($ionicPlatform, $cordovaSQLite) {
	"use strict";
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).config(function ($stateProvider, $urlRouterProvider) {
	"use strict";
	$stateProvider.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html'
		
	}).state('app.results', {
		url: '/results',
		views: {
			'menuContent': {
				templateUrl: 'templates/results.html'
			}
		}
	}).state('app.amendPlayer', {
		cache: false,
		url: '/amendPlayer',
		views: {
			'menuContent': {
				templateUrl: 'templates/amendPlayer.html'
				
			}
		}
        }).state('app.socAmendPlayer', {
		cache: false,
		url: '/socAmendPlayer',
		views: {
			'menuContent': {
				templateUrl: 'templates/socAmendPlayer.html'

			}
		}
	}).state('app.delPlayer', {
		cache: false,
		url: '/delPlayer',
		views: {
			'menuContent': {
				templateUrl: 'templates/delPlayer.html'
				
			}
		}
	}).state('app.menuA', {
		cache: false,
		url: '/menuA',
		views: {
			'menuContent': {
				templateUrl: 'templates/menuA.html'
				
			}
		}
	}).state('app.menuB', {
		cache: false,
		url: '/menuB',
		views: {
			'menuContent': {
				templateUrl: 'templates/menuB.html'
				
			}
		}
    }).state('app.socMenu', {
		cache: false,
		url: '/socMenu',
		views: {
			'menuContent': {
				templateUrl: 'templates/socMenu.html'

			}
		}
	}).state('app.menuC', {
		cache: false,
		url: '/menuC',
		views: {
			'menuContent': {
				templateUrl: 'templates/menuC.html'
				
			}
		}
	}).state('app.menu', {
		url: '/menu',
		views: {
			'menuContent': {
				templateUrl: 'templates/menu.html'
			}
		}
	}).state('app.courses', {
		url: '/courses',
		views: {
			'menuContent': {
				templateUrl: 'templates/courses.html'
			}
		}
        }).state('app.SocCourses', {
		url: '/socCourses',
		views: {
			'menuContent': {
				templateUrl: 'templates/socCourses.html'
			}
		}
	}).state('app.amendCourses', {
		url: '/amendCourses',
		views: {
			'menuContent': {
				templateUrl: 'templates/amendCourses.html'
			}
		}
        }).state('app.socAmendCourses', {
		url: '/socAmendCourses',
		views: {
			'menuContent': {
				templateUrl: 'templates/socAmendCourses.html'
			}
		}
	}).state('app.players', {
		url: '/players',
		views: {
			'menuContent': {
				templateUrl: 'templates/players.html'
			}
		}
        }).state('app.socPlayers', {
		url: '/socPlayers',
		views: {
			'menuContent': {
				templateUrl: 'templates/socPlayers.html'
			}
		}
        }).state('app.socMenuB', {
		url: '/socMenuB',
		views: {
			'menuContent': {
				templateUrl: 'templates/socMenuB.html'
			}
		}
         }).state('app.socMenuA', {
		url: '/socMenuA',
		views: {
			'menuContent': {
				templateUrl: 'templates/socMenuA.html'
			}
		}
	}).state('app.scoreCard', {
		url: '/scoreCard',
		views: {
			'menuContent': {
				templateUrl: 'templates/scoreCard.html'
			}
		}
        }).state('app.societySignin', {
		url: '/societySignin',
		views: {
			'menuContent': {
				templateUrl: 'templates/societySignin.html'
			}
		}
	}).state('app.index', {
		url: '/index',
		views: {
			'menuContent': {
				templateUrl: 'index.html'
			}
		}
	}).state('app.rollUp', {
		url: '/rollUp',
		views: {
			'menuContent': {
				templateUrl: 'templates/rollUp.html',
				controller: "CourseController"
			}
		}
	}).state('app.addPlayer', {
		url: '/socAddPlayer',
		views: {
			'menuContent': {
				templateUrl: 'templates/socAddPlayer.html',

			}
		}
        }).state('app.socAddPlayer', {
		url: '/addPlayer',
		views: {
			'menuContent': {
				templateUrl: 'templates/addPlayer.html',
				controller: "AddPlayerCtrl"
			}
		}
	}).state('app.LeaderBoard', {
		url: '/LeaderBoard',
		views: {
			'menuContent': {
				templateUrl: 'templates/LeaderBoard.html',
				controller: "leaderCtrl"
			}
		}
	}).state('app.popupDate', {
		url: '/popupDate',
		views: {
			'menuContent': {
				templateUrl: 'templates/popupDate.html',
				controller: "leaderCtrl"
			}
		}
	
		
	});
	
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('app/index');
});

App.controller('MainCtrl', function ($scope, $ionicModal) {
	'use strict';
});



App.controller('SignInCtrl', function ($scope, $window, $http, $state, $location, $ionicPopup) {



    $scope.data = {};




    $scope.showLogIn = true;
     $http ({ url: "http://golf-rollup.co.uk/society/societies.php",


	}).success(function (data) {
         $scope.soc = data;
         $scope.dd = $scope.soc[0];
		 $scope.data.selectedSoc = $scope.dd.Society;



     $http ({url:"http://golf-rollup.co.uk/society/socPlayer.php",
				method: "GET",
				params:{
			'Club': $scope.data.selectedSoc }
		}).success(function (data) {
           $scope.pp = data;
           $scope.pPlay = $scope.pp[0];
           $scope.pPlayer = $scope.pp.Player;

            });
     });

    $scope.login = function() {

        $http ({ url: "http://golf-rollup.co.uk/society/AppSignin.php",
			method: "POST",
			params: {
			email: $scope.data.username,
			password: $scope.data.password}

	}).success(function (data) {
        if (data) {
            data = data.replace(/\s/g, '');
        }
        //console.log(data.length);
		$scope.society = data;
        console.log($scope.society);
            if (!$scope.society){
                alert ("Login Details Not Recognised!! Please retry or Sign in");
               } else {
                  alert ("Welcome to the " + $scope.society + " society");
                    window.location.href="#/app/socMenu";
               }
	}).error(function (data) {
		var alert;
		alert("ERROR 4");
	});
    }
       $scope.login = function() {

        $http ({ url: "http://golf-rollup.co.uk/society/AppSignin.php",
			method: "GET",
			params: {
			email: $scope.data.email,
			password: $scope.data.password}

	}).success(function (data) {
        if (data) {
            data = data.replace(/\s/g, '');
        }

		$scope.society = data;

            if (!$scope.society){
                alert ("Login Details Not Recognised!! Please Sign in");
                $scope.showSignIn = true;
                $scope.showLogIn = false;
               } else {
                  alert ("Welcome to the " + $scope.society + " society");
                   $scope.showSignIn = false;
                   $window.localStorage.society = $scope.society;
			         $scope.storedSociety = $window.localStorage.society;

                   window.location.href="#/app/socMenu";
               }
	}).error(function (data) {

		alert("ERROR 4");
	});
    }
        $scope.signin = function() {
        console.log($scope.data);
        //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        $http ({ url: "http://golf-rollup.co.uk/society/AppRegister.php",
			method: "POST",
			params: {
			email: $scope.data.email,
            society: $scope.data.selectedSociety,
            name: $scope.data.name,
			password: $scope.data.password}

	}).success(function (data) {


	}).error(function (data) {

		alert("ERROR 4");
	});
    }

	$scope.data = {};

	$scope.submit = function (player) {

		$http({url: "http://golf-rollup.co.uk/society/insertSocPlayer.php",
            method: "GET",
			params: {
			'Player': $scope.data.NewPlayer,
			'Hcp': $scope.data.Handicap,
			'Club': $scope.data.selectedSoc
               }
		}).success(function (data) {

		}).error(function (data) {
            console.log($http);
		});
	};
      $scope.getAllPlayers = function() {

        $http ({url:"http://golf-rollup.co.uk/society/socPlayer.php",
				method: "GET",
				params:{
			'Club': $scope.data.selectedClub }
		}).success(function (data) {
           $scope.pp = data;


            });


    };

    $scope.getHcp = function() {
     $http ({url:"http://golf-rollup.co.uk/society/socPlayHcp.php",
				method: "GET",
				params:{
			'Club': $scope.data.selectedClub,
            'Player': $scope.data.selectedPlayer}
		}).success(function (data) {
           $scope.ph = data[0];
           $scope.data.bhcp = $scope.ph.Hcp;
            $scope.data.rbhcp = $scope.ph.RevHcp;
            console.log($scope.data.bhcp);
            });

    }


//$scope.data = {};
    $scope.amendAll = function () {
	   	var $player = $scope.data.selectedPlayer;
		var $club = $scope.data.selectedNewClub;

		var confirmPopup = $ionicPopup.confirm({
     title: 'Amend',
     template: 'You are about to amend ' + $scope.data.selectedPlayer + "'" +'s details! '
   })

   confirmPopup.then(function(res) {
     if(res) {
       $http ({url: "http://golf-rollup.co.uk/society/socAmendPlay.php",
                 method: "GET",
				params: {
			 Player : $scope.data.selectedPlayer,
			 Hcp : $scope.data.bhcp,
			 RevHcp : $scope.data.rbhcp,
			 Club : $scope.data.selectedClub
                }
              }).then(function (res){
             $scope.response = res.data;
           	 $state.go('app.socMenu');
        });



     } else {
      // alert ("Action Cancelled");
     }

   			})

};
     });

App.controller('CourseController', function ($scope, $window, $http, $state, $location) {
	"use strict";

	$scope.selectedClub = {};
	$scope.selectedDay = {};
	$scope.selectedTime = {};
	$scope.selectedPlayer = {};



	$http({ url: "http://golf-rollup.co.uk/aAppCourse.php",
			method: "GET"
			
		   }).success(function (data) {
		$scope.Clubs = data;
		
	}).error(function (data) {

		
	});
	$scope.selectedClub = {};
	$scope.update = function () {

		$http({
			url: "http://golf-rollup.co.uk/aAppDay.php",
			method: "GET",
			params: {'Club': $scope.selectedClub.ID}
		}).success(function (data) {
			$scope.Days = data;
			
		}).error(function (data) {
			

		});
		
	};
	$scope.selectedClub = {};
	$scope.selectedDay = {};
	$scope.DayUpdate = function () {
		var $day = $scope.selectedDay.ID, $club = $scope.selectedClub.ID;
		//var $club = $scope.selectedClub.ID;
		$http({
			url: "http://golf-rollup.co.uk/aAppTime.php",
			method: "GET",
			params: {'Club': $club,
					'Day': $day}
		}).success(function (data) {
			$scope.TeeTimes = data;
		}).error(function (data) {
			

		});
	};
	$scope.Team2Update = function () {
		//$window.localStorage.player = false;
		
		//$window.localStorage.player = $scope.selectedPlayer.ID;
		//$scope.storedPlayer = $window.localStorage.player;
		//$state.go('app.amendPlayer');
	};
	$scope.selectedClub = {};
	$scope.selectedDay = {};
	$scope.selectedTime = {};
	$scope.TeamUpdate = function () {
	    $window.localStorage.club = false;
        $window.localStorage.day = false;
		$window.localStorage.time = false;
		$window.localStorage.player = false;
		$window.localStorage.club = $scope.selectedClub.ID;
		$scope.storedClub = $window.localStorage.club;
		$window.localStorage.day = $scope.selectedDay.ID;
		$scope.storedDay = $window.localStorage.day;
		$window.localStorage.time = $scope.selectedTime.ID;
		$scope.storedTime = $window.localStorage.time;

		var $day = $scope.selectedDay.ID, $club = $scope.selectedClub.ID, $time = $scope.selectedTime.ID;
		//var $club = $scope.selectedClub.ID;
		//var $time = $scope.selectedTime.ID;
		
		$http({ url: "http://golf-rollup.co.uk/aAppTeam.php",
			   method: "GET",
			   params: {
				'Club': $club,
				'Day': $day,
				'TeeTime': $time
			}
			}).success(function (data) {
			$scope.players = data;
			
		}).error(function (data) {

		});
	};
	$scope.create = function () {
		var $ionicLoading, ScoreCard;
		$ionicLoading.show({
			template: ScoreCard.html
		});
	};
});
App.controller('AddPlayerCtrl', function ($scope, $http, $window, $state) {
	"use strict";

	$scope.data = {};
	
	$scope.submit = function (player) {
		
		$http({url: "'http://golf-rollup.co.uk/aAppAddPlayer.php",
            method: "GET",
			params: {
			'Player': $scope.data.NewPlayer,
			'TeeTime': $scope.data.Time,
			'Hcp': $scope.data.Handicap,
			'DayS': $scope.data.selectedDay,
			'Club': $scope.data.selectedClub
               }
		}).success(function (data) {

		}).error(function (data) {

		});
	};
});
App.controller('cardCtrl', function ($scope, $window, $http, $filter, $ionicPopup, $location) {
	"use strict";

	$scope.$on("$ionicView.enter", function (event, data) {
		

		$scope.selectedPlayer = {};
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = $window.localStorage.player;
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		var selectedPlayer = $location.search().player;
		$scope.selectedPlayer.ID = selectedPlayer;

		$http({url: "http://golf-rollup.co.uk/AHcp.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.selectedPlayer.ID
			}
			}).success(function (data) {
			$scope.hcps = data;
			$scope.selectedHcp = data[0];
		});
		
		$http({url: "http://golf-rollup.co.uk/aAppTeam.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'TeeTime': $scope.storedTime
			}
			}).success(function (data) {
			$scope.Players = data;
		});
		$http({url: "http://golf-rollup.co.uk/aAppCourses.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub
			}
			}).success(function (data1) {
			$scope.Par = data1;
			
		});
		
		$http({ url: "http://golf-rollup.co.uk/aAppCourse.php",
			method: "GET"
		    }).success(function (data2) {
			$scope.Clubs = data2;
		}).error(function (data2) {
		
		});
		$http({ url: "http://golf-rollup.co.uk/aAppAmendCourse.php",
			method: "GET"
		    }).success(function (data3) {
			$scope.town = data3;
		}).error(function (data3) {
		
		});
		
	});

	$scope.getShots = function (par) {
		
		if (!$scope.selectedHcp) {
			return null;
		}
		var val =  $scope.selectedHcp.Hcp - par.Index;
		
		if (val > 17.4) {
			return 2;
		} else if (val >= -0.5) {
			return 1;
		} else if (val < -0.5) {
			return 0;
		}
	};
	
	
	$scope.getPoints = function (par) {
		var shot = $scope.getShots(par), val = par.Score - shot - par.Par;
		
		if (shot === null) {
			return null;
		}
		
		//	console.log(par);
		if (val > 1) {
			return 0;
		} else if (val == 1) {
			return 1;
		} else if (val == 0) {
			return 2;
		} else if (val == -1) {
			return 3;
		} else if (val == -2) {
			return 4;
		} else if (val == -3) {
			return 5;
		}
		return null;
	};
	$scope.getTotal = function () {
		if (!$scope.Par) { return 0;
				}
		var total = 0;
		angular.forEach($scope.Par, function (item, index) {
			total = total + ($scope.getPoints(item) || 0);
			$scope.totPts = total;
		});
		return total;
	};
	$scope.getTotalShots = function () {
		if (!$scope.Par) { return 0;
						 }
		var total = 0;
		angular.forEach($scope.Par, function (item, index) {
			total = total + ($scope.getShots(item) || 0);
		});
		return total;
	};
	
	$scope.getPar = function () {
		if (!$scope.Par) { return 0;
						 }
		var total = 0;
		for (var i = 0; i < $scope.Par.length; i++) {
			total += parseInt($scope.Par[i].Par);
		}
		return total;
	};
	
	$scope.items = ['1','2','3','4','5','6','7','8','9','10','11','12'];
	
		
	$scope.getScoreTotal = function () {
		if (!$scope.Par)
			return 0;
		
		var total = 0;
		for (var i = 0; i < $scope.Par.length; i++) {
			total += Number($scope.Par[i].Score) || 0;
			$scope.totScore = total;
		}
		return total;
		
	};
	
        



	$scope.update = function () {
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = localStorage.getItem('player');
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		$window.localStorage.player = $scope.selectedPlayer.ID;
		
		
		$http ({url: "http://golf-rollup.co.uk/AHcp.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.storedPlayer }
					  }).success(function (data) {
			$scope.hcps = data;
			$scope.selectedHcp = data[0];
			   })
	
	
			
		$http ({url: "http://golf-rollup.co.uk/ARevHcp.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.selectedPlayer.ID
				}
			}).success(function (data) {
				$scope.revhcps = data;
				$scope.selectedRevHcp = data[0];
				console.log ($scope.selectedRevHcp);
		
				}).error(function (data) {
			var alert;

								})
		};

	$scope.validateHcp = function (user) {
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = localStorage.getItem('player');
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		$window.localStorage.player = $scope.selectedPlayer.ID;
		
		if (user.value === "Revised") {
			$http ({ url: "http://golf-rollup.co.uk/ARevHcp.php",
					method: "GET",
					params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.storedPlayer }
					
			}).success(function (data) {
				$scope.hcps = data;
				$scope.selectedHcp = data[0];
				console.log($scope.selectedHcp.Hcp);
			});
		}
		else {
			$http ({ url: "http://golf-rollup.co.uk/AHcp.php",
					method: "GET",
					params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.storedPlayer }
			}).success(function (data) {
				$scope.hcps = data;
				$scope.selectedHcp = data[0];
			});
		}
	};
	$http ({ url: "http://golf-rollup.co.uk/aAppCourses.php",
			method: "GET",
			params: {
			'Club': $scope.storedClub
		}
	}).success(function (data11) {
		// $scope.shots = ;
	});


		var myDate = new Date();
		$scope.datePlayed = myDate;	
	$scope.hh = {};

	var revHcp = {};
	var RrevHcp = {};
		$scope.submitScore = function (datePlayed) {
	$http ({ url: "http://golf-rollup.co.uk/ARevHcp.php",
					method: "GET",
					params: {
				'Club': $scope.storedClub,
				'Player': $scope.selectedPlayer.ID }

			}).success(function (data) {
				$scope.h = data;
				$scope.hh = data[0];
				$scope.selectedRevHcp = $scope.hh.Hcp;
				console.log($scope.selectedRevHcp);


			
			
var nHcp  = $scope.selectedRevHcp;
var nPoints  =   $scope.totPts; 
var shots = nPoints - 36;
var A = ((nHcp - 5.4) / 0.2);
var E = ((nHcp - 12.4) / 0.3);
var H = ((nHcp - 20.4) / 0.4);
var C = Math.ceil(A,1);
var D = shots - A;
var G = Math.ceil(E,1);
var F = shots;
var B = shots - E;
var J = shots - H;
var K = Math.ceil(H,1);	

		  	console.log (nHcp);
			console.log (nPoints);
	
	if (nPoints < 36) 
	  {
    	revHcp = (parseFloat(nHcp) + 0.1);
		  RrevHcp = Math.round( revHcp * 10 ) / 10;

     	  }
     	if (nPoints == 36) 
	  {
    	revHcp = (parseFloat(nHcp));
		  RrevHcp = Math.round( revHcp * 10 ) / 10;
		  	console.log (RrevHcp);
     	  }
	if (nPoints > 36 && (parseFloat(nHcp)) < 5.5)
	  {
    	revHcp = (parseFloat(nHcp)) - (shots * 0.1);
		  RrevHcp = Math.round( revHcp * 10 ) / 10;
			console.log (RrevHcp);
     	  }
	if (nPoints > 36 && (parseFloat(nHcp) > 5.4) && (parseFloat(nHcp) < 12.5 ) && shots < C)
          {
         revHcp = (parseFloat(nHcp) - (F * 0.2));
			RrevHcp = Math.round( revHcp * 10 ) / 10;
			  console.log (RrevHcp);
	  }	
	if (nPoints > 36 && (parseFloat(nHcp) > 5.4)  && (parseFloat(nHcp) < 12.5 ) && shots > C)
         {
      		
      	RHcp = (parseFloat(nHcp) - (A * 0.2));
			revHcp = (RHcp - (D * 0.1));
				 RrevHcp = Math.round( revHcp * 10 ) / 10;
			 		console.log (RrevHcp);	
         }
 	
  	if(nPoints > 36 && (parseFloat(nHcp) > 12.4)  && (parseFloat(nHcp) < 20.5 ) && shots < G)
          {
         	revHcp = (parseFloat(nHcp) - (F * 0.3));
			 RrevHcp = Math.round( revHcp * 10 ) / 10;
				console.log (revHcp);
 	  }	
	if (nPoints > 36 && (parseFloat(nHcp) > 12.4)  && (parseFloat(nHcp) < 20.5 ) && shots > G)
         {
      		
      		RHcp = (parseFloat(nHcp) - (E * 0.3));
				revHcp = (RHcp - (B * 0.2));
					RrevHcp = Math.round( revHcp * 10 ) / 10;
			 			console.log (RrevHcp);
         }
     if(nPoints > 36 && (parseFloat(nHcp) > 20.4) && shots < K)
          {
         	revHcp = (parseFloat(nHcp) - (F * 0.4));
			  RrevHcp = Math.round( revHcp * 10 ) / 10;
				console.log (RrevHcp);
 	  }	
	if(nPoints > 36 && (parseFloat(nHcp) > 20.4) && shots > K)
         {
      		
      		RHcp = (parseFloat(nHcp) - (H * 0.4));
				revHcp = (RHcp - (J * 0.3));
			 		RrevHcp = Math.round( revHcp * 10 ) / 10;
			 			console.log (RrevHcp);
         }


		var newDate = datePlayed;
		var dateP = $filter('date')(newDate, "dd-MM-yyyy");		
		var myWeek = $filter('date')(newDate, 'ww');
		var myYear = $filter('date')(newDate, 'yyyy');
				
		var newDate = myYear + myWeek;
			
			var args1 = {
			Club: $scope.storedClub,
			Day: $scope.storedDay,
			Time: $scope.storedTime,
			Player: $scope.selectedPlayer.ID,
			yrwk: newDate,
			Pts: $scope.totPts,
			Hcp: $scope.selectedHcp.Hcp,
			RevHcp: RrevHcp
				
		};
			if ($scope.selectedPlayer.ID == null) {
				var confirmPopup = $ionicPopup.confirm({
     title: 'ERROR!',
     template: 'PLEASE SELECT A PLAYER!'
   })
			}else {
			var confirmPopup = $ionicPopup.confirm({
     title: 'Submit Score',
     template: 'You are about to submit '+ $scope.selectedPlayer.ID + "'" + 's score for '  + dateP + ' with a Perpetual Handicap of ' + RrevHcp + ' !'
   })

   confirmPopup.then(function(res) {
     if(res) {
       	$http ({ url: "http://golf-rollup.co.uk/aAppSubmitScores.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.selectedPlayer.ID,
				'yrwk': newDate,
				'Pts': $scope.totPts,
				'Hcp': $scope.selectedHcp.Hcp,
				'RevHcp': RrevHcp }
	}).success(function (data11) {
		// $scope.shots = ;
	});

	
	  
     } else {
       alert ("Action Cancelled");
     }
   			})	
	
	}
		});
		}
});

App.controller('scorecardCtrl', function ($scope, $window, $http, $filter, $ionicPopup, $location) {
	"use strict";

	$scope.$on("$ionicView.enter", function (event, data) {


		$scope.selectedPlayer = {};
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = $window.localStorage.player;
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		var selectedPlayer = $location.search().player;
		$scope.selectedPlayer.ID = selectedPlayer;

			$http({url: "http://golf-rollup.co.uk/aAppCourses.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub
			}
			}).success(function (data1) {
			$scope.Par = data1;
            $scope.getTeam();
		});

        $scope.getTeam = function() {
		   $http({url: "http://golf-rollup.co.uk/aAppTeam.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'TeeTime': $scope.storedTime
			}
			}).success(function (data) {
			$scope.Players = data;
            $scope.getHcp();
		});
        }
        $scope.getHcp = function() {
	       $http({url: "http://golf-rollup.co.uk/AHcp.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.selectedPlayer.ID
			}
			}).success(function (data) {
			$scope.hcps = data;
			$scope.selectedHcp = data[0];
		});
        }
	});

	$scope.getShots = function (par) {

		if (!$scope.selectedHcp) {
			return null;
		}
		var val =  $scope.selectedHcp.Hcp - par.Index;

		if (val > 17.4) {
			return 2;
		} else if (val >= -0.5) {
			return 1;
		} else if (val < -0.5) {
			return 0;
		}
	};


	$scope.getPoints = function (par) {
		var shot = $scope.getShots(par), val = par.Score - shot - par.Par;

		if (shot === null) {
			return null;
		}

		//	console.log(par);
		if (val > 1) {
			return 0;
		} else if (val == 1) {
			return 1;
		} else if (val == 0) {
			return 2;
		} else if (val == -1) {
			return 3;
		} else if (val == -2) {
			return 4;
		} else if (val == -3) {
			return 5;
		}
		return null;
	};
	$scope.getTotal = function () {
		if (!$scope.Par) { return 0;
				}
		var total = 0;
		angular.forEach($scope.Par, function (item, index) {
			total = total + ($scope.getPoints(item) || 0);
			$scope.totPts = total;
		});
		return total;
	};
	$scope.getTotalShots = function () {
		if (!$scope.Par) { return 0;
						 }
		var total = 0;
		angular.forEach($scope.Par, function (item, index) {
			total = total + ($scope.getShots(item) || 0);
		});
		return total;
	};

	$scope.getPar = function () {
		if (!$scope.Par) { return 0;
						 }
		var total = 0;
		for (var i = 0; i < $scope.Par.length; i++) {
			total += parseInt($scope.Par[i].Par);
		}
		return total;
	};

	$scope.items = ['1','2','3','4','5','6','7','8','9','10','11','12'];


	$scope.getScoreTotal = function () {
		if (!$scope.Par)
			return 0;

		var total = 0;
		for (var i = 0; i < $scope.Par.length; i++) {
			total += Number($scope.Par[i].Score) || 0;
			$scope.totScore = total;
		}
		return total;

	};





	$scope.update = function () {
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = localStorage.getItem('player');
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		$window.localStorage.player = $scope.selectedPlayer.ID;


		$http ({url: "http://golf-rollup.co.uk/AHcp.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.storedPlayer }
					  }).success(function (data) {
			$scope.hcps = data;
			$scope.selectedHcp = data[0];
			   })



		$http ({url: "http://golf-rollup.co.uk/ARevHcp.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.selectedPlayer.ID
				}
			}).success(function (data) {
				$scope.revhcps = data;
				$scope.selectedRevHcp = data[0];
				console.log ($scope.selectedRevHcp);

				}).error(function (data) {
			var alert;

								})
		};

	$scope.validateHcp = function (user) {
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = localStorage.getItem('player');
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		$window.localStorage.player = $scope.selectedPlayer.ID;

		if (user.value === "Revised") {
			$http ({ url: "http://golf-rollup.co.uk/ARevHcp.php",
					method: "GET",
					params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.storedPlayer }

			}).success(function (data) {
				$scope.hcps = data;
				$scope.selectedHcp = data[0];
				console.log($scope.selectedHcp.Hcp);
			});
		}
		else {
			$http ({ url: "http://golf-rollup.co.uk/AHcp.php",
					method: "GET",
					params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.storedPlayer }
			}).success(function (data) {
				$scope.hcps = data;
				$scope.selectedHcp = data[0];
			});
		}
	};
	$http ({ url: "http://golf-rollup.co.uk/aAppCourses.php",
			method: "GET",
			params: {
			'Club': $scope.storedClub
		}
	}).success(function (data11) {
		// $scope.shots = ;
	});


		var myDate = new Date();
		$scope.datePlayed = myDate;
	$scope.hh = {};
    var RHcp = {};
	var revHcp = {};
	var RrevHcp = {};
		$scope.submitScore = function (datePlayed) {
	$http ({ url: "http://golf-rollup.co.uk/ARevHcp.php",
					method: "GET",
					params: {
				'Club': $scope.storedClub,
				'Player': $scope.selectedPlayer.ID }

			}).success(function (data) {
				$scope.h = data;
				$scope.hh = data[0];
				$scope.selectedRevHcp = $scope.hh.Hcp;
				console.log($scope.selectedRevHcp);




var nHcp  = $scope.selectedRevHcp;
var nPoints  =   $scope.totPts;
var shots = nPoints - 36;
var A = ((nHcp - 5.4) / 0.2);
var E = ((nHcp - 12.4) / 0.3);
var H = ((nHcp - 20.4) / 0.4);
var C = Math.ceil(A,1);
var D = shots - A;
var G = Math.ceil(E,1);
var F = shots;
var B = shots - E;
var J = shots - H;
var K = Math.ceil(H,1);

		  	console.log (nHcp);
			console.log (nPoints);

	if (nPoints < 36)
	  {
    	revHcp = (parseFloat(nHcp) + 0.1);
		  RrevHcp = Math.round( revHcp * 10 ) / 10;

     	  }
     	if (nPoints == 36)
	  {
    	revHcp = (parseFloat(nHcp));
		  RrevHcp = Math.round( revHcp * 10 ) / 10;
		  	console.log (RrevHcp);
     	  }
	if (nPoints > 36 && (parseFloat(nHcp)) < 5.5)
	  {
    	revHcp = (parseFloat(nHcp)) - (shots * 0.1);
		  RrevHcp = Math.round( revHcp * 10 ) / 10;
			console.log (RrevHcp);
     	  }
	if (nPoints > 36 && (parseFloat(nHcp) > 5.4) && (parseFloat(nHcp) < 12.5 ) && shots < C)
          {
         revHcp = (parseFloat(nHcp) - (F * 0.2));
			RrevHcp = Math.round( revHcp * 10 ) / 10;
			  console.log (RrevHcp);
	  }
	if (nPoints > 36 && (parseFloat(nHcp) > 5.4)  && (parseFloat(nHcp) < 12.5 ) && shots > C)
         {

      	RHcp = (parseFloat(nHcp) - (A * 0.2));
			revHcp = (RHcp - (D * 0.1));
				 RrevHcp = Math.round( revHcp * 10 ) / 10;
			 		console.log (RrevHcp);
         }

  	if(nPoints > 36 && (parseFloat(nHcp) > 12.4)  && (parseFloat(nHcp) < 20.5 ) && shots < G)
          {
         	revHcp = (parseFloat(nHcp) - (F * 0.3));
			 RrevHcp = Math.round( revHcp * 10 ) / 10;
				console.log (revHcp);
 	  }
	if (nPoints > 36 && (parseFloat(nHcp) > 12.4)  && (parseFloat(nHcp) < 20.5 ) && shots > G)
         {

      		RHcp = (parseFloat(nHcp) - (E * 0.3));
				revHcp = (RHcp - (B * 0.2));
					RrevHcp = Math.round( revHcp * 10 ) / 10;
			 			console.log (RrevHcp);
         }
     if(nPoints > 36 && (parseFloat(nHcp) > 20.4) && shots < K)
          {
         	revHcp = (parseFloat(nHcp) - (F * 0.4));
			  RrevHcp = Math.round( revHcp * 10 ) / 10;
				console.log (RrevHcp);
 	  }
	if(nPoints > 36 && (parseFloat(nHcp) > 20.4) && shots > K)
         {

      		RHcp = (parseFloat(nHcp) - (H * 0.4));
				revHcp = (RHcp - (J * 0.3));
			 		RrevHcp = Math.round( revHcp * 10 ) / 10;
			 			console.log (RrevHcp);
         }


		var newDate = datePlayed;
		var dateP = $filter('date')(newDate, "dd-MM-yyyy");
		var myWeek = $filter('date')(newDate, 'ww');
		var myYear = $filter('date')(newDate, 'yyyy');

		var newDate = myYear + myWeek;

			var args1 = {
			Club: $scope.storedClub,
			Day: $scope.storedDay,
			Time: $scope.storedTime,
			Player: $scope.selectedPlayer.ID,
			yrwk: newDate,
			Pts: $scope.totPts,
			Hcp: $scope.selectedHcp.Hcp,
			RevHcp: RrevHcp

		};
			if ($scope.selectedPlayer.ID == null) {
				var confirmPopup = $ionicPopup.confirm({
     title: 'ERROR!',
     template: 'PLEASE SELECT A PLAYER!'
   })
			}else {
			var confirmPopup = $ionicPopup.confirm({
     title: 'Submit Score',
     template: 'You are about to submit '+ $scope.selectedPlayer.ID + "'" + 's score for '  + dateP + ' with a Perpetual Handicap of ' + RrevHcp + ' !'
   })

   confirmPopup.then(function(res) {
     if(res) {
       	$http ({ url: "http://golf-rollup.co.uk/aAppSubmitScores.php",
				method: "GET",
				params: {
				'Club': $scope.storedClub,
				'Day': $scope.storedDay,
				'Time': $scope.storedTime,
				'Player': $scope.selectedPlayer.ID,
				'yrwk': newDate,
				'Pts': $scope.totPts,
				'Hcp': $scope.selectedHcp.Hcp,
				'RevHcp': RrevHcp }
	}).success(function (data11) {
		// $scope.shots = ;
	});



     } else {
     alert ("Action Cancelled");
       $window.location.reload(true);
     }
   			})

	}
		});


		}


});
App.controller('NewCourseController', function ($scope, $window, $http) {
	"use strict";
	$scope.Clubs = [];
	$scope.selectedClub = {};
	$scope.Days = [];
	$scope.selectedDay = {};
	$scope.selectedTime = {};
	$scope.Players = {};
	$scope.TeeTimes = {};
	$scope.storedClub = localStorage.getItem('club');
	$scope.storedDay = localStorage.getItem('day');
	$scope.storedTime = localStorage.getItem('time');
	$scope.selectedClub.ID = $scope.storedClub;
	$scope.selectedDay.ID = $scope.storedDay;
	//$scope.selectedPlayer.ID = $scope.storedPlayer;
	var args = {
		Club: $scope.storedClub
		, Day: $scope.storedDay
		, Time: $scope.storedTime
	};
	$http ({ url: "http://golf-rollup.co.uk/aAppTeam.php",
			method: "GET",
			params: {
			Club: $scope.storedClub,
			Day: $scope.storedDay,
			Time: $scope.storedTime }
	}).success(function (data) {
		$scope.aPlayers = data;
	}).error(function (data) {
		var alert;
		alert("ERROR 4");
	});
	$http.get("http://www.golf-rollup.co.uk/aAppCourse.php").success(function (data) {
		$scope.Clubs = data;
	}).error(function (data) {
		var alert;
		alert("ERROR 1");
	});
	$scope.update = function () {
		$http ({url: "http://golf-rollup.co.uk/aAppDay.php",
				method: "GET",
				params:{
				"Club": $scope.selectedClub.ID
			}
		}).success(function (data) {
			$scope.Days = data;
		}).error(function (data) {
			var alert;
			alert("ERROR 2");
		});
		$scope.selectedDay.ID = -"";
		$scope.selectedTime.ID = -"";
		localStorage.clear();
	};
	$scope.DayUpdate = function () {
		$http ({ url: "http://golf-rollup.co.uk/aAppTime.php",
				method: "GET",
				params: {
				"Club": $scope.selectedClub.ID,
				"Day": $scope.selectedDay.ID
			}
		}).success(function (data) {
			$scope.TeeTimes = data;
		}).error(function (data) {
			var alert;
			alert("ERROR 3");
		});
	};
	$scope.TeamUpdate = function () {
		$window.localStorage.club = false;
		$window.localStorage.day = false;
		$window.localStorage.time = false;
		$window.localStorage.club = $scope.selectedClub.ID;
		$scope.storedClub = $window.localStorage.club;
		$window.localStorage.day = $scope.selectedDay.ID;
		$scope.storedDay = $window.localStorage.day;
		$window.localStorage.time = $scope.selectedTime.ID;
		$scope.storedTime = $window.localStorage.time;
		var args = {
			Club: $scope.selectedClub.ID
			, Day: $scope.selectedDay.ID
			, Time: $scope.selectedTime.ID
		};
		$http ({ url:"http://golf-rollup.co.uk/aAppTeam.php",
				method: "GET",
				params:{
			'Club': $scope.selectedClub.ID,
			'Day': $scope.selectedDay.ID,
			'Time': $scope.selectedTime.ID  }
		}).success(function (data) {
			$scope.players = data;
		}).error(function (data) {
			var alert;
			alert("ERROR 4");
		});
	};
	$scope.create = function () {
		var $ionicLoading, ScoreCard;
		$ionicLoading.show({
			template: ScoreCard.html
		});
	};
});
App.controller('PlayerCtrl', function ($scope, $window, $http, $ionicPopup, $state, $location) {
		
	$scope.init = function () {

        var club = $location.search().Club;
        $scope.data.selectedClub = club;



        $scope.getCourses();


    };



        $scope.pp = {};
		$scope.data = {};
        $scope.Days = {};






    $scope.getCourses = function() {
        var player = $location.search().player;
        $scope.data.selectedPlayer = player;

        $http.get("http://www.golf-rollup.co.uk/aAppCourse.php").success(function (data) {
            $scope.Course = data;

        $http ({url:"http://golf-rollup.co.uk/aaAppAllPlayers.php",
				method: "GET",
				params:{
			    'Club': $scope.data.selectedClub }
		      }).success(function (data) {

            $scope.pp = data;
             if (player) {
                //player in url

            }else{

            }
           $scope.getDays();
            });


        }).error(function (data) {

                  });
    };

    $scope.getAllPlayers = function() {

        $http ({url:"http://golf-rollup.co.uk/aaAppAllPlayers.php",
				method: "GET",
				params:{
			'Club': $scope.data.selectedClub }
		}).success(function (data) {
           $scope.pp = data;


            });


    };
     //var player = $scope.data.selectedPlayer;
     $scope.getDays = function() {
       $http ({ url:"http://golf-rollup.co.uk/aAppGetDay.php",
				method: "GET",
				params: {
				'Club': $scope.data.selectedClub,
				'Player': $scope.data.selectedPlayer
			}
		}).success(function (data) {

			$scope.Days = data;
			$scope.dd = $scope.Days[0];
			$scope.data.selectedDay = $scope.dd.Day_S;

            $scope.getTimes();
            $window.localStorage.day = $scope.data.selectedDay;
			$scope.storedDay = $window.localStorage.day;
			$scope.selectedDay.ID = $scope.storedDay;
		})

    };


    $scope.getTimes = function() {

        $http ({ url:"http://golf-rollup.co.uk/aAppGetTime.php",
				method: "GET",
				params: {
				'Club': $scope.data.selectedClub,
				'Player': $scope.data.selectedPlayer
			}
		}).success(function (data) {
			$scope.Times = data;
			$scope.tt = $scope.Times[0];
			$scope.data.selectedTime = $scope.tt.TeeTime;

            $scope.getPlayers();
            $window.localStorage.time = $scope.data.selectedTime;
			$scope.storedTime = $window.localStorage.time;
			$scope.selectedTime.ID = $scope.storedTime;

						});

    };


    $scope.getPlayer = function (playerID) {
        if (playerID) {
            // Player ID is null - get all players
        } else {
            // Get single player
        }

    };

		

		var selectedClub = $location.search().Club;
		$scope.data.selectedClub = selectedClub;

		var selectedPlayer = $location.search().player;
		$scope.data.selectedPlayer = selectedPlayer;



      $scope.getPlayers = function() {

		$http ({url:"http://golf-rollup.co.uk/aAppAllPlayers.php",
				method: "GET",
				params:{
			'Club': $scope.data.selectedClub,
				'Player': $scope.data.selectedPlayer
                }
		}).success(function (data) {


            $scope.hcp = data;
			$scope.h = $scope.hcp[0];
			$scope.data.bhcp = $scope.h.Hcp;

            $scope.RevHcps = data;
			$scope.rahcp = $scope.RevHcps[0];
			$scope.data.rbhcp = $scope.rahcp.RevHcp;

            $scope.playerID = data;
			$scope.p = $scope.playerID[0];
			$scope.data.pid = $scope.p.PlayerID;
        });



		$window.localStorage.club = $scope.data.selectedClub;
		$scope.storedClub = $window.localStorage.club;
		$scope.selectedClub.ID = $scope.storedClub;
		$window.localStorage.player = $scope.data.selectedPlayer;
		$scope.storedPlayer = $window.localStorage.player;
		$scope.selectedPlayer.ID = $scope.storedPlayer;
        };

    $scope.getTeam = function() {
	var args = {
		Club: $scope.storedClub,
		Day: $scope.storedDay,
		Time: $scope.storedTime
	};
	$http ({url:"http://golf-rollup.co.uk/aAppTeam.php",
			method: "GET",
			params: {
		'Club': $scope.storedClub,
		'Day': $scope.storedDay,
		'Time': $scope.storedTime }
	}).success(function (data) {
		$scope.aPlayers = data;
	}).error(function (data) {
		

	});
 };

    $scope.getDay = function() {

	$scope.selectedClub = {};
	$scope.selectedDay = {};
	$scope.selectedTime = 	{};
	$scope.selectedPlayer = {};
	$http ({ url:"http://golf-rollup.co.uk/aAppDay.php",
			method: "GET",
			params: {
			"Club": $scope.selectedClub.ID
		}
	}).success(function (data) {
		$scope.Days = data;
	}).error(function (data) {
		

	});
        $scope.getTime();
    };

     $scope.getTime = function() {
	$http ({url:"http://golf-rollup.co.uk/aAppTime.php",
			method: "GET",
			params: {
			"Club": $scope.selectedClub.ID,
			"Day": $scope.selectedDay.ID
		}
	}).success(function (data) {
		$scope.TeeTimes = data;
	}).error(function (data) {
		

	});
     };


	$http.get("http://golf-rollup.co.uk/aAppTimes.php", {
		
	}).success(function (data) {
		$scope.allTeeTimes = data;
	}).error(function (data) {
		

	});


     $scope.getHcp = function() {
	var args = {
		'Club': $scope.selectedClub.ID,
		'Day': $scope.selectedDay.ID,
		'Time': $scope.selectedTime.ID,
		'Player': $scope.selectedPlayer.ID
	};
	$http ({ url:"http://golf-rollup.co.uk/AHcp.php",
			method: "GET",
			params:{
			'Club': $scope.selectedClub.ID,
			'Day': $scope.selectedDay.ID,
			'Time': $scope.selectedTime.ID,
			'Player': $scope.selectedPlayer.ID }
	}).success(function (data) {
		$scope.hcps = data;
	}).error(function (data) {
		

	});
     };
     $scope.getRevHcp = function() {
	$http ({ url:"http://golf-rollup.co.uk/aARevHcp.php",
			method: "GET",
			params:{
			'Club': $scope.selectedClub.ID,
			'Day': $scope.selectedDay.ID,
			'Time': $scope.selectedTime.ID,
			'Player': $scope.selectedPlayer.ID }
	}).success(function (data) {
		$scope.RevHcps = data;
	}).error(function (data) {
		

	});
     };
	$scope.TeamUpdate = function () {
		$window.localStorage.club = false;
		$window.localStorage.day = false;
		$window.localStorage.time = false;
		$window.localStorage.player = false;
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = $window.localStorage.player;
		$window.localStorage.club = $scope.selectedClub.ID;
		$scope.storedClub = $window.localStorage.club;
		$window.localStorage.day = $scope.selectedDay.ID;
		$scope.storedDay = $window.localStorage.day;
		$window.localStorage.time = $scope.selectedTime.ID;
		$scope.storedTime = $window.localStorage.time;
		var args = {
			'Club': $scope.selectedClub.ID,
			'Day': $scope.selectedDay.ID,
			'Time': $scope.selectedTime.ID
		};
		$http ({url:"http://golf-rollup.co.uk/aAppTeam.php",
				method: "GET",
				params: {
			'Club': $scope.selectedClub.ID,
			'Day': $scope.selectedDay.ID,
			'Time': $scope.selectedTime.ID }
		}).success(function (data) {
			$scope.players = data;
		}).error(function (data) {
			

		});
	};
	$http.get("http://golf-rollup.co.uk/aAppTimes.php")
    .success(function(data) {
                $scope.Time = data;
    });
    

    $scope.data = {};
    $scope.delPlayer = function () {    
	   	var $player = $scope.data.selectedPlayer;
		var $club = $scope.data.selectedClub;
		var $time = $scope.data.selectedTime;
		var $day = $scope.data.selectedDay;
		var confirmPopup = $ionicPopup.confirm({
     title: 'Delete',
     template: 'Are you sure you want to delete ' + $player + ' from ' + $club + "'" + 's ' + $time + ' roll up on ' + $day + '?'
   })

   confirmPopup.then(function(res) {
     if(res) {

		 $http ({url:"http://golf-rollup.co.uk/aAppDelPlayer.php",
                 method: "GET",
				params: {
			 			Player : $scope.data.selectedPlayer,
                         Hcp  : $scope.data.selectedHcp,
                         TeeTime : $scope.data.selectedTime,
                         DayS : $scope.data.selectedDay,
			 			 ID : $scope.data.pid,
                         Club : $scope.data.selectedClub
                }
                }).then(function (res){
            $scope.response = res.data;
             $state.go('app.menuA');
        });

	
	  
     } else {
      // alert ("Action Cancelled");
     }
   			})
  
};
	

	$scope.data = {};
    $scope.amendPlayer = function () {    
	   	var $player = $scope.data.selectedPlayer;
		var $club = $scope.data.selectedNewClub;
		
		var confirmPopup = $ionicPopup.confirm({
     title: 'Amend',
     template: 'Are you sure you want to add ' + $scope.data.selectedPlayer + ' to ' + $club + '?'
   })

   confirmPopup.then(function(res) {
     if(res) {

		 $http ({url: "http://golf-rollup.co.uk/aAppAmendPlayer.php",
                 method: "GET",
				params: {
			 			Player : $scope.data.selectedPlayer,
			 			ID : $scope.data.pid,
                        Club : $scope.data.selectedNewClub
                }
                }).then(function (res){
            $scope.response = res.data;
			 console.log ($scope.data.pid);
        });

	
	  
     } else {
      // alert ("Action Cancelled");
     }
   			})
  
};


$scope.data = {};
    $scope.amendAll = function () {    
	   	var $player = $scope.data.selectedPlayer;
		var $club = $scope.data.selectedNewClub;
		
		var confirmPopup = $ionicPopup.confirm({
     title: 'Amend',
     template: 'You are about to amend ' + $scope.data.selectedPlayer + "'" +'s details! '
   })

   confirmPopup.then(function(res) {
     if(res) {
       $http ({url: "http://golf-rollup.co.uk/aAppAmendAllPlayer.php",
                 method: "GET",
				params: {
			 Player : $scope.data.selectedPlayer,
			 DayS : $scope.data.selectedDay,
			 TeeTime : $scope.data.selectedTime,
			 Hcp : $scope.data.bhcp,
			 RevHcp : $scope.data.rbhcp,
			 ID : $scope.data.pid,
             Club : $scope.data.selectedClub
                }
              }).then(function (res){
             $scope.response = res.data;
           	 $state.go('app.menuA');
        });

	
	  
     } else {
      // alert ("Action Cancelled");
     }

   			})

};


	$scope.data = {};
	$scope.submit = function (player) {
	var confirmPopup = $ionicPopup.confirm({
     title: 'Add Player',
     template: 'You are about to add ' + $scope.data.NewPlayer +  ' to the ' + $scope.data.Time  + ' roll up on ' + $scope.data.selectedDay + ' at ' + $scope.data.selectedClub
   					       })

   confirmPopup.then(function(res) {
     					if(res) {		

			$http ({url: "http://golf-rollup.co.uk/aAppAddPlayer.php",
                 method: "GET",
				params: {
			'Player': $scope.data.NewPlayer,
			'TeeTime': $scope.data.Time,
			'Hcp': $scope.data.Handicap,
			'DayS': $scope.data.selectedDay,
			'Club': $scope.data.selectedClub
                }
							}).success(function(data) 
						{
						 $state.go('app.menuA');
        	});
				
    						 } else {
      // alert ("Action Cancelled");
     							 }
   					})
		};
	});

App.controller('CardParCtrl', function ($scope, $http, $ionicPopup) {
    $scope.selectedClub = {};
    $http({ url: "http://golf-rollup.co.uk/aAppCourse.php",
			method: "GET"

		   }).success(function (data) {
		$scope.Clubs = data;


	}).error(function (data) {


	});
    $scope.selTown = function () {
        var club = $scope.selectedClub.ID;
        console.log(club);
          $http({ url: "http://golf-rollup.co.uk/aAppAmendCourses.php",
			method: "GET",
			params: {
			 	'Club': club
			 	}
		   }).success(function (data) {
		$scope.C = data[0];
		$scope.town = $scope.C.Town;
        $scope.hh1 = $scope.C.Par1;
        $scope.j1 = $scope.C.Index1;
        $scope.hh2 = $scope.C.Par2;
        $scope.j2 = $scope.C.Index2;
         $scope.hh3 = $scope.C.Par3;
        $scope.j3 = $scope.C.Index3;
        $scope.hh4 = $scope.C.Par4;
        $scope.j4 = $scope.C.Index4;
        $scope.hh5 = $scope.C.Par5;
        $scope.j5 = $scope.C.Index5;
        $scope.hh6 = $scope.C.Par6;
        $scope.j6 = $scope.C.Index6;
        $scope.hh7 = $scope.C.Par7;
        $scope.j7 = $scope.C.Index7;
        $scope.hh8 = $scope.C.Par8;
        $scope.j8 = $scope.C.Index8;
        $scope.hh9 = $scope.C.Par9;
        $scope.j9 = $scope.C.Index9;
        $scope.hh10 = $scope.C.Par10;
        $scope.j10 = $scope.C.Index10;
        $scope.hh11 = $scope.C.Par11;
        $scope.j11 = $scope.C.Index11;
        $scope.hh12 = $scope.C.Par12;
        $scope.j12 = $scope.C.Index12;
        $scope.hh13 = $scope.C.Par13;
        $scope.j13 = $scope.C.Index13;
        $scope.hh14 = $scope.C.Par14;
        $scope.j14 = $scope.C.Index14;
              $scope.hh15 = $scope.C.Par15;
        $scope.j15 = $scope.C.Index15;
              $scope.hh16 = $scope.C.Par16;
        $scope.j16 = $scope.C.Index16;
              $scope.hh17 = $scope.C.Par17;
        $scope.j17 = $scope.C.Index17;
              $scope.hh18 = $scope.C.Par18;
        $scope.j18 = $scope.C.Index18;
        $scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	      $scope.AmendResult = function () {
		var answer1 = 0;

		answer1 = parseInt($scope.hh1) + parseInt($scope.hh2)+ parseInt($scope.hh3)+ parseInt($scope.hh4)+ parseInt($scope.hh5)+ parseInt($scope.hh6)+ parseInt($scope.hh7)+ parseInt($scope.hh8)+ parseInt($scope.hh9)+ parseInt($scope.hh10)+ parseInt($scope.hh11)+ parseInt($scope.hh12)+ parseInt($scope.hh13)+ parseInt($scope.hh14)+ parseInt($scope.hh15)+ parseInt($scope.hh16)+ parseInt($scope.hh17)+ parseInt($scope.hh18) ;
		return answer1 || 0;

	};


	}).error(function (data) {


	});
    };

   $scope.subAmendCourse = function () {
       var club = $scope.selectedClub.ID;
        console.log($scope.hh1);
        console.log($scope.j1);
       var confirmPopup = $ionicPopup.confirm({
     title: 'Amend',
     template: 'You are about to amend the course details for '+ club + '!'
   })

   confirmPopup.then(function(res) {
     if(res) {
         $http({ url: "http://golf-rollup.co.uk/aAppUpdateCourse.php",
			method: "GET",
			params: {

            'course': club,
			'h1':$scope.hh1,
			'j1':$scope.j1,
			'h2':$scope.hh2,
			'j2':$scope.j2,
			'h3':$scope.hh3,
			'j3':$scope.j3,
			'h4':$scope.hh4,
			'j4':$scope.j4,
			'h5':$scope.hh5,
			'j5':$scope.j5,
			'h6':$scope.hh6,
			'j6':$scope.j6,
			'h7':$scope.hh7,
			'j7':$scope.j7,
			'h8':$scope.hh8,
			'j8':$scope.j8,
			'h9':$scope.hh9,
			'j9':$scope.j9,
			'h10':$scope.hh10,
			'j10':$scope.j10,
			'h11':$scope.hh11,
			'j11':$scope.j11,
			'h12':$scope.hh12,
			'j12':$scope.j12,
			'h13':$scope.hh13,
			'j13':$scope.j13,
			'h14':$scope.hh14,
			'j14':$scope.j14,
			'h15':$scope.hh15,
			'j15':$scope.j15,
			'h16':$scope.hh16,
			'j16':$scope.j16,
			'h17':$scope.hh17,
			'j17':$scope.j17,
			'h18':$scope.hh18,
			'j18':$scope.j18
						}
               }).success(function(data){


								});

		 } else {
       //alert ("Action Cancelled");

	 }
   })
   };
	"use strict";
	$scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	$scope.result = function () {
		var answer = 0;
		
		answer = $scope.h1 + $scope.h2 + $scope.h3 + $scope.h4 + $scope.h5 + $scope.h6 + $scope.h7 + $scope.h8 + $scope.h9 + $scope.h10 + $scope.h11 + $scope.h12 + $scope.h13 + $scope.h14 + $scope.h15 + $scope.h16 + $scope.h17 + $scope.h18;
		return answer || 0;
		
	};
	"use strict";
	$scope.data = {};
	
	$scope.subCourse = function() {
		
	var confirmPopup = $ionicPopup.confirm({
     title: 'Amend',
     template: 'Thank you for adding ' + $scope.data.NewCourse + ' to the database '
   })

   confirmPopup.then(function(res) {
     if(res) {	
	

		$http({ url: "http://golf-rollup.co.uk/aAppInsert.php",
			method: "GET",
			params: {

			'course': $scope.data.NewCourse,
			'town': $scope.NewCourseTown,
			'h1':$scope.h1,
			'j1':$scope.j1,
			'h2':$scope.h2,
			'j2':$scope.j2,
			'h3':$scope.h3,
			'j3':$scope.j3,
			'h4':$scope.h4,
			'j4':$scope.j4,
			'h5':$scope.h5,
			'j5':$scope.j5,
			'h6':$scope.h6,
			'j6':$scope.j6,
			'h7':$scope.h7,
			'j7':$scope.j7,
			'h8':$scope.h8,
			'j8':$scope.j8,
			'h9':$scope.h9,
			'j9':$scope.j9,
			'h10':$scope.h10,
			'j10':$scope.j10,
			'h11':$scope.h11,
			'j11':$scope.j11,
			'h12':$scope.h12,
			'j12':$scope.j12,
			'h13':$scope.h13,
			'j13':$scope.j13,
			'h14':$scope.h14,
			'j14':$scope.j14,
			'h15':$scope.h15,
			'j15':$scope.j15,
			'h16':$scope.h16,
			'j16':$scope.j16,
			'h17':$scope.h17,
			'j17':$scope.j17,
			'h18':$scope.h18,
			'j18':$scope.j18
            }
						}).success(function(data){
    
	
								});
		 
		 } else {
       //alert ("Action Cancelled");
     
	 } 
   })
 };
});

App.controller('dateCtrl', function ($scope, $http)  {
	

});
App.controller('scoreCtrl', function ($scope, $http, $window, $filter)  {
	$scope.$on("$ionicView.enter", function (event, data) {
		
		$scope.selectedPlayer = {};
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = $window.localStorage.player;
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');
		
	var myYear = new Date().getFullYear();
    var myDate = new Date();
    var myWeek = $filter('date')(myDate, 'ww');
    var x= myWeek;
    var y= myYear;
	var $week = y+x;
		$scope.week = $week;
		$scope.ddate = x;

		
	 $http({
		 url: "http://golf-rollup.co.uk/aAppWeeklyResults.php",
		 method: "GET",
		 params: {'Club': $scope.storedClub,
				  'Day': $scope.storedDay,
				  'TeeTime': $scope.storedTime,
				  'yrwk': $scope.week}
			   }).success(function(data) {
                $scope.S = data;
                
           })
	 });
	});

		

App.controller('leaderCtrl', function ($scope, $http, $window, $filter)  {	
	$scope.data = {};
$scope.$on("$ionicView.enter", function (event, data) {
	
		
		$scope.selectedPlayer = {};
		$window.localStorage.player = $scope.selectedPlayer.ID;
		$scope.storedPlayer = $window.localStorage.player;
		$scope.storedClub = localStorage.getItem('club');
		$scope.storedDay = localStorage.getItem('day');
		$scope.storedTime = localStorage.getItem('time');
		$scope.storedHcp = localStorage.getItem('hcp');

		$http({
			url: "http://golf-rollup.co.uk/aAppMaxDate.php",
			method: "GET",
			params: 	{'Club': $scope.storedClub,
					'DayS': $scope.storedDay,
					'TeeTime': $scope.storedTime}
		}).success(function (data) {
			$scope.maxdate = data;
			$window.localStorage.maxdate = $scope.maxdate;
			$scope.storedDate = $window.localStorage.maxdate;

		$scope.storedDate = localStorage.getItem('maxdate');
			$http({
				url: "http://golf-rollup.co.uk/aAppResults.php",
				method: "GET",
				params: {'Club': $scope.storedClub,
						'DayS': $scope.storedDay,
						'TeeTime': $scope.storedTime,
						'Week': $scope.storedDate }
			
		}).success(function (data1) {
            $scope.scores = data1;
				console.log($scope.storedDate);
		})
	});
	});
});
	
App.controller('SocietyCtrl', function ($scope, $window, $http, $ionicPopup) {
	"use strict";
	
		
		
		
	$http.get("http://www.golf-rollup.co.uk/aAppSociety.php").success(function (data) {
		$scope.Clubs = data;
	}).error(function (data) {
		

	});
	
$scope.data = {};
	
	$scope.submit = function (player) {
		
		$http({ url: "http://golf-rollup.co.uk/aAppAddSocPlayer.php",
			method: "GET",
			params: {
			'Player': $scope.data.NewPlayer,
			'Hcp': $scope.data.Handicap,
            }
		}).success(function(data) {
        console.log("Success bro !" + data);
					console.log ($scope.data.NewPlayer);
    }).error(function(data) {
			console.log ($scope.data.NewPlayer);
        alert("ERROR" + data);
			
    });
	};
});
	



	

