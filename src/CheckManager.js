goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.ColumnManager');
goog.require('jx.data.DataManager');

goog.provide('jx.grid.CheckManager');

/*!
 * AUTHOR
 *   The JexGrid was written and is maintained by:
 *       Joon Ho Cho <joonho1101@gmail.com>
 * COPYRIGHT
 *   Copyright (c) 2010-2011, WebCash Inc. All rights reserved.
 */

/**
JGM
@scope JGM
*/

(function() {

var JGM = goog.getObjectByName('jx.grid'),
	Util = goog.getObjectByName('jx.util'),
	BaseModule = goog.getObjectByName('jx.grid.BaseModule');
 goog.exportSymbol('jx.grid.CheckManager', CheckManager);
 JGM._add("CheckManager", CheckManager);


/**
CheckManager ���. �׸��� �ο��� ������ ����ϴ� ����Դϴ�.
@module CheckManager

@requires JGM
@requires JGM.Grid
@requires JGM.ColDefManager
@requires JGM.DataManager
@requires JGM.EventManager
@requires JGM.ViewportManager
 */

/**
CheckManager Ŭ����. checkbox �� radio Ÿ���� ������ �����մϴ�.

@class {CheckManager} JGM.CheckManager

@author ����ȣ
@since 1.0.0
@version 1.1.0
*/

/**
CheckManager ����Ʈ���� �Դϴ�.

@constructor {CheckManager} CheckManager
@param {Object} args - CheckManager ��� �Ķ���� ������Ʈ
@... {JGM.Grid} args.grid - CheckManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {Object} args.options - CheckManager �ɼ� ������Ʈ
@returns {CheckManager} CheckManager ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function CheckManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� CheckManager ��� ���� ���̵��Դϴ�. �б� ����.

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	CheckManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�������� üũ �ڽ� �÷��� �����ϰ� �����ϴ� {@link JGM.CheckManager CheckManager} �ν��Ͻ� �Դϴ�.

	@var {JGM.CheckManager} JGM.Grid.checkMgr

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	// this.grid.checkMgr = this;

	/**
	CheckManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		üũ �÷��� ��Ÿ���� �÷� ���� ������Ʈ�Դϴ�. <br>�⺻��:<code>{key:"checkbox", width: 20, name:" "}</code>

		@type {Object=} JGM.CheckManager.options.colDef
		@private
		@see JGM.ColDefManager.options.colDef

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'colDef': {'key':"checkbox", 'width': 20, 'name':" ", 'noTitle':true, 'resizable':false, 'sorter':null, 'filter':null, 'noSearch':true, 'editor':null, 'inputOnCreate':false},

		/**
		{@link JGM.CheckManager.options.colDef colDef} �� ���° �÷����� �������� ���մϴ�. <br>�⺻��:<code>0</code>

		@type {number=} JGM.CheckManager.options.colIdx
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'colIdx': 0,

		/**
		üũ input ���� name attribute �� ���������� ���� ���Դϴ�. <br>�⺻��:<code>undefined</code>

		@type {string=} JGM.CheckManager.options.name
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'name': undefined,

		/**
		üũ input �鿡 ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"checkmg"</code>

		@type {string=} JGM.CheckManager.options.classCheck
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classCheck': "checkmg",

		/**
		������ ��� üũ input �� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"checkm"</code>

		@type {string=} JGM.CheckManager.options.classMasterCheck
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classMasterCheck': "checkm",

		/**
		checkbox �� ���� ������ ��� üũ�� �������� �����Դϴ�. <br>�⺻��:<code>true</code>

		@type {boolean=} JGM.CheckManager.options.master
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'master': true,

		/**
		true �� ��� radio Ÿ���� input, false �� ��� checkbox Ÿ���� input �� �����մϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.CheckManager.options.isRadio
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'isRadio': false
	};

	this._options = JGM._extend(options, args['options']);

	if (this._options['isRadio']) {
		if (Util.isNull(this._options['name'])) {
			this._options['name'] = "radio" + this.mid;
		}
		this._options['master'] = false;
	}

	this._map = {};

	this.disabledmap = {};

	this._count = 0;

	this._disabled = false;

	this._master;

	this.__init();
}

CheckManager.getInstance = function(args) {
	return new CheckManager(args);
};

var prototype = CheckManager.prototype;

prototype.__init = function() {
	var opt = this._options,
		size,
		con = JGM._CONST;

	if (this.grid.colDefMgr.getByKey(opt['colDef'].key) === undefined) {
		this.grid.colDefMgr.addAt(opt['colIdx'], opt['colDef']);
	}
	
	if (Util.isNull(con._checkboxWidth)) {
		size = Util.calCheckSize();
		con._checkboxWidth = size.checkboxW;
		con._checkboxHeight = size.checkboxH;
		con._radioWidth = size.radioW;
		con._radioHeight = size.radioH;
	}
	
	this.bindEvents();
};

prototype.bindEvents = function() {
	var opt = this._options,
		key = opt['colDef'].key,
		events;

	events = {
		'onCreateCss': this._onCreateCss,
		'onDestroy': this._destroy,
		'onAfterSetDatalist': this.uncheckAll,
		'onIdChange': this._onIdChange,
		'onIdListChange': this._onIdListChange,
		'onRemoveDatarow': this._onRemoveDatarow,
		'onRemoveDatalist': this._onRemoveDatalist
	};
	
	events["onRenderCell_" + key + "_prepend"] = this._onRenderCell;
	events["keydownColSel_" + key + "_" + Util.keyMapKeydown.space] = this._keydownColSel;
	
	if (opt['master']) {
		events["onRenderHeader_" + key + "_prepend"] = this._onRenderHeader;
		events.onRenderHeadersComplete = this._getMaster;
	}
	this.grid.event.bind(events, this);
};

prototype._destroy = function() {
	JGM._destroy(this, {
		name: "CheckManager",
		path: "checkMgr",
		"$": "master",
		property: "count _disabled",
		map: "map _options"
	});
};

prototype._onCreateCss = function() {
	var w,
		h,
		checkCommon,
		css;

	if (this._options['isRadio']) {
		w = JGM._CONST._radioWidth;
		h = JGM._CONST._radioHeight;
	}
	else {
		w = JGM._CONST._checkboxWidth;
		h = JGM._CONST._checkboxHeight;
	}
	
	checkCommon = "*overflow:hidden;padding:0;width:" + w + "px;height:" + h + "px;";
	css = this.grid.view._getCellSelector() + " ." + this._options['classCheck'] + "[mid='" + this.mid + "']{" +
		checkCommon +
		"margin:" + ((this.grid.view._getRowInnerHeight() - h) / 2) + "px 0 0 " + ((this._options['colDef']['width'] - this.grid.view._getPadding() - w) / 2) + "px}" +
		"#" + this.mid + "h{" +
		checkCommon +
		"margin:" + ((this.grid.header._options['height'] - h) / 2) + "px 0 0 0}";
	return css;
};


/**
�־��� ������ ��̾��� �����͵��� ��� üũ�մϴ�. ���� �׸��尡 ���� �����͵��
�������� ������ ������ �޸𸮻� �ٸ� �ּҸ� ������ �����͵��� ��� ������ ������
�մϴ�.

@function {} checkList
@param {Array.<Object>} list - üũ�� ������ ���
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
@see JGM.DataManager.mapList ������ ������ �մϴ�.
@see check

@author ����ȣ
@since 1.0.0
@version 1.0.1
*/
prototype.checkList = function(list, nomap) {
	if (!nomap) {
		list = this.grid.dataMgr.mapList(list).mapped;
	}

	var i = 0,
		len = list.length;
	for (; i < len; i++) {
		this.check(list[i], true);
	}
};


/**
{@link checkList} �� ������ üũ�ϱ� ����, ������ üũ�� ����Ʈ�� ��� �����մϴ�.

@function {} setCheckList
@param {Array.<Object>} list - üũ�� ������ ���
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
@see uncheckAll
@see checkList

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.setCheckList = function(list, nomap) {
	this.uncheckAll();
	this.checkList(list, nomap);
};


/**
���� üũ�� �����͵��� ��̸� �����մϴ�.

@function {Array.<Object>} getCheckList
@returns {Array.<Object>} ���� üũ�� �����͵��� ���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getCheckList = function() {
	return Util.toArray(this._map);
};


/**
���� ��Ȱ��ȭ�� �����͵��� ��̸� �����մϴ�.

@function {Array.<Object>} getDisableds
@returns {Array.<Object>} ���� ��Ȱ��ȭ�� �����͵��� ���

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.getDisableds = function() {
	return Util.toArray(this.disabledmap);
};


/**
��� �������� üũ�� ����մϴ�. ��� �����Ͱ� üũ�Ǿ� ���� ���, ��� üũ��
�����ϰ�, �ϳ��� �����Ͷ� üũ�Ǿ� ���� ���� ��� ��� �����͸� üũ�մϴ�.

@function {} toggleCheckAll
@see uncheckAll
@see checkAll

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.toggleCheckAll = function() {
	if (this.isCheckedAll()) {
		this.uncheckAll();
	}
	else {
		this.checkAll();
	}
};


/**
��� �����͸� üũ�մϴ�.

@function {} checkAll

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.checkAll = function() {
	if (this._options['master']) {
		CheckManager._check(this._master);
	}

	CheckManager._check(this.getCheckboxes());

	var list = this.grid.dataMgr.all,
		len = list.length,
		idKey = this.grid.dataMgr.idKey,
		map = this._map,
		i = 0;

	for (; i < len; i++) {
		map[list[i][idKey]] = list[i];
	}

	this._count = len;
};


/**
��� �����͸� üũ�� �����մϴ�.

@function {} uncheckAll

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.uncheckAll = function() {
	if (this._options['master']) {
		CheckManager._uncheck(this._master);
	}

	CheckManager._uncheck(this.getCheckboxes());

	this._map = {};
	this._count = 0;
};


/**
�־��� �������� üũ�� ����մϴ�.

@function {} toggleCheck
@param {Object} datarow - üũ ����� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
@see check
@see uncheck

@author ����ȣ
@since 1.0.0
@version 1.1.0
*/
prototype.toggleCheck = function(datarow, nomap) {
	if (!nomap) {
		datarow = this.grid.dataMgr.map(datarow);
	}

	if (this.isChecked(datarow, true) && !this._options['isRadio']) {
		this.uncheck(datarow, true);
	}
	else {
		this.check(datarow, true);
	}
};


/**
�־��� �������� Ȱ��ȭ�� ����մϴ�.

@function {} toggleDisable
@param {Object} datarow - Ȱ��ȭ�� ����� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.toggleDisable = function(datarow, nomap) {
	if (!nomap) {
		datarow = this.grid.dataMgr.map(datarow);
	}

	if (this.isDisabled(datarow, true)) {
		this.enable(datarow, true);
	}
	else {
		this.disable(datarow, true);
	}
};


/**
�־��� ���̵� ���� �����͸� üũ�� ����մϴ�.

@function {} toggleById
@param {Object} id - üũ ����� �������� ���̵�
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
@see check
@see uncheck

@author ����ȣ
@since 1.0.0
@version 1.3.0
*/
/*
 * 1.3.0 - toggle -> toggleById
 */
prototype.toggleById = function(id) {
	this.toggleCheck(this.grid.dataMgr.getById(id), true);
};


/**
�־��� �����͸� üũ�մϴ�. �̹� üũ�� �������� ��� �ƹ��͵� ���� �ʽ��ϴ�.<br>
Ʈ���� �̺�Ʈ: {@link onCheckChange}

@function {} check
@param {Object} datarow - üũ�� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.

@author ����ȣ
@since 1.0.0
@version 1.1.0
*/
prototype.check = function(datarow, nomap) {
	if (!nomap) {
		datarow = this.grid.dataMgr.map(datarow);
	}

	if (!this._add(datarow)) {
		return;
	}

	CheckManager._check(this.getCheckbox(datarow));

	this._updateMaster();

	/**
	CheckManager ���� �ϳ��� �����Ͱ� üũ/���� �Ǿ��� ��쿡 Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.<br>
	Ʈ���Ÿ� �Լ�: {@link check}, {@link uncheck}
	@event {Event} onCheckChange
	@param {Object} datarow - üũ/���� �� ������ �ο�
	@param {boolean} checked - üũ�Ǿ����� true, �����Ǿ����� false �� ���� �����ϴ�.

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.event.trigger("onCheckChange", [datarow, true]);
};


/**
�־��� �������� üũ�� �����մϴ�. üũ�Ǿ����� ���� ��� �ƹ��͵� ���� �ʽ��ϴ�.<br>
Ʈ���� �̺�Ʈ: {@link onCheckChange}

@function {} uncheck
@param {Object} datarow - üũ ������ ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.

@author ����ȣ
@since 1.0.0
@version 1.1.0
*/
prototype.uncheck = function(datarow, nomap) {
	if (!nomap) {
		datarow = this.grid.dataMgr.map(datarow);
	}

	if (!this._remove(datarow)) {
		return;
	}

	CheckManager._uncheck(this.getCheckbox(datarow));

	if (this._options['master']) {
		CheckManager._uncheck(this._master);
	}

	this.grid.event.trigger("onCheckChange", [datarow, false]);
};

/**
�־��� �����Ϳ� �ش��ϴ� üũ�ڽ��� ��Ȱ��ȭ �մϴ�.
Ʈ���� �̺�Ʈ: {@link onDisableCheck}

@function {} disable 
@param {Object} datarow -Ȱ��ȭ�� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.disable = function(datarow, nomap) {
	var datam = this.grid.dataMgr;

	if (!nomap) {
		datarow = datam.map(datarow);
	}

	var id = datam.getId(datarow),
		map = this.disabledmap;
		
	if (map.hasOwnProperty(id)) {
		return;
	}
		
	map[id] = datarow;

	CheckManager.disableNode(this.getCheckbox(datarow));

	/**
	CheckManager ���� �ϳ��� �����Ͱ� ��Ȱ��ȭ �Ǿ��� ��쿡 Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.<br>
	@event {Event} onDisableCheck
	@param {Object} datarow - üũ �ڽ��� ��Ȱ��ȭ �� ������ �ο�

	@author ����ȣ
	@since 1.3.0
	@version 1.3.0
	*/
	this.grid.event.trigger("onDisableCheck", [datarow]);
};

/**
�־��� �����Ϳ� �ش��ϴ� üũ�ڽ��� Ȱ��ȭ �մϴ�.
Ʈ���� �̺�Ʈ: {@link onEnableCheck}

@function {} enable 
@param {Object} datarow -��Ȱ��ȭ�� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.enable = function(datarow, nomap) {
	var datam = this.grid.dataMgr;

	if (!nomap) {
		datarow = this.grid.dataMgr.map(datarow);
	}

	var id = datam.getId(datarow),
		map = this.disabledmap;
		
	if (!map.hasOwnProperty(id)) {
		return;
	}
		
	delete map[id];

	CheckManager.enableNode(this.getCheckbox(datarow));

	/**
	CheckManager ���� �ϳ��� �����Ͱ� Ȱ��ȭ �Ǿ��� ��쿡 Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.<br>
	@event {Event} onEnableCheck
	@param {Object} datarow - üũ �ڽ��� Ȱ��ȭ �� ������ �ο�

	@author ����ȣ
	@since 1.3.0
	@version 1.3.0
	*/
	this.grid.event.trigger("onEnableCheck", [datarow]);
};

prototype._updateMaster = function() {
	if (this._options['master']) {
		CheckManager._setCheck(this._master, this.isCheckedAll());
	}
};

prototype._add = function(datarow) {
	var id = datarow[this.grid.dataMgr.idKey];
		
	if (this._map.hasOwnProperty(id)) {
		return false;
	}
		
	if (this._options['isRadio'] === true) {
		this._map = {};
		this._count = 0;
	}

	this._map[id] = datarow;
	this._count++;

	return true;
};

prototype._remove = function(datarow) {
	var id = datarow[this.grid.dataMgr.idKey],
		map = this._map;
		
	if (!map.hasOwnProperty(id)) {
		return false;
	}
		
	delete map[id];
	this._count--;
	
	return true;
};

/**
�־��� �������� üũ ���θ� �����մϴ�.

@function {boolean} isChecked
@param {Object} datarow - üũ ���θ� Ȯ���� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
@returns {boolean} üũ �Ǿ��� ��� true, �ƴ� ��� false

@author ����ȣ
@since 1.0.0
@version 1.1.0
*/
prototype.isChecked = function(datarow, nomap) {
	var datam = this.grid.dataMgr;
	if (!nomap) {
		datarow = datam.map(datarow);
	}

	return this._map.hasOwnProperty(datam.getId(datarow));
};

/**
�־��� �������� üũ Ȱ��ȭ ���θ� �����մϴ�.

@function {boolean} isDisabled 
@param {Object} datarow - üũ Ȱ��ȭ ���θ� Ȯ���� ������
@param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
@returns {boolean} üũ ��Ȱ��ȭ �Ǿ��� ��� true, �ƴ� ��� false

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.isDisabled = function(datarow, nomap) {
	var datam = this.grid.dataMgr;
	if (!nomap) {
		datarow = datam.map(datarow);
	}

	return this.disabledmap.hasOwnProperty(datam.getId(datarow));
};

prototype.splitChecked = function(datalist, nomap) {
	if (!nomap) {
		datalist = this.grid.dataMgr.mapList(datalist).mapped;
	}
		
	var checked = [],
		unchecked = [],
		i = 0,
		len = datalist.length,
		idKey = this.grid.dataMgr.idKey,
		data,
		map = this._map;
	
	for (; i < len; i++) {
		if (map.hasOwnProperty((data = datalist[i])[idKey])) {
			checked.push(data);
		}
		else {
			unchecked.push(data);
		}
	}

	return {'checked':checked, 'unchecked':unchecked};
};

/**
��� �������� üũ ���θ� �����մϴ�.

@function {boolean} isCheckedAll
@returns {boolean} ��� �����Ͱ� üũ �Ǿ��� ��� true, �ƴ� ��� false

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.isCheckedAll = function() {
	return (this._count !== 0 &&
		this._count === this.grid.dataMgr.all.length ? true : false);
};

/**
üũ�� ��� �����͸� �׸��忡�� �����մϴ�.

@function {} removeChecked

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.removeChecked = function() {
   return this.grid.dataMgr.removeList(this.getCheckList());
};

prototype._getMaster = function() {
	this._master = $(document.getElementById(this.mid + "h"));
};

prototype._getChecks = function(rows) {
	var len = rows.length,
		checks = [],
		i = 0,
		col = this.grid.colDefMgr.getIdxByKey(this._options['colDef']['key']);
	for (; i < len; i++) {
		checks.push(rows[i].childNodes[col].childNodes[0]);
	}
	
	return checks;
};

/**
���� ĳ���� üũ �ڽ� DOM Element ���� �����մϴ�.

@function {DOMElement[]} getCheckboxes
@returns {DOMElement[]} ĳ���� äũ �ڽ���

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.getCheckboxes = function() {
	return this._getChecks(this.grid.view.getRenderedRows());
};

/**
���̵� �ش��ϴ� üũ �ڽ� DOM Element �� �����մϴ�.

@function {DOMElement} getCheckboxById
@returns {DOMElement} äũ �ڽ�

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.getCheckboxById = function(id) {
	var row = this.grid.view.getRowById(id);
	if (Util.isNotNull(row)) {
      return row.childNodes[this.grid.colDefMgr.getIdxByKey(this._options['colDef']['key'])].childNodes[0];
   }
};

/**
�ο� �����Ϳ� �ش��ϴ� üũ �ڽ� DOM Element �� �����մϴ�.

@function {DOMElement} getCheckbox
@returns {DOMElement} äũ �ڽ�

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.getCheckbox = function(datarow) {
   return this.getCheckboxById(this.grid.dataMgr.getId(datarow));
};

/**
�ε����� �ش��ϴ� üũ �ڽ� DOM Element �� �����մϴ�.

@function {DOMElement} getCheckboxByIdx
@returns {DOMElement} äũ �ڽ�

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.getCheckboxByIdx = function(i) {
   return this.getCheckboxById(this.grid.dataMgr.getIdByIdx(i));
};

prototype._onRemoveDatarow = function(datarow) {
	this.uncheck(datarow, true);
	this.enable(datarow, true);
};

prototype._onRemoveDatalist = function(datalist) {
	var i = 0,
		len = datalist.length;
	for (; i < len; i++) {
		this.uncheck(datalist[i], true);
		this.enable(datalist[i], true);
	}
};

prototype._onIdChange = function(datarow, before, after) {
	var map = this._map,
		dmap = this.disabledmap;
	if (map.hasOwnProperty(before)) {
		delete map[before];
		map[after] = datarow;
	}
	if (dmap.hasOwnProperty(before)) {
		delete dmap[before];
		dmap[after] = datarow;
	}
};

prototype._onIdListChange = function(datalist, idBefores, idKey) {
	var i = 0,
		len = datalist.length,
		map = this._map,
		dmap = this.disabledmap,
		data,
		before;
	for (; i < len; i++) {
		data = datalist[i];
		before = idBefores[i];
		if (map.hasOwnProperty(before)) {
			delete map[before];
			map[data[idKey]] = data;
		}
		if (dmap.hasOwnProperty(before)) {
			delete dmap[before];
			dmap[data[idKey]] = data;
		}
	}
};

prototype._keydownColSel = function(e, colSelections, lastSelection) {
	e.preventDefault();
	if (Util.isNotNullAnd(colSelections, lastSelection)) {
		var checked = this.isChecked(lastSelection.getDatarow(), true),
			row,
			list = this.grid.dataMgr.datalist;
		if (this._options['isRadio']) {
			for (row in colSelections) {
				if (colSelections.hasOwnProperty(row)) {
					if (row === "length") {
						continue;
					}
					this.check(list[row], true);
					return;
				}
			}
		}
		else {
			for (row in colSelections) {
				if (colSelections.hasOwnProperty(row)) {
					if (row === "length") {
						continue;
					}
					if (checked) {
						this.uncheck(list[row], true);
					}
					else {
						this.check(list[row], true);
					}
				}
			}
		}
	}
};

prototype._onRenderHeader = function(headerHtml) {
	headerHtml.push("<input id='" + this.mid + "h' type='checkbox' tabIndex='-1' onclick='JGM.m.CheckManager." + this.mid + ".toggleCheckAll();' class='" + this._options['classCheck'] + " " + this._options['classMasterCheck'] + "' mid='" + this.mid + "'");
	if (this.isCheckedAll()) {
		headerHtml.push(" checked='checked'");
	}
	if (this._disabled) {
		headerHtml.push(" disabled='disabled'");
	}
	headerHtml.push("/>");
};

prototype._onRenderCell = function(rowIdx, colIdx, datarow, colDef, cellHtml) {
	cellHtml.push("<input tabIndex='-1' onclick=\"JGM.m.CheckManager." + this.mid + ".toggleById('" + datarow[this.grid.dataMgr.idKey] + "')\" type='" + (this._options['isRadio'] ? "radio" : "checkbox") + "' class='" + this._options['classCheck'] + "' mid='" + this.mid + "'");
	if (Util.isNotNull(this._options['name'])) {
		cellHtml.push(" name='" + this._options['name'] + "'");
	}
	if (this.isChecked(datarow, true)) {
		cellHtml.push(" checked='checked'");
	}
	if (this._disabled || this.isDisabled(datarow, true)) {
		cellHtml.push(" disabled='disabled'");
	}
	cellHtml.push("/>");
};


/**
CheckManager �� ��Ȱ��ȭ �մϴ�.

@function {} disableAll

@author ����ȣ
@since 1.0.0
@version 1.3.0
*/
/*
 * changelog
 * 1.3.0: disable -> disableAll
 */
prototype.disableAll = function() {
	if (this._disabled) {
		return;
	}
		
	this._disabled = true;
	
	if (this._options['master']) {
		this._master.attr("disabled", "disabled");
	}
		
	$(this.getCheckboxes()).attr("disabled", "disabled");
};


/**
CheckManager �� Ȱ��ȭ �մϴ�.

@function {} enableAll

@author ����ȣ
@since 1.0.0
@version 1.3.0
*/
/*
 * changelog
 * 1.3.0: enable -> enableAll
 */
prototype.enableAll = function() {
	if (!this._disabled) {
		return;
	}
		
	this._disabled = false;
	
	if (this._options['master']) {
		this._master.removeAttr("disabled");
	}
		
	$(this.getCheckboxes()).removeAttr("disabled");
};

CheckManager._check = function(obj) {
	if (Util.isNotNull(obj)) {
		Util$.safe$(obj).attr("checked", "checked");
	}
};

CheckManager._uncheck = function(obj) {
	if (Util.isNotNull(obj)) {
		Util$.safe$(obj).removeAttr("checked");
	}
};

CheckManager.disableNode = function(obj) {
	if (Util.isNotNull(obj)) {
		Util$.safe$(obj).attr("disabled", "disabled");
	}
};

CheckManager.enableNode = function(obj) {
	if (Util.isNotNull(obj)) {
		Util$.safe$(obj).removeAttr("disabled");
	}
};

CheckManager._setCheck = function(obj, check) {
	if (check) {
		CheckManager._check(obj);
	}
	else {
		CheckManager._uncheck(obj);
	}
};
}());
