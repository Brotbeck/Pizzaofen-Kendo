(function (global) {
    var HistoryModel, TempModel, dataSource,
        app = global.app = global.app || {};
    
    
		TempModel = kendo.data.Model.define( {
	    	id: "tempId", // the identifier of the model
   	 	fields: {
                "index": { type: "number" },
        		"cupole": { type: "number" },
        		"room"  : { type: "number" },
            	"floor" : { type: "number" },
    		}
		});
    
    
 

    HistoryModel = {
        historyData : dataSource,
        
        historyTxt: "nothing jet ",
        
        initialize: function () { 
             this.historyData = new kendo.data.DataSource({
     			schema: {	model: TempModel    },
 	 		   pageSize: 60,
        		sync: function(e) {   console.log("datasource initialized");  },
			});
        },
        write: function(nr,set) {
            var oneSet = set.split(":");
            this.historyData.add({ 
                index:  (nr),
                cupole: (parseInt(oneSet[0])>1000)? 0:parseInt(oneSet[0]),
                room:   (parseInt(oneSet[1])>1000)? 0:parseInt(oneSet[1]),
                floor:  (parseInt(oneSet[2])>1000)? 0:parseInt(oneSet[2])
            }) ;
        }
 
    };

    app.historyModel = {
        Model: HistoryModel
    }
})(window);

