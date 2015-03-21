class FriendsCtrl {
    constructor($scope, friends) {
        var self = this;
        self.$scope = $scope;
        self.friends = friends;
    }
}

export default FriendsCtrl;