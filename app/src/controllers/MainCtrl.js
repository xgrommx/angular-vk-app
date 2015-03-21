class MainCtrl {
    constructor($scope, fields, VKApi) {
        var self = this;

        self.$scope = $scope;
        self.VKApi = VKApi;

        VKApi.getUser(fields).then(user => {
            self.user = user;
            self.countFriends = user.counters.friends;
            self.countFollowers = user.counters.followers;
        });
    }
}

export default MainCtrl;