<?php
// get data from api
$date = date('m/d/Y', time());
$response = json_decode(file_get_contents("https://praytimes.herokuapp.com/api/55/12/+1/?method=Hanafi&date=" . date));

?>

<!-- html source from salah.dk -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>salah.dk</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- Copyrigth (c) Shiraz Ali Shah -->
        <style>
	a:link {
		color: #666666;
		text-decoration: none;
	}
	a:visited {
		color: #666666;
		text-decoration: none;
	}
	a:active {
		color: #666666;
		text-decoration: none;
	}
	a:hover {
		color: white;
		text-decoration: none;
	}
	body {
		background-color: #cccccc;
		margin: 0px;
		padding: 100px;
		text-align: center;
		font: 10px verdana, sans-serif;
		color: #666666;
	}
	#wbox {
		margin: 0 auto;
		background-color: #FFFFFF;
		height: 58px;
		width: 400px;
		padding: 25px;
	}
	#bbox {
		background-color: #cfdfeb;
		height: 58px;
		width: 408px;
		float: left;
	}
	h1 {
		font: 48px georgia, serif;
		color: #999999;
		margin: 0px;
		text-align: right;
	}
	#bism {
		background: url("http://salah.dk/salah.gif");
		float: left;
		margin: 5px;
		height: 48px;
		width: 67px;
	}
	#salat {
		padding-top: 13px;
		padding-bottom: 13px;
		padding-left: 6px;
		padding-right: 6px;
		float: left;
	}
	#salah {
		margin: 4px;
		color: #999999;
	}
	#tid {
		margin: 0px;
	}
	#holder {
		margin: 0 auto;
		width: 600px;
		padding: 25px;
		text-align: left;
	}
	#col {
		margin-right: 65px;
		float: left;
		min-height: 100px;
	}
	.align {
		text-align: left;
	}
	h3 {
		font: 10px verdana, sans-serif;
		color: #FFFFFF;
		margin: 0px
	}
        </style>
</head>


<body>
<div id="wbox">
	<div id="bbox">
		<div id="bism">

		</div>
		<div id="salat">
			<div id="salah">fajr</div>
			<div id="tid"><?php echo $response->times->fajr; ?></div>
		</div>
		<div id="salat">
			<div id="salah">shuruk</div>
			<div id="tid"><?php echo $response->times->sunrise; ?></div>
		</div>
		<div id="salat">
			<div id="salah">dhuhr</div>
			<div id="tid"><?php echo $response->times->dhuhr; ?></div>
		</div>
		<div id="salat">
			<div id="salah">'asr</div>
			<div id="tid"><?php echo $response->times->asr; ?></div>
		</div>
		<div id="salat">
			<div id="salah">maghrib</div>
			<div id="tid"><?php echo $response->times->maghrib; ?></div>
		</div>
		<div id="salat">
			<div id="salah">isha</div>
			<div id="tid"><?php echo $response->times->isha; ?></div>
		</div>
	</div>
</div>
<body>
