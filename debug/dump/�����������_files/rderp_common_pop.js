//==================================================================
// �����˾� ȣ��
//==================================================================
var rtnUniqueTimePop="";
if (rtnUniqueTimePop == "") rtnUniqueTimePop=rtnUniqueTime();

/*******************************************************************
 * ���������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0001_01_view.jsp, rtask_0001_01.js
 ******************************************************************/
rderp.common.popSupOrgInfo = function(params){
	if(params == null || params == undefined) params = {};

	gw.common.jexNewWin("/rcomm_0001_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ���������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0002_01_view.jsp, rtask_0002_01.js
 ******************************************************************/
rderp.common.popSupEntpInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0002_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * �����ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0012_02_view.jsp, rtask_0012_02.js
 ******************************************************************/
rderp.common.popExpCdInfo1 = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0003_01.act", rtnUniqueTimePop, 700,650, params);
};

/*******************************************************************
 * �����ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 *  - EXP_CATE_CD: �����з�(�ʼ� *)
 *  - IDX        : �ٰ��� ��츸
 * ���� : rtask_0003_01_view.jsp, rtask_0003_01.js
 ******************************************************************/
rderp.common.popExpCdInfo2 = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0003_02.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * �⺻�������� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0003_01_view.jsp, rtask_0003_01.js
 ******************************************************************/
rderp.common.popSlAccCdInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0005_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ���������� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0007_02_view.jsp, rtask_0007_02.js
 ******************************************************************/
rderp.common.popPrjNtfyInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0007_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ����������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY     : �˾� key(����)
 *  - RTN_FUNC    : �����Լ�(����)
 *  - SEARCH_TYPE : ����(����) - A:�Ϲ�, B:�����η�
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popPersonInfo = function(params){
	//alert(JSON.stringify(params))
	gw.common.jexNewWin("/rcomm_0008_01.act", rtnUniqueTimePop, 700, 570, params);
};

/*******************************************************************
 * ������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	: �˾� key(����)
 *  - GUBUN		: �����������뿩��(����)
 *  - SEARCH_NM	: �˻���(����)
 *  - RTN_FUNC	: �����Լ�(����)
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popPrjInfo = function(params){
	if(params == null || params == undefined) params = {};
	params["MENU_SEQ" ] = rderp_menu_seq;
	gw.common.jexNewWin("/rcomm_0009_03.act", rtnUniqueTimePop, 700, 550, params);
};

/*******************************************************************
 * �μ����� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rinsu_0003_01_view.jsp, rinsu_0003_01.js
 ******************************************************************/
rderp.common.popDeptInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0010_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ��������� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0006_01_view.jsp, rtask_0006_01.js
 ******************************************************************/
rderp.common.popUserGrpInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0011_01.act", rtnUniqueTimePop, 700,630, params);
};

/*******************************************************************
 * ������û������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0009_02_view.jsp, rtask_0009_02.js
 ******************************************************************/
rderp.common.popPrjApplInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0012_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * �Ѱ�������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0010_02_view.jsp, rtask_0010_02.js
 ******************************************************************/
rderp.common.popSumupPrjInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0014_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * �������������ȣ��ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0010_02_view.jsp, rtask_0010_02.js
 ******************************************************************/
rderp.common.popRndPrjInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0016_01.act", rtnUniqueTimePop, 680,560, params);
};

/*******************************************************************
 * �ŷ�ó��ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0010_02_view.jsp, rtask_0010_02.js
 ******************************************************************/
rderp.common.popBaCustInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0017_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0010_02_view.jsp, rtask_0010_02.js
 ******************************************************************/
rderp.common.popFnAcctInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0018_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ����� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - BIZ_AUTH   : 2:������� 9:��ü 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rinsu_0003_01_view.jsp, rinsu_0003_01.js
 ******************************************************************/
rderp.common.popBaSiteInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0019_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ȸ�������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0011_01_view.jsp, rtask_0011_01.js
 ******************************************************************/
rderp.common.popBaAcctInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0020_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * R&Dī�����ڵ���ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0012_02_view.jsp, rtask_0012_02.js
 ******************************************************************/
rderp.common.popRndCardInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0021_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * �ǹ�/ȣ����ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rcomm_0025_01_view.jsp, rcomm_0025_01.js
 ******************************************************************/
rderp.common.popBdRoomInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0023_01.act", rtnUniqueTimePop, 700,560, params);
};

/*******************************************************************
 * ����ó������ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - SEARCH_GB1 : �ŷ�ó(0),�μ�(2) ����(����)
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popProvAcctInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0024_01.act", rtnUniqueTimePop, 700, 580, params);
};

/*******************************************************************
 * �����ɺ� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popTripOrdInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0027_01.act", rtnUniqueTimePop, 680,690, params);
};

/*******************************************************************
 * ȸ�Ƿ� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popCfrcPursInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0028_01.act", rtnUniqueTimePop, 680,690, params);
};

/*******************************************************************
 * �����η���ȸ �˾� ȣ��
 * parameters
 *  - PRJ_NO     : ������ȣ(�ʼ�*)
 *  - PRJ_NM     : ������(�ʼ�*)
 *  - POP_KEY    : �˾� key(����)
 *  - CHK_GB     : ����(1),����(2)����(����)
 *  - REQ_SEQ_NO : �����Ϸù�ȣ(����)
 *  - RTN_FUNC   : �����Լ�(����)
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popPartHmInfo = function(params){
	gw.common.jexNewWin("/rcomm_0029_01.act", rtnUniqueTimePop, 700, 550, params);
};

/*******************************************************************
 * �����ڵ� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0018_02_view.jsp, rtask_0018_02.js
 ******************************************************************/
rderp.common.popNationInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0038_01.act", rtnUniqueTimePop, 500,440, params);
};

/*******************************************************************
 * �⺻�����׸� �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rtask_0003_01_view.jsp, rtask_0003_01.js
 ******************************************************************/
rderp.common.popBudgetInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0039_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ��û(����)�˾� ȣ��
 * parameters
 *  - BASE_APPRLINE_STGUP : �⺻���缱����(�ʼ�*)
 *  - APPR_DEPT_CD		  : ����μ��ڵ�(�ʼ�*)
 *  - PRJ_NO			  : ������ȣ(�ʼ�*)
 *  - POP_KEY			  : �˾� key(����)
 *  - RTN_FUNC			  : �����Լ�(����)
 * ���� : rexpe_0001_01_view.jsp, rexpe_0001_01.js
 ******************************************************************/
rderp.common.popApprInfo = function(params){
	gw.common.jexNewWin("/rcomm_0043_01.act", rtnUniqueTimePop, 400, 350, params);
};

/*******************************************************************
 * ��ǰ�з���ȸ �˾� ȣ��
 * parameters
 *  - POP_KEY	 : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����)
 *  - RTN_FUNC	 : �����Լ�(����)
 * ���� : rcomm_0026_01_view.jsp, rcomm_0026_01.js
 ******************************************************************/
rderp.common.popItemCateInfo = function(params){
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rcomm_0047_01.act", rtnUniqueTimePop, 750,630, params);
};

/*******************************************************************
 * �����ڵ� �˾� ȣ��
 * parameters
 *  - DIV_GRP_CD : �׷��ڵ�(�ʼ� *)
 *  - POP_KEY    : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC   : �����Լ�(����)
 * ���� : rtask_0051_01_view.jsp, rtask_0051_01.js
 ******************************************************************/
rderp.common.popCommCodeInfo = function(params) {
    if(params == null || params == undefined) params = {};
    gw.common.jexNewWin("/rcomm_0051_01.act", rtnUniqueTimePop, 700,550, params);
};

/*******************************************************************
 * ��񺯰���ذ��� �˾� ȣ��
 * parameters
 *  - PRJ_NO     : ������ȣ(�ʼ� *)
 *  - POP_KEY    : �˾� key(����)
 *  - NON_BTN_YN : ���þ�������(����) 
 *  - RTN_FUNC   : �����Լ�(����)
 * ���� : rtask_0052_01_view.jsp, rtask_0052_01.js
 ******************************************************************/
rderp.common.popExpensesUpdMgr = function(params) {
	if(params == null || params == undefined) params = {};
    gw.common.jexNewWin("/rcomm_0052_01.act", rtnUniqueTimePop, 830,380, params);
};

/*******************************************************************
 * ������/�����ѵ�üũ �˾� ȣ��
 * parameters
 *  - USEFAC_SEQ_NO : �̿�������(����)
 *  - PRJ_NO        : ������ȣ(�ʼ� *)
 *  - REQ_CNT       : ��û����(�ʼ� *) 
 * ���� : rtask_0013_01_view.jsp, rtask_0013_01.js
 ******************************************************************/
rderp.common.popPartPayLmtChk = function(params) {
	if(params == null || params == undefined) params = {};
	gw.common.jexNewWin("/rtask_0013_07.act", rtnUniqueTimePop, 800,380, params);
};