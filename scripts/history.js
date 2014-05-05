(function (global) {
    
    var bufferSize = 60,
        HistoryViewModel,
        app = global.app = global.app || {};
    
  

    HistoryViewModel = kendo.data.ObservableObject.extend({
        historyTxt: "nothing jet ",
        chart: null,
        initialize: function () { 
           var that = app.historyService.viewModel;
            
       
           that.set("historyTxt" , " viewModel initialized ");
        },
        onShow:	function (e) { 
             var that = app.historyService.viewModel;
             that.set("historyTxt" , " Chart with interval of seconds");
             that.RequestData(impDataSec);                     
        },
         onSeconds: function(e) { 
             var that = app.historyService.viewModel;
             that.set("historyTxt" , " Chart with interval of seconds");
             that.RequestData(impDataSec);
		 },
         onMinutes: function(e) {
             var that = app.historyService.viewModel;
             that.set("historyTxt" , " Chart with interval of minutes");
             that.RequestData(impDataMin);            
         },
         onHours:  function(e) {
             var that = app.historyService.viewModel;
             that.set("historyTxt" , " Chart with interval of hours");
             that.RequestData(impDataHou);
         },
         RequestData: function (interval) {
         	var that = app.historyService.viewModel;
         
    		 $.ajax({ 	type: "GET",url: impURL +"?" + interval,
           		}).done(function( response ) { 
                		app.historyService.viewModel.onResponse(response);              		
    	   		}).fail(function(e) {
        				console.log("error");
   		   	 })     
         },
         onResponse: function (response) {    
         /*
             we store all the received data in the datasource. Before we clear the
             datasource. the data has allways the same format the lengt is different
             and depends how long the agent is run. we fill up with null to the max 
             buffer size
         */
            var that = this;
             
            var nullSet = "0:0:0";
            var dataSets = response.split(";");
            var len = dataSets.length;
               app.historyModel.Model.initialize();    
               for (var i=1; i < bufferSize; i++) {
                   if (i < len) {
 				  	app.historyModel.Model.write(i,dataSets[i]);                      
                   } else { 
                       app.historyModel.Model.write(i,nullSet);   
                   }                               
     		} 
             $("#chart").kendoChart({
                 //
           				 title: { text: "Temperature Chart"},
							dataSource: app.historyModel.Model.historyData,
                            //valueAxis: { min: -20, max: 500, majorUnit: 2  },
                			categoryAxis: { field: "index", min: 0, max: 60, 
                                			categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60 ],
                                			majorGridLines: { color: "#C1E73D" }
                                          },
                            series: 	[ { field: "cupole", type: "line"},  
                     					 { field: "room",   type: "line"}, 			  			  
                     					 { field: "floor",  type: "line"}, 
                    				]
       					 });
		},
 
    });

    app.historyService = {
        viewModel: new HistoryViewModel()
    };
})(window);

