<?php

namespace App;

require_once __dir__ . '/../Api/Units/Db/Db.php';
require_once __dir__ . '/../Api/Units/Json/Json.php';
require_once __dir__ . '/../Api/Units/Rest/Rest.php';


class Manager extends \Rest {
    // static public $gzip = -1;
    static public $bot_token = '7451507935:AAFyRR6SS5X2htKQ8pD340bkKtL841ykGnA';
    static public $etherscan_api_key = '';
    static public $request_method = 'POST';
    static public $sql_dir = __dir__ . '/Sql';
    static public $sql_dsn = 'mysql:host=localhost;dbname=Cloud_bot;charset=utf8';
    static public $sql_user_name = 'root';
    static public $sql_user_password = '';


    public $_auth = null;
    public $_db = null;


    public function _file_url_telegram__get($file_id) {
        $url = 'https://api.telegram.org/bot' . static::$bot_token . "/getFile?file_id=$file_id";
        $response = file_get_contents($url);
        $data = \Json::parse($response);

        if (!$data) return;

        $url = 'https://api.telegram.org/file/bot' . static::$bot_token . '/' . $data['result']['file_path'];

        return $url;
    }

    public function _init() {
        $this->_db = new \Db(static::$sql_dsn, [], static::$sql_user_name, static::$sql_user_password);
        $this->_db->statements_dir = static::$sql_dir;
        // $this->_db->setAttribute(static::ATTR_EMULATE_PREPARES, false);
    }

    public function _user_telegram__get($user_id) {
        $url = 'https://api.telegram.org/bot' . static::$bot_token . "/getChat?chat_id=$user_id";
        $response = file_get_contents($url);
        $data = \Json::parse($response);

        if (!$data) return;

        return $data['result'];
    }


    public function active_bonus__state($tg_id) {
        $request_data = [
            'tg_id' => $tg_id,
        ];
        $control_data = $this->_db->fetch('control_data_activeBonus__get', $request_data);

        if (!$control_data) {
            $this->_db->execute('bonus__add', $request_data);
        }

        $control_data = $control_data[0];

        if ($control_data['active_end_date'] < $this->_timeStamp) return;

        $active_bonuses_balanse = floor($this->_timeStamp - $control_data['active_bonuses_collect_date']);
        $request_data += [
            'active_bonuses_balanse' => $active_bonuses_balanse,
            'active_bonuses_collect_date' => $this->_timeStamp,
        ];

        $statement = $this->_db->execute('active_bonus__update', $request_data);
        $statement->closeCursor();

        return true;
    }

    public function everydayBonus__take($tg_id) {
        $request_data = [
            'tg_id' => $tg_id,
        ];
        $control_data = $this->_db->fetch('control_data_everydayBonus__get', $request_data);
        $control_data = $control_data[0];


        if ($control_data['everyday_bonus_current'] >= $control_data['count_day_registration']) return;

        if ($control_data['everyday_bonus_current'] == -1) {
            $this->_db->execute('everydayBonuse__take_one', $request_data);
        }
        else if ($control_data['everyday_bonus_current'] < $control_data['count_day_registration']) {
            $this->_db->execute('everydayBonuse__take', $request_data);
        }


        return true;
    }

    public function init($password, $test_data = false) {
        if ($password != 'AdminBigBog124') return;

        $this->_db->execute_raw('init');

        if ($test_data) {
            $this->_db->execute_raw('test_data');
        }

        return true;
    }

    public function passive_bonus__add($tg_id) {
        $request_data = [
            'tg_id' => $tg_id,
        ];
        $passive_last_collect_date = $this->_db->fetch('passive_last_collect_date__get', $request_data);

        if (!$passive_last_collect_date) {
            $this->_db->execute('bonus__add', $request_data);
        }

        $passive_last_collect_date = $passive_last_collect_date[0]['passive_last_collect_date'];

        if ($this->_timeStamp - $passive_last_collect_date < 60) return;

        $request_data += ['passive_last_collect_date' => $this->_timeStamp];
        $passive_bonuses_balanse = $this->_db->execute('passive_bonus__update', $request_data);

        return true;
    }

    public function referrals__get($tg_id, $offset) {
        $this->_db->setAttribute(static::ATTR_EMULATE_PREPARES, false);

        $request_data = [
            'tg_id' => $tg_id,
            'offset' => $offset
        ];

        $referrals = $this->_db->fetch('referrals__get', $request_data);

        foreach ($referrals as &$referral) {
            $user_telegram = $this->_user_telegram__get($referral['tg_id']);
            $file_url = $this->_file_url_telegram__get($user_telegram['photo']['big_file_id']);

            $referral += [
                'first_name' => $user_telegram['first_name'],
                'last_name' => $user_telegram['last_name'],
                'avatar_url' =>$file_url,
            ];
        }

        $this->_db->setAttribute(static::ATTR_EMULATE_PREPARES, true);

        return $referrals;
    }

    public function user__get($tg_id) {
        $request_data = [
            'tg_id' => $tg_id,
        ];

        $result = $this->active_bonus__state($tg_id);
        $user_date = $this->_db->fetch('user__get', $request_data);
        $user_date = $user_date[0];
        $user_telegram = $this->_user_telegram__get($tg_id);
        // $user_telegram = $this->_user_telegram__get(509815216);

        if ($user_telegram) {
            $file_url = $this->_file_url_telegram__get($user_telegram['photo']['big_file_id']);
            $user_date += ['avatar_url' => $file_url];
        }

        return $user_date;
    }

    public function tg_subscribe__check($chanall_url, $tg_id) {
        $parsedUrl = parse_url($chanall_url);
        $path = $parsedUrl['path'];
        $chanall_url = ltrim($path, '/');

        $url = 'https://api.telegram.org/bot' . static::$bot_token . "/getChatMember?chat_id=@$chanall_url&user_id=$tg_id";
        $response = file_get_contents($url);
        $data = \Json::parse($response);

        if (!$data) return;

        $status = $data['result']['status'];

        if ($status != 'member' || $status != 'administrator' || $status != 'creator') return;

        $request_data = [
            'tg_id' => $tg_id,
        ];

        $user_quests = $this->_db->fetch('user_quests__get', $request_data);

        if (!$user_quests) {
            $this->_db->execute('user_quests__add', $request_data);
        }

        $this->_db->execute('quest_tg__solve', $request_data);

        return true;
    }

    public function twitter_subscribe__check($chanall_url, $tg_id, $twitter_id) {
        $parsedUrl = parse_url($chanall_url);
        $path = $parsedUrl['path'];
        $chanall_url = ltrim($path, '/');

        $url = "https://api.twitter.com/1.1/users/show.json?screen_name=$chanall_url";
        $response = file_get_contents($url);
        $data = \Json::parse($response);

        if (!$data) return;

        $chanall_id = $data['id'];

        $url = "https://api.twitter.com/1.1/friendships/show.json?source_id=$twitter_id&target_id=$chanall_id";
        $response = file_get_contents($url);
        $data = \Json::parse($response);

        if (!$data) return;

        $status = $data['relationship']['source']['following'];

        if (!$status) return;

        $request_data = [
            'tg_id' => $tg_id,
        ];

        $user_quests = $this->_db->fetch('user_quests__get', $request_data);

        if (!$user_quests) {
            $this->_db->execute('user_quests__add', $request_data);
        }

        $this->_db->execute('quest_twitter__solve', $request_data);

        return true;
    }

    public function pay__check($tg_id, $sum, $hash) {
        $url = "https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=$hash&apikey=" . static::$etherscan_api_key;
        $response = file_get_contents($url);
        $data = \Json::parse($response);

        if (!$data) return;

        if (!$data['result']['status']) return;

        $time = $sum * 31 * 24 * 60 * 60;

        $request_data = [
            'tg_id' => $tg_id,
        ];

        $user_quests = $this->_db->fetch('active_endDate_get', $request_data);

        if (!$user_quests) {
            $this->_db->execute('user_quests__add', $request_data);
        }

        $request_data = [
            'tg_id' => $tg_id,
            'time' => $time,
        ];

        $this->_db->execute('quest_twitter__set', $request_data);

        return true;
    }
}


new Manager();
