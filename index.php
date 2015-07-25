<?php

require_once('Controllers/helpers.php');
require_once('Controllers/class.php');

date_default_timezone_set('America/New_York');

session_start();

$settings['title'] = 'Random Color Generator';
$settings['links'][] = array('href'=>'Model/CSS/ResetBrowserStyles.min.css');
$settings['links'][] = array('href'=>'Model/CSS/style.css');
$settings['links'][] = array('rel'=>'shortcut icon', 'href'=>'Model/IMG/colorwheel.png');
$settings['scripts'][] = array('src'=>'Model/Scripts/jquery-1.11.3.min.js');

render('Model/Page_Open.php', $settings);
unset($settings);

render('Model/Page_Body.php');

$settings['scripts'][] = array('src'=>'Model/Scripts/script.js');
render('Model/Page_Close.php', $settings);
unset($settings);

?>
