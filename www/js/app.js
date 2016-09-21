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
    }).state('app.amendCourses', {
        url: '/amendCourses',
        views: {
            'menuContent': {
                templateUrl: 'templates/amendCourses.html'
            }
        }
    }).state('app.players', {
        url: '/players',
        views: {
            'menuContent': {
                templateUrl: 'templates/players.html'
            }
        }
    }).state('app.scoreCard', {
        url: '/scoreCard',
        views: {
            'menuContent': {
                templateUrl: 'templates/scoreCard.html'
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
App.controller('ExampleController', function ($scope, $http) {
    "use strict";
    $scope.Players = {};
    $scope.selectedPlayer = {};
    var http;
    http.get("http://regencyusedcars.co.uk/AppPlayers.php", {
        params: {
            "key1": "value1",
            "key2": "value2"
        }
    }).success(function (data) {
        $scope.Players = data;
    }).error(function (data) {
        var alert;
        alert("ERROR");
    });
});
App.controller('CourseController', function ($scope, $window, $http, $state) {
    "use strict";
    //$scope.Clubs = {};
    $scope.selectedClub = {};
    //$scope.Days = [];
    $scope.selectedDay = {};
    $scope.selectedTime = {};
    //$scope.Players = {};
    //$scope.TeeTimes = {};
    $http({ url: "http://regencyusedcars.co.uk/aAppCourse.php",
            method: "GET"
           
           }).success(function (data) {
        $scope.Clubs = data;
       
    }).error(function (data) {
        alert("ERROR 1");
       
    });
               
    $scope.update = function () {
        console.log($scope.selectedClub.ID);
        $http({
            url: "http://regencyusedcars.co.uk/aAppDay.php",
            method: "POST",
            data: {'Club': $scope.selectedClub.ID}
        }).success(function (data) {
            $scope.Days = data;
           
        }).error(function (data) {
           
            alert("ERROR 2");
        });
       
    };
    $scope.DayUpdate = function () {
        console.log($scope.selectedDay.ID);
        console.log($scope.selectedClub.ID);
        var day = $scope.selectedDay.ID;
        var club = $scope.selectedClub.ID;
        $http({
            url: "http://regencyusedcars.co.uk/aAppTime.php",
            method: "POST",
            data: {'Club': club,
                    'Day': day}
        }).success(function (data) {
            $scope.TeeTimes = data;
        }).error(function (data) {
           
            alert("ERROR 3");
        });
    };
    $scope.Team2Update = function () {
        //$window.localStorage.player = false;
       
        //$window.localStorage.player = $scope.selectedPlayer.ID;
        //$scope.storedPlayer = $window.localStorage.player;
        //$state.go('app.amendPlayer');
    };
    $scope.TeamUpdate = function () {
   
        console.log($scope.selectedDay.ID);
        console.log($scope.selectedClub.ID);
        console.log($scope.selectedTime.ID);
        var day = $scope.selectedDay.ID;
        var club = $scope.selectedClub.ID;
        var time = $scope.selectedTime.ID;
       
        $http({ url: "http://regencyusedcars.co.uk/aAppTeam.php",
               method: "POST",
               data: {
                 'Club': club,
                 'Day': day,
                 'TeeTime': time
                       }
            }).success(function (data) {
            $scope.players = data;
           
        }).error(function (data) {
            alert("ERROR 3");
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
       
        var link = 'http://regencyusedcars.co.uk/aAppAddPlayer.php';
        $http.post(link, {
            'Player': $scope.data.NewPlayer,
            'TeeTime': $scope.data.Time,
            'Hcp': $scope.data.Handicap,
            'DayS': $scope.data.selectedDay,
            'Club': $scope.data.selectedClub
        }).success(function(data) {
        console.log("Success bro !" + data)
    }).error(function(data) {
        alert("ERROR" + data);
    });
    };
});
App.controller('cardCtrl', function ($scope, $window, $http, $filter, $ionicPopup) {
   
    $scope.$on("$ionicView.enter", function (event, data) {
       
        $scope.selectedPlayer = {};
        $window.localStorage.player = $scope.selectedPlayer.ID;
        $scope.storedPlayer = $window.localStorage.player;
        $scope.storedClub = localStorage.getItem('club');
        $scope.storedDay = localStorage.getItem('day');
        $scope.storedTime = localStorage.getItem('time');
        $scope.storedHcp = localStorage.getItem('hcp');
       
        $http ({url: "http://regencyusedcars.co.uk/aAppTeam.php",
                method: "POST",
                data: {
                    'Club': $scope.storedClub,
                    'Day': $scope.storedDay,
                    'TeeTime': $scope.storedTime
                    }
        }).success(function (data) {
            $scope.Players = data;
        });
        $http ({url: "http://regencyusedcars.co.uk/aAppCourses.php",
                method: "POST",
                data: {
                    'Club': $scope.storedClub
            }
        }).success(function (data1) {
            $scope.Par = data1;
           
        });
       
    $http ({ url:"http://regencyusedcars.co.uk/aAppCourse.php",
            method: "POST",
           }).success(function (data2) {
        $scope.Clubs = data2;
    }).error(function (data2) {
       
        alert("ERROR 1");
    });
    $http ({ url:"http://regencyusedcars.co.uk/aAppAmendCourse.php",
            method: "POST",
           }).success(function (data3) {
        $scope.town = data3;
    }).error(function (data3) {
       
        alert("ERROR 1");
    });   
       
    });
   
    "use strict";
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
       
        //    console.log(par);
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
        if (!$scope.Par) return 0;
       
        var total = 0;
        angular.forEach($scope.Par, function (item, index) {
            total = total + ($scope.getPoints(item) || 0);
            $scope.totPts = total;
        });
        return total;
    };
    $scope.getTotalShots = function () {
        if (!$scope.Par)
            return 0;
       
        var total = 0;
        angular.forEach($scope.Par, function (item, index) {
            total = total + ($scope.getShots(item) || 0);
        });
        return total;
    };
   
    $scope.getPar = function () {
        if (!$scope.Par)
            return 0;
       
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
       
       
        $http ({url: "http://regencyusedcars.co.uk/AHcp.php",
                method: "POST",
                data: {
                'Club': $scope.storedClub,
                'Day': $scope.storedDay,
                'Time': $scope.storedTime,
                'Player': $scope.storedPlayer }
                      }).success(function (data) {
            $scope.hcps = data;
            $scope.selectedHcp = data[0];
               })
   
   
           
        $http ({url: "http://regencyusedcars.co.uk/ARevHcp.php",
                method: "POST",
                data: {
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
            alert("ERROR 6");
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
            $http ({ url: "http://regencyusedcars.co.uk/ARevHcp.php",
                    method: "POST",
                    data: {
                'Club': $scope.storedClub,
                'Day': $scope.storedDay,
                'Time': $scope.storedTime,
                'Player': $scope.storedPlayer }
                   
            }).success(function (data) {
                $scope.hcps = data;
                $scope.selectedHcp = data[0];
            });
        }
        else {
            $http ({ url: "http://regencyusedcars.co.uk/AHcp.php",
                    method: "POST",
                    data: {
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
    $http ({ url: "http://regencyusedcars.co.uk/aAppCourses.php",
            method: "POST",
            data: {
            'Club': $scope.storedClub
        }
    }).success(function (data11) {
        // $scope.shots = ;
    });
 
 
        var myDate = new Date();
        $scope.datePlayed = myDate;   
       
        $scope.submitScore = function (datePlayed) {
           
           
           
var nHcp  = $scope.selectedRevHcp.Hcp;
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
 
   
    if (nPoints < 36)
      {
        revHcp = (parseFloat(nHcp) + 0.1);
          var RrevHcp = Math.round( revHcp * 10 ) / 10;
              console.log (RrevHcp);
           }
         if (nPoints == 36)
      {
        revHcp = (parseFloat(nHcp));
          var RrevHcp = Math.round( revHcp * 10 ) / 10;
              console.log (RrevHcp);
           }
    if (nPoints > 36 && (parseFloat(nHcp)) < 5.5)
      {
        revHcp = (parseFloat(nHcp)) - (shots * 0.1);
          var RrevHcp = Math.round( revHcp * 10 ) / 10;
            console.log (RrevHcp);
           }
    if (nPoints > 36 && (parseFloat(nHcp) > 5.4) && (parseFloat(nHcp) < 12.5 ) && shots < C)
          {
         revHcp = (parseFloat(nHcp) - (F * 0.2));
            var RrevHcp = Math.round( revHcp * 10 ) / 10;
              console.log (RrevHcp);
      }   
    if (nPoints > 36 && (parseFloat(nHcp) > 5.4)  && (parseFloat(nHcp) < 12.5 ) && shots > C)
         {
             
          RHcp = (parseFloat(nHcp) - (A * 0.2));
            revHcp = (RHcp - (D * 0.1));
                 var RrevHcp = Math.round( revHcp * 10 ) / 10;
                     console.log (RrevHcp);   
         }
    
      if(nPoints > 36 && (parseFloat(nHcp) > 12.4)  && (parseFloat(nHcp) < 20.5 ) && shots < G)
          {
             revHcp = (parseFloat(nHcp) - (F * 0.3));
             var RrevHcp = Math.round( revHcp * 10 ) / 10;
                console.log (revHcp);
       }   
    if (nPoints > 36 && (parseFloat(nHcp) > 12.4)  && (parseFloat(nHcp) < 20.5 ) && shots > G)
         {
             
              RHcp = (parseFloat(nHcp) - (E * 0.3));
                revHcp = (RHcp - (B * 0.2));
                    var RrevHcp = Math.round( revHcp * 10 ) / 10;
                         console.log (RrevHcp);
         }
     if(nPoints > 36 && (parseFloat(nHcp) > 20.4) && shots < K)
          {
             revHcp = (parseFloat(nHcp) - (F * 0.4));
              var RrevHcp = Math.round( revHcp * 10 ) / 10;
                console.log (RrevHcp);
       }   
    if(nPoints > 36 && (parseFloat(nHcp) > 20.4) && shots > K)
         {
             
              RHcp = (parseFloat(nHcp) - (H * 0.4));
                revHcp = (RHcp - (J * 0.3));
                     var RrevHcp = Math.round( revHcp * 10 ) / 10;
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
           $http ({ url: "http://regencyusedcars.co.uk/aAppSubmitScores.php",
                method: "POST",
                data: {
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
    $http ({ url: "http://regencyusedcars.co.uk/aAppTeam.php",
            method: "POST",
            data: {
            Club: $scope.storedClub,
            Day: $scope.storedDay,
            Time: $scope.storedTime }
    }).success(function (data) {
        $scope.aPlayers = data;
    }).error(function (data) {
        var alert;
        alert("ERROR 4");
    });
    $http.get("http://www.regencyusedcars.co.uk/aAppCourse.php").success(function (data) {
        $scope.Clubs = data;
    }).error(function (data) {
        var alert;
        alert("ERROR 1");
    });
    $scope.update = function () {
        $http ({url: "http://regencyusedcars.co.uk/aAppDay.php",
                method: "POST",
                data:{
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
        $http ({ url: "http://regencyusedcars.co.uk/aAppTime.php",
                method: "POST",
                data: {
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
        $http ({ url:"http://regencyusedcars.co.uk/aAppTeam.php",
                method: "POST",
                data:{
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
App.controller('PlayerCtrl', function ($scope, $window, $http, $ionicPopup) {
    "use strict";
   
   
    $scope.$on("$ionicView.enter", function (event, data) {
       
       // $window.localStorage.club = $scope.selectedClub.ID;
        //$scope.storedClub = $window.localStorage.club;
        //$scope.selectedClub.ID = $scope.storedClub;
        //$window.localStorage.day = $scope.selectedDay.ID;
        ////$scope.storedDay = $window.localStorage.day;
        //$window.localStorage.time = $scope.selectedTime.ID;
        //$scope.storedTime = $window.localStorage.time;
        //$scope.selectedTime.ID = $scope.storedTime;
        //$window.localStorage.player = $scope.selectedPlayer.ID;
        //$scope.storedPlayer = $window.localStorage.player;
        //$scope.selectedPlayer.ID = $scope.storedPlayer;
        //var $club = $scope.selectedNewClub.ID;
        //$scope.selectedPlayer.ID = [];
        $scope.selectedClub.ID = $scope.data.selectedClub;
       
        $http ({url:"http://regencyusedcars.co.uk/aAppAllPlayers.php",
                method: "POST",
                data: {
            'Club': $scope.selectedClub.ID }
        }).success(function (data) {
           
            $scope.alPlayers = data;
            $scope.p = $scope.alPlayers[0];
            //$scope.pp = $scope.p.Player;
            //$scope.selectedPlayer.ID = $scope.pp;
            //console.log ($scope.pp);
            //console.log ($scope.selectedPlayer.ID);
   
        $http ({url:"http://regencyusedcars.co.uk/AHcp.php",
                method: "POST",
                data: {
            'Club': $scope.selectedClub.ID,
            'Player': $scope.data.selectedPlayer }
        }).success(function (data) {
            $scope.hcps = data;
            $scope.ahcp = $scope.hcps[0];
            $scope.data.bhcp = $scope.ahcp.Hcp;
            console.log ($scope.data.bhcp);
       
        });
       
        $http ({url:"http://regencyusedcars.co.uk/aARevHcp.php",
                method: "POST",
                data:{
            'Club': $scope.selectedClub.ID,
            'Player': $scope.data.selectedPlayer }
        }).success(function (data) {
            $scope.RevHcps = data;
            $scope.rahcp = $scope.RevHcps[0];
            $scope.data.rbhcp = $scope.rahcp.RevHcp;
           
                });
        });
       
       
               
        //end of $scope.$on
    });
              
              
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
   
   
    $scope.refresh = function () {
        //$window.localStorage.club = $scope.selectedClub.ID;
        //$scope.storedClub = $window.localStorage.club;
        //$scope.selectedClub.ID = $scope.storedClub;
        //$window.localStorage.day = $scope.selectedDay.ID;
        //$scope.storedDay = $window.localStorage.day;
        //$window.localStorage.time = $scope.selectedTime.ID;
        //$scope.storedTime = $window.localStorage.time;
        //$scope.selectedTime.ID = $scope.storedTime;
        //$window.localStorage.player = $scope.selectedPlayer.ID;
        //$scope.storedPlayer = $window.localStorage.player;
        //$scope.selectedPlayer.ID = $scope.storedPlayer;
       
        $http ({url:"http://regencyusedcars.co.uk/aAppAllPlayers.php",
                method: "POST",
                data:{
            'Club': $scope.data.selectedClub }
        }).success(function (data) {
            $scope.alPlayers = data;
           
                       
        $http ({ url:"http://regencyusedcars.co.uk/aAppGetTime.php",
                method: "POST",
                data: {
            'Club': $scope.data.selectedClub,
            'Player': $scope.data.selectedPlayer }
        }).success(function (data) {
            $scope.Times = data;
            $scope.t = $scope.Times[0];
            $scope.data.selectedTime = $scope.t.Time;
           
           
               
        });
       
        $http ({ url:"http://regencyusedcars.co.uk/aAppGetDay.php",
                method: "POST",
                data: {
                'Club': $scope.data.selectedClub,
                'Player': $scope.data.selectedPlayer
            }
        }).success(function (data) {
            $scope.Days = data;
            $scope.dd = $scope.Days[0];
            $scope.data.selectedDay = $scope.dd.Day_S;
           
           
        })
       
        var args2 = {
            Club: $scope.data.selectedClub,
            Player: $scope.data.selectedPlayer
        };
        $http ({ url:"http://regencyusedcars.co.uk/AHcp.php",
                method: "POST",
                data:{
                'Club': $scope.data.selectedClub,
                'Player': $scope.data.selectedPlayer }
        }).success(function (data) {
            $scope.hcps = data;
            $scope.ahcp = $scope.hcps[0];
            $scope.data.bhcp = $scope.ahcp.Hcp;
           
        })
       
        $http ({ url:"http://regencyusedcars.co.uk/ARevHcp.php",
                method: "POST",
                data:{
                'Club': $scope.data.selectedClub,
                'Player': $scope.data.selectedPlayer }
        }).success(function (data) {
            $scope.RevHcps = data;
            $scope.rahcp = $scope.RevHcps[0];
            $scope.data.rbhcp = $scope.rahcp.RevHcp;
           
        })
   
   
    }).error(function (data) {
           
            alert("ERROR 3");
        });
    };
   
   
    $http.get("http://www.regencyusedcars.co.uk/aAppCourse.php").success(function (data) {
        $scope.Clubs = data;
    }).error(function (data) {
       
        alert("ERROR 1");
    });
    var args = {
        Club: $scope.storedClub,
        Day: $scope.storedDay,
        Time: $scope.storedTime
    };
    $http ({url:"http://regencyusedcars.co.uk/aAppTeam.php",
            method: "POST",
            data: {
        'Club': $scope.storedClub,
        'Day': $scope.storedDay,
        'Time': $scope.storedTime }
    }).success(function (data) {
        $scope.aPlayers = data;
    }).error(function (data) {
       
        alert("ERROR 4");
    });
    $http ({ url:"http://regencyusedcars.co.uk/aAppDay.php",
            method: "POST",
            data: {
            "Club": $scope.selectedClub.ID
        }
    }).success(function (data) {
        $scope.Days = data;
    }).error(function (data) {
       
        alert("ERROR 2");
    });
    $http ({url:"http://regencyusedcars.co.uk/aAppTime.php",
            method: "POST",
            data: {
            "Club": $scope.selectedClub.ID,
            "Day": $scope.selectedDay.ID
        }
    }).success(function (data) {
        $scope.TeeTimes = data;
    }).error(function (data) {
       
        alert("ERROR 3");
    });
    $http.get("http://regencyusedcars.co.uk/aAppTimes.php", {
       
    }).success(function (data) {
        $scope.allTeeTimes = data;
    }).error(function (data) {
       
        alert("ERROR 3");
    });
    var args = {
        'Club': $scope.selectedClub.ID,
        'Day': $scope.selectedDay.ID,
        'Time': $scope.selectedTime.ID,
        'Player': $scope.selectedPlayer.ID
    };
    $http ({ url:"http://regencyusedcars.co.uk/AHcp.php",
            method: "POST",
            data:{
            'Club': $scope.selectedClub.ID,
            'Day': $scope.selectedDay.ID,
            'Time': $scope.selectedTime.ID,
            'Player': $scope.selectedPlayer.ID }
    }).success(function (data) {
        $scope.hcps = data;
    }).error(function (data) {
       
        alert("ERROR 6");
    });
    $http ({ url:"http://regencyusedcars.co.uk/aARevHcp.php",
            method: "POST",
            data:{
            'Club': $scope.selectedClub.ID,
            'Day': $scope.selectedDay.ID,
            'Time': $scope.selectedTime.ID,
            'Player': $scope.selectedPlayer.ID }
    }).success(function (data) {
        $scope.RevHcps = data;
    }).error(function (data) {
       
        alert("ERROR 6");
    });
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
        $http ({url:"http://regencyusedcars.co.uk/aAppTeam.php",
                method: "POST",
                data: {
            'Club': $scope.selectedClub.ID,
            'Day': $scope.selectedDay.ID,
            'Time': $scope.selectedTime.ID }
        }).success(function (data) {
            $scope.players = data;
        }).error(function (data) {
           
            alert("ERROR 4");
        });
    };
    $http.get("http://regencyusedcars.co.uk/aAppTimes.php")
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
       var link = 'http://regencyusedcars.co.uk/aAppDelPlayer.php';
         $http.post(link, {
                         Player : $scope.data.selectedPlayer,
                         Hcp  : $scope.data.selectedHcp,
                         TeeTime : $scope.data.selectedTime,
                         DayS : $scope.data.selectedDay,
                         Club : $scope.data.selectedClub}).then(function (res){
            $scope.response = res.data;
           
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
       var link = 'http://regencyusedcars.co.uk/aAppAmendPlayer.php';
         $http.post(link, {
                         Player : $scope.data.selectedPlayer,
                        Club : $scope.data.selectedNewClub}).then(function (res){
            $scope.response = res.data;
           console.log ($scope.data.selectedNewClub);
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
     template: 'You are about to amend ' + $scope.data.selectedPlayer + "'" +'s deatils! '
   })
 
   confirmPopup.then(function(res) {
     if(res) {
       var link = 'http://regencyusedcars.co.uk/aAppAmendAllPlayer.php';
         $http.post(link, {
             Player : $scope.data.selectedPlayer,
             DayS : $scope.data.selectedDay,
             TeeTime : $scope.data.selectedTime,
             Hcp : $scope.data.bhcp,
             RevHcp : $scope.data.rbhcp,
             Club : $scope.data.selectedClub}).then(function (res){
            $scope.response = res.data;
           console.log ($scope.data.selectedNewClub);
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
    var link = 'http://regencyusedcars.co.uk/aAppAddPlayer.php';
                    $http.post(link, {
            'Player': $scope.data.NewPlayer,
            'TeeTime': $scope.data.Time,
            'Hcp': $scope.data.Handicap,
            'DayS': $scope.data.selectedDay,
            'Club': $scope.data.selectedClub
                            }).success(function(data)
                        {
            });
               
                             } else {
      // alert ("Action Cancelled");
                                  }
                       })
        };
    });
 
App.controller('CardParCtrl', function ($scope, $http, $ionicPopup) {
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
   
     var link = 'http://regencyusedcars.co.uk/aAppInsert.php';
        $http.post(link, {
 
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
    var args = {
            Club: $scope.storedClub,
            Day: $scope.storedDay,
            Time: $scope.storedTime,
            yrwk: $scope.week
        };
       
     $http({
         url: "http://regencyusedcars.co.uk/aAppWeeklyResults.php",
         method: "POST",
         data: {Club: $scope.storedClub,
            Day: $scope.storedDay,
            TeeTime: $scope.storedTime,
            yrwk: $scope.week}
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
       
        var args = {
            Club: $scope.storedClub,
            DayS: $scope.storedDay,
            TeeTime: $scope.storedTime
           
        };
       
        $http({
            url:"http://regencyusedcars.co.uk/aAppMaxDate.php",
            method: "POST",
            data:     {'Club': $scope.storedClub,
                    'DayS': $scope.storedDay,
                    'TeeTime': $scope.storedTime}
        }).success(function (data) {
            $scope.maxdate = data;
           
           
            var args11 = {
            'Club': $scope.storedClub,
            'DayS': $scope.storedDay,
            'TeeTime': $scope.storedTime,
            'Week': $scope.maxdate
        };
            $http({
                url:"http://regencyusedcars.co.uk/aAppResults.php",
                method: "POST",
                data: {'Club': $scope.storedClub,
                        'DayS': $scope.storedDay,
                        'TeeTime': $scope.storedTime,
                        'Week': $scope.maxdate }
           
        }).success(function (data) {
            $scope.scores = data;
                //$scope.s = $scope.scores[0];
                //$scope.scores = data;
                //console.log ($scope.scores);   
           
           
        })
           
            });
   
   
    });
});
   
App.controller('SocietyCtrl', function ($scope, $window, $http, $ionicPopup) {
    "use strict";
   
       
       
       
    $http.get("http://www.regencyusedcars.co.uk/aAppSociety.php").success(function (data) {
        $scope.Clubs = data;
    }).error(function (data) {
       
        alert("ERROR 1");
    });
   
$scope.data = {};
   
    $scope.submit = function (player) {
       
        var link = 'http://regencyusedcars.co.uk/aAppAddSocPlayer.php';
        $http.post(link, {
            'Player': $scope.data.NewPlayer,
            'Hcp': $scope.data.Handicap,
            //'Club': $scope.data.selectedClub
        }).success(function(data) {
        console.log("Success bro !" + data);
                    console.log ($scope.data.NewPlayer);
    }).error(function(data) {
            console.log ($scope.data.NewPlayer);
        alert("ERROR" + data);
           
    });
    };
});
    
