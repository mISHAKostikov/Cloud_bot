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


    public function passive_bonus__add($tg_id) {
        $request_data = [
            'tg_id' => $tg_id,
        ];
        $passive_last_collect_date = $this->_db->fetch('passive_last_collect_date__get', $request_data);

        if ($this->_timeStamp - $passive_last_collect_date < 6e4) return;

        $request_data += ['passive_last_collect_date' => $this->_timeStamp];
        $passive_bonuses_balanse = $this->_db->fetch('passive_bonus__save', $request_data);

        return $passive_bonuses_balanse;
    }

    public function init($password, $test_data = false) {
        if ($password != 'AdminBigBog124') return;

        $this->_db->execute_raw('init');

        if ($test_data) {
            $this->_db->execute_raw('test_data');
        }

        return true;
    }
}


new Manager();
