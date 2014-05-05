(function (global) {
    var AboutViewModel,
        app = global.app = global.app || {};

    AboutViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",
      	onShow:	function () { 
          
      	}
    });

    app.aboutService = {
        viewModel: new AboutViewModel()
    };
})(window);