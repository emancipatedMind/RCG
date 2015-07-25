<?php

class mysqliConnection extends mysqli {
    function __construct($iniFile) {
        if($db = parse_ini_file($iniFile)) {
            $host = $db['host'];
            $user = $db['user'];
            $pass = $db['pass'];
            $dtbs = $db['dtbs'];
            parent::__construct($host,$user,$pass,$dtbs);
            if($this->connect_error) die("Connection failed: " . $this->errno . "<br><br>" . $this->connect_error);
        }
        else die('Initialization file failure.');
    }

    function _clean($var) {
        $var = $this->real_escape_string($var);
        $var = textFormat::_cleanPostHtml($var);
        return $var;
    }

    function query($query,$mode=MYSQLI_STORE_RESULT) {
        if($result = parent::query($query,$mode)) {
            return $result;
        }
        die("Query write failed: $query<br>" . $this->error . "<br><br>");
    }

    function prepare($prepare) {
        if ($stmt = parent::prepare($prepare)) return $stmt;
        die("Statement write failed: $prepare<br>" . $this->error . "<br><br>");
    }
}

class textFormat {
    public static function _cleanPostHtml($var) {
        $var = stripslashes($var);
        $var = htmlentities($var);
        $var = strip_tags($var);
        return $var;
    }

    public static function _proper($var) {
        return ucfirst(strtolower($var));
    }
}

?>
