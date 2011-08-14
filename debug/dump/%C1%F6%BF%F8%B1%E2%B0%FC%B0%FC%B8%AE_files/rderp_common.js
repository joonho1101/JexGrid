var rderp;
if(!rderp) rderp={};
if(!rderp.common) rderp.common={};

var gw;
if(!gw) gw={};

if(typeof(gw.ui) == "undefined") {
	document.write('<script type="text/javascript" src="js/gw.ui.js"></script>');
}

if(typeof(gw.common) == "undefined") {
	document.write('<script type="text/javascript" src="js/gw.common.js"></script>');
}

if(typeof(gw.number) == "undefined") {
	document.write('<script type="text/javascript" src="js/gw.number.js"></script>');
}

if(typeof(gw.date) == "undefined") {
	document.write('<script type="text/javascript" src="js/gw.date.js"></script>');
}

if(typeof(config) == "undefined") {
	document.write('<script type="text/javascript" src="config/config.js"></script>');
}

//==================================================================
//�����˾�
//==================================================================
document.write('<script type="text/javascript" src="js/rderp/rderp_common_pop.js"></script>');




var rderp_menu_seq = "0";

$(function(){
	if(top.$("#multitab").find(".mul_tab_on").attr("id") != undefined) {
		rderp_menu_seq = top.$("#multitab").find(".mul_tab_on").attr("id");
		if (rderp_menu_seq.length > 8 && rderp_menu_seq.substring(0,8) == "menu_id_")  {
			rderp_menu_seq = rderp_menu_seq.replace(/menu_id_/g, "");
		}
		else {
			rderp_menu_seq = "0";
		}	
	}
	else if(typeof(opener) != "undefined" && typeof(opener.top) != "undefined" && 
			typeof(opener.top.$("#multitab").find(".mul_tab_on").attr("id")) != "undefined") {
		rderp_menu_seq = opener.top.$("#multitab").find(".mul_tab_on").attr("id");
		if (rderp_menu_seq.length > 8 && rderp_menu_seq.substring(0,8) == "menu_id_")  {
			rderp_menu_seq = rderp_menu_seq.replace(/menu_id_/g, "");
		}
		else {
			rderp_menu_seq = "0";
		}	
	}
	else if(typeof(opener) != "undefined" && typeof(opener.opener) != "undefined" && typeof(opener.opener.top) != "undefined" && 
			typeof(opener.opener.top.$("#multitab").find(".mul_tab_on").attr("id")) != "undefined") {
		rderp_menu_seq = opener.opener.top.$("#multitab").find(".mul_tab_on").attr("id");
		if (rderp_menu_seq.length > 8 && rderp_menu_seq.substring(0,8) == "menu_id_")  {
			rderp_menu_seq = rderp_menu_seq.replace(/menu_id_/g, "");
		}
		else {
			rderp_menu_seq = "0";
		}	
	}
		
	//��� �˾� ���� ��� ViewPage�� rderp_menu_seq �����̵Ǿ�� �о�ü�����
	//���� rexpe_0011_02.js
	
	/***************************************
	* input box ȭ����� ǥ�� �̺�Ʈ ó��
	***************************************/
	$("input[format=number2]").each(function(){
		$(this).keyup(function(){
			$(this).val(Format_comma($(this).val()));
		});

//		$(this).change(function(){
//			$(this).val(Format_comma($(this).val()));
//		});

//		$(this).focus(function(){
//			$(this).unbind("change");
//			$(this).val(Format_NoComma($(this).val()));
//			$(this).bind("change");
//		});
	});
	
	/***************************************
	* input box �ֹ�(�ܱ���)��Ϲ�ȣ üũ
	***************************************/
	$("input[format=ssn]").each(function(){
		fn_keyDownNumberType($(this));
		
		$(this).change(function(){
		    if (!(fnrrnCheck($(this).val()) || fnfgnCheck($(this).val()))) {
				alert("�ֹ�(�ܱ���)��Ϲ�ȣ�� Ȯ���ϼ���.");
				$(this).val("");
		    }
		});
		
	});

	/***************************************
	* input box ����ڵ�Ϲ�ȣ üũ
	***************************************/
	$("input[format=bizno]").each(function(){
		fn_keyDownNumberType($(this));
		
		$(this).change(function(){
		    if (!fnBizCheck($(this).val())) {
				alert("����ڵ�Ϲ�ȣ�� Ȯ���ϼ���.");
				$(this).val("");
		    }
		});
		
	});

	/***************************************
	* input box �ֹ�(�����)��Ϲ�ȣ üũ
	***************************************/
	$("input[format=bizssn]").each(function(){
		fn_keyDownNumberType($(this));
		
		$(this).change(function(){
			if(!fnRRNCheck($(this).val())){
				alert("�ֹ�(�����)��Ϲ�ȣ�� Ȯ���ϼ���.");
				$(this).val("");
			}
		});
		
	});

	/***************************************
	* input box �ѱ��ڵ��Է� üũ
	***************************************/
	$("input[format=kor]").each(function(){
		$(this).attr("style","ime-mode:active;"+$(this).attr("style"));
	});
	
	/***************************************
	* input box �����Է� üũ
	***************************************/
	$("input[format=eng]").each(function(){
		$(this).attr("style","ime-mode:disabled;"+$(this).attr("style"));
	});

	/***************************************
	* input box ��¥Ÿ�� �Է� üũ
	***************************************/
	$("input[format=date]").each(function(){
		fn_keyDownNumberType($(this));
		
		$(this).change(function(){
			if ( jex.web.form.check.isFormat($(this)) == false) {
				$(this).val("");
				$(this).focus();
			}
			else {
				var strDate = $(this).val().replace(/\-/g,"");
				if($(this).val() != "" ){
					strDate = strDate.substring(0,4) + "-" + strDate.substring(4,6) + "-" + strDate.substring(6,8);
					$(this).val(strDate);
				}	
			}	
		});
	});

	/***************************************
	* input box �Ҽ��� �Է� üũ
	***************************************/
	$("input[format=rate]").each(function(){
		fn_keyDownNumberType($(this),".");
		
		$(this).change(function(){
			if (isNaN(new Number($(this).val()))) {
				alert("�׸��� �Է������� �߸��Ǿ����ϴ�.");
				$(this).val("0");
				$(this).focus();
			}
			
			if($(this).val()==""){
				$(this).val("0");
			}
			
			if($(this).val().substring($(this).val().length-1)=="."){
				$(this).val($(this).val().substring(0,$(this).val().length-1));
			}
			
		});
	});

	/***************************************
	* �����ٿ�ε� �˾� ȣ��
	***************************************/
	$.each($("[jexgridButton=rcomm_download]"), function(i,v){
		$(this).click(function(e){
			var download_grid = ""; 
			if ( typeof grid != "undefined" ) {
				download_grid = "grid";
			}	
			else if ( typeof grid1 != "undefined" ) {
				download_grid = "grid1";
			}	
			else if ( typeof grid2 != "undefined" ) {
				download_grid = "grid2";
			}	
			else if ( typeof grid3 != "undefined" ) {
				download_grid = "grid3";
			}	
			
			if ( download_grid != "" ) {
				window._saveTargetJgrid = eval(download_grid);
		
				if(!window._saveTargetJgrid)
				{
					alert("�ش� �׸��尡 �������� �ʽ��ϴ�. ��ư�� jexgridId �Ӽ��� Ȯ�����ּ���.\njexgridId='�׸��带��ü�� �����ϰ��ִ� ������'");
					return false;
				}
				
				var winObj = window.open("js/file/download.jsp", "jgridFileDownload", "width=" + 907 + ",height=" + 590);
				winObj.blur();
				winObj.focus();
			}	
		});
	});

	/***************************************
	* �������ڰ� �������ں��� ���� ��� üũ
	***************************************/
	/*
	$("input.term").change(function() {
		
		var s_date = $(this).parent().find("input.term:first").val().replace(/\-/g,"");
		var e_date = $(this).parent().find("input.term:last").val().replace(/\-/g,"");

		if(s_date != "" && e_date != ""){
			var startDate = Date.parseExact($(this).parent().find("input.term:first").val(), 'yyyy-MM-dd');
			var endDate   = Date.parseExact($(this).parent().find("input.term:last").val(), 'yyyy-MM-dd');
			
			if(s_date > e_date) {
				alert("�������ڴ� �������ں��� ���ų� �۾ƾ� �մϴ�.");
				$(this).val("");
				$(this).focus();
			}
		}
	});
	*/
});


/*********************************************************
* ����Ÿ�� ������ ���尪 ����(ȭ����� ������ ����)
*********************************************************/
setNoComma = function(divId){
	$("#"+divId).find(".num").each(function(){
		$(this).val(Format_NoComma(jex.web.null2void($(this).val(), "0")));
	});	
};

rderp.common.setNoComma = function(divId){
	$("#"+divId).find(".num").each(function(){
		$(this).val(Format_NoComma(jex.web.null2void($(this).val(), "0")));
	});	
};

/*********************************************************
* ��¥Ÿ�� ������ ���尪 ����(dash('-') ������ ����)
*********************************************************/
rderp.common.setNoDash = function(divId){
	$("#"+divId).find(".date").each(function(){
		$(this).val(jex.web.null2void($(this).val()).replace(/\-/g,""));
	});	
};

/***************************************
* ���� �����
***************************************/
function rtnDate(value){

	var rtnDate = "";
	var date = new Date();
	var Today = new Array();

	Today['Year']= date.getFullYear();
	Today['Month']=date.getMonth()+1;
	Today['Day']= date.getDate();
	if(Today['Month']<10){
		var month= "0"+Today['Month'];
	}else{
		var month = Today['Month'];
	}
	if(Today['Day']<10){
		var day = "0"+Today['Day'];
	}else{
		var day = Today['Day'];
	}

	if(typeof(value) == "undefined" || value.length != 8 ){
		//���� �����
		rtnDate =  Today['Year']+"-"+month+"-"+day;
	}else{
		if (isNaN(new Number(value))) {
			rtnDate = Today['Year']+"-"+month+"-"+day;
		}else{
			rtnDate = value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8);
		}
	}

	return rtnDate;
}

/***************************************
* return Unique Time
***************************************/
rtnUniqueTime = function(){
	var rtnVal = "";
	
	var now   = new Date(); 		// ����ð� ��������
	var year  = now.getYear(); 		// �⵵ ��������
	var month = now.getMonth()+1;	// �� �������� (+1)
	var date  = now.getDate(); 		// ��¥ ��������
	var hour  = now.getHours(); 	// �ð� ��������
	var min   = now.getMinutes(); 	// �� ��������
	var sec   = now.getSeconds(); 	// �� ��������
	
	rtnVal = hour +""+ min +""+ sec;
	
	return rtnVal;

};

/***************************************
* Ư������ replace
* value : ��(����Ÿ��) dash : ,/-
* EX : rtnReplace('2010-04-01','-') - >20100401
***************************************/
function rtnReplace(value,dash){
	var val = "";
	if(voidChk(value,'') != ''){
		if("," == dash){
			val = value.replace(/\,/g,"");
		}else if("-" == dash){
			val = value.replace(/\-/g,"");
		}else{
			val = value;
		}
	}
	return val;
}

/***************************************
* //undefined �� "" �� �ٲٱ�
* value : ��(����Ÿ��)
***************************************/
function voidChk(value,rtnValue){
	if(	typeof(value) != "undefined" && value != "" ){
		rtnValue = value;
	}
	return rtnValue;
}

/***************************************
* //input�� üũ�ڽ� üũ�� ��������
* mode : R(radio) C(checkbox)
  colName : view �ȿ� �ִ� attr Name
***************************************/
function rtnCheckBox(mode,colName){
	var val = "";

	if(mode.toUpperCase()  == "R"){
		val = $(":input[name="+colName+"]:checked").val();
	}else{
		val = $("input[name="+colName+"]").is(':checked');
		if(val){
			val = "Y";
		}else{
			val = "N";
		}
	}
	return val;
}

/***************************************
* // select attr üũ�ڽ� üũ�� ��������
* mode : R(radio) C(checkbox)
  value: ��
  obj  : selector (ex:":input[name=ISD_PSNL_EXPN_NO_PRJ_YN]")
* EX  : rtask_0011_01.js ����
***************************************/
function attrSetYn(mode,value,obj){
	if(mode.toUpperCase()  == "R"){
		$(obj+"[value="+value+"]").attr("checked","true");
	}else{
		if(value == "Y"){
			$(obj).attr("checked","checked");
		}else{
			$(obj).attr("checked","");
		}
	}
}


/***************************************
* // ��������ȸ
* EX  : rexpe_0005_01.js ����
***************************************/
function ownrInq(bnkCd,acctNo,trnsAmt,RsltCd,rtnName,rtnCd){
	jex.web.Ajax("rcomm_imo_0600_600_01",{ BNK_CD:bnkCd
								        ,  ACCT_NO:acctNo
								        ,  TRNS_AMT:trnsAmt
								        ,  OWNR_INQ_RSLT_CD:RsltCd}
								        , function(data) {
								        	$(document).find(rtnCd).val(data.OWNR_INQ_RSLT_CD);//��������ȸ����ڵ�
											$(document).find(rtnName).val(data.OWNR_INQ_RSLT);      //��������ȸ���
										}
	,"jct");
}


/***************************************
* // �����ְ���ʱ�ȭ
* EX  : rexpe_0005_01.js ����
***************************************/
function inqRsltClear(name,value){
	//�����ڵ� �Ǵ� ���¹�ȣ ����� �ʱ�ȭ
	$(document).find(name).val("");   //��������ȸ����ڵ�
	$(document).find(value).val("");      //��������ȸ���
}

/***************************************
* // ���Ǽ� ���� �Ҷ� ���� ����
* EX  : rderp_common.js apprList() ����
***************************************/
function upBar(rtnData){
	var html = "";

	html += "<div class='btnleft' >";
	html += "<input class='btn_4off' type='button' onclick='javascript:fnApprList(\""+rtnData.APPR_SEQ_NO+"\");' value='��������' /> ";
//	if("P20" != rtnData.PROC_TYP_CD){
//		html += "<input class='btn_2off' type='button' onclick='' value='�μ�' /> " ;
//	}
    if("P" == rtnData.PROC_TYP_CD){
    }
    else if("P10" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='û����' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P11" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='û����' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P12" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='û����' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P13" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='û����' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P14" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='û����' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P15" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='û����' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P20" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_7off' type='button' onclick='' id='oz_report' value='����䱸���Ǽ�' />";
		html += "<input class='btn_7off' type='button' onclick='' id='oz_report1' value='�ΰǺ�Ȯ������' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P21" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='�ݳ��䱸��' />";
	}
    else if("P22" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='¡�����Ǽ�' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P23" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_7off' type='button' onclick='' id='oz_report' value='�ڱݴ�ü���Ǽ�' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P24" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_7off' type='button' onclick='' id='oz_report' value='�Ϲݴ�ü���Ǽ�' />";
	}
    else if("P25" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_7off' type='button' onclick='' id='oz_report' value='���԰��Ǽ�' />";
		
		// ����Ϸ�� �ϰ�� ������� ����
		if(rtnData.APPRBOX_TYPE == "3")
			html += " <input class='btn_4off' type='button' onclick='fnCancellAppr(\""+rtnData.APPR_SEQ_NO+"\")' value='�������' />";
	}
    else if("P26" == rtnData.PROC_TYP_CD){
    	html += "<input class='btn_7off' type='button' onclick='' id='oz_report' value='�����η����' />";
    }
    else if("P27" == rtnData.PROC_TYP_CD){
		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='��������' />";
	}
//    else if("E01" == rtnData.PROC_TYP_CD){
//		html += "<input class='btn_4off' type='button' onclick='' id='oz_report' value='������û' />";
//	}

    html += "</div>";

    // �������� �ϰ�� ����ó���� ���� ��ư View 
    if(rtnData.APPRBOX_TYPE == "2"){
        html += "<div class='btnright'>";
        html += "<input class='btn_7off' type='button' onclick='fnPopApprLine(\""+rtnData.APPR_SEQ_NO+"\")' value='���缱����' /> ";
        html += "<input class='btn_4off' type='button' onclick='fnApprProc()'    value='����ó��'   /> ";
        html += "</div>";
    }

	$(".btn_bar").html(html);
}

/***************************************
* // �������� ��������
* EX  : rexpe_0005_01.js ����
***************************************/
function fnApprList(apprSeqNo){

	var param = uf_newWin('/rappr_0001_03.act?APPR_SEQ_NO='+apprSeqNo,'newWin_rappr_0001_03',680,310);

}

/******************************************************************
 * �������� ��� ó��
 *****************************************************************/
function fnCancellAppr(apprSeqNo){
	if(!confirm("���������ڷ��Դϴ�. ������ ����Ͻðڽ��ϱ�?")) return;
	
    jex.web.Ajax("rappr_0000_01_c002", {"APPR_SEQ_NO":apprSeqNo}, function(data) {
        if(!jex.web.isError(data)) {
            alert("ó���Ǿ����ϴ�.");

            if(typeof(opener.fnSelect) != "undefined") {
                opener.fnSelect();
            }

            self.close();
        }
    }, "jct");

}

/*******************************************************************
 * ���缱���� �˾� ȣ��
 ******************************************************************/
function fnPopApprLine(apprSeqNo){
	var params = {};
	params["MOD_ABLE_YN"] = "Y";
	params["APPR_SEQ_NO"] = apprSeqNo;
	params["CALLBACK_FN"] = "fnCallBackApprLineFn";
//	params["FORM_KIND"] = "1";
//	params["FORM_PAPER_SEQ_NO"] = "1";
	
	gw.common.jexNewWin("/appr0043_14.act", rtnUniqueTime(), 900, 600, params);
}

/*******************************************************************
 * ���缱���� �˾� call back function
 ******************************************************************/
function fnCallBackApprLineFn(){
	if(fn_selApprResult != null && fn_selApprResult != undefined) fn_selApprResult();
}

/*******************************************************************
 * ����ó�� �˾� ȣ��
 ******************************************************************/
function fnApprProc(){
	// �ʼ��� üũ
	if(fnApprProcValid()){
		$("#apprProc").css("display", "inline-block");
		$("#apprOpinion").focus();
	}
}

/*******************************************************************
 * ����ó�� �ʼ��� ����üũ
 ******************************************************************/
function fnApprProcValid(){
	
	//�� ���繮���� ���� �۾��� ������ ���� üũ�ϰ� ���� �۾��� �����Ѵ�.
	//��) ������������ rappr_0001_P27_01.js�� fnPreApprDocProcTypCheck ������ ���� ó���� ���� �۾� ����
	if(typeof fnPreApprDocProcTypCheck != "undefined"){
		if ( fnPreApprDocProcTypCheck() == false) return false;
	}

	if ($(document).find("#PROC_TYP_CD").val() == "P26" || $(document).find("#PROC_TYP_CD").val() == "P28") {
		if (!($("#CHECK_CLICK_YN").val() == 'Y')) {
			alert("���� ������ �� �����ѵ� �ʰ������� �ִ��� Ȯ���Ͽ� �ֽñ� �ٶ��ϴ�.");
			return false;
		}

		if (!($("#CHECK_CONFIRM_YN").val() == 'Y')) {
			alert("������ Ȥ�� �����ѵ��� �ʰ��� ������ �ֽ��ϴ�. ���� �� �����Ͽ� �ֽñ� �ٶ��ϴ�.");
			return false;
		}
	}
	
	// �а����� �׸��� �����Ұ�� �ʼ��� üũ
	if(typeof _jrnlGrid != "undefined"){
	    var obj = _jrnlGrid.dataMgr.all;

	    if(obj.length == 0) {
	        alert("�а������� �������� �ʽ��ϴ�.");
	        return false;
	    }

	    var sumChaAmt = 0;	// �����հ�ݾ�
	    var sumDaeAmt = 0;	// �뺯�հ�ݾ�
	    var nErrCnt   = 0;	// �����Ǽ�
	    
	    $.each(obj, function(i,v) {
	        if(jex.web.null2void(obj[i].ATIT_CD) == "" || jex.web.null2void(obj[i].ATIT_NM) == "") {
	            alert("���������� �����Ͻñ� �ٶ��ϴ�.");
	            nErrCnt++;
	            return false;
	        }
	        if(jex.web.null2void(obj[i].D_AMT) == "0" && jex.web.null2void(obj[i].C_AMT) == "0") {
	            alert("�����ݾװ� �뺯�ݾ� �� �ϳ��� �ݵ�� �Է��Ͻñ� �ٶ��ϴ�.");
	            nErrCnt++;
	            return false;
	        }
	        if(jex.web.null2void(obj[i].D_AMT) != "0" && jex.web.null2void(obj[i].C_AMT) != "0") {
	            alert("�����ݾװ� �뺯�ݾ� �� �� �ϳ��� �Է��Ͻñ� �ٶ��ϴ�.");
	            nErrCnt++;
	            return false;
	        }

	        sumChaAmt += Number(Format_NoComma(obj[i].D_AMT));
	        sumDaeAmt += Number(Format_NoComma(obj[i].C_AMT));

	    });

	    if(nErrCnt > 0) return false;

	    if(sumChaAmt != sumDaeAmt) {
	        alert("�����հ�ݾ�(" + Format_comma(sumChaAmt) + ")�� �뺯�հ�ݾ�(" + Format_comma(sumDaeAmt) + ")�� �ٸ��� ó���� �Ұ����մϴ�.");
	        return false;
	    }
	}

	return true;
}

/***************************************
* // ����� ����
* EX  : /js/rderp/rappr/rappr_0001_P22_01.js ����
***************************************/
function apprList(rtnData){

	upBar(rtnData); //�����Կ��� ���Ǽ� ���� �Ҷ� ���� ����

	var html    = "";

	jex.web.Ajax("rappr_0001_01_r003", {APPR_SEQ_NO:rtnData.APPR_SEQ_NO}, function(data) {

        var trTop   = "";
        var trDown  = "";
        var th      = "";
        var td      = "";

       	for(var idx = 0;idx < data.REC.length;idx++){

       		//GW_APPR_STS.APPRLINE_KIND  -- ���缱���� (�����ڵ�:HH08000) 1:��� 2:���� 3:���� 4:���� 5:���� 6:����)
       		if("1" == data.REC[idx].APPRLINE_KIND ){
       			th  = th + "<th class='t_center'>�����</th>";
       			td  = td + "<td class='t_center'  style='height:50px;'>"+ rtnDate(data.REC[idx].APPR_DATE)+"<br/>"
						 +		"<a href='javascript:fnFindUser(\""+data.REC[idx].APPR_USER_ID+"\");' >"+ data.REC[idx].APPR_USER_NM +"</a><br/>"
						 +	"<input type='hidden' id='APPR_USER_ID' name='APPR_USER_ID' value='"+data.REC[idx].APPR_USER_ID+"'/></td>";
       		}else{

       			//GW_APPR_STS.APPRLINE_STS   -- ���缱 ���� (�����ڵ�:HH11000) (1-���, 2-�Ϸ�, 3-����, 4-�ݼ�, 6-����)
       			var sts = data.REC[idx].APPRLINE_STS;

       			if("2" == data.REC[idx].APPR_USER_GB ){
       				th  = th  + "<th class='t_center'>"+ jex.web.null2void(data.REC[idx].APPR_USER_POS_NM,"������") +"</th>";

  	       			if("1" == sts){
	       				td = td + "<td class='t_center'><a href='javascript:fnFindUser(\""+data.REC[idx].APPR_USER_ID+"\");'><span class='txt_b'>"+ data.REC[idx].APPR_USER_NM +"</span></a><br/></td>";

	       			}else if("2" == sts){
	       				td  = td + "<td class='t_center'  style='height:50px;'>"+rtnDate(data.REC[idx].APPR_DATE)+"<br/>"
							     +		"<a href='javascript:fnFindUser(\""+data.REC[idx].APPR_USER_ID+"\");'>"+ data.REC[idx].APPR_USER_NM +"</a><br/>"
							     +	"</td>";
	       			}else if("3" == sts){
	       				td = td + "<td class='t_center'><a href='#'><span class='txt_r'>"+ rtnDate(data.REC[idx].APPR_DATE) + "-����</span></a><br/>"
								+	"<a href='javascript:fnFindUser(\""+data.REC[idx].APPR_USER_ID+"\");'>"+ data.REC[idx].APPR_USER_NM +"</a><br/></td>";

	       			}else if("4" == sts){
	       				td = td + "<td class='t_center'><a href='#'><span class='txt_r'>"+ rtnDate(data.REC[idx].APPR_DATE) + "-�ݼ�</span></a><br/>"
								+	"<a href='javascript:fnFindUser(\""+data.REC[idx].APPR_USER_ID+"\");'>"+ data.REC[idx].APPR_USER_NM +"</a><br/></td>";
	       			}else{
	       				td  = td + "<td class='t_center'  style='height:50px;'>"+rtnDate(data.REC[idx].APPR_DATE)+"<br/>"
							     +		"<a href='javascript:fnFindUser(\""+data.REC[idx].APPR_USER_ID+"\");'>"+ data.REC[idx].APPR_USER_NM +"</a><br/>"
							     +	"</td>";
	       			}


       			}else{
       				th  = th  + "<th class='t_center'>"+ jex.web.null2void(data.REC[idx].APPR_DEPT_NM,"����μ�") +"</th>";

       				if("" != voidChk(data.REC[idx].REAL_APPR_USER_ID,"")){
		       			if("1" == sts){
		       				td = td + "<td class='t_center'><span class='txt_b'>"+ data.REC[idx].REAL_APPR_USER_NM +"</span><br/></td>";

		       			}else if("2" == sts){
		       				td  = td + "<td class='t_center'  style='height:50px;'>"+rtnDate(data.REC[idx].APPR_DATE)+"<br/>"
								     +		"<a href='javascript:fnFindUser(\""+data.REC[idx].REAL_APPR_USER_ID+"\");'>"+ data.REC[idx].REAL_APPR_USER_NM +"</a><br/>"
								     +	"</td>";
		       			}else if("3" == sts){
		       				td = td + "<td class='t_center'><a href='#'><span class='txt_r'>"+ rtnDate(data.REC[idx].APPR_DATE) + "-����</span></a><br/>"
									+	"<a href='javascript:fnFindUser(\""+data.REC[idx].REAL_APPR_USER_ID+"\");'>"+ data.REC[idx].REAL_APPR_USER_NM +"</a><br/></td>";

		       			}else if("4" == sts){
		       				td = td + "<td class='t_center'><a href='#'><span class='txt_r'>"+ rtnDate(data.REC[idx].APPR_DATE) + "-�ݼ�</span></a><br/>"
									+	"<a href='javascript:fnFindUser(\""+data.REC[idx].REAL_APPR_USER_ID+"\");'>"+ data.REC[idx].REAL_APPR_USER_NM +"</a><br/></td>";
		       			}else{
		       				td  = td + "<td class='t_center'  style='height:50px;'>"+rtnDate(data.REC[idx].APPR_DATE)+"<br/>"
								     +		"<a href='javascript:fnFindUser(\""+data.REC[idx].REAL_APPR_USER_ID+"\");'>"+ data.REC[idx].REAL_APPR_USER_NM +"</a><br/>"
								     +	"</td>";
		       			}
		       		}else{
		       			td = td + "<td class='t_center'></td>";
		       		}
       			}
       		}
       	}
            trTop  = "<tr>"+ th + "</tr>";
            trDown = "<tr>"+ td + "</tr>";
            html   = "<tbody>" + trTop + trDown + "</tbody>";

	},"jct");

	return html;
}

/***************************************
* // ������ ���� ��������
* EX  : rexpe_0005_01.js ����
***************************************/
function fnFindUser(userId){
		var param = uf_newWin('/rappr_0001_02.act?USER_ID='+userId,'newWin_rappr_0001_02',640,363);

}
/***************************************
* // �ڱ���Ȳ ��������
* EX  : rexpe_0005_01.js ����
***************************************/
function setBgtList(prjNo,usefacSeqNo,resCd){
	var input = {};
	input["USEFAC_SEQ_NO" ] = jex.web.null2void(usefacSeqNo);
	input["PRJ_NO"		  ] = jex.web.null2void(prjNo);
	input["RES_CD"		  ] = jex.web.null2void(resCd);
	
	jex.web.Ajax("rcomm_0041_01_r001", input, function(data) {

        $('td#INQ_AGRMT_AMT').html(Format_comma(data.INQ_AGRMT_AMT));             //�����
        $('td#INQ_RCV_AMT2').html(Format_comma(data.INQ_RCV_AMT));                //�Աݾ�
        $('td#INQ_RCV_BAL_AMT').html(Format_comma(data.INQ_RCV_BAL_AMT));         //�Ա��ܾ�

        $('td#INQ_RCV_AMT').html(Format_comma(data.INQ_RCV_AMT));                 //�Աݾ�(+)
		$('td#INQ_BF_TRNS_AMT').html(Format_comma(data.INQ_BF_TRNS_AMT));         //�����̿�(+)
		$('td#INQ_AF_TRNS_AMT').html(Format_comma(data.INQ_AF_TRNS_AMT));         //�����̿�(-)
		$('td#INQ_INT_AMT').html(Format_comma(data.INQ_INT_AMT));                 //���ھ�(+)
		$('td#INQ_TRNS_IN_AMT').html(Format_comma(data.INQ_TRNS_IN_AMT));         //��ü��(+)
		$('td#INQ_TRNS_OUT_AMT').html(Format_comma(data.INQ_TRNS_OUT_AMT));       //��ü��(-)
		$('td#INQ_RETN_AMT').html(Format_comma(data.INQ_RETN_AMT));               //�ݳ���(-) -> �������ܾ׹ݾ�
		$('td#INQ_REQ_AMT').html(Format_comma(data.INQ_REQ_AMT));                 //û����(-)
		$('td#INQ_REFUND_AMT').html(Format_comma(data.INQ_REFUND_AMT));           //ȯ����(+) -> ������ݳ�
		$('td#INQ_REQ_BAL_AMT').html(Format_comma(data.INQ_REQ_BAL_AMT));         //û���ܾ�
		$('td#INQ_CARD_NO_REQ_AMT').html(Format_comma(data.INQ_CARD_NO_REQ_AMT)); //ī���û���ݾ�
		
		$("td").each(function(i){
			if("INQ_REQ_POSS_AMT" == this.id){
				$("td").eq(i).html(Format_comma(data.INQ_REQ_POSS_AMT));
			}
		});
	},"jct");
}

/***************************************
* // ¡�� ���������
* EX  : rexpe_0005_01.js ����
***************************************/
function setCollectList(input){
	var rtnData = "";
	jex.web.Ajax("rexpe_0005_01_r003", input, function(data) {
		rtnData = data;

	},"jct");
}

/***************************************
* // �����Թ� ���Ǽ� ��û����
* EX  : rappr_0001_01.js ����
USEFAC_SEQ_NO : �̿� ��� ����
APPR_SEQ_NO : ���� ����
PROC_TYP_CD : ó�������ڵ�
PRJ_NO     : ������ȣ
REQ_CNT    : ��û����
APPR_STS   : ���� ����(1-�ӽ�����, 2-��������, 3-����Ϸ�, 4-����ݼ�)
DOC_NO     : ������ȣ
***************************************/
function procTypCdPop(arr_data){

	var procTypCd = arr_data.PROC_TYP_CD;

	var params = {};
	params["PRJ_NO"			 ] = jex.web.null2void(arr_data.PRJ_NO, "");
	params["APPR_SEQ_NO"	 ] = jex.web.null2void(arr_data.APPR_SEQ_NO, "");
	params["APPR_STS_SEQ_NO" ] = jex.web.null2void(arr_data.APPR_STS_SEQ_NO, "");
	params["PROC_TYP_CD"	 ] = jex.web.null2void(arr_data.PROC_TYP_CD, "");
	params["REQ_CNT"		 ] = jex.web.null2void(arr_data.REQ_CNT, "");
	params["APPR_STS"		 ] = jex.web.null2void(arr_data.APPR_STS, "");
	params["USEFAC_SEQ_NO"	 ] = jex.web.null2void(arr_data.USEFAC_SEQ_NO, "");
	params["DOC_NO"			 ] = jex.web.null2void(arr_data.DOC_NO, "");
	params["APPRBOX_TYPE"    ] = jex.web.null2void($("#APPRBOX_TYPE").val(), "");
	params["PRJ_NTFY_NO"     ] = jex.web.null2void(arr_data.PRJ_NTFY_NO, "");
	params["PRJ_APPL_NO"     ] = jex.web.null2void(arr_data.PRJ_APPL_NO, "");

	if(procTypCd == ""){

	}
	//û�����ۼ�
	else if(procTypCd == "P10"){
		return gw.common.jexNewWin( '/rappr_0001_P10_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//û�����ۼ� ī��
	else if(procTypCd == "P11"){
		return gw.common.jexNewWin( '/rappr_0001_P10_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//û�����ۼ� �뷮(�Ϲ�)
	else if(procTypCd == "P12" ){
		return gw.common.jexNewWin( '/rappr_0001_P10_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//û�����ۼ� �뷮(���б�)
	else if(procTypCd == "P13" ){
		return gw.common.jexNewWin( '/rappr_0001_P10_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//û�����ۼ� �뷮(��Ÿ�ҵ�)
	else if(procTypCd == "P14" ){
		return gw.common.jexNewWin( '/rappr_0001_P10_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//û�����ۼ� �뷮(�޿�)
	else if(procTypCd == "P15" ){
		return gw.common.jexNewWin( '/rappr_0001_P10_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//�ݳ����Ǽ�
	else if(procTypCd == "P21"){
		return gw.common.jexNewWin( '/rappr_0001_P21_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//¡�����Ǽ�
	else if(procTypCd == "P22"){
		return gw.common.jexNewWin( '/rappr_0001_P22_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//�ڱݴ�ü¡�����Ǽ�
	else if(procTypCd == "P23"){
		return gw.common.jexNewWin( '/rappr_0001_P23_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//�Ϲݴ�ü���Ǽ�
	else if(procTypCd == "P24"){
		return gw.common.jexNewWin( '/rappr_0001_P24_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//���԰��Ǽ�
	else if(procTypCd == "P25"){
		return gw.common.jexNewWin( '/rappr_0001_P25_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//�����η����ް�ȹ
	else if(procTypCd == "P26"){
		return gw.common.jexNewWin( '/rappr_0001_P26_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//��������
	else if(procTypCd == "P27"){
		return gw.common.jexNewWin( '/rappr_0001_P27_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//�����η��ΰǺ��ϰ�����
	else if(procTypCd == "P20"){
		return gw.common.jexNewWin( '/rappr_0001_P20_01.act', rtnUniqueTime(), 940, 850, params);
	}
	//�ΰǺ�Ǯ
	else if(procTypCd == "P28"){
		return gw.common.jexNewWin( '/rappr_0001_P28_01.act', rtnUniqueTime(), 940, 850, params);
	}
	// ������û
	else if(procTypCd == "E01"){
		return gw.common.jexNewWin( '/rappr_0001_E01_01.act', rtnUniqueTime(), 940, 850, params);
	}
	// �м�����
	else if(procTypCd == "202"){
		return gw.common.jexNewWin( '/rappr_0001_202_11_01.act', rtnUniqueTime(), 940, 850, params);
		/**
		var gUsefacSeqNo 	= jex.web.null2void(arr_data.USEFAC_SEQ_NO, "");
		var gApprSeqNo 		= jex.web.null2void(arr_data.APPR_SEQ_NO, "");
		var gApprStsSeqNo 	= jex.web.null2void(arr_data.APPR_STS_SEQ_NO, "");
		var resultRecord 	= getApprFormStsInfo(gUsefacSeqNo, gApprSeqNo, gApprStsSeqNo);
		params["USEFAC_SEQ_NO"   	] = jex.web.null2void(resultRecord.USEFAC_SEQ_NO, "");
		params["APPRLINE_STS"     	] = jex.web.null2void(resultRecord.APPRLINE_STS, "");
		params["APPR_SEQ_NO"     	] = jex.web.null2void(resultRecord.APPR_SEQ_NO, "");
		params["APPR_STS_SEQ_NO"    ] = jex.web.null2void(resultRecord.APPR_STS_SEQ_NO, "");
		params["APPRLINE_KIND"      ] = jex.web.null2void(resultRecord.APPRLINE_KIND, "");
		params["APPRLINE_GB"     	] = jex.web.null2void(resultRecord.APPRLINE_GB, "");
		params["FORM_PAPER_KIND"    ] = jex.web.null2void(resultRecord.FORM_PAPER_KIND, "");
		params["APPR_STS"     		] = jex.web.null2void(resultRecord.APPR_STS, "");
		params["FORM_PAPER_CATE"	] = jex.web.null2void(resultRecord.FORM_PAPER_CATE, "");
		
		//alert(JSON.stringify(params));
		return gw.common.jexNewWin( '/appr0043_24.act', rtnUniqueTime(), 940, 850, params);
		**/
	}

}

/********************************************************************
 *  ������ȣ AREA ����
 * EX  : rappr_0001_01.js ����
 *********************************************************************/
function applyList(input){

	var rtnData = {};

	jex.web.Ajax("rcomm_0045_01_r001"
			    , input
			    , function(data) { 
					rtnData = data;

			    	rtnData['RTN_APPL_DT']       = rtnDate(voidChk(data.APPL_DT,""));
					rtnData['RTN_DRAFT_USER_NM'] = voidChk(data.APPL_USER_NM,"");
					//rtnData['RTN_DRAFT_USER_NM'] = voidChk(data.DRAFT_USER_NM,"");
					rtnData['RTN_SLIP_DT']       = rtnDate(voidChk(data.SLIP_DT,""));
					rtnData['RTN_PRJ_NM']        = voidChk(data.PRJ_NM,"") + " / " + voidChk(data.ANL,"") + "����";

					if (data.APPR_DIV_CD == "10" ) {
				   	    rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + rtnDate(voidChk(data.APPL_DATE,"")) + " " + voidChk(data.APPL_USER_NM,""); //��û���� ������� �����    (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,"");		//û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"");		//�������� : ���α��и�
						rtnData['RTN_OPINION']     = "";					            //�ǰ�     : ����

				   	}else if (data.APPR_DIV_CD == "20" ){
				   	    rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + rtnDate(voidChk(data.APPL_DATE,"")) + " " + voidChk(data.APPL_USER_NM,""); //��û���� ������� �����    (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,""); 		                                                                     //��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"") + " " + rtnDate(voidChk(data.APPR_DATE,"")) + " " + voidChk(data.APPR_USER_NM,"");	 //���α��и� �������� ������  (Ȯ��:��û�ڱ���)
						rtnData['RTN_OPINION']     = voidChk(data.APPR_USER_NM,"") + voidChk(data.OPINION,"");					                             //���������� ���系��

				   	}else if (data.APPR_DIV_CD == "30" ){
				   		rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + rtnDate(voidChk(data.APPL_DATE,"")) + " " + voidChk(data.APPL_USER_NM,""); //��û���� ������� ����� (Ȯ��:��û�ڱ���)
				   		rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,"");		                                                                     //û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"");	                                                                         //�������� : ���α��и�
						rtnData['RTN_OPINION']     = voidChk(data.OPINION,"");		                                                                         //�ǰ�     : ����

				   	}else if (data.APPR_DIV_CD == "40" ){
						rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + voidChk(data.APPL_DATE,"") + " " + voidChk(data.APPL_USER_NM,""); //��û���� : ��û���� ������� �����  (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,"");		//û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"") + " " + voidChk(data.APPR_DATE,"") + " " + voidChk(data.APPR_USER_NM,"");	//�������� : ���α��и� �������� ������  (Ȯ��:��û�ڱ���)
						rtnData['RTN_OPINION']     = voidChk(data.APPR_USER_NM,"") + voidChk(data.OPINION,"");					//�ǰ�     : ���������� ���系��
				   	}

			      },"jct");

	return rtnData;
}
/********************************************************************
 *  ������ȣ AREA ����(�����η��ΰǺ��ϰ����� �󼼺��� ���)
 * EX  : rappr_0001_01.js ����
 *********************************************************************/
function applyListDiff(input){

	var rtnData = {};

	jex.web.Ajax("rcomm_0045_01_r002"
			    , input
			    , function(data) {
					rtnData = data;

					rtnData['RTN_APPL_DT']       = rtnDate(voidChk(data.APPL_DT,""));
					rtnData['RTN_DRAFT_USER_NM'] = voidChk(data.APPL_USER_NM,"");
					//rtnData['RTN_DRAFT_USER_NM'] = voidChk(data.DRAFT_USER_NM,"");
					rtnData['RTN_SLIP_DT']       = rtnDate(data.SLIP_DT);
					rtnData['RTN_PRJ_NM']        = voidChk(data.PRJ_NM,"") + " / " + voidChk(data.ANL,"") + "����";

					if (data.APPR_DIV_CD == "10" ) {
						//rtnData['RTN_APPL_INFO']   = voidChk(data.ANL;			//��û���� : ��û����
				   	    rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + rtnDate(voidChk(data.APPL_DATE,"")) + " " + voidChk(data.APPL_USER_NM,""); //��û���� ������� �����    (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,"");		//û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"");		//�������� : ���α��и�
						rtnData['RTN_OPINION']     = "";					//�ǰ�     : ����

				   	}else if (data.APPR_DIV_CD == "20" ){
				   	    //rtnData['RTN_APPL_INFO']   = data.ANL + " " + data.DRAFT_DATE + " " + data.DRAFT_USER_NM; //��û���� : ��û���� ������� �����  (Ȯ��:��û�ڱ���)
				   	    rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + rtnDate(voidChk(data.APPL_DATE,"")) + " " + voidChk(data.APPL_USER_NM,""); //��û���� ������� �����    (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,""); 		//û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"") + " " + voidChk(data.APPR_DATE,"") + " " + voidChk(data.APPR_USER_NM,"");	//�������� : ���α��и�, �ݷ�����, �ݷ���  (Ȯ��:��û�ڱ���)
						rtnData['RTN_OPINION']     = voidChk(data.APPR_USER_NM,"") + voidChk(data.OPINION,"");					//�ǰ�     : �����ݷ��� �ݷ�����

				   	}else if (data.APPR_DIV_CD == "30" ){
				   		//rtnData['RTN_APPL_INFO']   = voidChk(data.ANL + " " + data.DRAFT_DATE + " " + data.DRAFT_USER_NM; //��û���� : ��û���� ������� ����� (Ȯ��:��û�ڱ���)
				   		rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + rtnDate(voidChk(data.APPL_DATE,"")) + " " + voidChk(data.APPL_USER_NM,""); //��û���� ������� ����� (Ȯ��:��û�ڱ���)
				   		rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,"");		//û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"");	//�������� : ���α��и�
						rtnData['RTN_OPINION']     = voidChk(data.OPINION,"");		//�ǰ�     : ����

				   	}else if (data.APPR_DIV_CD == "40" ){
						//rtnData['RTN_APPL_INFO']   = data.ANL + " " + data.DRAFT_DATE + " " + data.DRAFT_USER_NM; //��û���� : ��û���� ������� �����  (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_INFO']   = voidChk(data.REQ_DOC_NO,"") + " " + voidChk(data.APPL_DATE,"") + " " + voidChk(data.APPL_USER_NM,""); //��û���� : ��û���� ������� �����  (Ȯ��:��û�ڱ���)
						rtnData['RTN_APPL_CONT']   = voidChk(data.APPL_CONT,"");		//û������ : ��û����.��û����
						rtnData['RTN_APPR_DIV_NM'] = voidChk(data.APPR_DIV_NM,"") + " " + voidChk(data.APPR_DATE,"") + " " + voidChk(data.APPR_USER_NM,"");	//�������� : ���α��и� �������� ������  (Ȯ��:��û�ڱ���)
						rtnData['RTN_OPINION']     = voidChk(data.APPR_USER_NM,"") + voidChk(data.OPINION,"");					//�ǰ�     : ���������� ���系��
				   	}

			      },"jct");

	return rtnData;
}
/********************************************************************
 * ������Ʈ �� ������»���
 * - param1: �̿����Ϸù�ȣ
 * - param2: ������ȣ
 * - param3: �������
 *********************************************************************/
fnSetExpCdSelectBox = function(usefacSeqNo, prjNo, bgtReqCnt, targetCombo, valToKey) {
	var input = {};
	input['USEFAC_SEQ_NO'	] = gUsefacSeqNo;
	input['PRJ_NO'			] = '201100010000001';
	input['BGT_REQ_CNT'		] = '1';

	jex.web.Ajax("rcomm_combo_01_r002"
		    , input
		    , function(data) {
		    	if(data.REC.length > 0){
	            	grid.dataMgr.set(data.REC);

	            	// �ڵ� ������ ��ü�� �����
					$(targetCombo + " .generated").remove();

					// JSON ��ü�����͸�ŭ <option> �±� ����
					$.each(data.REC, function() {
						optVal = this.KEY;

						if(valToKey) {
							optVal = this.DAT;
						}

						html = "<option class='generated' value='" + optVal + "'>" + this.DAT + "</option>";

						$(targetCombo).append(html);
					});

	            }else{
	            	//alert("��ȸ�� ����� �����ϴ�.");
	            }
		      },"jct");
};
/********************************************************************
 * �����Ʈ init
 * - param1: �˾����� (true ; �˾�, false ; �ٴ�ȭ��)
 * - param2: ����Ʈ�ʺ����� (default = 100%)
 * - param3: ����Ʈ�������� (default = 100%)
 *********************************************************************/
function oz_init(isPop, width, height) {
//  var ServerIP    = "http://172.20.20.222";
//  var ServerIP    = "http://112.187.198.222";
//  var ServerPort  = "8080";

	var ServerIP    = OzServerIP;
    var ServerPort  = OzServerPort;

    document.write('<OBJECT width = "0" height = "0" ID="ZTransferX" CLASSID="CLSID:C7C7225A-9476-47AC-B0B0-FF3B79D55E67" codebase="' + ServerIP + ':' + ServerPort + '/oz51/ozviewer/ZTransferX_2,2,1,9.cab#version=2,2,1,9">');
    document.write('    <PARAM NAME="download.Server" VALUE="'+ ServerIP + '/oz51/ozviewer">');
    document.write('    <PARAM NAME="download.Port" VALUE="' + ServerPort + '">');
    document.write('    <PARAM NAME="download.Instruction" VALUE="ozrviewer.idf">');
    document.write('    <PARAM NAME="install.Base" VALUE="<PROGRAMS>/Forcs">');
    document.write('    <PARAM NAME="install.Namespace" VALUE="test">');
    document.write('</OBJECT>');
    if (isPop) {
        document.write('<OBJECT id = "ozviewer" CLASSID="CLSID:0DEF32F8-170F-46f8-B1FF-4BF7443F5F25" width="0" height="0">');
    } else {
        if (voidChk(width, '') == '') {
            width = "100%";
        }
        if (voidChk(height, '') == '') {
            height = "100%";
        }
        document.write('<OBJECT id = "ozviewer" CLASSID="CLSID:0DEF32F8-170F-46f8-B1FF-4BF7443F5F25" width="' + width + '" height="' + height + '">');
    }
    document.write('    <param name="viewer.emptyframe" value="true">');
    document.write('    <param name="viewer.isframe" value="false">');
    document.write('</OBJECT>');
}
/********************************************************************
 * �����Ʈ ���
 * - param1: �˾����� (true ; �˾�, false ; �ٴ�ȭ��)
 * - param2: ����Ʈ�� (ex > test1111.ozr)
 * - param3: odi�� (ex > ����)
 * - param4: ȭ�鿡 ����� �Ķ����(ex > name1=val1^name2=val2)
 * - param5: ������ ������ �Ķ����(ex > name1=val1^name2=val2)
 *********************************************************************/
function oz_setdata(isPop, rName, odiName, vParam, qParam) {
//  var ServerIP    = "http://172.20.20.222";
//"http://112.187.198.222";	
//var ServerPort  = "8080";
    var ServerIP    = OzServerIP;
    var ServerPort  = OzServerPort;

    ozviewer.script('close'); // ������ ������ ������ ���ֱ�

    var viewParam    = vParam.split("^");
    var vParamLength = viewParam.length;

    var queryParam   = qParam.split("^");
    var qParamLength = queryParam.length;

    var strOZViewerInfo = "";

    if("" == voidChk(odiName, "")) {
        odiName = "����";
    }
    if(voidChk(rName, "").indexOf("/")<0) {
        rName = "/rderp/" + rName;
    }

    strOZViewerInfo += "viewer.smartframesize=true\n";
	strOZViewerInfo += "viewer.isframe="+isPop+"\n";
    if("" != voidChk(odiName,"")) {
        strOZViewerInfo += "odi.odinames="+odiName+"\n";
    }
    if("" != voidChk(rName,"")) {
        strOZViewerInfo += "connection.reportname="+rName+"\n";
    }
    strOZViewerInfo += "connection.servlet=" + ServerIP + ":" + ServerPort + "/oz51/server\n";

    // view param
    if("" != voidChk(vParam, "")) {
        strOZViewerInfo += "connection.pcount="+vParamLength+"\n";
        for(var i=0; i<vParamLength; i++) {
            strOZViewerInfo += "connection.args" + Number(i+1) + "=" + viewParam[i] +"\n";
        }
    }

    // query param
    if("" != voidChk(qParam, "")) {
        strOZViewerInfo += "odi." + odiName + ".pcount="+qParamLength+"\n";
        for(var j=0; j<qParamLength; j++) {
            strOZViewerInfo += "odi." + odiName + ".args" +(j+1) + "=" + queryParam[j] + "\n";
        }
    }
    ozviewer.CreateReport(strOZViewerInfo);
}


/***************************************
* // �м�����, ���ڰ��� ������ �� ��������� ����ȸ ��������
***************************************/
function getApprFormStsInfo(usefacSeqNo, apprSeqNo, apprStsSeqNo){
	var resultData = {};
	jex.web.Ajax("rappr_1003_01_r001", {USEFAC_SEQ_NO:usefacSeqNo,APPR_SEQ_NO:apprSeqNo, APPR_STS_SEQ_NO:apprStsSeqNo}, function(data) {
		resultData["USEFAC_SEQ_NO"] 	= data.USEFAC_SEQ_NO;
		resultData["APPRLINE_STS"] 		= data.APPRLINE_STS;
		resultData["APPR_SEQ_NO"] 		= data.APPR_SEQ_NO;
		resultData["APPR_STS_SEQ_NO"] 	= data.APPR_STS_SEQ_NO;
		resultData["APPRLINE_KIND"] 	= data.APPRLINE_KIND;
		resultData["APPRLINE_KIND"] 	= data.APPRLINE_GB;
		resultData["FORM_PAPER_KIND"] 	= data.FORM_PAPER_KIND;
		resultData["APPR_STS"] 			= data.APPR_STS;
		resultData["FORM_PAPER_CATE"] 	= data.FORM_PAPER_CATE;
		
	},"jct");
	return resultData; 
}

/********************************************************************
 * Ajax�� ȣ���Ͽ� SelectBox�� �����
 * - param1: Ajax Id
 * - param2: �Է°�ü
 * - param3: ��ü
 * - param4: ��ü�� (SelectBox Value�� ���Ͽ� ��󰪰� ������� ����)
 *********************************************************************/
rderp.common.setCreateSelectBox = function(url, input, obj, valToKey, tabId) {
	comObj = jex.web.null2void(tabId)!=""?$("#"+tabId).find(obj):$(obj);
	
	comObj.find("option").remove();
	
	jex.web.Ajax(url, input, function(data) {
		if(!jex.web.isError(data)){
	            
			// JSON ��ü�����͸�ŭ <option> �±� ����
			$.each(data.REC, function() {
				optVal = this.KEY;
				if(valToKey == optVal) {
					html = "<option class='generated' value='" + optVal + "' selected>" + this.DAT + "</option>";
				}
				else {
					html = "<option class='generated' value='" + optVal + "'>" + this.DAT + "</option>";
				}
				comObj.append(html);
			});
		}
	},"jct");  
};

rderp.common.setCreateSelectBox2 = function(params) {
	var _asyncGb = jex.web.null2void(params.asyncGb,"1");
	comObj = jex.web.null2void(params.tabId)!=""?$("#"+params.tabId).find(params.obj):$(params.obj);
	
	comObj.find("option").remove();
	
	jex.web.Ajax(params.url, params.input, function(data) {
		if(!jex.web.isError(data)){
			
			// JSON ��ü�����͸�ŭ <option> �±� ����
			$.each(data.REC, function() {
				optVal = this.KEY;
				if(jex.web.null2void(params.valToKey) == optVal) {
					html = "<option class='generated' value='" + optVal + "' selected>" + this.DAT + "</option>";
				}
				else {
					html = "<option class='generated' value='" + optVal + "'>" + this.DAT + "</option>";
				}
				comObj.append(html);
			});
		}
	},"jct", _asyncGb);  
};

/*******************************************************************
 * ȭ����� ����
 ******************************************************************/
rderp.common.moneyFormat = function(data){
	return Format_comma(jex.web.null2void(data, "0"));
};

/*******************************************************************
 * number type input box key down event
 * parameter - obj:�̺�Ʈ ���
 * parameter - gubun: '.' �Ҽ���ǥ��, '-' ǥ��, 'all' �Ѵ� ���
 ******************************************************************/
fn_keyDownNumberType = function(obj, gubun){
	$(obj).attr("style", "ime-mode:disabled;"+$(obj).attr("style"));
	$(obj).keydown(function(event){
		//shift Ű�� ���������� Ư������ �Է� �Ұ�
		//�齺���̽�(8), delete(46), ����Ű(37~40) �� �����
		//���ڰ� �ƴ� �Է°� �Է� �Ұ�
		
		// ������ ������� üũ
		if(gubun != null && gubun != undefined){
			// �Ҽ��� ���
			if(gubun == "."){
				var nDotCnt = 0;
				for(var i=0; i<$(obj).val().length; i++){
					if($(obj).val().charAt(i) == ".") nDotCnt++;
				}
				
				if(nDotCnt > 0){
					if( event.shiftKey || 
						    ( !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || (event.keyCode>=37 && event.keyCode<=40) ) &&
							  !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105))	
						){
							event.returnValue=false;
							return false;
						}
				}
				else{
					if( event.shiftKey || 
						    ( !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || event.keyCode==110 || event.keyCode==190 || (event.keyCode>=37 && event.keyCode<=40) ) &&
							  !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105))	
						){
							event.returnValue=false;
							return false;
						}
				}
				
			}
			// ���̳ʽ� ǥ�� ���
			else if(gubun == "-"){
				if( event.shiftKey || 
				    ( !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || event.keyCode==109 || event.keyCode==189 || (event.keyCode>=37 && event.keyCode<=40) ) &&
					  !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105))	
				){
					event.returnValue=false;
					return false;
				}
			}
			// �Ҽ���, ���̳ʽ� �Ѵ� ���
			else if(gubun == "all"){
				if( event.shiftKey || 
					( !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || event.keyCode==109 || event.keyCode==189 || event.keyCode==110 || event.keyCode==190 || (event.keyCode>=37 && event.keyCode<=40) ) &&
					  !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105))	
				){
					event.returnValue=false;
					return false;
				}
			}
		}
		// only number type üũ
		else{
			if( event.shiftKey || 
			    ( !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || (event.keyCode>=37 && event.keyCode<=40) ) &&
				  !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105))	
			){
				event.returnValue=false;
				return false;
			}
		}
		
	});
};

/*******************************************************************
 * number type input box key press event
 ******************************************************************/
fn_keyPressNumberType = function(obj){
	//���ڰ� �ƴ� �Է°� �Է� �Ұ�
	if ((event.keyCode> 47) && (event.keyCode < 57)){
		event.returnValue=true;
	} 
	else 
	{ 
		event.returnValue=false;
	}

	$(obj).attr("style", "ime-mode:disabled;"+$(obj).attr("style"));
};

/*******************************************************************
 * �и��ڸ� �̿��Ͽ� ��¥�� ��ȿ�� üũ
 * ��) 2011-05-24 -> '-'�� �̿��Ͽ� üũ�Ѵ�.
 * @param inputDate üũ�� ��¥
 * @param point ��,��,�� �и���
 ******************************************************************/
function fnDateCheck(inputDate, point){
    var dateElement = new Array(3);
    
    if(point != ""){
        dateElement = inputDate.split(point);
        if(inputDate.length != 10 || dateElement.length != 3){
            return false;
        }
    }else{
        dateElement[0] = inputDate.substring(0,4);
        dateElement[1] = inputDate.substring(4,6);
        dateElement[2] = inputDate.substring(6,9);
    }
    //�⵵ �˻�
    if( !( 1800 <= dateElement[0] && dateElement[0] <= 4000 ) ) {
        return false;
    }

    //�� �˻�
    if( !( 0 < dateElement[1] &&  dateElement[1] < 13  ) ) {
        return false;
    }

    // �ش� �⵵ ���� ������ ��
    var tempDate = new Date(dateElement[0], dateElement[1], 0);
    var endDay = tempDate.getDate();

    //�� �˻�
    if( !( 0 < dateElement[2] && dateElement[2] <= endDay ) ) {
         return false;
    }

    return true;
}

/*******************************************************************
 * ��¥ ��
 * �������� ������ ���� ������ false ��
 * ���� �Ⱓ�� ��� true �� �����Ѵ�.
 * @param startDate ������
 * @param endDate ������
 * @param point ��¥ ������
 ******************************************************************/
function fnDateCompare(startDate, endDate, point){
    //���� ��¥���� üũ�Ѵ�.
    var startDateChk = fnDateCheck(startDate, point);
    if(!startDateChk){
        return false;
    }
    var endDateChk = fnDateCheck(endDate, point, "end");
    
    if(!endDateChk){
        return false;
    }

    //�� ���Ϸ� �и� �Ѵ�.
    var start_Date = new Array(3);
    var end_Date = new Array(3);

    if(point != ""){
        start_Date = startDate.split(point);
        end_Date = endDate.split(point);
        if(start_Date.length != 3 && end_Date.length != 3){
            return false;
        }
    }else{
        start_Date[0] = startDate.substring(0,4);
        start_Date[1] = startDate.substring(4,6);
        start_Date[2] = startDate.substring(6,9);

        end_Date[0] = endDate.substring(0,4);
        end_Date[1] = endDate.substring(4,6);
        end_Date[2] = endDate.substring(6,9);
    }

    //Date ��ü�� �����Ѵ�.
    var sDate = new Date(start_Date[0], start_Date[1], start_Date[2]);
    var eDate = new Date(end_Date[0], end_Date[1], end_Date[2]);

    if(sDate > eDate){
        return false;
    }

    return true;
}

/*******************************************************************
 * �ֹ�(�ܱ���)��Ϲ�ȣ ��ȿ�� �˻�
 ******************************************************************/
function fnRRNCheck(rrn){
    if (fnrrnCheck(rrn) || fnfgnCheck(rrn) || fnBizCheck(rrn)) {
        return true;
    }
    
    return false;
}

/*******************************************************************
 * �ֹε�Ϲ�ȣ ��ȿ�� �˻�
 ******************************************************************/
function fnrrnCheck(rrn){
    var sum = 0;
    
    if(rrn != ""){
        if (rrn.length != 13) {
            return false;
        }
        else if (rrn.substr(6, 1) != 1 && rrn.substr(6, 1) != 2 && rrn.substr(6, 1) != 3 && rrn.substr(6, 1) != 4) {
            return false;
        }
        for (var i = 0; i < 12; i++) {
            sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);
        }
        if (((11 - (sum % 11)) % 10) == Number(rrn.substr(12, 1))) {
            return true;
        }
        return false;
    }
    
    return true;
}

/*******************************************************************
 * �ܱ��ε�Ϲ�ȣ ��ȿ�� �˻�
 ******************************************************************/
function fnfgnCheck(rrn){
    var sum = 0;
    
    if(rrn != ""){
        if (rrn.length != 13) {
            return false;
        }
        else if (rrn.substr(6, 1) != 5 && rrn.substr(6, 1) != 6 && rrn.substr(6, 1) != 7 && rrn.substr(6, 1) != 8) {
            return false;
        }
        if (Number(rrn.substr(7, 2)) % 2 != 0) {
            return false;
        }
        for (var i = 0; i < 12; i++) {
            sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);
        }
        if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(rrn.substr(12, 1))) {
            return true;
        }
        return false;
    }
    
    return true;
}

/*******************************************************************
 * ����ڵ�Ϲ�ȣ ��ȿ�� �˻�
 ******************************************************************/
function fnBizCheck(rrn){ 
    var sum = 0;
    
    if(rrn != ""){
        var getlist  = new Array(10);
        var chkvalue = new Array("1","3","7","1","3","7","1","3","5");
        
        for(var i=0; i<10; i++) { 
        	getlist[i] = rrn.substring(i, i+1); 
        }
        
        for(var i=0; i<9; i++) { 
        	sum += getlist[i]*chkvalue[i]; 
        }
        
        sum = sum + parseInt((getlist[8]*5)/10);
        sidliy = sum % 10;
        sidchk = 0;
        
        if(sidliy != 0) { 
        	sidchk = 10 - sidliy; 
        }
        else { 
        	sidchk = 0; 
        }
        
        if(sidchk != getlist[9]) { 
        	return false; 
        }
        
        return true;
    }
    
    return true;
} 

/*******************************************************************
 * �ֹε�Ϲ�ȣ FORMAT
 ******************************************************************/
rderp.common.formatSsn = function(value){
	var tmpSSN = "";
	
	if(jex.web.null2void (value) != ""){
		tmpSSN = value.replace(/\-/g,"");
		
		if(value.length == 13){
			tmpSSN = tmpSSN.substring(0,6)+"-"+tmpSSN.substring(6,7)+"******";    
		}
		else{
			tmpSSN = tmpSSN;
		}
	}
	
	return tmpSSN;
};

/*******************************************************************
 * �����ȣ FORMAT
 * parameter1 - obj1  : �����ȣ ���ڸ� ID
 * parameter2 - obj2  : �����ȣ ���ڸ� ID
 * parameter3 - value : �����ȣ full value
 ******************************************************************/
rderp.common.formatZipCd = function(obj1, obj2, value){
	var zip1 = "";
	var zip2 = "";
	
	if(jex.web.null2void (value) != ""){
		if(value.length >= 3){
			zip1 = value.substring(0,3);    
			zip2 = value.substring(3);    
		}
	}
	
	$("#"+obj1).val(zip1);
	$("#"+obj2).val(zip2);
};

/****************************************************************************
 * ��������ȸ ó��
 * @param params - �����ڵ�(BNK_CD), ���¹�ȣ(ACCT_NO), ��ü�ұݾ�(TRNS_AMT)
 * @param rsltCd - ��������ȸ����ڵ� object
 * @param rslt   - ��������ȸ��� object
 * @param owner  - ������ object
 ***************************************************************************/
rderp.common.selOwnrIng = function(params, rsltCd, rslt, owner){
	var input = {};
	var sBnkCd   = jex.web.null2void(params.BNK_CD).replace(/\-/g,"");   	// �����ڵ�
	var sAcctNo  = jex.web.null2void(params.ACCT_NO).replace(/\-/g,"");  	// ���¹�ȣ
	var sTrnsAmt = Format_NoComma(jex.web.null2void(params.TRNS_AMT,"0"));  // ��ü�ұݾ�
	
	if(sBnkCd == "" || sAcctNo == ""){
		alert("��������ȸ�� ����/���¹�ȣ�� �ʼ��Է��Դϴ�.");
		return;
	}
	
	input["BNK_CD"   ] = sBnkCd;
	input["ACCT_NO"  ] = sAcctNo;
	input["TRNS_AMT" ] = sTrnsAmt;
	
	jex.web.Ajax("rcomm_imo_0600_600_01", input, function(data) {
		if(rsltCd) $(rsltCd).val(data.OWNR_INQ_RSLT_CD);	// ��������ȸ����ڵ�
		if(rslt)   $(rslt).val(data.OWNR_INQ_RSLT);      	// ��������ȸ���
		if(owner)  $(owner).val(data.OWNR);					// �����ּ��� ����
	},"jct");

};

/****************************************************************************
 * ���� format ���� ����
 * ��) rderp.common.numFormat('111122223333','0000-0000-0000')
 ***************************************************************************/
rderp.common.numFormat = function(str, format){
	var rtnVal = "";
	if(jex.web.null2void(str) != ""){
		rtnVal = gw.number.format(str, format);
	}
	
	return rtnVal;
};

/****************************************************************************
 * ��¥ format ���� ����
 * ��) rderp.common.dateFormat('20110101','yyyyMMdd','yyyy-MM-dd')
 ***************************************************************************/
rderp.common.dateFormat = function(dateStr, fromFormat, toFormat){
	var rtnVal = "";
	
	if(jex.web.null2void(dateStr) != ""){
		rtnVal = gw.date.format(dateStr, fromFormat, toFormat);
	}
	
	return rtnVal;
};

/****************************************************************************
 * �������� �о����
 ***************************************************************************/
rderp.common.selPrjAuth = function(){
	var rtnVal = "1";
	var input  = {};
	input["MENU_SEQ"   ] = rderp_menu_seq;
	jex.web.Ajax("rcomm_etc_0001_01", input, function(data) {
		rtnVal = data.PRJ_AUTH;
	},"jct");
	return rtnVal;
};

/****************************************************************************
 * �μ����� �о����
 ***************************************************************************/
rderp.common.selDeptAuth = function(){
	var rtnVal = "1";
	var input  = {};
	input["MENU_SEQ"   ] = rderp_menu_seq;
	jex.web.Ajax("rcomm_etc_0001_01", input, function(data) {
		rtnVal = data.DEPT_AUTH;
	},"jct");
	return rtnVal;
};


/****************************************************************************
 * �Ҽ��� �ڸ���
 ***************************************************************************/
function truncate(n) {
	  return Math[n > 0 ? "floor" : "ceil"](n);
}

/****************************************************************************
 * �Ҽ��� ����(�ڸ����� ó��)
 * ��) rderp.common.trunc("2.567",2) => 2.5
 ***************************************************************************/
rderp.common.trunc = function(value, npos) { 
	var roundValue = rderp.common.makeRoundValue(npos); 
	var multiValue = Math.pow(10, npos - 1);
	
	var temp = Number(Format_NoComma(jex.web.null2void(value+"","0"))) - roundValue; 
	temp = temp * multiValue; 
	temp = Math.round(temp); 
	temp = temp / multiValue; 

	return temp; 
}; 

rderp.common.makeRoundValue = function(npos) { 
	if (npos <= 0) 
	return 0; 

	var result = 0.5; 

	for (var i = 1; i < npos; i++) { 
		result = result / 10; 
	} 

	return result; 
};

/****************************************************************************
 * �ҵ汸���� �ٷμҵ�(20)�϶� �ش� ������ �ٷμҵ�Ű������� �����ϴ��� ���� üũ
 ***************************************************************************/
rderp.common.chkEricmDclSiteYn = function(prjno){
	var rtnVal = true;
	
	jex.web.Ajax("rcomm_0102_01_r001", {"PRJ_NO":prjno}, function(data) {
		
		if(jex.web.null2void(data.ERICM_DCL_SITE_NO) == ""){
			alert("������ �ٷμҵ�Ű����� ������ ��ϵ��� �ʾҽ��ϴ�.\n��������ڿ��� ������ �ּ���.");
			rtnVal = false;
		}
	},"jct");

	return rtnVal;
};

//==================================================================
// �����˾�  rderp_common_pop.js ����
//==================================================================
