/*@ngInject*/
class FriendsCtrl {
    constructor($scope, friends) {
        this.$scope = $scope;
        this.friends = friends;
    }
}

export default FriendsCtrl;