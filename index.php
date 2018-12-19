<?php
	require_once("php/db.php");

	ini_set("display_errors", 0);
	
	$db 		= new DBAccess();
	$list_tbl 	= $db->table_list(DB_NAME);
	$list_fld 	= $db->get_fields($list_tbl[0]);

	$html_tbl 	= "";
	$html_fld 	= "";

	$html_tbl = $db->make_tbl_html($list_tbl);
	$html_fld = $db->make_fild_html($list_fld);
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Metabase Chats</title>

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/jquery-ui.css">
	<link rel="stylesheet" href="css/style.css">
</head>

<body>
	<div id="top_banner"></div>
	<div id="body_area">
		<div id="filter_area">
			<h1>New question</h1>
			<ul>
				<li class="dropdown" id="li_tblname">
					<span class="title">DATA</span>
					<div class="tag_area no-padding">
						<div class="tag_inside">
							<p>
								<info class="tbl_name"><?php echo $list_tbl[0]; ?></info>
								<svg class="ml1" width="8" height="8" viewBox="0 0 32 32" fill="currentcolor" name="chevrondown" size="8">
									<path d="M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z "></path>
								</svg>
							</p>
						</div>
					</div>

					<div class="popup main" id="tbl_list">
						<h3>Sample Dataset</h3>
						<div class="search">
							<svg class="Icon Icon-search" width="16" height="16" viewBox="0 0 32 32" fill="currentcolor" name="search" size="16">
								<path d="M12 0 A12 12 0 0 0 0 12 A12 12 0 0 0 12 24 A12 12 0 0 0 18.5 22.25 L28 32 L32 28 L22.25 18.5 A12 12 0 0 0 24 12 A12 12 0 0 0 12 0 M12 4 A8 8 0 0 1 12 20 A8 8 0 0 1 12 4  "></path>
							</svg>
							<input type="text" class="txt_filter" placeholder="Find">
						</div>
						<dl><?php echo $html_tbl; ?></dl>
					</div>
				</li>
				<li class="dropdown" id="li_filter">
					<span class="title">FILTERED BY</span>
					<div class="tag_area">
						<div class="tag_inside">
							<p>
								<info>Add filters to narrow your answer</info>
							</p>
						</div>
						<elem class="rect">
							<svg class="Icon Icon-add" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="add" size="14">
								<path d="M19,13 L19,2 L14,2 L14,13 L2,13 L2,18 L14,18 L14,30 L19,30 L19,18 L30,18 L30,13 L19,13 Z"></path>
							</svg>
						</elem>
					</div>
					<div class="popup main">
						<section class="select">
							<h3>
								<svg class="Icon Icon-table2" width="18" height="18" viewBox="0 0 32 28" fill="currentcolor" name="table2" size="18">
									<g fill="currentcolor" fill-rule="evenodd">
										<path d="M10,19 L10,15 L3,15 L3,13 L10,13 L10,9 L12,9 L12,13 L20,13 L20,9 L22,9 L22,13 L29,13 L29,15 L22,15 L22,19 L29,19 L29,21 L22,21 L22,25 L20,25 L20,21 L12,21 L12,25 L10,25 L10,21 L3,21 L3,19 L10,19 L10,19 Z M12,19 L12,15 L20,15 L20,19 L12,19 Z M30.5,0 L32,0 L32,28 L30.5,28 L1.5,28 L0,28 L0,0 L1.5,0 L30.5,0 Z M29,3 L29,25 L3,25 L3,3 L29,3 Z M3,7 L29,7 L29,9 L3,9 L3,7 Z"></path>
									</g>
								</svg>
								<info class="tbl_name"><?php echo $list_tbl[0]; ?></info>
							</h3>
							<div class="search">
								<svg class="Icon Icon-search" width="16" height="16" viewBox="0 0 32 32" fill="currentcolor" name="search" size="16">
									<path d="M12 0 A12 12 0 0 0 0 12 A12 12 0 0 0 12 24 A12 12 0 0 0 18.5 22.25 L28 32 L32 28 L22.25 18.5 A12 12 0 0 0 24 12 A12 12 0 0 0 12 0 M12 4 A8 8 0 0 1 12 20 A8 8 0 0 1 12 4  "></path>
								</svg>
								<input type="text" class="txt_filter" placeholder="Find">
							</div>
							<dl class="field_list"><?php echo $html_fld; ?></dl>
						</section>
					</div>
					<div class="popup details details_number">
						<h3>
							<svg class="Icon Icon-chevronleft" width="18" height="18" viewBox="0 0 32 32" fill="currentcolor" name="chevronleft" size="18">
								<path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
							</svg>
							<info>Order - ID</info>
						</h3>
						<div class="basic_options">
							<input type="button" value="Equal" class="btn_equal active_btn">
							<input type="button" value="Not equal" class="btn_notequal">
							<input type="button" value="Greater than" class="btn_greater">
							<input type="button" value="Less thans" class="btn_less">
							<input type="button" value="Between" class="btn_between">
						</div>
						<h5 class="btn_view_more">
							<svg class="px1" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="chevrondown" size="14">
								<path d="M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z "></path>
							</svg>
							<info>More Options</info>
						</h5>
						<div class="show_more_area">
							<input type="button" value="Greater than or equal to" class="btn_greaterequal">
							<input type="button" value="Less than or equal to" class="btn_lessorequal">
							<input type="button" value="Is empty" class="btn_isempty">
							<input type="button" value="Not empty" class="btn_notempty">
						</div>
						<input type="text" placeholder="Enter desired number" class="txt_srch_val">
						<input type="text" placeholder="Enter desired number" class="txt_srch_between">
						<p>You can enter multiple values separated by commas</p>
						<input type="button" class="btn_add_filter" value="Add filter">
					</div>
					<div class="popup details details_date">
						<h3>
							<svg class="Icon Icon-chevronleft" width="18" height="18" viewBox="0 0 32 32" fill="currentcolor" name="chevronleft" size="18">
								<path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
							</svg>
							<info>Order - ID</info>
						</h3>
						<h5 class="btn_view_drop">
							<info>Past</info>
							<svg class="px1" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="chevrondown" size="14">
								<path d="M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z "></path>
							</svg>
						</h5>
						<div class="show_more_area date_main_option">
							<dl>
								<dd>
									<info>Past</info>
								</dd>
								<dd>
									<info>Next</info>
								</dd>
								<dd>
									<info>Current</info>
								</dd>
								<dd>
									<info>Before</info>
								</dd>
								<dd>
									<info>After</info>
								</dd>
							</dl>
						</div>
						<input type="text" placeholder="Enter desired number" class="txt_srch_val">
						<div class="calendar_area">
							<div class="calendar"></div>
						</div>
						<h5 class="btn_view_drop">
							<info>Day</info>
							<svg class="px1" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="chevrondown" size="14">
								<path d="M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z "></path>
							</svg>
						</h5>
						<div class="show_more_area">
							<dl>
								<dd>
									<info>Day</info>
								</dd>
								<dd>
									<info>Week</info>
								</dd>
								<dd>
									<info>Month</info>
								</dd>
								<dd>
									<info>Year</info>
								</dd>
							</dl>
						</div>
						<input type="button" class="btn_add_filter" value="Add filter">
					</div>
					<div class="popup details details_string">
						<h3>
							<svg class="Icon Icon-chevronleft" width="18" height="18" viewBox="0 0 32 32" fill="currentcolor" name="chevronleft" size="18">
								<path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
							</svg>
							<info>Order - ID</info>
						</h3>
						<div class="basic_options">
							<input type="button" value="Is" class="btn_equal active_btn">
							<input type="button" value="Is not" class="btn_notequal">
							<input type="button" value="Contains" class="btn_greater">
							<input type="button" value="Does not contain" class="btn_less">
						</div>
						<h5 class="btn_view_more">
							<svg class="px1" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="chevrondown" size="14">
								<path d="M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z "></path>
							</svg>
							<info>More Options</info>
						</h5>
						<div class="show_more_area">
							<input type="button" value="Is empty">
							<input type="button" value="Not empty">
							<input type="button" value="Starts with">
							<input type="button" value="Ends with">
						</div>
						<input type="text" placeholder="Find a value" class="txt_srch_val">
						<dl class="limit_view">
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
							<dd><label><input type="checkbox"><info>001234123</info></label></dd>
						</dl>
						<input type="button" class="btn_add_filter" value="Add filter">
					</div>
				</li>
				<li class="dropdown view_mode" id="li_viewmode">
					<span class="title">VIEW</span>
					<div class="tag_area">
						<div class="tag_inside">
							<p>Raw Data</p>
						</div>
						<elem class="rect">
							<svg class="Icon Icon-add" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="add" size="14">
								<path d="M19,13 L19,2 L14,2 L14,13 L2,13 L2,18 L14,18 L14,30 L19,30 L19,18 L30,18 L30,13 L19,13 Z"></path>
							</svg>
						</elem>
					</div>
					<div class="popup main view_main_pup">
						<section>
							<h3>
								<svg class="Icon Icon-table2" width="18" height="18" viewBox="0 0 32 28" fill="currentcolor" name="table2" size="18">
									<g fill="currentcolor" fill-rule="evenodd">
										<path d="M10,19 L10,15 L3,15 L3,13 L10,13 L10,9 L12,9 L12,13 L20,13 L20,9 L22,9 L22,13 L29,13 L29,15 L22,15 L22,19 L29,19 L29,21 L22,21 L22,25 L20,25 L20,21 L12,21 L12,25 L10,25 L10,21 L3,21 L3,19 L10,19 L10,19 Z M12,19 L12,15 L20,15 L20,19 L12,19 Z M30.5,0 L32,0 L32,28 L30.5,28 L1.5,28 L0,28 L0,0 L1.5,0 L30.5,0 Z M29,3 L29,25 L3,25 L3,3 L29,3 Z M3,7 L29,7 L29,9 L3,9 L3,7 Z"></path>
									</g>
								</svg>
								<info>Metabasics</info>
							</h3>
							<div class="search">
								<svg class="Icon Icon-search" width="16" height="16" viewBox="0 0 32 32" fill="currentcolor" name="search" size="16">
									<path d="M12 0 A12 12 0 0 0 0 12 A12 12 0 0 0 12 24 A12 12 0 0 0 18.5 22.25 L28 32 L32 28 L22.25 18.5 A12 12 0 0 0 24 12 A12 12 0 0 0 12 0 M12 4 A8 8 0 0 1 12 20 A8 8 0 0 1 12 4  "></path>
								</svg>
								<input type="text" class="txt_filter" placeholder="Find">
							</div>
							<dl class="metabasics">
								<dd>
									<info data="entry">Raw data</info>
								</dd>
								<dd>
									<info data="count">Count of rows</info>
								</dd>
								<dd class="field_show">
									<info data="sum">Sum of ...</info>
								</dd>
								<dd class="field_show">
									<info data="avg">Average of ...</info>
								</dd>
								<dd class="field_show">
									<info data="distinct">Number of distinct values of ...</info>
								</dd>
								<dd class="field_show">
									<info data="std">Standard deviation of ...</info>
								</dd>
								<dd class="field_show">
									<info data="min">Minimum of ...</info>
								</dd>
							</dl>
						</section>
					</div>
					<div class="popup details view_details_fld">
						<h3>
							<svg class="Icon Icon-chevronleft" width="18" height="18" viewBox="0 0 32 32" fill="currentcolor" name="chevronleft" size="18">
								<path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
							</svg>
							<info>Order - ID</info>
						</h3>
						<dl class="field_list">
							<?php echo $html_fld; ?>
						</dl>
					</div>
				</li>
				<li class="dropdown" id="li_groupby">
					<span class="title">GROUPED BY</span>
					<div class="tag_area">
						<div class="tag_inside">
							<p>
								<info>Add a grouping</info>
							</p>
						</div>
						<elem class="rect">
							<svg class="Icon Icon-add" width="14" height="14" viewBox="0 0 32 32" fill="currentcolor" name="add" size="14">
								<path d="M19,13 L19,2 L14,2 L14,13 L2,13 L2,18 L14,18 L14,30 L19,30 L19,18 L30,18 L30,13 L19,13 Z"></path>
							</svg>
						</elem>
					</div>
					<div class="popup main group_main_pup">
						<section class="select">
							<h3>
								<svg class="Icon Icon-table2" width="18" height="18" viewBox="0 0 32 28" fill="currentcolor" name="table2" size="18">
									<g fill="currentcolor" fill-rule="evenodd">
										<path d="M10,19 L10,15 L3,15 L3,13 L10,13 L10,9 L12,9 L12,13 L20,13 L20,9 L22,9 L22,13 L29,13 L29,15 L22,15 L22,19 L29,19 L29,21 L22,21 L22,25 L20,25 L20,21 L12,21 L12,25 L10,25 L10,21 L3,21 L3,19 L10,19 L10,19 Z M12,19 L12,15 L20,15 L20,19 L12,19 Z M30.5,0 L32,0 L32,28 L30.5,28 L1.5,28 L0,28 L0,0 L1.5,0 L30.5,0 Z M29,3 L29,25 L3,25 L3,3 L29,3 Z M3,7 L29,7 L29,9 L3,9 L3,7 Z"></path>
									</g>
								</svg>
								<info>Order</info>
							</h3>
							<div class="search">
								<svg class="Icon Icon-search" width="16" height="16" viewBox="0 0 32 32" fill="currentcolor" name="search" size="16">
									<path d="M12 0 A12 12 0 0 0 0 12 A12 12 0 0 0 12 24 A12 12 0 0 0 18.5 22.25 L28 32 L32 28 L22.25 18.5 A12 12 0 0 0 24 12 A12 12 0 0 0 12 0 M12 4 A8 8 0 0 1 12 20 A8 8 0 0 1 12 4  "></path>
								</svg>
								<input type="text" class="txt_filter" placeholder="Find">
							</div>
							<dl class="field_list">
								<?php echo $html_fld; ?>
							</dl>
						</section>
					</div>
				</li>
				<li>
					<h2>...</h2>
				</li>
			</ul>
		</div>	
		<div id="button_area">
			<ul>
				<li>
					<section>
						<h5>VISUALIZATION</h5>
					</section>
					<section>
						<span class="relative z4">
							<svg class="mr1" width="12" height="12" viewBox="0 0 32 32" fill="currentcolor" name="table" size="12">
								<path d="M11.077 11.077h9.846v9.846h-9.846v-9.846zm11.077 11.077H32V32h-9.846v-9.846zm-11.077 0h9.846V32h-9.846v-9.846zM0 22.154h9.846V32H0v-9.846zM0 0h9.846v9.846H0V0zm0 11.077h9.846v9.846H0v-9.846zM22.154 0H32v9.846h-9.846V0zm0 11.077H32v9.846h-9.846v-9.846zM11.077 0h9.846v9.846h-9.846V0z"></path>
							</svg>
							<select id="visual_type" >
								<option value="table">Table</option>
								<option value="linechart">Line Chart</option>
								<option value="areachart">Area Chart</option>
								<option value="barchart">Bar Chart</option>
								<option value="rowchart">Row Chart</option>
								<option value="scatterchart">Scatter Chart</option>
								<option value="piechart">Pie Chart</option>
								<option value="mapchart">Map Chart</option>
							</select>							
						</span>
						<span class="hide"></span>

						<svg class="Icon Icon-gear" width="16" height="16" viewBox="0 0 32 32" fill="currentcolor" name="gear">
							<path d="M14 0 H18 L19 6 L20.707 6.707 L26 3.293 L28.707 6 L25.293 11.293 L26 13 L32 14 V18 L26 19 L25.293 20.707 L28.707 26 L26 28.707 L20.707 25.293 L19 26 L18 32 L14 32 L13 26 L11.293 25.293 L6 28.707 L3.293 26 L6.707 20.707 L6 19 L0 18 L0 14 L6 13 L6.707 11.293 L3.293 6 L6 3.293 L11.293 6.707 L13 6 L14 0 z M16 10 A6 6 0 0 0 16 22 A6 6 0 0 0 16 10"></path>
						</svg>
					</section>
				</li>
				<li>
					<input type="button" id="btn_refresh" value="Refresh">
				</li>
				<li>
					<span>Showing 200 Rows</span>
					<svg class="Icon Icon-downarrow tether-target tether-element-attached-top tether-element-attached-center tether-target-attached-bottom tether-target-attached-center tether-enabled" width="16" height="16" viewBox="0 0 32 32" fill="currentcolor" title="Download this data" name="downarrow" size="16">
						<path d="M12.2782161,19.3207547 L12.2782161,0 L19.5564322,0 L19.5564322,19.3207547 L26.8346484,19.3207547 L15.9173242,32 L5,19.3207547 L12.2782161,19.3207547 Z"></path>
					</svg>
				</li>
			</ul>
		</div>
		<div id="table-area" ></div>
		<div id="chart-container">
			<div id="chart-area" >
				<div align="center" id="chart-area-text">
					<p> Which fields do you want to use X and Y axes? </p>
				</div>
				<div align="center" id="chart-area-button">
					<div align="center">
						<button id="choose-axes" > Choose fields </button>
					</div>	
				</div>
			</div>
		</div> 
	</div>
	<div id="choose-window" style="display:none">
	  	<div class="title">Select Chart Axes</div>
	  	
	  	<div class="row">
	  		<div class="col-md-12">
	  			<div class="col-sm-6">
					<div>
						<label for="X Field">X-axis</label>
					</div>
					<div>
				        <select class="form-control" id="x-field">
				        </select>
					</div>	  				
	  			</div>
	  			<div class="col-sm-6">
	  				<div>
						<label for="Y Field">Y-axis</label>
					</div>
					<div>
						<select class="form-control" id="y-field">
				        </select>
					</div>

	  			</div>
	  		</div>
	  	</div>
	  	<div class="row" align="center">
	  		<button id="view-chart">View Chart</button>
	  	</div>

	</div>

	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/d3.min.js"></script>
	<script src="js/d3.tip.js"></script>
	<script src="js/main.js"></script>
</body>
</html>