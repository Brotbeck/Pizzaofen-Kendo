(function (global) {
    /*
    
    
    */
    
    var pizzaOvenViewModel,
        app = global.app = global.app || {};
    

    pizzaOvenViewModel = kendo.data.ObservableObject.extend({
        isOnline: false,
        cTemperature: "none",
        fTemperature: "none",
        rTemperature: "none",
        tTemperature: "0.0",
        
		initialize: function () {
            var that = this;
            that.clearForm();
            console.log("initialized");
        },
        
    	getTemperatur: function () {
            var that = this;
            $.ajax({ 	type: "GET",
                    	url: impURL +"?" + impTemp
                   }).done(function( response ) { 
                		that.update(response);
            	   }).fail(function(e) {
                		console.log("error");
           		   })
    	},
        
        displayTemp : function (str,l,temperatur) {
            
            var ele = $(str);
 
			if (temperatur < 2000) {
                var value = parseInt(temperatur);   
                if ((l > 1) && (l <value)) ele[0].style.backgroundColor = "#88ff88";
                else ele[0].style.backgroundColor ="";
				return value + " C°";
    		} else {
                ele[0].style.backgroundColor ="";
            	return "---";
            }
		},

        clearForm: function () {
            var that = this;
 		   that.set("cTemperature","-.-");
            that.set("fTemperature","-.-");
            that.set("rTemperature","-.-");       
        },
        
        update: function (response) {
	 		
            var that   = this;          
            var values = response.split(";");
			switch(values[0]) {
				case 'temp' : // temperature
                	var level = parseInt(that.get( "tTemperature"));               
            		that.set("cTemperature",that.displayTemp("#cTemp",level,values[1]));                
            		that.set("fTemperature",that.displayTemp("#fTemp",level,values[2]));
            		that.set("rTemperature",that.displayTemp("#rTemp",level,values[3]));
					break;
                case 'offline' : // imp is offline            
            		that.set("cTemperature",that.displayTemp("#cTemp",0,8000));                
            		that.set("fTemperature",that.displayTemp("#fTemp",0,8000));
            		that.set("rTemperature",that.displayTemp("#rTemp",0,8000));
                    break;	
                default: // any other return or error
                    break;			
			}
		}
    });

    app.ovenService = {
        viewModel: new pizzaOvenViewModel()
    };
})(window);