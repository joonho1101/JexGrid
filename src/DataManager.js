console && console.log && console.log('reading javascript source "DataManager.js"...');//IF_DEBUG

goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.events.EventDispatcher');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');

goog.provide('jx.data.DataManager');

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
	BaseModule = goog.getObjectByName('jx.grid.BaseModule');

 goog.exportSymbol('jx.data.DataManager', DataManager);
	JGM._add("DataManager", DataManager);

	/**
	  DataManager ���. �÷� ������� ����ϴ� ����Դϴ�.
	  DataManager Ŭ����. �÷� ���� ���� ������ �ο� ���İ� �÷� �¿� ��ġ ���� �� �÷�
	  ���� ��ɵ��� �����մϴ�.

	  @class {DataManager} jx.data.DataManager

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.5
	  */

	/**
	  DataManager ����Ʈ���� �Դϴ�.

	  @constructor {DataManager} DataManager
	  @param {Object} args - DataManager ��� �Ķ���� ������Ʈ
	  @... {Array.<Object>} args.datalist - ������ ���
	  @... {jx.grid.Grid} args.grid - DataManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
	  @... {Object} args.options - DataManager �ɼ� ������Ʈ
	  @returns {DataManager} DataManager ��� �ν��Ͻ��� �����մϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	function DataManager(args) {
		/**
		  {@link JGM} �� �Ҵ����ִ� DataManager ��� ���� ���̵��Դϴ�. �б� ����.

		  @var {string} mid

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.mid = args.mid;

		/**
		  DataManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�.

		  @var {jx.grid.Grid} grid

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid = args.grid;

		/**
		  �׸��� �����͸� �����ϴ� {@link jx.data.DataManager DataManager} �ν��Ͻ� �Դϴ�.

		  @var {jx.data.DataManager} jx.grid.Grid.dataMgr

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['dataMgr'] = this;

		/**
		  ���͸� ���� ���� ��� ������ ���.

		  @var {Array.<Object>} all

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.all = [];

		/**
		  �׸��� ȭ�鿡 ������ ���͸� �� ������ ���.

		  @var {Array.<Object>} datalist

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.datalist = [];

		/**
		  ���͸� �Ǿ� ȭ�鿡 ������ �ʴ� ������ ���.

		  @var {Array.<Object>} failed

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.failed = [];

		/**
		  DataManager ����� �⺻ �ɼ� ������ �����մϴ�.

		  @type {Object} options
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		var options = {
			/**
			  �� �ο� �����͵��� ���� ���� ������ ���̵� ����Ű�� key �Դϴ�.<br>�⺻��:<code>undefined</code>

			  @type {string=} jx.data.DataManager.options.idKey
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'idKey': undefined,

			/**
			  ������ �ο��� primary key �� �ϳ� �̻��� ��쿡 �� ��̿� Ű ������ �־��ݴϴ�.<br>�⺻��:<code>[]</code>

			  @type {Array.<string>=} jx.data.DataManager.options.idColKeys
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'idColKeys': [],

			'uniqueKeys': []
		};

		this._options = JGM._extend(options, args['options']);

		this._consts = {
			_auto: 0,
			_given: 1,
			_composite: 2,
			_notReal: this.mid + "@NR" + Util.random(10000),
			_add: 0,
			_addList: 1,
			_update: 2,
			_updateList: 3,
			_remove: 4,
			_removeList: 5,
			unknown:0,
			number:1,
			string:2,
			"boolean":3,
			date:4,
			"enum":5
		};

		if (Util.isNotNull(this._options['idKey'])) {
			this._idMode = this._consts._given;

			/**
			  ������ �ο��� ����ũ ���̵� ����Ű�� key �Դϴ�.

			  @type {string} idKey
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			this.idKey = this._options['idKey'];
		}
		else if (this._options['idColKeys']['length'] !== 0) {
			this._idMode = this._consts._composite;
			this.idKey = "J@I" + this.mid + "@" + Util.random(10000);
		}
		else {
			this._idMode = this._consts._auto;
			this.idKey = "J@I" + this.mid + "@" + Util.random(10000);
		}

		this._increment = 0;

		this.keyToType = {};

		this._idToIdx = {};
		this._idToData = {};

		this._sorter;
		this._filters = [];

		this._history = [];
		this._redoHistory = [];

		this.uniqueMap = {};

		this.__init(args);
	}

	DataManager.getInstance = function(args) {
		return new DataManager(args);
	};

	var prototype = DataManager.prototype;

	prototype.__init = function(args) {
		var i = 0,
			 ukeys = this._options['uniqueKeys'],
			 ukey,
			 umap = this.uniqueMap,
			 len = ukeys.length,
			 tmap = this.keyToType,
			 colDefs = this.grid['colDefMgr'].getAll(),
			 colDef,
			 key;

		for (; i < len; i++) {
			ukey = ukeys[i];
			if (typeof ukey === "string") {
				umap[ukey] = {};
			}
		}

		len = colDefs.length;
		for (i = 0; i < len; i++) {
			colDef = colDefs[i];
			key = colDef['key'];
			if (colDef.hasOwnProperty("unique") && colDef['unique'] === true && !umap.hasOwnProperty(key)) {
				umap[key] = {};
			}
			tmap[key] = this.mapDatatype(colDef['type']);
		}

		Util.ifNull(args['datalist'], []);

		this.bindEvents();

		this.set(args['datalist']);
	};

	prototype.mapDatatype = function(type) {
		if (typeof type === "string") {
			type = type.toLowerCase();
			switch (type) {
				case "number":
					return this._consts.number;
				case "string":
					return this._consts.string;
				case "boolean":
					return this._consts["boolean"];
				case "date":
					return this._consts.date;
				case "enum":
					return this._consts["enum"];
				default:	
					return this._consts.unknown;
			}
		}
		return this._consts.unknown;
	};

	prototype.bindEvents = function() {
		this.grid['event'].bind({
			'onDestroy': this._destroy,
			'keydownCanvas': this._keydownCanvas
		}, this);
	};

	prototype._destroy = function() {
		this.cleanList(this.all);

		JGM._destroy(this, {
			name: "DataManager",
			path: "dataMgr",
			property: "all _idMode _increment idKey _sorter",
			map: "_consts _idToIdx _idToData _options",
			array: "datalist failed _history _redoHistory _filters"
		});
	};

	//tested implicitly
	prototype.addUniqueIndex = function(map, key, data, safe) {
		if (safe !== true) {
			if (Util.isNull(map) || Util.isEmptyString(key) || Util.isNull(data)) {
				return false;
			}
		} 
		if (data.hasOwnProperty(key) === false) {
			return this.grid['error']("KEY_UNDEFINED", key);
		}
		var val;
		if (Util.isEmptyString(val = data[key])) {
			return this.grid['error']("BAD_NULL", key);
		}
		if (map.hasOwnProperty(val)) {
			if (map[val] === data) {
				return false;
			}
			return this.grid['error']("DUP_ENTRY", val, key);
		}
		map[val] = data;
		return true;
	};

	//tested implicitly
	prototype.addUniqueIndices = function(map, key, list, safe) {
		if (safe !== true) {
			if (Util.isNull(map) || Util.isEmptyString(key) || Util.isEmptyArray(list)) {
				return false;
			}
		} 

		var i,
			 len = list.length,
			 success = [],
			 val,
			 data;
		for (i = 0; i < len; i++) {
			if (Util.isNull(data = list[i])) {
				continue;
			}
			if (data.hasOwnProperty(key) === false) {
				this.removeUniqueIndices(map, key, success);
				return this.grid['error']("KEY_UNDEFINED", key);
			}
			if (Util.isEmptyString(val = data[key])) {
				this.removeUniqueIndices(map, key, success);
				return this.grid['error']("BAD_NULL", key);
			}
			if (map.hasOwnProperty(val)) {
				if (map[val] === data) {
					continue;
				}
				this.removeUniqueIndices(map, key, success);
				return this.grid['error']("DUP_ENTRY", val, key);
			}
			success.push(map[val] = data);
		}
		return success.length > 0;
	};

	//tested implicitly
	prototype.updateUniqueIndex = function(map, key, data, change, before, safe) {
		if (safe !== true) {
			if (Util.isEmptyObj(map) || Util.isEmptyString(key) || Util.isNullOr(data, before) || Util.isEmptyObj(change)) {
				return false;
			}
		}

		if (change.hasOwnProperty(key) === false) {
			return false;
		}
		var oldKey,
			 newKey;
		if (before.hasOwnProperty(key) === false || data.hasOwnProperty(key) === false) {
			return this.grid['error']("KEY_UNDEFINED", key);
		}
		if (map.hasOwnProperty(oldKey = before[key]) === false) {
			return this.grid['error']("KEY_NOT_FOUND", oldKey, key);
		}
		if (Util.isEmptyString(newKey = change[key])) {
			return this.grid['error']("BAD_NULL", key);
		}
		if (map.hasOwnProperty(newKey)) {
			if (map[newKey] === data) {
				return false;
			}
			return this.grid['error']("DUP_ENTRY", newKey, key);
		}
		map[newKey] = data;
		delete map[oldKey];
		return oldKey;
	};

	//tested implicitly
	prototype.updateUniqueIndices = function(map, key, list, changes, befores, safe) {
		if (safe !== true) {
			if (Util.isEmptyObj(map) || Util.isEmptyString(key) || Util.isEmptyArray(list) || Util.isEmptyArray(changes) || Util.isEmptyArray(befores)) {
				return false;
			}
			if (list.length !== changes.length || list.length !== befores.length) {
				return this.grid['error']("LENGTH_NOT_EQUAL");
			}
		}

		var i = 0,
			 len = list.length,
			 data,
			 before,
			 change,
			 slist = [],
			 schanges = [],
			 sbefores = [],
			 newKey,
			 oldKey;
		for (; i < len; i++) {
			if (Util.isNull(data = list[i])) {
				continue;
			}
			if ((change = changes[i]).hasOwnProperty(key) === false) {
				continue;
			}
			before = befores[i];
			if (before.hasOwnProperty(key) === false || data.hasOwnProperty(key) === false) {
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid['error']("KEY_UNDEFINED", key);
			}
			if (map.hasOwnProperty(oldKey = before[key]) === false) {
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid['error']("KEY_NOT_FOUND", oldKey, key);
			}
			if (Util.isEmptyString(newKey = change[key])) {
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid['error']("BAD_NULL", key);
			}
			if (map.hasOwnProperty(newKey)) {
				if (map[newKey] === data) {
					continue;
				}
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid['error']("DUP_ENTRY", newKey, key);
			}
			map[newKey] = data;
			delete map[oldKey];

			slist.push(data);
			schanges.push(change);
			sbefores.push(before);
		}

		if (slist.length === 0) {
			return false;
		}
		return {datalist:slist, changes:schanges, befores:sbefores};
	};

	//tested implicitly
	prototype.removeUniqueIndex = function(map, key, data, safe) {
		if (safe !== true) {
			if (Util.isEmptyObj(map) || Util.isEmptyString(key) || Util.isEmptyObj(data)) {
				return;
			}
		} 

		var val;
		if (data.hasOwnProperty(key) && map.hasOwnProperty(val = data[key])) {
			delete map[val];
		}
	};

	//tested implicitly
	prototype.removeUniqueIndices = function(map, key, list, safe) {
		if (safe !== true) {
			if (Util.isEmptyObj(map) || Util.isEmptyString(key) || Util.isEmptyArray(list)) {
				return;
			}
		}

		var i,
			 len = list.length,
			 val,
			 data;

		for (i = 0; i < len; i++) {
			data = list[i];
			if (data.hasOwnProperty(key) && map.hasOwnProperty(val = data[key])) {
				delete map[val];
			}
		}
	};

	//tested
	prototype.addToUniqueMap = function(datarow) {
		if (Util.isEmptyObj(datarow) || Util.isEmptyObj(this.uniqueMap)) {
			return false;
		}

		var added = [],
			 key,
			 umap = this.uniqueMap,
			 res;
		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				res = this.addUniqueIndex(umap[key], key, datarow);
				if (res === true) {
					added.push(key);
				}
				else if (res instanceof Error) {
					var i = 0,
						len = added.length;
					for (; i < len; i++) {
						this.removeUniqueIndex(umap[added[i]], added[i], datarow);
					}
					return res;
				}
			}
		}
		return added.length > 0;
	};

	//tested
	prototype.addListToUniqueMap = function(datalist) {
		if (Util.isEmptyArray(datalist) || Util.isEmptyObj(this.uniqueMap)) {
			return false;
		}

		var umap = this.uniqueMap,
			 success = [],
			 key,
			 res;
		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				res = this.addUniqueIndices(umap[key], key, datalist);
				if (res === true) {
					success.push(key);
				}
				else if (res instanceof Error) {
					var i = 0,
						len = success.length;
					for (; i < len; i++) {
						this.removeUniqueIndices(umap[success[i]], success[i], datalist);
					}
					return res;
				}
			}
		}
		return success.length > 0;
	};

	//tested
	prototype.updateUniqueMap = function(datarow, change, before) {
		if (Util.isNullOr(datarow, change, before) || Util.isEmptyObj(this.uniqueMap)) {
			return false;
		}

		var key,
			 umap = this.uniqueMap,
			 changed = [],
			 res;
		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				res = this.updateUniqueIndex(umap[key], key, datarow, change, before);
				if (res instanceof Error) {
					var i = 0,
						len = changed.length;
					for (; i < len; i++) {
						this.updateUniqueIndex(umap[changed[i]], changed[i], datarow, before, change);
					}
					return res;
				}
				if (res !== false) {
					changed.push(key);
				}
			}
		}
		return changed.length > 0;
	};

	//tested
	prototype.updateListUniqueMap = function(datalist, changes, befores) {
		if (Util.isEmptyArray(datalist) || Util.isEmptyArray(changes) || Util.isEmptyArray(befores) || Util.isEmptyObj(this.uniqueMap)) {
			return false;
		}
		if (datalist.length !== changes.length || datalist.length !== befores.length) {
			return this.grid['error']("LENGTH_NOT_EQUAL");
		}

		var key,
			 umap = this.uniqueMap,
			 changed = [],
			 res;
		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				res = this.updateUniqueIndices(umap[key], key, datalist, changes, befores);
				if (res instanceof Error) {
					var i = 0,
						len = changed.length;
					for (; i < len; i++) {
						this.updateUniqueIndices(umap[changed[i]], changed[i], datalist, befores, changes);
					}
					return res;
				}
				if (res !== false) {
					changed.push(key);
				}
			}
		}
		return changed.length > 0;
	};

	//tested implicitly
	prototype.removeFromUniqueMap = function(added) {
		if (Util.isEmptyObj(added) || Util.isEmptyObj(this.uniqueMap)) {
			return;
		}

		var key,
			 umap = this.uniqueMap;

		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				this.removeUniqueIndex(umap[key], key, added); 
			}
		}
	};

	//tested implicitly
	prototype.removeListFromUniqueMap = function(addedList) {
		if (Util.isEmptyArray(addedList) || Util.isEmptyObj(this.uniqueMap)) {
			return;
		}

		var key,
			 umap = this.uniqueMap;

		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				this.removeUniqueIndices(umap[key], key, addedList);
			}
		}
	};

	//tested
	prototype.addToIdMap = function(datarow) {
		if (Util.isNull(datarow)) {
			return false;
		}
		var idKey = this.idKey;
		switch (this._idMode) {
			case this._consts._auto:
				if (datarow.hasOwnProperty(idKey) === false) {
					datarow[idKey] = this._increment++;
				}
			case this._consts._given:
			case this._consts._composite:
				return this.addUniqueIndex(this._idToData, idKey, datarow);
		}
		return false;
	};

	//tested
	prototype.addListToIdMap = function(datalist) {
		if (Util.isEmptyArray(datalist)) {
			return false; 
		}

		var idKey = this.idKey;
		switch (this._idMode) {
			case this._consts._auto:
				var i = 0,
					 datarow,
					 len = datalist.length;
				for (; i < len; i++) {
					if ((datarow = datalist[i]).hasOwnProperty(idKey) === false) {
						datarow[idKey] = this._increment++;
					}
				}
			case this._consts._given:
			case this._consts._composite:
				return this.addUniqueIndices(this._idToData, idKey, datalist);
		}
		return false;
	};

	//tested
	prototype.updateIdMap = function(datarow, change, before) {
		if (Util.isNullOr(datarow, before) || Util.isEmptyObj(change)) {
			return false;
		}

		var idKey = this.idKey;
		switch (this._idMode) {
			case this._consts._auto:
				if (change.hasOwnProperty(idKey)) {
					return this.grid['error']("NOT_MODIFIABLE", idKey);
				}
			case this._consts._given:
				return this.updateUniqueIndex(this._idToData, idKey, datarow, change, before);
			case this._consts._composite:
				if (change.hasOwnProperty(idKey)) {
					return this.grid['error']("NOT_MODIFIABLE", idKey);
				}
				var idKeys = this._options['idColKeys'],
					 keylen = idKeys.length,
					 i = 0;
				for (; i < keylen; i++) {
					if (change.hasOwnProperty(idKeys[i])) {
						var newId = "",
							oldId,
								j = 0,
								res,
								curIdKey,
								val,
								idChange = {},
								idBefore = {};
						oldId = idBefore[idKey] = datarow[idKey];
						for (; j < keylen; j++) {
							curIdKey = idKeys[j];
							if (change.hasOwnProperty(curIdKey)) {
								if (Util.isEmptyString(val = change[curIdKey])) {
									return this.grid['error']("BAD_NULL", curIdKey);
								}
								newId += "&" + val;
							}
							else {
								newId += "&" + datarow[curIdKey];
							}
						}
						datarow[idKey] = idChange[idKey] = newId;
						if (oldId === newId) {
							return false;
						}
						res = this.updateUniqueIndex(this._idToData, idKey, datarow, idChange, idBefore);
						if (res instanceof Error) {
							datarow[idKey] = oldId;
						}
						return res;
					}
				}
				break;
		}
		return false;
	};

	//tested
	prototype.updateListIdMap = function(datalist, changes, befores) {
		if (Util.isEmptyArray(datalist) || Util.isEmptyArray(changes) || Util.isEmptyArray(befores)) {
			return false;
		}

		var idKey = this.idKey,
			 len = datalist.length,
			 i = 0;

		switch (this._idMode) {
			case this._consts._auto:
				for (; i < len; i++) {
					if (changes[i].hasOwnProperty(idKey)) {
						return this.grid['error']("NOT_MODIFIABLE", idKey);
					}
				}
			case this._consts._given:
				return this.updateUniqueIndices(this._idToData, idKey, datalist, changes, befores);
			case this._consts._composite:
				var idMap = this._idToData,
					 datarow,
					 change,
					 idKeys = this._options['idColKeys'],
					 keylen = idKeys.length,
					 newId,
					 oldIds = [],
					 idChange,
					 idBefore,
					 list = [],
					 idChanges = [],
					 idBefores = [],
					 j,
					 k,
					 curIdKey,
					 val,
					 res;

				for (; i < len; i++) {
					datarow = datalist[i];
					change = changes[i];
					if (change.hasOwnProperty(idKey)) {
						for (j = 0, len = oldIds.length; j < len; j++) {
							list[j][idKey] = oldIds[j];
						}
						return this.grid['error']("NOT_MODIFIABLE", idKey);
					}
					for (j = 0; j < keylen; j++) {
						if (change.hasOwnProperty(idKeys[j])) {
							newId = "";
							for (k = 0; k < keylen; k++) {
								curIdKey = idKeys[k];
								if (change.hasOwnProperty(curIdKey)) {
									if (Util.isEmptyString(val = change[curIdKey])) {
										for (j = 0, len = oldIds.length; j < len; j++) {
											list[j][idKey] = oldIds[j];
										}
										return this.grid['error']("BAD_NULL", curIdKey);
									}
									newId += "&" + val;
								}
								else {
									newId += "&" + datarow[curIdKey];
								}
							}
							if (datarow[idKey] === newId) {
								continue;
							}
							list.push(datarow);
							idChanges.push(idChange = {});
							idBefores.push(idBefore = {});
							oldIds.push(idBefore[idKey] = datarow[idKey]);
							datarow[idKey] = idChange[idKey] = newId;
						}
					}
				}
				if (list.length === 0) {
					return false;
				}
				res = this.updateUniqueIndices(idMap, idKey, list, idChanges, idBefores);
				if (res instanceof Error) {
					for (j = 0, len = oldIds.length; j < len; j++) {
						list[j][idKey] = oldIds[j];
					}
				}
				return res;
		}
		return false;
	};

	prototype.removeFromIdMap = function(datarow) {
		var idKey = this.idKey,
			 idMap = this._idToData,
			 val;
		if (Util.isNotNull(datarow) && datarow.hasOwnProperty(idKey) && (idMap.hasOwnProperty((val = datarow[idKey])))) {
			delete idMap[val];
		}
	};

	prototype.removeListFromIdMap = function(datalist) {
		if (Util.isEmptyArray(datalist)) {
			return;
		}
		var idKey = this.idKey,
			 datalen = datalist.length,
			 idMap = this._idToData,
			 val,
			 datarow,
			 i = 0;

		for (; i < datalen; i++) {
			datarow = datalist[i];
			if (datarow.hasOwnProperty(idKey) && (idMap.hasOwnProperty((val = datarow[idKey])))) {
				delete idMap[val];
			}
		}
	};

	prototype.fillTemp = function(datarow, args) {
		if (Util.isNull(datarow)) {
			return;
		}
		var colDefs = this.grid['colDefMgr'].getAll(),
			 clen = colDefs.length,
			 key,
			 isNew = args !== undefined && args['isNew'],
			 colDef,
			 i = 0;

		if (isNew) {
			for (; i < clen; i++) {
				colDef = colDefs[i];
				key = colDef['key'];
				// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
				if (colDef['nullOnCreate'] && Util.isNull(datarow[key])) {
					datarow[key] = "J@H" + this._increment++;
				}
			}
		}
	};

	prototype.fillTempList = function(datalist, args) {
		if (Util.isEmptyArray(datalist)) {
			return;
		}
		var colDefs = this.grid['colDefMgr'].getAll(),
			 clen = colDefs.length,
			 len = datalist.length,
			 key,
			 isNew = args !== undefined && args['isNew'],
			 colDef,
			 i = 0,
			 j;

		if (isNew) {
			for (; i < clen; i++) {
				colDef = colDefs[i];
				key = colDef['key'];
				// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
				if (colDef['nullOnCreate']) {
					for (j = 0; len; j++) {
						datalist[j][key] = "J@H" + this._increment++;
					}
				}
			}
		}
	};

	prototype.query = function(query) {
		if (typeof query !== "string") {
			return;
		}
		query = $.trim(query);
		if (query.length === 0) {
			return;
		}
		var lquery,
			 opIndex,
			 op,
			 stmt,
			 whereIndex,
			 hasWhere,
			 where;

		lquery = query.toLowerCase();
		opIndex = query.indexOf(' ');
		if (opIndex === -1) {
			return;
		}
		op = lquery.substring(0, opIndex);
		whereIndex = lquery.indexOf(' where ');
		hasWhere = whereIndex > -1;
		stmt = $.trim(hasWhere ? query.substring(opIndex + 1, whereIndex) : query.substring(opIndex + 1));
		if (stmt.length === 0) {
			return;
		}
		if (hasWhere) {
			where = $.trim(query.substring(whereIndex + 7));
		}

		switch (op) {
			case "select":
				return this.executeSelect(stmt, where);
			case "insert":
				return this.executeInsert(stmt, where);
			case "update":
				return this.executeUpdate(stmt, where);
			case "delete":
				return this.executeDelete(stmt, where);
		}
	};

	prototype.parseWhere = function(where) {
		if (typeof where !== "string") {
			return;
		}
		where = $.trim(where);
		if (where.length === 0) {
			return;
		} 

	};

	/**
	  ������ �ο� �����Ϳ��� �־��� Ű���� ���鸸�� �����Ͽ� ���ο� ������Ʈ�� ���
	  �� ������Ʈ���� ���� ��̸� �����մϴ�.
	  ���� ��� executeSelect("id, key") �� ������ ��� �ο� �����Ϳ��� id �� key �÷�����
	  ���鸸 �����ؼ� �����մϴ�.

	  @function {number} executeSelect
	  @param {string} selectStatement - ��ĭ �Ǵ� , �� ���� �翩�� Ű ���� ��Ʈ��
	  @returns {Array.<Object>} �־��� Ű���� ���� ������Ʈ���� ���

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.executeSelect = function(select, condition) {
		var temp = Util.split(select, /[\s,]+/),
			 len = temp.length,
			 i = 0,
			 attr = {},
			 list = this.all,
			 res = [],
			 all = false;

		if (len === 0) {
			return res;
		}

		for (; i < len; i++) {
			if (temp[i] === '*') {
				all = true;
				break;
			}
			attr[temp[i]] = true;
		}

		i = 0;
		len = list.length;
		for (; i < len; i++) {
			res.push(Util.clone(list[i], attr));
		}
		return res;
	};

	//tested
	prototype.parse = function(datarow, args) {
		if (Util.isNull(datarow)) {
			return false;
		}
		var colDefs = this.grid['colDefMgr'].getAll(),
			 clen = colDefs.length,
			 parser,
			 key,
			 isNew = args !== undefined && args['isNew'],
			 colDef,
			 i = 0;
		for (; i < clen; i++) {
			colDef = colDefs[i];
			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef['nullOnCreate']) {
				continue;
			}

			if (Util.isFunction(parser = colDef['parser'])) {
				key = colDef['key'];
				if (datarow.hasOwnProperty(key)) {
					try {
						datarow[key] = parser(datarow[key], datarow);
					}
					catch (e) {
						if (Util.isNull(datarow)) {
							return this.grid['error']("PARSE_ERROR", datarow, key);
						}
						else {
							return this.grid['error']("PARSE_ERROR", datarow[key], key);
						}
					}
				}
			}
		}
		return true;
	};

	//tested
	prototype.parseList = function(list, args) {
		if (Util.isNull(list)) {
			return false;
		}
		if (list.length === 0) {
			return true;
		}
		var colDefs = this.grid['colDefMgr'].getAll(),
			 clen = colDefs.length,
			 len = list.length,
			 parser,
			 key,
			 i = 0,
			 j,
			 isNew = args !== undefined && args['isNew'],
			 colDef,
			 datarow;
		for (; i < clen; i++) {
			colDef = colDefs[i];
			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef['nullOnCreate']) {
				continue;
			}

			if (Util.isFunction(parser = colDef['parser'])) {
				key = colDef['key'];
				try {
					for (j = 0; j < len; j++) {
						datarow = list[j];
						if (datarow.hasOwnProperty(key)) {
							datarow[key] = parser(datarow[key], datarow);
						}
					}
				}
				catch (e) {
					if (Util.isNull(datarow)) {
						return this.grid['error']("PARSE_ERROR", datarow, key);
					}
					else {
						return this.grid['error']("PARSE_ERROR", datarow[key], key);
					}
				}
			}
		}
		return true;
	};

	//tested
	prototype.validate = function(datarow, args) {
		if (Util.isNull(datarow)) {
			return false;
		}
		var colDefs = this.grid['colDefMgr'].getAll(),
			 clen = colDefs.length,
			 validator,
			 colDef,
			 key,
			 isnull,
			 emptystr,
			 val,
			 stringval,
			 test,
			 isNew = args !== undefined && args['isNew'],
			 i = 0;
		for (; i < clen; i++) {
			colDef = colDefs[i];
			key = colDef['key'];
			val = undefined;
			isnull = false;
			emptystr = false;

			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef['nullOnCreate']) {
				continue;
			}

			// validate not null
			if (colDef['notNull'] === true) {
				if (datarow.hasOwnProperty(key) === false || Util.isEmptyString(val = datarow[key])) {
					return this.grid['error']("BAD_NULL", key);
				}
				stringval = val.toString();
			}
			// make nulls and empty strings map for later validates
			else {
				if (datarow.hasOwnProperty(key) === false || Util.isNull(val = datarow[key])) {
					isnull = true;
					emptystr = true;
				}
				else if (val === "") {
					emptystr = true;
				}
				if (isnull === false) {
					stringval = val.toString();
				}
				else {
					stringval = "";
				}
			}
			if (isnull === false) {
				// test if value does not violate max limit
				if (Util.isNotNull(test = colDef['max'])) {
					if (emptystr === false && val > test) {
						return this.grid['error']("BIGGER_THAN", val, key, test);
					}
				}
				// test if value does not violate min limit
				if (Util.isNotNull(test = colDef['min'])) {
					if (emptystr === false && val < test) {
						return this.grid['error']("SMALLER_THAN", val, key, test);
					}
				}
				// test if value does not violate length 
				if (Util.isNotNull(test = colDef['length'])) {
					if (emptystr === true || stringval.length !== test) {
						return this.grid['error']("WRONG_LENGTH", stringval, test, key);
					}
				}
				else {
					// test if value does not violate max length 
					if (Util.isNotNull(test = colDef['maxlength'])) {
						if (emptystr === false && stringval.length > test) {
							return this.grid['error']("DATA_TOO_LONG", stringval, key, test);
						}
					}
					// test if value does not violate min length 
					if (Util.isNotNull(test = colDef['minlength'])) {
						if (emptystr === true || stringval.length < test) {
							return this.grid['error']("DATA_TOO_SHORT", stringval, key, test);
						}
					}
				}
			}
			// test if value passes validator 
			if (Util.isFunction(validator = colDef['validator'])) {
				try {
					if (validator(val, datarow, stringval, isnull, emptystr) !== true) {
						return this.grid['error']("WRONG_VALUE", stringval, key);
					}
				}
				catch (e) {
					return this.grid['error']("WRONG_VALUE", stringval, key);
				}
			}
		}
		return true;
	};

	//tested
	prototype.validateList = function(list, args) {
		if (Util.isNull(list)) {
			return false;
		}
		if (list.length === 0) {
			return true;
		}
		var colDefs = this.grid['colDefMgr'].getAll(),
			 clen = colDefs.length,
			 len = list.length,
			 validator,
			 colDef,
			 key,
			 i = 0,
			 j,
			 nulls, // has true for null rows
			 emptystrs, // has true for empty rows
			 val,
			 test,
			 isNew = args !== undefined && args['isNew'],
			 vals = [], // has values for all rows for current column
			 stringvals = []; // has string values for all rows for current column
		for (; i < clen; i++) {
			// initialize column validation test
			colDef = colDefs[i];
			key = colDef['key'];
			nulls = {};
			emptystrs = {};
			vals.length = 0;
			stringvals.length = 0;

			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef['nullOnCreate']) {
				continue;
			}

			// validate not null
			if (colDef['notNull'] === true) {
				for (j = 0; j < len; j++) {
					if (list[j].hasOwnProperty(key) === false || Util.isEmptyString(val = list[j][key])) {
						return this.grid['error']("BAD_NULL", key);
					}
					vals.push(val);
					stringvals.push(val.toString());
				}
			}
			// make nulls and empty strings map for later validates
			else {
				for (j = 0; j < len; j++) {
					val = undefined;
					if (list[j].hasOwnProperty(key) === false || Util.isNull(val = list[j][key])) {
						nulls[j] = true;
						emptystrs[j] = true;
					}
					else if (val === "") {
						emptystrs[j] = true;
					}
					vals.push(val);
					if (nulls.hasOwnProperty(j)) {
						stringvals.push("");
					}
					else {
						stringvals.push(val.toString());
					}
				}
			}
			// test if value does not violate max limit
			if (Util.isNotNull(test = colDef['max'])) {
				for (j = 0; j < len; j++) {
					if (emptystrs.hasOwnProperty(j) === false && vals[j] > test) {
						return this.grid['error']("BIGGER_THAN", vals[j], key, test);
					}
				}
			}
			// test if value does not violate min limit
			if (Util.isNotNull(test = colDef['min'])) {
				for (j = 0; j < len; j++) {
					if (emptystrs.hasOwnProperty(j) === false && vals[j] < test) {
						return this.grid['error']("SMALLER_THAN", vals[j], key, test);
					}
				}
			}
			// test if value does not violate length 
			if (Util.isNotNull(test = colDef['length'])) {
				for (j = 0; j < len; j++) {
					if (nulls.hasOwnProperty(j) === false && (emptystrs.hasOwnProperty(j) || stringvals[j].length !== test)) {
						return this.grid['error']("WRONG_LENGTH", stringvals[j], test, key);
					}
				}
			}
			else {
				// test if value does not violate max length 
				if (Util.isNotNull(test = colDef['maxlength'])) {
					for (j = 0; j < len; j++) {
						if (emptystrs.hasOwnProperty(j) === false && stringvals[j].length > test) {
							return this.grid['error']("DATA_TOO_LONG", stringvals[j], key, test);
						}
					}
				}
				// test if value does not violate min length 
				if (Util.isNotNull(test = colDef['minlength'])) {
					for (j = 0; j < len; j++) {
						if (nulls.hasOwnProperty(j) === false && (emptystrs.hasOwnProperty(j) || stringvals[j].length < test)) {
							return this.grid['error']("DATA_TOO_SHORT", stringvals[j], key, test);
						}
					}
				}
			}
			// test if value passes validator 
			if (Util.isFunction(validator = colDef['validator'])) {
				try {
					for (j = 0; j < len; j++) {
						if (validator(vals[j], list[j], stringvals[j], nulls.hasOwnProperty(j), emptystrs.hasOwnProperty(j)) !== true) {
							return this.grid['error']("WRONG_VALUE", stringvals[j], key);
						}
					}
				}
				catch (e) {
					return this.grid['error']("WRONG_VALUE", stringvals[j], key);
				}
			}
		}
		return true;
	};

	prototype.makeCompositeKey = function(datarow, update) {
		if (this._idMode !== this._consts._composite || Util.isNull(datarow)) {
			return;
		}

		if (update === true || datarow.hasOwnProperty(this.idKey) === false) {
			var idColKeys = this._options['idColKeys'],
				keylen = idColKeys.length,
						 i = 0,
						 id = "";
			for (; i < keylen; i++) {
				id += "&" + datarow[idColKeys[i]];
			}
			datarow[this.idKey] = id;
		}
	};

	prototype.makeCompositeKeyList = function(datalist, update) {
		if (this._idMode !== this._consts._composite || datalist.length === 0) {
			return;
		}

		var idKey = this.idKey,
			 datalen = datalist.length,
			 idColKeys = this._options['idColKeys'],
			 keylen = idColKeys.length,
			 data,
			 i = 0,
			 j,
			 id;
		if (update === true) {
			for (; i < datalen; i++) {
				data = datalist[i];
				id = "";
				j = 0;
				for (; j < keylen; j++) {
					id += "&" + data[idColKeys[j]];
				}
				data[idKey] = id;
			}
		}
		else {
			for (; i < datalen; i++) {
				if ((data = datalist[i]).hasOwnProperty(idKey) === false) {
					id = "";
					j = 0;
					for (; j < keylen; j++) {
						id += "&" + data[idColKeys[j]];
					}
					data[idKey] = id;
				}
			}
		}
	};

	/**
	  �־��� ������ �ο츦 ���� �׸��尡 ������ �ִ� ������ �ο쿡 �����մϴ�.
	  ���ε� ������ �ο츦 �����մϴ�. �׸��尡 �����͸� ������ ���� �ʴ� ��쿡��
	  <code>undefined</code> �� �����մϴ�.

	  @function {Object} map
	  @param {Object} datarow - ������ �����Ϳ� ������ ������ �ο�
	  @returns {Object} ���ε� ������ �ο츦 �����մϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.map = function(datarow) {
		if (Util.isNull(datarow)) {
			return;
		}
		var idMap = this._idToData,
			 idKey = this.idKey,
			 id;

		this.makeCompositeKey(datarow);

		if (datarow.hasOwnProperty(idKey) && idMap.hasOwnProperty(id = datarow[idKey])) {
			return idMap[id];
		}
	};

	/**
	  �־��� ������ ��̸� ���� �׸��尡 ������ �ִ� �����Ϳ� �����մϴ�. ���ϵǴ�
	  ���� ����� ������ ���� ������ �����ϴ�.
	  <code>{mapped:data[], unmapped:data[]}</code>

	  @function {Object} mapList
	  @param {Array.<Object>} datalist - ������ �����Ϳ� ������ ������ ���
	  @returns {Object} ���ε� �ο� ������ ��̿� ������ ��̸� �����մϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.mapList = function(list) {
		if (Util.isEmptyArray(list)) { 
			return {'mapped':[], 'unmapped':[]};
		}

		this.makeCompositeKeyList(list);

		var mapped = [],
			 unmapped = [],
			 idKey = this.idKey,
			 idMap = this._idToData,
			 len = list.length,
			 i = 0,
			 datarow,
			 id;

		for (; i < len; i++) {
			if ((datarow = list[i]).hasOwnProperty(idKey) && idMap.hasOwnProperty(id = datarow[idKey])) {
				mapped.push(idMap[id]);
			}
			else {
				unmapped.push(datarow);
			}
		}

		return {'mapped':mapped, 'unmapped':unmapped};
	};

	/**
	  �־��� ���̵� ���� �ο� �����͸� �����մϴ�.

	  @function {Object} getById
	  @param {string} id - ������ �ο��� ���̵�
	  @returns {Object} �־��� ���̵� ���� ������ �ο�

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getById = function(id) {
		if (Util.isNotNull(id) && this._idToData.hasOwnProperty(id)) {
			return this._idToData[id];
		}
	};

	/**
	  �־��� �ε����� �ش��ϴ� �ο� �����͸� �����մϴ�.

	  @function {Object} getByIdx
	  @param {number} idx - ������ �ο��� ȭ�鿡 �������� �ε���
	  @returns {Object} �־��� �ε����� ���� ������ �ο�

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getByIdx = function(i) {
		if (Util.isNotNull(i) && this.datalist.hasOwnProperty(i)) {
			return this.datalist[i];
		}
	};

	/**
	  �־��� �ο� DOM Element �� �ش��ϴ� �ο� �����͸� �����մϴ�.

	  @function {Object} getByNode
	  @param {DOMElement} node - �ο� DOM Element
	  @returns {Object} �־��� �ο� DOM Element �� �ش��ϴ� ������ �ο�

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getByNode = function(node) {
		return this.getById(this.getIdByNode(node));
	};


	/**
	  �־��� ������ �ο��� �ε����� �����մϴ�.

	  @function {number} getIdx
	  @param {Object} datarow - �ε����� ã�� ������ �ο�
	  @returns {number} �־��� ������ �ο��� �ε���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getIdx = function(datarow) {
		return this.getIdxById(this.getId(datarow));
	};

	/**
	  �־��� ���̵� ���� ������ �ο��� �ε����� �����մϴ�.

	  @function {number} getIdxById
	  @param {string} id - �ε����� ã�� ������ �ο��� ���̵�
	  @returns {number} �־��� ���̵� ���� ������ �ο��� �ε���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getIdxById = function(id) {
		if (Util.isNotNull(id) && this._idToIdx.hasOwnProperty(id)) {
			return this._idToIdx[id];
		}
		return -1;
	};

	/**
	  �־��� �ο� DOM Element �� �ش��ϴ� �ο� �������� �ε����� �����մϴ�.

	  @function {number} getIdxByNode
	  @param {DOMElement} node - �ο� DOM Element
	  @returns {number} �־��� �ο� DOM Element �� �ش��ϴ� ������ �ο��� �ε���

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getIdxByNode = function(node) {
		return this.getIdxById(this.getIdByNode(node));
	};

	/**
	  �־��� ������ �ο��� ���̵� �����մϴ�.

	  @function {string} getId
	  @param {Object} datarow - ������ �ο�
	  @returns {string} ������ �ο��� ���̵�

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getId = function(datarow) {
		if (Util.isNotNull(datarow) && datarow.hasOwnProperty(this.idKey)) {
			return datarow[this.idKey];
		}
	};

	/**
	  �־��� ������ �ο��� ���̵� �����մϴ�.

	  @function {string} getIdByIdx
	  @param {number} index - ������ �ο� �ε���
	  @returns {string} ������ �ο��� ���̵�

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getIdByIdx = function(i) {
		return this.getId(this.getByIdx(i));
	};

	/**
	  �־��� �ο� DOM Element �� �ش��ϴ� �ο� �������� ���̵� �����մϴ�.

	  @function {string} getIdByNode
	  @param {DOMElement} node - �ο� DOM Element
	  @returns {string} �־��� �ο� DOM Element �� �ش��ϴ� ������ �ο��� ���̵�

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getIdByNode = function(node) {
		if (Util.isNotNull(node)) {
			return node.getAttribute('i');
		}
	};

	prototype._reidxFrom = function(from) {
		if (Util.isNull(from)) {
			from = 0;
		}

		var datalist = this.datalist,
			 datalen = datalist.length,
			 idKey = this.idKey,
			 idxMap = this._idToIdx,
			 i = from;

		for (; i < datalen; i++) {
			idxMap[datalist[i][idKey]] = i;
		}
	};

	prototype._reidx = function(from) {
		this._idToIdx = {};
		this._reidxFrom();
	};


	/**
	  �־��� ������ �ο찡 ȭ�鿡 �������� ������ �ο� ��̿� �ִ����� üũ�մϴ�.

	  @function {boolean} has
	  @param {Object} datarow - ������ ��̿� ���Ե��ִ��� üũ�� ������ �ο�
	  @returns {boolean} ȭ�鿡 �������� ������ ��̿� ���ԵǾ� ������ true, �ƴϸ�
	  false �� �����մϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.has = function(datarow) {
		return this.hasById(this.getId(datarow));
	};

	/**
	  �־��� ������ �ο찡 ȭ�鿡 �������� ������ �ο� ��̿� �ִ����� üũ�մϴ�.

	  @function {boolean} hasById
	  @param {string} id - ������ ��̿� ���Ե��ִ��� üũ�� ������ ���̵�
	  @returns {boolean} ȭ�鿡 �������� ������ ��̿� ���ԵǾ� ������ true, �ƴϸ�
	  false �� �����մϴ�.

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.hasById = function(id) {
		if (Util.isNotNull(id)) {
			return this._idToIdx.hasOwnProperty(id);
		}
		return false;
	};

	/**
	  �־��� ������ �ο찡 ȭ�鿡 �������� ������ �ο� ��� �Ӹ� �ƴ϶� ��� ������ ��� �ʿ� �ִ����� üũ�մϴ�.

	  @function {boolean} contains
	  @param {Object} datarow - ������ �ο�
	  @returns {boolean} ������ ��̿� ���ԵǾ� ������ true, �ƴϸ� false �� �����մϴ�.

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.contains = function(datarow) {
		return this.containsById(this.getId(datarow));
	};

	/**
	  �־��� ������ �ο찡 ȭ�鿡 �������� ������ �ο� ��� �Ӹ� �ƴ϶� ��� ������ ��� �ʿ� �ִ����� üũ�մϴ�.

	  @function {boolean} containsById
	  @param {string} id - ������ ���̵�
	  @returns {boolean} ������ ��̿� ���ԵǾ� ������ true, �ƴϸ� false �� �����մϴ�.

	  @author ����ȣ
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.containsById = function(id) {
		if (Util.isNotNull(id)) {
			return this._idToData.hasOwnProperty(id);
		}
		return false;
	};

	/**
	  ���͸� ���� ���� ��� ������ ��̸� �־��� ������ ��̷� ���մϴ�.

	  @function {} set
	  @param {Array.<Object>} datalist - ������ ���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.set = function(datalist) {
		if (this.all === datalist || (Util.isEmptyArray(datalist) && this.all === 0)) {
			return false;
		}

		/**
		  �׸��� �����Ϳ� ������ ����Ǳ� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onBeforeDataChange

		  @author ����ȣ
		  @since 1.1.3
		  @version 1.2.3
		  */
		this.grid['event'].trigger("onBeforeDataChange", false, true);

		/**
		  �׸����� ��� ������ ��̸� ���ϱ� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onBeforeSetDatalist
		  @param {Array.<Object>} datalist - �׸��尡 ������ ������ �ִ� ��� ������ ���
		  @param {Array.<Object>} newDatalist - �׸��尡 ���� ������ �� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.3.0
		  */
		this.grid['event'].trigger("onBeforeSetDatalist", [this.all, datalist], true);

		this.cleanList(this.all);

		var key,
			 umap = this.uniqueMap;
		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				umap[key] = {};
			}
		}

		this._idToData = {};

		this.all = [];

		this._history.length = 0;
		this._redoHistory.length = 0;

		if (Util.isNull(datalist)) {
			datalist = [];
		}

		var res;
		if ((res = this.parseList(datalist)) instanceof Error) {
			return res;
		}

		if ((res = this.validateList(datalist)) instanceof Error) {
			return res;
		}

		if ((res = this.addListToUniqueMap(datalist)) instanceof Error) {
			return res;
		}

		this.makeCompositeKeyList(datalist, true);

		if ((res = this.addListToIdMap(datalist)) instanceof Error) {
			return res;
		}

		this.all = datalist;

		/**
		  �׸����� ��� ������ ��̸� ���� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onAfterSetDatalist
		  @param {Array.<Object>} datalist - �׸��尡 ���� ������ �Ǵ� ��� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onAfterSetDatalist", [datalist], true);

		/**
		  �׸��� �����Ϳ� ���� ������ �־��� ��쿡 �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onDataChange

		  @author ����ȣ
		  @since 1.1.3
		  @version 1.1.3
		  */
		this.grid['event'].trigger("onDataChange", false, true);

		this.refresh();

		return true;
	};


	/**
	  �ϳ��� ������ �ο츦 �߰��մϴ�. �̹� �ִ� �����Ͷ�� �ƹ��͵� ���� �ʰ� ���ο�
	  �����Ͷ�� ��� ������ ����� �ڿ� �ٿ� �ֽ��ϴ�.

	  @function {} add
	  @param {Object} datarow - �߰��� ������ �ο�

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.add = function(datarow, args) {
		if (Util.isNull(datarow) || Util.isNotNull(this.map(datarow))) {
			return false;
		}

		this.grid['event'].trigger("onBeforeDataChange", false, true);

		this.fillTemp(datarow, args);

		var res;
		if ((res = this.parse(datarow, args)) instanceof Error) {
			return res;
		}

		if ((res = this.validate(datarow, args)) instanceof Error) {
			return res;
		}

		if ((res = this.addToUniqueMap(datarow)) instanceof Error) {
			return res;
		}

		if ((res = this.addToIdMap(datarow)) instanceof Error) {
			return res;
		}

		this.all.push(datarow);

		if (Util.isNull(args) || args['undo'] !== true) {
			this._history.push({
				_action:this._consts._add,
				_target:datarow
			});
			this._redoHistory.length = 0;
		}

		/**
		  �ϳ��� ������ �ο츦 �߰��� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onAddDatarow
		  @param {Object} datarow - �߰��� ������

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onAddDatarow", [datarow, args], true);
		this.grid['event'].trigger("onDataChange", false, true);

		if (args === undefined || args['noRefresh'] !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  �������� ������ �ο츦 �߰��մϴ�. �̹� �ִ� �����ʹ� �����ϰ� ���ο� �����͸�
	  ������ ��� ������ ����� �ڿ� �ٿ� �ֽ��ϴ�.

	  @function {} addList
	  @param {Array.<Object>} datalist - �߰��� ������ ���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.addList = function(datalist, args) {
		if (Util.isEmptyArray(datalist)) {
			return false;
		}

		var toAdd = this.mapList(datalist).unmapped;
		if (toAdd.length === 0) {
			return false;
		}

		this.grid['event'].trigger("onBeforeDataChange", false, true);

		this.fillTempList(datalist, args);

		var res;
		if ((res = this.parseList(toAdd, args)) instanceof Error) {
			return res;
		}

		if ((res = this.validateList(toAdd, args)) instanceof Error) {
			return res;
		}

		if ((res = this.addListToUniqueMap(toAdd)) instanceof Error) {
			return res;
		}

		if ((res = this.addListToIdMap(toAdd)) instanceof Error) {
			return res;
		}

		this.all.pushList(toAdd);

		if (Util.isNull(args) || args['undo'] !== true) {
			this._history.push({
				_action:this._consts._addList,
				_target:toAdd
			});
			this._redoHistory.length = 0;
		}

		/**
		  �������� ������ �ο츦 �߰��� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onAddDatalist
		  @param {Array.<Object>} datalist - �߰��� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onAddDatalist", [toAdd, args], true);
		this.grid['event'].trigger("onDataChange", false, true);

		if (args === undefined || args['noRefresh'] !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  �־��� ������ �ο��� �ϳ��� �÷��� ���� �����մϴ�.

	  @function {} updateByKey
	  @param {Object} datarow - ������ ������ ������ �ο�
	  @param {string} key - ������ Ű
	  @param {?} value - ���ο� ��

	  @author ����ȣ
	  @since 1.2.3
	  @version 1.2.3
	  */
	prototype.updateByKey = function(datarow, key, value, args) {
		var change = {};
		change[key] = value;
		return this.update(datarow, change, args);
	};

	/**
	  �־��� ������ �ο��� ������ �����մϴ�.

	  @function {} update
	  @param {Object} datarow - ������ ������ ������ �ο�
	  @param {Object} change - ����� �÷��� Ű ���� ����� ���� �����ϴ�. ���� ���
	  �־��� ������ �ο��� name �̶�� �÷��� ���� "john" ���� �����ϰ� age �÷��� 15 �� ������
	  ��쿡 <code>{name:"john", age:15}</code> �� �� �Ķ���ͷ� �־��ݴϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.update = function(datarow, change, args) {
		if (Util.isNullOr(datarow, change)) {
			return false;
		}

		this.grid['event'].trigger("onBeforeDataChange", false, true);

		/**
		  �����Ͱ� ����Ǳ� ���� �߻��ϴ� �̺�Ʈ �Դϴ�.

		  @event {Event} onBeforeUpdateDatarow
		  @param {Object} datarow - ������ ����� ������ �ο�
		  @param {Object} change - �������� ���� ������ ���� ������Ʈ
		  @see update

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onBeforeUpdateDatarow", [datarow, change], true);

		var before = {},
			 i;
		for (i in change) {
			if (change.hasOwnProperty(i)) {
				if (datarow[i] === change[i]) {
					delete change[i];
				}
				else {
					before[i] = datarow[i];
					datarow[i] = change[i];
				}
			}
		}

		if (Util.isEmptyObj(before)) {
			return false;
		}

		var res;
		if ((res = this.parse(datarow, args)) instanceof Error) {
			this._rollback(datarow, before);
			return res;
		}

		if ((res = this.validate(datarow, args)) instanceof Error) {
			this._rollback(datarow, before);
			return res;
		}

		if ((res = this.updateUniqueMap(datarow, change, before)) instanceof Error) {
			this._rollback(datarow, before);
			return res;
		}

		if ((res = this.updateIdMap(datarow, change, before)) instanceof Error) {
			this._rollback(datarow, before);
			return res;
		}

		/**
		  �������� ���̵� ����� �Ŀ� �߻��ϴ� �̺�Ʈ �Դϴ�.

		  @event {Event} onIdChange
		  @param {Object} datarow - ������ ���̵� ����� ������ �ο�
		  @param {string} idBefore - �������� �ٲ�� �� ���̵�
		  @param {string} idAfter - �������� ���ο� ���̵�
		  @see update

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		if (res !== false) {
			this.grid['event'].trigger("onIdChange", [datarow, res, datarow[this.idKey]], true);
		}

		if (Util.isNull(args) || args['undo'] !== true) {
			this._history.push({
				_action:this._consts._update,
				_target:datarow,
				_before:before,
				_change:change
			});
			this._redoHistory.length = 0;
		}

		/**
		  �ϳ��� �����Ͱ� ����� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onUpdateDatarow
		  @param {Object} datarow - ������ ����� ������ �ο�
		  @param {Object} change - �������� ���� ������ ���� ������Ʈ
		  @param {Object} before - �������� ���� �� ������ ���� ������Ʈ
		  @see update

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onUpdateDatarow", [datarow, change, before, args], true);
		this.grid['event'].trigger("onDataChange", false, true);

		if (args === undefined || args['noRefresh'] !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  �������� ������ �ο��� ������ �����մϴ�. �Ķ���ʹ� ����� �������� �� ������Ʈ��
	  ������ ���� ������ �����ϴ�.<br>
	  <code>{datarow:datarow, change:{name:"john", age:15}}</code>

	  @function {} updateList
	  @param {Array.<Object>} list - ������ ����� �����Ϳ� ���� ������ ���� ���
	  @see {@link update}

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.updateList = function(list, args) {
		if (Util.isEmptyArray(list)) {
			return false;
		}

		this.grid['event'].trigger("onBeforeDataChange", false, true);

		/**
		  �����Ͱ� ����Ǳ� ���� �߻��ϴ� �̺�Ʈ �Դϴ�.

		  @event {Event} onBeforeUpdateDatalist
		  @param {Array.<Object>} list - ������ ����� �����Ϳ� ���� ������ ���� ���. �� ������Ʈ��
		  ������ ���� ������ �����ϴ�.<br>
		  <code>list[i] = {datarow:datarow, change:{name:"john", age:15}}</code>
		  @see updateList

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onBeforeUpdateDatalist", [list], true);

		var datalist = [],
			 befores = [],
			 changes = [],
			 datarow,
			 before,
			 change,
			 listlen = list.length,
			 i = 0,
			 key;

		for (; i < listlen; i++) {
			before = {};
			datarow = list[i].datarow;
			change = list[i].change;
			for (key in change) {
				if (change.hasOwnProperty(key)) {
					if (datarow[key] === change[key]) {
						delete change[key];
					}
					else {
						before[key] = datarow[key];
						datarow[key] = change[key];
					}
				}
			}

			if (Util.isNotEmptyObj(before)) {
				datalist.push(datarow);
				befores.push(before);
				changes.push(change);
			}
		}

		if (datalist.length === 0) {
			return false;
		}

		var res;
		if ((res = this.parseList(datalist, args)) instanceof Error) {
			this._rollbackList(datalist, befores);
			return res;
		}

		if ((res = this.validateList(datalist, args)) instanceof Error) {
			this._rollbackList(datalist, befores);
			return res;
		}

		if ((res = this.updateListUniqueMap(datalist, changes, befores)) instanceof Error) {
			this._rollbackList(datalist, befores);
			return res;
		}

		if ((res = this.updateListIdMap(datalist, changes, befores)) instanceof Error) {
			this._rollbackList(datalist, befores);
			return res;
		}

		/**
		  ������ ����� ���̵� ����� �Ŀ� �߻��ϴ� �̺�Ʈ �Դϴ�.

		  @event {Event} onIdListChange
		  @param {Array.<Object>} datalist - ������ ���̵� ����� ������ �ο� ���
		  @param {Array.<string>} idBefores - �������� �ٲ�� �� ���̵� ���
		  @param {string} idKey - �������� ���̵� ����Ű�� Ű
		  @see update

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		if (res !== false) {
			this.grid['event'].trigger("onIdListChange", [res.list, res.befores, this.idKey], true);
		}

		if (Util.isNull(args) || args['undo'] !== true) {
			this._history.push({
				_action:this._consts._updateList,
				_target:datalist,
				_before:befores,
				_change:changes
			});
			this._redoHistory.length = 0;
		}

		/**
		  �������� �����Ͱ� ����� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onUpdateDatalist
		  @param {Array.<Object>} datalist - ������ ����� ������ �ο� ���
		  @param {Array.<Object>} changes - �������� ���� ������ ���� ������Ʈ ���
		  @param {Array.<Object>} befores - �������� ���� �� ������ ���� ������Ʈ ���
		  @param {Object} args - ���� onUpdateDatalist �� �ɼ��� ���� ������Ʈ

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.3.0
		  */
		/*
		 * 1.3.0: added: changes & befores & args
		 */
		this.grid['event'].trigger("onUpdateDatalist", [datalist, changes, befores, args], true);	
		this.grid['event'].trigger("onDataChange", false, true);

		if (args === undefined || args['noRefresh'] !== true) {
			this.refresh(args);
		}

		return true;
	};

	prototype._rollback = function(datarow, before) {
		var i;
		for (i in before) {
			if (before.hasOwnProperty(i)) {
				datarow[i] = before[i];
			}
		}
	};

	prototype._rollbackList = function(datalist, befores) {
		var len = datalist.length,
			 i = 0,
			 datarow,
			 before,
			 j;
		for (; i < len; i++) {
			datarow = datalist[i];
			before = befores[i];
			for (j in before) {
				if (before.hasOwnProperty(j)) {
					datarow[j] = before[j];
				}
			}
		}
	};

	/**
	  �ϳ��� ������ �ο츦 ������ ��� ������ ��̿��� �����մϴ�. ������ ������
	  ��̿� �������� �ʴ� ��쿡�� �ƹ��͵� ���� �ʽ��ϴ�.

	  @function {} remove
	  @param {Object} datarow - ������ ������ �ο�

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.remove = function(datarow, args) {
		if (Util.isNull(datarow)) {
			return false;
		}

		var mapped = this.map(datarow);
		if (Util.isNull(mapped)) {
			return false;
		}

		this.grid['event'].trigger("onBeforeDataChange", false, true);

		this.removeFromIdMap(mapped);
		this.removeFromUniqueMap(mapped);
		this.all.remove(mapped);
		this.removeId(mapped);

		if (Util.isNull(args) || args['undo'] !== true) {
			this._history.push({
				_action:this._consts._remove,
				_target:mapped
			});
			this._redoHistory.length = 0;
		}

		/**
		  �ϳ��� �����Ͱ� ���ŵ� �� �߻��Ǵ� �̺�Ʈ�Դϴ�.

		  @event {Event} onRemoveDatarow
		  @param {Object} datarow - ���ŵ� ������ �ο�

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onRemoveDatarow", [mapped, args], true);
		this.grid['event'].trigger("onDataChange", false, true);

		if (args === undefined || args['noRefresh'] !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  �������� ������ �ο츦 ������ ��� ������ ��̿��� �����մϴ�. ������ ������
	  ��̿� ���� �����͵��� �����ϰ� �ִ� ������ �鸸 �����մϴ�.

	  @function {} removeList
	  @param {Array.<Object>} datalist - ������ ������ ���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.removeList = function(datalist, args) {
		if (Util.isEmptyArray(datalist)) {
			return false;
		}

		var map = this.mapList(datalist),
			 mapped = map.mapped;

		if (mapped.length === 0) {
			return false;
		}

		this.grid['event'].trigger("onBeforeDataChange", false, true);

		this.removeListFromIdMap(mapped);
		this.removeListFromUniqueMap(mapped);
		this.all.removeList(mapped);
		this.cleanList(mapped);

		if (Util.isNull(args) || args['undo'] !== true) {
			this._history.push({
				_action:this._consts._removeList,
				_target:mapped
			});
			this._redoHistory.length = 0;
		}

		/**
		  �������� �����Ͱ� ���ŵ� �� �߻��Ǵ� �̺�Ʈ�Դϴ�.

		  @event {Event} onRemoveDatalist
		  @param {Object} datarow - ���ŵ� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onRemoveDatalist", [mapped, args], true);
		this.grid['event'].trigger("onDataChange", false, true);

		if (args === undefined || args['noRefresh'] !== true) {
			this.refresh(args);
		}

		return true;
	};

	prototype._keydownCanvas = function(e) {
		if (e.ctrlKey) {
			switch (e.which) {
				case "Z".charCodeAt(0):
					this.undo();
					break;
				case "Y".charCodeAt(0):
					this.redo();
					break;
			}
		}
	};

	/**
	  ������ ������ ���� ������ �� �ܰ� ����մϴ�.
	  �׸��� �䰡 Ȱ��ȭ �Ǿ��� �� Ctrl+Z �� �Է��ϸ� ����˴ϴ�.

	  @function {} undo

	  @author ����ȣ
	  @since 1.1.4
	  @version 1.1.4
	  */
	prototype.undo = function() {
		if (this._history.length === 0) {
			return false;
		}

		var hist = this._history.pop();
		this._redoHistory.push(hist);

		var tar = hist._target,
			 bef = hist._before;
		switch (hist._action) {
			case this._consts._add:
				return this.remove(tar, {'undo':true});
			case this._consts._addList:
				return this.removeList(tar, {'undo':true});		
			case this._consts._update:
				return this.update(tar, bef, {'undo':true});
			case this._consts._updateList:
				var list = [],
					 i = 0,
					 len = tar.length;
				for (; i < len; i++) {
					list.push({'datarow':tar[i], 'change':bef[i]});
				}
				return this.updateList(list, {'undo':true});		
			case this._consts._remove:
				return this.add(tar, {'undo':true});
			case this._consts._removeList:
				return this.addList(tar, {'undo':true});
		}
	};

	/**
	  ���������� ��ҵ� ������ ���� ������ �ٽ� �����մϴ�.
	  �׸��� �䰡 Ȱ��ȭ �Ǿ��� �� Ctrl+Y �� �Է��ϸ� ����˴ϴ�.

	  @function {} redo

	  @author ����ȣ
	  @since 1.1.4
	  @version 1.1.4
	  */
	prototype.redo = function() {
		if (this._redoHistory.length === 0) {
			return false;
		}

		var hist = this._redoHistory.pop();
		this._history.push(hist);

		var tar = hist._target;
		var cha = hist._change;
		switch (hist._action) {
			case this._consts._add:
				return this.add(tar, {'undo':true});
			case this._consts._addList:
				return this.addList(tar, {'undo':true});		
			case this._consts._update:
				return this.update(tar, cha, {'undo':true});
			case this._consts._updateList:
				var list = [],
					 i = 0,
					 len = tar.length;
				for (; i < len; i++) {
					list.push({'datarow':tar[i], 'change':cha[i]});
				}
				return this.updateList(list, {'undo':true});
			case this._consts._remove:
				return this.remove(tar, {'undo':true});
			case this._consts._removeList:
				return this.removeList(tar, {'undo':true});
		}
	};


	/**
	  �־��� �ΰ��� ������ �ο찡 ���� ���� �����͸� ����Ű������ �����մϴ�.

	  @function {boolean} equals
	  @param {Object} datarow1 - ������ �ο� 1
	  @param {Object} datarow2 - ������ �ο� 2
	  @returns {boolean} ���� �����͸� ����Ű�� true, �ƴ� ��� false

	  @author ����ȣ
	  @since 1.2.3
	  @version 1.2.3
	  */
	prototype.equals = function(a, b) {
		if (Util.isNullOr(a, b)) {
			return false;
		}

		if (a === b) {
			return true;
		}

		if (this._idMode === this._consts._composite) {
			this.makeCompositeKey(a);
			this.makeCompositeKey(b);
		}

		var idKey = this.idKey;
		if (Util.isNull(a[idKey]) || Util.isNull(b[idKey])) {
			return false;
		}

		return a[idKey] === b[idKey];
	};


	/**
	  ���� ȭ�� ��� ������ ���� ��⿡ ���� �߰��� ������ �ο찡 �ƴ� ���ǵ� ������ �ο�鸸 ���͸� �� �� �����մϴ�.

	  @function {Array.<Object>} getReal
	  @returns {Array.<Object>} ��⿡ ���� �߰��� ������ �ο찡 �ƴ� ���ǵ� ������ ���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getReal = function() {
		var notReal = this._consts._notReal;
		return this.all.filter(function(datarow) {
			return datarow.hasOwnProperty(notReal) === false;
		});
	};

	/**
	  �־��� ������ ��̿��� ���ǵ� ������ �ο�鸸 ���͸� �� �� �����մϴ�.

	  @function {Array.<Object>} filterReal
	  @param {Array.<Object>=} datalist - ���͸� �� ������ ���
	  @returns {Array.<Object>} ��⿡ ���� �߰��� ������ �ο찡 �ƴ� ���ǵ� ������ ���

	  @author ����ȣ
	  @since 1.1.4
	  @version 1.1.4
	  */
	prototype.filterReal = function(list) {
		var notReal = this._consts._notReal;
		return list.filter(function(datarow) {
			return datarow.hasOwnProperty(notReal) === false;
		});
	};


	/**
	  �־��� �ο� �����Ͱ� ��⿡ ���� �߰��� ��� false, �ƴϸ� true �� �����մϴ�.

	  @function {boolean} isReal
	  @param {Object=} datarow - ���ǵ� ���������� üũ�� �ο� ������
	  @returns {boolean} ��⿡ ���� �߰��� ������ �ο��� ��� false, �ƴϸ� true

	  @author ����ȣ
	  @since 1.1.0
	  @version 1.1.0
	  */
	prototype.isReal = function(datarow) {
		return Util.isNotNull(datarow) && datarow.hasOwnProperty(this._consts._notReal) === false;
	};


	/**
	  �־��� ������ ��̿��� ���鿡 ���� �߰��� ������ �����͵��� �����մϴ�.
	  �־��� ������ ��̰� ���� ��� ������ ��� �����͸� ����մϴ�.

	  @function {} dropNonReal
	  @param {Array.<Object>=} datalist - ȭ�� ��� ������ ���� ��⿡ ���� �߰��� ������ �ο���� ������ ������ ���

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.dropNonReal = function(datalist) {
		if (Util.isEmptyArray(datalist)) {
			return;
		}

		var notReal = this._consts._notReal,
			 len = datalist.length,
			 i = len - 1;

		for (; i >= 0; i--) {
			if (datalist[i].hasOwnProperty(notReal)) {
				delete datalist[i][notReal];
				datalist.removeAt(i);
			}
		}
	};

	prototype.removeIdCol = function(datalist) {
		if (this._idMode === this._consts._given || Util.isEmptyArray(datalist)) {
			return;
		}

		var idKey = this.idKey,
			 i = 0,
			 len = datalist.length;

		for (; i < len; i++) {
			if (datalist[i].hasOwnProperty(idKey)) {
				delete datalist[i][idKey];
			}
		}
	};

	prototype.removeId = function(datarow) {
		if (Util.isNotNull(datarow) && this._idMode !== this._consts._given && datarow.hasOwnProperty(this.idKey)) {
			delete datarow[this.idKey];
		}
	};

	prototype.cleanList = function(datalist) {
		if (!Util.isEmptyArray(datalist)) {
			this.removeIdCol(datalist);
			this.dropNonReal(datalist);
		}
	};

	prototype.purify = function(datalist) {
		if (datalist !== undefined) {
			datalist = this.all;
		}
		if (Util.isEmptyArray(datalist)) {
			return [];
		}
		var list = [],
			 len = datalist.length,
			 i = 0,
			 j,
			 data,
			 clone,
			 notReal = this._consts._notReal;

		for (; i < len; i++) {
			if ((data = datalist[i]).hasOwnProperty(notReal) === false) {
				list.push(clone = {});
				for (j in data) {
					if (data.hasOwnProperty(j)) {
						if (data.hasOwnProperty(j) && j.substring(0, 3) !== "J@I") {
							clone[j] = data[j];
						}
					}
				}
			}
		}

		return list;
	};

	/**
	  ���� ������Ʈ�� ���մϴ�.

	  @function {} setSorter
	  @param {Object=} sorter - ���� ������Ʈ�� ���մϴ�. undefined �Ǵ� null �� �������
	  ���� ������ƮƲ �����մϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.setSorter = function(sorter) {
		/**
		  ���� ������Ʈ�� ������ �� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onChangeSorter
		  @param {Object} old - ������ sorter
		  @param {Object} new - ���ο� sorter

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onChangeSorter", [this._sorter, sorter], true);

		this._sorter = sorter;
	};

	prototype._sort = function(sorter) {
		if (Util.isNull(sorter)) {
			sorter = this._sorter;
		}
		else {
			this.setSorter(sorter);
		}

		if (Util.isNull(sorter)) {
			return;
		}

		var datalist = this.all;

		/**
		  �����͸� �����ϱ� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onBeforeSort
		  @param {Array.<Object>} datalist - �����ϱ� ���� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onBeforeSort", [datalist], true);

		if (Util.isNotNull(sorter.comparator)) {
			datalist.sort(sorter.comparator);
			if (sorter.desc) {
				datalist.reverse();
			}
		}
		else if (Util.isNotNull(sorter.lexi)) {
			this.constructor._lexi(datalist, sorter.lexi, sorter.desc);
		}


		/**
		  �����͸� ������ �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onAfterSort
		  @param {Array.<Object>} datalist - ������ ���� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onAfterSort", [datalist], true);
	};

	/**
	  ������ ���͸� �߰��ϰ� ���͸� �����մϴ�. ���ʹ� �Լ��ν� �ο� �����͸� �Ķ���ͷ� �ް�
	  true �� ������ ��� �� �����ʹ� �������� ������ ��̿� ���Եǰ� false �� ������ ���
	  �� �����ʹ� ���͸� �Ǿ� �������� �ʽ��ϴ�.

	  @function {} addFilter
	  @param {Function=} filter - �߰��� ������ ����

	  @author ����ȣ
	  @since 1.1.5
	  @version 1.1.5
	  */
	prototype.addFilter = function(filter) {
		this._filters.push(filter);
		this.refresh();
	};

	/**
	  ��ϵ� ������ ���͸� �����մϴ�.

	  @function {} removeFilter
	  @param {Function=} filter - ������ ������ ����

	  @author ����ȣ
	  @since 1.1.5
	  @version 1.1.5
	  */
	prototype.removeFilter = function(filter) {
		var len = this._filters.length;
		this._filters.remove(filter);
		if (len !== this._filters.length) {
			this.refresh();
		}
	};

	prototype._filter = function() {
		var datalist = this.datalist,
			 failed = this.failed,
			 i = 0,
			 filters = this._filters,
			 flen = filters.length,
			 filter,
			 j;

		/**
		  ������ ���͸��� �����ϱ� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onBeforeFilter
		  @param {Array.<Object>} datalist - ���� �׸��� ȭ�鿡 �������� ������ ���
		  @param {Array.<Object>} failed - ���� ���͸��Ǿ� �������� �ʴ� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onBeforeFilter", [datalist, failed], true);

		datalist.length = 0;
		datalist.pushList(this.all);
		failed.length = 0;

		for (; i < flen; i++) {
			filter = this._filters[i];
			for (j = datalist.length - 1; j >= 0; j--) {
				if (!filter(datalist[j])) {
					failed.push(datalist[j]);
					datalist.removeAt(j);
				}
			}
		}

		/**
		  ������ ���͸��� �ϱ� ���ؼ� �߻��Ǵ� �̺�Ʈ �Դϴ�. �� ������ �� �̺�Ʈ��
		  �̿��Ͽ� ���͸��� �մϴ�.

		  @event {Event} onFilter
		  @param {Array.<Object>} datalist - ȭ�鿡 ������ ������ ���
		  @param {Array.<Object>} failed - ���͸��Ǿ� �������� ���� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onFilter", [datalist, failed], true);

		/**
		  ������ ���͸� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.

		  @event {Event} onAfterFilter
		  @param {Array.<Object>} datalist - ȭ�鿡 ������ ������ ���
		  @param {Array.<Object>} failed - ���͸��Ǿ� �������� ���� ������ ���

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onAfterFilter", [datalist, failed], true);
	};

	prototype._finish = function(args) {
		this._reidx();

		/**
		  ��� {@link jx.data.DataManager DataManager} �� {@link refresh} ������ �������� �˸���
		  �̺�Ʈ�Դϴ�.

		  @event {Event} onAfterRefresh
		  @see refresh

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onAfterRefresh", [args], true);
	};


	/**
	  �����͸� �������ϰ� �ٽ� ���͸��մϴ�.

	  @function {} refresh
	  @param {Object=} sorter - �����͸� ������ �� ����� sorter

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.refresh = function(args) {
		/**
		  {@link jx.data.DataManager DataManager} �� {@link refresh} ������ �������� �˸���
		  ��� �Դϴ�.

		  @event {Event} onBeforeRefresh
		  @see refresh

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid['event'].trigger("onBeforeRefresh", false, true);

		if (args === undefined) {
			this._sort();
		}
		else if (args['noSort'] !== true) {
			this._sort(args['sorter']);
		}

		if (args === undefined || args['noFilter'] !== true) {
			this._filter();
		}

		this._finish(args);
	};

	prototype.exportRowToArray = function(index, keys) {'use strict';
		if (!(index in this.datalist)) {
			return null;
		}

		if (!keys) {
			keys = this.grid['colDefMgr'].getKeys();
		}

		var datarow = this.datalist[index],
			array = [],
			key,
			i = 0,
			l = keys.length;

		for (; i < l; i++) {
			key = keys[i];
			array.push((key in datarow) ? datarow[key] : null);
		}

		return array;
	}

	prototype.exportToArray = function(keys, from, to) {'use strict';
		if (!keys) {
			keys = this.grid['colDefMgr'].getKeys();
		}

		var datalist = this.datalist.slice(from, to),
			array,
			arr = [],
			datarow,
			key,
			j = 0,
			jl = datalist.length,
			i,
			l = keys.length;
		for (; j < jl; j++) {
			datarow = datalist[j];
			for (i = 0, array = []; i < l; i++) {
				key = keys[i];
				array.push((key in datarow) ? datarow[key] : null);
			}
			arr.push(array);
		}
		return arr;
	}

	DataManager._lexi = function(datalist, key, desc) {
		var oldToString = Object.prototype.toString;
		Object.prototype.toString = Util.isFunction(key)? key : function() { return this[key]; };
		datalist.sort();
		Object.prototype.toString = oldToString;
		if (desc) {
			datalist.reverse();
		}
	};
}());
