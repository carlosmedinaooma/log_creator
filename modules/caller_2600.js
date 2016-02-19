const call_logger  = require('./call_logger'),
 noannounce_prefix = '0662',
 randomstring = require('randomstring');
      
module.exports = {

  // for 2600 hz ivr
  do_ivr_call: function do_call( digits) {
        call_logger.log_ivr('2600 - IVR' ,noannounce_prefix, digits);
  },

  do_call: function do_call(caller) {
     call_logger.log_callstart('2600 - Start' , caller);
  },

  drop_call: function drop_call(caller){
    call_logger.log_callend('2600 - Ends' , caller);
  },

  do_log: function (caller, did,ctn,call_date_start,call_type){

     var   call_idA=randomstring.generate(8) + '-' + randomstring.generate(4) + '-' + randomstring.generate(4) + '-' + randomstring.generate(4) + '-' + randomstring.generate(8),
        call_idB=randomstring.generate(8) + '-' + randomstring.generate(4) + '-' + randomstring.generate(4) + '-' + randomstring.generate(4) + '-' + randomstring.generate(8),
        max_ringing=5,
        min_ringing=0,
        max_billing=30,
        min_billing=1,
        ringing_seconds=Math.floor(Math.random() * (max_ringing - min_ringing + 1)) + min_ringing,
        billing_seconds=Math.floor(Math.random() * (max_billing - min_billing + 1)) + min_billing,
        duration_seconds=ringing_seconds+billing_seconds;
       
        
     // console.log('inside caller2600 cdr');
     
   
      var call_log_record = new call_logger.CallLogRecord();
      call_log_record.caller = caller;
      //console.log(call_date_start);
      //var date = new Date(unix_timestamp*1000);
      var call_date_log_start=call_date_start + ' ' +  '14:00:00';
      var call_date_log_end=call_date_start+ ' ' +  '14:00:' + ('00'+duration_seconds).slice(-2);
     // console.log(call_date_log_start + '-' + call_date_log_end);
       call_log_record.start =  Math.round(new Date(call_date_log_start).getTime()/1000).toString();
      call_log_record.stop = Math.round(new Date(call_date_log_end).getTime()/1000).toString();
      call_log_record.did = did;
      call_log_record.tag = '2600 Call Log:'
      call_log_record.ctn = ctn;
      call_log_record.vendor = '2600';

      if (call_type=='ivr') {
          call_type = call_type + 'ivr';
      }
      call_log_record.type = call_type;
      call_log_record.reason = 'NORMAL_CLEARING';
      call_log_record.status = 'SUCCESS';
      call_log_record.duration = duration_seconds.toString();
      call_log_record.uri = call_idA;
      call_log_record.ringing_time = ringing_seconds.toString();
      call_log_record.billable_time = billing_seconds.toString();
      call_log_record.total_time = duration_seconds.toString();
      module.exports.do_call(caller);
      call_logger.log_call(call_log_record, call_idA);
      module.exports.drop_call(caller);

    
     // console.log(call_log_record);

  }
};
