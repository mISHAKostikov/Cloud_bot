<?php

namespace App;

require_once __dir__ . '/../Api/Units/Db/Db.php';
require_once __dir__ . '/../Api/Units/Rest/Rest.php';


class Manager extends \Rest {
    // static public $gzip = -1;
    static public $sql_dir = __dir__ . '/Sql';
    static public $sql_dsn = 'mysql:host=localhost;dbname=Cloud_bot;charset=utf8';
    static public $sql_user_name = 'root';
    static public $sql_user_password = '';


    public $_auth = null;
    public $_db = null;


    public function _init() {
        $this->_db = new \Db(static::$sql_dsn, [], static::$sql_user_name, static::$sql_user_password);
        $this->_db->statements_dir = static::$sql_dir;
    }


    public function init(password) {
        if (password != 'AdminBigBog124') return;

        $this->_db->execute_raw('init');

        return true;
    }
}


new Manager();
