<?php

require_once('class.php');

//Changes timezone to the east coast.
date_default_timezone_set('America/New_York');

function IsStoreOpen($useEnglish) {
    $open = 830;
    $closed = 2300;


    $currentTime = date("Hi");

    if($useEnglish) {
        $openText = " class='open-status open'>Yes, we're open now!";
        $closeText = " class='open-status'>We are closed.";
    }
    else {
        $openText = " class='open-status open'>Si, estamos abierto ahora!";
        $closeText = " class='open-status'>Estamos cerrado.";
    };

    if($currentTime<$closed && $currentTime>$open) return $openText;
    return $closeText;
};

function getSpecials($useEnglish) {
    $file = "Model/TextFiles/";
    $useEnglish ? $file .= "enSpecials.txt" : $file .= "spSpecials.txt";

    echo file_get_contents($file);
};

function render($filetoberequiredbyrender, $data=array()) {
    
    extract($data);
    unset($data);
    require($filetoberequiredbyrender);

};

function logHeader($file, $headerName) {
    //Checks to see if the header exists.
    //If so, it will store it in a file for viewing.
    if(isset($_SERVER[$headerName])) {
        $header = $_SERVER[$headerName];
        $dtw = date("Y/m/d G:i:s")." - $headerName : $header" . PHP_EOL;
        file_put_contents($file, $dtw, FILE_APPEND);
    };
};

function isMobile(&$mobile, $forcemobile=false) {
        
    if($forcemobile) {
        $mobile = $forcemobile;
        return;
    };

    if(isset($_SERVER['HTTP_USER_AGENT'])) {
        $header = $_SERVER['HTTP_USER_AGENT'];
        $match = "/mobile/i";
        $mobile = preg_match($match, $header)===1;
    }
    else {
        $mobile = false;
    };
    
};
 
function placeLinkTags($links)  {
    if(!is_array($links)) return;
    foreach($links as $link) {
        echo "<link";
        if(empty($link['rel'])) $link['rel'] = 'stylesheet';
        echo " rel='{$link['rel']}'";
        if(isset($link['media'])) echo " media='" . $link['media'] . "'";
        echo " href='{$link['href']}'";
        if(isset($link['type'])) echo " type='" . $link['type'] . "'";
        echo ">\n";
    };
};
 
function placeScriptTags($scripts)  {
    if(!is_array($scripts)) return;
    foreach($scripts as $script) {
        echo "<script src='{$script['src']}'></script>\n";
    };
};

?>
