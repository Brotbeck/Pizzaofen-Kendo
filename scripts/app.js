(function (global) {
    var app = global.app = global.app || {};
    
 		
    
    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
        setInterval(function(){ app.ovenService.viewModel.getTemperatur()},5000);
        app.ovenService.viewModel.initialize();
        app.historyService.viewModel.initialize();
        app.historyModel.Model.initialize();
    }, false);

    app.application = new kendo.mobile.Application(document.body,{transition:'slide'}, { layout: "pizzaoven-layout"});


    
})(window);