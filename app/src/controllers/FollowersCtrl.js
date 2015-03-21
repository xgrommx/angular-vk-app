class FollowersCtrl {
    constructor($scope, followers) {
        var self = this;
        self.$scope = $scope;
        self.followers = followers;
    }
}

export default FollowersCtrl;