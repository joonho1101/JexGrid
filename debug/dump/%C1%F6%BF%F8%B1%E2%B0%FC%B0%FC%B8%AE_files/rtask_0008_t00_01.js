//��������
var gPrjInfo = null;

/***************************************
* �������� �˻���� ����
***************************************/
fn_setPrjResult = function(params){
	var input = {};
	input["USEFAC_SEQ_NO"] = params.USEFAC_SEQ_NO;
	input["PRJ_NO"]        = params.PRJ_NO;
	
	jex.web.Ajax("rcomm_0102_01_r001", input, function(data) {
		uf_rcomm_0009_01Params(1, data);
	},"jct");

};


/***************************************
* �������� �˻� �˾�
***************************************/
function fnPop_rcomm_0009_01(){
	rderp.common.popPrjInfo({});
};

/***************************************
* �������� �˻� �˾�(���ιٴ�)
***************************************/
function uf_rcomm_0009_01Params(popKey, params){
	$('#PRJ_RSPR_EMP_NM').html(params.PRJ_RSPR_EMP_NM +'(' + jex.web.null2void(params.PRJ_RSPR_EMP_DEPT_NM) + '/' + jex.web.null2void(params.PRJ_RSPR_EMP_POS_NM) + ')');//����å����
	$('#PRJ_NM').html('(' + params.PRJ_NO + ')' + params.PRJ_NM );//������
	$('#ANL').html(params.ANL);//����	
	$('#SUMUP_PRJ_NO').val(params.SUMUP_PRJ_NO);//�Ѱ�������ȣ	
	$('#PRJ_NO').val(params.PRJ_NO);//������ȣ	
	$('#P_PRJ_NM').val(params.PRJ_NM);//������
	$('#P_ANL').val(params.ANL);//����
	$('#P_PRJ_RSPR_EMP_NM').val(params.PRJ_RSPR_EMP_NM);//����å����	
	$('input#USEFAC_SEQ_NO').val(params.USEFAC_SEQ_NO);
	$("input#PRJ_RSPR_EMP_NM").val(params.PRJ_RSPR_EMP_NM);
	$("input#PRJ_RSPR_EMP_ID").val(params.PRJ_RSPR_EMP_ID);
	$("input#EXP_BASE_AC_USE_YN").val(params.EXP_BASE_AC_USE_YN);
	$("input#PRJ_CHRG_GRP_CD").val(params.PRJ_CHRG_GRP_CD);

	$("input#EXP_CATE_APLY_CD").val(params.EXP_CATE_APLY_CD);
	$("input#BGT_MOD_CNTRL_YN").val(params.BGT_MOD_CNTRL_YN);
	$("input#ISD_PSNL_EXPN_NO_PRJ_YN").val(params.ISD_PSNL_EXPN_NO_PRJ_YN); //�����ΰǺ� �����԰�������
	
	$("input#DPMNS_GOV_CD").val(params.DPMNS_GOV_CD);//��ó�� �μ��ڵ�
	$("input#PRJ_CARD_DIV_CD").val(params.PRJ_CARD_DIV_CD);//����ī�� �����ڵ�
	$("input#DPMNS_BIZ_CD").val(params.DPMNS_BIZ_CD);//��ó�� ����ڵ�	
	$("input#NEW_PRJ_NM").val(params.PRJ_NM);//������
	$("input#BGT_STD_CD").val(params.BGT_STD_CD);	
	//���������� ��´�.
	gPrjInfo = params;

	//�������ý� �ش����� �ٽ� ��ȸ
	fnGoTabPage(gTabId);
} 	

$(function() {

	if(gPrjNo != ""){
		var params = {};
		params["USEFAC_SEQ_NO"  ] = gUsefacSeqNo;
		params["PRJ_NO"  ] = gPrjNo;
		fn_setPrjResult(params);

		$("ul.tab_1").find("li").removeClass("selected");
		$("ul.tab_1").find("li#"+gTabId).addClass("selected");
		fnGoTabPage(gTabId);
	}
	else {
		gTabId="01";
		fnGoTabPage("01");
		$("ul.tab_1").find("li").eq(0).addClass("selected");
	}	
	
	$("ul.tab_1").find("a").click(function() {
		$("ul.tab_1").find("li").removeClass("selected");
		$(this).parent().addClass("selected");
		gTabId = $(this).parent()[0].id;
		fnGoTabPage(gTabId);
	});
		
	// ��ȸ��ư Ŭ�� �̺�Ʈ�� 
	$("#btnSearch").click(function(){
		//����å����/������ �˻� �˾�
		fnPop_rcomm_0009_01();
	});

});

/***************************************
* Tab ���� �̵� 
***************************************/ 
function fnGoTabPage(tabPage){
	gtabId = tabPage;
	var frm    = document.frm;
	
	frm.action = "rtask_0008_t" + tabPage + "_01.act";
	frm.target = "tabFrame";
	frm.submit();
	
	//JexCommon.resizeIframe(); 
}

function resizeFrameHeight(height) {
//	document.getElementById('tabFrame').style.height = height;

	$("#tabFrame").css("height",height);
	JexCommon.resizeIframe(); 
};

function fnGoTabPageFind(){
	
	if(jex.web.null2void(gTabId) == "04"){
		var ch04 = document.getElementById('tabFrame').contentWindow; 
		ch04.fnSelect();
	}
	else{
		fnGoTabPage(gTabId);
	}
}

$(document).ready(function(){
    //ȭ��  Tab ��ũ�� resize
    JexCommon.resizeIframe(); 
});


