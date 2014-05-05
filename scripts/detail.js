

(function (global) {
    var DetailViewModel,
        url =" ",
        app = global.app = global.app || {};


    DetailViewModel = kendo.data.ObservableObject.extend({
 

        infos:" ",
        impVersion:" ",
        impOS:" ",
        impWifi:" ",
        impSignal:" ",
        impMAC:" ",
        impMemory:" ",
        impTemErrors:" ",
        impDisconnections:" ",
        impHTTPErrors:" ",

        getInfo: function () {
            var that = this;
            $.ajax({ 	type: "GET",
                    	url: impURL +"?" + impInfo
                   }).done(function( response ) { 
                        console.log(response);
                		app.detailService.viewModel.update(response);              		
            	   }).fail(function(e) {
                		console.log("error");
           		   })
    	},
       update: function (response) {
            var that = this;
            var str = response.split(";");
          	if (str.length > 9) {
                //that.set("infos",response);	
                that.set("impVersion",str[1]);
                that.set("impOS",str[2]);
                that.set("impWifi",str[3]);
                that.set("impSignal",str[4]+" db");
                that.set("impMAC",str[5]);
                that.set("impMemory",str[6]);
                that.set("impTemErrors",str[7]);
                that.set("impDisconnections",str[8]);
                that.set("impHTTPErrors",str[9]);
       		}

		},

        onLogout: function () {
            var that = this;

            that.set("isLoggedIn", false);
        },


        checkEnter: function (e) {
            var that = this;
        }
    });
    
    app.detailService = {
        viewModel: new DetailViewModel()
    };
})(window);