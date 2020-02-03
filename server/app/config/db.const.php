<?php
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    define("LF_USER", "admin");
    define("LF_PASS", "1234");
    define("LF_BBDD", "quepassaeh");
    define("LF_HOST", "127.0.0.1");
} else {
    define("LF_USER", "pma");
    define("LF_PASS", "password");
    define("LF_BBDD", "quepassaeh");
    define("LF_HOST", "127.0.0.1");
}