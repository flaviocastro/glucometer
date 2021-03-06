angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $scope, Auth, $location) {

    var vm = this;

    // get info if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();
        console.log("--------------------------------------\n" + vm.loggedIn + "\n-----------------------------------");
        // get user information on page load
        Auth.getUser()
            .then(function(data) {
                $rootScope.me = vm.user = data.data;
            });
    });

    // function to handle login form
    vm.doLogin = function() {
        vm.processing = true;

        // clear the error
        vm.error = '';

        Auth.login(vm.loginData.username, vm.loginData.password)
            .success(function(data) {
                vm.processing = false;

                // if a user successfully logs in, redirect to users page
                if (data.success)
                    $location.path('/users');
                else
                    vm.error = data.message;

            });
    };

    // function to handle logging out
    vm.doLogout = function() {
        Auth.logout();
        vm.user = '';
        $location.path('/login');
    };

    vm.isActive = function(viewLocation) {
        return (viewLocation === $location.path());
    };

});
