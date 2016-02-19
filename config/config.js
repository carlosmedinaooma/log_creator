var config = {}

config.feed_uri = 'http://fg-newprod-web1:3040/';
config.max_calls = 5;
config.smtp_user="medina_raptor@yahoo.com";
config.smtp_pwd="Potokamomu1980$1";
config.smtp_host="smtp.mail.yahoo.com";
config.sms_from="medina_raptor@yahoo.com";
config.sms_cc="medina_raptor@yahoo.com";
config.xad_query_api="http://local.xad.com/rest/xad_notify?v=1.2&placement=Organic&k=zv8PhvQK_7NyNcC_5NqklFgMZIxPBwhA&trc=abc&devid=&ps=&pr=";
config.path_calls=process.env.PATH_CALLS || __dirname + '/../log/';
config.day_start=1;
config.day_end=7;
config.hour_start="11";
config.hour_end="17";
config.logs_per_day="10";
config.provision="0";
config.caller=['3371234567'];

module.exports = config;
