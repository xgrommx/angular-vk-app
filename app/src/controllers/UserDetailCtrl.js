/*@ngInject*/
class UserDetailCtrl {
    constructor($scope, user) {
        this.$scope = $scope;
        this.user = user;
    }
}

export default UserDetailCtrl;