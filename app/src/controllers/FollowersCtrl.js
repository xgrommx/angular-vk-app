/*@ngInject*/
class FollowersCtrl {
    constructor($scope, followers) {
        this.$scope = $scope;
        this.followers = followers;
    }
}

export default FollowersCtrl;