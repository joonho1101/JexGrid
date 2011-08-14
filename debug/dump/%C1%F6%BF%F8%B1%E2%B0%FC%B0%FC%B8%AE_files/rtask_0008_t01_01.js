var grid;
var colDefs         = [];
var gridOptions     = rderp.grid.getDefaultOptions();

var rtask_0008_t01_01                   = {};
rtask_0008_t01_01.subContents           = {};
rtask_0008_t01_01.subContents.openYn    = {};

var sumupPrjNo = "";
var prjNo = "";
var anl   = "";

$(function() {
    //parent.resizeFrameHeight(900);
	
	/*** ���� ����� or ������ �ϰ�쿡�� �����ش�. ***/
	if($("#_GWM01_YN").val() == "Y" || $("#_B0007_YN").val() == "Y"){
		$("#btnSumupPrjModify").attr("style","display:visible");
		$("#btnPrjInfoModify").attr("style","display:visible");
		$("#btnPrjEvmSetUp").attr("style","display:visible");
	}

    // location ����
    parent.$("#content").find(".content_box").find("#location").html("�������� &gt ������������ &gt �������� &gt �⺻����");

    fn_makeGrid();

    /**************************************************************************
     * �������� �ε�  �̺�Ʈ��
     **************************************************************************/
    if(parent.gPrjInfo != null) {
    	sumupPrjNo = parent.$("#SUMUP_PRJ_NO").val();
    	prjNo   = parent.$("#PRJ_NO").val();
        anl     = parent.$("#P_ANL").val();
		
        fnSelect();
    }

    /**************************************************************************
     * ������������ ��ư Ŭ�� �̺�Ʈ��
     **************************************************************************/
    $("#btnPrjInfoModify").click(function() {
        if(prjNo == "") {
            alert("��ȸ�� ������ �����ϴ�. ���� ������ ������ �ּ���.");
            return;
        }
        parent.parent.openTab("menu_id_82", "������������", "/rtask_0010_02.act?DETAIL_MODE=2&selPrjNo="+prjNo);
    });

    /**************************************************************************
     * �Ѱ��������� ��ư Ŭ�� �̺�Ʈ��
     **************************************************************************/
    $("#btnSumupPrjModify").click(function() {
        if(prjNo == "") {
            alert("��ȸ�� ������ �����ϴ�. ���� ������ ������ �ּ���.");
            return;
        }
        parent.parent.openTab("menu_id_81", " �Ѱ���������", "/rtask_0009_02.act?DETAIL_MODE=2&selSumupPrjNo="+sumupPrjNo);
    });
   
    /**************************************************************************
     * ����ȯ�漳�� ��ư Ŭ�� �̺�Ʈ��
     **************************************************************************/
    $("#btnPrjEvmSetUp").click(function() {
        if(prjNo == "") {
            alert("��ȸ�� ������ �����ϴ�. ���� ������ ������ �ּ���.");
            return;
        }
        //if ($("").find("#menu_id_83").length > 0) {
        //    var yn = confirm("�̹� �����ϴ°���ȯ�漳���� ����Ǿ��ֽ��ϴ�. �ش� ����ȯ�漳�� ���� �̵� �Ͻðڽ��ϱ�?");
        //    if (yn){
                parent.parent.openTab("menu_id_83", "����ȯ�漳��", "/rtask_0011_01.act?selPrjNo="+prjNo);
        //    }
        //}
    });
	$("#BtnCardReq").click(function() {
		parent.parent.openTab("menu_id_100", "����ī��߱޽�û", "/rexpe_0011_01.act");
	});
	/*************************************************
     * �⺻���� ���÷���
     **************************************************/
	/*
    $("#a_info").toggle(function(e) {
        e.preventDefault();
        $("#div_info1_cont").show();
        $(this).find("img").attr("src", "img/comm/button/btn_upmore.gif");
        rtask_0008_t01_01.subContents.openYn[$(this).attr("id")] = true;
    }, function(e) {
        e.preventDefault();
        $("#div_info1_cont").hide();
        $(this).find("img").attr("src", "img/comm/button/btn_dnmore.gif");
        rtask_0008_t01_01.subContents.openYn[$(this).attr("id")] = false;
    });
    */
	/*************************************************
     * ����ī��߱޳��� ���÷���
     **************************************************/
	/*
    $("#b_info").toggle(function(e) {
        e.preventDefault();
        $("#div_info2_cont").show();
        $(this).find("img").attr("src", "img/comm/button/btn_upmore.gif");
        rtask_0008_t01_01.subContents.openYn[$(this).attr("id")] = true;
        
    	parent.resizeFrameHeight($(document.body).find("div:first").height());
    }, function(e) {
        e.preventDefault();
        $("#div_info2_cont").hide();
        $(this).find("img").attr("src", "img/comm/button/btn_dnmore.gif");
        rtask_0008_t01_01.subContents.openYn[$(this).attr("id")] = false;

    	parent.resizeFrameHeight($(document.body).find("div:first").height());
    });
    */
});
//�������� renderer
function renAcctDivCd(value) {
    var option  = $("#selAcctDivCd option");
    var result  = "10";

    for(var i=0 ; i < option.length ; i++) {
        if(option[i].value == voidChk(value,"10")) {
            result = option[i].text;
            break;
        }
    }

    return result;
}
//�ֹι�ȣ renderer
function renSsn(value) {
    return value.substring(0,6) + '-*******' ;
}
function fn_makeGrid() {
    /*************************************************
     * ù��°�׸��� ����-->
     **************************************************/
    gridOptions.ViewportManager = {rowsPerPage: 6, rowH: 20,   autoColWEnabled: true};
    gridOptions.DataManager = {};
    gridOptions.SelectionManager = {};

    //��������� ������
    //�������� selectbox
    var selAcctDivCd =JGM.create("Editor", {
        edit : function() {
            var selectboxHtml = "<select style='width:120px;'>";
                selectboxHtml += $("#selAcctDivCd").html();
                selectboxHtml += "</select>";
            return selectboxHtml;
        }
    });

    //�׸��� �÷� ���� (������������)
    colDefs = [
        {key:"ROW_SEQ"     			,name:"No"		,width:50		,colClass:"t_center",  renderer:   function(value, rowIdx, colIdx, datarow, colDef, viewMgr) {return ++rowIdx;}},
        {key:"RES_NM"               ,name:"���"		,width:100      ,colClass:"t_center"},
        {key:"MNG_ACCT_DIV_CD"      ,name:"���±���"	,width:120   	,editor:selAcctDivCd, renderer:renAcctDivCd, colClass:"t_left"},
        {key:"MNG_ACCT_BNK_NM"      ,name:"���³���"	,width:200   	,colClass:"t_left"},
        {key:"ACCT_NICK_NM"     	,name:"���� ��Ī"	,width:200   	,colClass:"t_center"},
        {key:"MNG_RMK"              ,name:"���"		,width:400      , colClass:"t_left"}
    ];

    //�׸��� ����
    grid  = JGM.grid({ container:$("#myGrid") , options:gridOptions, colDefs:colDefs });

    //����Ŭ���̺�Ʈ����
    grid.event.register({e:"dblclickCanvas",f:function(e,cell) {

    },t : this});

    grid.event.register({e:"onBeforeUpdateDatarow", f:function(dataRow, change) {
        if(typeof(console) == "undefined") {

        } else {
            console.log(dataRow,change);
            change.title = 'asdfasdf';
        }
    },t : this});
}
/***************************************
* �Ѱ������󼼳���  select
***************************************/
function fnSelect() {
    var input = {};

    input['PRJ_NO'] = prjNo;
    input['USEFAC_SEQ_NO'] = gUsefacSeqNo; //�̿��������� �׻� gUsefacSeqNo �� �޾ƿ´�.

    //��������
    jex.web.Ajax("rtask_0008_t01_01_r001", input, function(dat) {
        $("#PRJ_SUP_ORG_NM"    ).html(voidChk(dat.PRJ_SUP_ORG_NM,""));
		$("#DTL_SUP_ORG_NM"    ).html(voidChk(dat.DTL_SUP_ORG_NM,""));
		if(voidChk(anl, "") != "") {
			$("#SPAN_ANL").html(anl+"�� ");
		}
        $("#PRJ_SUP_ENTP_NM"   ).html(voidChk(dat.PRJ_SUP_ENTP_NM,""));
        $("#PRJ_PROG_STS_NM"   ).html(voidChk(dat.PRJ_PROG_STS_NM,""));
        $("#SUMUP_RCH_DT"      ).html(voidChk(dat.SUMUP_RCH_DT,""));
        if(voidChk(dat.PRJ_END_DT,"") == "--") {
            $("#PRJ_END_DT"        ).html("");
        } else {
            $("#PRJ_END_DT"        ).html(voidChk(dat.PRJ_END_DT,""));
        }
        $("#PRJ_RCH_DT"        ).html(voidChk(dat.PRJ_RCH_ST_DT,"")+" ~ "+voidChk(dat.PRJ_RCH_END_DT,""));
        $("#PRJ_DEPT_NM"       ).html(voidChk(dat.PRJ_DEPT_NM,""));
        $("#MGT_ORG_NM"        ).html(voidChk(dat.MGT_ORG_NM,""));
        $("#PRJ_CHRG_GRP_NM"   ).html(voidChk(dat.PRJ_CHRG_GRP_NM,""));
        $("#PRJ_CARD_DIV_NM"   ).html(voidChk(dat.PRJ_CARD_DIV_NM,""));
        $("#PRJ_CARD_DIV_CD"   ).html(voidChk(dat.PRJ_CARD_DIV_CD,""));
        $("#PRJ_SUP_ORG_PRJ_NO").html(voidChk(dat.PRJ_SUP_ORG_PRJ_NO,""));
        $("#PRJ_DPMNS_BIZ_NM"  ).html(voidChk(dat.PRJ_DPMNS_BIZ_NM,""));
        $("#SUMUP_PRJ_KR_NM"   ).html(voidChk(dat.SUMUP_PRJ_KR_NM,""));
        $("#UP_SUMUP_PRJ_NM"   ).html(voidChk(dat.UP_SUMUP_PRJ_NM,""));
    },"jct",true);

    fnSelectDetail(input);
}

/***************************************
* �Ѱ������󼼳���  select
***************************************/
function fnSelectDetail(input) {
    //������������

    //������ ����
    jex.web.Ajax("rtask_0010_02_r003", input, function(dat) {
        grid.dataMgr.set(dat.REC);
        if(dat.REC.length < 1) {
            //jex.web.info("RDWM0001");
        }
    },"jct",true);

    /*
    jex.web.Ajax("rtask_0010_02_r003", input, function(dat) {
        var data = null;

        for( idx=0 ; idx<dat.REC.length ; idx++) {
            var d = {};
            d["SEQ_NO"]        = dat.REC[idx].SEQ_NO;//����
            d["ACCT_DIV_CD"]   = dat.REC[idx].ACCT_DIV_CD;
            d["TOT_NM"]        = dat.REC[idx].MNG_BNK_NM+" "+dat.REC[idx].MNG_ACCT_NO+" "+dat.REC[idx].MNG_ACCT_OWNR_NM;
            d["RMK"]            = dat.REC[idx].RMK;
            data.push(d);
        }
        alert(dat.REC);
        grid.dataMgr.set(dat.REC);
    },"jct",true);
    */

    return;
}

/***************************************
* div ��ħ/���� �̺�Ʈ 
***************************************/
fn_divDisplay = function(obj){
	var addhight = 20;
	if($("#"+obj).css("display")=="none"){
		uf_divShow(obj);
	}
	else{
		uf_divHidden(obj);
	}

	parent.resizeFrameHeight($(document.body).find("div:first").height()+addhight);
};


$(document).ready(function(){
	parent.resizeFrameHeight($(document.body).find("div:first").height()+20);
});

/*
$(document).ready(function(){
    //ȭ��  Tab ��ũ�� resize
	var h = $(document.body).find("div:first").height();
	parent.resizeFrameHeight(h);
});
*/