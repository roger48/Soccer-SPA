
var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.controller('mainController',['$http','$scope',function($http,$scope) {
      $scope.year = ["select season","English Premier League 2015/16", "English Premier League 2016/17"];
      $scope.selectedYear="select season";

  $scope.selectYear=function(){

   if($scope.selectedYear==="English Premier League 2016/17")
   {
  $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json').success(function(data) {
    
    $scope.array=data;
    console.log(data);
          });
   }
   else{
      $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json').success(function(data) {
    
    $scope.array=data;
    console.log(data);
          });

   }
};

}]); 


myApp.controller('statsController',['$http','$scope',function($http,$scope) {
    $scope.year = ["Select Year","English Premier League 2015/16", "English Premier League 2016/17"];
    $scope.selectedYear = "Select Year";


    $scope.selectYear = function() {
        if ($scope.selectedYear === "English Premier League 2015/16") {
            $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json').success(function(response) {
                    stats(response);
                });
        } else {
           $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json').success(function(response) {
                    stats(response);
                });
        }
    };

    stats = function(response) {
        $scope.rounds = response.rounds;
        $scope.teamNames = [];
        $scope.teamFilter = [];
        for (x in $scope.rounds) {
            for (team in $scope.rounds[x].matches) {
                $scope.teamNames.push($scope.rounds[x].matches[team].team1.name, $scope.rounds[x].matches[team].team1.name);
            }
        }
        $scope.teamFilter = $scope.teamNames.filter(function(value, index, array) {
            return (index == array.indexOf(value));
        });
        console.log($scope.teamFilter);

        $scope.teamStats = [];
        for (stat in $scope.teamFilter) {
            $scope.teamStats.push({
                teamname: $scope.teamFilter[stat],
                played: 0,
                Won: 0,
                Lost: 0,
                Drawn: 0,
                goalsScored: 0,
                goalsAgainst: 0,
            });
        }

        for (stat in $scope.teamFilter) {
            for (x in $scope.rounds) {
                for (y in $scope.rounds[x].matches) {
                    if ($scope.rounds[x].matches[y].team1.name === $scope.teamFilter[stat]) {
                        $scope.teamStats[stat].goalsScored += $scope.rounds[x].matches[y].score1;
                        $scope.teamStats[stat].goalsAgainst += $scope.rounds[x].matches[y].score2;
                        $scope.teamStats[stat].played++;
                        if ($scope.rounds[x].matches[y].score1 > $scope.rounds[x].matches[y].score2) {
                            $scope.teamStats[stat].Won++;
                        } else if ($scope.rounds[x].matches[y].score1 < $scope.rounds[x].matches[y].score2) {
                            $scope.teamStats[stat].Lost++;
                        } else {
                            $scope.teamStats[stat].Drawn++;
                        }
                    }
                    if ($scope.rounds[x].matches[y].team2.name === $scope.teamFilter[stat]) {
                        $scope.teamStats[stat].goalsScored += $scope.rounds[x].matches[y].score2;
                        $scope.teamStats[stat].goalsAgainst += $scope.rounds[x].matches[y].score1;
                        $scope.teamStats[stat].played++;
                        if ($scope.rounds[x].matches[y].score1 > $scope.rounds[x].matches[y].score2) {
                            $scope.teamStats[stat].Lost++;
                        } else if ($scope.rounds[x].matches[y].score1 < $scope.rounds[x].matches[y].score2) {
                            $scope.teamStats[stat].Won++;
                        } else {
                            $scope.teamStats[stat].Drawn++;
                        }
                    }
                }
            }

        };
    };

}]); 


myApp.filter('teamFilter', function() {
    return function(matchArray, searchTeam) {
        var newMatchList = new Array();
        if (searchTeam === "Select Team") {
            newMatchList = matchArray;
        } else {
            for (x in matchArray) {
                if ((matchArray[x].team1.name.indexOf(searchTeam) > -1) || (matchArray[x].team2.name.indexOf(searchTeam) > -1)) {
                    newMatchList.push(matchArray[x]);
                }
            }
        }
        return newMatchList;
    }
});

