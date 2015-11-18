<?php
	if(array_key_exists("filename", $_REQUEST))
	{
		$fileName = $_REQUEST["filename"];
	}
	else
	{
		echo "<strong>Need a <em>filename</em> to fetch!</strong>";
		exit();
	}
	
	if(array_key_exists("format", $_REQUEST))
	{
		$format = $_REQUEST["format"];
	}
	else
	{
		$format = "text/json";
	}
	
	$fileData = file_get_contents($fileName);
	header("content-type: $format");
	echo $fileData;
?>