
const winston = require('winston');
const config  = require('../config/config');
const logger = new (winston.Logger)({
   transports: [
     new (winston.transports.DailyRotateFile) ({
       name: 'infofile',
       level: 'info',
       filename: config.path_calls+'info.log',
     }),
     new (winston.transports.DailyRotateFile) ({
       name: 'errorfile',
       level: 'error',
       filename: config.path_calls +'error.log',

     })
   ],
   exitOnError: false
});

module.exports = {

  log_info: function(txt) {
    logger.info( txt);
  },

  log_error: function(txt) {
    logger.error( txt);
  },

  log_ivr: function(txt, id, digit) {
    logger.log('info', txt, {type: 'ivr', id: id, digit: digit });
  },
  log_xad: function(txt,biz_id,biz_name,biz_city,biz_state,biz_zip,biz_lat,biz_lng,user_agent,preqid,url_imp,url_call,url_click) {
    logger.log('info', txt, {type: 'xad', id: biz_id, name: biz_name, city: biz_city, state: biz_state, zipcode: biz_zip, lat:biz_lat, lng:biz_lng, user_agent:user_agent, preqid: preqid, url_imp: url_imp, url_call: url_call, url_click: url_click });
  },
   

  log_ivrdtmf: function(txt, id) {
    logger.log('info', txt, {type: 'ivrdtmf', id: id });
  },

  log_callpass: function(txt, id) {
    logger.log('info', txt, {type: 'callpass', id: id });
  },

  log_calldrop: function(txt, id) {
    logger.log('info', txt, {type: 'calldrop', id: id });
  },
  log_callend: function(txt, id) {
    logger.log('info', txt, {type: 'callend', id: id });
  },
  log_callforward: function(txt, id) {
    logger.log('info', txt, {type: 'callforward', id: id });
  },

  CallLogRecord: function CallLogRecord() {
    this.tag = '';
    this.start = '';
    this.stop = '';
    this.caller = '';
    this.did = '';
    this.ctn = '';
    this.reason = '';
    this.type = '';
    this.vendor = '';
    this.status = '';
    this.duration = '';
    this.uri = '';
    this.billable_time = '';
    this.ringing_time = '';
    this.total_time = '';
    this.timestamp = '';
    this.record_url = '';
   
  },

  log_call: function(call_log, id) {
    logger.log('info',JSON.stringify(call_log), {type: 'logcall', id: id } );
  },

  log_callstart: function(txt, id) {
    logger.log('info', txt, {type: 'callstart', id: id});
  }


}
