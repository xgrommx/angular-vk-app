/*@ngInject*/
class MainCtrl {
    constructor($scope, fields, VKApi) {
        this.$scope = $scope;
        this.VKApi = VKApi;

        VKApi.getUser(fields).then(user => {
            this.user = user;
            this.countFriends = user.counters.friends;
            this.countFollowers = user.counters.followers;
        });
    }
}

export default MainCtrl;