/************************************************************
 * jex_web.js
 * 
 * ������ input tag�� jex_web.js���� ������ Attribute�� ���Խ�ų���
 * �ش� form�� CSS����(notnull='true' �� ������ ��) �� Form�� Submit �ɶ� validation�� üũ�Ѵ�.
 * 
 * ex) <input type='text' id='text_id' name='text_id' Attribute='value'/>
 * 
 * Attribute='value' ���=====================================
 * - autocheck='true'			: form �±׿��� ����ϸ�, submit�� �ڵ����� form�� üũ�ϰ��� �Ҷ� �ش� Attribute�� �����Ѵ�.
 *								  �������� üũ�Ҷ��� formCheck(formId) �Լ��� ȣ���Ѵ�. formCheck�Լ��� ���ڴ� üũ�� form�� id
 * - css='true'					: form �±׿��� ����ϸ�, true �� �Ǿ����� ���, notnull='true' Attribute �� �ִ� ���� CSS �� �����Ѵ�.
 * - cssClass='css Ŭ������'		: form �±׿��� ����ϸ� css='true' �� ����������� ������ ccs Ŭ���� ���� �Է��Ѵ�. 						
 * - fieldName='�׸��'			: validation üũ�� �ϰ��� �Ұ�� �ʼ� �Է��̸� �׸���� �����Ѵ�.
 * - notnull='true'				: �ش��׸��� ���� null �̸� ����
 * - minLength='���������Ǳ���'	: �ش��׸� �Է°��� ���̰� value ���� ������ ����
 * - format='date'				: 8�ڸ� ������ ��¥����- yyyy:mm:dd ���� yyyy,mm,dd �� ���ԵǾ� �ִ� �����̸� ��� �����
 *                                �������� ��¥�� �ƴҰ�� ����
 * - format='submit'            : form ���� ������Ʈ�� �� Attribute �� �����ϸ� <input type='submit'>�� Ŭ���ѰͰ� ������ �̺�Ʈó�����ȴ�.
 * - format='number'            : +/-�� ������ ���ڸ� �Է°���(submit�� üũ)
 * - format='number2'           : input�� (0~9)���ڸ� �Է��Ҽ��ִ�.(�Է½� üũ�ؼ� ����)
 * - format='engNum'            : ���ڿ� �����ڸ� �Է°���
 * - format='resRegNo1'         : �ֹε�Ϲ�ȣ ���ڸ� �˻�. �ڸ���(6�ڸ�)�� ���ڿ��θ� �˻��Ѵ�.
 * - format='resRegNo2'         : �ֹε�Ϲ�ȣ ���ڸ� �˻�. �ڸ���(7�ڸ�)�� ���ڿ��θ� �˻��Ѵ�.
 * - format='resRegNo'          : �ֹε�Ϲ�ȣ �˻�. �ڸ���(13�ڸ�)�� ���ڿ��θ� �˻��Ѵ�.
 * - format='currency'          : ','�� '.'�� ������ �ݾ��������� �˻��Ѵ�.(.�� �ΰ��̰ų� ���ڰ� �ƴѰ��� �ְų� �ϸ� ����)
 * - format='accountNo'         : ���¹�ȣ�˻�. �����Է¸� �����
 * - format='accountNo2'		: ���¹�ȣ�˻�. ���ڿ� ������(-) �Է¸� �����
 * - format='bizNo'				: ����ڹ�ȣ����
 *                                
 ************************************************************/

/**
 * ���ڿ����̸� byte �������� ��ȯ��
 */
String.prototype.byteLength = function(){
	var val = this;

	var escapeVal = escape(val);

	var startIdx = 0;
	var endIdx = 0;
	var oneByteVal = "";
	var twoByteCnt = 0;

	while( ( endIdx = escapeVal.indexOf("%u", startIdx) ) > -1 )
	{
		oneByteVal += escapeVal.substring(startIdx, endIdx) ; 
		startIdx = endIdx + 6;
		twoByteCnt++;
	}

	oneByteVal += escapeVal.substring(startIdx);
	oneByteVal = unescape(oneByteVal);

	return twoByteCnt*2 + oneByteVal.length;
};

var jex;
var _jex_debugMod = true;
if(!jex) jex={};
if(!jex.web) jex.web={};
jex.web.testMode = false;//���� ������ �ø��� false �� �����ؾ���
jex.web.isSecurityModule = false;//���ȸ�� ��뿩��:���ȸ�⿡�� ����ϴ� ����� �Լ��� ������� true�ϰ� �ش� �κ��� �����ؾ���
jex.web.format = {};
jex.web.form = {errorYn : false //validation ��������
				,submitYn:false}; //submit ������ ����
jex.web.form.event = {};
jex.web.form.check={};

jQuery.ajaxSetup({
    'beforeSend': function(xhr) {xhr.setRequestHeader("charset", "utf-8");}
});

/**
 * �ʼ��Է��׸��� null üũ 
 * Attribute : notnull='true'
 */
jex.web.form.check.isNotnull = function(selector){
	if( jex.web.null2void($(selector).attr("notnull")).toLowerCase()=='true')
	{
		//checkbox
		if( $(selector).attr("type")=="checkbox" )
		{
			var _checkboxGroup = $(":checkbox[name*='"+$(selector).attr("name")+"']:checked");

			if( _checkboxGroup.length < 1 ){
				jex.web.alert("["+ $(selector).attr("fieldName") +"] �׸��� �Ѱ� �̻� �������ּ���.");
				jex.web.form.errorYn=true;
				return false;
			}
		}
		//radio
		else if( $(selector).attr("type")=="radio" )
		{
			if($(":radio[name*='"+$(selector).attr("name")+"']:checked").length < 1){  
				jex.web.alert("["+ $(selector).attr("fieldName") +"] �׸��� �ʼ� ���� �����Դϴ�.");
				jex.web.form.errorYn=true;
				return false;  
			}
		}
		//selectbox
		else if( $(selector).attr("nodeName")=="SELECT" )
		{
			if(!$(selector).find("option:selected").val()){
				jex.web.alert("["+$(selector).attr("fieldName")+"] �׸��� �������ּ���.");
				jex.web.form.errorYn=true;
				return false;
			}
		}
		else
		{
			if(!$(selector).val()){
				jex.web.alert("["+$(selector).attr("fieldName")+"] �׸��� �ʼ� �Է��Դϴ�.");
				jex.web.form.errorYn=true;
				return false;
			}
		}
	}
	return true;
};


/**
 * �ּұ���üũ
 * Attribute : minLength='����'
 */
jex.web.form.check.isMinLength = function(selector){
	if( $(selector).attr("minLength")==undefined ) return true;
//	if( $(selector).attr("minLength")=="" ) return true;
	var minLength = parseInt($(selector).attr("minLength"));
	if( isNaN(minLength) ) return true;
	if( $(selector).val().length < minLength ){
		alert("["+$(selector).attr("fieldName")+"] �׸��� "+ minLength + "�� �̻� �Է����ּ���.");
		jex.web.form.errorYn=true;
		return false;
	}
	return true;
};

/**
 * �ִ����üũ
 * maxlength�� default���� �ƴҰ�� byte�� �������� üũ�Ѵ�.
 */
jex.web.form.check.isMaxLength = function(selector){
	if($(selector).attr("type")=="hidden" ||$(selector).attr("type")=="button" ||$(selector).attr("tagName")=="TEXTAREA")	return true;
	
	var maxLength = $(selector).attr("maxlength");
	
	//�� �������� �⺻��
	//ũ�� : 524288
	//���̾����� : -1
	//�ͽ� : 2147483647
	if( maxLength==undefined || maxLength == 524288 || maxLength == -1 || maxLength == 2147483647)	return true;
	
	var byteLength = $(selector).val().byteLength();
	
	if( byteLength > maxLength ){
		alert("["+$(selector).attr("fieldName")+"] �׸��� "+ maxLength + "byte�� ������ �����ϴ�.(���� "+byteLength+"byte)");
		jex.web.form.errorYn=true;
		return false;
	}
	return true;
};

/**
 * ����üũ
 * Attribute : format
 */
jex.web.form.check.isFormat = function(selector)
{
//	alert($(selector).attr("id"));
	var checkValue = $(selector).val();
	
	//format attribete�� �����Ǿ��־ notnull�� �ƴҼ��� �ֱ⶧����
	//���� �ִ°�츸 üũ�Ѵ�.
	if(checkValue!=null && checkValue!=undefined && checkValue.length>0)
	{
		switch( jex.web.null2void($(selector).attr("format")).toLowerCase() ){
			//��¥����
			case "date":
				var result = jex.web.format.verifyDate( checkValue );
				
				if(result){
					alert("["+$(selector).attr("fieldName")+"] �׸��� "+result);
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//���ڰ���: +/-�� ������ �����Է°�
			case "number":
				if( isNaN(new Number(checkValue)) )
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� ���ڸ� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//�������ڰ���
			case "engnum":
				if(/[^a-zA-z0-9]/.test(checkValue)|| /\_/.test(checkValue))
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� ���� �Ǵ� ���ڸ� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//�ݾװ���
			case "currency":
				checkValue = checkValue.replace(/,/g, '');
				if( isNaN(new Number(checkValue)) )
				{
					alert("["+$(selector).attr("fieldName")+"] �׸��� �ݾ��������� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//���¹�ȣ���� : ���ڸ� ����Ѵ�.
			case "accountno":
				if( /[^0-9]/.test(checkValue) )
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� ���ڸ� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;

			//���¹�ȣ���� : ����,������(-)�� ����Ѵ�
			case "accountno2":
				if( /[^0-9]/.test( checkValue.replace(/\-/g, "") ) )
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� ���� �Ǵ� ������(-)�� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//�ֹε�Ϲ�ȣ ���ڸ�: �ڸ���(6�ڸ�) �� ���ڿ��θ� �˻��Ѵ�.
			case "resregno1":
				if( /[^0-9]/.test(checkValue) || checkValue.length != 6)
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� 6�ڸ��� ���ڸ� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//�ֹε�Ϲ�ȣ ���ڸ�: �ڸ���(7�ڸ�) �� ���ڿ��θ� �˻��Ѵ�.
			case "resregno2":
				if( /[^0-9]/.test(checkValue) || checkValue.length != 7)
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� 7�ڸ��� ���ڸ� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//�ֹε�Ϲ�ȣ: �ڸ���(13�ڸ�) �� ���ڿ��θ� �˻��Ѵ�.
			case "resregno":
				if( /[^0-9]/.test(checkValue) || checkValue.length != 13)
				{
					alert("["+$(selector).attr("fieldName")+"] �׸񿡴� 13�ڸ��� ���ڸ� �Է����ּ���.");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
			
			//����ڹ�ȣ����
			case "bizno":
				if( !jex.web.format.verifyBizNo(checkValue) )
				{
					alert("["+$(selector).attr("fieldName")+"] �׸� �ùٸ��� ���� ����ڹ�ȣ�Դϴ�.\n(����ڹ�ȣ�� 10�ڸ� �����Դϴ�.)");
					jex.web.form.errorYn=true;
					return false;
				}
			break;
		}//end of switch
	}
	return true;
};

//��¥���˰���
jex.web.format.verifyDate = function(param){
	if( param ) param = $.trim(param);
	if( /[^0-9~!@\#$%<>^&*\()\-=+._\'\:\/]/gi.test(param) )
		return "��¥�� Ȯ�����ּ���. ��¥������ �߸��Ǿ����ϴ�.";
	
	var inputDate = jex.web.null2void(param).replace(/[^0-9]/g, '');
	
	if(inputDate.length==0)
		return false;
	if(inputDate.length!=8)
		return "��¥�� Ȯ�����ּ���. ��¥������ �߸��Ǿ����ϴ�.";
	
	var yyyy = inputDate.substring(0,4);
	var mm = inputDate.substring(4,6);
	var dd = inputDate.substring(6,8);
	
	var date = new Date(yyyy,mm-1,dd);
	var fullYear = date.getFullYear();
	var month = date.getMonth()+1;
	if( String(month).length==1 ) month = "0"+String(month);
	var day = date.getDate();
	if( String(day).length==1 ) day = "0"+String(day);
	if( inputDate != (String(fullYear)+String(month)+String(day)) )
		return "��¥�� Ȯ�����ּ���. �������� ��¥�� �ƴմϴ�.";
};


/**
 * ����ڹ�ȣ ��ȿ�� ����
 * @param param : �� (��:"1234567890")
 */
jex.web.format.verifyBizNo = function(param){
	if(!param)	return false;
	
	// ���ڰ� �ƴϰų�
	// 10�ڸ��� �ƴϸ� ����
	if(isNaN(new Number(param)) || param.length!=10) 
	{
//		alert("����ڹ�ȣ�� 10�ڸ� �����Դϴ�.");
		return false;
	}

	var sumMod  =   0;
	sumMod  +=  Number(param.charAt(0));
	sumMod  +=  Number(param.charAt(1)) * 3 % 10;
	sumMod  +=  Number(param.charAt(2)) * 7 % 10;
	sumMod  +=  Number(param.charAt(3)) * 1 % 10;
	sumMod  +=  Number(param.charAt(4)) * 3 % 10;
	sumMod  +=  Number(param.charAt(5)) * 7 % 10;
	sumMod  +=  Number(param.charAt(6)) * 1 % 10;
	sumMod  +=  Number(param.charAt(7)) * 3 % 10;
	sumMod  +=  Math.floor(Number(param.charAt(8)) * 5 / 10);
	sumMod  +=  Number(param.charAt(8)) * 5 % 10;
	sumMod  +=  Number(param.charAt(9));
	if  (sumMod % 10    !=  0){
//		alert("�ùٸ��� ���� ����ڹ�ȣ�Դϴ�.");
		return false;
	}
	return  true;
};


/**
 * ����ڹ�ȣ ������ �����Ѵ�.
 * 10�ڸ�����ڹ�ȣ = 123-12-12345
 * 13�ڸ�����ڹ�ȣ = 123456-1234567
 * @param param
 */
jex.web.format.bizNo = function(param){
	
	if(!param)	return "";
	
	var result = ""; 
	
	if(typeof param == "number")	param = String(param);
	
	if(param.length==10){
		result = param.substring(0, 3)+"-"+param.substring(3, 5)+"-"+param.substring(5);
	}else{
		result = param.substring(0, 6)+"-"+param.substring(6);
	}
	
	return  result;
};


/**
 * �ݾ������� �����Ѵ�.
 */
jex.web.format.currency = function(param){
	
	if(typeof param == "number")
	{
		param = String(param);
	}
	
	var val = param;
	var decimal = "";
	if(!val || isNaN(val))
		return '0';
	
	var mark = "";
	if(val.charAt(0)=="-")
	{
		mark = "-";
		val = val.substring(1);
	}
	
	var dotIndex = val.indexOf(".");
	if(dotIndex != -1)
	{
		var temp = val.split(".");
		val = temp[0];
		decimal = "."+temp[1];
	}
		
	var result="";			
	var leng = val.length-1;
	var count = 0;
	for(var i=leng ; i>=0 ; i--)
	{
		if(count!=0 && (count%3 == 0)){
			result = ","+result;
		}
		++count;

		result = val.charAt(i)+result;
	}
	return mark+result+decimal;
};


/**
 * setCSS(selector) : �ش� input�� css�� ������
 * @param1 : input Selector
 * @param2 : css class ��
 */
jex.web.form.setCss = function(selector, cssClass){
//	$(selector).css({"background":"#E9EDFE", "border":"1px #E8001D solid"});
	$(selector).attr("class", cssClass);
};

/**
 * ������ selected �ڽ��� ���ڸ� �Էµ� ��/���� �ش��ϴ� ���ڷ� �����Ѵ�.
 */
jex.web.form.event.replaceSelectDd = function(selector, year, month)
{
	$(selector).children().remove();
	
	var lastDate = jex.web.getLastDate(year, month);
	
	var value="";
	for( var i=1 ; i<=lastDate ; i++)
	{
		value=String(i).length==1?"0"+String(i):i;
		$(selector).append("<option value='"+value+"'>"+value+"</option>");
	}
};


$(document).ready(function(){
	return ;
	//�ε���-->
	$(document.body).append("<div class='loadingbar' id='_Jex_loadingbar' style='display:none;z-index:99999'><img src='img/comm/etc/loading.gif' alt='��ø� ��ٷ��ּ���.'/></div>");
	var _jexLodingVar = document.getElementById("_Jex_loadingbar");
	_jexLodingVar.style.position='absolute';
	_jexLodingVar.style.left = document.body.clientWidth/2-$("#_Jex_loadingbar").width()/2-9;
	_jexLodingVar.style.top = document.body.clientHeight/2-$("#_Jex_loadingbar").height()-20;
	
	$(document).ajaxStart(function(args, b, c){
		if(jQuery.ajaxSettings.loadingbarYn) $("#_Jex_loadingbar").show(); 
	});
	
	$(document).ajaxStop(function(args){
		$("#_Jex_loadingbar").fadeOut("slow");
	});
	//<--�ε���
	
	
	var formList = $("form");
	var form;
	
	$("a").css("cursor","pointer");
	$.each(formList, function(i,v){
		form = $(this);

		//form �� CSS ����--------------------------------------
		//form �� "css" Attribute ��  "true" �� ������ ���� �����Ѵ�.
		if(jex.web.null2void($(this).attr("css")).toLowerCase() =='true')
		{
			//�ؽ�Ʈ�ڽ� css ����
			var textList = $(this).find(":text");
			$.each(textList, function(i, v){
				if( 	jex.web.null2void($(this).attr("notnull")).toLowerCase()=='true' 
					||	jex.web.null2void($(this).attr("minLength"))!=""	)
				{
					jex.web.form.setCss($(this), $(form).attr("cssClass")); 
				}
			});
			
			//Password css ����
			var textList = $(this).find(":password");
			$.each(textList, function(i, v){
				if( 	jex.web.null2void($(this).attr("notnull")).toLowerCase()=='true' 
					||	jex.web.null2void($(this).attr("minLength"))!=""	)
				{
					jex.web.form.setCss($(this), $(form).attr("cssClass")); 
				}
			});
			
			//checkbox css ����
			var checkList = $(this).find(":checkbox");
			$.each(checkList, function(i, v){
				if( jex.web.null2void($(this).attr("notnull")).toLowerCase()=='true' )
				{
					jex.web.form.setCss($(this), $(form).attr("cssClass")); 
				}
			});
			
			//radio css ����
			var checkList = $(this).find(":radio");
			$.each(checkList, function(i, v){
				if( jex.web.null2void($(this).attr("notnull")).toLowerCase()=='true' )
				{
					jex.web.form.setCss($(this), $(form).attr("cssClass")); 
				}
			});
			
			//textarea css ����
			var textareaList = $(this).find("textarea");
			$.each(textareaList, function(i, v){
				if(		jex.web.null2void($(this).attr("notnull")).toLowerCase()=='true' 
					||	jex.web.null2void($(this).attr("minLength"))!=""	)
				{
					jex.web.form.setCss($(this), $(form).attr("cssClass")); 
				}
			});
		}//CCS ���� end
		

		//form submit ��ư �̺�Ʈó��------------------------------------------
		//<input type='submit'> �� �̺�Ʈ �߻��� submit �̺�Ʈ�� ��� �����Ѵ�.
		//form �� "autocheck" Attribute ��  "true" �� ������ ���� validation üũ�� �����ѵ�
		//������ ��츸 submit ó�� �Ѵ�.
		$(this).submit(function(){
			if(jex.web.null2void($(this).attr("autocheck")).toLowerCase()=='true'){
				if(!jex.web.doSubmit($(this).attr("id"), true)){
					return false;
				}
			}else{
				return jex.web.doSubmit($(this).attr("id"), false);
			}
		});

		//form ������ ��翤����Ʈ�߿���  ----------------------------------------
		//format �� submit ���� ������ ������Ʈ�� Ŭ���̺�Ʈ�� �߻��ϸ� submit�� ������.
		//form �� "autocheck" Attribute ��  "true" �� ������ ���� validation üũ�� �����ѵ�
		//������ ��츸 submit ó�� �Ѵ�.
		$.each( $(this).find("*"),function(i2,v2){
			if( jex.web.null2void($(this).attr("format")).toLowerCase()=="submit" )
			{
				$(this).click(function(){
					if(jex.web.null2void($(form).attr("autocheck")).toLowerCase()=='true'){
						jex.web.doSubmit($(form).attr("id"), true);
					}else{
						jex.web.doSubmit($(form).attr("id"), false);
					}
				});
			}
		});
	
	});//end of "$.each(formList, function(i,v)"

	/**
	 * type='svc'�� ������ select element �� ã�� �ش� ������ ȣ������ option element �� �����Ѵ�.
	 */
	var selectboxList =  $("select[type='svc']");
	$.each(selectboxList, function(i,v) {
		var svc		= $(this).attr("svc");//������ID
		var input	= $(this).attr("input");//�Է°�
		var selectedValue = $(this).attr("selectedValue");//selectbox�� �⺻ ���ð�
//		if( !(selectedValue==undefined||selectedValue==null||selectedValue=='null') )	selectedValue = selectedValue.replace(/[^0-9]/g, "");
		
//		var selectbo= $(this);
//		var json	= {};
//		if (jex.web.null2void(input) != "") eval("json = "+input);
//	    jex.web.Ajax(svc, json, function(dat) {
//	    	$.each(dat.REC, function(i,v) {
//	    		if( v.KEY==selectedValue )	selectbo.append("<option value='"+v.KEY+"' selected>"+v.DAT+"</option>");
//	    		else						selectbo.append("<option value='"+v.KEY+"'>"+v.DAT+"</option>");
//	    	});
//	    },"jct", "1");
		
		jex.web.setSelectBox(svc, input, selectedValue, $(this), null);
		
	}); // end of $.each(selectboxList, function(i,v)
	
	/**
	 * type='RADIO'�� ������ DIV element �� ã�� �ش� ������ ȣ������ INPUT element �� �����Ѵ�.
	 */
	var radioBoxList =  $("div[type='radio']");
	$.each(radioBoxList, function(i,v) {
		var svc		= $(this).attr("svc");//������ID
		var input	= $(this).attr("input");//�Է°�
		var radioNm	= $(this).attr("radioNm");//�Է°�
		var selectedValue = $(this).attr("selectedValue");//selectbox�� �⺻ ���ð�
		
		jex.web.setRadioBox(svc, input, selectedValue, $(this), null,radioNm);
		
	}); // end of $.each(selectboxList, function(i,v)

	
	/**
	 * type='jex.selectYearMonth'�� ������ select box�� ã�� "yyyy�� mm��" ����Ʈ�ڽ��� �׸���.
	 */
	var selectYearMonth =  $("select[type='jex.selectYearMonth']");
	if(selectYearMonth.length>0)
	{
		var currentDate = jex.web.getServerDate("yyyymmdd");
		var currentYear = currentDate.substring(0,4);
		var currentMonth = currentDate.substring(4,6);
		var currentDay = currentDate.substring(6,8);

		for( var i=0 ; i<7 ; i++)
		{
			var beforDate = new Date(currentYear, currentMonth-1-i, currentDay);
			var beforYear = beforDate.getFullYear();
			var beforMonth = beforDate.getMonth()+1<10?"0"+(beforDate.getMonth()+1):(beforDate.getMonth()+1);
			
    		if(i==0)	$(selectYearMonth[0]).append("<option value='"+beforYear+beforMonth+"' selected>"+beforYear+"��&nbsp;&nbsp;"+beforMonth+"��&nbsp;</option>");
    		else		$(selectYearMonth[0]).append("<option value='"+beforYear+beforMonth+"'>"+beforYear+"��&nbsp;&nbsp;"+beforMonth+"��&nbsp;</option>");
		}
	}
	
	/**
	 * span �̳� div�� id�� "jex.selectCalendar"�� ������ "��/��/�� ����Ʈ�ڽ��� ���� �׸���
	 */
	var selectCalendars = $("[id=jex.selectCalendar]");
	if( selectCalendars.length>0 )
	{
		$.each( selectCalendars, function(i,v){
			
			var selectHtml	= _getSelectYyyy( $(this).attr("yearName"), $(this).attr("startYear") ) +" �� "
							+ _getSelectMm( $(this).attr("monthName") ) +" �� "
							+ _getSelectDd( $(this).attr("dateName") ) +" ��";
			
			$(this).html(selectHtml);
			
			if( jex.web.null2void($(this).attr("defaultDate")).length > 0 )
			{
				jex.web.setCalendar($(this).attr("defaultDate"), i);
			}
		});
	}
	
	function _getSelectYyyy(name, startYear){
		var currentYyyy = new Date().getFullYear();
		
		startYear = new Number(startYear);
		if( isNaN(startYear) )	startYear = currentYyyy-10;
		
		var optionHtml	="";
		for( var i=startYear ; i<=currentYyyy ; i++)
		{
			if( i==currentYyyy )
				optionHtml += "<option value='"+i+"' selected>"+i+"</option>";
			else
				optionHtml += "<option value='"+i+"'>"+i+"</option>";
		}
		return "<select id='jex.selectYyyy' name='"+name+"' onChange='jex.web.form.event.changeSelectCanendar(this)'>"+ optionHtml+"</select>";
	}
	
	function _getSelectMm(name){
		var currentMm = new Date().getMonth();
		
		var optionHtml	="";
		var value = "";
		for( var i=1 ; i<=12 ; i++)
		{
			value = String(i).length==1? "0"+String(i):i;
			if(i==currentMm+1)
				optionHtml += "<option value='"+value+"' selected>"+value+"</option>";
			else
				optionHtml += "<option value='"+value+"'>"+value+"</option>";
		}
		return "<select id='jex.selectMm' name='"+name+"' onChange='jex.web.form.event.changeSelectCanendar(this)'>"+ optionHtml+"</select>";
	}
	
	function _getSelectDd(name){
		var date = new Date();
		var currentDd =date.getDate(); 
		var lastDate = jex.web.getLastDate(date.getFullYear(), date.getMonth()+1);
		
		var optionHtml	="";
		
		var value = "";
		for( var i=1 ; i<=lastDate ; i++)
		{
			value = String(i).length==1? "0"+String(i):i;
			if( i==currentDd )
				optionHtml += "<option value='"+value+"' selected>"+value+"</option>";
			else
				optionHtml += "<option value='"+value+"'>"+value+"</option>";
		}
		return "<select id='jex.selectDd' name='"+name+"'>"+ optionHtml+"</select>";
	}
	/**
	 * ����Ʈ�ڽ� �޷� �׸��� ��
	 */
	
	
	/**
	 * format=number2 �εǾ��ִ� input�� ���ڸ� �Է��Ҽ��ִ�. 
	 */
	$.each($("input[format=number2]"), function(i,v){
		//'�ѱ�'����϶��� �Ʒ� ó���� �����ϰ�  �ԷµǱ⶧���� �����ϱ⶧���� style�� ���� �׸��� �����Ѵ�.
		//������ ���� ���� ��ȯ��Ų��.
//		if(navigator.userAgent.toLowerCase().indexOf("msie") != -1)
//		{
			$(v).attr("style", "ime-mode:disabled;"+$(v).attr("style"));
//		}
		$(this).keydown(function(event){
			//shift Ű�� ���������� Ư������ �Է� �Ұ�
			//�齺���̽�(8), delete(46), ����Ű(37~40) �� �����
			//���ڰ� �ƴ� �Է°� �Է� �Ұ�(48~57�� ��� ����Ű�ڵ�), (96~105�� ������ �����е�Ű�ڵ�)
			if(  event.shiftKey ||
					(   !(event.keyCode==8 || event.keyCode==46 || (event.keyCode>=37 && event.keyCode<=40) )
					&& !(event.keyCode>=48 && event.keyCode<=57)
					&& !(event.keyCode>=96 && event.keyCode<=105)
					)
			)
			{
				event.returnValue=false;
				return false;
			}  
		}); 
	});
});//end of "$(document).ready(function()"
 
//"yyyy�� mm��" ����Ʈ�ڽ� �̺�Ʈ ó��
jex.web.form.event.changeSelectYearMonth = function(selector)
{
	var selectVal = String($(selector).val());
	var currentDate = jex.web.getServerDate("yyyymmdd");

	var lastDate = "";
	if(selectVal==currentDate.substring(0,6))	lastDate = currentDate.substring(6,8);
	else	{
		lastDate = jex.web.getLastDate(selectVal.substring(0,4), selectVal.substring(4,6));
	}
	jex.web.setCalendar(selectVal+"01", 0);
	jex.web.setCalendar(selectVal+lastDate, 1);
};

//��/�� ����Ʈ�ڽ� �̺�Ʈ
jex.web.form.event.changeSelectCanendar = function(selector)
{
	var selectors = $("select[id="+ $(selector).attr("id") +"]"); 
	
	$.each(selectors, function(i, v){
		if( this==selector )
		{
			var targetSelectBox = $("select[id=jex.selectDd]")[i];
			
			jex.web.form.event.replaceSelectDd(targetSelectBox, $($("select[id=jex.selectYyyy]")[i]).val(), $($("select[id=jex.selectMm]")[i]).val());
		}
	});
};


/***********************************************
 * ����� ȣ���� ������ �Լ� ����
 ***********************************************/
jex.web.alert = function(msg, code) {
	if (code!=null&&code!=undefined)	msg = jex.web.getMsg(code);
	alert(msg);
};

jex.web.confirm = function(msg, code) {
	if (code!=null&&code!=undefined)	msg = jex.web.getMsg(code);
	return confirm(msg);
};

jex.web.debug = function(code, fn) {
	if (_jex_debugMod) _jex_error_dialog(code, "excla");
};

jex.web.err  = function(code ,fn) {
	_jex_error_dialog(code, "error");
};

jex.web.info = function(code ,fn) {
	_jex_error_dialog(code, "ok", fn);
};

jex.web.isError = function(data) {
	return data['COMMON_HEAD']['ERROR'];
};

jex.web.getCodeList = function(grpCd) {
	var result;
//	jex.web.Ajax("comb_0001_01", {DIV_GRP_CD:grpCd}, function(data) {result = data;}, "jct", false);
	return result;
};

jex.web.getCodeNm	= function(grpCd, grpItm) {
	var result;
//	jex.web.Ajax("comm_0008_01_r001", {DIV_GRP_CD:grpCd, DIV_ITEM_CD:grpItm}, function(data) { result=data; }, "jct", false);
	return result;
};

jex.web.getMsg = function(code) {
	var result;
	jex.web.Ajax("code_0001_01_r001", {RSLT_CD:code}, function(data) { result=data.RSLT_MSG; }, "jct", false, false, false);
	return result;
};

function _jex_error_dialog(code, type, fn) {
	var msg;
	if (typeof(code)!="string")		code = code['COMMON_HEAD']['CODE'];
	if (typeof(code)!="string")		msg  = code['COMMON_HEAD']['MESSAGE'];
	if (msg==null||msg==undefined)	msg = jex.web.getMsg(code);
	
	if (parent.tMenuList == null || parent.tMenuList == undefined || true) {
		alert(msg);
		if (typeof(fn) == "function") fn();
		return;
	} 
		
	var title		= {"excla":"Debug", "ok":"Ȯ�� �޽���", "error":"���� �޽���"};
	var errorHtml	= "<div id='_jex_error_dialog' class='pop_wrap_div' style='width:540px;height:212px' tabindex='0'>"+
							"<div id='p-title' class='pop_top'>"+
								"<h1>%TITLE%</h1>"+
								"<span><img id='close' src='img/00/menu/popup_close.gif' alt='close' style='cursor:pointer' /></span>"+
							"</div>"+
							"<div id='pcpcont' class='pop_cont'>"+
								"<div class='infoMessage'>"+
									"<dl>"+
										"<dt class='%TYPE%'></dt>"+
										"<dd style='width:320px'><strong>%CODE%</strong><br />%MSG%</dd>"+
									"</dl>"+
								"</div>"+
								"<ul class='btn_both'>"+
									"<li class='btn_bothLeft'></li>"+
									"<li  class='btn_bothRight'><span class='btn_off'><a id='close' style='cursor:pointer'>Ȯ��</a></span></li>"+
								"</ul>"+
							"</div>"+
						"</div>";
	errorHtml = errorHtml.replace(/%TITLE%/g,	title[type]);
	errorHtml = errorHtml.replace(/%TYPE%/g,	type);
	errorHtml =	errorHtml.replace(/%MSG%/g,		msg);
	errorHtml =	errorHtml.replace(/%CODE%/g,	code);
	
	$(errorHtml).appendTo(document.body);
	
	$("#_jex_error_dialog").focus();
	
	$("#_jex_error_dialog").find("#close").click(function(){
		if (typeof(fn) == "function") fn();
		$(document.body).find("#_jex_error_dialog").remove();
	});
	
	$("#_jex_error_dialog").keypress(function(event){
		switch (event.keyCode) {
			case 27:
			case 32:
			case 13:
				if (typeof(fn) == "function") fn();
				$(document.body).find("#_jex_error_dialog").remove();
			break;
		};
		switch (event.charCode) {
			case 27:
			case 32:
			case 13:
				if (typeof(fn) == "function") fn();
				$(document.body).find("#_jex_error_dialog").remove();
			break;
		}
	});
}

/**
 * �����񽺸� ȣ���Ͽ� �ش� ����� selelct�ڽ��� option�׸���� ä���.
 * 
 * @svc				: ������ID
 * @input			: �Է°� ex)'{USR_ID:"test"}'
 * @selectedValue	: �⺻���ð�. ���� ������ option�� value�� �ش� ���� �׸��� �⺻����.
 * @selector		: jquery��ü�� ������ ex)$(this) �Ǵ� $("#ID")...
 * @selectElementId : select�ڽ��� id��.
 * 					=>selector �� selectElementId�� ���߿� �ϳ��� �Է��ϸ��.
 */
jex.web.setSelectBox = function(svc, input, selectedValue, selector, selectElementId)
{
//	if( !(selectedValue==undefined||selectedValue==null||selectedValue=='null') )	selectedValue = selectedValue.replace(/[^0-9]/g, "");
	
	var selectbo;
	
	if(selector==null||selector==undefined||selector=="")
	{
		selectbo = $("#"+selectElementId);
	}
	else
	{
		selectbo = selector;
	}
	
	var _style = selectbo.attr("style");
	var _class = selectbo.attr("class");
	
	//������ option �׸��� �����ϸ� ����.
//	selectbo.children().remove();
	selectbo.find("[default=false]").remove();
	
	var json	= {};
	if (jex.web.null2void(input) != "") eval("json = "+input);
	
    jex.web.Ajax(svc, json, function(dat) {
		try {
	    	$.each(dat.REC, function(i,v) {
		    	if(v.OPT_VAL==undefined || v.OPT_VAL==null || v.OPT_VAL=="null") v.OPT_VAL="";
		    	if(v.OPT_VAL==selectedValue )	selectbo.append("<option value='"+v.OPT_VAL+"' default='false' title='"+v.OPT_TXT+"' selected>"+v.OPT_TXT+"</option>");
		    	else							selectbo.append("<option value='"+v.OPT_VAL+"' default='false' title='"+v.OPT_TXT+"'>"+v.OPT_TXT+"</option>");
	    	});
	    	
	    	selectbo.attr("style", _style);
	    	selectbo.attr("class", _class);
		} catch(e) {
			alert("SELECT BOX �׸��� ����! ["+svc+"]");
			return;
		}
    },"jct", false, true, false);
};

/**
 * �����񽺸� ȣ���Ͽ� �ش� ����� INPUT RADIO�׸��� ä���.
 * 
 * @svc				: ������ID
 * @input			: �Է°� ex)'{USR_ID:"test"}'
 * @selectedValue	: �⺻���ð�. ���� ������ option�� value�� �ش� ���� �׸��� �⺻����.
 * @selector		: jquery��ü�� ������ ex)$(this) �Ǵ� $("#ID")...
 * @selectElementId : input�ڽ��� id��.
 * 					=>selector �� selectElementId�� ���߿� �ϳ��� �Է��ϸ��.
 */
jex.web.setRadioBox = function(svc, input, selectedValue, selector, selectElementId, radioNm)
{
	var selectbo;
	
	if(selector==null||selector==undefined||selector=="")
	{
		selectbo = $("#"+selectElementId);
	}
	else
	{
		selectbo = selector;
	}
	
	var _style = selectbo.attr("style");
	var _class = selectbo.attr("class");
	
	//������ option �׸��� �����ϸ� ����.
	selectbo.children().remove();
	
	var json	= {};
	if (jex.web.null2void(input) != "") eval("json = "+input);
	
    jex.web.Ajax(svc, json, function(dat) {
		try {
	    	$.each(dat.REC, function(i,v) {
		    		if(v.OPT_VAL==undefined || v.OPT_VAL==null || v.OPT_VAL=="null") v.OPT_VAL="";
		    		if( v.OPT_VAL==selectedValue )	selectbo.append("<input type='radio' name='"+radioNm+"' value='"+v.OPT_VAL+"' checked /><label>"+v.OPT_TXT+"</label>");
		    		else						selectbo.append("<input type='radio' name='"+radioNm+"'  value='"+v.OPT_VAL+"' /><label>"+v.OPT_TXT+"</label>");
	    	});
	    	
	    	selectbo.attr("style", _style);
	    	selectbo.attr("class", _class);
		} catch(e) {
			alert("RADIO BOX �׸��� ����! ["+svc+"]");
			return;
		}
    },"jct", false);
};

/**
 * �����ð��� �����Ѵ�.
 * ���� ������ Format..
 * yy,yyyy : �⵵
 * mm      : ��
 * dd      : �� 
 * 
 * hh(hh24) : �ð�(24�ñ�������)
 * mi       : ��
 * ss       : ��
 * ms       :  millisecond 
 * 
 * MMM      : ��(Ex:Jan,1��)
 * EEE      : ��(Ex:Tue,ȭ)
 * G        : AD/BC
 */
//jex.web.getServerDate = function(format)
//{
//	var result ="";
//	jex.web.Ajax("getServerDate", {FRMT_CTT:format}, function(dat){
//		result = dat.INQ_DT;
//	},"jct", "1");
//	return result;
//};

/**
 * startDate�� endDate�� ���ؼ� startDate�� ������ -1, ������0, �� ũ�� 1�� �����Ѵ�.
 * 
 * @param startDate	: ���˿� ������� "yyyy"+"mm"+"dd"�� �Ǿ��ִ� ��¥.
 * @param endDate	: ���˿� ������� "yyyy"+"mm"+"dd"�� �Ǿ��ִ� ��¥.
 * @param msgCode	: �⺻���� "��ȸ�������ڰ� �� Ů�ϴ�"��� �޼����� ����ָ�, �ٸ��޼����� ����� �Ұ��
 *                    �ش� �޼��� �ڵ带 �Է��Ѵ�.
 * @param msgYn	: true(default)/false
 */
jex.web.compareDate = function(startDate, endDate, msgCode, msgYn)
{
	if(!startDate){
		alert("���� ù��° ��¥�� �Էµ��� �ʾҽ��ϴ�.");
		return false;
	}
	if(!endDate){
		alert("���� �ι�° ��¥�� �Էµ��� �ʾҽ��ϴ�.");
		return false;
	}
	
	if(typeof startDate == "number")	startDate = String(startDate);
	if(typeof endDate == "number")	endDate = String(endDate);
	
	startDate = startDate.replace(/[^0-9]/g, "");
	endDate = endDate.replace(/[^0-9]/g, "");
	
	var result = new Number(startDate) - new Number(endDate);
	
	if(result<0){
		return -1;
	}else if(result==0)
	{
		return 0;
	}else{
		if(msgYn==undefined || msgYn)
		{
			jex.web.info( !msgCode?"WM0071":msgCode );
		}
		return 1;
	}
};

/**
 * @param format 	���� ������ Format..
 * 						yy,yyyy : �⵵
 * 						mm      : ��
 * 						dd      : �� 
 * 						hh      : ��
 * 						hh24    : 0��~23��
 * 						mi      : ��
 * 						ss      : ��
 * 						EEE      : ����(ȭ) 
 * @param c     ���� Flag('Y':��,'M':��,'W':��,'D'��)
 * @param i     ���� ��갪
 * @param sdate	yyyymmdd�� ���� ��¥ ���ڿ�
 * 
 * ��) ���糯¥ : jex.web.getDate("yyyy-mm-dd")
 *     ���糯¥�ú��ʱ��� ���ϱ� : jex.web.getDate("yyyy-mm-dd hh24:mi:ss")
 *     ���糯¥,���ϰ������� : jex.web.getDate("yyyy-mm-dd EEE")
 *     ���翡�� �Ѵ��� ��¥ ���ϱ� : jex.web.getDate("yyyy-mm-dd", "M", -1)
 */
jex.web.getDate = function(format,  c, i, sdate)
{
	var currentDate;
	if(sdate){
		currentDate = new Date(jex.web.format.date(sdate, "yyyy"), parseInt(jex.web.format.date(sdate, "mm"))-1, jex.web.format.date(sdate, "dd"));
	}else{
		currentDate = new Date();
	}
	
	var _tmpDate;
	if(jex.web.null2void(c)!="")
	{
		switch( c.toUpperCase() ){
			case "Y":
				_tmpDate = new Date(currentDate.getFullYear()+i, currentDate.getMonth(), currentDate.getDate());
			break;
			
			case "M":
				_tmpDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+i,  1);
				
				//beforeDate�� ������ ��¥��, ��ȸ�������������� ���õǾ��ִ°����� ������
				//beforeDate�� ������ ��¥�� �����Ѵ�.
				var lastDate = jex.web.getLastDate(_tmpDate.getFullYear(), _tmpDate.getMonth()+1);
				if( lastDate < currentDate.getDate() )
				{
					_tmpDate.setDate(lastDate);
				}
				else
				{
					_tmpDate.setDate(currentDate.getDate());
				}
				
			break;
			
			case "W":
				_tmpDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),  currentDate.getDate()+(i*7));
			break;
			
			case "D":
				_tmpDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),  currentDate.getDate()-i);
			break;
			
			default : 
				jex.web.alert("���� ���� Flag�Դϴ�.("+c+")");
				return false;
			break;
		}
		currentDate = _tmpDate;
	}
	var year = String(currentDate.getFullYear());
	
	var month = currentDate.getMonth();
	month = month+1<10?"0"+String(month+1):String(month+1);
	
	var date = currentDate.getDate();
	date = date<10?"0"+String(date):String(date);
	
	var weekstr='�Ͽ�ȭ�������'; // ���� ��Ʈ��
	
	var day = weekstr.substr(currentDate.getDay() , 1);
	
	var hours = currentDate.getHours();
	hours = hours<10?"0"+String(hours):String(hours);
	
	var minutes =  currentDate.getMinutes();
	minutes = minutes<10?"0"+String(minutes):String(minutes);
	
	var seconds = currentDate.getSeconds();
	seconds = seconds<10?"0"+String(seconds):String(seconds);
	
	return jex.web.format.date(year+month+date+hours+hours+seconds, format);
//	return format.replace("yyyy", year)
//				.replace("yy", year.substring(2, 4))
//				.replace("mm",month )
//				.replace("dd", date)
//				.replace("EEE", day)
//				.replace("hh24", hours)
//				.replace("hh", parseInt(hours)<=12?hours:"0"+String(parseInt(hours)-12))
//				.replace("mi", minutes)
//				.replace("ss", seconds);
};

/**
 * ���� ������ Format..
 * yy,yyyy : �⵵
 * mm      : ��
 * dd      : ��
 * hh      : ��  
 * hh24    : 0��~23��
 * mi      : ��
 * ss      : ��
 * 
 * EEE      : ����(ȭ) 
 * 
 * @param date  : ��¥���ڿ�
 * @param format : ���յȳ�¥����
 * 
 * ��) jex.web.format.date("20101207153524", "yyyy��mm��dd�� hh24�� mi�� ss�� EEE����") =>��� : 2010��12��07�� 15�� 35�� 24�� ȭ����
 *     jex.web.format.date("20101207153524", "yyyy-mm-dd hh24:mi:ss (EEE)") =>��� : 2010-12-07 15:35:24 (ȭ)
 */
jex.web.format.date = function(date, format)
{
	if(!format){
		alert("��¥ ������ �Է����ּ���");
		return false;
	}
	
	if(!date)	return "";

	//�̹� ������ �Ǿ��ִ°��� �����Ѵ�.
	date = date.replace(/[^0-9]/g,"");
	
	//�Էµ� ��¥�� ���̰� �����õǾ�� �ϴ� ���̺��� ������ �ڿ� 0�� ���δ�.
	var formatLength = format.replace(/[^a-z]/g, "").length;
	var dateLength = date.length;
	for(var i=0 ; i<formatLength-dateLength ; i++){
		date += '0';
	}

	var idx = format.indexOf("yyyy");
	if( idx > -1 ){
		format = format.replace("yyyy", date.substring(0,4));
	}
	idx = format.indexOf("yy");
	if( idx > -1 ){
		format = format.replace("yy", date.substring(2,4));
	}
	idx = format.indexOf("mm");
	if( idx > -1 ){
		format = format.replace("mm", date.substring(4,6));
	}
	idx = format.indexOf("dd");
	if( idx > -1 ){
		format = format.replace("dd", date.substring(6,8));
	}
	idx = format.indexOf("hh24");
	if( idx > -1 ){
		format = format.replace("hh24", date.substring(8,10));
	}
	idx = format.indexOf("hh");
	if( idx > -1 ){
		var hours = date.substring(8,10);
		hours = parseInt(hours)<=12?hours:"0"+String(parseInt(hours)-12);
		format = format.replace("hh", hours);
	}
	idx = format.indexOf("mi");
	if( idx > -1 ){
		format = format.replace("mi", date.substring(10, 12));
	}
	idx = format.indexOf("ss");
	if( idx > -1 ){
		format = format.replace("ss", date.substring(12));
	}
	idx = format.indexOf("EEE");
	if( idx > -1 ){
		var weekstr='�Ͽ�ȭ�������'; // ���� ��Ʈ��
		
		var day = weekstr.substr(new Date(date.substring(0,4), parseInt(date.substring(4,6))-1, date.substring(6,8)).getDay(), 1);
		format = format.replace("EEE", day);
	}
	
	return format;
};



/**
 * ������ �ִ� ���� �ٿ�ε�
 * 
 * @param fileSavePath : ���ϸ��� ������ ��ü���
 * @param fileOrgName  : �ٿ�ε�������ϸ�
 * @return
 */
jex.web.FileDownload = function(fileSavePath, fileOrgName)
{
//	alert(fileSavePath+":"+fileOrgName);
	
	$("#_downloadDiv").remove();
	$("#_downloadIfrm").remove();
	
	var wsvcId = 'comm_0006_02.act';
	
	var $iframe = $("<iframe name='_downloadIfrm' id='_downloadIfrm' style='display:none'/>");
	
	$iframe.appendTo("body");
	
	var $div = $("<div id='_downloadDiv'/>");
	$div.css({display:"none"});
	$div.appendTo("body");

	var _form = '<form name="_downloadForm" id="_downloadForm" action="'+wsvcId+'" method="post" target="_downloadIfrm">'
		      +		'<input type="hidden" name="FILE_ORG_NAME" value="'+ fileOrgName +'" />'
		      +		'<input type="hidden" name="FILE_SAVE_PATH" value="'+ fileSavePath +'" />'
		      +'</form>';
	$("#_downloadDiv").append(_form);

	jex.web.doSubmit("_downloadForm", false);
};

/**
 * ��������
 * 
 * @wsvcId		������ID(������ID.act)
 * @params		�Է°��� object���·� �Է�. KEY�� action �Էµ����� �׸��� ��ġ �ϰ� �Է��ؾ���.
 *              ex: {KEY1:"��1", KEY2:"��2"}
 */
jex.web.FileDownloadURL = function(wsvcId, params, debug)
{
	$("#_downloadDiv").remove();
	$("#_downloadIfrm").remove();
	
	if(!wsvcId)
	{
		alert("������ID�� �Է����ּ���.");
		return false;
	}
	
	if( !/\.act$/.test(wsvcId))
	{
		wsvcId = wsvcId+".act";
	}
	
	var paramInputs = "";
	if( !(params==undefined||params==null||params=='null'||params=="") )
	{
		for(var tempKey in params)
		{
			paramInputs += '<input type="hidden" name="'+tempKey+'" value="'+ params[tempKey] +'" />';
		}
	}
	
    var $iframe = $("<iframe name='_downloadIfrm' id='_downloadIfrm'/>");
    
    if(debug)
    	$iframe.css({ position: "absolute", width: "700px", height: "400px" });
    else
    	$iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" });
   
    $iframe.appendTo("body");

	var $div = $("<div id='_downloadDiv'/>");
	$div.css({display:"none"});
	$div.appendTo("body");

	var _form = '<form name="_downloadForm" id="_downloadForm" action="'+wsvcId+'" method="post" target="_downloadIfrm">'
		      +     paramInputs
		      +'</form>';
	$("#_downloadDiv").append(_form);

	jex.web.doSubmit("_downloadForm", false);
};

/**
 * HTML ��������
 * 
 * @divId		���Ϸ� ������ ������ DIV�� ���ΰ� �ش� DIV���̵� �Է��Ѵ�.
 * @fileName	������ ���ϸ�
 * @skipId		������ DIV���� ������ ����� ���ܽñ�κ��� ID�� �Է��Ѵ�.
 *              ex) <table id='skipArea'></table> <div id='skipArea'></div> �̷������� �Ǿ������� ���� skipId ��
 *              �ش��ϴ� ��� ������Ʈ�� ���ܽ�Ų��.
 * @debug		true �Է½� iframe ������ �����ִ�.              
 */
jex.web.FileDownloadHtml = function(divId, fileName, skipId, debug)
{
	$("#_downloadDiv").remove();
	$("#_downloadIfrm").remove();
	
	var $element = $("#"+divId);
	
	var $div = $("<div id='_downloadDiv'/>");
	$div.css({display:"none"});
	$div.appendTo("body");
	
    $element.each( function() { 
    	$("#_downloadDiv").append($(this).html()); 
    });
    
    //skipId �� �ش��ϴ� ������Ʈ ����
    $.each( $("#_downloadDiv").find("[id="+skipId+"]"), function(i, v){
    	$(this).remove();
    });
    
    $.each( $("#_downloadDiv").find("img"), function(i, v){
    	var src = $(this).attr("src");

    	if(! /^http/.test(src) ){
    		src = 'http://' + window.location.host +  (/^[\/]/.test(src)?href:"/"+src);
    	}

    	$(this).attr("src", src);
    });
    
	var $iframe = $("<iframe name='_downloadIfrm' id='_downloadIfrm'/>");
    
	if(debug)
    	$iframe.css({ position: "absolute", width: "700px", height: "400px" });
	else
		$iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" });

    $iframe.appendTo("body");
    var doc = $iframe[0].contentWindow.document;
    doc.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
    doc.write("<html xmlns='http://www.w3.org/1999/xhtml'><head>");
    doc.write("<meta http-equiv='Content-Type' content='text/html; charset=euc-kr'>");
    doc.write("<title>"+$("title").html()+"</title>");
    $("link").each( function() {
    	var href = $(this).attr("href");
    	
    	if(! /^http/.test(href) ){
    		href = 'http://' + window.location.host +  (/^[\/]/.test(href)?href:"/"+href);
    	}
    		
        doc.write("<link type='text/css' rel='stylesheet' href='" + href + "' />");
    });
    doc.write("</head><body>");
    doc.write($("#_downloadDiv").html());
    doc.write("</body></html>");

    doc.close();
    setTimeout( function() { 
    	$iframe[0].contentWindow.document.execCommand('SaveAs', false, fileName);
    }, 500);
};


/**
 * DIV ID�� �Է¹޾Ƽ� �ش� DIV�� ������ ����Ѵ�. 
 */
jex.web.print = function(divId)
{
	if(divId==undefined || divId==null || divId=="")
	{
		alert("����� DIV ID�� �������ּ���.");
		return false;
	}
	$("#"+divId).jqprint({ importCSS: true});   
};

/**
 * ��,���� �Է¹޾� �ش���� ������ ���ڸ� ��ȯ�Ѵ�.
 */
jex.web.getLastDate = function(yyyy, mm)
{
	if( yyyy==undefined || String(yyyy).length!=4 || mm==undefined || String(mm).length>2 )
		return "";
	else
		return new Date(new Date(yyyy, mm, '1')-(60*60*24*1000)).getDate();
};

/**
 * ������ ��/��/�� ����Ʈ�ڽ��� ��¥�� �����Ѵ�.
 * 
 * @param yyyymmdd : 'yyyymmdd' ������ ��¥ or Date ��ü
 * @param index : id �� "jex.selectCalendar"�� div �Ǵ� span �±��� index(�ڵ��� ��Ÿ���� �޷� ����)
 *                0���� �����Ѵ�.
 */
jex.web.setCalendar = function(yyyymmdd, index)
{
	if( index==undefined || index==null || index=="" )
	{
		index = 0;
	}
	
	if( !yyyymmdd || yyyymmdd=="null")
	{
		yyyymmdd = new Date();
	}
	
	if( yyyymmdd instanceof Date )
	{
		var _fullYear = yyyymmdd.getFullYear();
		var _month = String(yyyymmdd.getMonth()+1).length==1?"0"+String(yyyymmdd.getMonth()+1):yyyymmdd.getMonth()+1;
		var _date = String(yyyymmdd.getDate()).length==1?"0"+String(yyyymmdd.getDate()):yyyymmdd.getDate();
		yyyymmdd   = _fullYear+""+_month+""+_date;
	}
	//���ڰ� �ƴ� ���� ����
	yyyymmdd = yyyymmdd.replace(/[^0-9]/g,"");
	
	var selectYyyy = $("select[id=jex.selectYyyy]")[index];
	var selectMm = $("select[id=jex.selectMm]")[index];
	var selectDd = $("select[id=jex.selectDd]")[index];
	
	_selected($(selectYyyy).children(), yyyymmdd.substring(0,4));
	_selected($(selectMm).children(), yyyymmdd.substring(4,6));

	jex.web.form.event.replaceSelectDd(selectDd, yyyymmdd.substring(0,4), yyyymmdd.substring(4,6));
	_selected($(selectDd).children(),  yyyymmdd.substring(6,8));
	
	function _selected(options, key)
	{
		$.each(options, function(i,v){
			if($(v).val()==key){
				$(this).attr("selected", true);
				return false;
			}
		});
	}
};

/**
 * ��ȸ���� ��/��/�� ����Ʈ�ڽ��� ��ȸ���� ��/��/�� ����Ʈ�ڽ��� ��¥��
 * ���������~���� ��¥�� �����Ѵ�.
 *
 * @param betweenDv : ��(d)/��(w)/��(m) �����ڵ�
 * @param num : �� ������ ����
 * 
 * ex) jex.web.setCalendarBetween("d", 0);  => ����
 * ex) jex.web.setCalendarBetween("w", 1);  => 1��
 */
jex.web.setCalendarBetween = function(startId, endId, betweenDv, num){
	if(isNaN(new Number(num)))	return false;
	
	var $start = $("#"+startId);
	var $end = $("#"+endId);
	var _endDate = $end.jexCalendar("getDate");
	
	//������ �ƴѰ�� ��ȸ�������� ���ǿ� ���õǾ��ִ� ���� �������� ��ȸ�������� ��¥�� ����Ѵ�.
	if( betweenDv!="d" || num>0 ){
		$start.val(jex.web.getDate("yyyy-mm-dd", betweenDv, num, _endDate));
	}
	//�����ϰ�� ���糯¥��.
	else{
		$start.val(jex.web.getDate("yyyy-mm-dd"));
		$end.val(jex.web.getDate("yyyy-mm-dd"));
	}
};

/**
 * value�� false�� �򰡵Ǵ� ��(undefined, null, "")�̸� ""�� ��ȯ�Ѵ�.
 * 
 * @param value
 * @def def	: value�� false�� �򰡵Ǵ� ���ϰ��, def�� ������ def�� ��ȯ�Ѵ�.
 * 
 */
jex.web.null2void = function(value, def){
	if( !value )
		return !def ? "":def ;
	else 
		return $.trim(value);
};

/**
 * form �� ������� �����ϴ� �Լ�
 * @formId : submit �� form �� id
 * @checkYn: submit �ϱ����� formCheck�� �������� ����
 *           �������� ������ default �� true.
 * @form : PT���� ����ϴ� common.js�� uf_openWin �Լ����� submit �ϴ°��� �����ϱ� ���� �߰���
 */
jex.web.doSubmit = function(formId, checkYn, form, opt){
	
	if( formId=="" || formId==undefined || formId==null )
	{
		if( form )
		{
			formId = $(form).attr("id");
			if( formId=="" || formId==undefined || formId==null )
			{
//				$(form).attr("id", "jex.web._subForm_");
//				formId = $(form).attr("id");
				formId = $(form).attr("name");
				$(form).attr("id", form);
			}
		}
	}
	
	if(!jex.web.testMode)
	{
		//form �� action Attribute �� ���õ� �����񽺾��̵� ".act"�� �ٿ��� �ٽ� �����Ѵ�.(.act�� ������ �ʴ°�츸)
		if( !/\./g.test($("#"+formId).attr("action")) && !/\.act$/.test($("#"+formId).attr("action")) )
		{
			$("#"+formId).attr("action", $("#"+formId).attr("action")+".act");
		}
	}
//	alert( $("#"+formId).attr("action") );
	
	//submit �� ���������� Ȯ��
	if(!jex.web.form.submitYn)
	{
		//submit ���������� �� ����
		jex.web.form.submitYn=true;
		
		//checkYn�� false �� �ƴϸ� validation üũ 
		if( checkYn===undefined || checkYn===null || checkYn==="" || checkYn )
		{
			//validation üũ ����
			if( !jex.web.checkForm(formId) ){
				//����� �����̸� submit �������� ����
				jex.web.form.submitYn=false;
				return false;
			}
		}
		
		//submit ����
		if (jex.web.null2void($("#"+formId).attr("type")).toLowerCase() == "json") {
			var rslt =  _trxSubmit($("#"+formId), opt);
			return rslt;
		} else if (jex.web.null2void($("#"+formId).attr("type")).toLowerCase() == "ajax") {
			return _trxAjax($("#"+formId));
		} else {
			/*
			 * ��â ���� From�� ������ ���� Option�� ó���Ѵ�.
			 */
			if (opt!=undefined&&opt!=null&&opt!=""&&opt.target!=undefined&&opt.target!=null&&opt.target!="") {
				var	sizeW = Number(opt.sizeW) + 25;	
				var	sizeH = Number(opt.sizeH);
				var nLeft = screen.width/2 - sizeW/2 ;
				var nTop  = screen.height/2- sizeH/2 ;
				var option= ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
				var winObj= window.open('', opt.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
				winObj.blur();//ũ�ӿ��� focus()�� ȣ���Ұ�� �۵����� �ʾƼ� blur()�� ���� ȣ������ focus()ȣ���ϵ��� ������.
				winObj.focus();//�˾��� �̹� �����ִ°�� ������ �������� �Ѵ�.
				$("#"+formId).attr("method", "post");
				$("#"+formId).attr("target", opt.target);
				if (opt.action!=null && opt.action!=undefined && opt.action != "")  $("#"+formId).attr("action", opt.action);
				jex.web.form.submitYn=false;
			}	
				
			//���ȸ���� ����Ұ��
			if(jex.web.isSecurityModule)
			{
				//xecureweb ���ȸ���� submit
				XecureSubmit( document.getElementById(formId) );
			}
			else
			{
				//$("#"+formId).submit(); => �� ������� submit �ϸ�
				//$("#"+formId).submit(function(){}); => ���� �̺�Ʈ�� ������ ������
				//�Ʒ�ó�� submit�� �����Ѵ�.
				document.getElementById(formId).submit();
			}
			
			jex.web.form.submitYn=false;
		}
	}else{
		alert("�ŷ��� �������Դϴ�.");
		return false;
	}
};//end of "jex.web.doSubmit"

/**
 * 
 */
jex.web.callSvc = function(act_id, json) {
    newform = "<div id='_jexSender'><form id='_jexSenderForm' name='_jexSenderForm' method='"+_this.attr("method")+"' type='"+_this.attr("type")+"' action='"+_this.attr("action")+"'><input type='text' name='_JSON_' value='"+JSON.stringify(json)+"'></form></div>";
    $(document.body).append(newform).hide();
    document._jexSenderForm.submit();
};


/**
 * ����� AJAXȣ������
 *
 * @param act_id : �׼�id(�ʼ�)
 * @param json : json �Է°�
 * @param fn : �ݹ��Լ�(�ʼ�)
 * @param type : act(default)/jct
 * @param asyncMode true:Async(default)
 *                  false:Sync
 * @param error	: ����ó������	true(default)/false
 * @param loadingbarYn : true(default)/false
 */
jex.web.Ajax = function(act_id, json, fn, type, asyncMode, error, loadingbarYn) {
	if (type==undefined||type==null) type="act";
	if (error==undefined||error==null) error=true;
	
	if(asyncMode==undefined || asyncMode)	asyncMode=true;
	else	asyncMode=false;
	
	act_id = act_id+"."+type;
	
	var tranData = "";
	//���ȸ���� ����Ұ��
	if(jex.web.isSecurityModule){
		tranData = _getXecureEnc(encodeURI(JSON.stringify(json)));
	}else{
		tranData = {"_JSON_":encodeURI(JSON.stringify(json))};
	}
	
	//�ε��ٿ��� ����
	jQuery.ajaxSetup({
	    'loadingbarYn': (loadingbarYn==undefined||loadingbarYn)?true:false
	});
	
    jQuery.ajax({
        type:"POST",
        url:act_id,
        data:tranData,
        cache:false,
        async:asyncMode,
        success: function(msg) {
			jex.web.form.submitYn=false;
			var input;
			if (typeof(msg)=="string")
			{
				input = JSON.parse(msg);
				
				//������ �������� ó��
				if(input.RESULT == "__SESSION_ERROR")
				{
					var errTarPath = "sessionErrorMain.act";
					try{
						parent.location.href = errTarPath;
					}catch(e){
						window.location.href = errTarPath;
					}
					return;
				}
			}
			else input = msg;
			if (error){
				if (jex.web.isError(input)) jex.web.err(input);
			}
			if (!error || !jex.web.isError(input)) if(fn) fn(input);
        }
	});
};

function _UserAgent()
{
	return navigator.userAgent.substring(0,9);
}

function _IsNetscape()			// by Zhang
{
	if(navigator.appName == 'Netscape')
		return true ;
	else
		return false ;
}

function _IsNetscape60()			// by Zhang
{
	if(_IsNetscape() && _UserAgent() == 'Mozilla/5')
		return true ;
	else
		return false ;
}

function _getXecureEnc( str )
{
	var qs		= "";
	var path;
	var cipher;
	var result	= {};

	var gIsContinue=0;
	var busy_info = "��ȣȭ �۾��� �������Դϴ�. Ȯ���� �����ð� ��� ��ٷ� �ֽʽÿ�."

	// encrypt QueryString of action field
	if( gIsContinue == 0 ) {
		gIsContinue = 1;
		if( _IsNetscape60() )		// Netscape 6.0
			cipher = document.XecureWeb.nsIXecurePluginInstance.BlockEnc(xgate_addr, path, XecureEscape(qs),"GET");			
		else {
			cipher = document.XecureWeb.BlockEnc(xgate_addr, path, XecureEscape(qs),"GET");
		}
		gIsContinue = 0;
	}
	else {
		alert(busy_info);
		return result;
	}		


	if( cipher == "" )	return result;

	result['q'] = cipher;
	
	posting_data = "_JSON_="+str;

	if( gIsContinue == 0 ) {
		gIsContinue = 1;
		if( IsNetscape60() )		// Netscape 6.0
			cipher = document.XecureWeb.nsIXecurePluginInstance.BlockEnc ( xgate_addr, path, XecureEscape(posting_data), "POST" );
		else{
			cipher = document.XecureWeb.BlockEnc ( xgate_addr, path, XecureEscape(posting_data), "POST" );
		}
		gIsContinue = 0;
	}
	else {
		alert(busy_info);
		return false;
	}		
		
	if( cipher == "" )	return result;
	
	result['p'] = cipher;
		
	return result;
}

/**
 * AJAX����
 * @param _this
 * @return
 */
function _trxAjax(_this) {
	
	var textareaList = _this.find("textarea");
    var inputList   = _this.find("input");
    var selectList  = _this.find("select");
    var json        = {};
    var callback	= _this.attr("callback");
    
    $.each(textareaList, function() {
    	var name    = $(this).attr("name");
        var value   = $(this).val();
        if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
    });
    
    $.each(inputList, function() {
        var name    = $(this).attr("name");
        var value   = $(this).val();
        
        if($(this).attr("jexdatatype")=="item")
        {
        	return true;//==continue;
        }
        else if( $(this).attr("type")=="button" )
        {
        	return true;//==continue;
        }
        else if( $(this).attr("type")=="checkbox")
        {
        	//üũ�Ǿ����� ������ �Ѿ.
        	if(	!$(this).attr("checked")	)	return true;//==continue;
        	
        	//üũ�ڽ��� recordId�Ӽ��� ������
        	//�ݺ��η� �����Ѵ�.
        	if( $(this).attr("recordId") )
        	{
        		if( !json[$(this).attr("recordId")] )	
        		{
        			json[$(this).attr("recordId")] = [];
        		}
        		checkboxRec = {};
        		checkboxRec[name]=value;
        		
        		json[$(this).attr("recordId")].push(checkboxRec);
        	}
        	else
        	{
        		if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        	}
        }
        else if( $(this).attr("type")=="radio")
        {
        	if(	!$(this).attr("checked")	)	return true;//==continue;
        	if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        }
        else
        {
        	if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        }
    });
    
    $.each(selectList, function() {
        var name    = $(this).attr("name");
        var value   = $(this).find("option:selected").val();
        
        //multiple �϶��� �ɼ��׸��� record�� �ö󰣴�.
        if($(this).attr("type")=="select-multiple")
        {
        	var recordId =$(this).attr("recordId"); 
    		if( !json[recordId] )	
    		{
    			json[recordId] = [];
    		}
    		
        	$.each($(this).children(), function(i,v){
        		var selectRec = {};
        		selectRec[name] = $(v).val();
        		
        		json[recordId].push(selectRec);
        	});
        }
        else
        {
        	if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        }
    });

    //List ó��
    var list = $(_this).find("[jexdatatype='list']");
    $.each(list, function(i,v) {
        var g_key   = $(this).attr("id");
        var g_array = [];
        var row     = $(this).find("[jexdatatype='row']");
        $.each(row, function() {
            var itm     = $(this).find("[jexdatatype='item']");
            var itmjson = {};
            var procRadioName = "";//�̹� ������ �������� Ȯ���ϱ� ���� ����
            $.each(itm, function(i,v) {
            	
            	//radio
            	//	radio�� name �� ���� �׸���߿� check �� �׸��� value�� �����Ѵ�.
            	if($(this).attr("type")=="radio")
            	{
            		//�̹� ���� ������ �������̸� continue;
            		if(procRadioName==$(this).attr("name"))
            		{
            			return true;//==continue;
            		}
            		procRadioName=$(this).attr("name");
            		itmjson[$(this).attr("id")] = jex.web.null2void($(":radio[name="+$(this).attr("name")+"][checked=true]").val());
            	}
            	//checkbox
            	else if($(this).attr("type")=="checkbox")
            	{
            		if($(this).attr("checked"))
            			itmjson[$(this).attr("id")] = $(this).val();
            		else
            			itmjson[$(this).attr("id")] = "";
            	}
            	//select box
            	else if($(this).find("option:selected").val() != undefined){
            		itmjson[$(this).attr("id")] = $(this).find("option:selected").val();
            	}
            	//��Ÿ
            	else if($(this).val()==""){
            		itmjson[$(this).attr("id")] = $(this).text();
            	}
            	//text box
            	else{
            		itmjson[$(this).attr("id")] = $(this).val();
            	}
            });
            g_array.push(itmjson);
        });
        json[g_key] = g_array;
    });
//alert(JSON.stringify(json));
    // ����ó��
    var act_id_parse= _this.attr("action").split(".");
    var jct			= "";
    
    for (var i=0; i<act_id_parse.length-1;i++) {
    	jct = jct+act_id_parse[i];
    	if (i!=act_id_parse.length-2) jct=jct+".";
    }
    jex.web.Ajax(jct,json, function(dat) {
    	var fn	= callback +"(" + JSON.stringify(dat) + ");";
    	var ret = eval(fn);
    },"jct", true, _this.attr("errorProc")!='false'?true:false);
    
    return false;
}


/**
 * JSON ���� SUBMIT����
 * @param _this
 * @return
 */
function _trxSubmit(_this, opt) {
	var textareaList = _this.find("textarea");
    var inputList   = _this.find("input");
    var selectList  = _this.find("select");
    var json        = {};
    var checkboxRec = {};//üũ�ڽ��� ���ڵ�� �����ϱ����� ����(20100825�߰�)

    $.each(textareaList, function() {
    	var name    = $(this).attr("name");
        var value   = $(this).val();
        if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
    });
    
    $.each(inputList, function() {
        var name    = $(this).attr("name");
        var value   = $(this).val();
        
//        if($(this).attr("type")=="checkbox")       alert(name+"::"+value+"::"+$(this).attr("type")+"::"+$(this).attr("checked"));
        
        if($(this).attr("jexdatatype")=="item")
        {
        	return true;//==continue;
        }
        else if( $(this).attr("type")=="button" )
        {
        	return true;//==continue;
        }
        else if( $(this).attr("type")=="checkbox")
        {
        	//üũ�Ǿ����� ������ �Ѿ.
        	if(	!$(this).attr("checked")	)	return true;//==continue;
        	
        	//üũ�ڽ��� recordId�Ӽ��� ������
        	//�ݺ��η� �����Ѵ�.
        	if( $(this).attr("recordId") )
        	{
        		if( !json[$(this).attr("recordId")] )	
        		{
        			json[$(this).attr("recordId")] = [];
        		}
        		checkboxRec = {};
        		checkboxRec[name]=value;
        		
        		json[$(this).attr("recordId")].push(checkboxRec);
        	}
        	else
        	{
        		if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        	}
        }
        else if( $(this).attr("type")=="radio")
        {
        	if(	!$(this).attr("checked")	)	return true;//==continue;
        	if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        }
        else
        {
        	if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        }
    });
    
    $.each(selectList, function() {
        var name    = $(this).attr("name");
        var value   = $(this).find("option:selected").val();
        
        //multiple �϶��� �ɼ��׸��� record�� �ö󰣴�.
        if($(this).attr("type")=="select-multiple")
        {
        	var recordId =$(this).attr("recordId"); 
    		if( !json[recordId] )	
    		{
    			json[recordId] = [];
    		}
    		
        	$.each($(this).children(), function(i,v){
        		var selectRec = {};
        		selectRec[name] = $(v).val();
        		
        		json[recordId].push(selectRec);
        	});
        }
        else
        {
        	if (name!=null&&name!=""&&name!=undefined) json[name] = (value==null||value==undefined)?"":value;
        }
    });

    //List ó��
    var list = _this.find("[jexdatatype='list']");
    $.each(list, function(i,v) {
        var g_key   = $(this).attr("id");
        var g_array = [];
        var row     = $(this).find("[jexdatatype='row']");
        $.each(row, function() {
            var itm     = $(this).find("[jexdatatype='item']");
            var itmjson = {};
            var procRadioName = "";//�̹� ������ �������� Ȯ���ϱ� ���� ����
            $.each(itm, function(i,v) {
            	//radio
            	//	radio�� name �� ���� �׸���߿� check �� �׸��� value�� �����Ѵ�.
            	if($(this).attr("type")=="radio")
            	{
            		//�̹� ���� ������ �������̸� continue;
            		if(procRadioName==$(this).attr("name"))
            		{
            			return true;//==continue;
            		}
            		procRadioName=$(this).attr("name");
            		itmjson[$(this).attr("id")] = jex.web.null2void($(":radio[name="+$(this).attr("name")+"][checked=true]").val());
            	}
            	//checkbox
            	else if($(this).attr("type")=="checkbox")
            	{
            		if($(this).attr("checked"))
            			itmjson[$(this).attr("id")] = $(this).val();
            		else
            			itmjson[$(this).attr("id")] = "";
            	}
            	//select box
            	else if($(this).find("option:selected").val() != undefined){
            		itmjson[$(this).attr("id")] = $(this).find("option:selected").val();
            	}
            	//��Ÿ
            	else if($(this).val()==""){
            		itmjson[$(this).attr("id")] = $(this).text();
            	}
            	//text box
            	else{
            		itmjson[$(this).attr("id")] = $(this).val();
            	}
            });
            g_array.push(itmjson);
        });
        json[g_key] = g_array;
    });
//    alert(JSON.stringify(json));
    // ����ó��
    newform = "<div id='_jexSender' style='display:none;overflow:hidden:height:0;line-height:0;border:0;margin:0;'><form id='_jexSenderForm' name='_jexSenderForm' method='"+_this.attr("method")+"' target='"+_this.attr("target")+"' type='"+_this.attr("type")+"' action='"+_this.attr("action")+"'><input type='text' name='_JSON_' value='"+JSON.stringify(json)+"'></form></div>";
    $(document.body).append(newform);//.hide();
   
	/*
	 * ��â ���� From�� ������ ���� Option�� ó���Ѵ�.
	 */
	if (opt!=undefined&&opt!=null&&opt!=""&&opt.target!=undefined&&opt.target!=null&&opt.target!="") {
		var	sizeW = Number(opt.sizeW) + 25;	
		var	sizeH = Number(opt.sizeH);
		var nLeft = screen.width/2 - sizeW/2 ;
		var nTop  = screen.height/2- sizeH/2 ;
		var option= ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
		var winObj= window.open('', opt.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
		winObj.blur();//ũ�ӿ��� focus()�� ȣ���Ұ�� �۵����� �ʾƼ� blur()�� ���� ȣ������ focus()ȣ���ϵ��� ������.
		winObj.focus();//�˾��� �̹� �����ִ°�� ������ �������� �Ѵ�.
		$("#_jexSenderForm").attr("method", "post");
		$("#_jexSenderForm").attr("target", opt.target);
		if (opt.action!=null && opt.action!=undefined && opt.action != "")  $("#_jexSenderForm").attr("action", opt.action);
		jex.web.form.submitYn=false;
	}
	
	//���ȸ���� ����Ұ��
	if(jex.web.isSecurityModule)
	{
		//xecureweb ���ȸ���� submit
		XecureSubmit(document._jexSenderForm);
	}
	else
	{
		//$("#"+formId).submit(); => �� ������� submit �ϸ�
		//$("#"+formId).submit(function(){}); => ���� �̺�Ʈ�� ������ ������
		//�Ʒ�ó�� submit�� �����Ѵ�.
	    document._jexSenderForm.submit();
	}
    
    jex.web.form.submitYn=false;
    
    $("#_jexSender").remove();
    return false;
//    return false;
}

/**
 * form validation�� üũ�ϴ� �Լ�
 * @formId : üũ�� form�� id
 */
jex.web.form._bfCheckboxName = "";
jex.web.form._bfRadioName = "";
jex.web.form._thisInput;
jex.web.checkForm = function(formId){
	
	var selector = "#"+formId;
	
	jex.web.form.errorYn=false;
	jex.web.form._bfCheckboxName = "";
	jex.web.form._bfRadioName = "";
	
	//�ؽ�Ʈ �ڽ� ����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("input:text"), function(i, v){
			if(jex.web.form.errorYn) return false;
			jex.web.form._thisInput = $(this);

			//validation üũ �Լ���ŭ loop ó���Ѵ�.
			$.each(jex.web.form.check, function(i,v){
				if(typeof v=='function'){
					if( !v( jex.web.form._thisInput ) ){
						$(jex.web.form._thisInput).focus();
						return false;
					}
				}
			});
		});
	}
	
	//hidden����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("input:hidden"), function(i, v){
			if(jex.web.form.errorYn) return false;
			jex.web.form._thisInput = $(this);

			//validation üũ �Լ���ŭ loop ó���Ѵ�.
			$.each(jex.web.form.check, function(i,v){
				if(typeof v=='function'){
					if( !v( jex.web.form._thisInput ) ){
						$(jex.web.form._thisInput).focus();
						return false;
					}
				}
			});
		});
	}
	
	//selectbox ����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("select"), function(i, v){
			if(jex.web.form.errorYn) return false;
			
			jex.web.form._thisInput = $(this);
			
			if( !jex.web.form.check.isNotnull( jex.web.form._thisInput ) ){
				$(jex.web.form._thisInput).focus();
				return false;
			}
		});
	}
	
	//password ����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("input:password"), function(i, v){
			if(jex.web.form.errorYn) return false;
			jex.web.form._thisInput = $(this);

			//validation üũ �Լ���ŭ loop ó���Ѵ�.
			$.each(jex.web.form.check, function(i,v){
				if(typeof v=='function'){
					if( !v( jex.web.form._thisInput ) ){
						$(jex.web.form._thisInput).focus();
						return false;
					}
				}
			});
		});
	}
	
	//checkbox ����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("input:checkbox"), function(i, v){
			if(jex.web.form.errorYn) return false;
			jex.web.form._thisInput = $(this);

			if( jex.web.form._bfCheckboxName != $(jex.web.form._thisInput).attr("name") ){
				jex.web.form._bfCheckboxName = $(jex.web.form._thisInput).attr("name");
				if( !jex.web.form.check.isNotnull( jex.web.form._thisInput ) ){
					$(jex.web.form._thisInput).focus();
					return false;
				}
			}
		});	
	}
	
	//radio ����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("input:radio"), function(i, v){
			if(jex.web.form.errorYn) return false;
			jex.web.form._thisInput = $(this);
			
			if( jex.web.form._bfRadioName != $(jex.web.form._thisInput).attr("name") ){
				jex.web.form._bfRadioName = $(jex.web.form._thisInput).attr("name");
				if( !jex.web.form.check.isNotnull( jex.web.form._thisInput ) ){
					$(jex.web.form._thisInput).focus();
					return false;
				}
			}
		});
	}
	
	//textarea ����
	if(!jex.web.form.errorYn)
	{
		$.each($(selector).find("textarea"), function(i, v){
			if(jex.web.form.errorYn) return false;
			jex.web.form._thisInput = $(this);
			
			//validation üũ �Լ���ŭ loop ó���Ѵ�.
			$.each(jex.web.form.check, function(i,v){
				if(typeof v=='function'){
					if( !v( jex.web.form._thisInput ) ){
						$(jex.web.form._thisInput).focus();
						return false;
					}
				}
			});
		});
	}
	
	//��ȸ���� �������� ����
	if(!jex.web.form.errorYn)
	{
		var jexCalendar = $(selector).find("[id=jex.selectCalendar]");
		if( jexCalendar.length == 2 )
		{
			var stDt = $($(jexCalendar[0]).find("select")[0]).val()
						+$($(jexCalendar[0]).find("select")[1]).val()
						+$($(jexCalendar[0]).find("select")[2]).val();

			var endDt = $($(jexCalendar[1]).find("select")[0]).val()
						+$($(jexCalendar[1]).find("select")[1]).val()
						+$($(jexCalendar[1]).find("select")[2]).val();
			
			if( stDt > endDt )
			{
				alert("��ȸ�������� ��ȸ�����Ϻ��� Ů�ϴ�.");
				$($(jexCalendar[0]).find("select")[0]).focus();
				jex.web.form.errorYn=true;
				return false;
			}
			
			var currentDate = new Date();
			var currentDate = currentDate.getFullYear()+ "" 
							+ ( currentDate.getMonth()+1 < 10?"0"+(currentDate.getMonth()+1):(currentDate.getMonth()+1))+ ""
							+ ( currentDate.getDate() < 10?"0"+currentDate.getDate():currentDate.getDate());
			
			if( endDt > currentDate )
			{
				alert("������ ���ķδ� ��ȸ�� �Ұ����մϴ�.");
				$($(jexCalendar[1]).find("select")[0]).focus();
				jex.web.form.errorYn=true;
				return false;
			}
		}
	}
	
	if(jex.web.form.errorYn) return false;
	else return true;
};//end of "jex.web.checkForm" 
