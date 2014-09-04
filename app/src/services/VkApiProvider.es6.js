function VKApi() {
    var settings = {};

    this.setSettings = (vkSettings) => {
        settings = vkSettings;
    };

    this.$get = ['$rootScope', '$q', '$log', '$timeout', 'VK', ($rootScope, $q, $log, $timeout, VK) => {
        if(typeof VK === "undefined")
            throw new Error("You forgot include VK script");
        if(typeof settings.apiId === "undefined" && typeof settings.apiVersion === "undefined")
            throw new Error("You forgot initialize settings in a config function");
        VK.init({ apiId: settings.apiId, apiVersion: settings.apiVersion });

        var authenticate = () => {
            var authenticate = {};
            if(!authenticate.deferred) {
                var deferred = $q.defer();

                VK.Auth.getLoginStatus(response => {
                    if(response.session) {
                        var mid = response.session.mid;
                        $timeout(() => deferred.resolve(mid), 0);
                    } else {
                        VK.Auth.login(response => $log.info(response, 'response'), 2 + 4 + 8 + 16);
                    }
                });

                authenticate.deferred = deferred;
            }

            return authenticate.deferred.promise;
        };

        var getMid = () => authenticate().then(mid => mid);

        var getSession = () => authenticate().then(mid => {
            var d = $q.defer();

            if(VK.Auth.getSession() != null) {
                var session = VK.Auth.getSession();

                if(session.mid === mid) {
                    d.resolve(session);
                } else {
                    d.reject(new Error("This session does not correct for current user"));
                }
            }

            return d.promise;
        });

        var getUser = (fields, uid) => authenticate().then(mid => {
            var d = $q.defer();

            VK.api('users.get', {
                uids: typeof uid === 'undefined' ? mid: uid,
                fields: fields.join(',')
            }, response => {
                if(response.response) {
                    $timeout(() => d.resolve(response.response[0]), 0);
                }
            });

            return d.promise;
        });

        var getFollowers = params => authenticate().then(mid => {
            var d = $q.defer();

            params = params || {};
            params.mid = mid;

            VK.api('users.getFollowers', params, response => {
                if(response.response) {
                    $timeout(() => d.resolve(response.response), 0);
                }
            });

            return d.promise;
        });

        var getFriends = fields => authenticate().then(mid => {
            var d = $q.defer();

            VK.api('friends.get', {
                user_id: mid,
                fields: fields.join(',')
            }, response => {
                if (response.response) {
                    $timeout(() => d.resolve(response.response), 0);
                }
            });

            return d.promise;
        });

        var photosSearch = (lat, long) => authenticate().then(mid => {
            var d = $q.defer();

            VK.api('photos.search', {
                lat: lat,
                long: long
            }, (response) => {
                if (response.response) {
                    $timeout(() => d.resolve(response.response), 0);
                }
            });

            return d.promise;
        });

        return {
            authenticate: authenticate,
            getMid: getMid,
            getUser: getUser,
            getSession: getSession,
            getFollowers: getFollowers,
            getFriends: getFriends,
            photosSearch: photosSearch
        };
    }];
}

export default VKApi;