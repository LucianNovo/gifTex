<?php
    if( isset($_FILES[$_GET['title']]) )
	{
	    $IMGUR_API_KEY = 'your own code'; //put your api key here
	    $filename = $_FILES[$_GET['title']];
	    $handle = fopen($filename, "r");
	    $data = fread($handle, filesize($filename));
	
	    //$data is file data
	    $pvars   = array('image' => base64_encode($data), 'key' => $IMGUR_API_KEY);
	    #$pvars   = array('key' => $IMGUR_API_KEY);
	    $timeout = 30;
	    $curl    = curl_init();
	
	    curl_setopt($curl, CURLOPT_URL, 'http://api.imgur.com/2/upload.xml');
	    #curl_setopt($curl, CURLOPT_URL, 'http://api.imgur.com/2/gallery.xml');
	    curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
	    curl_setopt($curl, CURLOPT_POST, 1);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
	    $xml = curl_exec($curl);
	    $xmlsimple = new SimpleXMLElement($xml);
	    echo '<img height="180" src="';
	    echo $xmlsimple->links->original;
	    echo '">';
	
	    curl_close ($curl);
	    
	    echo "Success";
    }
?>