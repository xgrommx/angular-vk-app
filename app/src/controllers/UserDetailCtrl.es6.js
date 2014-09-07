class UserDetailCtrl {
    constructor($scope, user) {
        var self = this;
        self.$scope = $scope;
        self.user = user;
    }
}

export default UserDetailCtrl;