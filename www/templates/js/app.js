
var App = angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

    .run(function ($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function () {
    
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
      
                StatusBar.styleDefault();
            }
    
        });
    })

 

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
			
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html"
        }
      }
    })
      .state('eventmenu.home.home1', {
      url: "/home1",
      views: {
        'inception' :{
          templateUrl: "home1.html"
        }
      }
    })
        .state('eventmenu.home.home2', {
      url: "/home2",
      views: {
        'inception' :{
          templateUrl: "home2.html"
        }
      }
    })

  
  $urlRouterProvider.otherwise("/event/home");
});
     
		
		
		
		
		
           
 
App.controller('ExampleController', function($scope, $http) {
    
    $scope.Players = [];
    
    $scope.selectedPlayer = {};
 
 
        $http.get("http://regencyusedcars.co.uk/AppPlayers.php", {params: { "key1": "value1", "key2": "value2",} })
            .success(function(data) {
                $scope.Players = data;
                
            })
            .error(function(data) {
                alert("ERROR");
            });
 
 
});
App.controller('CourseController', function($scope, $window,  $http, $state) {
  	
	   
    $scope.Clubs = [];
    $scope.selectedClub = {};
    $scope.Days = [];
    $scope.selectedDay = {};
    $scope.selectedTime = {};
    $scope.Players = {};
    $scope.TeeTimes = {};
	
	   
   
 
        $http.get("http://www.regencyusedcars.co.uk/aAppCourse.php")
            .success(function(data) {
                $scope.slubs = data;
          console.log($scope.Clubs);
                
            })
            .error(function(data) {
                alert("ERROR 1");
            });
    
     $scope.update = function(){
			 
        $http.get("http://regencyusedcars.co.uk/aAppDay.php", {params: {"Club": $scope.selectedClub.ID} })
            .success(function(data) {
                $scope.Days = data;
                
            })
            .error(function(data) {
                alert("ERROR 2");
            });
		 $scope.selectedDay.ID =-"";
		 $scope.selectedTime.ID =-"";
		 localStorage.clear();
     }
     
     $scope.DayUpdate = function(){
        $http.get("http://regencyusedcars.co.uk/AppTime.php", {params: {"Club": $scope.selectedClub.ID, "Day": $scope.selectedDay.ID} })
            .success(function(data) {
                $scope.TeeTimes = data;
                
            })
            .error(function(data) {
                alert("ERROR 3");
            });
     }
     $scope.Team2Update = function(){
	 	 $window.localStorage['player'] =false;
	 	 $window.localStorage['player'] = $scope.selectedPlayer.ID;
		 $scope.storedPlayer = $window.localStorage['player'];
		 $state.go('app.amendPlayer');
	 };
	
     $scope.TeamUpdate = function(){
		
				$window.localStorage['club'] =false;
		 		$window.localStorage['day'] =false;
				$window.localStorage['time'] =false;
		 		$window.localStorage['player'] =false;
				$window.localStorage['club'] = $scope.selectedClub.ID;
				$scope.storedClub = $window.localStorage['club'];
				$window.localStorage['day'] = $scope.selectedDay.ID;
				$scope.storedDay = $window.localStorage['day'];
		 		$window.localStorage['time'] = $scope.selectedTime.ID;
				$scope.storedTime = $window.localStorage['time'];
		
            var args = {
                Club: $scope.selectedClub.ID,
                Day: $scope.selectedDay.ID,
                Time: $scope.selectedTime.ID
            };
            
        $http.get("http://regencyusedcars.co.uk/team.php", {params: args}) 
            .success(function(data) {
              
                $scope.players = data;
				
                
            })
            .error(function(data) {
             
                alert("ERROR 4");
            });
		 
     }
  $scope.create = function() {
	
	  $ionicLoading.show({template: ScoreCard.html});
  }
 
 });
 
App.controller('AddPlayerCtrl', function($scope, $http) {
	
    $scope.data = {};
 
    $scope.submit = function(){
        var link = 'http://regencyusedcars.co.uk/AppAddPlayer.php';
 
        $http.post(link, {Player : $scope.data.Player}).then(function (res){
            $scope.response = res.data;
        });
    };
});


App.controller('cardCtrl', function($scope, $window, $http) {

     {

$scope.selectedPlayer = {};		 
$window.localStorage['player'] = $scope.selectedPlayer.ID;
$scope.storedPlayer = $window.localStorage['player'];
$scope.storedClub = localStorage.getItem('club');
$scope.storedDay = localStorage.getItem('day');
$scope.storedTime = localStorage.getItem('time');
$scope.storedHcp = localStorage.getItem('hcp');


           var args = {
                Club: $scope.storedClub,
                Day: $scope.storedDay,
                Time: $scope.storedTime
                
                    };
        
            
        $http.get("http://regencyusedcars.co.uk/team.php", {params: args}) 
            .success(function(data) {
                $scope.Players = data;
                
                                    });
         
        $http.get("http://regencyusedcars.co.uk/appCourses.php", {params: {"Club": $scope.storedClub} })
            .success(function(data1) {
                $scope.Par = data1;
                
                                    });
	 }
		 $scope.update = function(){
			 
       		  	var args1 = {
                Club: $scope.storedClub,
                Day: $scope.storedDay,
                Time: $scope.storedTime,
				Player: $scope.selectedPlayer.ID
            };
                 
        $http.get("http://regencyusedcars.co.uk/hcp.php", {params: args1}) 
		
            .success(function(data) {
                $scope.hcps = data;
		                  
            })
            .error(function(data) {
            
                alert("ERROR 6");
            });
	                  
     }
		
				
		 $scope.validateHcp = function(user) {

			var args1 = {
                Club: $scope.storedClub,
                Day: $scope.storedDay,
                Time: $scope.storedTime,
				Player: $scope.selectedPlayer.ID
						};
				if (user.value == "'Revised'") {
				$http.get("http://regencyusedcars.co.uk/RHcp.php", {params: args1}) 
		
            .success(function(data) {
                $scope.hcps = data;
									});
                
												
													} else{
				
             $http.get("http://regencyusedcars.co.uk/hcp.php", {params: args1}) 
		
            .success(function(data) {
                $scope.hcps = data;
									});											
		 }
		 
		 }
		 
		 
                                                    });

App.controller('NewCourseController', function($scope, $window, $http) {
	
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
				
                Club: $scope.storedClub,
                Day: $scope.storedDay,
                Time: $scope.storedTime
            };
	 
		$http.get("http://regencyusedcars.co.uk/team.php", {params: args}) 
            .success(function(data) {
              
                $scope.aPlayers = data;
				
                
            })
            .error(function(data) {
             
                alert("ERROR 4");
            });	
  
 
        $http.get("http://www.regencyusedcars.co.uk/aAppCourse.php")
            .success(function(data) {
                $scope.Clubs = data;
          
              
            })    
			.error(function(data) {
                alert("ERROR 1");
            });
    
     $scope.update = function(){
            $http.get("http://regencyusedcars.co.uk/AppDay.php", {params: {"Club": $scope.selectedClub.ID} })
            .success(function(data) {
                $scope.Days = data;
                
            })
            .error(function(data) {
                alert("ERROR 2");
            });
		 $scope.selectedDay.ID =-"";
		 $scope.selectedTime.ID =-"";
		 localStorage.clear();
     }
     
     $scope.DayUpdate = function(){
        $http.get("http://regencyusedcars.co.uk/AppTime.php", {params: {"Club": $scope.selectedClub.ID, "Day": $scope.selectedDay.ID} })
            .success(function(data) {
                $scope.TeeTimes = data;
                
            })
            .error(function(data) {
                alert("ERROR 3");
            });
     }
     
     $scope.TeamUpdate = function(){
				$window.localStorage['club'] =false;
		 		$window.localStorage['day'] =false;
				$window.localStorage['time'] =false;
		 		
				$window.localStorage['club'] = $scope.selectedClub.ID;
				$scope.storedClub = $window.localStorage['club'];
				$window.localStorage['day'] = $scope.selectedDay.ID;
				$scope.storedDay = $window.localStorage['day'];
		 		$window.localStorage['time'] = $scope.selectedTime.ID;
				$scope.storedTime = $window.localStorage['time'];
		
            var args = {
                Club: $scope.selectedClub.ID,
                Day: $scope.selectedDay.ID,
                Time: $scope.selectedTime.ID
            };
            
        $http.get("http://regencyusedcars.co.uk/team.php", {params: args}) 
            .success(function(data) {
              
                $scope.players = data;
				
                
            })
            .error(function(data) {
             
                alert("ERROR 4");
            });
		 
     }
  $scope.create = function() {
	
	  $ionicLoading.show({template: ScoreCard.html});
  }
 
 });

App.controller('PlayerCtrl', function($scope, $window, $http) {
	
 	$scope.Clubs = [];
    $scope.selectedClub = {};
    $scope.Days = [];
    $scope.selectedDay = {};
    $scope.selectedTime = {};
    $scope.Players = {};
    $scope.TeeTimes = {}; 
	$scope.selectedPlayer = {};
	$scope.Hcp = [];
    $scope.selectedHcp = {};
	$scope.storedClub = localStorage.getItem('club');
	$scope.storedDay = localStorage.getItem('day');
	$scope.storedTime = localStorage.getItem('time');
	$scope.storedPlayer = localStorage.getItem('player');
	$scope.selectedClub.ID = $scope.storedClub;
	$scope.selectedDay.ID = $scope.storedDay;
	$scope.selectedPlayer.ID = $scope.storedPlayer;
	$scope.selectedTime.ID = $scope.storedTime;	
	$window.localStorage['hcp'] = $scope.Hcp;
	$scope.storedHcp = $window.localStorage['hcp'];
	
	$scope.refresh = function() {
				$window.localStorage['club'] = $scope.selectedClub.ID;
				$scope.storedClub = $window.localStorage['club'];
				$window.localStorage['day'] = $scope.selectedDay.ID;
				$scope.storedDay = $window.localStorage['day'];
		 		$window.localStorage['time'] = $scope.selectedTime.ID;
				$scope.storedTime = $window.localStorage['time'];
				$window.localStorage['player'] = $scope.selectedPlayer.ID;
				$scope.storedPlayer = $window.localStorage['player'];
		
		 var args = {
				
                Club: $scope.storedClub,
                //Day: $scope.storedDay,
                //Time: $scope.storedTime
            };
	 
	$http.get("http://regencyusedcars.co.uk/allPlayers.php", {params: args}) 
            .success(function(data) {
              
                $scope.aPlayers = data;
				
                
            })
            .error(function(data) {
             
                alert("ERROR 4");
            });	
  
 		         
        $http.get("http://regencyusedcars.co.uk/AppDay.php", {params: {"Club": $scope.selectedClub.ID} })
            .success(function(data) {
                $scope.Days = data;
                
            })
            .error(function(data) {
                alert("ERROR 2");
            });
	
	
        $http.get("http://regencyusedcars.co.uk/AppTime.php", {params: {"Club": $scope.selectedClub.ID, "Day": $scope.selectedDay.ID} })
            .success(function(data) {
                $scope.TeeTimes = data;
                
            })
            .error(function(data) {
                alert("ERROR 3");
            });
	
	
		var args = {
                Club: $scope.selectedClub.ID,
                           
				Player: $scope.selectedPlayer.ID
            };
            
        $http.get("http://regencyusedcars.co.uk/AHcp.php", {params: args}) 
		
            .success(function(data) {
                $scope.hcps = data;
				
                  
            })
            .error(function(data) {
            
                alert("ERROR 6");
            });
	
	 $http.get("http://regencyusedcars.co.uk/ARevHcp.php", {params: args}) 
		
            .success(function(data) {
                $scope.RevHcps = data;
				
                  
            })
            .error(function(data) {
            
                alert("ERROR 6");
            });
	
	
	}
        $http.get("http://www.regencyusedcars.co.uk/aAppCourse.php")
            .success(function(data) {
                $scope.Clubs = data;
          
              
            })    
			.error(function(data) {
                alert("ERROR 1");
            });
	
            var args = {
				
                Club: $scope.storedClub,
                Day: $scope.storedDay,
                Time: $scope.storedTime
            };
	 
	$http.get("http://regencyusedcars.co.uk/team.php", {params: args}) 
            .success(function(data) {
              
                $scope.aPlayers = data;
				
                
            })
            .error(function(data) {
             
                alert("ERROR 4");
            });	
  
 		         
        $http.get("http://regencyusedcars.co.uk/AppDay.php", {params: {"Club": $scope.selectedClub.ID} })
            .success(function(data) {
                $scope.Days = data;
                
            })
            .error(function(data) {
                alert("ERROR 2");
            });
	
	
        $http.get("http://regencyusedcars.co.uk/AppTime.php", {params: {"Club": $scope.selectedClub.ID, "Day": $scope.selectedDay.ID} })
            .success(function(data) {
                $scope.TeeTimes = data;
                
            })
            .error(function(data) {
                alert("ERROR 3");
            });
	
	
		var args = {
                Club: $scope.selectedClub.ID,
                Day: $scope.selectedDay.ID,
                Time: $scope.selectedTime.ID,
				Player: $scope.selectedPlayer.ID
            };
            
        $http.get("http://regencyusedcars.co.uk/hcp.php", {params: args}) 
		
            .success(function(data) {
                $scope.hcps = data;
				
                  
            })
            .error(function(data) {
            
                alert("ERROR 6");
            });
	
	 $http.get("http://regencyusedcars.co.uk/RevHcp.php", {params: args}) 
		
            .success(function(data) {
                $scope.RevHcps = data;
				
                  
            })
            .error(function(data) {
            
                alert("ERROR 6");
            });
	
	
	 $scope.TeamUpdate = function(){
		
				$window.localStorage['club'] =false;
		 		$window.localStorage['day'] =false;
				$window.localStorage['time'] =false;
		 		$window.localStorage['player'] =false;
		 		$window.localStorage['player'] = $scope.selectedPlayer.ID;
				$scope.storedPlayer = $window.localStorage['player'];
				$window.localStorage['club'] = $scope.selectedClub.ID;
				$scope.storedClub = $window.localStorage['club'];
				$window.localStorage['day'] = $scope.selectedDay.ID;
				$scope.storedDay = $window.localStorage['day'];
		 		$window.localStorage['time'] = $scope.selectedTime.ID;
				$scope.storedTime = $window.localStorage['time'];
		
            var args = {
                Club: $scope.selectedClub.ID,
                Day: $scope.selectedDay.ID,
                Time: $scope.selectedTime.ID
            };
            
            $http.get("http://regencyusedcars.co.uk/team.php", {params: args}) 
            .success(function(data) {
              
                $scope.players = data;
				
                
            })
            .error(function(data) {
             
                alert("ERROR 4");
            });
		 
     }
	 });
App.controller('CardParCtrl', function($scope){
	 $scope.items = [1,2,3,4,5,6,7,8,9,];
	
	
	$scope.h1 = 4;$scope.h2 = 4;$scope.h3 = 4;$scope.h4 = 4;$scope.h5 = 4;$scope.h6 = 4;$scope.h7 = 4;$scope.h8 = 4;$scope.h9 = 4;	$scope.h10 = 4;	$scope.h11 = 4;$scope.h12 = 4;$scope.h13 = 4;$scope.h14 = 4;$scope.h15 = 4;$scope.h16 = 4;$scope.h17 = 4;$scope.h18 = 4;

    $scope.result = function () {

      var answer = 0;

      answer =  $scope.h1 + $scope.h2 + $scope.h3 + $scope.h4 + $scope.h5 + $scope.h6 + $scope.h7 + $scope.h8 + $scope.h9 + $scope.h10 + $scope.h11 + $scope.h12 + $scope.h13 + $scope.h14 + $scope.h15+ $scope.h16 + $scope.h17 + $scope.h18;

      return answer;

    }

  });	 