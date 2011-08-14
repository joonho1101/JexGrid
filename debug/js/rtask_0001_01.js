var mode = "";
var grid;
var colDefs = [];
var gridOptions = rderp.grid.getDefaultOptions();

$(function() {
	
	// �׸��� �ɼ� ����
	var gridOptions  = rderp.grid.getDefaultOptions();
	gridOptions.ViewportManager = {rowsPerPage: 22, rowH: 19, autoColWEnabled: true};
	
	//��������� ������
	//��������з� renderer
	function renSupOrgCateCd(value){
		var option  = $("#mngList #SUP_ORG_CATE_CD option");		
		var result  = "10";
		for(var i=0 ; i < option.length ; i++){
			
			if(option[i].value == voidChk(value,"")){
				result = option[i].text;
				break;
			}
		}
		return result;		
	}
	//�ҼӺ�ó renderer
	function renAttOrgCd(value){
		var option  = $("#mngList #ATT_ORG_CD option");		
		var result  = "10";
		for(var i=0 ; i < option.length ; i++){
			
			if(option[i].value == voidChk(value,"")){
				result = option[i].text;
				break;
			}
		}
		return result;		
	}	

	//�׸��� �÷� ����
	var colDefs = [
		{key:"SUP_ORG_CD"		,name:"��������ڵ�"		,width:120		,sorter:"int"       , colClass:"t_center"},
		{key:"SUP_ORG_NM"		,name:"���������"		,width:160		,sorter:"text"		, colClass:"t_left"},
		//{key:"SUP_ORG_SNM"	,name:"�����������"	,width:120		,sorter:"text"		, colClass:"t_left"},
		{key:"SUP_ORG_CATE_NM" 	,name:"��������з�"	    ,width:120		,sorter:"text"		, colClass:"t_center"},
		{key:"ATT_ORG_NM"		,name:"�ҼӺ�ó"			,width:120		,sorter:"text"		, colClass:"t_center"},
		{key:"CUR_ATT_ORG_NM"	,name:"�����ó"			,width:120		,sorter:"text"		, colClass:"t_center"},
		{key:"SUP_ORG_URL"		,name:"�������URL"		,width:120		,sorter:"text"		, colClass:"t_left"},
		{key:"CUR_SUP_ORG_NM"	,name:"�������������"  	,width:120		,sorter:"text"		, colClass:"t_left"},
		{key:"PRT_ORD"			,name:"��¼���"			,width:120		,sorter:"int"   	, colClass:"t_right"},
		//{key:"BIZ_NO"			,name:"����ڹ�ȣ"		,width:120		,sorter:"int"   	, colClass:"t_left"},
		//{key:"CHRG_NM"		,name:"����ڼ���"		,width:120		,sorter:"text"		, colClass:"t_center"},
		//{key:"CHRG_TEL_NO"	,name:"�������ȭ��ȣ"	,width:120		,sorter:"int"   	, colClass:"t_center"},
		//{key:"CHRG_EMAIL"	    ,name:"�����e-mail"    ,width:120		,sorter:"text"		, colClass:"t_left"}
		{key:"CUR_ATT_ORG_CD"   ,hidden:true}	
	];

	//�׸��� ����
	grid = JGM.grid({ container:$("#myGrid"), options:gridOptions, colDefs:colDefs });
	
	//��Ŭ���̺�Ʈ���� 
	grid.event.register({e:"clickCanvas",f:function(e,cell){
		var arr_data = cell.getDatarow();
		fnSelectDetail(arr_data.SUP_ORG_CD);	
	},t : this});	

	//����Ŭ���̺�Ʈ����
	grid.event.register({e:"dblclickCanvas",f:function(e,cell){
	},t : this});

	grid.event.register({e:"onBeforeUpdateDatarow", f:function(dataRow, change){
		if(typeof(console) == "undefined"){
		}else{
			console.log(dataRow,change);
			change.title = 'asdfasdf';		
		}		
	},t : this});	

	/**************************************************************************
	 * ��ȸ ��ư Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	 
	$("#btn_search").click(function(){
		initVal();
		fnSelect();		
	});
	
	/**************************************************************************
	 * ��ȸ ��ư Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	 
	$("#mngList").find("#SUP_ORG_CATE_CD").change(function(){
		var supOrgCateCd = $("#mngList").find("#SUP_ORG_CATE_CD option:selected").text();
		
		if("����" == supOrgCateCd){
			$("#mngList").find("#ATT_ORG_CD").attr("disabled",false);				
		}else{
			$("#mngList").find("#ATT_ORG_CD").val("");
			$("#mngList").find("#ATT_ORG_CD").attr("disabled",true);
		}			
	});	
	
	/**************************************************************************
	 * �ű� ��ư Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	
	$("#keyInHelpC").click(function() {	
		mode="save";
		
		$("input#SUP_ORG_CD").attr("readonly",false);
		$("input#DIRECT_CHK").attr("disabled",false);
		
		initVal();
		
	});
	
	/**************************************************************************
	 * �ŷ�ó ���
	 **************************************************************************/ 
	$("#btnCustReg").click(function() {
		
		var prarmObject = new Object();
		prarmObject.upd_yn = "N";
		prarmObject.CUST_CD ="";
		
		uf_newModalDialog('rtask_0004_02.act',prarmObject, 720, 585);
	});
	
	/**************************************************************************
	 * ����  ��ư Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	
	$("#keyInHelpU").click(function(){	execute(); });
	
	/**************************************************************************
	 * ����  ��ư Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	
	$("#keyInHelpD").click(function(){  mode="delete";  execute(); });	
	
	/**************************************************************************
	 * �����Է� Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	 
	$("#DIRECT_CHK").click(function(){
		var chk = $("#DIRECT_CHK").is(":checked");

		if(chk){
			
			$("input#SUP_ORG_CD").removeClass("text dis");
			$("input#SUP_ORG_CD").addClass("text");
			$("input#SUP_ORG_CD").attr("disabled",false);			
			
		}else{
			$("input#SUP_ORG_CD").removeClass("text");
			$("input#SUP_ORG_CD").addClass("text dis");		
			$("input#SUP_ORG_CD").attr("disabled",true);	
		}
		$("input#SUP_ORG_CD").val("");
	});	
	
	/**************************************************************************
	 *������������� ��ư  Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	 
	$("#btnCurSupOrgCd").click(function(){
		var input = {};
		input["NON_BTN_YN" ] = "Y";
		rderp.common.popSupOrgInfo(input);
	});	
	
	/**************************************************************************
	 * ��������з� ����Ʈ �ڽ� Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	 
	$("#expList").find("#SUP_ORG_CATE_CD").change(function(){
		cateCdChange();
	});	
	
	/**************************************************************************
	 * �ҼӺ�ó ����Ʈ �ڽ� Ŭ�� �̺�Ʈ�� 
	 **************************************************************************/	 
	$("#expList").find("#ATT_ORG_CD").change(function(){
		attOrgCdChange();
	});
	
	$("#btnEXT1").click(function(){
		var input = {};
		input["NON_BTN_YN" ] = "N";
		input["DIV_GRP_CD" ] = "RD0002";
		gw.common.jexNewWin( '/rcomm_0053_01.act', rtnUniqueTime(), 700, 550, input);
	});
	
	
	
	/***************************************
	* ����Ű ó��
	***************************************/
	$("#mngList #SUP_ORG_NM").keypress(function(e) {
	    if(e.keyCode == "13") {
	    	e.preventDefault();
	    	$("#btn_search").click();
	        return false;
	    }
	 });	
	
	//selectRow(JGM.Cell cell) 
	cateCdChange();
	
});

/***************************************
* ��������˾�
***************************************/
function uf_rcomm_0001_01Params(popKey, obj){
	$("#CUR_SUP_ORG_CD").val( jex.web.null2void(obj.SUP_ORG_CD)); 
	$("#CUR_SUP_ORG_NM").val( jex.web.null2void(obj.SUP_ORG_NM));
} 

/***************************************
* ��������з� ����Ʈ �ڽ� Ŭ�� �̺�Ʈ�� ����
***************************************/
function cateCdChange(){
	var supOrgCateCd = $("#expList").find("#SUP_ORG_CATE_CD option:selected").text();
	
	if("����" == supOrgCateCd){
		$("#expList").find("#ATT_ORG_CD").attr("disabled",false);				
	}else{
		$("#expList").find("#ATT_ORG_CD").val("");
		$("#expList").find("#ATT_ORG_CD").attr("disabled",true);
		$("#CUR_ATT_ORG_NM").val("");
	}
}

/***************************************
* �ҼӺ�ó ����Ʈ �ڽ� Ŭ�� �̺�Ʈ�� ����
***************************************/
function attOrgCdChange(){
	
	var input = {};	
	 
	input['EXT1'			] = $("#expList").find("#ATT_ORG_CD option:selected").val();
	input['USEFAC_SEQ_NO'	] = $("input#USEFAC_SEQ_NO").val();
	
	jex.web.Ajax("rtask_0001_01_r003"
	    		 , input
	             , function(dat) {
					$("#CUR_ATT_ORG_NM").val(dat.CUR_ATT_ORG_NM);
					$("input#CUR_ATT_ORG_CD").val(dat.CUR_ATT_ORG_CD);
				
					cateCdChange();
					
	               },"jct");	               
	return; 
}

/***************************************
* �� �ʱ�ȭ 
***************************************/
function initVal(){

	$("#expList #SUP_ORG_CD").val("");
	$("#expList").find("input[name=SUP_ORG_NM]").val("");
	$("input#SUP_ORG_SNM").val("");
	$("#expList").find("#SUP_ORG_CATE_CD").val("");
	$("input#SUP_ORG_URL").val("");
	$("#expList").find("#ATT_ORG_CD").val("");
	$("input#CUR_SUP_ORG_NM").val("");
	$("input#CUR_SUP_ORG_CD").val("");
	$("input#CUR_ATT_ORG_NM").val("");
	$("input#PRT_ORD").val("");
	$("input#BIZ_NO").val("");
	$("input#CHRG_NM").val("");
	$("input#CHRG_TEL_NO").val("");
	$("input#CHRG_EMAIL").val("");
	$("#RMK").val("");
	$("#GBCD1").val("");
	$("#GBCD2").val("");
	$("#GBCD3").val("");
	$("input#SUP_ORG_CD_CNT").val("");
	$("#ACT_YN").val("Y");	
}
 
/***************************************
* view�� ����� �ִ� ������
***************************************/
function setParam(){

	var input = {};
	var prtOrd = "";
	var supOrgCateCd = "";
	
	if($("input#PRT_ORD").val() == ""){
		prtOrd = "0";
	}else{
		prtOrd = $("input#PRT_ORD").val();
	}
	
	supOrgCateCd = $("#expList").find("#SUP_ORG_CATE_CD option:selected").text();	

	input['SUP_ORG_CD'     ] = $("#expList #SUP_ORG_CD").val();
	input['SUP_ORG_NM'     ] = $("#expList").find("input[name=SUP_ORG_NM]").val();
	input['SUP_ORG_SNM'    ] = $("input#SUP_ORG_SNM").val();
	input['SUP_ORG_CATE_CD'] = $("#expList").find("#SUP_ORG_CATE_CD option:selected").val();
	input['SUP_ORG_URL'    ] = $("input#SUP_ORG_URL").val();
	
	if("����" == supOrgCateCd){
		input['ATT_ORG_CD'     ] = $("#expList").find("#ATT_ORG_CD option:selected").val();				
	}else{
		input['ATT_ORG_CD'     ] = "";		
	}	

	input['CUR_SUP_ORG_NM' ] = $("input#CUR_SUP_ORG_NM").val();
	input['CUR_SUP_ORG_CD' ] = $("input#CUR_SUP_ORG_CD").val();
	input['PRT_ORD'        ] = prtOrd;
	input['BIZ_NO'         ] = $("input#BIZ_NO").val();
	input['CHRG_NM'        ] = $("input#CHRG_NM").val();
	input['CHRG_TEL_NO'    ] = $("input#CHRG_TEL_NO").val();
	input['CHRG_EMAIL'     ] = $("input#CHRG_EMAIL").val();
	input['RMK'            ] = $("#RMK").val();
	input['GBCD1'          ] = $("#GBCD1 option:selected").val();
	input['GBCD2'          ] = $("#GBCD2 option:selected").val();
	input['GBCD3'          ] = $("#GBCD3 option:selected").val();
	input['ACT_YN'         ] = $("#ACT_YN").val();
	input['REG_DTM'        ] = rtnReplace(rtnDate(),"-");
	input['MOD_DTM'        ] = rtnReplace(rtnDate(),"-");
	
	return input;	
}

/***************************************
* �����������  select 
***************************************/
function fnSelect(){

	$("#keyInHelpC").click(); 	
		
	var input = {};
	
	input['SUP_ORG_CATE_CD'	] = $("#mngList #SUP_ORG_CATE_CD option:selected").val();
	input['SUP_ORG_NM'		] = $("#mngList #SUP_ORG_NM").val();
	input['ATT_ORG_CD'		] = $("#mngList #ATT_ORG_CD option:selected").val();
	input['ACT_YN'     		] = $("#mngList #ACT_YN2 option:selected").val();
 	
	//��û���� select
	jex.web.Ajax("rtask_0001_01_r001"
		    , input
		    , function(data) {
		    	grid.dataMgr.set(data.REC);
		    	if(data.REC.length < 1){	            	
//	            	jex.web.info("RDWM0001");
	            }else{
	            	grid.selMgr.selectRow(JGM.create("Cell", {grid:grid, row:0, col:0}));
	            	fnSelectDetail(data.REC[0].SUP_ORG_CD);
	            }
		      },"jct");
	
}

/***************************************
* ��������󼼳���  select 
***************************************/
function fnSelectDetail(supOrgCd){

	mode = "update";
	
	var input = {};	
	input['SUP_ORG_CD'		] = supOrgCd;
	
	jex.web.Ajax("rtask_0001_01_r002"
	    		 , input
	             , function(dat) {
					$("#expList #SUP_ORG_CD").val(dat.SUP_ORG_CD);
					$("#expList").find("input[name=SUP_ORG_NM]").val(dat.SUP_ORG_NM);
					$("input#SUP_ORG_SNM").val(dat.SUP_ORG_SNM);
					$("#expList").find("#SUP_ORG_CATE_CD").val(dat.SUP_ORG_CATE_CD);
					$("input#SUP_ORG_URL").val(dat.SUP_ORG_URL);
					$("#expList").find("#ATT_ORG_CD").val(dat.ATT_ORG_CD);
					$("input#CUR_SUP_ORG_NM").val(dat.CUR_SUP_ORG_NM);
					$("input#CUR_SUP_ORG_CD").val(dat.CUR_SUP_ORG_CD);
					$("input#CUR_ATT_ORG_NM").val(dat.CUR_ATT_ORG_NM);
					$("input#PRT_ORD").val(dat.PRT_ORD);
					$("input#BIZ_NO").val(dat.BIZ_NO);
					$("input#CHRG_NM").val(dat.CHRG_NM);
					$("input#CHRG_TEL_NO").val(dat.CHRG_TEL_NO);
					$("input#CHRG_EMAIL").val(dat.CHRG_EMAIL);
					$("#RMK").val(dat.RMK);
					$("#GBCD1").val(dat.GBCD1);
					$("#GBCD2").val(dat.GBCD2);
					$("#GBCD3").val(dat.GBCD3);	
					$("#SUP_ORG_CD_CNT").val(dat.SUP_ORG_CD_CNT);
					$("#ACT_YN").val(dat.ACT_YN);						
					
					$("input#DIRECT_CHK").removeClass();
					$("input#SUP_ORG_CD").addClass("text dis");
					$("input#DIRECT_CHK").attr("checked",false);
					$("input#SUP_ORG_CD").attr("readonly",true);
					$("input#DIRECT_CHK").attr("disabled",true);

					cateCdChange();
	               },"jct");	               
	return; 
	
}

/***************************************
* vaildate 
***************************************/
function vaildate(){

	//jex.web.form.check.isNotnull �ʼ�����Ȯ�� (����� : view ȭ�鿡 attr ( notnull, fieldName) �߰�
	var chk = $("#DIRECT_CHK").is(":checked");

	if(chk){
		if(!jex.web.form.check.isNotnull("input#SUP_ORG_CD")){
			$("input#SUP_ORG_CD").focus();
			return false;
		}
		if(!jex.web.form.check.isFormat("input#SUP_ORG_CD")){
			$("input#SUP_ORG_CD").focus();
			return false;
		}
		if(!jex.web.form.check.isMaxLength("input#SUP_ORG_CD")){
			$("input#SUP_ORG_CD").focus();
			return false;
		}		
	}

	if(!jex.web.form.check.isNotnull("#expList input[name=SUP_ORG_NM]")){
		$("#expList input[name=SUP_ORG_NM]").focus();
		return false;
	}
	
	if(!jex.web.form.check.isNotnull("input#SUP_ORG_SNM")){
		$("input#SUP_ORG_SNM").focus();
		return false;
	}
	 
	var supOrgCateCd = "";
	
	var supOrgCateCd = $("#expList").find("#SUP_ORG_CATE_CD option:selected").text();
	var attOrgCd     = $("#expList").find("#ATT_ORG_CD option:selected").val();	

	if("" == $("#expList").find("#SUP_ORG_CATE_CD option:selected").val()){
		alert("[��������з�] �׸��� �ʼ� �Է��Դϴ�.");
		$("#expList").find("#SUP_ORG_CATE_CD option:selected").focus();
		return false;
	}
	
	if("����" == supOrgCateCd){
		if(attOrgCd == ""){
			alert("[�ҼӺ�ó] �׸��� �ʼ� �Է��Դϴ�.");
			$("#expList").find("#ATT_ORG_CD option:selected").focus();
			return false;
		}				
	}	
		
	if(!jex.web.form.check.isFormat("input#PRT_ORD")){
		$("input#PRT_ORD").focus();
		return false;
	}		
	return true;
}

/***************************************
* insert/update/delete 
***************************************/
function execute() {

	var msg = "";
	var act_id = "";
	if ( mode == "update" ){
		if(!vaildate()){
			return;
		}		
		act_id = "rtask_0001_01_u001";
		msg = "����";
		
	}else if( mode == "delete" ){
		mode = "update";
		if($("input#SUP_ORG_CD_CNT").val() > 0){
			jex.web.info("RDWE0001");
			return; 
		}
		if($("#expList #SUP_ORG_CD").val() == ""){
			jex.web.info("RDWE0003");			
			return;
		}		
	    act_id = "rtask_0001_01_d001";
	    msg = "����";
	    
	}else{
		if(!vaildate()){
			return;
		}
	    act_id = "rtask_0001_01_c001";	    
	    msg = "���";
	}

	if(jex.web.confirm(msg+" �Ͻðڽ��ϱ�?")){	
		input = setParam(); // ���尪�� ��ȸ�� ����    RDWE0003  RDWE0001
		
		jex.web.Ajax(act_id, input, function(dat) {	    
			if(!jex.web.isError(dat)){
				alert("���������� ó�� �Ǿ����ϴ�.");
			}

			/*
  			if(mode == "delete"){
  				jex.web.info("RDWM0004");
			}else if(mode == "update"){
				jex.web.info("RDWM0005");					
			}else{
				jex.web.info("RDWM0003");
			}
			*/
			initVal();
			fnSelect(); //����ȸ
		},"jct",true);
	}
}