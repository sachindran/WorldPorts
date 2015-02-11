	var app = {
	    // Application Constructor
	    initialize: function() {
	        this.bindEvents();
	    },
	    // Bind Event Listeners
	    //
	    // Bind any events that are required on startup. Common events are:
	    // 'load', 'deviceready', 'offline', and 'online'.
	    bindEvents: function() {
	        document.addEventListener('deviceready', this.onDeviceReady, false);
			$(document).on("pageshow","#loginPage",function(){ // When entering pagetwo
  				loginInit();
			});
			getPortNamesAndCat();
			var flipCompSet = 0;
			$("#conflipComp").bind( "change", function(event, ui) {
					if((flipCompSet==0)&&($("#conflipComp").val()=="Compare"))
					{
						GetAllOtherPortNames();
						flipCompSet = 1;
					}
					else if((flipCompSet==1)&&($("#conflipComp").val()=="Self"))
					{
						hideOtherPorts("con");
						flipCompSet = 0;
					}
				});
			var emiflipCompSet = 0;
			$("#emiflipComp").bind( "change", function(event, ui) {
					if((emiflipCompSet==0)&&($("#emiflipComp").val()=="Compare"))
					{
						GetAllOtherPortNamesEmiWas("emi");
						emiflipCompSet = 1;
					}
					else if((emiflipCompSet==1)&&($("#emiflipComp").val()=="Self"))
					{
						hideOtherPorts("emi");
						emiflipCompSet = 0;
					}
				});
			var wasflipCompSet = 0;
			$("#wasflipComp").bind( "change", function(event, ui) {
					if((wasflipCompSet==0)&&($("#wasflipComp").val()=="Compare"))
					{
						GetAllOtherPortNamesEmiWas("was");
						wasflipCompSet = 1;
					}
					else if((wasflipCompSet==1)&&($("#wasflipComp").val()=="Self"))
					{
						hideOtherPorts("was");
						wasflipCompSet = 0;
					}
				});
			$("#conLogout").click(function(){
				window.localStorage["username"] = "";
        		window.localStorage["password"] = ""; 
			});
			checkPreAuth();

				
		},
	    // deviceready Event Handler
	    //
	    // The scope of 'this' is the event. In order to call the 'receivedEvent'
	    // function, we must explicitly call 'app.receivedEvent(...);'
	    onDeviceReady: function() {
	        app.receivedEvent('deviceready');


	    },
	    // Update DOM on a Received Event
	    receivedEvent: function(id) {
		
			alert(id);
	        console.log('Received Event: ' + id);
		}
	};
	function hideOtherPorts(Page)
	{
		if(Page == "con")
		{
			$("#otherPortsConDiv").remove();
			$("#graphCompOptions").remove();
		}
		else
		{
			$("#"+Page+"otherPortsConDiv").remove();
			$("#"+Page+"graphCompOptions").remove();
		}
	}
	function selectChange()
	{
		alert($("#conPort-name option:selected").val());
	}
	function getPortNamesAndCat()
	        {
				var jsonText = JSON.stringify({});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetPortNames", // add web service Name and web service Method Name
	                data: {},  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								$.each(data, function(index, element) 	{
										$("#conPort-name").append('<option value='+element.portId+'>'+element.portName+'</option>');
										$("#emiPort-name").append('<option value='+element.portId+'>'+element.portName+'</option>');
										$("#wasPort-name").append('<option value='+element.portId+'>'+element.portName+'</option>');
									});
								//alert(response.d.portId);
								//changePage("#Consumption");
								//window.localStorage["userId"] = response;
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
						}
	            });
				
			//var jsonText1;
			//jsonText1 = JSON.stringify({categoryType: "Consumption"});
			$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetConsumptionCategories", // add web service Name and web service Method Name
	                data: jsonText,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								$.each(data, function(index, element) 	{
										if(element.catType=="Con")
										{
											$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');	
										}
										else if(element.catType=="Emi")
										{
											$("#emiCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');	
										}
										else
										{
											$("#wasCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');	
										}
									});
								//alert(response.d.portId);
								//changePage("#Consumption");
								//window.localStorage["userId"] = response;
								 $("#emiCategory").change(function(e){
								 	$('#emiSubCategory')
    									.find('option')
    									.remove()
    									.end()
    									.append('<option>Choose Sub Category</option>');
		 							var emiCat = $("#emiCategory").val();
		 							var jsonText = JSON.stringify({ddlEmissionCategory: emiCat});
		 							$.ajax({
					                	type: "POST",
					                	url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetCategoryToxicElements", // add web service Name and web service Method Name
						                data: jsonText,  //web Service method Parameter Name and ,user Input value which in Name Variable.
										contentType: "application/json; charset=utf-8",
						                dataType: "json",
						                success: function (response)
											{
												if(response.d)
													{
														var data = JSON.parse(response.d);
														$.each(data, function(index, element) 	{
																$("#emiSubCategory").append('<option value='+element.chemicalName+'>'+element.chemicalName+'</option>');	
															});
														//alert(response.d.portId);
														//changePage("#Consumption");
														//window.localStorage["userId"] = response;
													}
												},
							                error: function (xhr, ajaxOptions, thrownError)
												{
													alert(xhr.status);
													alert(ajaxOptions);
													alert(thrownError);
												}
							            });
								 });
								$("#wasCategory").change(function(e){
									$('#wasSubCategory')
    									.find('option')
    									.remove()
    									.end()
    									.append('<option>Choose Sub Category</option>');
								 	var wasCat = $("#wasCategory").val();
								 	var jsonText = JSON.stringify({wasteCategory: wasCat});
								 	$.ajax({
								                type: "POST",
								                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetWasteSubCategories", // add web service Name and web service Method Name
								                data: jsonText,  //web Service method Parameter Name and ,user Input value which in Name Variable.
												contentType: "application/json; charset=utf-8",
								                dataType: "json",
								                success: function (response)
													{
													if(response.d)
														{
															var data = JSON.parse(response.d);
															$.each(data, function(index, element) 	{
																	$("#wasSubCategory").append('<option value='+element.SubCategory+'>'+element.SubCategory+'</option>');	
																});
															//alert(response.d.portId);
															//changePage("#Consumption");
															//window.localStorage["userId"] = response;
														}
													},
								                error: function (xhr, ajaxOptions, thrownError)
													{
														alert(xhr.status);
														alert(ajaxOptions);
														alert(thrownError);
													}
								            });
								 });	
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
						}
	            });
			jsonText1 = JSON.stringify({categoryType: "Emission"});
			jsonText1 = JSON.stringify({categoryType: "Discharge"});			
				
	        }

	function graphDataValidation()
	{
		if($("#confromDate").val() != "")
		{
			var fromDate = ($("#confromDate").val()).split("-");
			if($("#contoDate").val() != "")
			{
				var toDate = ($("#contoDate").val()).split("-");
				if(fromDate[0]<=toDate[0])
				{
					if(fromDate[0]==toDate[0])
					{
						if(fromDate[1]<=toDate[1])
						{
							if(fromDate[1]==toDate[1])
							{
								if(fromDate[2]<=toDate[2])
								{
									return true;
								}
								else
								{
									return false;
								}
							}
							else
							{
								return true;
							}
						}
						else
						{
							return false;
						}
							
					}
					else
					{
						return true;
					}
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	function graphDataValidationEmiWas(Page)
	{
		if($("#"+Page+"fromDate").val() != "")
		{
			var fromDate = ($("#"+Page+"fromDate").val()).split("-");
			if($("#"+Page+"toDate").val() != "")
			{
				var toDate = ($("#"+Page+"toDate").val()).split("-");
				if(fromDate[0]<=toDate[0])
				{
					if(fromDate[0]==toDate[0])
					{
						if(fromDate[1]<=toDate[1])
						{
							if(fromDate[1]==toDate[1])
							{
								if(fromDate[2]<=toDate[2])
								{
									return true;
								}
								else
								{
									return false;
								}
							}
							else
							{
								return true;
							}
						}
						else
						{
							return false;
						}
							
					}
					else
					{
						return true;
					}
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	function GetDataforGraph()
	{
		var portId = $("#conPort-name").val();
		var catId = $("#conCategory").val();
		if(graphDataValidation()==true && (portId!="Choose Port") && (catId!="Choose Category"))
		{
		var fromDate = ($("#confromDate").val()).split("-");
		var toDate = ($("#contoDate").val()).split("-");
		
		var jsonText1 = JSON.stringify({portId: portId,CatId: catId,fromMonth: fromDate[1],fromYear:fromDate[0],toMonth:toDate[1],toYear:toDate[0]});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetDataforGraph", // add web service Name and web service Method Name
	                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								/*$.each(data, function(index, element) 	{
										$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
									});*/
								//alert(response.d.portId);
								//changePage("#Consumption");
								//window.localStorage["userId"] = response;
								if(data.length>0)
								{
									igniteChart(data,portId,1,catId);
								}
								else
								{
									return data;
								}
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
							alert("Data unavailable");
						}
	            });
		}
		else
		{
			if((portId!="Choose Port") && (catId!="Choose Category"))
			{
				alert("Enter Valid dates");
			}
			else
			{
				if(portId!="Choose Port")
				{
					alert("Select Category");
				}
				else
				{
					alert("Select Port Name");
				}
			}
		}
	}


	function GetMultipleDataforGraph()
	{
		var otherPorts = $("#otherPortsSel").val() || [];
		var numOfPorts = (otherPorts.length)+1;
		var portId = $("#conPort-name").val();
		var catId = $("#conCategory").val();
		var validDates = graphDataValidation();
		if((validDates==true) && (numOfPorts>1)  && (portId!="Choose Port") && (catId!="Choose Category"))
		{
		otherPorts[numOfPorts-1] = portId;
		var ports = "";
		for(var i=0;i<otherPorts.length;i++)
		{
			if(i==(otherPorts.length-1))
			{
				ports += otherPorts[i];
			}
			else
			{
				ports += otherPorts[i]+",";
			}
			
		}
		var fromDate = ($("#confromDate").val()).split("-");
		var toDate = ($("#contoDate").val()).split("-");
		var jsonText1 = JSON.stringify({CatId: catId,fromMonth: fromDate[1],fromYear:fromDate[0],toMonth:toDate[1],toYear:toDate[0],portsString:ports,noOfports:numOfPorts});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetMultipleDataforGraph", // add web service Name and web service Method Name
	                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								/*$.each(data, function(index, element) 	{
										$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
									});*/
								//alert(response.d.portId);
								//changePage("#Consumption");
								//window.localStorage["userId"] = response;
								if(data.length>0)
								{
									igniteChart(data,otherPorts,numOfPorts,catId);
								}
								else
								{
									return data;
								}
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
							alert("Data unavailable");
						}
	            });
		}
		else
		{
			if(validDates == false)
			{
				alert("Enter Valid dates");
			}
			else
			{
				if(portId=="Choose Port")
				{
					alert("Select Port Name");
				}
				else if(catId=="Choose Category")
				{
					alert("Select Category");
				}
				else
				{
					alert("Select Other Ports");
				}
			}
		}
	}

	function GetDataforGraphEmiWas(Page)
	{
		var portId = $("#"+Page+"Port-name").val();
		var catId = $("#"+Page+"Category").val();
		var subCatId = $("#"+Page+"SubCategory").val();
		if(graphDataValidationEmiWas(Page)==true && (portId!="Choose Port") && (catId!="Choose Category") && (subCatId!="Choose Sub Category"))
		{
		var fromDate = ($("#"+Page+"fromDate").val()).split("-");
		var toDate = ($("#"+Page+"toDate").val()).split("-");
		
		var jsonText1 = JSON.stringify({portId: portId,CatId: catId,fromMonth: fromDate[1],fromYear:fromDate[0],toMonth:toDate[1],toYear:toDate[0],subCat:subCatId});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/"+Page+"GetDataforGraph", // add web service Name and web service Method Name
	                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								/*$.each(data, function(index, element) 	{
										$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
									});*/
								//alert(response.d.portId);
								//changePage("#Consumption");
								//window.localStorage["userId"] = response;
								if(data.length>0)
								{
									igniteChartEmiWas(data,portId,1,catId,subCatId,Page);
								}
								else
								{
									return data;
								}
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
							alert("Data unavailable");
						}
	            });
		}
		else
		{
			if((portId!="Choose Port") && (catId!="Choose Category") && (subCatId!="Choose Sub Category"))
			{
				alert("Enter Valid dates");
			}
			else
			{
				if(portId=="Choose Port")
				{
					alert("Select Port Name");
				}
				else if(catId=="Choose Category")
				{
					alert("Select Category");	
				}	
				else
				{
					alert("Select Sub Category");	
				}
			}
		}
	}


	function GetMultipleDataforGraphEmiWas(Page)
	{
		var otherPorts = $("#"+Page+"otherPortsSel").val() || [];
		var numOfPorts = (otherPorts.length)+1;
		var portId = $("#"+Page+"Port-name").val();
		var catId = $("#"+Page+"Category").val();
		var subCatId = $("#"+Page+"SubCategory").val();
		var validDates = graphDataValidationEmiWas(Page);
		if((validDates==true) && (numOfPorts>1)  && (portId!="Choose Port") && (catId!="Choose Category") && (subCatId!="Choose Sub Category"))
		{
		otherPorts[numOfPorts-1] = portId;
		var ports = "";
		for(var i=0;i<otherPorts.length;i++)
		{
			if(i==(otherPorts.length-1))
			{
				ports += otherPorts[i];
			}
			else
			{
				ports += otherPorts[i]+",";
			}
			
		}
		var fromDate = ($("#"+Page+"fromDate").val()).split("-");
		var toDate = ($("#"+Page+"toDate").val()).split("-");
		var jsonText1 = JSON.stringify({CatId: catId,fromMonth: fromDate[1],fromYear:fromDate[0],toMonth:toDate[1],toYear:toDate[0],portsString:ports,noOfports:numOfPorts,subCat:subCatId});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/"+Page+"GetMultipleDataforGraph", // add web service Name and web service Method Name
	                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								/*$.each(data, function(index, element) 	{
										$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
									});*/
								//alert(response.d.portId);
								//changePage("#Consumption");
								//window.localStorage["userId"] = response;
								if(data.length>0)
								{
									igniteChartEmiWas(data,otherPorts,numOfPorts,catId,subCatId,Page);
								}
								else
								{
									return data;
								}
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
							alert("Data unavailable");
						}
	            });
		}
		else
		{
			if(validDates == false)
			{
				alert("Enter Valid dates");
			}
			else
			{
				if(portId=="Choose Port")
				{
					alert("Select Port Name");
				}
				else if(catId=="Choose Category")
				{
					alert("Select Category");
				}
				else if(subCatId=="Choose Sub Category")
				{
					alert("Select Sub Category");
				}
				else
				{
					alert("Select Other Ports");
				}
			}
		}
	}
	function GetAllOtherPortNames()
	{
			var jsonText1 = JSON.stringify({portSelectedValue: "1",categoryId: "1"});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetAllOtherPortNames", // add web service Name and web service Method Name
	                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								//Section to append Other Ports Dropdown
								var label = document.createElement('label');
								label.setAttribute("name","otherPortsLabel");
								label.setAttribute("id","otherPortsLabel");
								label.setAttribute("for","conOtherPorts");
								label.setAttribute("align","center");
								
								var select = document.createElement('select');
								select.setAttribute("name", "otherPortsSel");
								select.setAttribute("id", "otherPortsSel");
								
								select.setAttribute("multiple", "multiple");
								var conDiv = document.createElement('div');
								conDiv.setAttribute("name","otherPortsConDiv");
								conDiv.setAttribute("id","otherPortsConDiv");
								
								$("#conOtherPorts").append(conDiv);
								$("#conOtherPorts").trigger("create");
								
								$("#otherPortsConDiv").append(label);
								$("#otherPortsConDiv").append(select);
								$("#otherPortsConDiv").trigger("create");    
								$("#otherPortsLabel").append('Other Ports');
								$.each(data, function(index, element) 	{
										$("#otherPortsSel").append('<option value='+element.portId+'>'+element.portName+'</option>');
									});
								$("#otherPortsSel").trigger("create");
								
								//Section to append Graph Compare Options
								var min = document.createElement('input');
								min.setAttribute("name", "graphCompOptions-min");
								min.setAttribute("id", "graphCompOptions-min");
								min.setAttribute("type", "checkbox");
								min.setAttribute("value", "min");
								var graphCompOptionsMinlLbl = document.createElement('label');
								graphCompOptionsMinlLbl.setAttribute("name","graphCompOptions-minlLbl");
								graphCompOptionsMinlLbl.setAttribute("id","graphCompOptions-minlLbl");
								graphCompOptionsMinlLbl.setAttribute("for","graphCompOptions-min");
								graphCompOptionsMinlLbl.setAttribute("align","center");
								
								var max = document.createElement('input');
								max.setAttribute("name", "graphCompOptions-max");
								max.setAttribute("id", "graphCompOptions-max");
								max.setAttribute("type", "checkbox");
								max.setAttribute("value", "max");
								var graphCompOptionsMaxlLbl = document.createElement('label');
								graphCompOptionsMaxlLbl.setAttribute("name","graphCompOptions-maxlLbl");
								graphCompOptionsMaxlLbl.setAttribute("id","graphCompOptions-maxlLbl");
								graphCompOptionsMaxlLbl.setAttribute("for","graphCompOptions-max");
								graphCompOptionsMaxlLbl.setAttribute("align","center");
								
								var avg = document.createElement('input');
								avg.setAttribute("name", "graphCompOptions-avg");
								avg.setAttribute("id", "graphCompOptions-avg");
								avg.setAttribute("type", "checkbox");
								avg.setAttribute("value", "avg");
								var graphCompOptionsAvglLbl = document.createElement('label');
								graphCompOptionsAvglLbl.setAttribute("name","graphCompOptions-avglLbl");
								graphCompOptionsAvglLbl.setAttribute("id","graphCompOptions-avglLbl");
								graphCompOptionsAvglLbl.setAttribute("for","graphCompOptions-avg");
								graphCompOptionsAvglLbl.setAttribute("align","center");
								
								var conCompDiv = document.createElement('div');
								conCompDiv.setAttribute("name","graphCompOptions");
								conCompDiv.setAttribute("id","graphCompOptions");
								conCompDiv.setAttribute("align","center");
								
								var table = document.createElement('table');
								table.setAttribute("id","graphCompOptions-table");
								
								var tr = [];
								var td = new Array(2);
								for(i = 0; i<2; i++)
								{
									td[i] = new Array(3);
									tr[i] = document.createElement('tr');   
									tr[i].setAttribute("id","graphCompOptions-tr"+i);
									for(j=0; j<3; j++)
									{
										td[i][j] = document.createElement('td');
										td[i][j].setAttribute("id","graphCompOptions-td"+i+j);
									}
								}
								
								$("#conGraphCompOptions").append(conCompDiv);
								$("#conGraphCompOptions").trigger("create");
								$("#graphCompOptions").append(table);
								//$("#graphCompOptions").trigger("create");
								for(i = 0; i<2; i++)
								{
									$("#graphCompOptions-table").append(tr[i]);
									
									for(j=0; j<3; j++)
									{
										$("#graphCompOptions-tr"+i).append(td[i][j]);
										if(i==0)
										{
											if(j==0)
											{
												$("#graphCompOptions-td"+i+j).append(graphCompOptionsMinlLbl);
												$("#graphCompOptions-minlLbl").append("Min");
												$("#graphCompOptions-minlLbl").trigger("create");
											}
											else if(j==1)
											{
												$("#graphCompOptions-td"+i+j).append(graphCompOptionsMaxlLbl);
												$("#graphCompOptions-maxlLbl").append("Max");
												$("#graphCompOptions-maxlLbl").trigger("create");
											}
											else
											{
												$("#graphCompOptions-td"+i+j).append(graphCompOptionsAvglLbl);
												$("#graphCompOptions-avglLbl").append("Avg");
												$("#graphCompOptions-avglLbl").trigger("create");
											}
										}
										else
										{
											if(j==0)
											{
												$("#graphCompOptions-td"+i+j).append(min);
												$("#graphCompOptions-min").trigger("create");
											}
											else if(j==1)
											{
												$("#graphCompOptions-td"+i+j).append(max);
												$("#graphCompOptions-max").trigger("create");
											}
											else
											{
												$("#graphCompOptions-td"+i+j).append(avg);
												$("#graphCompOptions-avg").trigger("create");
											}
										}
										$("#graphCompOptions-td"+i+j).trigger("create");
									}
									$("#graphCompOptions-tr"+i).trigger("create");
								}
								$("#graphCompOptions-table").trigger("create");		
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
						}
	            });
	}
	function GetAllOtherPortNamesEmiWas(Page) //portSelectedValue is static. will have to make it dynamic. SSR
	{
			var jsonText1 = JSON.stringify({portSelectedValue: "1",categoryId: "1"});
				$.ajax({
	                type: "POST",
	                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetAllOtherPortNames", // add web service Name and web service Method Name
	                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
					contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (response)
						{
						if(response.d)
							{
								var data = JSON.parse(response.d);
								//Section to append Other Ports Dropdown
								var label = document.createElement('label');
								label.setAttribute("name",Page+"otherPortsLabel");
								label.setAttribute("id",Page+"otherPortsLabel");
								label.setAttribute("for",Page+"conOtherPorts");
								label.setAttribute("align","center");
								
								var select = document.createElement('select');
								select.setAttribute("name", Page+"otherPortsSel");
								select.setAttribute("id", Page+"otherPortsSel");
								
								select.setAttribute("multiple", "multiple");
								var conDiv = document.createElement('div');
								conDiv.setAttribute("name",Page+"otherPortsConDiv");
								conDiv.setAttribute("id",Page+"otherPortsConDiv");
								
								$("#"+Page+"OtherPorts").append(conDiv);
								$("#"+Page+"OtherPorts").trigger("create");
								
								$("#"+Page+"otherPortsConDiv").append(label);
								$("#"+Page+"otherPortsConDiv").append(select);
								$("#"+Page+"otherPortsConDiv").trigger("create");    
								$("#"+Page+"otherPortsLabel").append('Other Ports');
								$.each(data, function(index, element) 	{
										$("#"+Page+"otherPortsSel").append('<option value='+element.portId+'>'+element.portName+'</option>');
									});
								$("#"+Page+"otherPortsSel").trigger("create");
								
								//Section to append Graph Compare Options
								var min = document.createElement('input');
								min.setAttribute("name", Page+"graphCompOptions-min");
								min.setAttribute("id", Page+"graphCompOptions-min");
								min.setAttribute("type", "checkbox");
								min.setAttribute("value", "min");
								var graphCompOptionsMinlLbl = document.createElement('label');
								graphCompOptionsMinlLbl.setAttribute("name",Page+"graphCompOptions-minlLbl");
								graphCompOptionsMinlLbl.setAttribute("id",Page+"graphCompOptions-minlLbl");
								graphCompOptionsMinlLbl.setAttribute("for",Page+"graphCompOptions-min");
								graphCompOptionsMinlLbl.setAttribute("align","center");
								
								var max = document.createElement('input');
								max.setAttribute("name", Page+"graphCompOptions-max");
								max.setAttribute("id", Page+"graphCompOptions-max");
								max.setAttribute("type", "checkbox");
								max.setAttribute("value", "max");
								var graphCompOptionsMaxlLbl = document.createElement('label');
								graphCompOptionsMaxlLbl.setAttribute("name",Page+"graphCompOptions-maxlLbl");
								graphCompOptionsMaxlLbl.setAttribute("id",Page+"graphCompOptions-maxlLbl");
								graphCompOptionsMaxlLbl.setAttribute("for",Page+"graphCompOptions-max");
								graphCompOptionsMaxlLbl.setAttribute("align","center");
								
								var avg = document.createElement('input');
								avg.setAttribute("name", Page+"graphCompOptions-avg");
								avg.setAttribute("id", Page+"graphCompOptions-avg");
								avg.setAttribute("type", "checkbox");
								avg.setAttribute("value", "avg");
								var graphCompOptionsAvglLbl = document.createElement('label');
								graphCompOptionsAvglLbl.setAttribute("name",Page+"graphCompOptions-avglLbl");
								graphCompOptionsAvglLbl.setAttribute("id",Page+"graphCompOptions-avglLbl");
								graphCompOptionsAvglLbl.setAttribute("for",Page+"graphCompOptions-avg");
								graphCompOptionsAvglLbl.setAttribute("align","center");
								
								var conCompDiv = document.createElement('div');
								conCompDiv.setAttribute("name",Page+"graphCompOptions");
								conCompDiv.setAttribute("id",Page+"graphCompOptions");
								conCompDiv.setAttribute("align","center");
								
								var table = document.createElement('table');
								table.setAttribute("id",Page+"graphCompOptions-table");
								
								var tr = [];
								var td = new Array(2);
								for(i = 0; i<2; i++)
								{
									td[i] = new Array(3);
									tr[i] = document.createElement('tr');   
									tr[i].setAttribute("id",Page+"graphCompOptions-tr"+i);
									for(j=0; j<3; j++)
									{
										td[i][j] = document.createElement('td');
										td[i][j].setAttribute("id",Page+"graphCompOptions-td"+i+j);
									}
								}
								
								$("#"+Page+"GraphCompOptions").append(conCompDiv);
								$("#"+Page+"GraphCompOptions").trigger("create");
								$("#"+Page+"graphCompOptions").append(table);
								//$("#graphCompOptions").trigger("create");
								for(i = 0; i<2; i++)
								{
									$("#"+Page+"graphCompOptions-table").append(tr[i]);
									
									for(j=0; j<3; j++)
									{
										$("#"+Page+"graphCompOptions-tr"+i).append(td[i][j]);
										if(i==0)
										{
											if(j==0)
											{
												$("#"+Page+"graphCompOptions-td"+i+j).append(graphCompOptionsMinlLbl);
												$("#"+Page+"graphCompOptions-minlLbl").append("Min");
												$("#"+Page+"graphCompOptions-minlLbl").trigger("create");
											}
											else if(j==1)
											{
												$("#"+Page+"graphCompOptions-td"+i+j).append(graphCompOptionsMaxlLbl);
												$("#"+Page+"graphCompOptions-maxlLbl").append("Max");
												$("#"+Page+"graphCompOptions-maxlLbl").trigger("create");
											}
											else
											{
												$("#"+Page+"graphCompOptions-td"+i+j).append(graphCompOptionsAvglLbl);
												$("#"+Page+"graphCompOptions-avglLbl").append("Avg");
												$("#"+Page+"graphCompOptions-avglLbl").trigger("create");
											}
										}
										else
										{
											if(j==0)
											{
												$("#"+Page+"graphCompOptions-td"+i+j).append(min);
												$("#"+Page+"graphCompOptions-min").trigger("create");
											}
											else if(j==1)
											{
												$("#"+Page+"graphCompOptions-td"+i+j).append(max);
												$("#"+Page+"graphCompOptions-max").trigger("create");
											}
											else
											{
												$("#"+Page+"graphCompOptions-td"+i+j).append(avg);
												$("#"+Page+"graphCompOptions-avg").trigger("create");
											}
										}
										$("#"+Page+"graphCompOptions-td"+i+j).trigger("create");
									}
									$("#"+Page+"graphCompOptions-tr"+i).trigger("create");
								}
								$("#"+Page+"graphCompOptions-table").trigger("create");		
							}
						},
	                error: function (xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(ajaxOptions);
							alert(thrownError);
						}
	            });
	}

	function displayChart() {
		if($("#conflipComp").val()=="Self")
		{
			GetDataforGraph()
		}
		else
		{
			GetMultipleDataforGraph()
		}
	}
	function DisplayChartEmiWas(Page) {
		if(Page=="emi")
		{
			if($("#emiflipComp").val()=="Self")
			{
				GetDataforGraphEmiWas(Page)
			}
			else
			{
				GetMultipleDataforGraphEmiWas(Page)
			}
		}
		else
		{
			if($("#wasflipComp").val()=="Self")
			{
				GetDataforGraphEmiWas(Page)
			}
			else
			{
				GetMultipleDataforGraphEmiWas(Page)
			}
		}
	}
	
	function resetIgniteChart()
	{
		$("#chart").igDataChart("option", "windowScaleVertical", 1);
		$("#chart").igDataChart("option", "windowScaleHorizontal", 0.1);
		
	}
	function getMonth(i)
	{
		switch(i)
		{
			case 1:
				return "Jan";
			case 2:
				return "Feb";
			case 3:
				return "Mar";
			case 4:
				return "Apr";
			case 5:
				return "May";
			case 6:
				return "Jun";
			case 7:
				return "Jul";
			case 8:
				return "Aug";
			case 9:
				return "Sep";
			case 10:
				return "Oct";
			case 11:
				return "Nov";
			case 12:
				return "Dec";
		}
	}

	function igniteChart(rawData,portIds,numOfPorts,catId)
	{
	        $(function () {
				$("#chart").igDataChart();
				$("#chart").igDataChart( "destroy" );
				$("#horizontalZoomSlider").val(1);
				$("#horizontalZoomSlider").slider('refresh');
				
				var tempNumOfPorts = numOfPorts;
				var graphData = [];
				var avgData = [];
				var maxData = [];
				var minData = [];
				var avgSeriesSet = false;
				var minSeriesSet = false;
				var maxSeriesSet = false;
				var avg = rawData[0].Column1;
				var monthsCount = (rawData.length)/numOfPorts;
				var startDate = getMonth(rawData[0].Column2)+"-"	+(rawData[0].year).toString();
				var endDate;
				var catName = portName = $("#conCategory option[value='"+catId+"']").text();
				var marker = "none";
				var thickness = 5;
				var	seriesType = $("#seriesType").val();
				if (seriesType == "area" ||
					seriesType == "splineArea" ||
					seriesType == "column" ||
					seriesType == "waterfall" ||
					seriesType == "point" ||
					seriesType == "stepArea") 
					{
						thickness = 1;
	                }
				if (seriesType == "point") 
					{
	                    marker = "circle";
	                }
				if(numOfPorts == 1)
				{
					for(i=0;i<rawData.length;i++)
					{
						var portValue = "Port"+rawData[i].portId+"Value";
						graphData[i] = {Date: getMonth(rawData[i].Column2)+"-"	+(rawData[i].year).toString()};
						graphData[i][portValue] = rawData[i].Column1;
						if(avg>rawData[i].Column1)
						{
							avg = rawData[i].Column1;
						}
					}
					endDate = getMonth(rawData[i-1].Column2)+"-"	+(rawData[i-1].year).toString()
				}
				else
				{
					for(i=0;i<monthsCount;i++)
						{
							graphData[i] = {Date: getMonth(rawData[i].Column2)+"-"	+(rawData[i].year).toString()};
							maxData[i] =  rawData[i].Column1;
							minData[i] =  rawData[i].Column1;
						}
					i=0;
					while(i<rawData.length)
					{
						var portValue = "Port"+rawData[i].portId+"Value";
						for(j=0;j<monthsCount;j++)
						{
							if(i>=monthsCount)
							{
								if(maxData[j]<rawData[i].Column1)
								{
									maxData[j] =  rawData[i].Column1;
								}
								if(minData[j]>rawData[i].Column1)
								{
									minData[j] =  rawData[i].Column1;
								}
							}
							graphData[j][portValue] = rawData[i].Column1;
							if(avg>rawData[i].Column1)
							{
								avg = rawData[i].Column1;
							}
							i++;
						}
					}
					for(j=0;j<monthsCount;j++)
						{
							graphData[j]["min"] = minData[j];
							graphData[j]["max"] = maxData[j];
							graphData[j]["avg"] = (maxData[j] + minData[j])/2;
						}
					endDate = getMonth(rawData[i-1].Column2)+"-"	+(rawData[i-1].year).toString()
				}
				var series = [];
				for(i=0;i<numOfPorts;i++)
				{
					var portId = portIds[i];
					var portName;
					var portValue = "Port"+portId+"Value";
					if(i!=(numOfPorts-1))
					{
						portName = $("#otherPortsSel option[value='"+portId+"']").text();
					}
					else
					{
						portName = $("#conPort-name option[value='"+portId+"']").text();
					}
					series[i]= {
								name: portName,
									type: $("#seriesType").val(),
									title: portName,
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: portValue,
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
				}
				i--;
				if($("#graphCompOptions-max").is(':checked'))
				{
					series[++i]= {
								name: "Maximum",
									type: $("#seriesType").val(),
									title: "Max",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "max",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
					maxSeriesSet = true;
				}
				if($("#graphCompOptions-min").is(':checked'))
				{
					series[++i]= {
								name: "Minimum",
									type: $("#seriesType").val(),
									title: "Min",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "min",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
					minSeriesSet = true;
				}
				if($("#graphCompOptions-avg").is(':checked'))
				{
					series[++i]= {
								name: "Average",
									type: $("#seriesType").val(),
									title: "Avg",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "avg",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
					avgSeriesSet = true;
				}
				var data = [
	                { "CountryName": "China", "Pop1995": 1216, "Pop2005": 1297, "Pop2015": 1361, "Pop2025": 1394 },
	                { "CountryName": "India", "Pop1995": 920, "Pop2005": 1090, "Pop2015": 1251, "Pop2025": 1396 },
	                { "CountryName": "United States", "Pop1995": 266, "Pop2005": 295, "Pop2015": 322, "Pop2025": 351 },
	                { "CountryName": "Indonesia", "Pop1995": 197, "Pop2005": 229, "Pop2015": 256, "Pop2025": 277 },
	                { "CountryName": "Brazil", "Pop1995": 161, "Pop2005": 186, "Pop2015": 204, "Pop2025": 218 }
	            ];

				var title;
				var subtitle
				if(numOfPorts>1)
					{
						title = catName+" Consumption in Ports";
						subtitle = "Graph from "+startDate+" to "+endDate;
					}
				else
					{
						title = catName+" Consumption in Port";
						subtitle = "Graph from "+startDate+" to "+endDate;
					}
				$("#chart").igDataChart({
	                legend: { element: "lineLegend" },
	                title: title,
	                subtitle: subtitle,
	                horizontalZoomable: true,
	                verticalZoomable: true,
	                dataSource: graphData,
	                axes: [
	                    {
	                        name: "DateAxis",
	                        type: "categoryX",
	                        label: "Date"
	                    },
	                    {
	                        name: "CatAxis",
	                        type: "numericY", 
	                        minimumValue: avg-1000,
	                        title: "Units",
	                    }
	                ],
	                series: series
	                    
	            });
	            $("#chart").igDataChart("resetZoom");

				$("#chart").igDataChart({defaultInteraction: "dragPan"});
	            
				$("#seriesType").change(function (e) {
	                $("#horizontalZoomSlider").val(1);
					$("#horizontalZoomSlider").slider('refresh');
				
					var marker = "none";
	                var thickness = 5,
					seriesType = $(this).val();
					if (seriesType == "area" ||
	                    seriesType == "splineArea" ||
	                    seriesType == "column" ||
	                    seriesType == "waterfall" ||
	                    seriesType == "point" ||
	                    seriesType == "stepArea") {
	                    thickness = 1;
	                }
	                if (seriesType == "point") {
	                    marker = "circle";
	                }
					for(i=0;i<tempNumOfPorts;i++)
					{
						var portId = portIds[i];
						var portName;
						var portValue = "Port"+portId+"Value";
						if(i!=(tempNumOfPorts-1))
						{
							portName = $("#otherPortsSel option[value='"+portId+"']").text();
						}
						else
						{
							portName = $("#conPort-name option[value='"+portId+"']").text();
						}
						try
						{
							$("#chart").igDataChart("option", "series", [{ name: portName,remove: true}]);
						}
						catch(err)
						{
							portName = $("#conPort-name option[value='"+portId+"']").text();
							//$("#chart").igDataChart("option", "series", [{ name: portName,remove: true}]);
							//var pLen = portIds.length;
							//igniteChart(rawData,portIds[(pLen-1)],1,catId);
							GetDataforGraph();
							break;
						}
					}
					if(numOfPorts>1)
					{
						if(maxSeriesSet)
						{
							$("#chart").igDataChart("option", "series", [{ name: "Maximum",remove: true}]);
							maxSeriesSet = false;
						}
						if(minSeriesSet)
						{
							$("#chart").igDataChart("option", "series", [{ name: "Minimum",remove: true}]);
							minSeriesSet = false;
						}
						if(avgSeriesSet)
						{
							$("#chart").igDataChart("option", "series", [{ name: "Average",remove: true}]);
							avgSeriesSet = false;
						}
					}
					for(i=0;i<numOfPorts;i++)
					{
						var portId = portIds[i];
						var portName;
						var portValue = "Port"+portId+"Value";
						if(i!=(numOfPorts-1))
						{
							portName = $("#otherPortsSel option[value='"+portId+"']").text();
						}
						else
						{
							portName = $("#conPort-name option[value='"+portId+"']").text();
						}
						$("#chart").igDataChart("option", "series", [{
									name: portName,
									type: $(this).val(),
									title: portName,
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: portValue,
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
									}]);
					}
				if($("#graphCompOptions-max").is(':checked'))
				{
					$("#chart").igDataChart("option", "series", [{
								name: "Maximum",
									type: $(this).val(),
									title: "Max",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "max",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}]);
					maxSeriesSet = true;
				}
				if($("#graphCompOptions-min").is(':checked'))
				{
					$("#chart").igDataChart("option", "series", [{
								name: "Minimum",
									type: $(this).val(),
									title: "Min",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "min",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}]);
					minSeriesSet = true;
				}
				if($("#graphCompOptions-avg").is(':checked'))
				{
					$("#chart").igDataChart("option", "series", [{
								name: "Average",
									type: $(this).val(),
									title: "Avg",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "avg",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}]);
					avgSeriesSet = true;
				}	
				$("#chart").igDataChart("resetZoom");
	            });
				$("#horizontalZoomSlider").change(function (e) {
					var val = $("#horizontalZoomSlider").val();
					val = Math.abs(val-101);
					val = val/100;
					$("#chart").igDataChart("option", "windowScaleVertical", 1);
					$("#chart").igDataChart("option", "windowScaleHorizontal", val);
				});
			});	
	}
	function igniteChartEmiWas(rawData,portIds,numOfPorts,catId,subCatId,Page)
	{
	        $(function () {
				$("#"+Page+"Chart").igDataChart();
				$("#"+Page+"Chart").igDataChart( "destroy" );
				$("#"+Page+"HorizontalZoomSlider").val(1);
				$("#"+Page+"HorizontalZoomSlider").slider('refresh');
				
				var tempNumOfPorts = numOfPorts;
				var graphData = [];
				var avgData = [];
				var maxData = [];
				var minData = [];
				var emiAvgSeriesSet = false;
				var emiMinSeriesSet = false;
				var emiMaxSeriesSet = false;
				var wasAvgSeriesSet = false;
				var wasMinSeriesSet = false;
				var wasMaxSeriesSet = false;
				var avg = rawData[0].Column1;
				var monthsCount = (rawData.length)/numOfPorts;
				var startDate = getMonth(rawData[0].Column2)+"-"	+(rawData[0].year).toString();
				var endDate;
				var catName = portName = $("#"+Page+"Category option[value='"+catId+"']").text();
				var subCatName = portName = $("#"+Page+"SubCategory option[value='"+subCatId+"']").text();
				var marker = "none";
				var thickness = 5;
				var	seriesType = $("#"+Page+"SeriesType").val();
				if (seriesType == "area" ||
					seriesType == "splineArea" ||
					seriesType == "column" ||
					seriesType == "waterfall" ||
					seriesType == "point" ||
					seriesType == "stepArea") 
					{
						thickness = 1;
	                }
				if (seriesType == "point") 
					{
	                    marker = "circle";
	                }
				if(numOfPorts == 1)
				{
					for(i=0;i<rawData.length;i++)
					{
						var portValue = "Port"+rawData[i].portId+"Value";
						graphData[i] = {Date: getMonth(rawData[i].Column2)+"-"	+(rawData[i].year).toString()};
						graphData[i][portValue] = rawData[i].Column1;
						if(avg>rawData[i].Column1)
						{
							avg = rawData[i].Column1;
						}
					}
					endDate = getMonth(rawData[i-1].Column2)+"-"	+(rawData[i-1].year).toString()
				}
				else
				{
					for(i=0;i<monthsCount;i++)
						{
							graphData[i] = {Date: getMonth(rawData[i].Column2)+"-"	+(rawData[i].year).toString()};
							maxData[i] =  rawData[i].Column1;
							minData[i] =  rawData[i].Column1;
						}
					i=0;
					while(i<rawData.length)
					{
						var portValue = "Port"+rawData[i].portId+"Value";
						for(j=0;j<monthsCount;j++)
						{
							if(i>=monthsCount)
							{
								if(maxData[j]<rawData[i].Column1)
								{
									maxData[j] =  rawData[i].Column1;
								}
								if(minData[j]>rawData[i].Column1)
								{
									minData[j] =  rawData[i].Column1;
								}
							}
							graphData[j][portValue] = rawData[i].Column1;
							if(avg>rawData[i].Column1)
							{
								avg = rawData[i].Column1;
							}
							i++;
						}
					}
					for(j=0;j<monthsCount;j++)
						{
							graphData[j]["min"] = minData[j];
							graphData[j]["max"] = maxData[j];
							graphData[j]["avg"] = (maxData[j] + minData[j])/2;
						}
					endDate = getMonth(rawData[i-1].Column2)+"-"	+(rawData[i-1].year).toString()
				}
				var series = [];
				for(i=0;i<numOfPorts;i++)
				{
					var portId = portIds[i];
					var portName;
					var portValue = "Port"+portId+"Value";
					if(i!=(numOfPorts-1))
					{
						portName = $("#"+Page+"otherPortsSel option[value='"+portId+"']").text();
					}
					else
					{
						portName = $("#"+Page+"Port-name option[value='"+portId+"']").text();
					}
					series[i]= {
								name: portName,
									type: $("#"+Page+"SeriesType").val(),
									title: portName,
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: portValue,
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
				}
				i--;
				if($("#"+Page+"graphCompOptions-max").is(':checked'))
				{
					series[++i]= {
								name: "Maximum",
									type: $("#"+Page+"SeriesType").val(),
									title: "Max",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "max",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
					if(Page == "emi")
					{			
						emiMaxSeriesSet = true;
					}
					else
					{
						wasMaxSeriesSet = true;
					}	
				}
				if($("#"+Page+"graphCompOptions-min").is(':checked'))
				{
					series[++i]= {
								name: "Minimum",
									type: $("#"+Page+"SeriesType").val(),
									title: "Min",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "min",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
					if(Page == "emi")
					{			
						emiMinSeriesSet = true;
					}
					else
					{
						wasMinSeriesSet = true;
					}
				}
				if($("#"+Page+"graphCompOptions-avg").is(':checked'))
				{
					series[++i]= {
								name: "Average",
									type: $("#"+Page+"SeriesType").val(),
									title: "Avg",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "avg",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}
					if(Page == "emi")
					{			
						emiAvgSeriesSet = true;
					}
					else
					{
						wasAvgSeriesSet = true;
					}
				}
				var data = [
	                { "CountryName": "China", "Pop1995": 1216, "Pop2005": 1297, "Pop2015": 1361, "Pop2025": 1394 },
	                { "CountryName": "India", "Pop1995": 920, "Pop2005": 1090, "Pop2015": 1251, "Pop2025": 1396 },
	                { "CountryName": "United States", "Pop1995": 266, "Pop2005": 295, "Pop2015": 322, "Pop2025": 351 },
	                { "CountryName": "Indonesia", "Pop1995": 197, "Pop2005": 229, "Pop2015": 256, "Pop2025": 277 },
	                { "CountryName": "Brazil", "Pop1995": 161, "Pop2005": 186, "Pop2015": 204, "Pop2025": 218 }
	            ];

				var title;
				var subtitle
				if(numOfPorts>1)
					{
						title = catName+" Consumption in Ports";
						subtitle = "Graph from "+startDate+" to "+endDate;
					}
				else
					{
						title = catName+" Consumption in Port";
						subtitle = "Graph from "+startDate+" to "+endDate;
					}
				$("#"+Page+"Chart").igDataChart({
	                legend: { element: Page+"LineLegend" },
	                title: title,
	                subtitle: subtitle,
	                horizontalZoomable: true,
	                verticalZoomable: true,
	                dataSource: graphData,
	                axes: [
	                    {
	                        name: "DateAxis",
	                        type: "categoryX",
	                        label: "Date"
	                    },
	                    {
	                        name: "CatAxis",
	                        type: "numericY", 
	                        minimumValue: avg-1000,
	                        title: "Units",
	                    }
	                ],
	                series: series
	                    
	            });
	            $("#"+Page+"Chart").igDataChart("resetZoom");

				$("#"+Page+"Chart").igDataChart({defaultInteraction: "dragPan"});
	            
				$("#"+Page+"SeriesType").change(function (e) {
	                $("#"+Page+"HorizontalZoomSlider").val(1);
					$("#"+Page+"HorizontalZoomSlider").slider('refresh');
				
					var marker = "none";
	                var thickness = 5,
					seriesType = $(this).val();
					if (seriesType == "area" ||
	                    seriesType == "splineArea" ||
	                    seriesType == "column" ||
	                    seriesType == "waterfall" ||
	                    seriesType == "point" ||
	                    seriesType == "stepArea") {
	                    thickness = 1;
	                }
	                if (seriesType == "point") {
	                    marker = "circle";
	                }
					for(i=0;i<tempNumOfPorts;i++)
					{
						var portId = portIds[i];
						var portName;
						var portValue = "Port"+portId+"Value";
						if(i!=(tempNumOfPorts-1))
						{
							portName = $("#"+Page+"otherPortsSel option[value='"+portId+"']").text();
						}
						else
						{
							portName = $("#"+Page+"Port-name option[value='"+portId+"']").text();
						}
						try
						{
							$("#"+Page+"Chart").igDataChart("option", "series", [{ name: portName,remove: true}]);
						}
						catch(err)
						{
							portName = $("#"+Page+"Port-name option[value='"+portId+"']").text();
							//$("#chart").igDataChart("option", "series", [{ name: portName,remove: true}]);
							//var pLen = portIds.length;
							//igniteChart(rawData,portIds[(pLen-1)],1,catId);
							GetDataforGraphEmiWas(Page);
							break;
						}
					}
					if(numOfPorts>1)
					{
						if(Page == "emi")
						{
							if(emiMaxSeriesSet)
							{
								$("#"+Page+"Chart").igDataChart("option", "series", [{ name: "Maximum",remove: true}]);
								emiMaxSeriesSet = false;
							}
							if(emiMinSeriesSet)
							{
								$("#"+Page+"Chart").igDataChart("option", "series", [{ name: "Minimum",remove: true}]);
								emiMinSeriesSet = false;
							}
							if(emiAvgSeriesSet)
							{
								$("#"+Page+"Chart").igDataChart("option", "series", [{ name: "Average",remove: true}]);
								emiAvgSeriesSet = false;
							}
						}
						else
						{
							if(wasMaxSeriesSet)
							{
								$("#"+Page+"Chart").igDataChart("option", "series", [{ name: "Maximum",remove: true}]);
								wasMaxSeriesSet = false;
							}
							if(wasMinSeriesSet)
							{
								$("#"+Page+"Chart").igDataChart("option", "series", [{ name: "Minimum",remove: true}]);
								wasMinSeriesSet = false;
							}
							if(wasAvgSeriesSet)
							{
								$("#"+Page+"Chart").igDataChart("option", "series", [{ name: "Average",remove: true}]);
								wasAvgSeriesSet = false;
							}
						}
					}
					for(i=0;i<numOfPorts;i++)
					{
						var portId = portIds[i];
						var portName;
						var portValue = "Port"+portId+"Value";
						if(i!=(numOfPorts-1))
						{
							portName = $("#"+Page+"otherPortsSel option[value='"+portId+"']").text();
						}
						else
						{
							portName = $("#"+Page+"Port-name option[value='"+portId+"']").text();
						}
						$("#"+Page+"Chart").igDataChart("option", "series", [{
									name: portName,
									type: $(this).val(),
									title: portName,
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: portValue,
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
									}]);
					}
				if($("#"+Page+"graphCompOptions-max").is(':checked'))
				{
					$("#"+Page+"Chart").igDataChart("option", "series", [{
								name: "Maximum",
									type: $(this).val(),
									title: "Max",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "max",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}]);
					if(Page == "emi")
					{			
						emiMaxSeriesSet = true;
					}
					else
					{
						wasMaxSeriesSet = true;
					}
				}
				if($("#"+Page+"graphCompOptions-min").is(':checked'))
				{
					$("#"+Page+"Chart").igDataChart("option", "series", [{
								name: "Minimum",
									type: $(this).val(),
									title: "Min",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "min",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}]);
					if(Page == "emi")
					{			
						emiMinSeriesSet = true;
					}
					else
					{
						wasMinSeriesSet = true;
					}
				}
				if($("#"+Page+"graphCompOptions-avg").is(':checked'))
				{
					$("#"+Page+"Chart").igDataChart("option", "series", [{
								name: "Average",
									type: $(this).val(),
									title: "Avg",
									xAxis: "DateAxis",
									yAxis: "CatAxis",
									valueMemberPath: "avg",
									markerType: marker,
	                    			isTransitionInEnabled: true,
									isHighlightingEnabled: true,
									thickness: thickness
								}]);
					if(Page == "emi")
					{			
						emiAvgSeriesSet = true;
					}
					else
					{
						wasAvgSeriesSet = true;
					}
				}	
				$("#"+Page+"Chart").igDataChart("resetZoom");
	            });
				$("#"+Page+"HorizontalZoomSlider").change(function (e) {
					var val = $("#"+Page+"HorizontalZoomSlider").val();
					val = Math.abs(val-101);
					val = val/100;
					$("#"+Page+"Chart").igDataChart("option", "windowScaleVertical", 1);
					$("#"+Page+"Chart").igDataChart("option", "windowScaleHorizontal", val);
				});
			});	
	}
	/*function changePage(){
	            $('#UserPage').bind("callback", function(e, args) {
	                alert(args.mydata);
	            });

	            //$.mobile.updateHash('#pg2',true);
	            //$.mobile.changePage($("#pg2"),"slide");
	            $.mobile.changePage( $("#pg2"), "slide", true, true);

	            $("page").trigger("callback");
	        }*/
	function changePage(page){
	            $(page).bind("callback", function(e, args) {
	                alert(args.mydata);
	            });

	            //$.mobile.updateHash('#pg2',true);
	            //$.mobile.changePage($("#pg2"),"slide");
	            $.mobile.changePage( $(page), "pop", true, true);

	            $("page").trigger("callback");
	        }

    function handleLogin(type) {
	    var form = $("#loginForm");  
		//$("#test").text("handleLogin hit");
	    //disable the button so we can't resubmit while we wait
	    if(type=="Nor")
	    {
	    	$("#submitButton").button('disable');
	    }
    	var u = $("#username", form).val();
    	var p = $("#password", form).val();
		//navigator.notification.alert('HI',alertDismissed,'HIT SUCCESS','DONE');
	    console.log("click");
	    if(u != '' && p!= '') {
			var jsonText = JSON.stringify({UserName : u,PassWord :p});
	        $.ajax({
				type: "POST",
				url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/ValidateUser", // add web service Name and web service Method Name
				data: jsonText,  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (response)
					{
					if(response.d=="Success")
						{
							window.localStorage["username"] = u;
	                		window.localStorage["password"] = p; 
							changePage("#Consumption");
							window.localStorage["userId"] = response;
						}
						else
						{
							alert("failed login");
							$("#submitButton").button('enable');
						}
					},
				error: function(xhr, textStatus, error){
					console.log(xhr.statusText);
					console.log(textStatus);
					console.log(error);
					$("#submitButton").button('enable');
					alert("Login Failed");
					}      
			});
			
					
			/*$.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
	            if(res == true) {
	                //store
	                window.localStorage["username"] = u;
	                window.localStorage["password"] = p;             
	                $.mobile.changePage("some.html");
	            } else {
	                navigator.notification.alert("Your login failed", function() {});
	            }
	         $("#submitButton").removeAttr("disabled");
	        },"json");
			*/
			
			
	    } else {
	        //Thanks Igor!
	        alert("You must enter a username and password", function() {});
	        $("#submitButton").removeAttr("disabled");
	    }
	    return false;
	}

	function checkPreAuth() {
	    var form = $("#loginForm");
	    if((window.localStorage["username"] != undefined && window.localStorage["password"] != undefined)&&(window.localStorage["username"] != "" && window.localStorage["password"] != "")) {
	        $("#username", form).val(window.localStorage["username"]);
	        $("#password", form).val(window.localStorage["password"]);
	        handleLogin("Pre");
	    }
	}
	function deviceReady() {
	    
		$("#loginForm").on("submit",handleLogin);
		getPortNamesAndCat();
		
	}
	function loginInit()
    {
    	$('#password').val("");
    	$('#username').val("");
    	$("#submitButton").button('enable');
    	$("#submitButton").removeClass('active');
    	$("#submitButton").trigger("create");
	}
