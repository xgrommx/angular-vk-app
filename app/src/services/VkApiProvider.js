class VKApi {
    settings = {};

    setSettings(vkSettings) {
        this.settings = vkSettings;
    }

    /*@ngInject*/
    $get($rootScope, $q, $log, $timeout, VK) {
        if(typeof VK === 'undefined')
            throw new Error('You forgot include VK script');
        if(typeof this.settings.apiId === 'undefined' && typeof this.settings.apiVersion === 'undefined')
            throw new Error('You forgot initialize settings in a config function');
        VK.init({ apiId: this.settings.apiId, apiVersion: this.settings.apiVersion });

        var authenticate = () =>
            $q((resolve, reject) => {
                VK.Auth.getLoginStatus(response => {
                    if(response.session) {
                        var mid = response.session.mid;
                        $timeout(() => resolve(mid), 0);
                    } else {
                        VK.Auth.login(response => $log.info(response, 'response'), 2 + 4 + 8 + 16);
                    }
                });
            });

        var getMid = () => authenticate().then(mid => mid);

        var getSession = () => authenticate().then(mid =>
                $q((resolve, reject) => {
                    if(VK.Auth.getSession() != null) {
                        var session = VK.Auth.getSession();

                        if(session.mid === mid) {
                            resolve(session);
                        } else {
                            reject(new Error('This session does not correct for current user'));
                        }
                    }
                })
        );

        var getUser = (fields, uid) => authenticate().then(mid =>
                $q((resolve, reject) => {
                    VK.api('users.get', {
                        user_ids: typeof uid === 'undefined' ? mid: uid.join(","),
                        fields: fields.join(',')
                    }, response => {
                        if(response.response) {
                            $timeout(() => resolve(typeof uid !== 'undefined' ? response.response: response.response[0]), 0);
                        }
                    });
                })
        );

        var getFollowers = params => authenticate().then(mid => {
            params = params || {};
            params.mid = mid;

            return $q((resolve, reject) => {
                VK.api('users.getFollowers', params, response => {
                    if(response.response) {
                        $timeout(() => resolve(response.response), 0);
                    }
                });
            })
        });

        var getFriends = fields => authenticate().then(mid =>
                $q((resolve, reject) => {
                    VK.api('friends.get', {
                        user_id: mid,
                        fields: fields.join(',')
                    }, response => {
                        if (response.response) {
                            $timeout(() => resolve(response.response), 0);
                        }
                    });
                })
        );

        var photosSearch = (lat, long) => authenticate().then(mid =>
                $q((resolve, reject) => {
                    VK.api('photos.search', { lat, long }, (response) => {
                        if (response.response) {
                            $timeout(() => resolve(response.response), 0);
                        }
                    });
                })
        );

        return {
            authenticate,
            getMid,
            getUser,
            getSession,
            getFollowers,
            getFriends,
            photosSearch
        };
    }
}

export default VKApi;