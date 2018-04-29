angular.module('starter.services', [])

.factory('Geocode', function($http) {
        var KEY = 'google should let me geocode for free';

        function lookup(long, lat) {
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + KEY);
        }

        return {
            lookup: lookup
        };

    })
    .factory('Location', function($q, Geocode) {

        function getInfo(long, lat) {
            console.log('ok, in getInfo with ' + long + ',' + lat);
            var deferred = $q.defer();
            Geocode.lookup(long, lat).then(function(result) {
                console.log('back from google with ');
                if (result.data && result.data.results && result.data.results.length >= 1) {
                    console.log('did i come in here?');
                    var bestMatch = result.data.results[0];
                    console.log(JSON.stringify(bestMatch));
                    var result = {
                        type: "geocode",
                        address: bestMatch.formatted_address
                    }
                    deferred.resolve(result);
                }
            });
        };
        return deferred.promise;
    });
return {
    getInfo: getInfo
};