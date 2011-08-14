
var rderp;
if(!rderp) rderp={};



if(!rderp.grid) rderp.grid={};

if(typeof(rderp.common) == "undefined") {
	document.write('<script type="text/javascript" src="rderp_common.js"></script>');
}

/**************************************************
 * ���������a �Ʃ�Ae ��E��C ��A��A
 *************************************************/
rderp.grid.getDefaultOptions = function(sortId) {
	return {
		width: "100%",
//		cssGrid: "hahahah",
		border: "1px solid #999",
		font: "12px",
//		footerEnabled: true,
//		EditManager: {},
		ColHeader: {
			reorderEnabled: true,
			reorderSyncEnabled:true,
			background: "#dde4ec repeat-x center bottom",
// 			sortBackground:"img/jexgrid/sort.png",
// 			sortBackgroundAsc:"img/jexgrid/sort-asc.png",
// 			sortBackgroundDesc:"img/jexgrid/sort-desc.png",	
			classColHeader  : "grid-colHeader",
			resizeHandleBackground: "",
			font: "12px"
//			headerStyle: "padding : 1px, 5px, 5px, 1px; border-bottom: 1px solid silver; color : #637b97;"
		},
		ColDefManager: {
			colDef: {
				resizable: true,
				width: 100
			}
		},
		ViewportManager: {
			rowsPerPage: 20,
			rowH: 20,
			autoColWEnabled: false,
	        evenOddRows: true
		},
//		DataManager: {
//			idColKeys:[sortId]
//		},
		SelectionManager:{
			//bgColorSelection:"red"			
		}
//		Footer:{}
	};
};


/*******************************************************************************
 * jex_web.js
 * 
 * ������ input tag�� jex_web.js���� ������ Attribute�� ���Խ�ų��� �ش� form��
 * CSS����(notnull='true' �� ������ ��) �� Form�� Submit �ɶ� validation�� üũ�Ѵ�.
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
 * - maxLength='���������Ǳ���'	: �ش��׸� �Է°��� ���̰� value ���� ũ�� ����
 * - format='date'				: 8�ڸ� ������ ��¥����- yyyy:mm:dd ���� yyyy,mm,dd �� ���ԵǾ� �ִ� �����̸� ��� �����
 *                                �������� ��¥�� �ƴҰ�� ����
 * - format='submit'            : form ���� ������Ʈ�� �� Attribute �� �����ϸ� <input type='submit'>�� Ŭ���ѰͰ� ������ �̺�Ʈó�����ȴ�.
 * - format='number'            : +/-�� ������ ���ڸ� �Է°���(submit�� üũ)
 * - format='number2'           : input�� (0~9)���ڸ� �Է��Ҽ��ִ�.(�Է½� üũ�ؼ� ����)
 * - format='number3'           : input�� (0~9)���ڸ� �Է��Ҽ��ִ�.(�Է½� üũ�ؼ� ����)
 * - format='engNum'            : ���ڿ� �����ڸ� �Է°���
 * - format='engNum2'           : ���ڿ� ������ ������(-) �Է¸� �Է°���
 * - format='resRegNo1'         : �ֹε�Ϲ�ȣ ���ڸ� �˻�. �ڸ���(6�ڸ�)�� ���ڿ��θ� �˻��Ѵ�.
 * - format='resRegNo2'         : �ֹε�Ϲ�ȣ ���ڸ� �˻�. �ڸ���(7�ڸ�)�� ���ڿ��θ� �˻��Ѵ�.
 * - format='resRegNo'          : �ֹε�Ϲ�ȣ �˻�. �ڸ���(13�ڸ�)�� ���ڿ��θ� �˻��Ѵ�.
 * - format='currency'          : ','�� '.'�� ������ �ݾ��������� �˻��Ѵ�.(.�� �ΰ��̰ų� ���ڰ� �ƴѰ��� �ְų� �ϸ� ����)
 * - format='accountNo'         : ���¹�ȣ�˻�. �����Է¸� �����
 * - format='accountNo2'		: ���¹�ȣ�˻�. ���ڿ� ������(-) �Է¸� �����
 *                                
 ************************************************************/

var jex;
var _jex_debugMod = false;
var _jex_isMobile = false;

if (!jex)
	jex = {};
if (!jex.web)
	jex.web = {};
jex.web.testMode = false;// ���� ������ �ø��� false �� �����ؾ���
jex.web.isSecurityModule = false;// ���ȸ�� ��뿩��:���ȸ�⿡�� ����ϴ� ����� �Լ��� ������� true�ϰ�
									// �ش� �κ��� �����ؾ���
jex.web.format = {};
jex.web.form = {
	errorYn : false // validation ��������
	,
	submitYn : false
}; // submit ������ ����
jex.web.form.event = {};
jex.web.form.check = {};

jQuery.ajaxSetup( {
	'beforeSend' : function(xhr) {
		xhr.setRequestHeader("charset", "utf-8");
	}
});

jex.web.isMobile = function() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf('iphone') != -1 || agent.indexOf('android') != -1) _jex_isMobile = true;
    return _jex_isMobile;
};

/**
 * �ʼ��Է��׸��� null üũ Attribute : notnull='true'
 */
jex.web.form.check.isNotnull = function(selector) {
	if (jex.web.null2void($(selector).attr("notnull")).toLowerCase() == 'true') {
		// checkbox
		if ($(selector).attr("type") == "checkbox") {
			var _checkboxGroup = $(":checkbox[name*='"
					+ $(selector).attr("name") + "']:checked");

			if (_checkboxGroup.length < 1) {
				jex.web.alert("[" + $(selector).attr("fieldName")
						+ "] �׸��� �Ѱ� �̻� �������ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
		}
		// radio
		else if ($(selector).attr("type") == "radio") {
			if ($(":radio[name*='" + $(selector).attr("name") + "']:checked").length < 1) {
				jex.web.alert("[" + $(selector).attr("fieldName")
						+ "] �׸��� �ʼ� ���� �����Դϴ�.");
				jex.web.form.errorYn = true;
				return false;
			}
		}
		// selectbox
		else if ($(selector).attr("nodeName") == "SELECT") {
			if (!$(selector).find("option:selected").val()) {
				jex.web.alert("[" + $(selector).attr("fieldName")
						+ "] �׸��� �������ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
		} else {
			if (!$(selector).val()) {
				jex.web.alert("[" + $(selector).attr("fieldName")
						+ "] �׸��� �ʼ� �Է��Դϴ�.");
				jex.web.form.errorYn = true;
				return false;
			}
		}
	}
	return true;
};

/**
 * �ּұ���üũ Attribute : minLength='����'
 */
jex.web.form.check.isMinLength = function(selector) {
	if ($(selector).attr("minLength") == undefined)
		return true;
	// if( $(selector).attr("minLength")=="" ) return true;
	var minLength = parseInt($(selector).attr("minLength"));
	if (isNaN(minLength))
		return true;
	if ($(selector).val().length < minLength) {
		alert("[" + $(selector).attr("fieldName") + "] �׸��� " + minLength
				+ "�� �̻� �Է����ּ���.");
		jex.web.form.errorYn = true;
		return false;
	}
	return true;
};



/**
 * �ִ����üũ Attribute : maxLength='����'
 */
jex.web.form.check.isMaxLength = function(selector) {
	if ($(selector).attr("maxLengths") == undefined)
		return true;
	// if( $(selector).attr("minLength")=="" ) return true;
	var maxLength = parseInt($(selector).attr("maxLengths"));
	if (isNaN(maxLength))
		return true;
	var str =  $(selector).val();
	var sByte = 0;
	var sLen = 0;
	var sChar = "";

	for(var i = 0;i < str.length;i++ ){

		sChar = escape(str.charAt(i));
		if(sChar == null){
			sLen = 0;
		}else{
			if ( sChar.length == 1 ) { // when English then 1byte
				sLen = 1;
			} else if ( sChar.indexOf("%u") != -1 ) { // when Korean then 2byte
				sLen = 2;
			} else if ( sChar.indexOf("%") != -1 ) { // else 3byte
				sLen = sChar.length/3;
			}
		}
		sByte = eval(sByte) + sLen;
	}				
	if (sByte > maxLength) {
		alert("[" + $(selector).attr("fieldName") + "] �׸��� " + maxLength
				+ "�� ���Ϸ� �Է����ּ���.");
		jex.web.form.errorYn = true;
		return false;
	}
	return true;
};

/**
 * ����üũ Attribute : format
 */
jex.web.form.check.isFormat = function(selector) {
	// alert($(selector).attr("id"));
	var checkValue = $(selector).val();

	// format attribete�� �����Ǿ��־ notnull�� �ƴҼ��� �ֱ⶧����
	// ���� �ִ°�츸 üũ�Ѵ�.
	if (checkValue != null && checkValue != undefined && checkValue.length > 0) {
		switch (jex.web.null2void($(selector).attr("format")).toLowerCase()) {
		// ��¥����
		case "date":
			var result = jex.web.format.checkDate(checkValue);

			if (result) {
				alert("[" + $(selector).attr("fieldName") + "] �׸��� " + result);
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// ���ڰ���: +/-�� ������ �����Է°�
		case "number":
			if (isNaN(new Number(checkValue))) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� ���ڸ� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// �������ڰ���
		case "engnum":
			if (/[^a-zA-z0-9]/.test(checkValue)) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� ���� �Ǵ� ���ڸ� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// ��������'-'����
		case "engnum2":
			if (/[^a-zA-z0-9]/.test(checkValue.replace(/\-/g, ""))) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� ���� �Ǵ� ���� �Ǵ� ������(-)�� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;
		// �ݾװ���
		case "currency":
			checkValue = checkValue.replace(/,/g, '');
			if (isNaN(new Number(checkValue))) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸��� �ݾ��������� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// ���¹�ȣ���� : ���ڸ� ����Ѵ�.
		case "accountno":
			if (/[^0-9]/.test(checkValue)) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� ���ڸ� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// ���¹�ȣ���� : ����,������(-)�� ����Ѵ�
		case "accountno2":
			if (/[^0-9]/.test(checkValue.replace(/\-/g, ""))) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� ���� �Ǵ� ������(-)�� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// �ֹε�Ϲ�ȣ ���ڸ�: �ڸ���(6�ڸ�) �� ���ڿ��θ� �˻��Ѵ�.
		case "resregno1":
			if (/[^0-9]/.test(checkValue) || checkValue.length != 6) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� 6�ڸ��� ���ڸ� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// �ֹε�Ϲ�ȣ ���ڸ�: �ڸ���(7�ڸ�) �� ���ڿ��θ� �˻��Ѵ�.
		case "resregno2":
			if (/[^0-9]/.test(checkValue) || checkValue.length != 7) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� 7�ڸ��� ���ڸ� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;

		// �ֹε�Ϲ�ȣ: �ڸ���(13�ڸ�) �� ���ڿ��θ� �˻��Ѵ�.
		case "resregno":
			if (/[^0-9]/.test(checkValue) || checkValue.length != 13) {
				alert("[" + $(selector).attr("fieldName")
						+ "] �׸񿡴� 13�ڸ��� ���ڸ� �Է����ּ���.");
				jex.web.form.errorYn = true;
				return false;
			}
			break;
		}// end of switch
		
	}
	return true;
};

// ��¥���˰���
jex.web.format.checkDate = function(param) {
	if (param)
		param = $.trim(param);
	if (/[^0-9~!@\#$%<>^&*\()\-=+._\'\:\/]/gi.test(param))
		return "��¥�� Ȯ�����ּ���. ��¥������ �߸��Ǿ����ϴ�.";

	var inputDate = jex.web.null2void(param).replace(/[^0-9]/g, '');
//alert(inputDate);
	if (inputDate.length == 0)
		return false;
	if (inputDate.length != 8)
		return "��¥�� Ȯ�����ּ���. ��¥������ �߸��Ǿ����ϴ�.";

	var yyyy = inputDate.substring(0, 4);
	var mm = inputDate.substring(4, 6);
	var dd = inputDate.substring(6, 8);

	var date = new Date(yyyy, mm - 1, dd);
	var fullYear = date.getFullYear();
	var month = date.getMonth() + 1;
	if (String(month).length == 1)
		month = "0" + String(month);
	var day = date.getDate();
	if (String(day).length == 1)
		day = "0" + String(day);
	if (inputDate != (String(fullYear) + String(month) + String(day)))
		return "��¥�� Ȯ�����ּ���. �������� ��¥�� �ƴմϴ�.";
};

/**
 * setCSS(selector) : �ش� input�� css�� ������
 * 
 * @param1 : input Selector
 * @param2 : css class ��
 */
jex.web.form.setCss = function(selector, cssClass) {
	// $(selector).css({"background":"#E9EDFE", "border":"1px #E8001D solid"});
	$(selector).attr("class", cssClass);
};

/**
 * ������ selected �ڽ��� ���ڸ� �Էµ� ��/���� �ش��ϴ� ���ڷ� �����Ѵ�.
 */
jex.web.form.event.replaceSelectDd = function(selector, year, month) {
	$(selector).children().remove();

	var lastDate = jex.web.getLastDate(year, month);

	var value = "";
	for ( var i = 1; i <= lastDate; i++) {
		value = String(i).length == 1 ? "0" + String(i) : i;
		$(selector).append(
				"<option value='" + value + "'>" + value + "</option>");
	}
};

$(document)
		.ready(
				function() {

					$(document.body)
							.append(
									"<div style='position:absolute;top:30%;left:30%;' id='_Jex_loadingbar'><img src='img/comm/etc/loading.gif' alt='��ø� ��ٷ��ּ���.'/></div>");
					$("#_Jex_loadingbar").hide();
					
					if (!jex.web.isMobile()) {
						$(document).ajaxSend(function() {
							$("#_Jex_loadingbar").show();
						});
						$(document).ajaxSuccess(function() {
							$("#_Jex_loadingbar").fadeOut("slow");
						});
					}

					var formList = $("form");
					var form;
					$
							.each(formList, function(i, v) {
								form = $(this);

								// form �� CSS
								// ����--------------------------------------
									// form �� "css" Attribute �� "true" �� ������ ����
									// �����Ѵ�.
									if (jex.web.null2void($(this).attr("css"))
											.toLowerCase() == 'true') {
										// �ؽ�Ʈ�ڽ� css ����
										var textList = $(this).find(":text");
										$
												.each(
														textList,
														function(i, v) {
															if (jex.web
																	.null2void(
																			$(
																					this)
																					.attr(
																							"notnull"))
																	.toLowerCase() == 'true'
																	|| jex.web
																			.null2void($(
																					this)
																					.attr(
																							"minLength")) != "") {
																jex.web.form
																		.setCss(
																				$(this),
																				$(
																						form)
																						.attr(
																								"cssClass"));
															}
														});

										// Password css ����
										var textList = $(this)
												.find(":password");
										$
												.each(
														textList,
														function(i, v) {
															if (jex.web
																	.null2void(
																			$(
																					this)
																					.attr(
																							"notnull"))
																	.toLowerCase() == 'true'
																	|| jex.web
																			.null2void($(
																					this)
																					.attr(
																							"minLength")) != "") {
																jex.web.form
																		.setCss(
																				$(this),
																				$(
																						form)
																						.attr(
																								"cssClass"));
															}
														});

										// checkbox css ����
										var checkList = $(this).find(
												":checkbox");
										$
												.each(
														checkList,
														function(i, v) {
															if (jex.web
																	.null2void(
																			$(
																					this)
																					.attr(
																							"notnull"))
																	.toLowerCase() == 'true') {
																jex.web.form
																		.setCss(
																				$(this),
																				$(
																						form)
																						.attr(
																								"cssClass"));
															}
														});

										// radio css ����
										var checkList = $(this).find(":radio");
										$
												.each(
														checkList,
														function(i, v) {
															if (jex.web
																	.null2void(
																			$(
																					this)
																					.attr(
																							"notnull"))
																	.toLowerCase() == 'true') {
																jex.web.form
																		.setCss(
																				$(this),
																				$(
																						form)
																						.attr(
																								"cssClass"));
															}
														});

										// textarea css ����
										var textareaList = $(this).find(
												"textarea");
										$
												.each(
														textareaList,
														function(i, v) {
															if (jex.web
																	.null2void(
																			$(
																					this)
																					.attr(
																							"notnull"))
																	.toLowerCase() == 'true'
																	|| jex.web
																			.null2void($(
																					this)
																					.attr(
																							"minLength")) != "") {
																jex.web.form
																		.setCss(
																				$(this),
																				$(
																						form)
																						.attr(
																								"cssClass"));
															}
														});
									}// CCS ���� end

									// form submit ��ư
									// �̺�Ʈó��------------------------------------------
									// <input type='submit'> �� �̺�Ʈ �߻��� submit
									// �̺�Ʈ�� ��� �����Ѵ�.
									// form �� "autocheck" Attribute �� "true" ��
									// ������ ���� validation üũ�� �����ѵ�
									// ������ ��츸 submit ó�� �Ѵ�.
									$(this)
											.submit(
													function() {
														if (jex.web
																.null2void(
																		$(this)
																				.attr(
																						"autocheck"))
																.toLowerCase() == 'true') {
															if (!jex.web
																	.doSubmit(
																			$(
																					this)
																					.attr(
																							"id"),
																			true)) {
																return false;
															}
														} else {
															return jex.web
																	.doSubmit(
																			$(
																					this)
																					.attr(
																							"id"),
																			false);
														}
													});

									// form ������ ��翤����Ʈ�߿���
									// ----------------------------------------
									// format �� submit ���� ������ ������Ʈ�� Ŭ���̺�Ʈ�� �߻��ϸ�
									// submit�� ������.
									// form �� "autocheck" Attribute �� "true" ��
									// ������ ���� validation üũ�� �����ѵ�
									// ������ ��츸 submit ó�� �Ѵ�.
									$
											.each(
													$(this).find("*"),
													function(i2, v2) {
														if (jex.web
																.null2void(
																		$(this)
																				.attr(
																						"format"))
																.toLowerCase() == "submit") {
															$(this)
																	.click(
																			function() {
																				if (jex.web
																						.null2void(
																								$(
																										form)
																										.attr(
																												"autocheck"))
																						.toLowerCase() == 'true') {
																					jex.web
																							.doSubmit(
																									$(
																											form)
																											.attr(
																													"id"),
																									true);
																				} else {
																					jex.web
																							.doSubmit(
																									$(
																											form)
																											.attr(
																													"id"),
																									false);
																				}
																			});
														}
													});

								});// end of "$.each(formList, function(i,v)"

					/**
					 * type='svc'�� ������ select element �� ã�� �ش� ������ ȣ������ option
					 * element �� �����Ѵ�.
					 */
					var selectboxList = $("select[type='svc']");
					$.each(selectboxList, function(i, v) {
						var svc = $(this).attr("svc");// ������ID
							var input = $(this).attr("input");// �Է°�
							var selectedValue = $(this).attr("selectedValue");// selectbox��
																				// �⺻
																				// ���ð�
							// if(
							// !(selectedValue==undefined||selectedValue==null||selectedValue=='null')
							// ) selectedValue =
							// selectedValue.replace(/[^0-9]/g, "");

							// var selectbo= $(this);
							// var json = {};
							// if (jex.web.null2void(input) != "") eval("json =
							// "+input);
							// jex.web.Ajax(svc, json, function(dat) {
							// $.each(dat.REC, function(i,v) {
							// if( v.KEY==selectedValue )
							// selectbo.append("<option value='"+v.KEY+"'
							// selected>"+v.DAT+"</option>");
							// else selectbo.append("<option
							// value='"+v.KEY+"'>"+v.DAT+"</option>");
							// });
							// },"jct", "1");

							jex.web.setSelectBox(svc, input, selectedValue,
									$(this), null);

						}); // end of $.each(selectboxList, function(i,v)

					/**
					 * type='RADIO'�� ������ DIV element �� ã�� �ش� ������ ȣ������ INPUT
					 * element �� �����Ѵ�.
					 */
					var radioBoxList = $("div[type='radio']");
					$.each(radioBoxList, function(i, v) {
						var svc = $(this).attr("svc");// ������ID
							var input = $(this).attr("input");// �Է°�
							var radioNm = $(this).attr("radioNm");// �Է°�
							var selectedValue = $(this).attr("selectedValue");// selectbox��
																				// �⺻
																				// ���ð�

							jex.web.setRadioBox(svc, input, selectedValue,
									$(this), null, radioNm);

						}); // end of $.each(selectboxList, function(i,v)

					/**
					 * type='jex.selectYearMonth'�� ������ select box�� ã�� "yyyy��
					 * mm��" ����Ʈ�ڽ��� �׸���.
					 */
					var selectYearMonth = $("select[type='jex.selectYearMonth']");
					if (selectYearMonth.length > 0) {
						var currentDate = jex.web.getServerDate("yyyymmdd");
						var currentYear = currentDate.substring(0, 4);
						var currentMonth = currentDate.substring(4, 6);
						var currentDay = currentDate.substring(6, 8);

						for ( var i = 0; i < 7; i++) {
							var beforDate = new Date(currentYear, currentMonth
									- 1 - i, currentDay);
							var beforYear = beforDate.getFullYear();
							var beforMonth = beforDate.getMonth() + 1 < 10 ? "0"
									+ (beforDate.getMonth() + 1)
									: (beforDate.getMonth() + 1);

							if (i == 0)
								$(selectYearMonth[0]).append(
										"<option value='" + beforYear
												+ beforMonth + "' selected>"
												+ beforYear + "��&nbsp;&nbsp;"
												+ beforMonth
												+ "��&nbsp;</option>");
							else
								$(selectYearMonth[0]).append(
										"<option value='" + beforYear
												+ beforMonth + "'>" + beforYear
												+ "��&nbsp;&nbsp;" + beforMonth
												+ "��&nbsp;</option>");
						}
					}

					/**
					 * span �̳� div�� id�� "jex.selectCalendar"�� ������ "��/��/�� ����Ʈ�ڽ���
					 * ���� �׸���
					 */
					var selectCalendars = $("[id=jex.selectCalendar]");
					if (selectCalendars.length > 0) {
						$.each(selectCalendars,
								function(i, v) {

									var selectHtml = _getSelectYyyy($(this)
											.attr("yearName"), $(this).attr(
											"startYear"))
											+ " �� "
											+ _getSelectMm($(this).attr(
													"monthName"))
											+ " �� "
											+ _getSelectDd($(this).attr(
													"dateName")) + " ��";

									$(this).html(selectHtml);

									if (jex.web.null2void($(this).attr(
											"defaultDate")).length > 0) {
										jex.web.setCalendar($(this).attr(
												"defaultDate"), i);
									}
								});
					}

					function _getSelectYyyy(name, startYear) {
						var currentYyyy = new Date().getFullYear();

						startYear = new Number(startYear);
						if (isNaN(startYear))
							startYear = currentYyyy - 10;

						var optionHtml = "";
						for ( var i = startYear; i <= currentYyyy; i++) {
							if (i == currentYyyy)
								optionHtml += "<option value='" + i
										+ "' selected>" + i + "</option>";
							else
								optionHtml += "<option value='" + i + "'>" + i
										+ "</option>";
						}
						return "<select id='jex.selectYyyy' name='"
								+ name
								+ "' onChange='jex.web.form.event.changeSelectCanendar(this)'>"
								+ optionHtml + "</select>";
					}

					function _getSelectMm(name) {
						var currentMm = new Date().getMonth();

						var optionHtml = "";
						var value = "";
						for ( var i = 1; i <= 12; i++) {
							value = String(i).length == 1 ? "0" + String(i) : i;
							if (i == currentMm + 1)
								optionHtml += "<option value='" + value
										+ "' selected>" + value + "</option>";
							else
								optionHtml += "<option value='" + value + "'>"
										+ value + "</option>";
						}
						return "<select id='jex.selectMm' name='"
								+ name
								+ "' onChange='jex.web.form.event.changeSelectCanendar(this)'>"
								+ optionHtml + "</select>";
					}

					function _getSelectDd(name) {
						var date = new Date();
						var currentDd = date.getDate();
						var lastDate = jex.web.getLastDate(date.getFullYear(),
								date.getMonth() + 1);

						var optionHtml = "";

						var value = "";
						for ( var i = 1; i <= lastDate; i++) {
							value = String(i).length == 1 ? "0" + String(i) : i;
							if (i == currentDd)
								optionHtml += "<option value='" + value
										+ "' selected>" + value + "</option>";
							else
								optionHtml += "<option value='" + value + "'>"
										+ value + "</option>";
						}
						return "<select id='jex.selectDd' name='" + name + "'>"
								+ optionHtml + "</select>";
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
//						if(navigator.userAgent.toLowerCase().indexOf("msie") != -1)
//						{
							$(v).attr("style", "ime-mode:disabled;"+$(v).attr("style"));
//						}
						$(this).keydown(function(event){
							//shift Ű�� ���������� Ư������ �Է� �Ұ�
							//�齺���̽�(8), delete(46), ����Ű(37~40) �� �����
							//���ڰ� �ƴ� �Է°� �Է� �Ұ�
							if(  event.shiftKey || 
								(   !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || event.keyCode==109 || event.keyCode==189 || (event.keyCode>=37 && event.keyCode<=40) )
								&& !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105) )
								)
							{
								event.returnValue=false;
								return false;
							}
						});
					});

					/**
					 * format=number3 �εǾ��ִ� input�� ���ڸ� �Է��Ҽ��ִ�. 
					 */
					$.each($("input[format=number3]"), function(i,v){
						//'�ѱ�'����϶��� �Ʒ� ó���� �����ϰ�  �ԷµǱ⶧���� �����ϱ⶧���� style�� ���� �׸��� �����Ѵ�.
						//������ ���� ���� ��ȯ��Ų��.
//						if(navigator.userAgent.toLowerCase().indexOf("msie") != -1)
//						{
							$(v).attr("style", "ime-mode:disabled;"+$(v).attr("style"));
//						}
						$(this).keydown(function(event){
							//shift Ű�� ���������� Ư������ �Է� �Ұ�
							//�齺���̽�(8), delete(46), ����Ű(37~40) �� �����
							//���ڰ� �ƴ� �Է°� �Է� �Ұ�
							if(  event.shiftKey || 
								(   !(event.keyCode==8 || event.keyCode==9 || event.keyCode==46 || (event.keyCode>=37 && event.keyCode<=40) )
								&& !(event.keyCode>=48 && event.keyCode<=57) && !(event.keyCode>=96 && event.keyCode<=105))
								)
							{
								event.returnValue=false;
								return false;
							}
						});
					});

				});// end of "$(document).ready(function()"

// "yyyy�� mm��" ����Ʈ�ڽ� �̺�Ʈ ó��
jex.web.form.event.changeSelectYearMonth = function(selector) {
	var selectVal = String($(selector).val());
	var currentDate = jex.web.getServerDate("yyyymmdd");

	var lastDate = "";
	if (selectVal == currentDate.substring(0, 6))
		lastDate = currentDate.substring(6, 8);
	else {
		lastDate = jex.web.getLastDate(selectVal.substring(0, 4), selectVal
				.substring(4, 6));
	}
	jex.web.setCalendar(selectVal + "01", 0);
	jex.web.setCalendar(selectVal + lastDate, 1);
};

// ��/�� ����Ʈ�ڽ� �̺�Ʈ
jex.web.form.event.changeSelectCanendar = function(selector) {
	var selectors = $("select[id=" + $(selector).attr("id") + "]");

	$.each(selectors, function(i, v) {
		if (this == selector) {
			var targetSelectBox = $("select[id=jex.selectDd]")[i];

			jex.web.form.event.replaceSelectDd(targetSelectBox, $(
					$("select[id=jex.selectYyyy]")[i]).val(), $(
					$("select[id=jex.selectMm]")[i]).val());
		}
	});
};

/*******************************************************************************
 * ����� ȣ���� ������ �Լ� ����
 ******************************************************************************/
jex.web.alert = function(msg, code) {
	if (code != null && code != undefined)
		msg = jex.web.getMsg(code);
	
	alert(msg);
};

jex.web.confirm = function(msg, code) {
	if (code != null && code != undefined)
		msg = jex.web.getMsg(code);
	return confirm(msg);
};

jex.web.debug = function(code, fn) {
	if (_jex_debugMod)
		_jex_error_dialog(code, "excla");
};

jex.web.err = function(code, fn) {
	_jex_error_dialog(code, "error");
};

jex.web.info = function(code, fn) {
	_jex_error_dialog(code, "ok", fn);
};

jex.web.isError = function(data) {
	return data['COMMON_HEAD']['ERROR'];
};

jex.web.getCodeList = function(grpCd) {
	var result;
	jex.web.Ajax("comb_0001_01", {
		DIV_GRP_CD : grpCd
	}, function(data) {
		result = data;
	}, "jct", false);
	return result;
};

jex.web.getCodeNm = function(grpCd, grpItm) {
	var result;
	jex.web.Ajax("comm_0008_01_r001", {
		DIV_GRP_CD : grpCd,
		DIV_ITEM_CD : grpItm
	}, function(data) {
		result = data;
	}, "jct", false);
	return result;
};

jex.web.getMsg = function(code) {
	var result;
	jex.web.Ajax("comm_0009_01", {
		CD : code
	}, function(data) {
		result = data.MSG;
	}, "jct", false);
	return result;
};

function _jex_error_dialog(code, type, fn) {
	var msg;
	if (typeof (code) != "string")
		code = code['COMMON_HEAD']['CODE'];
	if (typeof (code) != "string")
		msg = code['COMMON_HEAD']['MESSAGE'];
	if (msg == null || msg == undefined)
		msg = jex.web.getMsg(code);
	
	//msg += "(1111)";
	
	if (parent.tMenuList == null || parent.tMenuList == undefined || true) {
		alert(msg);
		if (typeof (fn) == "function")
			fn();
		return;
	}

	var title = {
		"excla" : "Debug",
		"ok" : "Ȯ�� �޽���",
		"error" : "���� �޽���"
	};
	var errorHtml = "<div id='_jex_error_dialog' class='pop_wrap_div' style='width:540px;height:212px' tabindex='0'>"
			+ "<div id='p-title' class='pop_top'>"
			+ "<h1>%TITLE%</h1>"
			+ "<span><img id='close' src='img/00/menu/popup_close.gif' alt='close' style='cursor:pointer' /></span>"
			+ "</div>"
			+ "<div id='pcpcont' class='pop_cont'>"
			+ "<div class='infoMessage'>"
			+ "<dl>"
			+ "<dt class='%TYPE%'></dt>"
			+ "<dd style='width:320px'><strong>%CODE%</strong><br />%MSG%</dd>"
			+ "</dl>"
			+ "</div>"
			+ "<ul class='btn_both'>"
			+ "<li class='btn_bothLeft'></li>"
			+ "<li  class='btn_bothRight'><span class='btn_off'><a id='close' style='cursor:pointer'>Ȯ��</a></span></li>"
			+ "</ul>" + "</div>" + "</div>";
	errorHtml = errorHtml.replace(/%TITLE%/g, title[type]);
	errorHtml = errorHtml.replace(/%TYPE%/g, type);
	errorHtml = errorHtml.replace(/%MSG%/g, msg);
	errorHtml = errorHtml.replace(/%CODE%/g, code);

	$(errorHtml).appendTo(document.body);

	$("#_jex_error_dialog").focus();

	$("#_jex_error_dialog").find("#close").click(function() {
		if (typeof (fn) == "function")
			fn();
		$(document.body).find("#_jex_error_dialog").remove();
	});

	$("#_jex_error_dialog").keypress(function(event) {
		switch (event.keyCode) {
		case 27:
		case 32:
		case 13:
			if (typeof (fn) == "function")
				fn();
			$(document.body).find("#_jex_error_dialog").remove();
			break;
		}
		;
		switch (event.charCode) {
		case 27:
		case 32:
		case 13:
			if (typeof (fn) == "function")
				fn();
			$(document.body).find("#_jex_error_dialog").remove();
			break;
		}
	});
}

/**
 * �����񽺸� ȣ���Ͽ� �ش� ����� selelct�ڽ��� option�׸���� ä���.
 * 
 * @svc : ������ID
 * @input : �Է°� ex)'{USR_ID:"test"}'
 * @selectedValue : �⺻���ð�. ���� ������ option�� value�� �ش� ���� �׸��� �⺻����.
 * @selector : jquery��ü�� ������ ex)$(this) �Ǵ� $("#ID")...
 * @selectElementId : select�ڽ��� id��. =>selector �� selectElementId�� ���߿� �ϳ���
 *                  �Է��ϸ��.
 */
jex.web.setSelectBox = function(svc, input, selectedValue, selector,
		selectElementId) {
	// if(
	// !(selectedValue==undefined||selectedValue==null||selectedValue=='null') )
	// selectedValue = selectedValue.replace(/[^0-9]/g, "");

	var selectbo;

	if (selector == null || selector == undefined || selector == "") {
		selectbo = $("#" + selectElementId);
	} else {
		selectbo = selector;
	}

	var _style = selectbo.attr("style");
	var _class = selectbo.attr("class");
	var _async = "1";
	
	if(typeof(selectbo.attr("async")) != "undefined"){
		_async = selectbo.attr("async");
//		alert(_async);
	}

	// ������ option �׸��� �����ϸ� ����.
	selectbo.children(".generated").remove();

	var json = {};
	if (jex.web.null2void(input) != "")
		eval("json = " + input);

	jex.web.Ajax(svc, json, function(dat) {
		try {
			$.each(dat.REC, function(i, v) {
				if (v.KEY == undefined || v.KEY == null || v.KEY == "null")
					v.KEY = "";
				if (v.KEY == selectedValue)
					selectbo.append("<option class='generated' value='" + v.KEY + "' selected>"
							+ v.DAT + "</option>");
				else
					selectbo.append("<option class='generated' value='" + v.KEY + "'>" + v.DAT
							+ "</option>");
			});

			selectbo.attr("style", _style);
			selectbo.attr("class", _class);
		} catch (e) {
			alert("SELECT BOX �׸��� ����! [" + svc + "]");
			return;
		}
	}, "jct", _async);
};

/**
 * �����񽺸� ȣ���Ͽ� �ش� ����� INPUT RADIO�׸��� ä���.
 * 
 * @svc : ������ID
 * @input : �Է°� ex)'{USR_ID:"test"}'
 * @selectedValue : �⺻���ð�. ���� ������ option�� value�� �ش� ���� �׸��� �⺻����.
 * @selector : jquery��ü�� ������ ex)$(this) �Ǵ� $("#ID")...
 * @selectElementId : input�ڽ��� id��. =>selector �� selectElementId�� ���߿� �ϳ��� �Է��ϸ��.
 */
jex.web.setRadioBox = function(svc, input, selectedValue, selector,
		selectElementId, radioNm) {
	var selectbo;

	if (selector == null || selector == undefined || selector == "") {
		selectbo = $("#" + selectElementId);
	} else {
		selectbo = selector;
	}

	var _style = selectbo.attr("style");
	var _class = selectbo.attr("class");

	// ������ option �׸��� �����ϸ� ����.
	selectbo.children(".generated").remove();

	var json = {};
	if (jex.web.null2void(input) != "")
		eval("json = " + input);

	jex.web.Ajax(svc, json, function(dat) {
		try {
			$.each(dat.REC, function(i, v) {
				if (v.KEY == undefined || v.KEY == null || v.KEY == "null")
					v.KEY = "";
				if (v.KEY == selectedValue)
					selectbo.append("<input class='generated' type='radio' name='" + radioNm
							+ "' value='" + v.KEY + "' checked /><label>"
							+ v.DAT + "</label>");
				else
					selectbo.append("<input class='generated' type='radio' name='" + radioNm
							+ "'  value='" + v.KEY + "' /><label>" + v.DAT
							+ "</label>");
			});

			selectbo.attr("style", _style);
			selectbo.attr("class", _class);
		} catch (e) {
			alert("RADIO BOX �׸��� ����! [" + svc + "]");
			return;
		}
	}, "jct", false);
};

/**
 * �����ð��� �����Ѵ�. ���� ������ Format.. yy,yyyy : �⵵ mm : �� dd : ��
 * 
 * hh(hh24) : �ð�(24�ñ�������) mi : �� ss : �� ms : millisecond
 * 
 * MMM : ��(Ex:Jan,1��) EEE : ��(Ex:Tue,ȭ) G : AD/BC
 */
jex.web.getServerDate = function(format) {
	var result = "";
	jex.web.Ajax("getServerDate", {
		FRMT_CTT : format
	}, function(dat) {
		result = dat.INQ_DT;
	}, "jct", "1");
	return result;
};

/**
 * �����ð��� �����Ѵ�. ���� ������ Format.. yy,yyyy : �⵵ mm : �� dd : ��
 * 
 * hh(hh24) : �ð�(24�ñ�������) mi : �� ss : ��
 * 
 * @param c
 *            ���� Flag('Y':��,'M':��,'W':��,'D'��)
 * @param i
 *            ���� ��갪
 */
jex.web.getDate = function(format, c, i) {
	var currentDate = new Date();
	var _tmpDate;
	if (jex.web.null2void(c) != "") {
		switch (c) {
		case "Y":
			_tmpDate = new Date(currentDate.getFullYear() + i, currentDate
					.getMonth(), currentDate.getDate());
			break;

		case "M":
			_tmpDate = new Date(currentDate.getFullYear(), currentDate
					.getMonth()
					+ i, 1);

			// beforeDate�� ������ ��¥��, ��ȸ�������������� ���õǾ��ִ°����� ������
			// beforeDate�� ������ ��¥�� �����Ѵ�.
			var lastDate = jex.web.getLastDate(_tmpDate.getFullYear(), _tmpDate
					.getMonth() + 1);
			if (lastDate < currentDate.getDate()) {
				_tmpDate.setDate(lastDate);
			} else {
				_tmpDate.setDate(currentDate.getDate());
			}

			break;

		case "W":
			_tmpDate = new Date(currentDate.getFullYear(), currentDate
					.getMonth(), currentDate.getDate() + (i * 7));
			break;

		case "D":
			_tmpDate = new Date(currentDate.getFullYear(), currentDate
					.getMonth(), currentDate.getDate() - i);
			break;

		default:
			jex.web.alert("���� ���� Flag�Դϴ�.(" + c + ")");
			return false;
			break;
		}
		currentDate = _tmpDate;
	}
	var year = String(currentDate.getFullYear());
	var month = currentDate.getMonth();
	month = month + 1 < 10 ? "0" + String(month + 1) : String(month + 1);
	var date = currentDate.getDate();
	date = date < 10 ? "0" + String(date) : String(date);

	return format.replace("yyyy", year).replace("yy", year.substring(2, 4))
			.replace("mm", month).replace("dd", date);
};

/**
 * ������ �ִ� ���� �ٿ�ε�
 * 
 * @param fileSavePath :
 *            ���ϸ��� ������ ��ü���
 * @param fileOrgName :
 *            �ٿ�ε�������ϸ�
 * @return
 */
jex.web.FileDownload = function(fileSavePath, fileOrgName) {
	alert(fileSavePath+":"+fileOrgName);

	$("#_downloadDiv").remove();
	$("#_downloadIfrm").remove();

	var wsvcId = 'comm_0006_02.act';

	var $iframe = $("<iframe name='_downloadIfrm' id='_downloadIfrm'/>");

	$iframe.appendTo("body");

	var $div = $("<div id='_downloadDiv'/>");
	$div.css( {
		display : "none"
	});
	$div.appendTo("body");

	var _form = '<form name="_downloadForm" id="_downloadForm" action="'
			+ wsvcId + '" method="post" target="_downloadIfrm">'
			+ '<input type="hidden" name="FILE_NM" value="' + fileOrgName
			+ '" />' + '<input type="hidden" name="SAVE_FILE_PATH" value="'
			+ fileSavePath + '" />' + '</form>';
	$("#_downloadDiv").append(_form);

	jex.web.doSubmit("_downloadForm", false);
};

/**
 * ��������
 * 
 * @fileName ������ ���ϸ�. action �Էµ����ΰ� ��µ����ο� FILE_NM �ʵ尡 �־�� �Ѵ�. ���ϸ��� view���� �����Ұ��
 *           �ʼ��ƴ�.
 * @wsvcId ������ID(������ID.act)
 * @params �Է°��� object���·� �Է�. KEY�� action �Էµ����� �׸��� ��ġ �ϰ� �Է��ؾ���. ex:
 *         {KEY1:"��1", KEY2:"��2"}
 */
jex.web.FileDownloadURL = function(fileName, wsvcId, params, debug) {
	$("#_downloadDiv").remove();
	$("#_downloadIfrm").remove();

	if (!wsvcId) {
		alert("������ID�� �Է����ּ���.");
		return false;
	}

	var paramInputs = "";
	if (!(params == undefined || params == null || params == 'null' || params == "")) {
		for ( var tempKey in params) {
			paramInputs += '<input type="hidden" name="' + tempKey
					+ '" value="' + params[tempKey] + '" />';
		}
	}

	var $iframe = $("<iframe name='_downloadIfrm' id='_downloadIfrm'/>");

	if (debug)
		$iframe.css( {
			position : "absolute",
			width : "700px",
			height : "400px"
		});
	else
		$iframe.css( {
			position : "absolute",
			width : "0px",
			height : "0px",
			left : "-600px",
			top : "-600px"
		});

	$iframe.appendTo("body");

	var $div = $("<div id='_downloadDiv'/>");
	$div.css( {
		display : "none"
	});
	$div.appendTo("body");

	var _form = '<form name="_downloadForm" id="_downloadForm" action="'
			+ wsvcId + '" method="post" target="_downloadIfrm">'
			+ '<input type="hidden" name="FILE_NM" value="' + fileName + '" />'
			+ paramInputs + '</form>';
	$("#_downloadDiv").append(_form);

	jex.web.doSubmit("_downloadForm", false);
};

/**
 * HTML ��������
 * 
 * @divId ���Ϸ� ������ ������ DIV�� ���ΰ� �ش� DIV���̵� �Է��Ѵ�.
 * @fileName ������ ���ϸ�
 * @skipId ������ DIV���� ������ ����� ���ܽñ�κ��� ID�� �Է��Ѵ�. ex) <table id='skipArea'></table>
 *         <div id='skipArea'></div> �̷������� �Ǿ������� ���� skipId �� �ش��ϴ� ��� ������Ʈ��
 *         ���ܽ�Ų��.
 * @debug true �Է½� iframe ������ �����ִ�.
 */
jex.web.FileDownloadHtml = function(divId, fileName, skipId, debug) {
	$("#_downloadDiv").remove();
	$("#_downloadIfrm").remove();

	var $element = $("#" + divId);

	var $div = $("<div id='_downloadDiv'/>");
	$div.css( {
		display : "none"
	});
	$div.appendTo("body");

	$element.each(function() {
		$("#_downloadDiv").append($(this).html());
	});

	// skipId �� �ش��ϴ� ������Ʈ ����
	$.each($("#_downloadDiv").find("[id=" + skipId + "]"), function(i, v) {
		$(this).remove();
	});

	$.each($("#_downloadDiv").find("img"), function(i, v) {
		var src = $(this).attr("src");

		if (!/^http/.test(src)) {
			src = 'http://' + window.location.host
					+ (/^[\/]/.test(src) ? href : "/" + src);
		}

		$(this).attr("src", src);
	});

	var $iframe = $("<iframe name='_downloadIfrm' id='_downloadIfrm'/>");

	if (debug)
		$iframe.css( {
			position : "absolute",
			width : "700px",
			height : "400px"
		});
	else
		$iframe.css( {
			position : "absolute",
			width : "0px",
			height : "0px",
			left : "-600px",
			top : "-600px"
		});

	$iframe.appendTo("body");
	var doc = $iframe[0].contentWindow.document;
	doc
			.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
	doc.write("<html xmlns='http://www.w3.org/1999/xhtml'><head>");
	doc
			.write("<meta http-equiv='Content-Type' content='text/html; charset=euc-kr'>");
	doc.write("<title>" + $("title").html() + "</title>");
	$("link").each(
			function() {
				var href = $(this).attr("href");

				if (!/^http/.test(href)) {
					href = 'http://' + window.location.host
							+ (/^[\/]/.test(href) ? href : "/" + href);
				}

				doc.write("<link type='text/css' rel='stylesheet' href='"
						+ href + "' />");
			});
	doc.write("</head><body>");
	doc.write($("#_downloadDiv").html());
	doc.write("</body></html>");

	doc.close();
	setTimeout(function() {
		$iframe[0].contentWindow.document
				.execCommand('SaveAs', false, fileName);
	}, 500);
};

/**
 * DIV ID�� �Է¹޾Ƽ� �ش� DIV�� ������ ����Ѵ�.
 */
jex.web.print = function(divId) {
	if (divId == undefined || divId == null || divId == "") {
		alert("����� DIV ID�� �������ּ���.");
		return false;
	}
	$("#" + divId).jqprint( {
		importCSS : true
	});
};

/**
 * ��,���� �Է¹޾� �ش���� ������ ���ڸ� ��ȯ�Ѵ�.
 */
jex.web.getLastDate = function(yyyy, mm) {
	if (yyyy == undefined || String(yyyy).length != 4 || mm == undefined
			|| String(mm).length > 2)
		return "";
	else
		return new Date(new Date(yyyy, mm, '1') - (60 * 60 * 24 * 1000))
				.getDate();
};

/**
 * ������ ��/��/�� ����Ʈ�ڽ��� ��¥�� �����Ѵ�.
 * 
 * @param yyyymmdd :
 *            'yyyymmdd' ������ ��¥ or Date ��ü
 * @param index :
 *            id �� "jex.selectCalendar"�� div �Ǵ� span �±��� index(�ڵ��� ��Ÿ���� �޷� ����)
 *            0���� �����Ѵ�.
 */
jex.web.setCalendar = function(yyyymmdd, index) {
	if (index == undefined || index == null || index == "") {
		index = 0;
	}

	if (!yyyymmdd || yyyymmdd == "null") {
		yyyymmdd = new Date();
	}

	if (yyyymmdd instanceof Date) {
		var _fullYear = yyyymmdd.getFullYear();
		var _month = String(yyyymmdd.getMonth() + 1).length == 1 ? "0"
				+ String(yyyymmdd.getMonth() + 1) : yyyymmdd.getMonth() + 1;
		var _date = String(yyyymmdd.getDate()).length == 1 ? "0"
				+ String(yyyymmdd.getDate()) : yyyymmdd.getDate();
		yyyymmdd = _fullYear + "" + _month + "" + _date;
	}
	// ���ڰ� �ƴ� ���� ����
	yyyymmdd = yyyymmdd.replace(/[^0-9]/g, "");

	var selectYyyy = $("select[id=jex.selectYyyy]")[index];
	var selectMm = $("select[id=jex.selectMm]")[index];
	var selectDd = $("select[id=jex.selectDd]")[index];

	_selected($(selectYyyy).children(), yyyymmdd.substring(0, 4));
	_selected($(selectMm).children(), yyyymmdd.substring(4, 6));

	jex.web.form.event.replaceSelectDd(selectDd, yyyymmdd.substring(0, 4),
			yyyymmdd.substring(4, 6));
	_selected($(selectDd).children(), yyyymmdd.substring(6, 8));

	function _selected(options, key) {
		$.each(options, function(i, v) {
			if ($(v).val() == key) {
				$(this).attr("selected", true);
				return false;
			}
		});
	}
};

/**
 * ��ȸ���� ��/��/�� ����Ʈ�ڽ��� ��ȸ���� ��/��/�� ����Ʈ�ڽ��� ��¥�� ���������~���� ��¥�� �����Ѵ�.
 * 
 * @param betweenDv :
 *            ��(d)/��(w)/��(m) �����ڵ�
 * @param num :
 *            �� ������ ����
 * 
 * ex) jex.web.setCalendarBetween("d", 0); => ���� ex)
 * jex.web.setCalendarBetween("w", 1); => 1��
 */
jex.web.setCalendarBetween = function(betweenDv, num) {

	if (isNaN(new Number(num)))
		return false;

	var currentDate = new Date();
	var beforDate;

	switch (jex.web.null2void(betweenDv).toLowerCase()) {
	// ��
	case "d":
		beforDate = new Date(currentDate - ((60 * 60 * 24 * 1000) * num));
		break;

	// ��
	case "w":
		beforDate = new Date(currentDate - ((60 * 60 * 24 * 1000) * 7 * num));
		break;

	// ��
	case "m":
		beforDate = new Date(currentDate.getFullYear(), currentDate.getMonth()
				- num, currentDate.getDate());
		break;
	}
	jex.web.setCalendar(beforDate, 0);
	jex.web.setCalendar(currentDate, 1);
};

/**
 * value�� false�� �򰡵Ǵ� ��(undefined, null, "")�̸� ""�� ��ȯ�Ѵ�.
 * 
 * @param value
 * @def def : value�� false�� �򰡵Ǵ� ���ϰ��, def�� ������ def�� ��ȯ�Ѵ�.
 * 
 */
jex.web.null2void = function(value, def) {
	if (!value)
		return !def ? "" : def;
	else
		return $.trim(value);
};

/**
 * form �� ������� �����ϴ� �Լ�
 * 
 * @formId : submit �� form �� id
 * @checkYn: submit �ϱ����� formCheck�� �������� ���� �������� ������ default �� true.
 * @form : PT���� ����ϴ� common.js�� uf_openWin �Լ����� submit �ϴ°��� �����ϱ� ���� �߰���
 */
jex.web.doSubmit = function(formId, checkYn, form, opt) {
	if (formId == "" || formId == undefined || formId == null) {
		if (form) {
			formId = $(form).attr("id");
			if (formId == "" || formId == undefined || formId == null) {
				// $(form).attr("id", "jex.web._subForm_");
				// formId = $(form).attr("id");
				formId = $(form).attr("name");
				$(form).attr("id", form);
			}
		}
	}

	if (!jex.web.testMode) {
		// form �� action Attribute �� ���õ� �����񽺾��̵� ".act"�� �ٿ��� �ٽ� �����Ѵ�.(.act�� ������
		// �ʴ°�츸)
		if (!/\./g.test($("#" + formId).attr("action"))
				&& !/\.act$/.test($("#" + formId).attr("action"))) {
			$("#" + formId).attr("action",
					$("#" + formId).attr("action") + ".act");
		}
	}
	// alert( $("#"+formId).attr("action") );

	// submit �� ���������� Ȯ��
	if (!jex.web.form.submitYn) {
		// submit ���������� �� ����
		jex.web.form.submitYn = true;

		// checkYn�� false �� �ƴϸ� validation üũ
		if (checkYn === undefined || checkYn === null || checkYn === ""
				|| checkYn) {
			// validation üũ ����
			if (!jex.web.checkForm(formId)) {
				// ����� �����̸� submit �������� ����
				jex.web.form.submitYn = false;
				return false;
			}
		}

		// submit ����
		if (jex.web.null2void($("#" + formId).attr("type")).toLowerCase() == "json") {
			var rslt = _trxSubmit($("#" + formId), opt);
			return rslt;
		} else if (jex.web.null2void($("#" + formId).attr("type"))
				.toLowerCase() == "ajax") {
			return _trxAjax($("#" + formId));
		} else {
			/*
			 * ��â ���� From�� ������ ���� Option�� ó���Ѵ�.
			 */
			if (opt != undefined && opt != null && opt != ""
					&& opt.target != undefined && opt.target != null
					&& opt.target != "") {
				var sizeW = Number(opt.sizeW) + 25;
				var sizeH = Number(opt.sizeH);
				var nLeft = screen.width / 2 - sizeW / 2;
				var nTop = screen.height / 2 - sizeH / 2;
				var option = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
				var winObj = window.open('', opt.target, "left=" + nLeft
						+ ",top=" + nTop + ",width=" + sizeW + ",height="
						+ sizeH + option);
				winObj.blur();// ũ�ӿ��� focus()�� ȣ���Ұ�� �۵����� �ʾƼ� blur()�� ���� ȣ������
								// focus()ȣ���ϵ��� ������.
				winObj.focus();// �˾��� �̹� �����ִ°�� ������ �������� �Ѵ�.
				$("#" + formId).attr("method", "post");
				$("#" + formId).attr("target", opt.target);
				if (opt.action != null && opt.action != undefined
						&& opt.action != "")
					$("#" + formId).attr("action", opt.action);
				jex.web.form.submitYn = false;
			}

			// ���ȸ���� ����Ұ��
			if (jex.web.isSecurityModule) {
				// xecureweb ���ȸ���� submit
				XecureSubmit(document.getElementById(formId));
			} else {
				// $("#"+formId).submit(); => �� ������� submit �ϸ�
				// $("#"+formId).submit(function(){}); => ���� �̺�Ʈ�� ������ ������
				// �Ʒ�ó�� submit�� �����Ѵ�.
				document.getElementById(formId).submit();
			}

			jex.web.form.submitYn = false;
		}
	} else {
		alert("�ŷ��� �������Դϴ�.");
		return false;
	}
};// end of "jex.web.doSubmit"

/**
 * 
 */
jex.web.callSvc = function(act_id, json) {
	newform = "<div id='_jexSender'><form id='_jexSenderForm' name='_jexSenderForm' method='"
			+ _this.attr("method")
			+ "' type='"
			+ _this.attr("type")
			+ "' action='"
			+ _this.attr("action")
			+ "'><input type='text' name='_JSON_' value='"
			+ JSON.stringify(json) + "'></form></div>";
	$(document.body).append(newform).hide();
	document._jexSenderForm.submit();
};

/**
 * ����� AJAXȣ������
 * 
 * @param asyncMode
 *            1:Sync 2:Async error true/false
 */
jex.web.Ajax = function(act_id, json, fn, type, asyncMode, error) {
//	$("#_Jex_loadingbar").show();
	if (type == undefined || type == null)
		type = "act";
	if (error == undefined || error == null)
		error = true;

	if (asyncMode == "1" || !asyncMode)
		asyncMode = false;
	else
		asyncMode = true;

//	alert(asyncMode);
//	asyncMode = true;
	
	act_id = act_id + "." + type;

	var tranData = "";
	// ���ȸ���� ����Ұ��
	if (jex.web.isSecurityModule) {
		tranData = _getXecureEnc(encodeURIComponent(JSON.stringify(json)));
	} else {
		tranData = {
			"_JSON_" : encodeURIComponent(JSON.stringify(json))
		};
	}

	jQuery.ajax( {
		type : "POST",
		url : act_id,
		data : tranData,
		cache : false,
		async : asyncMode,
		success : function(msg) {
			jex.web.form.submitYn = false;
			var input;
			
			if (typeof (msg) == "string") {
				input = JSON.parse(msg);
			} else {
				input = msg;
			}
				
			if (error) {
				if (jex.web.isError(input))
					jex.web.err(input);
			}
			if (!error || !jex.web.isError(input))
				if (fn)
					fn(input);
		}
	});
};

function _UserAgent() {
	return navigator.userAgent.substring(0, 9);
}

function _IsNetscape() // by Zhang
{
	if (navigator.appName == 'Netscape')
		return true;
	else
		return false;
}

function _IsNetscape60() // by Zhang
{
	if (_IsNetscape() && _UserAgent() == 'Mozilla/5')
		return true;
	else
		return false;
}

function _getXecureEnc(str) {
	var qs = "";
	var path;
	var cipher;
	var result = {};

	var gIsContinue = 0;
	var busy_info = "��ȣȭ �۾��� �������Դϴ�. Ȯ���� �����ð� ��� ��ٷ� �ֽʽÿ�."

	// encrypt QueryString of action field
	if (gIsContinue == 0) {
		gIsContinue = 1;
		if (_IsNetscape60()) // Netscape 6.0
			cipher = document.XecureWeb.nsIXecurePluginInstance.BlockEnc(
					xgate_addr, path, XecureEscape(qs), "GET");
		else {
			cipher = document.XecureWeb.BlockEnc(xgate_addr, path,
					XecureEscape(qs), "GET");
		}
		gIsContinue = 0;
	} else {
		alert(busy_info);
		return result;
	}

	if (cipher == "")
		return result;

	result['q'] = cipher;

	posting_data = "_JSON_=" + str;

	if (gIsContinue == 0) {
		gIsContinue = 1;
		if (IsNetscape60()) // Netscape 6.0
			cipher = document.XecureWeb.nsIXecurePluginInstance.BlockEnc(
					xgate_addr, path, XecureEscape(posting_data), "POST");
		else {
			cipher = document.XecureWeb.BlockEnc(xgate_addr, path,
					XecureEscape(posting_data), "POST");
		}
		gIsContinue = 0;
	} else {
		alert(busy_info);
		return false;
	}

	if (cipher == "")
		return result;

	result['p'] = cipher;

	return result;
}

/**
 * AJAX����
 * 
 * @param _this
 * @return
 */
function _trxAjax(_this) {

	var textareaList = _this.find("textarea");
	var inputList = _this.find("input");
	var selectList = _this.find("select");
	var json = {};
	var callback = _this.attr("callback");

	$.each(textareaList, function() {
		var name = $(this).attr("name");
		var value = $(this).val();
		if (name != null && name != "" && name != undefined)
			json[name] = (value == null || value == undefined) ? "" : value;
	});

	$
			.each(inputList, function() {
				var name = $(this).attr("name");
				var value = $(this).val();

				if ($(this).attr("jexdatatype") == "item") {
					return true;// ==continue;
				} else if ($(this).attr("type") == "button") {
					return true;// ==continue;
				} else if ($(this).attr("type") == "checkbox") {
					// üũ�Ǿ����� ������ �Ѿ.
					if (!$(this).attr("checked"))
						return true;// ==continue;

					// üũ�ڽ��� recordId�Ӽ��� ������
					// �ݺ��η� �����Ѵ�.
					if ($(this).attr("recordId")) {
						if (!json[$(this).attr("recordId")]) {
							json[$(this).attr("recordId")] = [];
						}
						checkboxRec = {};
						checkboxRec[name] = value;

						json[$(this).attr("recordId")].push(checkboxRec);
					} else {
						if (name != null && name != "" && name != undefined)
							json[name] = (value == null || value == undefined) ? ""
									: value;
					}
				} else if ($(this).attr("type") == "radio") {
					if (!$(this).attr("checked"))
						return true;// ==continue;
					if (name != null && name != "" && name != undefined)
						json[name] = (value == null || value == undefined) ? ""
								: value;
				} else {
					if (name != null && name != "" && name != undefined)
						json[name] = (value == null || value == undefined) ? ""
								: value;
				}
			});

	$.each(selectList, function() {
		var name = $(this).attr("name");
		var value = $(this).find("option:selected").val();

		// multiple �϶��� �ɼ��׸��� record�� �ö󰣴�.
			if ($(this).attr("type") == "select-multiple") {
				var recordId = $(this).attr("recordId");
				if (!json[recordId]) {
					json[recordId] = [];
				}

				$.each($(this).children(), function(i, v) {
					var selectRec = {};
					selectRec[name] = $(v).val();

					json[recordId].push(selectRec);
				});
			} else {
				if (name != null && name != "" && name != undefined)
					json[name] = (value == null || value == undefined) ? ""
							: value;
			}
		});

	// List ó��
	var list = $(_this).find("[jexdatatype='list']");
	$
			.each(
					list,
					function(i, v) {
						var g_key = $(this).attr("id");
						var g_array = [];
						var row = $(this).find("[jexdatatype='row']");
						$
								.each(
										row,
										function() {
											var itm = $(this).find(
													"[jexdatatype='item']");
											var itmjson = {};
											var procRadioName = "";// �̹� ������
																	// ��������
																	// Ȯ���ϱ� ����
																	// ����
											$
													.each(itm, function(i, v) {

														// radio
															// radio�� name �� ����
															// �׸���߿� check �� �׸���
															// value�� �����Ѵ�.
															if ($(this).attr(
																	"type") == "radio") {
																// �̹� ���� ������
																// �������̸�
																// continue;
																if (procRadioName == $(
																		this)
																		.attr(
																				"name")) {
																	return true;// ==continue;
																}
																procRadioName = $(
																		this)
																		.attr(
																				"name");
																itmjson[$(this)
																		.attr(
																				"id")] = jex.web
																		.null2void($(
																				":radio[name="
																						+ $(
																								this)
																								.attr(
																										"name")
																						+ "][checked=true]")
																				.val());
															}
															// checkbox
															else if ($(this)
																	.attr(
																			"type") == "checkbox") {
																if ($(this)
																		.attr(
																				"checked"))
																	itmjson[$(
																			this)
																			.attr(
																					"id")] = $(
																			this)
																			.val();
																else
																	itmjson[$(
																			this)
																			.attr(
																					"id")] = "";
															}
															// select box
															else if ($(this)
																	.find(
																			"option:selected")
																	.val() != undefined) {
																itmjson[$(this)
																		.attr(
																				"id")] = $(
																		this)
																		.find(
																				"option:selected")
																		.val();
															}
															// ��Ÿ
															else if ($(this)
																	.val() == "") {
																itmjson[$(this)
																		.attr(
																				"id")] = $(
																		this)
																		.text();
															}
															// text box
															else {
																itmjson[$(this)
																		.attr(
																				"id")] = $(
																		this)
																		.val();
															}
														});
											g_array.push(itmjson);
										});
						json[g_key] = g_array;
					});
	// alert(JSON.stringify(json));
	// ����ó��
	var act_id_parse = _this.attr("action").split(".");
	var jct = "";

	for ( var i = 0; i < act_id_parse.length - 1; i++) {
		jct = jct + act_id_parse[i];
		if (i != act_id_parse.length - 2)
			jct = jct + ".";
	}
	jex.web.Ajax(jct, json, function(dat) {
		var fn = callback + "(" + JSON.stringify(dat) + ");";
		var ret = eval(fn);
	}, "jct");
	return false;
}

/**
 * JSON ���� SUBMIT����
 * 
 * @param _this
 * @return
 */
function _trxSubmit(_this, opt) {
	var textareaList = _this.find("textarea");
	var inputList = _this.find("input");
	var selectList = _this.find("select");
	var json = {};
	var checkboxRec = {};// üũ�ڽ��� ���ڵ�� �����ϱ����� ����(20100825�߰�)

	$.each(textareaList, function() {
		var name = $(this).attr("name");
		var value = $(this).val();
		if (name != null && name != "" && name != undefined)
			json[name] = (value == null || value == undefined) ? "" : value;
	});

	$
			.each(inputList, function() {
				var name = $(this).attr("name");
				var value = $(this).val();

				// if($(this).attr("type")=="checkbox")
				// alert(name+"::"+value+"::"+$(this).attr("type")+"::"+$(this).attr("checked"));

					if ($(this).attr("jexdatatype") == "item") {
						return true;// ==continue;
				} else if ($(this).attr("type") == "button") {
					return true;// ==continue;
				} else if ($(this).attr("type") == "checkbox") {
					// üũ�Ǿ����� ������ �Ѿ.
					if (!$(this).attr("checked"))
						return true;// ==continue;

					// üũ�ڽ��� recordId�Ӽ��� ������
					// �ݺ��η� �����Ѵ�.
					if ($(this).attr("recordId")) {
						if (!json[$(this).attr("recordId")]) {
							json[$(this).attr("recordId")] = [];
						}
						checkboxRec = {};
						checkboxRec[name] = value;

						json[$(this).attr("recordId")].push(checkboxRec);
					} else {
						if (name != null && name != "" && name != undefined)
							json[name] = (value == null || value == undefined) ? ""
									: value;
					}
				} else if ($(this).attr("type") == "radio") {
					if (!$(this).attr("checked"))
						return true;// ==continue;
					if (name != null && name != "" && name != undefined)
						json[name] = (value == null || value == undefined) ? ""
								: value;
				} else {
					if (name != null && name != "" && name != undefined)
						json[name] = (value == null || value == undefined) ? ""
								: value;
				}
			});

	$.each(selectList, function() {
		var name = $(this).attr("name");
		var value = $(this).find("option:selected").val();

		// multiple �϶��� �ɼ��׸��� record�� �ö󰣴�.
			if ($(this).attr("type") == "select-multiple") {
				var recordId = $(this).attr("recordId");
				if (!json[recordId]) {
					json[recordId] = [];
				}

				$.each($(this).children(), function(i, v) {
					var selectRec = {};
					selectRec[name] = $(v).val();

					json[recordId].push(selectRec);
				});
			} else {
				if (name != null && name != "" && name != undefined)
					json[name] = (value == null || value == undefined) ? ""
							: value;
			}
		});

	// List ó��
	var list = _this.find("[jexdatatype='list']");
	$
			.each(
					list,
					function(i, v) {
						var g_key = $(this).attr("id");
						var g_array = [];
						var row = $(this).find("[jexdatatype='row']");
						$
								.each(
										row,
										function() {
											var itm = $(this).find(
													"[jexdatatype='item']");
											var itmjson = {};
											var procRadioName = "";// �̹� ������
																	// ��������
																	// Ȯ���ϱ� ����
																	// ����
											$
													.each(itm, function(i, v) {
														// radio
															// radio�� name �� ����
															// �׸���߿� check �� �׸���
															// value�� �����Ѵ�.
															if ($(this).attr(
																	"type") == "radio") {
																// �̹� ���� ������
																// �������̸�
																// continue;
																if (procRadioName == $(
																		this)
																		.attr(
																				"name")) {
																	return true;// ==continue;
																}
																procRadioName = $(
																		this)
																		.attr(
																				"name");
																itmjson[$(this)
																		.attr(
																				"id")] = jex.web
																		.null2void($(
																				":radio[name="
																						+ $(
																								this)
																								.attr(
																										"name")
																						+ "][checked=true]")
																				.val());
															}
															// checkbox
															else if ($(this)
																	.attr(
																			"type") == "checkbox") {
																if ($(this)
																		.attr(
																				"checked"))
																	itmjson[$(
																			this)
																			.attr(
																					"id")] = $(
																			this)
																			.val();
																else
																	itmjson[$(
																			this)
																			.attr(
																					"id")] = "";
															}
															// select box
															else if ($(this)
																	.find(
																			"option:selected")
																	.val() != undefined) {
																itmjson[$(this)
																		.attr(
																				"id")] = $(
																		this)
																		.find(
																				"option:selected")
																		.val();
															}
															// ��Ÿ
															else if ($(this)
																	.val() == "") {
																itmjson[$(this)
																		.attr(
																				"id")] = $(
																		this)
																		.text();
															}
															// text box
															else {
																itmjson[$(this)
																		.attr(
																				"id")] = $(
																		this)
																		.val();
															}
														});
											g_array.push(itmjson);
										});
						json[g_key] = g_array;
					});
	// alert(JSON.stringify(json));
	// ����ó��
	newform = "<div id='_jexSender' style='display:none;overflow:hidden:height:0;line-height:0;border:0;margin:0;'><form id='_jexSenderForm' name='_jexSenderForm' method='"
			+ _this.attr("method")
			+ "' target='"
			+ _this.attr("target")
			+ "' type='"
			+ _this.attr("type")
			+ "' action='"
			+ _this.attr("action")
			+ "'><input type='text' name='_JSON_' value='"
			+ JSON.stringify(json) + "'></form></div>";
	$(document.body).append(newform);// .hide();

	/*
	 * ��â ���� From�� ������ ���� Option�� ó���Ѵ�.
	 */
	if (opt != undefined && opt != null && opt != "" && opt.target != undefined
			&& opt.target != null && opt.target != "") {
		var sizeW = Number(opt.sizeW) + 25;
		var sizeH = Number(opt.sizeH);
		var nLeft = screen.width / 2 - sizeW / 2;
		var nTop = screen.height / 2 - sizeH / 2;
		var option = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
		var winObj = window.open('', opt.target, "left=" + nLeft + ",top="
				+ nTop + ",width=" + sizeW + ",height=" + sizeH + option);
		winObj.blur();// ũ�ӿ��� focus()�� ȣ���Ұ�� �۵����� �ʾƼ� blur()�� ���� ȣ������
						// focus()ȣ���ϵ��� ������.
		winObj.focus();// �˾��� �̹� �����ִ°�� ������ �������� �Ѵ�.
		$("#_jexSenderForm").attr("method", "post");
		$("#_jexSenderForm").attr("target", opt.target);
		if (opt.action != null && opt.action != undefined && opt.action != "")
			$("#_jexSenderForm").attr("action", opt.action);
		jex.web.form.submitYn = false;
	}

	// ���ȸ���� ����Ұ��
	if (jex.web.isSecurityModule) {
		// xecureweb ���ȸ���� submit
		XecureSubmit(document._jexSenderForm);
	} else {
		// $("#"+formId).submit(); => �� ������� submit �ϸ�
		// $("#"+formId).submit(function(){}); => ���� �̺�Ʈ�� ������ ������
		// �Ʒ�ó�� submit�� �����Ѵ�.
		document._jexSenderForm.submit();
	}

	jex.web.form.submitYn = false;

	$("#_jexSender").remove();
	return false;
	// return false;
}

/**
 * form validation�� üũ�ϴ� �Լ�
 * 
 * @formId : üũ�� form�� id
 */
jex.web.form._bfCheckboxName = "";
jex.web.form._bfRadioName = "";
jex.web.form._thisInput;
jex.web.checkForm = function(formId) {
	var selector = "#" + formId;

	jex.web.form.errorYn = false;
	jex.web.form._bfCheckboxName = "";
	jex.web.form._bfRadioName = "";

	// �ؽ�Ʈ �ڽ� ����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find(":text"), function(i, v) {
			if (jex.web.form.errorYn)
				return false;
			jex.web.form._thisInput = $(this);

			// validation üũ �Լ���ŭ loop ó���Ѵ�.
				$.each(jex.web.form.check, function(i, v) {
					if (typeof v == 'function') {
						if (!v(jex.web.form._thisInput)) {
							$(jex.web.form._thisInput).focus();
							return false;
						}
					}
				});
			});
	}

	// hidden����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find(":hidden"), function(i, v) {
			if (jex.web.form.errorYn)
				return false;
			jex.web.form._thisInput = $(this);

			// validation üũ �Լ���ŭ loop ó���Ѵ�.
				$.each(jex.web.form.check, function(i, v) {
					if (typeof v == 'function') {
						if (!v(jex.web.form._thisInput)) {
							$(jex.web.form._thisInput).focus();
							return false;
						}
					}
				});
			});
	}

	// selectbox ����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find("select"), function(i, v) {

			if (jex.web.form.errorYn)
				return false;

			jex.web.form._thisInput = $(this);

			if (!jex.web.form.check.isNotnull(jex.web.form._thisInput)) {
				$(jex.web.form._thisInput).focus();
				return false;
			}
		});
	}

	// password ����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find(":password"), function(i, v) {
			if (jex.web.form.errorYn)
				return false;
			jex.web.form._thisInput = $(this);

			// validation üũ �Լ���ŭ loop ó���Ѵ�.
				$.each(jex.web.form.check, function(i, v) {
					if (typeof v == 'function') {
						if (!v(jex.web.form._thisInput)) {
							$(jex.web.form._thisInput).focus();
							return false;
						}
					}
				});
			});
	}

	// checkbox ����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find(":checkbox"), function(i, v) {
			if (jex.web.form.errorYn)
				return false;
			jex.web.form._thisInput = $(this);

			if (jex.web.form._bfCheckboxName != $(jex.web.form._thisInput)
					.attr("name")) {
				jex.web.form._bfCheckboxName = $(jex.web.form._thisInput).attr(
						"name");
				if (!jex.web.form.check.isNotnull(jex.web.form._thisInput)) {
					$(jex.web.form._thisInput).focus();
					return false;
				}
			}
		});
	}

	// radio ����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find(":radio"), function(i, v) {
			if (jex.web.form.errorYn)
				return false;
			jex.web.form._thisInput = $(this);

			if (jex.web.form._bfRadioName != $(jex.web.form._thisInput).attr(
					"name")) {
				jex.web.form._bfRadioName = $(jex.web.form._thisInput).attr(
						"name");
				if (!jex.web.form.check.isNotnull(jex.web.form._thisInput)) {
					$(jex.web.form._thisInput).focus();
					return false;
				}
			}
		});
	}

	// textarea ����
	if (!jex.web.form.errorYn) {
		$.each($(selector).find("textarea"), function(i, v) {
			if (jex.web.form.errorYn)
				return false;
			jex.web.form._thisInput = $(this);

			// validation üũ �Լ���ŭ loop ó���Ѵ�.
				$.each(jex.web.form.check, function(i, v) {
					if (typeof v == 'function') {
						if (!v(jex.web.form._thisInput)) {
							$(jex.web.form._thisInput).focus();
							return false;
						}
					}
				});
			});
	}

	// ��ȸ���� �������� ����
	if (!jex.web.form.errorYn) {
		var jexCalendar = $(selector).find("[id=jex.selectCalendar]");
		if (jexCalendar.length == 2) {
			var stDt = $($(jexCalendar[0]).find("select")[0]).val()
					+ $($(jexCalendar[0]).find("select")[1]).val()
					+ $($(jexCalendar[0]).find("select")[2]).val();

			var endDt = $($(jexCalendar[1]).find("select")[0]).val()
					+ $($(jexCalendar[1]).find("select")[1]).val()
					+ $($(jexCalendar[1]).find("select")[2]).val();

			if (stDt > endDt) {
				alert("��ȸ�������� ��ȸ�����Ϻ��� Ů�ϴ�.");
				$($(jexCalendar[0]).find("select")[0]).focus();
				jex.web.form.errorYn = true;
				return false;
			}

			var currentDate = new Date();
			var currentDate = currentDate.getFullYear()
					+ ""
					+ (currentDate.getMonth() + 1 < 10 ? "0"
							+ (currentDate.getMonth() + 1) : (currentDate
							.getMonth() + 1))
					+ ""
					+ (currentDate.getDate() < 10 ? "0" + currentDate.getDate()
							: currentDate.getDate());

			if (endDt > currentDate) {
				alert("������ ���ķδ� ��ȸ�� �Ұ����մϴ�.");
				$($(jexCalendar[1]).find("select")[0]).focus();
				jex.web.form.errorYn = true;
				return false;
			}
		}
	}

	if (jex.web.form.errorYn)
		return false;
	else
		return true;
};// end of "jex.web.checkForm"


var _jex_page_id;
var _jex_menu_seq = 0;
var _jex_title = "";
var _jex_title_prefix		= "";
var _jex_title_postfix	= "";
//var _jex_header_prefix = "RDERP -- ";
var _jex_header_prefix = "";
var _jex_header_postfix= "";
var _url_post_fix = "";

var JexCommon = {};

/**
 * JexTree�� ���⼭ �������� ����
 */
document.write('<script type="text/javascript" src="js/jex.tree.js"></script>');

function getTitle() {
	return _jex_title;
};

$(function() {
	if (parent.tMenuList==undefined) return;
	_jex_page_id=parent._jex_page_id;
	if (_jex_page_id==undefined) return;
	/**
	 * IFRAME����� �������� �Ҵ�.
	 */
	JexCommon.resizeIframe = function(){
		var h = $(document.body).find("div:first").height();
		$(parent.document.body).find("#"+_jex_page_id).find("iframe").height(h+10);
	};
	JexCommon.resizeIframe();	
	/**
	 * IFRAME����� �������� �Ҵ�.
	 */
	var h = $(document.body).find("div:first").height();
	$(parent.document.body).find("#"+$.trim(_jex_page_id)).find("iframe").height(h+2);
	_jex_title = $(parent.document.body).find("#"+$.trim(_jex_page_id)).attr("name");

	$("#content").find(".content_box").find("h1:first").html(_jex_title_prefix+getTitle()+_jex_title_postfix);
	parent.document.title = _jex_header_prefix + getTitle() + _jex_header_postfix;

	if ($("#Left_Menu").length==0) return;

	/**
	 * IFRAME����� �������� �Ҵ�.
	 */
	/*
	JexCommon.resizeIframe = function(){
		var h = $(document.body).find("div:first").height();
		$(parent.document.body).find("#"+_jex_page_id).find("iframe").height(h+10);
	};
	JexCommon.resizeIframe();
	*/
	
	/**
	 * ���� ���������� �̿��Ͽ� �޴������͸� ���ؿ´�.
	 */
	var pathname = document.location.pathname.split("/");
	var filename = pathname[pathname.length-1];
	/*
	var grpLname = filename.split("_");
	var grp_name = grpLname[0];
	var menuseq  = parent.tMenuList.menuSeq[grp_name];
	*/
	var id		 = filename.split(".")[0];
	
	// ���԰��Ǽ� ���
	if(	id == "rexpe_0009_02" ) {
		id = "rexpe_0009_01";
	}
	
	// �������ݰ�꼭
	if(	id == "revid_0002_06" || id == "revid_0002_07" || id == "revid_0002_08" || id == "revid_0002_09") {
		id = "revid_0002_01";
	}	
	
	// ��������
	if(	id == "board0001_01" || id == "board0002_01") {
		id = "board0016_01";
	}		
	
	/*
	if (id.indexOf("base") > -1) {
		alert(id);
	}
	*/
	
	// ����ڰ���
	if(	id == "base_0003_02" || id == "base0003_04") {
		id = "base0013_01";
	}	
	
	// ������ ��Ȳ ��ȸ tab�޴� �̵��� ����Ʈ �޴��� ����ֱ� ���� �ڵ� �߰�
	if( id == "rwork_0028_01" || id == "rwork_0029_01" || id == "rwork_0030_01" || id == "rwork_0031_01" || id == "rwork_0032_01" || id == "rwork_0033_01" )
		id = "rwork_0027_01";
	setLeftMenu(id);
	
});


function setLeftMenu(id, name) {
	getMenuSeq(parent.tMenuList, id);
	var menuseq	 = _jex_menu_seq;

	var menu	 = parent.tMenuList[menuseq].sub;
	if (name==undefined) name	 = parent.tMenuList[menuseq].name;
	$("#_jex_left_title").html(name); //���ʸ޴� �޴� ���� �������ش�.
	$("#Left_Menu").jexTree('make', {onclick:function(opt) { var url=opt.url; if (url==undefined || url==null) url=opt.id+".act"; parent.openTab(opt.id, opt.name, url); } });
	$("#Left_Menu").jexTree('addList', menu); 
}

function isIngnoreList(v) {
	for (var i=0; i<_ingnore_List.length;i++) {
		if (_ingnore_List[i]==v) return true;
	}
	return false;
}

function setLeftMenu(id, name) {
	getMenuSeq(parent.tMenuList, id);
	var menuseq	 = _jex_menu_seq;

	var menu	 = parent.tMenuList[menuseq].sub;
	if (name==undefined) name	 = parent.tMenuList[menuseq].name;

	$("#_jex_left_title").html(name); //���ʸ޴� �޴� ���� �������ش�.
	
	///////////////////////////////////////////////
	// Location ���� �ϴ� �κ�
	///////////////////////////////////////////////		
	getLocation(id, name, _jex_title);
	$("#Left_Menu").jexTree('make', {onclick:function(opt) { var url=opt.url; if (url==undefined || url==null) url=opt.id+".act"; parent.openTab(opt.id, opt.name, "/"+url+_url_post_fix); } });
	$("#Left_Menu").jexTree('addList', menu);
}


function getMenuSeq(list, id) {
//	alert(list);
	var result = false;
	$.each(list, function(i,v) {
		if (v.type=="folder") {
			result = getMenuSeq(v.sub, id);
			if (result) {
				_jex_menu_seq = i;
				return false;
			} else	{
				return true;
			}
		} else {
			if (v.url==null) v.url = v.id;
			if (v.url.split(".")[0]==id) {
				result = true;
				_jex_menu_seq = i;
				return false;
			}
		}
	});
	return result;
}

function getLocation(id, depthName, title)
{
	var menu_name = "";
	//////////////////////////////////////////////////
	// �����޴���        : ��������
	// �����޴� Ǯ���� : ��������, �����������, ������������
	//////////////////////////////////////////////////
	if( id == "rtask_0001_01" || id == "rtask_0002_01" || id == "rtask_0003_01" || id == "rtask_0004_01" || id == "rtask_0005_01" )
	{
		menu_name = "��������";
	}
	else if( id == "rtask_0006_01" || id == "rtask_0006_02" || id == "rtask_0006_03" || id == "rtask_0007_01" )
	{
		menu_name = "�����������";		
	}
	else if( id == "rtask_0009_01" || id == "rtask_0010_01" || id == "rtask_0011_01" || id == "rtask_0012_01" || 
			 id == "rtask_0013_01" || id == "rtask_0014_01" || id == "rtask_0015_01" || id == "rtask_0016_01" ||
			 id == "rtask_0017_t00_01" || id == "rtask_0018_01" || id == "rtask_0019_01" )
	{
		menu_name = "������������";
	}
	//////////////////////////////////////////////////
	// �����޴���        : �������
	// �����޴� Ǯ���� : ����䱸����, ī�����, ȸ�谨��
	//////////////////////////////////////////////////
	else if( id == "rexpe_0001_01" || id == "rexpe_0002_01" || id == "rexpe_0003_01" || id == "rexpe_0004_01" || id == "rexpe_0005_01" ||
			 id == "rexpe_0006_01" || id == "rexpe_0007_01" || id == "rexpe_0008_t00_01" )
	{
		menu_name = "����䱸����";
	}
	else if( id == "rexpe_0011_01" || id == "rexpe_0012_01" || id == "rexpe_0013_01" || id == "rexpe_0014_01" || id == "rexpe_0015_01" ||
			 id == "rexpe_0016_01" )
	{
		menu_name = "ī�����";
	}
	else if( id == "rexpe_0017_01" || id == "rexpe_0018_01" || id == "rexpe_0019_01")
	{
		menu_name = "ȸ�谨��";
	}
	else if( id == "rexpe_0020_01" || id == "rexpe_0021_01" || id == "rexpe_0022_01"|| id == "rexpe_0023_01" || id == "rexpe_0024_01" )
	{
		menu_name = "���Ź�ǰ����";
	}
//////////////////////////////////////////////////
	// �����޴���        : ��������
	// �����޴� Ǯ���� : ��������, ��������
	//////////////////////////////////////////////////
	else if( id == "revid_0001_01" || id == "revid_0002_01" || id == "revid_0003_01")
	{
		menu_name = "��������";
	}
	else if( id == "revid_0004_01")
	{
		menu_name = "��������";
	}
	//////////////////////////////////////////////////
	// �����޴���        : ���輼��
	// �����޴� Ǯ���� : ��õ¡��, 4�뺸��, �ΰ����Ű��ڷ�����
	//////////////////////////////////////////////////
	else if( id == "rinsu_0001_01" || id == "rinsu_0002_01" )
	{
		menu_name = "��õ¡��";		
	}
	else if( id == "rinsu_0003_01" || id == "rinsu_0004_01" || id == "rinsu_0005_01" || id == "rinsu_0006_01" || id == "rinsu_0007_01" || 
			 id == "rinsu_0008_01" )
	{
		menu_name = "4�뺸��";		
	}
	else if( id == "rinsu_0009_01" || id == "rinsu_0010_01" )
	{
		menu_name = "�ΰ����Ű��ڷ�����";		
	}
	/////////////////////////////////////////////////
	// �����޴���        : �Ϲݾ���
	// �����޴� Ǯ���� : ��������, �⺻�������� , ��Ÿ���������׸�, �м�������� 
	//////////////////////////////////////////////////
	else if( id == "rwork_0001_01" )
	{
		menu_name = "��������";		
	}
	else if( id == "rwork_0002_01" || id == "rwork_0003_01" || id == "rwork_0004_01" || id == "rwork_0005_01" || id == "rwork_0006_01" )
	{
		menu_name = "�⺻��������";		
	}
	else if( id == "rwork_0007_01" || id == "rwork_0008_01" || id == "rwork_0009_01" )
	{
		menu_name = "��Ÿ���������׸�";		
	}
	else if( id == "rwork_0010_01" || id == "rwork_0011_01" || id == "rwork_0012_01" || id == "rwork_0013_01" || id == "rwork_0014_01" ||
			 id == "rwork_0015_01" || id == "rwork_0016_01" || id == "rwork_0017_01" )
	{
		menu_name = "�м��������";		
	}
	else if( id == "rwork_0018_01" || id == "rwork_0019_01" || id == "rwork_0020_01" )
	{
		menu_name = "�ʰ��ٹ����";		
	}
	else if( id == "rwork_0021_01" )
	{
		menu_name = "����а�";		
	}
	else if( id == "rwork_0022_01" || id == "rwork_0023_01" || id == "rwork_0024_01" || id == "rwork_0025_01" )
	{
		menu_name = "SMS�߼�";		
	}
	/////////////////////////////////////////////////////////////////////
	// �����޴���        : ȯ�漳�� 
	// �����޴� ������ : �⺻��������, ���ѱ׷����, �Խ��ǰ���, �ڿ�����, ��Ÿ����
	/////////////////////////////////////////////////////////////////////
	else if(id == "rbase_0001_01" || id == "rbase_0002_01" || id == "rbase_0005_01" || id == "rbase_0006_01" || id == "rbase_0007_01" ||
			id == "rbase_0008_01")
	{		
		menu_name = "�⺻��������";
	}
	else if(id == "rbase_0009_01" || id == "rbase_0010_01" || id == "rbase_0011_01" )
	{		
		menu_name = "���ѱ׷����";
	}
	else if(id == "rbase_0012_01" )
	{		
		menu_name = "�Խ��ǰ���";
	}
	else if(id == "rbase_0013_01" || id == "rbase_0014_01" )
	{		
		menu_name = "�ڿ�����";
	}
	else if(id == "rbase_0003_01" || id == "rbase_0004_01")
	{		
		menu_name = "��Ÿ����";
	}
	
	// Location �� �����ϴ� �κ�
	if(menu_name == null || menu_name == "") {		
		if( id == "rtask_0007_02" )
		{
			$("#content").find(".content_box").find("#location").html(depthName +  " &gt ������û���� &gt ������û����");
		}	
		else if( id == "rtask_0008_t00_01" )
		{
			$("#content").find(".content_box").find("#location").html(depthName +  " &gt ������������ &gt �������� &gt �⺻����");
		}
		else
		{
			$("#content").find(".content_box").find("#location").html(depthName + " &gt " +_jex_title);
		}
	}else{
		if(id == "rtask_0006_03") 
		{
			$("#content").find(".content_box").find("#location").html(depthName + " &gt " + menu_name + " &gt " + _jex_title + " &gt " + "����ȸ");
		}
		else
		{
			$("#content").find(".content_box").find("#location").html(depthName + " &gt " + menu_name + " &gt " + _jex_title);
		}
	}
	
	// �����������
	if(id == "rtask_0006_02" )
	{
		$("#content").find(".content_box").find("h1:first").html(_jex_title_prefix+getTitle()+_jex_title_postfix + " ���/����");
	} 
	else if( id == "rtask_0007_02" )
	{
		$("#content").find(".content_box").find("h1:first").html(_jex_title_prefix+"������û����"+_jex_title_postfix + " ���/����");
	}
	
};



/*
if (top.location.href.indexOf("dev." > -1)) {
    if (window.location.href.indexOf("index.jsp") < 0 && window.location.href.indexOf("menuManage.jsp") < 0) document.write('<div style="position: absolute; width: 209px; height: 34px; z-index: 2; left: 10px; top: 10px; border:1" id="layer1"><font color="#00FFFF" size="3"><b>DEV SITE</b></font></div>');
}
*/
if (document.getElementById && !document.all){
    var isNS = true;
    var isIE = false;
}
else{
    var isIE = true;
    var isNS = false;
}

if(!window.event && window.captureEvents) {
  // set up event capturing for mouse events (add or subtract as desired)
  window.captureEvents(Event.MOUSEOVER|Event.MOUSEOUT|Event.CLICK|Event.DBLCLICK);
  // set window event handlers (add or subtract as desired)
  window.onmouseover = WM_getCursorHandler;
  window.onmouseout = WM_getCursorHandler;
  window.onclick = WM_getCursorHandler;
  window.ondblclick = WM_getCursorHandler;
  // create an object to store the event properties
  window.event = new Object;
}


var USE_PRINT = false;

/* ���콺 ���� �κ� 2����Ʈ�� ��ȯ ���� */
copyBool=false;
var copiedtext="";

/*
    select box �� text �� ��ġ�ϴ� �׸��� ã�Ƽ� select�Ѵ�.

    searchText          : ã������ �ϴ� text ��
    targetSelectBoxID   : searchText�� ã�� ���� select box �� id
*/
function selectOptionValue(searchText, targetSelectBoxID){
    var toptions    = document.getElementById(targetSelectBoxID);
    var str         = searchText;

    if (str != '') {
        for (var idx= 0 ; idx < (toptions.options.length); idx++){

            if (toptions.options[idx].text.indexOf(str) > -1){
                toptions.options[idx].selected = true;
            }
            else{
                toptions.options[idx].selected = false;
            }
        }
    }

}

// select box �� option���� ��� �����Ѵ�.
function deleteAllOptions(selectBoxObject) {

    var selObj = selectBoxObject;
    selObj.options.length = null;
    /*
    for (var r=0; r<selObj.options.length; r++) {
        selObj.options.length = null;
    }
    */
}

// select box �� option�� �߰��Ѵ�.
function appendOption(selectBoxObject, optionValue, optionText) {
    var selObj = selectBoxObject;
    selObj.options[selObj.options.length] = new Option(optionText, optionValue);
    /*
    var optObj = document.createElement("OPTION");

    optObj.text = optionText;
    optObj.value = optionValue;
    selObj.options.add(optObj);
    */
}


/*
    select box �� text �� ó�� ��ġ�ϴ� �׸��� ã�Ƽ� select�Ѵ�.

    searchText          : ã������ �ϴ� text ��
    targetSelectBoxID   : searchText�� ã�� ���� select box �� id
*/
function searchOptionValue(searchText, targetSelectBoxID  ){
    var toptions    = document.getElementById(targetSelectBoxID);
    var str         = searchText;

    toptions.selectedIndex = -1;

    if (str != '') {
        for (var idx= 0 ; idx < (toptions.options.length); idx++){

            if (toptions.options[idx].text.indexOf(str) == 0){
                toptions.options[idx].selected = true;
                break;
            }
            else{
                toptions.options[idx].selected = false;
            }
        }
    }

}

function initiatecopy() {
    copyBool=true;
}

// ���� �κ� ī���Ͽ� Ŭ�����忡 ����
function copyit() {
    if (copyBool) {
        copiedtext = "";
        document.execCommand("Copy");
        if(window.clipboardData.getData("Text") != ''){
            copiedtext=window.clipboardData.getData("Text");
        }
        copyBool=false;
    }
}

// Ŭ���Ͽ� �巡���� �κ� 2����Ʈ�� ��ȯ
    function clickHalf2Full(){
        var ctrl = window.event.ctrlKey;
        var shift = window.event.shiftKey;
        var obj_full = this;
        var temp_copy;
        var org_value;
        if(ctrl && shift && event.keyCode == 38){
            initiatecopy();
            copyit();
            org_value = obj_full.value;
            temp_copy = copiedtext;
            if(temp_copy != null && temp_copy.replace(/ /gi,"") != ''){
                this.value = org_value.substring(0,org_value.indexOf(copiedtext)) + Half2Full(copiedtext) + org_value.substring(org_value.indexOf(copiedtext)+copiedtext.length);
                window.clipboardData.setData("Text","");
            }
        }
    }

/* ���콺 ���� �κ� 2����Ʈ�� ��ȯ �� */

function WM_getCursorHandler(e) {
  // set event properties to global vars (add or subtract as desired)
  window.event.clientX = e.pageX;
  window.event.clientY = e.pageY;
  window.event.x = e.layerX;
  window.event.y = e.layerY;
  window.event.screenX = e.screenX;
  window.event.screenY = e.screenY;
  // route the event back to the intended function
  if ( routeEvent(e) == false ) {
    return false;
  } else {
    return true;
  }
}

// select box�� ���õ� value�� �����Ѵ�.(�� multi select�� ���� ����)
function getSelectBoxValue(obj)
{
    var options = obj.options;
    for(var i=0; i<options.length; i++) {
        if (options[i].selected) {
            return options[i].value;
        }
    }
}


// select box�� ���õ� text�� �����Ѵ�.(�� multi select�� ���� ����)
function getSelectBoxText(obj)
{
    var options = obj.options;
    for(var i=0; i<options.length; i++) {
        if (options[i].selected) {
            return options[i].text;
        }
    }
}

function initDocument(width, height)
{
    if ( typeof document.appletmain == "undefined" )  return;

    if(document.appletmain.isActive())
    {
        document.all("appletmain").style.visibility = "visible";
        document.all("appletmain").style.width = width;
        document.all("appletmain").style.height = height;
    }
    else
    {
        setTimeout("initDocument('" + width + "','" + height + "');",1);
    }
}



function initDocument1(width, height)
{
    if ( typeof appletmain1 == "undefined" )  return;

    if(appletmain.isActive())
    {
        document.all("appletmain1").style.visibility = "visible";
        document.all("appletmain1").style.width = width;
        document.all("appletmain1").style.height = height;
    }
    else
    {
        setTimeout("initDocument1('" + width + "','" + height + "');",1);
    }
}

// ĳ���� Ÿ�� ���� 'H'-�ѱ�, 'E'-����, 'N'-����, 'Z'-��Ÿ
function getCharType(pValue){
    var bHan = false;
    var bAlp = false;
    var bNum = false;
    var bEtc = false;

    var retStr="";

    if(isEmpty(pValue)){
        return "";
    }

    for(var idx=0; idx < pValue.length; idx++){
        if (isAlpha(pValue[idx])) {
            bAlp = true;
        }
        else if (isNum(pValue[idx])) {
            bNum = true;
        }
        else if (isHangul(pValue[idx])) {
            bHan = true;
        }
        else {
            bEtc = true;
        }

        if (bHan) retStr = retStr + "H";
        if (bAlp) retStr = retStr + "E";
        if (bNum) retStr = retStr + "N";
        if (bEtc) retStr = retStr + "Z";
    }

    return retStr;
}

// �̾�ȣȭ �б�
function go_pass(sUrl, sTarget){
    if (sTarget == null) {
        sTarget = "_self";
    }
    tempPassForm.target = sTarget;
    tempPassForm.action = sUrl;
    tempPassForm.submit();
}

// ��ȣȭ �б�
function go_tempPass(sUrl, sTarget){
    if (sTarget == null) {
        sTarget = "_self";
    }
    tempPassForm.target = sTarget;
    tempPassForm.action = sUrl;
    go_encSubmit(tempPassForm);
}


//��â ���� �Լ�
function uf_newWin( url, winName, sizeW, sizeH, frm)
{
	
    if(frm=="" || frm=="undefined" || frm==undefined) frm = document.frm;
	
    if(winName=="" || winName=="undefined") winName = "Default";

    var nLeft  = screen.width/2 - sizeW/2 ;
    var nTop  = screen.height/2 - sizeH/2 ;

    opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=yes,resizable=yes";
    window.open('', winName, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + opt );
	
    frm.target = winName;
    frm.action = url;
    frm.method = "post";

    fn_submit(frm);

}




//��â ���� �Լ�
function uf_newModalWin( url, winName, sizeW, sizeH)
{
    var nLeft  = screen.width/2 - sizeW/2 ;
    var nTop  = screen.height/2 - sizeH/2 ;



    opt = "scroll=no;status=no;help=no;resizable:no;";
    window.showModalDialog(url, winName, "dialogWidth=" + sizeW + "px;dialogHeight="  +sizeH + "px;dialogLeft=" + nLeft + ";dialogTop=" + nTop + ";" + opt);

}





//��â ���� �Լ�
function uf_frmNewWin( url, winName, sizeW, sizeH)
{
    var nLeft  = screen.width/2 - sizeW/2 ;
    var nTop  = screen.height/2 - sizeH/2 ;
    var pos = 0;
    var winObj;

    opt = ",toolbar=no,menubar=no,location=no,scrollbars=no,status=no, resizable = yes";
    winObj = window.open("", winName, "width=" + sizeW + ",height=" + sizeH  + opt );

    if (winObj == null) {
        alert("�˾����� ����� �����Ͻʽÿ�.\n\n[ ����->���ͳݿɼ�->���� ����->�˾�����] üũ����");
        return;
    }


    document.frm.target = winName;
    document.frm.action = url;
    document.frm.submit();

}


//��â ���� �Լ�
function uf_frmNewWin2(userFrm, url, winName, sizeW, sizeH)
{
    var nLeft  = screen.width/2 - sizeW/2 ;
    var nTop  = screen.height/2 - sizeH/2 ;
    var pos = 0;
    var winObj;

    opt = ",toolbar=no,menubar=no,location=no,scrollbars=no,status=no, resizable = no";
    winObj = window.open("", winName, "width=" + sizeW + ",height=" + sizeH  + opt );

    if (winObj == null) {
        alert("�˾����� ����� �����Ͻʽÿ�.\n\n[ ����->���ͳݿɼ�->���� ����->�˾�����] üũ����");
        return;
    }


    userFrm.target = winName;
    userFrm.action = url;
    userFrm.submit();

}



//��â ������ ����
function uf_reSize ( sizeW, sizeH)
{
    window.resizeTo( sizeW, sizeH );
    moveCenter();

}

// ȭ���� �߾����� �̵�
function moveCenter() {
   if (document.layers) {
       var sinist = screen.width / 2 - outerWidth / 2;
       var toppo = screen.height / 2 - outerHeight / 2;
   } else {
       var sinist = screen.width / 2 - document.body.offsetWidth / 2;
       var toppo = -55 + screen.height / 2 - document.body.offsetHeight / 2;
   }
   self.moveTo(sinist, toppo);
}

//�ɼ��� �ִ°��

function selDataChange(form) {
  var DataIndex=form.url.selectedIndex;
  if (form.url.options[DataIndex].value != null) {
       location=form.url.options[DataIndex].value;
  }
}

function selDataChange2(form) {
  var DataIndex=form.url2.selectedIndex;
  if (form.url2.options[DataIndex].value != null) {
       location=form.url2.options[DataIndex].value;
  }
}

/**
 * �Է°��� NULL���� üũ
 */
function isNull(input) {
    if (input.value == null || input.value == "") {
        return true;
    }
    return false;
}

/**
 * �Է°��� �����̽� �̿��� �ǹ��ִ� ���� �ִ��� üũ
 * ex) if (isEmpty(form.keyword)) {
 *         alert("�˻������� �Է��ϼ���.");
 *     }
 */
function isEmptyByObj(input) {
    return isEmpty(input.value);
}


/**
 * �Է°��� Ư�� ����(chars)�� �ִ��� üũ
 * Ư�� ���ڸ� ������� ������ �� �� ���
 * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
 *         alert("�̸� �ʵ忡�� Ư�� ���ڸ� ����� �� �����ϴ�.");
 *     }
 */
function containsChars(input,chars) {
    for (var inx = 0; inx < input.value.length; inx++) {
       if (chars.indexOf(input.value.charAt(inx)) != -1)
           return true;
    }
    return false;
}

/**
 * �Է°��� Ư�� ����(chars)������ �Ǿ��ִ��� üũ
 * Ư�� ���ڸ� ����Ϸ� �� �� ���
 * ex) if (!containsCharsOnly(form.blood,"ABO")) {
 *         alert("������ �ʵ忡�� A,B,O ���ڸ� ����� �� �ֽ��ϴ�.");
 *     }
 */
function containsCharsOnly(input,chars) {
    for (var inx = 0; inx < input.value.length; inx++) {
       if (chars.indexOf(input.value.charAt(inx)) == -1)
           return false;
    }
    return true;
}
function isStartWith(input,chars) {
    for (var inx = 0; inx < chars.length; inx++) {
       if (chars.indexOf(input.value.charAt(0)) == -1)
           return false;
    }
    return true;
}
/**
 * �Է°��� ���ĺ����� üũ
 */
function isAlphabet(input) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    return containsCharsOnly(input,chars);
}

/**
 * �Է°��� ���ĺ� �빮������ üũ
 */
function isUpperCase(input) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    return containsCharsOnly(input,chars);
}

/**
 * �Է°��� ���ĺ� �ҹ������� üũ
 */
function isLowerCase(input) {
    var chars = "abcdefghijklmnopqrstuvwxyz ";
    return containsCharsOnly(input,chars);
}

/**
 * �Է°��� ���ڸ� �ִ��� üũ
 */
function isNumber(input) {
    var chars = "0123456789";
    return containsCharsOnly(input,chars);
}

/**
 * �Է°��� ���ĺ�,���ڷ� �Ǿ��ִ��� üũ
 */
function isAlphaNum(input) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    return containsCharsOnly(input,chars);
}

function isBigAlphaNum(input) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    return containsCharsOnly(input,chars);
}
/**
 * �Է°��� ����,���(-)�� �Ǿ��ִ��� üũ
 */
function isNumDash(input) {
    var chars = "-0123456789";
    return containsCharsOnly(input,chars);
}

/**
 * �Է°��� ����,�޸�(,)�� �Ǿ��ִ��� üũ
 */
function isNumComma(input) {
    var chars = ",0123456789";
    return containsCharsOnly(input,chars);
}

/**
 * �Է°��� ����ڰ� ������ ���� �������� üũ
 * �ڼ��� format ������ �ڹٽ�ũ��Ʈ�� 'regular expression'�� ����
 */
function isValidFormat(input,format) {
    if (input.value.search(format) != -1) {
        return true; //�ùٸ� ���� ����
    }
    return false;
}

/**
 * �Է°��� �̸��� �������� üũ
 * ex) if (!isValidEmail(form.email)) {
 *         alert("�ùٸ� �̸��� �ּҰ� �ƴմϴ�.");
 *     }
 */
function isValidEmail(input) {
//    var format = /^(\S+)@(\S+)\.([A-Za-z]+)$/;
    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    return isValidFormat(input,format);
}

/**
 * �Է°��� ��ȭ��ȣ ����(����-����-����)���� üũ
 */
function isValidPhone(input) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(input,format);
}

/**
 * �Է°��� ����Ʈ ���̸� ����
 * ex) if (getByteLength(form.title) > 100) {
 *         alert("������ �ѱ� 50��(���� 100��) �̻� �Է��� �� �����ϴ�.");
 *     }
 */
function getByteLength(input) {
    var byteLength = 0;
    for (var inx = 0; inx < input.value.length; inx++) {
        var oneChar = escape(input.value.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
}

/**
 * ���ڿ��� ����Ʈ ���̸� ����
 */
function getStringByteLength(str) {
    var byteLength = 0;
    for (var inx = 0; inx < str.length; inx++) {
        var oneChar = escape(str.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
}

/**
 * �Է°����� �޸��� ���ش�.
 */
function removeComma(input) {
    return input.replace(/,/gi,"");
}

/**
 * ���õ� ������ư�� �ִ��� üũ
 */
function hasCheckedRadio(input) {
    if (input.length > 1) {
        for (var inx = 0; inx < input.length; inx++) {
            if (input[inx].checked) return true;
        }
    } else {
        if (input.checked) return true;
    }
    return false;
}

/**
 * ���õ� ������ư�� �ִ��� üũ
 */
function getCheckedRadioValue(input) {
    if (input.length > 1) {
        for (var inx = 0; inx < input.length; inx++) {
            if (input[inx].checked) return input[inx].value;
        }
    } else {
        if (input.checked) return input.value;
    }
    return false;
}


/**
 * ���õ� üũ�ڽ��� �ִ��� üũ
 */
function hasCheckedBox(input) {
    return hasCheckedRadio(input);
}


/**
 * ���õ� üũ�ڽ���  �����  �� ������ ��ȯ
 */
function hasMultiCheckedRadio(input) {
var kkkk = 0;
    if (input.length > 1) {
        for (var inx = 0; inx < input.length; inx++) {
            if (input[inx].checked) {
            kkkk++;
            }
        }
    } else {
         if (input.checked) kkkk=1;
    }
    return kkkk;
}

/**
 * ��ȿ��(�����ϴ�) ��(��)���� üũ
 */
function isValidMonth(mm) {
    var m = parseInt(mm,10);
    return (m >= 1 && m <= 12);
}

/**
 * ��ȿ��(�����ϴ�) ��(��)���� üũ
 */
function isValidDay(yyyy, mm, dd) {
    var m = parseInt(mm,10) - 1;
    var d = parseInt(dd,10);

    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1] = 29;
    }

    return (d >= 1 && d <= end[m]);
}

/**
 * ��ȿ��(�����ϴ�) ��(��)���� üũ
 */
function isValidHour(hh) {
    var h = parseInt(hh,10);
    return (h >= 1 && h <= 24);
}

/**
 * ��ȿ��(�����ϴ�) ��(��)���� üũ
 */
function isValidMin(mi) {
    var m = parseInt(mi,10);
    return (m >= 1 && m <= 60);
}

/**
 * Time �������� üũ(������ üũ)
 */
function isValidTimeFormat(time) {
    return (!isNaN(time) && time.length == 12);
}

/**
 * ��ȿ�ϴ�(�����ϴ�) Time ���� üũ
 * ex) var time = form.time.value; //'200102310000'
 *     if (!isValidTime(time)) {
 *         alert("�ùٸ� ��¥�� �ƴմϴ�.");
 *     }
 */
function isValidTime(time) {
    var year  = time.substring(0,4);
    var month = time.substring(4,6);
    var day   = time.substring(6,8);
    var hour  = time.substring(8,10);
    var min   = time.substring(10,12);

    if (parseInt(year,10) >= 1900  && isValidMonth(month) &&
        isValidDay(year,month,day) && isValidHour(hour)   &&
        isValidMin(min)) {
        return true;
    }
    return false;
}

/**
 * Time ��Ʈ���� �ڹٽ�ũ��Ʈ Date ��ü�� ��ȯ
 * parameter time: Time ������ String
 */
function toTimeObject(time) { //parseTime(time)
    var year  = time.substr(0,4);
    var month = time.substr(4,2) - 1; // 1��=0,12��=11
    var day   = time.substr(6,2);
    var hour  = time.substr(8,2);
    var min   = time.substr(10,2);

    return new Date(year,month,day,hour,min);
}

/**
 * �ڹٽ�ũ��Ʈ Date ��ü�� Time ��Ʈ������ ��ȯ
 * parameter date: JavaScript Date Object
 */
function toTimeString(date) { //formatTime(date)
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
    var day   = date.getDate();
    var hour  = date.getHours();
    var min   = date.getMinutes();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
    if (("" + hour).length  == 1) { hour  = "0" + hour;  }
    if (("" + min).length   == 1) { min   = "0" + min;   }

    return ("" + year + month + day + hour + min)
}
/**
 * Time�� ����ð� ����(�̷�)���� üũ
 */
function isFutureTime(time) {
    return (toTimeObject(time) > new Date());
}

/**
 * Time�� ����ð� ����(����)���� üũ
 */
function isPastTime(time) {
    return (toTimeObject(time) < new Date());
}

/**
 * �־��� Time �� y�� m�� d�� h�� ���̳��� Time�� ����
 * ex) var time = form.time.value; //'20000101000'
 *     alert(shiftTime(time,0,0,-100,0));
 *     => 2000/01/01 00:00 ���κ��� 100�� �� Time
 */
function shiftTime(time,y,m,d,h) { //moveTime(time,y,m,d,h)
    var date = toTimeObject(time);

    date.setFullYear(date.getFullYear() + y); //y���� ����
    date.setMonth(date.getMonth() + m);       //m���� ����
    date.setDate(date.getDate() + d);         //d���� ����
    date.setHours(date.getHours() + h);       //h�ø� ����

    return toTimeString(date);
}

/**
 * �� Time�� �� ���� ���̳����� ����
 * time1�� time2���� ũ��(�̷���) minus(-)
 */
function getMonthInterval(time1,time2) { //measureMonthInterval(time1,time2)
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);

    var years  = date2.getFullYear() - date1.getFullYear();
    var months = date2.getMonth() - date1.getMonth();
    var days   = date2.getDate() - date1.getDate();

    return (years * 12 + months + (days >= 0 ? 0 : -1) );
}

/**
 * �� Time�� ��ĥ ���̳����� ����
 * time1�� time2���� ũ��(�̷���) minus(-)
 */
function getDayInterval(time1,time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var day   = 1000 * 3600 * 24; //24�ð�

    return parseInt((date2 - date1) / day, 10);
}

/**
 * �� Time�� �� �ð� ���̳����� ����
 * time1�� time2���� ũ��(�̷���) minus(-)
 */
function getHourInterval(time1,time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var hour  = 1000 * 3600; //1�ð�

    return parseInt((date2 - date1) / hour, 10);
}

/**
 * ���� �ð��� Time �������� ����
 */
function getCurrentTime() {
    return toTimeString(new Date());
}

/**
 * ���� �ð��� y�� m�� d�� h�� ���̳��� Time�� ����
 */
function getRelativeTime(y,m,d,h) {

    return shiftTime(getCurrentTime(),y,m,d,h);
}

/**
 * ���� Ҵ�� YYYY�������� ����
 */
function getYear() {

    return getCurrentTime().substr(0,4);
}

/**
 * ���� ���� MM�������� ����
 */
function getMonth() {

    return getCurrentTime().substr(4,2);
}

/**
 * ���� ���� DD�������� ����
 */
function getDay() {

    return getCurrentTime().substr(6,2);
}

/**
 * ���� ���� HH�������� ����
 */
function getHour() {

    return getCurrentTime().substr(8,2);
}

/**
 * ������ ���� �����̾�?
 * ex) alert('������ ' + getDayOfWeek() + '�����Դϴ�.');
 */
function getDayOfWeek() {
    var now = new Date();

    var day = now.getDay(); //�Ͽ���=0,������=1,...,�����=6
    var week = new Array('��','��','ȭ','��','��','��','��');

    return week[day];
}


/**
 * Ư����¥�� ������ ���Ѵ�.
 */
function getDayOfWeek(time) {
    var now = toTimeObject(time);

    var day = now.getDay(); //�Ͽ���=0,������=1,...,�����=6
    var week = new Array('��','��','ȭ','��','��','��','��');

    return week[day];
}


/**
 * Ư����¥�� ������ �迭 ���� ���Ѵ�.
 */
function getDayOfWeekNum(time) {
    var now = toTimeObject(time);

    var day = now.getDay(); //�Ͽ���=0,������=1,...,�����=6

    return day;
}


/**
*   ���ڿ��� ������ ������ ���� ������ ������ŭ�� ���ڵ��� �����Ѵ�.
*/

function substrInverse(str, num)
{
    var len;

    len = str.length;

    return str.substr(len - num, num);
}

/**
*  ���ڿ����� Ư����ġ�κ��� ������ ������ ���ڵ��� �����Ѵ�.
*/
function substrMid(str, idx, num)
{
    return str.substr( idx-1, num);
}



/**
* Cookie ���ϱ�
*/


function getCookie(uName) {

    var flag = document.cookie.indexOf(uName+'=');
    if (flag != -1) {
        flag += uName.length + 1
        end = document.cookie.indexOf(';', flag)

        if (end == -1) end = document.cookie.length
        return unescape(document.cookie.substring(flag, end))
    }
}

    function Half2Full(HalfVal)
    {
            var arg;
            arg = myHalf2Full(HalfVal);
        return arg;
    }

function myHalf2Full(HalfVal)
{
        var FullChar = [
               "��", "��","��","��","��","��","��","��","��",       //33~
        "��","��","��","��","��","��","��","��","��","��",      //41~
        "��","��","��","��","��","��","��","��","��","��",      //51~
        "��","��","��","��","��","��","��","��","��","��",      //61~
        "��","��","��","��","��","��","��","��","��","��",      //71~
        "��","��","��","��","��","��","��","��","��","��",      //81~
        "��","��","��","��","��","��","��","��","��","��",      //91~
        "��","��","��","��","��","��","��","��","��","��",      //101~
        "��","��","��","��","��","��","��","��","��","��",      //111~
        "��","��","��","��","��","��"                           //121~
        ];
    var stFinal = "";
        var ascii;
        for( i = 0; i < HalfVal.length; i++)
        {
                ascii = HalfVal.charCodeAt(i);
                if( (31 < ascii && ascii < 128))
                {
                  stFinal += FullChar[ascii-32];
                }
                else
                {
                  stFinal += HalfVal.charAt(i);
                }
        }
        return stFinal;
}
function frmMoney(input){
    input.value = putComma(input);
}
function unFrmMoney(input){
    input.value = replace(input.value,",","");
}
function frmDate(input){
    if(input.value=="") return
    input.value = input.value.substring(0,4) + "-" + input.value.substring(4,6) + "-" + input.value.substring(6,8);
}
function unFrmDate(input){
    input.value = replace(input.value,"-","");
}
function frmTime(input){
    input.value = input.value.substring(0,2) + ":" + input.value.substring(2,4) + ":" + input.value.substring(4,6);
}
function unFrmTime(input){
    input.value = replace(input.value,":","");
}
function frmAcct(input){
    input.value = input.value.substring(0,3) + "-" + input.value.substring(3,9) + "-" + input.value.substring(9,14);
}
function unFrmAcct(input){
    input.value = replace(input.value,"-","");
}


function putCashDash(value){
    if(value=="") return ;
    value = value.substring(0,4) + "-" + value.substring(4,8) + "-" + value.substring(8,12)+ "-" + value.substring(12);
    return value;
}

function selectAll(input) {
    for(i=0;i<input.options.length;i++){
        input.options[i].selected=true;
    }
}

// ���� �ŷ��� ���� �ϱ� ���� ó���������� ����� ���� ȣ���Ͽ� �ش�.
/*
function setDupCheckInfo(target_frm)
{
    // ���� ������ ������Ʈ ����
    if(target_frm._submit_time != null && target_frm._submit_time != undefined  ) {
        target_frm.removeChild(_submit_time);
    }

    var e=document.createElement("input");
    now = new Date();
    e.setAttribute("type" , "hidden");
    e.setAttribute("name" , "_submit_time");
    e.setAttribute("value", new Date().getTime());
    e.setAttribute("_temp2","true");
    target_frm.appendChild(e);
}
*/

function setSelect(input,str) {
    for(i=0;i<input.options.length;i++){
        if(input.options[i].value == str)
            input.options[i].selected=true;
    }
}
// ��ȯ���� Ư�� ��ȭ�϶� �Ҽ������� �ݾ׾��ֱ�
function Curr(str1, str2){
    obj1 = eval("frm."+str1+".value")
    obj2 = eval("frm."+str2+".style")
    if(obj1=="JPY"||obj1=="ITL"||obj1=="BEF"||obj1=="KRW"){
        obj2.display = "none"
    }else{
        obj2.display = ""
    }
}
function Curr2(str1, str2, str3){
    obj1 = eval("frm."+str1+".value")
    obj2 = eval("frm."+str2+".style")
    obj3 = eval("frm."+str3+".style")
    if(obj1=="JPY"||obj1=="ITL"||obj1=="BEF"||obj1=="KRW"){
        obj2.display = "none"
        obj3.display = "none"
    }else{
        obj2.display = ""
        obj3.display = ""
    }
}


/*
* �ѹ����� ����ȣ ����(9�ڸ�)
* �տ� '0'�� ä���
* by ysd 2002-03-28 11:36����
**/

function fill_cifno(obj){
    var temp="";

    if(obj.value == null || obj.value.length < 1 ){
        alert("����ȣ�� �Է��ϼ���");
        obj.focus();
        return false;
    }
    if(obj.value.length != 9 ){
        for(i=0;i<(9-obj.value.length);i++){
            temp +="0";
        }
        obj.value = temp+obj.value;
    }else{
        obj.value = obj.value;
    }

    return true;
}



////////////////////////////////////////////////////////////////
// ������ �������� ����
////////////////////////////////////////////////////////////////

// get ����� �Ķ���͸� �ش����� input hidden ��ü�� �����Ѵ�.
function get2post(frm,sSearch){
    if (sSearch.length > 0) {

        var asKeyValues = sSearch.split('&');
        var asKeyValue  = '';

        for (var i = 0; i < asKeyValues.length; i++) {

            asKeyValue = asKeyValues[i].split('=');
            var e = document.createElement("input");
            e.setAttribute("type","hidden");
            e.setAttribute("name",asKeyValue[0]);
            e.setAttribute("value",asKeyValue[1]);
            e.setAttribute("_temp","true");

//          alert("[" + e.name +"]:[" + e.value +"]");

            frm.appendChild(e);
        }
     }
//   alert("form ��ü ����" + frm.elements.length);
}

// get2post�� ������ �ӽ� ��ü�� �ı��Ѵ�.
function removeTempAttribute(frm){
    var idx=0;
    while (idx<frm.elements.length) {
        var obj = frm.elements[idx];

        if( obj.getAttribute("_temp") != null && obj.getAttribute("_temp") == "true"){
            frm.removeChild(obj);
            continue;
        }
        idx++;
    }
}



////////////////////////////////////////////////////////////////
// checkbox ����
////////////////////////////////////////////////////////////////

// check �� ������ �����Ѵ�.
function getCheckedCount( aElem ) {

    var elem = document.all;
    var cnt = 0;

    for ( var i=0; i<document.all.length; i++ ) {
        if ( ( elem[i].type == "checkbox" ) && ( elem[i].checked ) && ( elem[i].name == aElem ) )   cnt = cnt + 1;
    }

    return cnt;
}

    // ������ �̸��� checkbox�� ã�Ƽ� �־��� ���� �ش��ϴ� box�� check�Ѵ�.
function checkValue( aElem, aValue ) {

    var elem = document.all;
    var cnt = 0;

    for ( var i=0; i<document.all.length; i++ ) {
        if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) && ( elem[i].value == aValue ) )   elem[i].checked = true;
    }
}



// ������ �̸��� ���� ��� checkbox�� check �Ѵ�.
function checkAll( aElem ) {

    var elem = document.all;
    var cnt = 0;

    for ( var i=0; i<document.all.length; i++ ) {
        if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) )  elem[i].checked = true;
    }
}

// ������ �̸��� ���� ��� checkbox�� uncheck �Ѵ�.
function uncheckAll( aElem ) {

    var elem = document.all;
    var cnt = 0;

    for ( var i=0; i<document.all.length; i++ ) {
        if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) )  elem[i].checked = false;
    }
}

// ������ �̸��� ���� ��� checkbox�� checked ���� ���� �Ѵ�.
function invertCheck( aElem ) {

    var elem = document.all;
    var cnt = 0;

    for ( var i=0; i<document.all.length; i++ ) {
        if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) )  {
            if ( elem[i].checked ) {
                elem[i].checked = false;
            }
            else{
                elem[i].checked = true;
            }
        }
    }
}









            ////////////////////////////////
// UTIL �Լ�
////////////////////////////////

var isDivEvent = false;

function hideOneNav(){
    if (!isDivEvent) {
        window.account.style.visibility='hidden';
    }
    else{
        isDivEvent = false;
    }
}


function showOneNav(obj){
    isDivEvent = true;
    window.account.style.left = getLeftPos(obj);
    window.account.style.top = getTopPos(obj) + obj.offsetHeight - 8;
    window.account.style.visibility='visible';
    return false;
}

function getLeftPos(obj){
    var parentObj = null;
    var clientObj = obj;
    var left = obj.offsetLeft + document.body.clientLeft;

    while((parentObj=clientObj.offsetParent) != null){
        left = left + parentObj.offsetLeft;
        clientObj = parentObj;
    }

    return left;
}

function getTopPos(obj){
    var parentObj = null;
    var clientObj = obj;
    var top = obj.offsetTop + document.body.clientTop;

    while((parentObj=clientObj.offsetParent) != null){
        top = top + parentObj.offsetTop;
        clientObj = parentObj;
    }

    return top;
}

/**
*  ���ڿ��� �ִ� Ư������������ �ٸ� ������������ �ٲٴ� �Լ�.
*/

/*
function replace(targetStr, searchStr, replaceStr)
{
    var len, i, tmpstr;

    len = targetStr.length;
    tmpstr = "";

    for ( i = 0 ; i < len ; i++ ) {
        if ( targetStr.charAt(i) != searchStr ) {
            tmpstr = tmpstr + targetStr.charAt(i);
        }
        else {
            tmpstr = tmpstr + replaceStr;
        }
    }

    return tmpstr;
}
*/

function replace(targetStr, searchStr, replaceStr)
{
    var i=0,j=0;
    if (targetStr == null || searchStr == null || replaceStr == null) return "";

    var tmpStr = "";

    var tlen = targetStr.length;
    var slen = searchStr.length;


    var i=0;
    var j=0;

    while (i < tlen - slen+1)
    {
        j = i + slen;

        if (targetStr.substring(i,j) == searchStr)
        {
            tmpStr += replaceStr;
            i += slen;

        }
        else
        {
            tmpStr += targetStr.substring(i, i + 1);
            i++;
        }



    }

    tmpStr +=  targetStr.substring(i);

    return tmpStr;


}

/**
*  ���ڿ����� �¿� ��������
*/

function trim(str)
{
    return replace(str," ","");
}

/**
*   �޸�����.
*/

function putComma(input) {
    var num = input;

    if (num < 0) {
        num *= -1;
        var minus = true
    }else{
        var minus = false
    }

    var dotPos = (num+"").split(".")
    var dotU = dotPos[0]
    var dotD = dotPos[1]
    var commaFlag = dotU.length%3

    if(commaFlag) {
        var out = dotU.substring(0, commaFlag)
        if (dotU.length > 3) out += ","
    }
    else var out = ""

    for (var i=commaFlag; i < dotU.length; i+=3) {
        out += dotU.substring(i, i+3)
        if( i < dotU.length-3) out += ","
    }

    if(minus) out = "-" + out
    if(dotD) return out + "." + dotD
    else return out
}


//���� �� ���� ���
function getEndDate(datestr){

    //������?
    if(isEmpty(datestr)){
        return null;
    }

    //��������?
    if(!isNum(datestr)){
        return null;
    }

    //���̰� 8�ڸ�?
    if(datestr.length != 6){
        return null;
    }

    var yy = Number(datestr.substring(0,4));
    var mm = Number(datestr.substring(4,6));

    //���� ����
    var boundDay = "";

    if(mm != 2){
        var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        boundDay = mon[mm-1];
    }
    else{
        if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
            boundDay = 29;
        }
        else{
            boundDay = 28;
        }
    }

    return boundDay;
}

// Left ���ڸ� ��ŭ padStr �� ���δ�.
function lpad(src, len, padStr){
    var retStr = "";
    var padCnt = Number(len) - String(src).length;
    for(var i=0;i<padCnt;i++) retStr += String(padStr);
    return retStr+src;
}

// Right ���ڸ� ��ŭ padStr �� ���δ�.
function rpad(src, len, padStr){
    var retStr = "";
    var padCnt = Number(len) - String(src).length;
    for(var i=0;i<padCnt;i++) retStr += String(padStr);
    return src+retStr;
}


// ��ȭ��ȣ ��������
function isValidDDDPhoneNum(dddphonenum)
{

    // ���ΰ�?
    if (isEmpty(dddphonenum)) {
        return null;
    }


    if ( dddphonenum != "02" && dddphonenum != "031" && dddphonenum != "032" && dddphonenum != "033" && dddphonenum != "041" &&
         dddphonenum != "042" && dddphonenum != "043" && dddphonenum != "051" && dddphonenum != "052" && dddphonenum != "053" &&
         dddphonenum != "054" && dddphonenum != "055" && dddphonenum != "061" && dddphonenum != "062" && dddphonenum != "063" &&
         dddphonenum != "064" && dddphonenum != "011" && dddphonenum != "016" && dddphonenum != "017" && dddphonenum != "018" && dddphonenum != "019" && dddphonenum != "010" )
    {

        ERR_MSG = "�߸��� ��ȭ��ȣ �����Դϴ�.";
        return false;
    }

    return true;

}


// �빮�ں�ȯ
function toUpperCase(str){

    if(isEmpty(str)) return str;
    return str.toUpperCase();
}


// ���ڰ���
function isNum(str){

    if(isEmpty(str)) return false;

    for(var idx=0;idx < str.length;idx++){
        if(str.charAt(idx) < '0' || str.charAt(idx) > '9'){
            return false;
        }
    }
    return true;
}


// �����ڰ���
function isAlpha(str){

    if(isEmpty(str)) return false;

    for(var idx=0;idx < str.length;idx++){
        if(!((str.charAt(idx) >='a' && str <= 'z') || (str.charAt(idx) >= 'A' && str <= 'Z'))){
            return false;
        }
    }
    return true;
}


// �ѱ۰���
function isHangul(str){

    if(isEmpty(str)) return false;

    for(var idx=0;idx < str.length;idx++){
      var c = escape(str.charAt(idx));
      if ( c.indexOf("%u") == -1 ) {
            return false;
        }
    }
    return true;
}


// �������� ��ȯ( �ѱ� 2byte ��� )
function getByteLength(s){

   var len = 0;
   if ( s == null ) return 0;
   for(var i=0;i<s.length;i++){
      var c = escape(s.charAt(i));
      if ( c.length == 1 ) len ++;
      else if ( c.indexOf("%u") != -1 ) len += 2;
      else if ( c.indexOf("%") != -1 ) len += c.length/3;
   }
   return len;
}


// ������ �����Ѵ�.
function isEmpty(pValue){
    if (pValue == null || pValue.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}




//�˻���¥ ��ȿ�Ⱓ
function getBoundDate1(yy,mm,dd,stdDate)
{
    var today = new Date();
    today.setYear(stdDate.substring(0,4));
    today.setMonth(stdDate.substring(4,6)-1);
    today.setDate(stdDate.substring(6,8));
    today.setHours(today.getHours());
    today.setMinutes(today.getMinutes());
    today.setSeconds(today.getSeconds());

    yy = Number(yy);
    mm = Number(mm);
    dd = Number(dd);

    var date = new Date();

    var DAY = 24 * 60 * 60 * 1000;

    if ( yy != 0 ){
        date.setTime(today.getTime() + DAY * 365 * yy);
    }

    if ( mm != 0 ){
        date.setTime(today.getTime() + DAY * 30 * mm);
    }

    if ( dd != 0 ){
        date.setTime(today.getTime() + DAY * dd);
    }

    return lpad(new String(date.getYear()),4,'0') + lpad(new String(date.getMonth() + 1),2,'0') + lpad(new String(date.getDate()),2,'0');
}



function getBoundDate(yy, mm, dd) {
    yy = Number(yy);
    mm = Number(mm);
    dd = Number(dd);

    var date = new Date();

    var DAY = 24 * 60 * 60 * 1000;


    if ( yy != 0 ){
        date.setTime(datToday.getTime() + DAY * 365 * yy);
    }

    if ( mm != 0 ){
        date.setTime(datToday.getTime() + DAY * 30 * mm);
    }

    if ( dd != 0 ){
        date.setTime(datToday.getTime() + DAY * dd);
    }

    return lpad(new String(date.getYear()),4,'0') + lpad(new String(date.getMonth() + 1),2,'0') + lpad(new String(date.getDate()),2,'0');
}


//�˻���¥ üũ
function isVaildTerm(obj,yy,mm,dd)
{
    var datestr = obj.value;


    //������?
    if(isEmpty(datestr)){
        return null;
    }

    // ��¥ ��������
    obj_removeformat(obj);

    //8�ڸ�����?
    if (getByteLength(datestr) != 8) {
        alert("��¥�� '-'�� ������ 8�ڸ� ���ڷ� �Է��Ͻʽÿ�.");
        return false;

    }



    // yy,mm,dd,fromto�� ���� ���
    if (yy == null) yy = 0;
    if (mm == null) mm = 0;
    if (dd == null) dd = 0;

    // �˻���¥ ��ȿ�Ⱓ ��������
    var boundDate = getBoundDate(yy,mm,dd);

    if (yy < 0  || mm < 0  || dd < 0) {
        if ( boundDate > datestr) {
            alert("��ȿ���� ���� �˻���¥�Դϴ�.\n��ȿ�� ��¥��" + boundDate.substring(0,4) + "�� " + boundDate.substring(4,6) + "�� " + boundDate.substring(6) + "�Ϻ��� �Դϴ�.");
            obj.select();
            return false;
        }
    } else {
        if ( boundDate < datestr) {
            alert("��ȿ���� ���� �˻���¥�Դϴ�.\n��ȿ�� ��¥��" + boundDate.substring(0,4) + "�� " + boundDate.substring(4,6) + "�� " + boundDate.substring(6) + "�ϱ��� �Դϴ�.");
            obj.select();
            return false;
        }
    }


    return true;

}


//���ó�¥
function getToDay()
{

    var date = new Date();

    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    return ("" + year + month + day)

}



function selectComboBox(targt, optValue)
{
    last = targt.length;
    for(var i=0; i<last; i++){
        if(targt.options[i].value == optValue){
            targt.selectedIndex = i;
            targt.options[i].selected;
        }
    }
}


function isExistsComboBoxValue(targt, optValue)
{
    last = targt.length;
    for(var i=0; i<last; i++){
        if(targt.options[i].value == optValue){
            return true;
        }
    }
    return false;
}



// �޺��ڽ��� ��¥�Է�
function getCal(frmName, yearFieldName, monthFieldName, dayFieldName){

var schdate = yearFieldName.value + "" + monthFieldName.value + "" + dayFieldName.value;
window.open("/comm/comm01_03_01p.jsp?frmName=" + frmName.name + "&yearFieldName=" + yearFieldName.name + "&monthFieldName=" + monthFieldName.name + "&dayFieldName=" + dayFieldName.name + "&schdate=" + schdate,"Window2","status=no,height=180,width=160,resizable=no,left="+window.event.screenX+",top="+window.event.screenY+",scrollbars=no");
}




/*
* �ѹ����� ����ڹ�ȣ ����(10�ڸ�)
* �տ� '0'�� ä���
* by lsj 2002-06-19 3:56����
**/

function fill_corpno(obj){
    var temp="";

    if(obj.value == null || obj.value.length < 1 ){

        return false;
    }
    if(obj.value.length != 10 ){
        for(i=0;i<(10-obj.value.length);i++){
            temp +="0";
        }
        obj.value = temp+obj.value;
    }else{
        obj.value = obj.value;
    }

    return true;
}



/*
* ��ȭ��ȣ
* �տ� '0'�� ä���
* by Ȳ���� 2002-10-23 11:26����
**/

function fill_zero(obj, is4){
    var temp="";

    if(obj.value == null || obj.value.length < 1 ) {
        return false;
    }

    if (is4 == 'Y' ) {
        return true;
    } else {
        if(obj.value.length != 4 ) {
            for(i=0;i<(4-obj.value.length);i++){
                temp +="0";
            }
            obj.value = temp+obj.value;
        }else{
            obj.value = obj.value;
        }

        return true;
    }
}

/*
* ���ݸ��� �˸°� �߶� ȭ�鿡 �ѷ��ش�.
*
* by �̼��� 2002-11-10 05:04 ����
*/
function cnv_name(name_str) {
    var str=name_str;
//    var re = /��������룮����/g;
    var re = /goodbank.com/g;
    str = str.replace(re, "�¹�ũ");
    var re = /\��/;
    str = str.replace(re, "<br>(");
    if(str.indexOf('��') != -1) {
        document.write(str.substring(0,str.indexOf('��')))
    } else {
        document.write(str)
    }
}



/*
* ip ���Ŀ� �´� ���������� ����
*/
function isValidIP(v) {
    return (v.search(/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/) > -1);
}





function setUserInfo(frm, userIfrm, cnt) {
    if (cnt == 0 ) return;
    else if (cnt == 1) {
        createObject(frm, "director_seq", userIfrm.frm.director_seq.value);     // �����
        createObject(frm, "nm", userIfrm.frm.nm.value);                         // ����
        createObject(frm, "part", userIfrm.frm.part.value);                     // ����
        createObject(frm, "office_tel", userIfrm.frm.office_tel.value);         // �繫��
        createObject(frm, "tel", userIfrm.frm.tel.value);                       // �ڵ���
        createObject(frm, "email", userIfrm.frm.email.value);                   // email
        createObject(frm, "memo", userIfrm.frm.memo.value);                     // �ֿ������

        if (userIfrm.frm.admin_seq.checked)    createObject(frm, "admin_seq", userIfrm.frm.director_seq.value);

    } else {

        for (var i=0; i< cnt ; i++) {
            createObject(frm, "director_seq", userIfrm.frm.director_seq[i].value);      // �����
            createObject(frm, "nm", userIfrm.frm.nm[i].value);                          // ����
            createObject(frm, "part", userIfrm.frm.part[i].value);                      // ����
            createObject(frm, "office_tel", userIfrm.frm.office_tel[i].value);          // �繫��
            createObject(frm, "tel", userIfrm.frm.tel[i].value);                        // �ڵ���
            createObject(frm, "email", userIfrm.frm.email[i].value);                    // email
            createObject(frm, "memo", userIfrm.frm.memo[i].value);                      // �ֿ������

            if (userIfrm.frm.admin_seq[i].checked)    createObject(frm, "admin_seq", userIfrm.frm.director_seq[i].value);

        }

    }

}

function createObject(frm, nm, key) {
        var e = document.createElement("input");
        e.setAttribute("type","hidden");
        e.setAttribute("name",nm);
        e.setAttribute("value",key);
        e.setAttribute("_temp","true");

        frm.appendChild(e);

}

/* ���콺 ���� �κ� 2����Ʈ�� ��ȯ �ʱ�ȭ ���� */
function half2full_init(){
    for (var idx=0; idx<document.all.tags('INPUT').length; idx++){
        var obj = document.all.tags('INPUT')[idx];
        if(obj.type == "text"){
            if(obj.getAttribute("onkeydown") == null)     obj.onkeydown     = clickHalf2Full;
        }
    }
}
/* ���콺 ���� �κ� 2����Ʈ�� ��ȯ �ʱ�ȭ �� */



function httpSyncCall(url, formName) {
    var objReq = null;
    objReq = new ActiveXObject("Microsoft.XMLHTTP");

    objReq.open("POST", url, false);

    objReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    if (formName) {
        objReq.send(Form.serialize(formName));
    }
    else {
        objReq.send("");
    }


    return objReq.responseText;
}


/**
 * ���õ� ������ư�� index�� ���Ѵ�.
 */
function hasCheckedRadioNum(input) {
var kkkk = 0;
    if (input.length > 1) {
        for (var inx = 0; inx < input.length; inx++) {
            if (input[inx].checked) {
            kkkk = inx;
            }
        }
    } else {
         if (input.checked) kkkk=0;
    }
    return kkkk;
}


/**
 * ���õ� ������ư�� ���� ��ȯ�Ѵ�.
 */
function getRadioValue(Input) {
    var reData = "";
    if (Input.length > 1) {
        for (var inx = 0; inx < Input.length; inx++) {
            var cutData = "";
            if (Input[inx].checked) {
                cutData = Input[inx].value.split("|");
                reData += cutData[0];
            }
        }
    } else {
        var cutData = "";
        if (Input.checked){
            cutData = Input.value.split("|");
            reData = cutData[0];
        }
    }

    return reData;
}


/**
 * ���õ� ������ư�� TEXT���� ��ȯ�Ѵ�.
 */
function getRadioText(Input) {

    var reData = "";
    if (Input.length > 1) {
        for (var inx = 0; inx < Input.length; inx++) {
            var cutData = "";
            if (Input[inx].checked) {
                cutData = Input[inx].value.split("|");
                reData += cutData[1];
            }
        }
    } else {
        var cutData = "";
        if (Input.checked){
            cutData = Input.value.split("|");
            reData = cutData[1];
        }
    }

    return reData;
}


/**
 * ���õ� üũ�ڽ� ���� �����ڷ� ��ȯ�Ѵ�.
 */
function getCheckboxValue(Input, delim) {
    var reData = "";


    if (Input.length > 1) {
        for (var inx = 0; inx < Input.length; inx++) {
            var cutData = "";
            if (Input[inx].checked){
                cutData = Input[inx].value.split("|");
                reData += cutData[0]+delim;
            }
        }
        reData = reData.substring(0,reData.length-1);
    } else {
        if (Input.checked){
            cutData = Input.value.split("|");
            reData = cutData[0];
        }
    }

    return reData;
}


//�ؽ�Ʈ ����� ���ڼ� ����
 /**
   EX)
    <textarea name="name" onChange="CheckStrLen('500',this);" onKeyUp="CheckStrLen('500',this); >
    �ѱ�500�� , ����1000�� ����
 */
 function CheckStrLen(maxlen,field)
 {
   var temp; //������ ���ڰ�...
   var msglen;
   msglen = maxlen*2;
   var value= field.value;

   l =  field.value.length;
   tmpstr = "" ;

   if (l == 0)
   {
    value = maxlen*2;
   }
   else
   {
    for(k=0;k<l;k++)
    {
     temp =value.charAt(k);

     if (escape(temp).length > 4)
   msglen -= 2;
     else
   msglen--;

     if(msglen < 0)
     {
   alert("�� ���� "+(maxlen*2)+"�� �ѱ� " + maxlen + "�� ���� �Է� �� �� �ֽ��ϴ�.");
    field.value= tmpstr;
   break;
     }
     else
     {
   tmpstr += temp;
     }
    }
   }
 }


/*******************************************�׷���� �ϸ鼭 �߰��� �Լ����̳� ���� �Լ����� ������ �Լ����� �־���.**************************************************/
var IS_SUBMIT = false;      //��ü ���߼���� ���� ����

/**
    //cookie���� �����ϴ� �Լ��̴�.
    cookieName  = cookie setting name
    cookieValue = cookie setting value
    expiredays  = cookie setting day
**/

function setCookie(cookieName, cookieValue, expiredays) {
    var todayDate = new Date();
    var cookieDay;
    if(expiredays==undefined){
        cookieDay = "1";
    }else{
        cookieDay = expiredays;
    }
    todayDate.setDate( todayDate.getDate() + cookieDay );
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}


/**
    //img ÷�������� �߰��ϴ� �Լ��̴�.
    fieldName  = �߰��� ���ϸ�
**/
function addImgFile(fileName) {
    uf_frmNewWin("../comm/comm_0006_01.jsp?fileName="+fileName+"","����÷��", 500, 240);
}

function addImgFileOpt(fileName, fileOption, fileID ) {
    uf_frmNewWin("../comm/comm_0006_01.jsp?fileName="+fileName+"&fileOption="+fileOption+"&fileID="+fileID,"����÷��", 500, 240);
}

/**
 *    �޷� display �߰��κ��̴�.
 */
var GblCalTempValue = "";
var target, target2, target3;
var fieldTarget;
var calendarInput = "";
var s1,s2,s3;
function MiniTextCal(cal)
{
    GblCalTempValue = cal.value;
    calendarInput = cal;
    calValue = cal.value;
    calValue = replace(calValue,'.','');
    calValue = replace(calValue,',','');

    if(calValue.length!=8 && calValue.length > 0){
        alert('YYYYMMDD�������� �Է¹ٶ��ϴ�.');
        return;
    }

    var jucke   = "";
    var juche2  = "";
    var juche3  = "";

    jucke  = calValue.substr(0,4);
    juche2 = calValue.substr(4,2);
    juche3 = calValue.substr(6,2);

    target=jucke;
    target2=juche2;
    target3=juche3;
    fieldTarget = cal;


//    alert(event.offsetX);
//    alert(event.clientX);

    //���콺������� ��ǥ
    x = (document.layers) ? loc.pageX : event.clientX;
    y = (document.layers) ? loc.pageY : event.clientY;

     //���̾��̸�
     if(document.all.minical.length > 1){
        if(!opener){
            minical[0].style.pixelTop    = y+document.documentElement.scrollTop-130;
            minical[0].style.pixelLeft    = x-8-200;

        }else{
            if( document.body.clientWidth < x + 200)
            {
                x = x + (document.body.clientWidth - x - 320);
            }

            if( document.body.clientHeight < y)
            {
                y = y ;
            }

            minical[0].style.pixelTop    = y+document.documentElement.scrollTop;
            minical[0].style.pixelLeft    = x;
        }
        minical[0].style.display = (minical[0].style.display == "block") ? "none" : "block";
    }else{
        if(!opener){
            minical.style.pixelTop    = y+document.documentElement.scrollTop-130;
            minical.style.pixelLeft    = x-8-200;
        }else{
            if( document.body.clientWidth < x + 200)
            {
                x = x + (document.body.clientWidth - x - 320);
            }

            if( document.body.clientHeight < y )
            {
                y = y ;
            }

            minical.style.pixelTop    = y+document.documentElement.scrollTop;
            minical.style.pixelLeft    = x;
        }
        minical.style.display = (minical.style.display == "block") ? "none" : "block";
    }

    Show_textCal(target,target2,target3);
}


function Show_textCal(sYear,sMonth,sDay)
{
    var isSStrong = "";
    var isEStrong = "";
    var divHeight=0;
    if(sYear<1900 && sYear!="") return;
    if(document.all.minical.length > 1){
        document.all.minical[0].innerHTML="";
    }
    Cal_Week = "";
    Cal_HTML = "";      //�޷¼ҽ�
    /*********************���� ���� ��� ã��*******************/
    /*
    2009�� 7�� 15�Ϸ� �����Ѱ���
    ���߿��� jsp���� �۷ι� ���� ���� ���.�Ѥ�;;
    */
    var datToday=new Date();

    var intThisYear = sYear;
    var intThisMonth = sMonth;
    var intThisDay = sDay;
    var intThisYearMin = (parseInt(sYear)-1);
    var intThisYearPlu = (parseInt(sYear)+1);

    intThisYearMin = intThisYearMin.toString();
    intThisYearPlu = intThisYearPlu.toString();

    if (intThisDay==0) intThisDay = datToday.getDate();
    if (intThisMonth==0) intThisMonth = datToday.getMonth()+1;
    if (intThisYear==0) intThisYear = datToday.getYear();
    if (intThisMonth == 1)
    {
        intPrevYear=intThisYear-1;
        intPrevMonth=12;
        intNextYear=intThisYear;
        intNextMonth=2;
    }
    else if (intThisMonth==12)
    {
        intPrevYear=intThisYear;
        intPrevMonth=11;
        intNextYear=(parseInt(intThisYear) + 1);
        intNextMonth=1;
    }
    else
    {
        intPrevYear=intThisYear;
        intPrevMonth=intThisMonth -1;
        intNextYear=intThisYear;
        intNextMonth=Math.ceil(intThisMonth) + 1;
    }


    NowThisYear = sYear;
    NowThisMonth = sMonth;
    NowThisDay = sDay;
    if (NowThisDay==0) NowThisDay = datToday.getDate();
    if (NowThisMonth==0) NowThisMonth = datToday.getMonth()+1;
    if (NowThisYear==0) NowThisYear = datToday.getYear();


    /*********************�ش���� 1���� ���ۿ���ã�� *******************/
    var first_date=new Date(intThisYear,intThisMonth-1,1)
        intFirstWeekday=first_date.getDay();
        intFirstWeekday++
        //intSecondWeekDay=intFirstWeekday
    var intThirdWeekDay=intFirstWeekday



    var datThisDay = intThisYear.toString() +  "-" + intThisMonth.toString() + "-" + intThisDay.toString();

    intThisWeekday = first_date.getDay();
    intThisWeekday++
    if (intThisWeekday == 1) varThisWeekday = "��";
    if (intThisWeekday == 2) varThisWeekday = "��";
    if (intThisWeekday == 3) varThisWeekday = "ȭ";
    if (intThisWeekday == 4) varThisWeekday = "��";
    if (intThisWeekday == 5) varThisWeekday = "��";
    if (intThisWeekday == 6) varThisWeekday = "��";
    if (intThisWeekday == 7) varThisWeekday = "��";
    intPrintDay=1;
    secondPrintDay=1;
    thirdPrintDay=1;

    Stop_Flag=0;


    /*********************�ش���� ������ ��¥ ���ϱ� *******************/
    if (intThisMonth == 4 || intThisMonth==6 || intThisMonth==9 || intThisMonth==11)
    {
        intLastDay=30;
    }
    else if (intThisMonth==2 && !(intThisYear % 4 == 0))
    {
        intLastDay=28;
    }
    else if (intThisMonth==2 && intThisYear % 4 == 0)
    {
        if (intThisYear % 100 == 0)
        {
            if (intThisYear % 400 == 0)
                intLastDay=29;
            else
                intLastDay=28;
        }
        else
        {
            intLastDay=29;
        }
    }
    else
    {
        intLastDay=31;
    }



    if (intPrevMonth==4 || intPrevMonth==6 || intPrevMonth==9 || intPrevMonth==11)
        intPrevLastDay=30;
    else if (intPrevMonth==2 &&  !(intPrevYear % 4 == 0))
        intPrevLastDay=28;
    else if (intPrevMonth==2 && intPrevYear % 4 == 0)
    {
        if (intPrevYear % 100 == 0)
        {
            if (intPrevYear % 400 == 0)
                intPrevLastDay=29;
            else
                intPrevLastDay=28;
        }
        else
        {
            intPrevLastDay=29;
        }
    }
    else
    {
        intPrevLastDay=31;
    }
    Stop_Flag=0;

    Cal_HTML=Cal_HTML + "<div style='position:absolute; top:0px;left:0px;z-index:20;margin:0 0 0 1px; '>";
    Cal_HTML=Cal_HTML + "<table class='calendar_simple' summary='calendar' style='margin-top:10px;'>";
    Cal_HTML=Cal_HTML + "   <colgroup>";
    Cal_HTML=Cal_HTML + "       <col span='7' width='23px' />";
    Cal_HTML=Cal_HTML + "   </colgroup>";
    Cal_HTML=Cal_HTML + "   <thead>";
    Cal_HTML=Cal_HTML + "       <tr>";
    Cal_HTML=Cal_HTML + "       <td colspan='7' align='center'>";
    Cal_HTML=Cal_HTML + "           <ul class='calendar' style='text-align:center;'>";
    Cal_HTML=Cal_HTML + "               <li style='padding-left:18px;'><img src='../../img/comm/button/btn_calendar_prev.gif' alt='��������' onClick='javascript:Show_textCal(" + intThisYearMin.toString() + "," + intThisMonth.toString() + ",1); return false;'  style='cursor:hand'></li>";
    Cal_HTML=Cal_HTML + "               <li>&nbsp;<strong> " + intThisYear.toString() + "</strong>&nbsp;<li>";
    Cal_HTML=Cal_HTML + "               <li><img src='../../img/comm/button/btn_calendar_next.gif' alt='��������'  onClick='javascript:Show_textCal(" + intThisYearPlu.toString() + "," + intThisMonth.toString() + ",1); return false;' style='cursor:hand'><li>";
    Cal_HTML=Cal_HTML + "               <li class='mgl10'><img src='../../img/comm/button/btn_calendar_prev.gif'  alt='���� ��'  onClick='javascript:Show_textCal(" + intPrevYear.toString() + "," + intPrevMonth.toString() + ",1); return false;' style='cursor:hand'></li>";
    Cal_HTML=Cal_HTML + "               <li>&nbsp;<strong>" + intThisMonth.toString() + "</strong>&nbsp;<li>";
    Cal_HTML=Cal_HTML + "               <li><img src='../../img/comm/button/btn_calendar_next.gif' alt='������'  onClick='javascript:Show_textCal(" + intNextYear.toString() + "," + intNextMonth.toString() + ",1); return false;'  style='cursor:hand'><li>";
    Cal_HTML=Cal_HTML + "           </ul>";
    Cal_HTML=Cal_HTML + "       </td>";
    Cal_HTML=Cal_HTML + "       </tr>";
    Cal_HTML=Cal_HTML + "       <tr>";
    Cal_HTML=Cal_HTML + "           <th scope='col' class='line_left'>��</th>";
    Cal_HTML=Cal_HTML + "           <th scope='col'>��</th>";
    Cal_HTML=Cal_HTML + "           <th scope='col'>ȭ</th>";
    Cal_HTML=Cal_HTML + "           <th scope='col'>��</th>";
    Cal_HTML=Cal_HTML + "           <th scope='col'>��</th>";
    Cal_HTML=Cal_HTML + "           <th scope='col'>��</th>";
    Cal_HTML=Cal_HTML + "           <th scope='col' class='line_right'>��</th>";
    Cal_HTML=Cal_HTML + "       </tr>";
    Cal_HTML=Cal_HTML + "   </thead>";
    Cal_HTML=Cal_HTML + "   <tbody>";

    for (var intLoopWeek=1;intLoopWeek<=6;intLoopWeek++)
    {

        Cal_HTML=Cal_HTML + "<tr>";
        for (var intLoopDay=1;intLoopDay<=7;intLoopDay++)
        {
            if (intThirdWeekDay > 1)
            {
                Cal_HTML=Cal_HTML + "<td>&nbsp;</td>";
                intThirdWeekDay=intThirdWeekDay-1;
            }
            else
            {
                if (thirdPrintDay > intLastDay)
                {
                    Cal_HTML=Cal_HTML + "<td>&nbsp;</td>";
                }
                else
                {
                    Cal_HTML=Cal_HTML + "<td onclick='doTextClick()' ";
                    if (intThisYear-NowThisYear==0 && intThisMonth-NowThisMonth==0 && thirdPrintDay-intThisDay==0)
                    {
                        // ������
                        Cal_HTML=Cal_HTML + "  class='today' ";
                        Cal_Week= "class='today'";
                    }
                    else if  (intLoopDay==7)
                    {
                        // �����
                        Cal_HTML=Cal_HTML + "  class='sat' ";
                        Cal_Week= "class='sat'";
                    }
                    else if  (intLoopDay==1)
                    {
                        // �Ͽ���
                        Cal_HTML=Cal_HTML + "  class='sun' ";
                        Cal_Week= "class='sun'";
                    }
                    else
                    {
                        // ����
                        Cal_HTML=Cal_HTML + "";
                        Cal_Week= "";
                    }

                    Cal_HTML=Cal_HTML+ " ><a href='#dummy' " + Cal_Week + " onClick='return false;' title='" + intThisYear.toString() + "-" + intThisMonth.toString() + "-" + thirdPrintDay.toString() + "' >" + thirdPrintDay.toString()+ "</a> ";
                }
                thirdPrintDay++;

                if (thirdPrintDay > intLastDay)    Stop_Flag=1;

            }
            Cal_HTML=Cal_HTML + "</td>";
        }
        Cal_HTML=Cal_HTML + "</tr>";
        if (Stop_Flag==1) break;

    }

    Cal_HTML=Cal_HTML + "       </tbody>                                                                                                                  ";
    Cal_HTML=Cal_HTML + "   </table>                                   ";

    if(intLoopWeek=="6"){
        divHeight = "195px";
    }else if(intLoopWeek=="5"){
        divHeight = "175px";
    }else if(intLoopWeek=="4"){
        divHeight = "155px";
    }

    //�޷� ���� ���� �߰� ������ 2008.07.30

    Cal_HTML=Cal_HTML+ "</div>";


    if(document.all.minical.length > 1){
        document.all.minical[0].innerHTML="<iframe name='tmpCalIfra' width='181px' height='"+divHeight+"' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' class='calendar_outline'></iframe>";
        document.all.minical[0].innerHTML+=Cal_HTML;
    }else{
        document.all.minical.innerHTML="<iframe name='tmpCalIfra' width='181px' height='"+divHeight+"' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' class='calendar_outline'></iframe>";
        document.all.minical.innerHTML+=Cal_HTML;
    }
}


function doTextClick() {
    var cal_Day = window.event.srcElement.title;
    //window.event.srcElement.style.borderColor = "990000";
    if (cal_Day.length > 7) {
        getFixed(cal_Day);
        fieldTarget.focus();
        fieldTarget.value = s1+s2+s3;

        if(document.all.minical.length > 1){
            document.all.minical[0].style.display='none';
        }else{
            document.all.minical.style.display='none';
        }
    }
    if(calendarInput!=""){
        calendarInput.focus();
        calendarInput.blur();
    }
}

function getFixed(sDate){
    var s;
    var arr;

    s = new String(sDate);
    arr = s.split("-");
    if(arr.length == 3){
        s = arr[0] + "-";
        if(arr[1].length == 1) arr[1] = "0" + arr[1];
        s1 = arr[0];
        s = s + arr[1] + "-";
        s2 = arr[1];
        if(arr[2].length == 1) arr[2] = "0" + arr[2];
        s3 = arr[2];
        s = s + arr[2];
    }else{
        s = sDate;
    }
    return s;
}

function doOut() {
    if(document.all.minical.length > 1){
        document.all.minical[0].style.display='none';
    }else{
        document.all.minical.style.display='none';
    }
}


//��ü���� check�Լ� �ۼ���  ������
var checkflag = "false";

function uf_check(docname) {

    var field = eval(docname);

    if(field!=null){
        var lengthChk = field.length;
        if(lengthChk!=null){
            if (checkflag == "false") {
                for (i = 0; i < field.length; i++) {
                    if(field[i].disabled==false){
                        field[i].checked = true;
                    }
                }
                    checkflag = "true";
            } else {
                for (i = 0; i < field.length; i++) {
                    if(field[i].disabled==false){
                        field[i].checked = false;
                    }
                }
                    checkflag = "false";
            }
        }else{
            if (checkflag == "false") {
                if(field.disabled==false){
                    field.checked = true;
                }
                checkflag = "true";
            } else {
                if(field.disabled==false){
                    field.checked = false;
                }
                checkflag = "false";
            }
        }
    }else{
        alert('������ ����� �����ϴ�.');
    }
}
//��ü���� check �Լ� ��



/**
 * ��¥�� ����ؼ� �˻��������� ���� �������ش�
 */
function dateSetting(startobj,endobj, index, gubun,today) {
    var lastDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); // �� ���� ������ ��¥�� �迭������ �����Ѵ�.
    var date = new Date(today.substring(0,4),today.substring(4,6)-1,today.substring(6,8),"12","30");

    if (gubun == "D" && index == 0){
        startobj.value = today; // ����
        endobj.value = today;
        return;
    }
    else if (gubun == "D"){
        date.setDate(date.getDate() + index);        //���� ����
   }
    else if (gubun == "M"){
        date.setMonth(date.getMonth() + index);       //������ ����
    }
    else{
        alert("Script Error");
        return;
    }

    if(date.getDate() > lastDay[date.getMonth()]) {
        date.setDate(lastDay[date.getMonth()]);
    }

    endobj.value = date.getFullYear() + lpad(date.getMonth()+1, 2, "0") + lpad(date.getDate(), 2, "0");

}


/**
 * �� Time�� �� ���� ���̳����� ����
 * time1�� time2���� ũ��(�̷���) minus(-)
 */
function getMonthInterval(time1,time2) { //measureMonthInterval(time1,time2)
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);

    var years  = date2.getFullYear() - date1.getFullYear();
    var months = date2.getMonth() - date1.getMonth();
    var days   = date2.getDate() - date1.getDate();

    return (years * 12 + months + (days >= 0 ? 0 : -1) );
}

/**
 * �� Time�� ��ĥ ���̳����� ����
 * time1�� time2���� ũ��(�̷���) minus(-)
 */
function getDayInterval(time1,time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var day   = 1000 * 3600 * 24; //24�ð�

    return parseInt((date2 - date1) / day, 10);
}

/**
 * �� Time�� �� �ð� ���̳����� ����
 * time1�� time2���� ũ��(�̷���) minus(-)
 */
function getHourInterval(time1,time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var hour  = 1000 * 3600; //1�ð�

    return parseInt((date2 - date1) / hour, 10);
}


//�˾��� �ݾ��ش�.
var unloadFlag = 'close';
var retnPopupObj=new Array();
function uf_closeOpenPopups() {
	if( unloadFlag != 'close' ) {	
		unloadFlag = 'close';	
		return;	
	}

	if( retnPopupObj != null ) {
		if( retnPopupObj.length > 0 ) {
			var i=0;
			while( i < retnPopupObj.length ) {
				retnPopupObj[i++].close();
			}
			
			retnPopupObj=null;
			retnPopupObj=new Array();
		}
	}
}

window.onunload = function() {
	uf_closeOpenPopups();	
}

//�θ�â Ŭ�� ����
if( opener != null ) {
	opener.document.onmousedown = mouseDown;
}
function mouseDown(e) {
	//opener.alert('�˾��� �ݰ� �̿����ּ���.');
	//window.focus();
}





var pop_status = {}; 

/* xgrid �̿ö� ����*/
function gridViewer(appcode) {
	document.write(appcode);
}

// toggle
function toggle(_id) {
	var el = document.getElementById(_id);
	el.style.display = (!el.style || (el.style.display != 'none')) ? 'none' : '';
	if (isIE6() && hasClass(el,"secret-memo")) toggleMemo(el);
}
function togObj(obj) {
	obj.style.display = (obj.style.display != 'none') ? 'none' : '';
}
function togObjYn(obj,dp) {
	obj.style.display = (dp != true) ? 'none' : '';
}
// ��и޸� ���
function toggleMemo(el) {
	if (!hasClass(el,"generated")) {
		addClass(el,"generated");
		var _iframe = document.createElement("iframe");
		var _div = document.createElement("div");
		_iframe.frameBorder = 0;
		addClass(_iframe,"fix-ie6");
		addClass(_div,"screen");

		var fix_ie6 = el.insertBefore(_iframe,el.firstChild);
		var screen = el.insertBefore(_div,el.firstChild);

		var memo_width = el.offsetWidth;
		var memo_height = el.offsetHeight;

		fix_ie6.style.width = memo_width + "px";
		fix_ie6.style.height = memo_height + "px";
		screen.style.width = (memo_width - 2) + "px";
		screen.style.height = (memo_height - 2) + "px";
	}
}


// toggleClass
function toggleClass(element,value1,value2) {
	if (hasClass(element,value1)) {
		if (value2) {
			addClass(element,value2);
		}
		removeClass(element,value1);
	} else {
		if (value2 && hasClass(element,value2)) {
			removeClass(element,value2);
		}
		addClass(element,value1);
	}
}

//��â ���� �Լ�
function uf_newWin( url, winName, sizeW, sizeH)
{
	if(pop_status[winName] !=null && pop_status[winName] != undefined && !pop_status[winName].closed) {
		pop_status[winName].blur();
	    pop_status[winName].focus();
	    return;
    }
	var nLeft  = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2 - sizeH/2 ;

	opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=no";
	
	pop_status[winName] = window.open(url, winName, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + opt );
	pop_status[winName].blur();
	pop_status[winName].focus();
	return;
}

// ModalDialog���� ��â ���� �Լ�
function uf_newModalDialog( url, dataArr, sizeW, sizeH)
{
	//20110621 �߰�
	dataArr.window = window;
	if ( typeof(rderp_menu_seq) != "undefined" ) { 
		dataArr.rderp_menu_seq = rderp_menu_seq;
	}
	else {
		dataArr.rderp_menu_seq = 0;
	}	
	
	// 20110706 �߰�(���â���� ���� ���� �޾Ƽ� �θ�â ��Ʈ��)
	dataArr.close_gb ="N"; 
	
	var opt = "px;center:Yes; help:No; resizable:No;  status:No; scroll:No;";
	
	var param = window.showModalDialog(url, dataArr, "dialogWidth:" + sizeW + "px;dialogHeight:" + sizeH  + opt );

	return param;	
}

//ModalDialog���� ��â ���� �Լ�
function uf_newModalDialog2( url, dataArr, sizeW, sizeH)
{
	dataArr.window = window;
	if ( typeof(rderp_menu_seq) != "undefined" ) { 
		dataArr.rderp_menu_seq = rderp_menu_seq;
	}
	else {
		dataArr.rderp_menu_seq = 0;
	}	

	var opt = "px;center:Yes; help:No; resizable:Yes;  status:No; scroll:Yes;";
	
	var param = window.showModalDialog(url, dataArr, "dialogWidth:" + sizeW + "px;dialogHeight:" + sizeH  + opt );

	return param;	
}

/* Hsplitter Slide */
function uf_hsplitterOpen() {
	
	document.getElementById('div_hsplitter_left').style.display='block';
	document.getElementById('div_hsplitter_right').style.display='none';

	var objxgrid2 = document.getElementById('xgrid2');
	var objxgrid = document.getElementById('xgrid');

	if ( (objxgrid2 != null )|| (objxgrid2 != undefined) )
	{
		document.getElementById('xgrid2').width="100%";
		document.getElementById('xgrid').style.display='none';
	} else {
		document.getElementById('div_hsplitter_left').style.width = '100%';
	}

	document.getElementById('div_hsplitter_open').style.display='none';
	document.getElementById('div_hsplitter_close').style.display='block';
	
}

function uf_hsplitterClose(varWidth) {
	if (varWidth == "")
	{
		varWidth = 250;
	}

	document.getElementById('div_hsplitter_left').style.display='block';
	document.getElementById('div_hsplitter_right').style.display='block';
	
	var objxgrid2 = document.getElementById('xgrid2');
	var objxgrid = document.getElementById('xgrid');

	if ( (objxgrid2 != null )|| (objxgrid2 != undefined) )
	{
		document.getElementById('xgrid2').width = varWidth;
		document.getElementById('xgrid').style.display='block';
	} else {
		document.getElementById('div_hsplitter_left').style.width = varWidth;
	}


	document.getElementById('div_hsplitter_open').style.display='block';
	document.getElementById('div_hsplitter_close').style.display='none';
}

/* Vsplitter Slide */
function uf_vsplitterOpen() {
	
	document.getElementById('div_vsplitter_top').style.display='none';
	document.getElementById('div_vsplitter_bottom').style.display='block';;

	document.getElementById('xgrid').height="455";
	document.getElementById('xgrid2').style.display='none';;
	document.getElementById('div_vsplitter_open').style.display='none';
	document.getElementById('div_vsplitter_close').style.display='block';
	
}

function uf_vsplitterClose() {
	document.getElementById('div_vsplitter_top').style.display='block';
	document.getElementById('div_vsplitter_bottom').style.display='block';
	document.getElementById('xgrid').height="270";
	document.getElementById('xgrid2').style.display='block';
	document.getElementById('div_vsplitter_open').style.display='block';
	document.getElementById('div_vsplitter_close').style.display='none';
}
/* Filtering Slide */
function uf_filteringOpen() {
	document.getElementById('div_filtering').style.display='block';
	document.getElementById('div_filtering_open').style.display='none';
	document.getElementById('div_filtering_close').style.display='block';
	
}

function uf_filteringClose() {
	document.getElementById('div_filtering').style.display='none';
	document.getElementById('div_filtering_open').style.display='block';
	document.getElementById('div_filtering_close').style.display='none';
}


// Select Links
function linkAct()	{
	var tgtList = document.getElementById('woringurl');
	if(tgtList.style.display)	{
		hideLayer('woringurl');
		tgtList.style.display = "";
		if (navigator.userAgent.indexOf("MSIE")!=-1&&document.getElementById('container')) document.getElementById('container').style.zIndex = "20";
	} else	{
		showLayer('woringurl');
		if (navigator.userAgent.indexOf("MSIE")!=-1&&document.getElementById('container')) document.getElementById('container').style.zIndex = "35";
	}
}
function selectLinks(tgtEl)	{
	var tgtList = document.getElementById(tgtEl);
	if(tgtList.style.display)	{
		hideLayer(tgtEl);
		tgtList.style.display = "";
	} else	{
		showLayer(tgtEl);
	}
}
function showSelectLayer(tgtEl)    {
	document.getElementById(tgtEl).style.display = "block";
	if ( navigator.userAgent.indexOf("MSIE") !=-1 && document.getElementById('container') ) 
		document.getElementById('container').style.zIndex = "601";
}

function hideSelectLayer(tgtEl)    {
	document.getElementById(tgtEl).style.display = "none";
	if (navigator.userAgent.indexOf("MSIE")!=-1&&document.getElementById('container')) 
		document.getElementById('container').style.zIndex = "0";
}
/* ��ǲ�ڽ���� */
function clrImg(obj){obj.style.backgroundImage="";obj.onkeydown=obj.onmousedown=null;} 

// Roll over
function menuOver(obj) { obj.src = obj.src.replace("_off.gif", "_on.gif");}
function menuOut(obj) { obj.src = obj.src.replace("_on.gif", "_off.gif");}

function showLayer(tgtEl)    {    document.getElementById(tgtEl).style.display = "block"; }
function hideLayer(tgtEl)    {    document.getElementById(tgtEl).style.display = "none"; }

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();}
document.omfocusin=bluring;


/* left�޴� �����̵�  */

function uf_hsplitter_init() { 
	document.getElementById('div_leftbox').style.cssText = "background:url('img/00/menu/img_leftmenubg_hsplitter.gif') no-repeat left top;";
	document.getElementById('footer').style.cssText = "background:#d9d9d9 url('img/00/menu/img_footerbg.gif') no-repeat left top;";
}

function uf_lefthsplitter_open () {

	document.getElementById('div_btn_hsplitter_close').style.display='none';
	document.getElementById('div_btn_hsplitter_open').style.display='block';
	
	document.getElementById('div_snb').style.display='none';

	document.getElementById('footer').style.cssText = "background:#d9d9d9 url('img/00/menu/img_footerbg_splitter.gif') no-repeat left top";
//	document.getElementById('header').style.cssText = "z-index:5;";
	document.getElementById('container').style.cssText = "padding-left:20px;background:url('img/00/menu/img_leftmenubg_hsplitter.gif') no-repeat left top;height:auto;z-index:650;";
}

function uf_lefthsplitter_close () {
	document.getElementById('div_btn_hsplitter_close').style.display='block';
	document.getElementById('div_btn_hsplitter_open').style.display='none';
	
	document.getElementById('div_snb').style.display='block';
	document.getElementById('footer').style.cssText = "background:#d9d9d9 url('img/00/menu/img_footerbg.gif') no-repeat left top;";
//	document.getElementById('header').style.cssText = "";
	document.getElementById('container').style.cssText = "";

}


/* Ȯ����ȸ Slide */
function uf_expandDown() {
	document.getElementById('div_ts_expend').style.display='none';
	document.getElementById('div_btn_expand_down').style.display='block';
	document.getElementById('div_btn_expand_up').style.display='none';
	
}

function uf_expandUp() {
	document.getElementById('div_ts_expend').style.display='block';
	document.getElementById('div_btn_expand_down').style.display='none';
	document.getElementById('div_btn_expand_up').style.display='block';
}


/* Vsplitter Slide */
function uf_vsplitterOpen() {
	
	document.getElementById('div_vsplitter_top').style.display='none';
	document.getElementById('div_vsplitter_bottom').style.display='block';;

	document.getElementById('div_vsplitter_open').style.display='none';
	document.getElementById('div_vsplitter_close').style.display='block';
	
}

function uf_vsplitterClose() {
	document.getElementById('div_vsplitter_top').style.display='block';
	document.getElementById('div_vsplitter_bottom').style.display='block';

	document.getElementById('div_vsplitter_open').style.display='block';
	document.getElementById('div_vsplitter_close').style.display='none';
}


/* Div Show-Hidden */
function uf_divShow(varobj) {
	document.getElementById(varobj).style.display='block';
}

function uf_divHidden(varobj) {
	document.getElementById(varobj).style.display='none';
}

function uf_popFooter() {

		var winHeight = document.getElementById('p-wrap').offsetHeight;
		var headHeight = document.getElementById('p-title').offsetHeight;
		var footHeight = document.getElementById('p-close').offsetHeight;
		var contArea = document.getElementById('pcpcont');

		/* IE ����üũ ó�� */
		if (navigator.appName == "Microsoft Internet Explorer"){

			if(navigator.appName.match(/Explorer/i)) {
				versionCode = navigator.appVersion.match(/MSIE \d+.\d+/)[0].split(" ")[1];					
			}
		}

		contArea.style.height = ( winHeight - (headHeight + footHeight + 10) ) + "px";
		/*
		if ( versionCode != "8.0") { 
			contArea.style.height = ( winHeight - (headHeight + footHeight + 10) ) + "px";
		} else {
			contArea.style.height = ( winHeight - (headHeight + footHeight + 10) ) + "px";
		}
		*/
}

function uf_main_open () {

	document.getElementById('div_snb').style.display='none';
	document.getElementById('multitab').style.cssText = "top:-18px;left:-6px;";
	document.getElementById('footer').style.cssText = "background:#d9d9d9 url('img/00/menu/img_footerbg_splitter.gif') no-repeat left top";
	document.getElementById('header').style.cssText = "z-index:5;height:100px;background:url('img/00/menu/top_bg_splitter.gif') repeat-x left top;";
	document.getElementById('container').style.cssText = "margin:-2px 0 0 0px;padding-left:20px;background:url('img/00/menu/img_leftmenubg_hsplitter.gif') no-repeat left top;height:auto;z-index:650;";

}


//-----------------------------------------------------------------------------------------------
//���ڿ� 3�ڸ����� �޸����(����ǥ��)
//-----------------------------------------------------------------------------------------------
function Format_comma(val1) {
    var newValue = val1+""; //���ڸ� ���ڿ��� ��ȯ
    var len = newValue.length;  

    var minus = "";  

    if( len > 1 ) {
        if( newValue.substring(0,1) == '0' ) newValue = newValue.substring(1);
        len = newValue.length;
        if ( newValue.substring(0,1) == "-"  ) {
            minus = "-";
        }   
    }
    
    var ch="";
    var j=1;
    var formatValue="";
    
    // �޸�����  
    newValue = newValue.replace(/\,/gi, '');
    newValue = newValue.replace(/\-/gi, '');
    
    // comma���ŵ� ���ڿ� ����
    len = newValue.length;
    
    for(i=len ; i>0 ; i--){
        ch = newValue.substring(i-1,i);
        formatValue = ch + formatValue;
        if ((j%3) == 0 && i>1 ){
         formatValue=","+formatValue;
        }
        j++;
    }
    
    formatValue = minus+formatValue;
    
    return formatValue;
}

//-----------------------------------------------------------------------------------------------
//�޸�����
//-----------------------------------------------------------------------------------------------
function Format_NoComma(val1){
	return (val1+"").replace(/\,/gi, '');
}

//-----------------------------------------------------------------------------------------------
//����Ű ���� text �̵�
//-----------------------------------------------------------------------------------------------
function fn_CheckEnter(obj) {
 if (event.keyCode == 13) {   
    f = obj.form;
    for(var i = 0; i< f.elements.length-1; i++) {
       if (f.elements[i].name == obj.name) {
       	for(var j = i; j< f.elements.length-1; j++) {
             if (f.elements[j+1].type == "text") {
                f.elements[j+1].focus();
                return;
             }
          }
       }
    }

 }
}

/************************************************************************
�Լ���	: ����Ű �Է� 
�ۼ�����	: �ݾ� ���� TextBox���� ���ڿ��Է� ����
�� �� ��	: 
�� �� ��	:
*************************************************************************/
function fn_CheckNumberTextBox() {
	try
	{
			
		// ���Ű : 8, 13, 27, 48 ~ 57
		if ( (window.event.keyCode >= 48 && window.event.keyCode <= 57) || ( window.event.keyCode>=96 &&  window.event.keyCode<=105) || ( window.event.keyCode==8) || ( window.event.keyCode==37) || ( window.event.keyCode==39) )
		{
			window.event.returnValue = true;
			//return;
		}
		else if ( window.event.keyCode == 8 || window.event.keyCode == 13 || window.event.keyCode == 27 )
		{
			window.event.returnValue = true;
			//return;
		}
		else 
		{
			window.event.returnValue = false;
		}
	}
	catch ( exception )
	{
		//
	}	
}

/************************************************************************
�Լ���	: ����Ű �Է�(-)���� 
�ۼ�����	: �ݾ� ���� TextBox���� ���ڿ��Է� ����
�� �� ��	: 
�� �� ��	:
*************************************************************************/
function fn_CheckNumberTextBoxMinus() {
	try
	{
			
		// ���Ű : 8, 13, 27, 48 ~ 57, 45(-)
		if ( (window.event.keyCode >= 48 && window.event.keyCode <= 57) || ( window.event.keyCode>=96 &&  window.event.keyCode<=105) || ( window.event.keyCode==8) || ( window.event.keyCode==37) || ( window.event.keyCode==39)  || ( window.event.keyCode==45))
		{
			window.event.returnValue = true;
			//return;
		}
		else if ( window.event.keyCode == 8 || window.event.keyCode == 13 || window.event.keyCode == 27 )
		{
			window.event.returnValue = true;
			//return;
		}
		else 
		{
			window.event.returnValue = false;
		}
	}
	catch ( exception )
	{
		//
	}	
}

