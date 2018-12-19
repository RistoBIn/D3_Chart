$( document ).ready(function() 
{
	var main = new classMain();
});

var classMain 	= function()
{
	var main 	= this;

	main.fld_html = "";
	main.fld_name = "";
	main.data_list= "";
	main.pup_mode = "insert";
	main.xField	  = "";
	main.yField   = "";
	main.chartType= "";



	main.init 	= function()
	{
		main.initEnv();
		main.initEnvEvent();
		main.initActionEvent();
	}

	main.initEnv 	= function()
	{
		$(".calendar").datepicker({dateFormat: "yy-mm-dd"});

		String.prototype.replaceAll = function(search, replacement) 
		{
			var target = this;
			return target.split(search).join(replacement);
		};
	}

	main.initEnvEvent = function()
	{
		$(document).click(function()
		{
			$(".active").css("display", "none");
			$(".highlight").removeClass("highlight");
		});

		$("#btn_refresh").click(function(evt)
		{
			
			var tbl_name = $(".tbl_name").html();
			var sql 	 = "SELECT * FROM " + tbl_name + " Where ";
			var grby  	 = "";
			var viewstr  = "SELECT ";

			main.xField  = "";

			
			//main.createTable(main.data_list, "table-area");

			$("#li_viewmode").find(".item").each(function()
			{
				var key  		= $(this).children("h3").html();
				var temp_cond   = "";
				
				sql = sql.replace('SELECT *', '');

				if (key == "Count of rows")
				{
					viewstr += "COUNT(*)" + " , "; 
				}

				else if(key.includes("Sum"))
				{
					temp_cond = key.replace('Sum of ', '');
					viewstr  += "SUM(" + temp_cond + ")" + " , ";
				}

				else if(key.includes("Average"))
				{
					temp_cond = key.replace('Average of ', '');
					viewstr  += "AVG(" + temp_cond + ")" + " , ";
				}

				else if(key.includes("distinct values"))
				{
					temp_cond = key.replace('Number of distinct values of ', '');
					viewstr  += "COUNT(DISTINCT" + temp_cond + ")" + " , ";
				} 

				else if(key.includes("Standard deviation of"))
				{
					temp_cond = key.replace('Standard deviation of ', '');
					viewstr += "STDDEV(" + temp_cond + ")" + " , ";
				} 

				else if(key.includes("Minimum of"))
				{
					temp_cond = key.replace('Minimum of ', '');
					viewstr += "MIN(" + temp_cond + ")" + " , ";
				} 

			});

			$("#li_filter").find(".item").each(function()
			{
				var key  = $(this).children("h5").children("info:eq(0)").html();				
				var cond = $(this).children("h5").children("info:eq(1)").html();
				if (cond) 
				{
					var val1  = $(this).children("h6:eq(0)").html();
					var val2  = $(this).children("h6:eq(1)").html();

					switch(cond)
					{
						case "Equal" :
							sql += key + " = " + val1 + " AND ";
						break;

						case "Not equal" :
							sql += key + " <> " + val1 + " AND ";
						break;

						case "Greater than" :
							sql += key + " > " + val1 + " AND ";
						break;

						case "Less thans" :
							sql += key + " < " + val1 + " AND ";
						break;

						case "Between" :
							sql += key + " BETWEEN " + val1 + " AND " + val2 + " AND ";
						break;

						case "Is" :
							sql += key + " = " + "'" + val1 +"'" + " AND ";
						break;

						case "Is not" :
							sql += key + " <> " + "'" + val1 +"'" + " AND ";
						break;

						case "Contains" :
							sql += key + " LIKE " + "'%" + val1 +"%'" + " AND ";
						break;
						
						case "Does not contain" :
							sql += key + " NOT LIKE " + "'%" + val1 +"%'" + " AND ";
						break;
					}
						
				}
				else
				{
					var birth1  = $(this).children("h6").children("info:eq(0)").html();				
					var birth2  = $(this).children("h6").children("info:eq(1)").html();
					var birth3  = $(this).children("h6").children("info:eq(2)").html();
					switch(birth1)
					{
						case "Past":
							sql += key + " BETWEEN " + "CURDATE()" + " - INTERVAL " + birth2 + " " + birth3 + " AND " +"CURDATE()" + " AND ";
						break;

						case "Next":
							sql += key + " BETWEEN " + "CURDATE()"  + " AND " + "CURDATE()" + " INTERVAL " + birth2 + " " + birth3 + " AND ";
						break;

						case "Current":
							sql += key + " = " + val2 + " AND ";
						break;

						case "Before":
							sql += key + " < " + val2 + " AND ";
						break; 

						case "After":
							sql += key + " > " + val2 + " AND ";
						break;

					}
				}
			});

			$("#li_groupby").find(".item").each(function()
			{
				var key  = $(this).children("h3").html();
				grby += key + " AND ";
			});

		
			sql  	= main.deleteLastAnd(sql);
			grby 	= main.deleteLastAnd(grby);

			if ( sql.slice(-6) == 'Where ')
			{
				sql = sql.slice(0, -6);
			}	

			if (grby)
			{
				sql  = sql + " GROUP BY " + grby; 				
			}

			
			if ( viewstr.slice(-2) == ', ')
			{
				viewstr = viewstr.slice(0, -2);
				sql		= viewstr + sql;
			}			
			

			$.ajax(
			{
				type: "POST",
				url: "php/ajax.php", 
				data: ({mode : "get_data", sql : sql}),
				success: function(result)
				{
					
					main.data_list = result;
					main.createTable(result, "table-area");
					
					console.log(main.data_list);

				}
			});


			var type  	= document.getElementById("visual_type");
			type.value  = "table";
			document.getElementById('chart-container').style.display = 'none';
			document.getElementById('table-area').style.display = 'inline';


			evt.stopPropagation();
		});

		$(".popup input").click(function(evt)
		{
			evt.stopPropagation();
		});

		$("#visual_type").on("change", function(evt)
		{
			var type  	= document.getElementById("visual_type");
			var selType = type.options[type.selectedIndex].value;
			main.chartType = selType; 

			if (selType == "table")
			{
				document.getElementById('table-area').style.display = 'inline';
				document.getElementById('chart-container').style.display = 'none';

			}
			else if(selType != "table") 
			{
				document.getElementById('table-area').style.display = 'none';
				document.getElementById('chart-container').style.display = 'inline';

				console.log(main.xField);

				if(main.xField != "")
				{
					main.updateGraph(main.data_list, main.chartType, "#chart-area");

				}
				else if(main.xField == "")
				{
					console.log("----------------");
					d3.select("#chart-area").selectAll("svg").remove();
					document.getElementById('chart-area-text').style.display = 'inline';
					document.getElementById('chart-area-button').style.display = 'inline';
				}
				
			}


			console.log(selType);	
		});

		$("#choose-axes").click(function(evt)
		{
			var col = main.columnTitles(main.data_list);
			document.getElementById('choose-window').style.display = 'inline';
			main.updateXYFields(col);

		});

		$("#view-chart").click(function(evt)
		{
			var xSelection = document.getElementById("x-field");
			var ySelection = document.getElementById("y-field");

			main.xField = xSelection.value;
			main.yField = ySelection.value;
			main.updateGraph(main.data_list, main.chartType, "#chart-area");
			document.getElementById('choose-window').style.display = 'none';
			document.getElementById('chart-area-text').style.display = 'none';
			document.getElementById('chart-area-button').style.display = 'none';			
			
		})

		$(".tag_area").click(function(evt)
		{
			$(".active").css("display", "none");
			$(".active").removeClass("active");

			main.pup_mode = "insert";

			$(this).parent().children(".main").find(".selected").removeClass("selected");
			$(this).parent().children(".main").addClass("active");
			$(this).parent().children(".main").fadeIn();

			$(this).parent().find(".popup").each(function()
			{
				$(this).css({"margin-left" : "0px"});
			});

			$(this).parent().find(".btn_add_filter").val("Add Filter");
			$(this).parent().find(".btn_add_filter").attr("mode", "add");
			$(this).parent().find(".txt_srch_val").val("");
			$(this).parent().find(".txt_srch_between").val("");

			evt.stopPropagation();
			evt.preventDefault();
		});

		$("#tbl_list dd").click(function(evt)
		{
			var tbl_name = $(this).children("info").html();

			$(".tbl_name").html( tbl_name );

			main.tbl_name = tbl_name;

			$.ajax(
			{
				type: "POST",
				url: "php/ajax.php", 
				data: ({mode : "get_field", tbl_name : tbl_name}),
				success: function(result)
				{
					main.fld_html = result;

					$(".field_list").each(function()
					{
						$(this).html(main.fld_html);
					});
				}
			});

			$(".active").css("display", "none");

			evt.stopPropagation();
			evt.preventDefault();
		});

		

		$(".main").on('click', ".field_list dd", function(evt)
		{
			var tbl_name  = $(".tbl_name").html();
			
			main.fld_name = $(this).find("info").html();

			//$(this).parents(".dropdown").find(".details h3 info").html(tbl_name + " - " + main.fld_name);
			//$(this).parents(".main").css("display", "none");
			$(this).parents(".main").removeClass("active");

			switch($(this).attr("info"))
			{
				case "int" : 
					$(this).parents(".dropdown").find(".details_number").css({"display" : "block"});
					$(this).parents(".dropdown").find(".details_number").addClass("active");
				break;

				case "string" :
					$(this).parents(".dropdown").find(".details_string").css({"display" : "block"});
					$(this).parents(".dropdown").find(".details_string").addClass("active");
				break;

				case "date" :
					$(this).parents(".dropdown").find(".details_date").css({"display" : "block"});
					$(this).parents(".dropdown").find(".details_date").addClass("active");
					$(this).parents(".dropdown").find(".details_date").find(".txt_srch_val").css("display", "block");
					$(this).parents(".dropdown").find(".calendar_area").css("display", "none");
					$(this).parents(".dropdown").find(".btn_view_drop:eq(1)").css("display", "block");
				break;
			}

			evt.stopPropagation();
		});

		$(".details h3").click(function(evt)
		{
			$(this).parent().css("display", "none");
			$(this).parents(".dropdown").find(".view_main_pup").addClass("active");
			$(this).parents(".dropdown").find(".view_main_pup").css("display", "block");

			if($(this).parents(".view_details_fld").length)
			{
				$(this).parents(".view_mode").find(".view_main_pup").css("display", "block");
			}

			evt.stopPropagation();
		});

		$(".btn_view_more").click(function()
		{
			$(this).parent().children(".show_more_area").css("display", "block");
			$(this).css("display", "none");
		});

		$(".btn_view_drop").click(function(evt)
		{
			var target = $(this).next();//parent().children(".show_more_area");

			if(target.css("display") == "none")
				target.css("display", "block");
			else
				target.css("display", "none");

			evt.stopPropagation();
		});

		$(".basic_options input, .show_more_area input").click(function()
		{
			$(".active_btn").removeClass("active_btn");
			$(this).addClass("active_btn");

			$(".txt_srch_val").css("display", "block");
			$(".txt_srch_between").css("display", "none");

			switch($(this).val())
			{
				case "Between" :
					$(".txt_srch_between").css("display", "block");
				break;
				case "Is empty":
				case "Not empty":
					$(".txt_srch_val").css("display", "none");
				break;
			}
		});

		$(".show_more_area dd").click(function(evt)
		{
			var value 	= $(this).children("info").html();
			var prev 	= $(this).parents(".show_more_area").prev();

			$(this).parents(".popup").find(".btn_view_drop:eq(1)").css("display", "block");

			if($(this).parents(".date_main_option").length)
			{
				$(this).parents(".popup").find(".txt_srch_val").css("display", "block");
				$(this).parents(".popup").find(".calendar_area").css("display", "none");

				switch(value)
				{
					case "Current" : 
						$(this).parents(".popup").find(".txt_srch_val").css("display", "none");
					break;

					case "Before" : 
						$(this).parents(".popup").find(".txt_srch_val").css("display", "none");
						$(this).parents(".popup").find(".calendar_area").css("display", "block");
						$(this).parents(".popup").find(".btn_view_drop:eq(1)").css("display", "none");
						$(this).parents(".popup").find(".show_more_area:eq(1)").css("display", "none");
					break;

					case "After" : 
						$(this).parents(".popup").find(".txt_srch_val").css("display", "none");
						$(this).parents(".popup").find(".calendar_area").css("display", "block");
						$(this).parents(".popup").find(".btn_view_drop:eq(1)").css("display", "none");
						$(this).parents(".popup").find(".show_more_area:eq(1)").css("display", "none");
					break;
				}
			}

			prev.children("info").html(value);

			$(this).parent().parent().css("display", "none");

			evt.stopPropagation();
		});
	}

	main.initActionEvent 	= function()
	{
		$(".btn_add_filter").click(function()
		{
			var srch_val = $(this).parents(".popup").find(".txt_srch_val").val();
			var sel_btn  = $(this).parents(".popup").find(".active_btn").val();
			var mode 	 = $(this).parents(".popup").attr("class");
				mode 	 = mode.replace("popup", "").replace("details", "").replace("active", "");
				mode 	 = mode.replaceAll(" ", "");
			
			var tbl_name = $(".tbl_name").html();
			var html 	 = "<div class='item' data='" + mode + "'>";

			if(mode == "details_date")
			{
				var type = $(this).parents(".popup").find(".btn_view_drop:eq(0)").children("info").html();

				switch(type)
				{
					case "Past" :
					case "Next" :
						html 	 += "<h5><info>" + main.fld_name + "</info></h5>";
						srch_val  = "<info>" + type + "</info> <info>" + srch_val + "</info> ";
						srch_val += "<info>" + $(this).parents(".popup").find(".btn_view_drop:eq(1)").children("info").html() + "</info>s";
					break;

					case "Current" :
						html 	 += "<h5><info>" + main.fld_name + "</info> At</h5>";

						if($(this).parents(".popup").find(".btn_view_drop:eq(1)").children("info").html() == "Day")
							srch_val  = "<info>Today</info> ";
						else
							srch_val  = "<info>This " + $(this).parents(".popup").find(".btn_view_drop:eq(1)").children("info").html() + "</info> ";
					break;

					case "Before" :
					case "After" :
						html 	+= "<h5><info>" + main.fld_name + "</info> is ";
						html 	+= "<info>" + type + "</info></h5>";
						
						srch_val = $(this).parents(".popup").find(".calendar").datepicker( "getDate" );
						srch_val = $.datepicker.formatDate("yy-mm-dd", srch_val);
					break;
				}

				html += "<h6 type='" + type + "'>" + srch_val + "</h6>";
				html += '<a><svg class="Icon Icon-close" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="close" size="14"><path d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z "></path></svg></a></div>';
			}
			else
			{
				html += "<h5><info>" + main.fld_name + "</info> is <info>" + sel_btn + "</info></h5>";
				html += "<h6>" + srch_val + "</h6>";

				if(sel_btn && sel_btn.toLowerCase() == "between")
				{
					html += "<h6>" + $(this).parents(".popup").find(".txt_srch_between").val() + "</h6>";
				}
				
				html += '<a><svg class="Icon Icon-close" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="close" size="14"><path d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z "></path></svg></a></div>';
			}

			if($(this).attr("mode") == "update")
			{
				$(this).parents(".dropdown").find(".highlight").before(html);
				$(this).parents(".dropdown").find(".highlight").remove();
			}
			else
			{
				$(this).parents(".dropdown").find(".tag_inside").children("p").before(html);
			}

			$(this).parents(".dropdown").find(".tag_inside").children("p").css("display", "none");
			$(this).parents(".popup").css("display", "none");
		});

		$(".tag_area").on("click", ".item", function(evt)
		{
			var mode 		= $(this).attr("data");
			var active_elem = $(this).parents(".dropdown").find("." + mode);
			var filter_cond	= $(this).find("info:eq(1)").html();
			var filter_val 	= $(this).find("h6:eq(0)").html();
			var between_val = $(this).find("h6:eq(1)").html();
			var curr_pos 	= main.getOffset($(this)[0]);
			var pare_pos 	= main.getOffset($(this).parents(".dropdown")[0]);
			var option_val 	= $(this).find("h3").html();

			$(".active").css("display", "none");
			$(".highlight").removeClass("highlight");

			$(this).addClass("highlight");

			active_elem.css({"display" : "block"});
			active_elem.addClass("active");
			active_elem.find(".selected").removeClass("selected");

			main.pup_mode = "update";

			if(mode == "details_date")
			{
				var type 	 = $(this).find("h6:eq(0)").attr("type");
				var duration = $(this).find("h6:eq(0)").children("info:eq(2)").html();

				active_elem.find(".txt_srch_val").css("display", "none");
				active_elem.find(".calendar_area").css("display", "none");
				active_elem.find(".btn_view_drop:eq(1)").css("display", "none");
				active_elem.find(".show_more_area:eq(1)").css("display", "none");

				switch(type)
				{
					case "Past" :
					case "Next" :
						filter_val = $(this).find("h6:eq(0)").children("info:eq(1)").html();

						active_elem.find(".txt_srch_val").css("display", "block");
						active_elem.find(".btn_view_drop:eq(1)").css("display", "block");
						
						active_elem.find(".btn_view_drop:eq(1)").children("info").html(duration);
						active_elem.find(".txt_srch_val").val(filter_val);
					break;
					case "Current" :
						filter_val = $(this).find("h6:eq(0)").children("info").html().replace("This ", "");

						active_elem.find(".txt_srch_val").css("display", "none");

						if(filter_val == "Today")
							active_elem.find(".btn_view_drop:eq(1)").children("info").html("Day");
						else
							active_elem.find(".btn_view_drop:eq(1)").children("info").html(filter_val);
					break;
					case "After" :
					case "Before" :
						filter_val = $(this).find("h6:eq(0)").html();

						active_elem.find(".calendar_area").css("display", "block");
						active_elem.find(".calendar" ).datepicker( "setDate", filter_val);
					break;
				}

				active_elem.find(".btn_view_drop:eq(0)").children("info").html(type);
			}
			else if(mode == "view_main_pup" || mode == "view_details_fld" || mode == "group_main_pup")
			{
				active_elem.find("dd").each(function()
				{
					if($(this).children("info").html() == option_val)
					{
						$(this).addClass("selected");
					}
				});
			}
			else
			{
				active_elem.find(".txt_srch_val").val(filter_val);
				active_elem.find(".txt_srch_between").val(between_val);
			}

			$(this).parents(".dropdown").find(".btn_add_filter").each(function()
			{
				$(this).val("Update Filter");
				$(this).attr("mode", "update");
			});

			active_elem.find("input[type='button']").each(function()
			{
				$(this).removeClass("active_btn");

				if($(this).val() == filter_cond)
				{
					$(this).addClass("active_btn");
				}
			});

			$(this).parents(".dropdown").find(".popup").each(function()
			{
				$(this).css({"margin-left" : (evt.clientX - pare_pos.left) + "px"});
			});

			evt.stopPropagation();
		});

		$(".view_mode").on("click", "dd", function(evt)
		{
			var title = $(this).children("info").html();

			if (title=="Raw data") 
			{
				return;
			}

			var html  = "<div class='item' data='view_main_pup'>";


			if($(this).hasClass("field_show"))
			{
				$(this).parents(".popup").css("display", "none");
				$(this).parents(".dropdown").find(".view_details_fld").css("display", "block");
				$(this).parents(".dropdown").find(".view_details_fld").children("h3").children("info").html(title);

				evt.stopPropagation();
				return;
			}
			else
			{
				if($(this).parents(".popup").hasClass("view_details_fld"))
				{
					title 	= $(".view_details_fld").children("h3").children("info").html().replace("...", "") +  title ;
					html 	= "<div class='item' data='view_details_fld'>";
				}

				html += "<h3>" + title + "</h3>";
				html += '<a><svg class="Icon Icon-close" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="close" size="14"><path d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z "></path></svg></a>';
				html += "</div>";
			}

			if(main.pup_mode == "update")
			{
				$(this).parents(".dropdown").find(".highlight").before(html);
				$(this).parents(".dropdown").find(".highlight").remove();
			}
			else
			{
				if($(this).parents(".dropdown").find(".tag_inside").find(".item").length)
				{
					html = "<span class='spliter'> and </span>" + html;
				}

				$(this).parents(".dropdown").find(".tag_inside").children("p").before(html);
				$(this).parents(".dropdown").find(".tag_inside").children("p").css("display", "none");
			}

			$(this).parents(".popup").css("display", "none");
		});

		$(".group_main_pup").on("click", "dd", function(evt)
		{
			var title = $(this).children("info").html();
			var html  = "<div class='item' data='group_main_pup'>";

			html += "<h3>" + title + "</h3>";
			html += '<a><svg class="Icon Icon-close" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="close" size="14"><path d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z "></path></svg></a>';
			html += "</div>";

			if(main.pup_mode == "update")
			{
				$(this).parents(".dropdown").find(".highlight").before(html);
				$(this).parents(".dropdown").find(".highlight").remove();
			}
			else
			{

				if($(this).parents(".dropdown").find(".tag_inside").find(".item").length)
				{
					html = "<span class='spliter'> and </span>" + html;
				}

				$(this).parents(".dropdown").find(".tag_inside").children("p").before(html);
				$(this).parents(".dropdown").find(".tag_inside").children("p").css("display", "none");
			}

			$(this).parents(".popup").css("display", "none");
		});

		$(".calendar").on("click", function(evt)
		{
			evt.stopPropagation();
		});

		$(".tag_area").on("click", ".item a", function(evt)
		{
			var parent = $(this).parent().parent();
			var length = parent.find(".item").length;

			if($(this).parent().next().hasClass("spliter"))
			{
				$(this).parent().next().remove();	
			}

			$(this).parent().remove();

			if( length == 1)
			{
				parent.children("p").css("display", "block");
			}

			evt.stopPropagation();
		});

		$(".txt_filter").on("keyup", function()
		{
			var key = $(this).val();

			if(key == "")
			{
				$(this).parent().parent().find(".selected").removeClass("selected");
				return;
			}

			$(this).parent().parent().find("dd").each(function()
			{
				$(this).removeClass("selected");

				if($(this).children("info").html().indexOf(key) != -1)
				{
					$(this).addClass("selected");
				}
			});
		});


		
	}

	main.deleteLastAnd = function(str)
	{
		var temp = str.slice(-5);
		if (temp == " AND ")
		{
			str  = str.slice(0, -5);
		}
		return str; 
	}

	main.createTable = function(data, selector)
	{
		var dataList = jQuery.parseJSON(data);
		var col = [];
	
		for (var i = 0; i < dataList.length; i++) 
		{
            for (var key in dataList[i]) 
            {
                if (col.indexOf(key) === -1) 
                {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);    

        for (var i = 0; i < col.length; i++) 
        {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        } 

         // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < dataList.length; i++) 
        {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) 
            {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = dataList[i][col[j]];
            }
        }


        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById(selector);
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

	}

	main.columnTitles = function(data)
	{
		var currentTable = jQuery.parseJSON(data);
	    var columnTitles = [];
	    for (var i = 0; i < currentTable.length; i++) 
	    {
	      	for (var key in currentTable[i]) 
	      	{
	          	if (columnTitles.indexOf(key) === -1) 
	          	{
	             	columnTitles.push(key);
	          	}
	      	}
	    }
	    return columnTitles;
	}

	main.updateXYFields = function(colTitles)
	{	
		var availableRows = ["Latitude", "Longitude", "price", "rating"];
		var availableCols = ["id", "address", "city", "birthday", "name","email", "category", "vendor", "createAt", "ean", "title"]; //, "Name"
		var xSelection = document.getElementById("x-field");
		var ySelection = document.getElementById("y-field");
				
		xSelection.innerHTML = "";
		ySelection.innerHTML = "";
		xField = "";
		yField = "";
		for (var i = 0; i < colTitles.length; i++) 
		{
		    for (var k = 0; k < availableCols.length; k++) 
		    {
				if(colTitles[i].match(availableCols[k]))
				{
				    var optionX = document.createElement("option");
				    optionX.value = colTitles[i];
				    optionX.text = colTitles[i];
				    xSelection.appendChild(optionX);
				    if(xField == "")
				      xField = colTitles[i];
				}
		    }
		    xField = xSelection.firstChild.value;
		    for (var j = 0; j < availableRows.length; j++) 
		    {
			    if(colTitles[i].match(availableRows[j]))
			    {
			        var optionY = document.createElement("option");
			        optionY.value = colTitles[i];
			        optionY.text = colTitles[i];
			        ySelection.appendChild(optionY);
			        if(yField == "")
			          yField = colTitles[i];
			    }
		    }
		    
		    console.log("x = " + xField + ": y=" + yField);
		}

	}

	main.updateGraph = function(data, chartType, chartAreaID)
	{
		var graphData = jQuery.parseJSON(data);
		var svg;
		var x;
		var y;
		var xAxis;
		var yAxis;

		var margin = {top: 40, right: 40, bottom: 60, left: 60};
		var width = $("#chart-area").width() - margin.left - margin.right;
		var height = $("#chart-area").height() - margin.top - margin.bottom;

		var bFlag = -1;
		var cntTickIdt = 6;
		var cntTickDef = 5;	

		var tip = d3.tip()
		    .attr('class', 'd3-tip')
		    .offset([-10, 0])
		    .html(function(d) 
		    {
		      return "<div><span>ID:</span> <span style='color:white'>" + d.id + "</span></div><br/>" +
		              "<div><span>Latitude:</span> <span style='color:white'>" + d.Latitude + "</span></div>";
		    })


		graphData.forEach(function(d)
		{

			if(bFlag == -1) 
			{
		        if(!(/^\d+$/.test(d[xField])) || (!parseInt(d[xField])))
		        {
		          bFlag = 1;
		        }
		        else
		        {
		          bFlag = 0;
		        }
		    }
		      
		    if(bFlag == 1) 
		    {
		        d.x = d[xField];

		    }
		    else 
		    {
		        d.x = parseInt(d[xField]);
		    }
		    d.y = parseFloat(d[yField]);
		    
		});

		console.log(chartAreaID);
		d3.select(chartAreaID).selectAll("svg").remove();

		svg = d3.select(chartAreaID).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		if(bFlag == 1) 
		{
		    x = d3.scale.ordinal().rangeRoundBands([0, width]);
		    x.domain(graphData.map(function(d) { return d.x; }));
		    xAxis = d3.svg.axis()
		                .scale(x)
		                .orient("bottom")
		                .tickValues(x.domain().filter(function(d, i) { if(graphData.length > cntTickIdt) return (i % (graphData.length / cntTickDef)); else return true; }));

		}
		else 
		{      
		    x = d3.time.scale().range([0, width]);
		    x.domain(d3.extent(graphData, function(d) { return d.x; }));
		    xAxis = d3.svg.axis().scale(x)
		      .orient("bottom").ticks(5)
		      .tickFormat(d3.format("d"));
		}

		y = d3.scale.linear().range([height,0]);
		yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
  		y.domain([d3.min(graphData, function(d) { return d.y; }), d3.max(graphData, function(d) {return d.y; })]);

  		// Draw Chart
		if (chartType == 'linechart' || chartType == 'areachart') 
		{
		    var valueline = d3.svg.line()
		        .x(function(d, i){ if(bFlag == 1) return width / (graphData.length - 1) * (i); else return x(d.x); })
		        .y(function(d){ return y(d.y); });

		    var valuearea = d3.svg.area()
		        .x(function(d, i) {if(bFlag == 1) return width / (graphData.length - 1) * (i); else return x(d.x);})
		        .y0(height)
		        .y1(function(d) { return y(d.y);});

			if(chartType == 'areachart') 
			{
			      svg.append("path")
			           .data([graphData])
			           .attr("class", "area")
			           .attr("d", valuearea);
			}

			// Add the X Axis
		    svg.append("g")     
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .append("text")
		      .attr("stroke", "#cccccc")
		      .attr("id", "X-Anchor")
		      .attr("x", 260)
		      .attr("y", 40)
		      .attr("dx", ".1em")
		      .style("text-anchor", "end")
		      .text(xField);

		    // Add the Y Axis
		    svg.append("g")    
		      .attr("class", "y axis")
		      .call(yAxis)
		      .append("text")
		      .attr("stroke", "#cccccc")
		      .attr("id", "Y-Anchor")
		      .attr("transform", "translate(-40, 120), rotate(-90)")
		      .attr("y", -6)
		      .attr("dy", ".1em")
		      .style("text-anchor", "end")
		      .text(yField);
		    // add the valueline path.
		    svg.append("path")
		        .data([graphData])
		        .attr("class", "line")
		        .attr("d", valueline)
		    	.call(tip);

		    // draw the scatterplot
		    tip.html(function(d) {
		      return "<p><span>" + xField + ": "+ d.x + "</span> </p>" +  " <span> " + yField + ": " + d.y + "</span>";
		    });
		    svg.selectAll(".dot")                 // provides a suitable grouping for the svg elements that will be added
		      .data(graphData)                     // associates the range of data to the group of elements
		      .enter().append("circle")               // adds a circle for each data point
		      .attr("class", "dot")                 // with a radius of 3.5 pixels      
		      .attr("fill", "white")
		      .attr("cx", function(d, i) { if(bFlag == 1) return width / (graphData.length - 1) * (i); else return x(d.x) })    // at an appropriate x coordinate 
		      .attr("cy", function(d) { return y(d.y); })   // and an appropriate y coordinate
		      .on("mouseover", function(d){
		          
		          d3.select(this).attr("r", 5).style("fill", "rgb(80, 158, 227)");          
		          return tip.show(d);
		          })
		      .on("mousemove", function(){        
		                })
		      .on("mouseout", function(){                
		        d3.select(this).attr("r", 5).style("fill", "white");
		        d3.select(this).attr({
		              fill: "white",
		              r: 5
		          });
		        return tip.hide(this);
		        });
		}
		else if (chartType == 'barchart') 
		{
		      y = d3.scale.linear()
		          .range([height, 0]);

		      x = d3.scale.ordinal()
		          .rangeRoundBands([0, width], .1);


		      var xAxisScale = d3.scale.linear()
		          .domain([d3.min(graphData, function(d) { return d.x; }), d3.max(graphData, function(d) { return d.x; })])
		          .range([ 20, width]);

		      if(bFlag == 1) 
		      {
		        // x = d3.scale.ordinal().rangeRoundBands([0, width]);
		        x.domain(graphData.map(function(d) { return d.x; }));
		        xAxis = d3.svg.axis()
		                    .scale(x)
		                    .orient("bottom")
		                    .tickValues(x.domain().filter(function(d, i) { if(graphData.length > cntTickIdt) return (i % (graphData.length / cntTickDef)); else return true; }));
		      }
		      else
		      {
		        x.domain(graphData.map(function(d) { return d.x; }));
		        xAxis = d3.svg.axis()
		          .scale(xAxisScale)
		          .orient("bottom")
		          .tickFormat(d3.format("d"))
		          .tickValues(x.domain().filter(function(d, i) { if(graphData.length > cntTickIdt) return (i % (graphData.length / cntTickDef)); else return true; }));
		      }

		      yAxis = d3.svg.axis()
		          .scale(y)
		          .orient("left");

		      x.domain(graphData.map(function(d) 
		      {
		          return d.x;
		      }));
		      y.domain(d3.extent(graphData, function(d) 
		      {
		          return d.y;
		      })).nice();

		      svg.call(tip);
		      
		      tip.html(function(d) 
		      {
		        return "<p><span>" + xField + ": "+ d.x + "</span> </p>" +  " <span> " + yField + ": " + d.y + "</span>";
		      });

		      svg.selectAll(".bar")
		          .data(graphData)
		          .enter().append("rect")
		          .attr("class", function(d) 
		          {

		              if (d.y < 0){
		                  return "bar negative";
		              } else {
		                  return "bar positive";
		              }

		          })

		          .attr("y", function(d) 
		          {

		              if (d.y > 0){
		                  return y(d.y);
		              } else {
		                  return y(0);
		              }

		          })
		          .attr("x", function(d) 
		          {
		              return x(d.x);
		          })
		          .attr("width", x.rangeBand())
		          .attr("height", function(d) 
		          {
		              return Math.abs(y(d.y) - y(0));
		          })
		          .on("mouseover", function(d)
		          {          
		              // d3.select(this).attr("r", 5).style("fill", "rgb(80, 158, 227)");          
		              d3.selectAll(".bar").attr("class", "bar bar-lostfocus");
		              d3.select(this).attr("class", "bar");
		              return tip.show(d);
		              })
		          .on("mousemove", function(){ })
		          .on("mouseout", function()
		          {                
		              d3.selectAll(".bar").attr("class", "bar");                  
		              return tip.hide(this);
		          });

		      svg.append("g")
		          .attr("class", "y axis")
		          .call(yAxis);

		      svg.append("g")
		          .attr("class", "y axis")
		          .append("text")
		          .attr("stroke", "#cccccc")
		          .text(yField)
		          .attr("transform", "translate(-40, 120), rotate(-90)")

		      svg.append("g")
		          .attr("class", "X axis")
		          .attr("transform", "translate(" + (20) + "," + height + ")")
		          .call(xAxis)
		          .append("text")
		          .attr("stroke", "#cccccc")
		          .attr("id", "X-Anchor")
		          // .attr("transform", "translate(-40, 120), rotate(-90)")
		          .attr("x", 260)
		          .attr("y", 40)
		          .attr("dx", ".1em")
		          .style("text-anchor", "end")
		          .text(xField);

		      svg.append("g")
		          .attr("class", "infowin")
		          .attr("transform", "translate(0, 5)")
		          .append("text")
		          .attr("id", "_yr");

		      svg.append("g")
		          .attr("class", "infowin")
		          .attr("transform", "translate(0, 5)")
		          .append("text")
		          .attr("id","degrree");
		}
		else if (chartType == 'rowchart') 
		{
		
		  x = d3.scale.linear()
		    .range([0, width]);

		  y = d3.scale.ordinal()
		    .rangeRoundBands([0, height], 0.1);

		  xAxis = d3.svg.axis()
		      .scale(x)
		      .orient("bottom");

		  yAxis = d3.svg.axis()
		      .scale(y)
		      .orient("left")
		      .tickSize(0)
		      .tickPadding(6);

		  x.domain(d3.extent(graphData, function(d) { return d.y; })).nice();
		  y.domain(graphData.map(function(d) { return d.x; }));

		  svg.call(tip);
		  
		  tip.html(function(d) 
		  {
		    return "<p><span>" + xField + ": "+ d.x + "</span> </p>" +  " <span> " + yField + ": " + d.y + "</span>";
		  });

		  svg.selectAll(".bar")
		      .data(graphData)
		      .enter().append("rect")
		      .attr("class", function(d) { return "bar bar--" + (d.y < 0 ? "negative" : "positive"); })
		      .attr("x", function(d) { return x(Math.min(0, d.y)); })
		      .attr("y", function(d) { return y(d.x); })
		      .attr("width", function(d) { return Math.abs(x(d.y) - x(0)); })
		      .attr("height", y.rangeBand())
		      .on("mouseover", function(d)
		      {          
		        // d3.select(this).attr("r", 5).style("fill", "rgb(80, 158, 227)");          
		        d3.selectAll(".bar").attr("class", "bar bar-lostfocus");
		        d3.select(this).attr("class", "bar");
		        return tip.show(d);
		      })
		      .on("mousemove", function()
		      {  
		      })
		      .on("mouseout", function()
		      {                
		          d3.selectAll(".bar").attr("class", "bar");                  
		          return tip.hide(this);
		      });

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("transform", "translate(" + x(0) + ",0)")
		      .call(yAxis);
		}
		else if (chartType == 'scatterchart') 
		{
		  x = d3.scale.linear()
		  .range([0, width]);

		  y = d3.scale.linear()
		      .range([height, 0]);

		  var r = d3.scale.linear() // Circle Radius
		      .range([16, 18]);

		  var color = d3.scale.ordinal()
		        .range(["#509ee3"]);
		  
		  x.domain([d3.min(graphData, function(d) { return d.x; }), d3.max(graphData, function(d) { return d.x; })]);
		  y.domain([d3.min(graphData, function(d) { return d.y; }), d3.max(graphData, function(d) { return d.y; })]);
		  r.domain(d3.extent (graphData, function (d)  {return 10;}));

		  xAxis = d3.svg.axis()
		      .scale(x)
		      .ticks(5)                
		      .orient("bottom");

		  if(bFlag == 1) 
		  {
		    x = d3.scale.ordinal().rangeRoundBands([0, width]);
		    x.domain(graphData.map(function(d) { return d.x; }));
		    xAxis = d3.svg.axis()
		                .scale(x)
		                .orient("bottom")
		                .tickValues(x.domain().filter(function(d, i) { if(graphData.length > cntTickIdt) return (i % (graphData.length / cntTickDef)); else return true; }));
		  }

		  yAxis = d3.svg.axis()
		      .scale(y)
		      .ticks(5)
		      .orient("left");

		  svg.call(tip);
		  
		  tip.html(function(d) 
		  {
		    return "<p><span>" + xField + ": "+ d.x + "</span> </p>" +  " <span> " + yField + ": " + d.y + "</span>";
		  }); 

		  
		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .append("text")
		      .attr("class", "label")
		      .attr("x", width)
		      .attr("y", -6)
		      .style("text-anchor", "end")

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		      .append("text")
		      .attr("class", "label")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")

		  svg.selectAll(".dot")
		      .data(graphData)
		      .enter().append("circle")
		      .attr("class", "dot")
		      .attr("r", function(d) {return r(d.x);})
		      .attr("cx", function(d) { return x(d.x); })
		      .attr("cy", function(d) { return y(d.y); })
		      .style("fill", function(d) { return color(1); })
		      .on('mouseover', tip.show)
		      .on('mouseout', tip.hide);
		}
		else if (chartType == 'piechart') 
		{
		 var legendRectSize = 18;
		 var legendSpacing = 4;

		 var data;
		 data = graphData;
		 // data.forEach(function(d) {
		 //   d.x = d.ID;
		 //   d.Latitude = (d.Latitude);
		 // });

		 var r = 150;

		 var color = d3.scale.ordinal()
		             .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#61687b", "#b02d56", "#c1723c", "#fd8c10"], "#6b481b", "#a35d56", "#d1743c", "#af8c00");
		 var group = svg.append("g")
		             .attr("transform", "translate(350, 200)");
		 var arc = d3.svg.arc()
		            .innerRadius(80)
		            .outerRadius(r);
		 var pie = d3.layout.pie()
		            .value ( function(d) { return Math.abs(d.y); });
		 
		 //change the tooltip
		 
		 tip.html(function(d) 
		 {
		    return "<p><span>" + xField + ": "+ d.data.x + "</span> </p>" +  " <span> " + yField + ": " + d.data.y + "</span>";
		 });

		 var arcs = group.selectAll(".arc")
		            .data(pie(data))
		            .enter()
		            .append("g") 
		            .attr("class", "arc")
		            .on("mouseover", function(d)
		            {
		                d3.selectAll(".arc").attr("class", "arc bar-lostfocus");
		                d3.select(this).attr("class", "arc");
		                return tip.show(d);
		            })
		            .on("mousemove", function()
		            {        
		            })
		            .on("mouseout", function()
		            {                
		                d3.selectAll(".arc").attr("class", "arc");
		                // tip.select('')
		                return tip.hide(this);
		            });
		  arcs.append("path")
		            .attr("d", arc)
		            .attr("fill", function(d, i) { return color(i)});

		  var legend = svg.selectAll('.legend')
		    .data(color.domain())
		    .enter()
		    .append('g')
		    .attr('class', 'legend')
		    .attr('transform', function(d, i) 
		    {
		        var height = legendRectSize + legendSpacing;
		        var offset =  height * color.domain().length / 2;
		        var horz = -2 * legendRectSize + 30;
		        var vert = i * height + offset;
		        return 'translate(' + horz + ',' + vert + ')';
		    });

		    legend.append('rect')
		      .attr('width', legendRectSize)
		      .attr('height', legendRectSize)                                   
		      .style('fill', color)
		      .style('stroke', color);
		      
		    legend.append('text')
		      .attr('x', legendRectSize + legendSpacing)
		      .attr('y', legendRectSize - legendSpacing)
		      .text(function(d, i) { return graphData[i].x; });
		}
		else if (chartType == 'mapchart') 
		{
		  
  		}
	}

	
	main.getOffset = function(el)
	{
		el = el.getBoundingClientRect();
		
		return {
			left: el.left + window.scrollX,
			top: el.top + window.scrollY
		}
	}

	main.init();
}