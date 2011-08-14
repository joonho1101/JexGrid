goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.ColumnManager');
goog.require('jx.grid.CheckManager');
goog.require('jx.grid.Collapser');
goog.require('jx.data.DataManager');
goog.require('jx.struct.Tree');
goog.require('jx.struct.TreeNode');
goog.provide('jx.grid.ColumnGroup');
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
(function() {'use strict';
var JGM = goog.getObjectByName('jx.grid'),
	Util = goog.getObjectByName('jx.util'),
	BaseModule = goog.getObjectByName('jx.grid.BaseModule'),
	Collapser = goog.getObjectByName('jx.grid.Collapser');
 goog.exportSymbol('jx.grid.ColumnGroup', ColumnGroup);
/**
ColumnGroup ���. Ʈ�� ������ �����͸� ����ϴ� ����Դϴ�.
ColumnGroup Ŭ����. Ʈ�� ������ �����͸� ����ϴ� ��� Ŭ���� �Դϴ�. ������ �°�
�����͸� ���������ְ� �ڽĵ��� �ִ� ����� ��ġ��/������ ����� �����մϴ�.
@class {ColumnGroup} jx.grid.ColumnGroup
@author ����ȣ
@since 1.1.0
@version 1.2.2
*/
/**
ColumnGroup ����Ʈ���� �Դϴ�.
@constructor {ColumnGroup} ColumnGroup
@param {Object} args - ColumnGroup ��� �Ķ���� ������Ʈ
@... {jx.grid.Grid} args.grid - ColumnGroup �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
@... {Object} args.options - ColumnGroup �ɼ� ������Ʈ
@returns {ColumnGroup} ColumnGroup ��� �ν��Ͻ��� �����մϴ�.
@author ����ȣ
@since 1.1.0
@version 1.1.0
*/
function ColumnGroup(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� ColumnGroup ��� ���� ���̵��Դϴ�. �б� ����.
	@var {string} mid
	@author ����ȣ
	@since 1.1.0
	@version 1.1.0
	*/
	this.mid = args.mid;
	/**
	ColumnGroup �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�.
	@var {jx.grid.Grid} grid
	@author ����ȣ
	@since 1.1.0
	@version 1.1.0
	*/
	this.grid = args.grid;
	/**
	�׷� ������ �����͸� �����ϴ� {@link jx.grid.ColumnGroup ColumnGroup} �ν��Ͻ� �Դϴ�.
	@var {jx.grid.ColumnGroup} jx.grid.Grid.colGroup
	@author ����ȣ
	@since 1.1.0
	@version 1.1.0
	*/
	this.grid['colGroup'] = this;
	/**
	ColumnGroup ����� �⺻ �ɼ� ������ �����մϴ�.
	@type {Object} options
	@private
	@author ����ȣ
	@since 1.1.0
	@version 1.1.0
	*/
	var options = {
		/**
		grouping �� �� �÷��� key �Դϴ�. �ݵ�� �Է��ؾ��մϴ�.
		<br>�⺻��:<code>undefined</code>
		@type {string} jx.grid.ColumnGroup.options.key
		@private
		@author ����ȣ
		@since 1.1.0
		@version 1.1.0
		*/
		'key':		undefined,
		/**
		�е� ó���� �� �÷����� Ű���� ���� ����Դϴ�. �׷��� �����͵��� ���⿡
		�����Ǵ� �÷����� ���� ��� ���� �� ����մϴ�.
		<br>�⺻��:<code>[]</code>
		@type {Array.<string>=} jx.grid.ColumnGroup.options.padColKeys
		@private
		@author ����ȣ
		@since 1.1.0
		@version 1.1.0
		*/
		'padColKeys': [],
		/**
		�հ踦 ���� �÷����� Ű���� ���� ����Դϴ�. ���⿡ �����Ǵ� �÷�����
		�Ұ� ���� ǥ�õ˴ϴ�.
		<br>�⺻��:<code>[]</code>
		@type {Array.<string>=} jx.grid.ColumnGroup.options.sumColKeys
		@private
		@author ����ȣ
		@since 1.1.0
		@version 1.1.0
		*/
		'sumColKeys': [],
		/**
		�Ұ� �κ��� prefix �� ���մϴ�.
		<br>�⺻��:<code>"�հ�: "</code>
		@type {string=} jx.grid.ColumnGroup.options.prefix
		@private
		@author ����ȣ
		@since 1.1.0
		@version 1.1.0
		*/
		'prefix': "�հ�: ",
		/**
		������ ������ ����� {@link jx.grid.Collapser Collapser} �� �Ѱ��� �ɼ� ������Ʈ�Դϴ�.
		<br>�⺻��:<code>{ indentSize:0 }</code>
		@type {Object=} jx.grid.ColumnGroup.options.Collapser
		@private
		@see jx.grid.Collapser.options
		@author ����ȣ
		@since 1.1.0
		@version 1.1.0
		*/
		'Collapser': {
			'indentSize':0
		}
	};
	this._options = JGM._extend(options, args['options']);
	this._options['Collapser']['key'] = this._options['key'];
	/**
	ColumnGroup �� ������ {@link jx.grid.Collapser Collapser} �Դϴ�.
	@var {jx.grid.Collapser} collapser
	@author ����ȣ
	@since 1.1.0
	@version 1.1.0
	*/
	this.collapser;
	this._parentMap = {};
	this.__init();
}
ColumnGroup.getInstance = function(args) {
	return new ColumnGroup(args);
};
var prototype = ColumnGroup.prototype;
prototype.__init = function() {
	var grid = this.grid,
		datam = grid.dataMgr,
		collapser,
		opt = this._options;
	this.bindEvents();
	/**
	ColumnGroup �� ������ {@link jx.grid.Collapser Collapser} �Դϴ�.
	@var {jx.grid.Collapser} collapser
	@author ����ȣ
	@since 1.1.0
	@version 1.1.0
	*/
	collapser = this.collapser = JGM.create("Collapser", {grid:grid, 'options':opt['Collapser']});
	delete opt['Collapser'];
	this._processData(datam.all);
	collapser.__init();
	datam.refresh();
};
prototype.bindEvents = function() {
	var events;
	events = {
		'onBeforeSetDatalist': this._removeAll,
		"onAfterSetDatalist onAddDatalist": this._processData,
		'onAddDatarow': this._onAddDatarow,
		'onUpdateDatarow': this._onUpdateDatarow,
		'onUpdateDatalist': this._onUpdateDatalist,
		'onRemoveDatarow': this._onRemoveDatarow,
		'onRemoveDatalist': this._onRemoveDatalist,
		'onDestroy': this._destroy
	};
	
	if (this._options['sumColKeys']['length'] !== 0) {
		var mid = this.mid,
		notReal = this.grid['dataMgr']._consts._notReal,
		i = 0,
		sumfn,
		sumkeys = this._options['sumColKeys'],
		prefix = this._options['prefix'],
		len = sumkeys.length;
		sumfn = function (rowIdx, colIdx, datarow, colDef, cellHtml) {
			if (datarow[notReal] === mid) {
				cellHtml.push(prefix);
			}
		};
		for (; i < len; i++) {
			events["onRenderCell_" + sumkeys[i] + "_prepend"] = sumfn;
		}
		events.onCollapserTreeChange = this._onCollapserTreeChange;
	}
	this.grid['event'].bind(events, this);
};
prototype._destroy = function() {
	JGM._destroy(this, {
		name: "ColumnGroup",
		path: "colGroup",
		property: "collapser",
		map: "_parentMap _options"
	});
};
prototype._processData = function(datalist) {
	var len = datalist.length,
		key = this._options['key'],
		padColKeys = this._options['padColKeys'],
		datam = this.grid['dataMgr'],
		notReal = datam._consts._notReal,
		idKey = datam.idKey,
		collapser = this.collapser,
		nodeKey = collapser._tree._options['nodeKey'],
		parentKey = collapser._tree._options['parentKey'],
		newParents = [],
		i = 0;
	for (; i < len; i++) {
		this._addData(datalist[i], key, idKey, notReal, nodeKey, parentKey, padColKeys, newParents);
	}
	if (newParents.length !== 0) {
		datam.all.pushList(newParents);
		datam.makeCompositeKeyList(newParents, true);
		datam.addListToIdMap(newParents);
		if (Util.isNotNull(collapser)) {
			collapser._onAddDatalist(newParents);
		}
	}
	return newParents;
};
prototype._addData = function(data, key, idKey, notReal, nodeKey, parentKey, padColKeys, newParents) {
	var keyVal = data[key],
		parent,
		map = this._parentMap;
	if (!map.hasOwnProperty(keyVal)) {
		parent = this._makeParent(data, key, idKey, keyVal, notReal, nodeKey, padColKeys);
		newParents.push(parent);
		map[keyVal] = parent;
	}
	else {
		parent = map[keyVal];
	}
	data[nodeKey] = data[idKey];
	data[parentKey] = this.mid + keyVal;
};
prototype._makeParent = function(data, key, idKey, keyVal, notReal, nodeKey, padColKeys) {
	var parent = {},
		j = 0,
		len = padColKeys.length;
	parent[notReal] = this.mid;
	parent[nodeKey] = this.mid + keyVal;
	parent[key] = keyVal;
	parent[idKey] = (this.grid['colDefMgr'].getByKey(key).name || key) + ": " + keyVal;
	for (; j < len; j++) {
		parent[padColKeys[j]] = data[padColKeys[j]];
	}
	return parent;
};
prototype._isParent = function(datarow) {
	return datarow[this.grid['dataMgr']._consts._notReal] === this.mid;
};
prototype._removeAll = function(datalist) {
	this._parentMap = {};
};
prototype._onAddDatarow = function(datarow) {
	var newParents = [],
		opt = this._options,
		datam = this.grid['dataMgr'],
		collapser = this.collapser,
		ctopt = collapser._tree._options;
	this._addData(
		datarow,
		opt['key'],
		datam.idKey,
		datam._consts._notReal,
		ctopt['nodeKey'],
		ctopt['parentKey'],
		opt['padColKeys'],
		newParents
	);
	if (newParents.length !== 0) {
		var parent = newParents[0];
		datam.all.push(parent);
		datam.makeCompositeKey(parent, true);
		datam.addToIdMap(parent);
		collapser._onAddDatarow(parent);
	}
};
prototype._onUpdateDatarow = function(datarow, change, before) {
	if (change.hasOwnProperty(this._options['key'])) {
		var key = this._options['key'],	// group key
			newkey = change[key],	// new group key value
			oldkey = before[key],	// old group key value
			mid = this.mid,	// colgroup's module id
			collapser = this.collapser,	// collapser used by colgroup
			tree = collapser._tree,	// tree used by collapser
			tpkey = tree._options['parentKey'],	// tree's parent key
			parKey = {},	// change that contains new parent key to be passed to collapser
			oldParKey = {},	// before that contains old parent key to be passed to collapser
			pmap = this._parentMap,	// group parent map
			oldp;	// old tree parent of currently modified record
		// add new parent group if not exists already
		if (!pmap.hasOwnProperty(newkey)) {
			this._onAddDatarow(datarow);
		}
		// pass parent key info to collapser
		// this will move current data's tree node from old to new parent tree node
		parKey[tpkey] = mid + newkey;
		oldParKey[tpkey] = mid + oldkey;
		collapser._onUpdateDatarow(datarow, parKey, oldParKey);
		// get old parent tree node and delete the group parent if it has no children members anymore
		oldp = tree.getNode(pmap[oldkey]);
		if (oldp.children.length === 0) {
			this.grid['dataMgr'].all.remove(oldp.data);
			delete pmap[oldkey];
			collapser._onRemoveDatarow(oldp.data);
		}
	}
};
prototype._onUpdateDatalist = function(datalist, changes, befores) {
	var key = this._options['key'],	// group key
		mid = this.mid,	// colgroup's module id
		collapser = this.collapser,	// collapser used by colgroup
		tree = collapser._tree,	// tree used by collapser
		tpkey = tree._options['parentKey'],	// tree's parent key
		change,
		parKey = {},	// change that contains new parent key to be passed to collapser
		oldParKey = {},	// before that contains old parent key to be passed to collapser
		parKeys = [],	// array that contains objects with new parent keys
		oldParKeys = [],	// array that contains objects with old parent keys
		list = [],	// array that contains only datarows whose group key value has been changed 
		i = 0,
		len = datalist.length;
	// filter list so new list only contains datarows with modified group keys
	for (; i < len; i++) {
		change = changes[i];
		if (change.hasOwnProperty(key)) {
			parKey = {};
			parKey[tpkey] = mid + change[key];
			parKeys.push(parKey);
			oldParKey = {};
			oldParKey[tpkey] = mid + befores[i][key];
			oldParKeys.push(oldParKey);
			list.push(datalist[i]);
		}
	}
	if (list.length !== 0) {
		var oldkey,	// old group key value
			pmap = this._parentMap,	// group parent map
			oldp,	// old tree parent of currently modified record
			removeList = [];
		// add new parent group if not exists already
		this._processData(list);
		// pass parent key info to collapser
		// this will move current data's tree node from old to new parent tree node
		collapser._onUpdateDatalist(list, parKeys, oldParKeys);
		// get old parent tree node and delete the group parent if it has no children members anymore
		i = 0;
		len = oldParKeys.length;
		for (; i < len; i++) {
			oldkey = oldParKeys[i][tpkey];
			if (pmap.hasOwnProperty(oldkey)) {
				oldp = tree.getNode(pmap[oldkey]);
				if (oldp.children.length === 0) {
					delete pmap[oldkey];
					removeList.push(oldp.data);
				}
			}
		}
		// remove group parents with no children members
		if (removeList.length !== 0) {
			collapser._onRemoveDatalist(removeList);
			this.grid['dataMgr'].all.removeList(removeList);
		}
	}
};
prototype._onRemoveDatarow = function(datarow) {
	if (this._isParent(datarow)) {
		delete this._parentMap[datarow[this._options['key']]];
	}
	else {
		var parentNode = this.collapser._tree.getNode(datarow).parent;
		if (parentNode.children.length === 1) {
			this.grid['dataMgr'].remove(parentNode.data);
		}
	}
};
prototype._onRemoveDatalist = function(datalist) {
	var i = 0,
		len = datalist.length;
	for (; i < len; i++) {
		this._onRemoveDatarow(datalist[i]);
	}
};
prototype._onCollapserTreeChange = function() {
	var sums = {},
		sumKeys = this._options['sumColKeys'],
		len = sumKeys.length,
		i = 0,
		notReal = this.grid['dataMgr']._consts._notReal,
		mid = this.mid,
		data,
		curKey,
		tmp;
		
	for (; i < len; i++) {
		sums[sumKeys[i]] = 0;
	}
	this.collapser._tree.root.traverseChildren({post:true, fn:function(args, index) {
		data = this.data;
		i = 0;
		if (data[notReal] === mid) {
			for (; i < len; i++) {
				curKey = sumKeys[i];
				data[curKey] = sums[curKey];
				sums[curKey] = 0;
			}
		}
		else if (!data.hasOwnProperty(notReal)) {
			for (; i < len; i++) {
				if (typeof (tmp = data[sumKeys[i]]) === "string") {
					tmp = tmp.toFloat();				
				}
				sums[sumKeys[i]] += isNaN(tmp) ? 0 : tmp;
			}
		}
	}});
};
}());
