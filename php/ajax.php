<?php
	require_once("db.php");

	ini_set("display_errors", "0");

	$db = new DBAccess();	

	switch ($_REQUEST['mode'])
	{
		
		case "get_field" :

			$table 		= $_REQUEST["tbl_name"];		
			$list_fld 	= $db->get_fields($table);
			$html_fld 	= "";

			$html_fld   = $db->make_fild_html($list_fld);

			echo $html_fld;
		break;

		case "get_data" :
			
			$query		= $_REQUEST["sql"];
			$data_list  = $db->get_datas($query);
			
			echo $data_list;

		break;

	}
?>