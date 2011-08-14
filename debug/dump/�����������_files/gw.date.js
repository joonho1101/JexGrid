var gw;
if(!gw) gw={};
if(!gw.date) gw.date={};


if (typeof(JSON) === 'undefined') {
	document.write('<script type="text/javascript" src="js/json2.js"></script>');
}

if(typeof(Date.parseExact) === "undefined") {
	document.write('<script type="text/javascript" src="js/date-ko-KR.js"></script>');
}


gw.date.format = function(dateStr, fromFormat, toFormat) {
	try {
		dateStr = Date.parseExact($.trim(dateStr), fromFormat).toString(toFormat);
	}
	catch(e) {
		//alert(e);
	}
	
	return dateStr;
}



/********************************************************************
 * ��ġ�� �Ⱓ���� ��
 * �񱳴�� �������ڰ� �������ڿ� �������� ���̿� ���� �ʰ�
 * �񱳴�� �������ڰ� �������ڿ� �������� ���̿� ���� �ʾƾ� ��.
 *********************************************************************/
gw.date.isOverlapTerm = function(srcStartDate, srcStartTime, srcEndDate, srcEndTime, tgtStartDate, tgtStartTime, tgtEndDate, tgtEndTime) {

	var isOvelap = false;
	var srcStartDt = "";
	var srcEndDt = "";
	var tgtStartDt = "";
	var tgtEndDt = "";

	try {
		srcStartDt = Date.parseExact(srcStartDate + srcStartTime, 'yyyyMMddHHmmss');
	}
	catch(e) {
		srcStartDt = Date.parseExact(srcStartDate + "000000", 'yyyyMMddHHmmss');
	}

	try {
		srcEndDt = Date.parseExact(srcEndDate + srcEndTime, 'yyyyMMddHHmmss');
	}
	catch(e) {
		srcEndDt = Date.parseExact(srcEndDate + "000000", 'yyyyMMddHHmmss');
	}

	try {
		tgtStartDt = Date.parseExact(tgtStartDate + tgtStartTime, 'yyyyMMddHHmmss');
	}
	catch(e) {
		tgtStartDt = Date.parseExact(tgtStartDate + "000000", 'yyyyMMddHHmmss');
	}

	try {
		tgtEndDt = Date.parseExact(tgtEndDate + tgtEndTime, 'yyyyMMddHHmmss');
	}
	catch(e) {
		tgtEndDt = Date.parseExact(tgtEndDate + "000000", 'yyyyMMddHHmmss');
	}

	// �񱳴�� �������ڰ� �������ڿ� �������� ���̿� ������ false
	if(tgtStartDt.between(srcStartDt, srcEndDt)) {
		isOvelap = true;
	}

	// �񱳴�� �������ڰ� �������ڿ� �������� ���̿� ������ false
	if(tgtEndDt.between(srcStartDt, srcEndDt)) {
		isOvelap = true;
	}

	return isOvelap;
}