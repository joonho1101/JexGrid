
var grid;
var colDefs     = [];
var gridOptions = rderp.grid.getDefaultOptions();

var mode    = "";
var updPop  = "N";
var data    = [];
var params  = {};

$(function() {
    
    /***********************************************************
     * Ÿ��Ʋ ����
     **********************************************************/
    TitleSearch();
   
    /***********************************************************
     * �׸��� ����
     **********************************************************/
    fnMakeGrid();

    /***********************************************************
     * �˻� ��ư
     **********************************************************/
    $("#btn_search").click(function() {
        if($("#SEARCH_NM").val() == "(�׸��ڵ� / �׸��)") {
            $("#SEARCH_NM").val("");
        }

        gridSearch();
    });

    /*******************************************************************
     * ���þ��� Ŭ�� �̺�Ʈ
     ******************************************************************/
    $("#btn_s_blank").click(function() {
        grid.selMgr.selectRow(JGM.create("Cell", {grid:grid, row:0, col:0}));
/**
        params = {};

        if(typeof eval("opener."+$("#RTN_FUNC").val()) != "undefined") {
            eval("opener."+$("#RTN_FUNC").val()+"("+$("#POP_KEY").val()+", params)");
        }
        self.close();
**/        
    });

    /*******************************************************************
     * ����Űó��
     ******************************************************************/
    $("#SEARCH_NM").keypress(function(e) {
        if(e.keyCode == "13") {
            e.preventDefault();
            $("#btn_search").click();
            return false;
        }
     });

    /***********************************************************
     * üũ�ڽ� ���õ� ����Ʈ ������
     **********************************************************/
    $("#btnSave").click(function(e) {
 //       var jsonREC = grid.checkMgr.getCheckList();
        
//        if(jsonREC.length < 1) {
//            alert("���õ� ������ �����ϴ�.");
//            return;
//        }
//        
//        var input = {
//              "EXT1"          : jsonREC[0].EXT1,
//                "DIV_GRP_CD"  : jsonREC[0].DIV_GRP_CD,
//                "DIV_ITEM_CD" : jsonREC[0].DIV_ITEM_CD
//            };
        var input = {};
        
        var REC = new Array();
        var datRec = grid.dataMgr.all;
        for(var idx=0;idx<datRec.length;idx++){
            REC.push( {
                EXT1          : datRec[idx].EXT1,
                DIV_GRP_CD    : datRec[idx].DIV_GRP_CD,
                DIV_ITEM_CD   : datRec[idx].DIV_ITEM_CD
            });
        }
        input['REC'                 ] = REC;
        
        if(jex.web.confirm("���� �Ͻðڽ��ϱ�?")){  
            jex.web.Ajax("rcomm_0053_01_u001"
                , input
                , function(dat) {
                    
                    alert("���� �Ǿ����ϴ�.");
                    //��� ����Ʈ ����ȸ 
                     gridSearch();
                },"jct",true);
        }
       
    });

    /*���þ��� ��ư ǥ�� ����ó��*/
    if($("#NON_BTN_YN").val() == "Y") {
        $("#btn_s_blank").css("display", "");
    }

});

/***************************************
* Ÿ��Ʋ ��ȸ
***************************************/
function TitleSearch() {
    var input = {
        "DIV_GRP_CD" : $("#DIV_GRP_CD").val()
    };

    jex.web.Ajax("rcomm_0051_01_r001", input, function(dat) {
        if(!jex.web.isError(dat)) {
            $("#TITLE_NAME").html(dat.DIV_GRP_NM+"��ȸ");
        } else {
            $("#TITLE_NAME").html("�����ڵ���ȸ");
        }
    },"jct");
}

function fnMakeGrid() {
     
    gridOptions = rderp.grid.getDefaultOptions();
    gridOptions.ViewportManager = {rowsPerPage: 15,    rowH: 20,    autoColWEnabled: false};
    //gridOptions.Collapser = {key:"BGT_ITEM_CD",Tree: {nodeKey:"BGT_ITEM_CD", parentKey:"BGT_ITEM_CD_UP"}};
    gridOptions.EditManager = {};
    gridOptions.SelectionManager = {};
//    gridOptions.CheckManager = {isRadio:true};
    
    //��������� ������
    //�������� selectbox
    var ext1 =JGM.create("Editor", {
        edit : function(value) {
            var rtnHTML = "";
            var option  = $("#ext1 option");
            
            rtnHTML += "<option class='generated' value='1'>one</option>";
            rtnHTML += "<option class='generated' value='2'>two</option>";
            rtnHTML += "<option class='generated' value='0'>three</option>";

            for(var i=0 ; i < option.length ; i++){
                if(option[i].value == voidChk(value,"10")){
                    rtnHTML += "<option class='generated' selected value='"+option[i].value+"'>" + option[i].text + "</option>";
                } else {
                    rtnHTML += "<option class='generated' value='"+option[i].value+"'>" + option[i].text + "</option>";
                }
            }

            var selectboxHtml = "<select style='width:180px;'>";
                selectboxHtml += rtnHTML;
                selectboxHtml += "</select>";
            return selectboxHtml;
        }
    }); 
    //�������� renderer
    function renEvdiAttDivCd(value){
        var option  = $("#ext1 option");     
        var result  = "";
        for(var i=0 ; i < option.length ; i++){
            if(option[i].value == voidChk(value,"10")){
                result = option[i].text;
                break;
            }
        }
        return result;      
    }
    //�ؽ�Ʈ ������
    var textEditor = JGM.create("Editor", {});  

    colDefs = [
        {key:"DIV_ITEM_CD"      ,name:"�ҼӺ�ó�ڵ�"  ,width:80   ,colClass:"t_center"    ,sorter:"text"},
        {key:"DIV_ITEM_NM"      ,name:"�ҼӺ�ó��"   ,width:200  ,sorter:"text"},
        {key:"EXT1"             ,name:"�����ó��"   ,width:180  ,editor:ext1, renderer:renEvdiAttDivCd, colClass:"t_left" , resizeble:false},
        {key:"DIV_GRP_CD"       ,hidden:true}
    ];

    grid = JGM.grid({ datalist: jctdata.REC, container:$("#myGrid"),  colDefs:colDefs,  options:gridOptions  });

   
    /***********************************************************
     * Ŭ���̺�Ʈ����
     **********************************************************/
    /**
    grid.event.register({e:"clickCanvas",f:function(e,cell) {
        params = cell.getDatarow();
        grid.checkMgr.check(params);
    },t : this});
    **/

}

/***************************************
* ����Ʈ ��ȸ
***************************************/
function gridSearch() {

    var input = {
        "ACT_YN"      : 'Y'
        ,"SEARCH_NM"  : $("#SEARCH_NM").val()
        ,"DIV_GRP_CD" : $("#DIV_GRP_CD").val()
    };

    jex.web.Ajax("rcomm_0051_01_r002", input, function(dat) {
        if(!jex.web.isError(dat)){
            grid.dataMgr.set(dat.REC);
        }
    },"jct");
}

/***************************************
* �⺻�����׸��˾�
***************************************/
function uf_rcomm_0051_01Params() {
    var checkedList = grid.checkMgr.getCheckList();

    if(checkedList.length < 1) {
        alert("���õ� ������ �����ϴ�.");
        return;
    }

    // ����ȭ�鿡 �Լ� �����
    if($("#RTN_FUNC").val() != "") {
        if(typeof eval("opener."+$("#RTN_FUNC").val()) != "undefined") {
            eval("opener."+$("#RTN_FUNC").val()+"("+$("#POP_KEY").val()+", params)");
        }
    }

    self.close();
}

