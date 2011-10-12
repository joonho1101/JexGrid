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
/**
  CheckManager ���. �׸��� �ο��� ������ ����ϴ� ����Դϴ�.
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
  @... {jx.grid.Grid} args.grid - CheckManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
  @... {Object} args.options - CheckManager �ɼ� ������Ʈ
  @returns {CheckManager} CheckManager ��� �ν��Ͻ��� �����մϴ�.
  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
function CheckManager(args) {
	function afteroption(event) {
		var options = this._options;
		var isRadio = this._isRadio = options['isRadio'] = !!options['isRadio'];
		this._hasMaster = options['master'] = !isRadio && !!options['master'];
		this._col = options['colDef'];
		this._key = this._col['key'];
		this._cssClass = options['classCheck'];
		this._cssClassMaster = options['classMasterCheck'];
		this._name = options['name'] || (isRadio && ("radio" + this.mid)) || null;
	}
	this.addEventListener('afteroption', afteroption);
	goog.base(this, args);
	this.removeEventListener('afteroption', afteroption);
}
goog.inherits(CheckManager, BaseModule);
CheckManager.getInstance = function(args) {
	return new CheckManager(args);
};
var prototype = CheckManager.prototype;
prototype._init = function() {
	this._map = {};
	this.disabledmap = {};
	this._count = 0;
	this._disabled = false;
	this._master;
	var size,
		con = JGM._CONST,
		colmgr = this.getColMgr();
	if (!colmgr.getByKey(this._col.key)) {
		colmgr.addAt(this._options['colIdx'], this._col);
	}
	if (!con._checkboxWidth) {
		size = Util.calCheckSize();
		con._checkboxWidth = size.checkboxW;
		con._checkboxHeight = size.checkboxH;
		con._radioWidth = size.radioW;
		con._radioHeight = size.radioH;
	}
};
prototype._bindEvents = function() {
	var key = this._col.key,
		events;
	events = {
		'onAfterSetDatalist': this.uncheckAll,
		'onAfterRerender': this._updateMaster,
		'onIdChange': this._onIdChange,
		'onIdListChange': this._onIdListChange,
		'onRemoveDatarow': this._onRemoveDatarow,
		'onRemoveDatalist': this._onRemoveDatalist,
		'onSearch': this._onSearch
	};
	events["onRenderCell_" + key + "_prepend"] = this._onRenderCell;
	events["keydownColSel_" + key + "_" + Util.keyMapKeydown.space] = this._keydownColSel;
	if (this._hasMaster) {
		events["onRenderHeader_" + key + "_prepend"] = this._onRenderHeader;
		events.onRenderHeadersComplete = this._getMaster;
	}
	this.bindGridEvent(events, this);
};
prototype._onSearch = function(filtered) {
	if (filtered) {
		this.disableMaster();
	}
	else {
		this.enableMaster();
	}
};
prototype._defaultOptions = function() {
	/**
	  CheckManager ����� �⺻ �ɼ� ������ �����մϴ�.
	  @type {Object} options
	  @private
	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	return {
		/**
		  üũ �÷��� ��Ÿ���� �÷� ���� ������Ʈ�Դϴ�. <br>�⺻��:<code>{key:"checkbox", width: 20, name:" "}</code>
		  @type {Object=} JGM.CheckManager.options.colDef
		  @private
		  @see jx.grid.ColumnManager.options.colDef
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
}
prototype._beforeCreateCss = function(event) {
	var w,
		h,
		checkCommon,
		css = event.css;
	if (this._isRadio) {
		w = JGM._CONST._radioWidth || 13;
		h = JGM._CONST._radioHeight || 13;
	}
	else {
		w = JGM._CONST._checkboxWidth || 13;
		h = JGM._CONST._checkboxHeight || 13;
	}
	checkCommon = "*overflow:hidden;padding:0;width:" + w + "px;height:" + h + "px;";
	css.push(this.getView()._getCellSelector() + " ." + this._cssClass + "[mid='" + this.mid + "']{" +
		checkCommon +
		"margin:" + ((this.getView()._getRowInnerHeight() - h) / 2) + "px 0 0 " + ((this._col['width'] - this.getView()._getPadding() - w) / 2) + "px}" +
		"#" + this.mid + "h{" +
		checkCommon +
		"margin:" + ((this.getHeader()._options['height'] - h) / 2) + "px 0 0 0}");
};
/**
  �־��� ������ ��̾��� �����͵��� ��� üũ�մϴ�. ���� �׸��尡 ���� �����͵��
  �������� ������ ������ �޸𸮻� �ٸ� �ּҸ� ������ �����͵��� ��� ������ ������
  �մϴ�.
  @function {} checkList
  @param {Array.<Object>} list - üũ�� ������ ���
  @param {boolean=} nomap - true �� ��� ������ ������ ���� �ʽ��ϴ�.
  @see jx.data.DataManager.mapList ������ ������ �մϴ�.
  @see check
  @author ����ȣ
  @since 1.0.0
  @version 1.0.1
  */
prototype.checkList = function(list, nomap) {
	if (!nomap) {
		list = this.getDataMgr().mapList(list).mapped;
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
	return this.isCheckedAll() ? this.uncheckAll() : this.checkAll();
};
prototype.clickMaster = function(checked) {
	var all = this.getAllData(),
		list = this.getDataList();
	if (all.length === list.length) {
		return checked ? this.checkAll() : this.uncheckAll();
	}
	if (checked) {
		CheckManager._check(this.getCheckboxes());
		var len = list.length,
			idKey = this.getIdKey(),
			id,
			datarow,
			i = 0;
		for (; i < len; i++) {
			datarow = list[i];
			if (this._add(datarow, datarow[idKey])) {
				this.triggerGridEvent("onCheckChange", [datarow, true], true);
			}
		}
	}
	else {
		CheckManager._uncheck(this.getCheckboxes());
		var len = list.length,
			idKey = this.getIdKey(),
			id,
			datarow,
			i = 0;
		for (; i < len; i++) {
			datarow = list[i];
			if (this._remove(datarow, datarow[idKey])) {
				this.triggerGridEvent("onCheckChange", [datarow, false], true);
			}
		}
	}
}
/**
  ��� �����͸� üũ�մϴ�.
  @function {} checkAll
  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.checkAll = function() {
	if (this._hasMaster) {
		CheckManager._check(this._master);
	}
	CheckManager._check(this.getCheckboxes());
	var list = this.getAllData(),
		len = list.length,
		idKey = this.getIdKey(),
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
	if (this._hasMaster) {
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
		datarow = this.getDataMgr().map(datarow);
	}
	if (this.isChecked(datarow, true) && !this._isRadio) {
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
		datarow = this.getDataMgr().map(datarow);
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
	this.toggleCheck(this.getDataMgr().getById(id), true);
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
		datarow = this.getDataMgr().map(datarow);
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
	this.triggerGridEvent("onCheckChange", [datarow, true], true);
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
		datarow = this.getDataMgr().map(datarow);
	}
	if (!this._remove(datarow)) {
		return;
	}
	CheckManager._uncheck(this.getCheckbox(datarow));
	if (this._hasMaster) {
		CheckManager._uncheck(this._master);
	}
	this.triggerGridEvent("onCheckChange", [datarow, false], true);
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
	var datam = this.getDataMgr();
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
	this.triggerGridEvent("onDisableCheck", [datarow], true);
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
	var datam = this.getDataMgr();
	if (!nomap) {
		datarow = datam.map(datarow);
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
	this.triggerGridEvent("onEnableCheck", [datarow], true);
};
prototype._updateMaster = function() {
	if (this._hasMaster) {
		CheckManager._setCheck(this._master, this.isCheckedAll());
	}
};
prototype._add = function(datarow, id) {
	id = id || datarow[this.getIdKey()];
	if (this._map.hasOwnProperty(id)) {
		return false;
	}
	if (this._isRadio) {
		this._map = {};
		this._count = 0;
	}
	this._map[id] = datarow;
	this._count++;
	return true;
};
prototype._remove = function(datarow, id) {
	id = id || datarow[this.getIdKey()];
	var map = this._map;
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
	var datam = this.getDataMgr();
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
	var datam = this.getDataMgr();
	if (!nomap) {
		datarow = datam.map(datarow);
	}
	return this.disabledmap.hasOwnProperty(datam.getId(datarow));
};
prototype.splitChecked = function(datalist, nomap) {
	if (!nomap) {
		datalist = this.getDataMgr().mapList(datalist).mapped;
	}
	var checked = [],
		unchecked = [],
		i = 0,
		len = datalist.length,
		idKey = this.getIdKey(),
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
	var count = this._count;
	if (count) {
		var allLen = this.getAllData().length;
		if (count === allLen) {
			return true;
		}
		var datalist = this.getDataList(),
			showLen = datalist.length;
		if (showLen !== allLen) {
			var i = 0;
			for (; i < showLen; i++) {
				if (!this.isChecked(datalist[i], true)) {
					return false;
				}
			}
			return true;
		}
	}
	return false;
};
/**
  üũ�� ��� �����͸� �׸��忡�� �����մϴ�.
  @function {} removeChecked
  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.removeChecked = function() {
	return this.getDataMgr().removeList(this.getCheckList());
};
prototype._getMaster = function() {
	this._master = $(document.getElementById(this.mid + "h"));
};
prototype._getChecks = function(rows) {
	var len = rows.length,
		checks = [],
		i = 0,
		col = this.getColMgr().getIdxByKey(this._key);
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
	return this._getChecks(this.getView().getRenderedRows());
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
	var row = this.getView().getRowById(id);
	if (row) {
		return row.childNodes[this.getColMgr().getIdxByKey(this._key)].childNodes[0];
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
	return this.getCheckboxById(this.getDataMgr().getId(datarow));
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
	return this.getCheckboxById(this.getDataMgr().getIdByIdx(i));
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
	if (colSelections && lastSelection) {
		var checked = this.isChecked(lastSelection.getDatarow(), true),
			row,
				list = this.getDataList();
		if (this._isRadio) {
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
	headerHtml.push("<input id='" + this.mid + "h' type='checkbox' tabIndex='-1' onclick='JGM.m.CheckManager." + this.mid + ".clickMaster(this.checked);' class='" + this._cssClass + " " + this._cssClassMaster + "' mid='" + this.mid + "'");
	if (this.isCheckedAll()) {
		headerHtml.push(" checked='checked'");
	}
	if (this._disabled) {
		headerHtml.push(" disabled='disabled'");
	}
	headerHtml.push("/>");
};
prototype._onRenderCell = function(rowIdx, colIdx, datarow, colDef, cellHtml) {
	cellHtml.push("<input tabIndex='-1' onclick=\"JGM.m.CheckManager." + this.mid + ".toggleById('" + datarow[this.getIdKey()] + "')\" type='" + (this._isRadio ? "radio" : "checkbox") + "' class='" + this._cssClass + "' mid='" + this.mid + "'");
	if (this._name) {
		cellHtml.push(" name='" + this._name + "'");
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
	if (this._hasMaster) {
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
	if (this._hasMaster) {
		this._master.removeAttr("disabled");
	}
	$(this.getCheckboxes()).removeAttr("disabled");
};
prototype.disableMaster = function() {
	if (this._hasMaster) {
		this._master.attr("disabled", "disabled");
	}
};
prototype.enableMaster = function() {
	if (this._hasMaster) {
		this._master.removeAttr("disabled");
	}
};
CheckManager._check = function(obj) {
	if (obj) {
		Util$.safe$(obj).attr("checked", "checked");
	}
};
CheckManager._uncheck = function(obj) {
	if (obj) {
		Util$.safe$(obj).removeAttr("checked");
	}
};
CheckManager.disableNode = function(obj) {
	if (obj) {
		Util$.safe$(obj).attr("disabled", "disabled");
	}
};
CheckManager.enableNode = function(obj) {
	if (obj) {
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
