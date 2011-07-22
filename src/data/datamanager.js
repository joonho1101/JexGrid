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

 goog.require('JGM.core.BaseModule');

 goog.provide('JGM.data.DataManager');

 goog.exportSymbol('JGM.data.DataManager', DataManager);

	/**
	  DataManager 모듈. 컬럼 헤더들을 담당하는 모듈입니다.
	  @module DataManager

	  @requires JGM
	  @requires JGM.Grid
	  @requires JGM.DataManager
	  @requires JGM.EventManager
	  */

	/**
	  DataManager 클래스. 컬럼 값에 따른 데이터 로우 정렬과 컬럼 좌우 위치 변경 등 컬럼
	  관련 기능들을 지원합니다.

	  @class {DataManager} JGM.DataManager

	  @author 조준호
	  @since 1.0.0
	  @version 1.1.5
	  */

	/**
	  DataManager 컨스트럭터 입니다.

	  @constructor {DataManager} DataManager
	  @param {Object} args - DataManager 모듈 파라미터 오브젝트
	  @... {Array.<Object>} args.datalist - 데이터 어레이
	  @... {JGM.Grid} args.grid - DataManager 를 포함하는 {@link JGM.Grid Grid} 인스턴스
	  @... {Object} args.options - DataManager 옵션 오브젝트
	  @returns {DataManager} DataManager 모듈 인스턴스를 리턴합니다.

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */

	function DataManager(args) {
		/**
		  {@link JGM} 이 할당해주는 DataManager 모듈 고유 아이디입니다. 읽기 전용.

		  @var {string} mid

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.mid = args.mid;

		/**
		  DataManager 를 포함하는 {@link JGM.Grid Grid} 인스턴스.

		  @var {JGM.Grid} grid

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid = args.grid;

		/**
		  그리드 데이터를 관리하는 {@link JGM.DataManager DataManager} 인스턴스 입니다.

		  @var {JGM.DataManager} JGM.Grid.dataMgr

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.dataMgr = this;

		/**
		  필터링 되지 않은 모든 데이터 어레이.

		  @var {Array.<Object>} all

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.all = [];

		/**
		  그리드 화면에 보여질 필터링 된 데이터 어레이.

		  @var {Array.<Object>} datalist

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.datalist = [];

		/**
		  필터링 되어 화면에 보이지 않는 데이터 어레이.

		  @var {Array.<Object>} failed

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.failed = [];

		/**
		  DataManager 모듈의 기본 옵션 값들을 정의합니다.

		  @type {Object} options
		  @private

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		var options = {
			/**
			  각 로우 데이터들이 갖는 고유 데이터 아이디를 가리키는 key 입니다.<br>기본값:<code>undefined</code>

			  @type {string=} JGM.DataManager.options.idKey
			  @private

			  @author 조준호
			  @since 1.0.0
			  @version 1.0.0
			  */
			__idKey_a__: undefined,

			/**
			  데이터 로우의 primary key 가 하나 이상일 경우에 이 어레이에 키 값들을 넣어줍니다.<br>기본값:<code>[]</code>

			  @type {Array.<string>=} JGM.DataManager.options.idColKeys
			  @private

			  @author 조준호
			  @since 1.0.0
			  @version 1.0.0
			  */
			__idColKeys_c__: [],

			uniqueKeys: []
		};

		this._options = JGM.__extend_e__(options, args.options, {
			idKey:"__idKey_a__",
			idColKeys:"__idColKeys_c__"
		});

		this.__consts_n__ = {
			__auto_a__: 0,
			__given_b__: 1,
			__composite_c__: 2,
			__notReal_d__: this.mid + "@NR" + Util.random(10000),
			__add_e__: 0,
			__addList_f__: 1,
			__update_g__: 2,
			__updateList_h__: 3,
			__remove_i__: 4,
			__removeList_j__: 5,
			unknown:0,
			number:1,
			string:2,
			"boolean":3,
			date:4,
			"enum":5
		};

		if (Util.isNotNull(this._options.__idKey_a__)) {
			this.__idMode_m__ = this.__consts_n__.__given_b__;

			/**
			  데이터 로우의 유니크 아이디를 가리키는 key 입니다.

			  @type {string} idKey
			  @private

			  @author 조준호
			  @since 1.0.0
			  @version 1.0.0
			  */
			this.idKey = this._options.__idKey_a__;
		}
		else if (this._options.__idColKeys_c__.length !== 0) {
			this.__idMode_m__ = this.__consts_n__.__composite_c__;
			this.idKey = "J@I" + this.mid + "@" + Util.random(10000);
		}
		else {
			this.__idMode_m__ = this.__consts_n__.__auto_a__;
			this.idKey = "J@I" + this.mid + "@" + Util.random(10000);
		}

		this.__increment_l__ = 0;

		this.keyToType = {};

		this.__idToIdx_b__ = {};
		this.__idToData_a__ = {};

		this.__sorter_h__;
		this.__filters_r__ = [];

		this.__history_e__ = [];
		this.__redoHistory_q__ = [];

		this.uniqueMap = {};

		this.__init(args);
	}

	DataManager.getInstance = function(args) {
		return new DataManager(args);
	};

	var prototype = DataManager.prototype;

	prototype.__init = function(args) {
		var i = 0,
			 ukeys = this._options.uniqueKeys,
			 ukey,
			 umap = this.uniqueMap,
			 len = ukeys.length,
			 tmap = this.keyToType,
			 colDefs = this.grid.colDefMgr.getAll(),
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
			key = colDef.key;
			if (colDef.hasOwnProperty("unique") && colDef.unique === true && !umap.hasOwnProperty(key)) {
				umap[key] = {};
			}
			tmap[key] = this.mapDatatype(colDef.type);
		}

		Util.ifNull(args.datalist, []);

		this.bindEvents();

		this.set(args.datalist);
	};

	prototype.mapDatatype = function(type) {
		if (typeof type === "string") {
			type = type.toLowerCase();
			switch (type) {
				case "number":
					return this.__consts_n__.number;
				case "string":
					return this.__consts_n__.string;
				case "boolean":
					return this.__consts_n__["boolean"];
				case "date":
					return this.__consts_n__.date;
				case "enum":
					return this.__consts_n__["enum"];
				default:	
					return this.__consts_n__.unknown;
			}
		}
		return this.__consts_n__.unknown;
	};

	prototype.bindEvents = function() {
		this.grid.event.bind({
			onDestroy: this.__destroy_aA__,
			keydownCanvas: this.__keydownCanvas_ba__
		}, this);
	};

	prototype.__destroy_aA__ = function() {
		this.cleanList(this.all);

		JGM._destroy(this, {
			name: "DataManager",
			path: "dataMgr",
			property: "all __idMode_m__ __increment_l__ idKey __sorter_h__",
			map: "__consts_n__ __idToIdx_b__ __idToData_a__ _options",
			array: "datalist failed __history_e__ __redoHistory_q__ __filters_r__"
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
			return this.grid.error("KEY_UNDEFINED", key);
		}
		var val;
		if (Util.isEmptyString(val = data[key])) {
			return this.grid.error("BAD_NULL", key);
		}
		if (map.hasOwnProperty(val)) {
			if (map[val] === data) {
				return false;
			}
			return this.grid.error("DUP_ENTRY", val, key);
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
				return this.grid.error("KEY_UNDEFINED", key);
			}
			if (Util.isEmptyString(val = data[key])) {
				this.removeUniqueIndices(map, key, success);
				return this.grid.error("BAD_NULL", key);
			}
			if (map.hasOwnProperty(val)) {
				if (map[val] === data) {
					continue;
				}
				this.removeUniqueIndices(map, key, success);
				return this.grid.error("DUP_ENTRY", val, key);
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
			return this.grid.error("KEY_UNDEFINED", key);
		}
		if (map.hasOwnProperty(oldKey = before[key]) === false) {
			return this.grid.error("KEY_NOT_FOUND", oldKey, key);
		}
		if (Util.isEmptyString(newKey = change[key])) {
			return this.grid.error("BAD_NULL", key);
		}
		if (map.hasOwnProperty(newKey)) {
			if (map[newKey] === data) {
				return false;
			}
			return this.grid.error("DUP_ENTRY", newKey, key);
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
				return this.grid.error("LENGTH_NOT_EQUAL");
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
				return this.grid.error("KEY_UNDEFINED", key);
			}
			if (map.hasOwnProperty(oldKey = before[key]) === false) {
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid.error("KEY_NOT_FOUND", oldKey, key);
			}
			if (Util.isEmptyString(newKey = change[key])) {
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid.error("BAD_NULL", key);
			}
			if (map.hasOwnProperty(newKey)) {
				if (map[newKey] === data) {
					continue;
				}
				this.updateUniqueIndices(map, key, slist, sbefores, schanges);
				return this.grid.error("DUP_ENTRY", newKey, key);
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
			return this.grid.error("LENGTH_NOT_EQUAL");
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
		switch (this.__idMode_m__) {
			case this.__consts_n__.__auto_a__:
				if (datarow.hasOwnProperty(idKey) === false) {
					datarow[idKey] = this.__increment_l__++;
				}
			case this.__consts_n__.__given_b__:
			case this.__consts_n__.__composite_c__:
				return this.addUniqueIndex(this.__idToData_a__, idKey, datarow);
		}
		return false;
	};

	//tested
	prototype.addListToIdMap = function(datalist) {
		if (Util.isEmptyArray(datalist)) {
			return false; 
		}

		var idKey = this.idKey;
		switch (this.__idMode_m__) {
			case this.__consts_n__.__auto_a__:
				var i = 0,
					 datarow,
					 len = datalist.length;
				for (; i < len; i++) {
					if ((datarow = datalist[i]).hasOwnProperty(idKey) === false) {
						datarow[idKey] = this.__increment_l__++;
					}
				}
			case this.__consts_n__.__given_b__:
			case this.__consts_n__.__composite_c__:
				return this.addUniqueIndices(this.__idToData_a__, idKey, datalist);
		}
		return false;
	};

	//tested
	prototype.updateIdMap = function(datarow, change, before) {
		if (Util.isNullOr(datarow, before) || Util.isEmptyObj(change)) {
			return false;
		}

		var idKey = this.idKey;
		switch (this.__idMode_m__) {
			case this.__consts_n__.__auto_a__:
				if (change.hasOwnProperty(idKey)) {
					return this.grid.error("NOT_MODIFIABLE", idKey);
				}
			case this.__consts_n__.__given_b__:
				return this.updateUniqueIndex(this.__idToData_a__, idKey, datarow, change, before);
			case this.__consts_n__.__composite_c__:
				if (change.hasOwnProperty(idKey)) {
					return this.grid.error("NOT_MODIFIABLE", idKey);
				}
				var idKeys = this._options.__idColKeys_c__,
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
									return this.grid.error("BAD_NULL", curIdKey);
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
						res = this.updateUniqueIndex(this.__idToData_a__, idKey, datarow, idChange, idBefore);
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

		switch (this.__idMode_m__) {
			case this.__consts_n__.__auto_a__:
				for (; i < len; i++) {
					if (changes[i].hasOwnProperty(idKey)) {
						return this.grid.error("NOT_MODIFIABLE", idKey);
					}
				}
			case this.__consts_n__.__given_b__:
				return this.updateUniqueIndices(this.__idToData_a__, idKey, datalist, changes, befores);
			case this.__consts_n__.__composite_c__:
				var idMap = this.__idToData_a__,
					 datarow,
					 change,
					 idKeys = this._options.__idColKeys_c__,
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
						return this.grid.error("NOT_MODIFIABLE", idKey);
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
										return this.grid.error("BAD_NULL", curIdKey);
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
			 idMap = this.__idToData_a__,
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
			 idMap = this.__idToData_a__,
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
		var colDefs = this.grid.colDefMgr.getAll(),
			 clen = colDefs.length,
			 key,
			 isNew = args !== undefined && args.isNew,
			 colDef,
			 i = 0;

		if (isNew) {
			for (; i < clen; i++) {
				colDef = colDefs[i];
				key = colDef.key;
				// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
				if (colDef.nullOnCreate && Util.isNull(datarow[key])) {
					datarow[key] = "J@H" + this.__increment_l__++;
				}
			}
		}
	};

	prototype.fillTempList = function(datalist, args) {
		if (Util.isEmptyArray(datalist)) {
			return;
		}
		var colDefs = this.grid.colDefMgr.getAll(),
			 clen = colDefs.length,
			 len = datalist.length,
			 key,
			 isNew = args !== undefined && args.isNew,
			 colDef,
			 i = 0,
			 j;

		if (isNew) {
			for (; i < clen; i++) {
				colDef = colDefs[i];
				key = colDef.key;
				// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
				if (colDef.nullOnCreate) {
					for (j = 0; len; j++) {
						datalist[j][key] = "J@H" + this.__increment_l__++;
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
	  각각의 로우 데이터에서 주어진 키들의 값들만을 복사하여 새로운 오브젝트에 담고
	  그 오브젝트들을 담은 어레이를 리턴합니다.
	  예를 들면 executeSelect("id, key") 를 실행할 경우 로우 데이터에서 id 와 key 컬럼들의
	  값들만 추출해서 리턴합니다.

	  @function {number} executeSelect
	  @param {string} selectStatement - 빈칸 또는 , 에 의해 띄여진 키 들의 스트링
	  @returns {Array.<Object>} 주어진 키들을 가진 오브젝트들의 어레이

	  @author 조준호
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
		var colDefs = this.grid.colDefMgr.getAll(),
			 clen = colDefs.length,
			 parser,
			 key,
			 isNew = args !== undefined && args.isNew,
			 colDef,
			 i = 0;
		for (; i < clen; i++) {
			colDef = colDefs[i];
			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef.nullOnCreate) {
				continue;
			}

			if (Util.isFunction(parser = colDef.parser)) {
				key = colDef.key;
				if (datarow.hasOwnProperty(key)) {
					try {
						datarow[key] = parser(datarow[key], datarow);
					}
					catch (e) {
						if (Util.isNull(datarow)) {
							return this.grid.error("PARSE_ERROR", datarow, key);
						}
						else {
							return this.grid.error("PARSE_ERROR", datarow[key], key);
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
		var colDefs = this.grid.colDefMgr.getAll(),
			 clen = colDefs.length,
			 len = list.length,
			 parser,
			 key,
			 i = 0,
			 j,
			 isNew = args !== undefined && args.isNew,
			 colDef,
			 datarow;
		for (; i < clen; i++) {
			colDef = colDefs[i];
			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef.nullOnCreate) {
				continue;
			}

			if (Util.isFunction(parser = colDef.parser)) {
				key = colDef.key;
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
						return this.grid.error("PARSE_ERROR", datarow, key);
					}
					else {
						return this.grid.error("PARSE_ERROR", datarow[key], key);
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
		var colDefs = this.grid.colDefMgr.getAll(),
			 clen = colDefs.length,
			 validator,
			 colDef,
			 key,
			 isnull,
			 emptystr,
			 val,
			 stringval,
			 test,
			 isNew = args !== undefined && args.isNew,
			 i = 0;
		for (; i < clen; i++) {
			colDef = colDefs[i];
			key = colDef.key;
			val = undefined;
			isnull = false;
			emptystr = false;

			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef.nullOnCreate) {
				continue;
			}

			// validate not null
			if (colDef.notNull === true) {
				if (datarow.hasOwnProperty(key) === false || Util.isEmptyString(val = datarow[key])) {
					return this.grid.error("BAD_NULL", key);
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
				if (Util.isNotNull(test = colDef.max)) {
					if (emptystr === false && val > test) {
						return this.grid.error("BIGGER_THAN", val, key, test);
					}
				}
				// test if value does not violate min limit
				if (Util.isNotNull(test = colDef.min)) {
					if (emptystr === false && val < test) {
						return this.grid.error("SMALLER_THAN", val, key, test);
					}
				}
				// test if value does not violate length 
				if (Util.isNotNull(test = colDef.length)) {
					if (emptystr === true || stringval.length !== test) {
						return this.grid.error("WRONG_LENGTH", stringval, test, key);
					}
				}
				else {
					// test if value does not violate max length 
					if (Util.isNotNull(test = colDef.maxlength)) {
						if (emptystr === false && stringval.length > test) {
							return this.grid.error("DATA_TOO_LONG", stringval, key, test);
						}
					}
					// test if value does not violate min length 
					if (Util.isNotNull(test = colDef.minlength)) {
						if (emptystr === true || stringval.length < test) {
							return this.grid.error("DATA_TOO_SHORT", stringval, key, test);
						}
					}
				}
			}
			// test if value passes validator 
			if (Util.isFunction(validator = colDef.validator)) {
				try {
					if (validator(val, datarow, stringval, isnull, emptystr) !== true) {
						return this.grid.error("WRONG_VALUE", stringval, key);
					}
				}
				catch (e) {
					return this.grid.error("WRONG_VALUE", stringval, key);
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
		var colDefs = this.grid.colDefMgr.getAll(),
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
			 isNew = args !== undefined && args.isNew,
			 vals = [], // has values for all rows for current column
			 stringvals = []; // has string values for all rows for current column
		for (; i < clen; i++) {
			// initialize column validation test
			colDef = colDefs[i];
			key = colDef.key;
			nulls = {};
			emptystrs = {};
			vals.length = 0;
			stringvals.length = 0;

			// if data is newly created and column is null on create because its content will be given from server through ajax then skip validation
			if (isNew && colDef.nullOnCreate) {
				continue;
			}

			// validate not null
			if (colDef.notNull === true) {
				for (j = 0; j < len; j++) {
					if (list[j].hasOwnProperty(key) === false || Util.isEmptyString(val = list[j][key])) {
						return this.grid.error("BAD_NULL", key);
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
			if (Util.isNotNull(test = colDef.max)) {
				for (j = 0; j < len; j++) {
					if (emptystrs.hasOwnProperty(j) === false && vals[j] > test) {
						return this.grid.error("BIGGER_THAN", vals[j], key, test);
					}
				}
			}
			// test if value does not violate min limit
			if (Util.isNotNull(test = colDef.min)) {
				for (j = 0; j < len; j++) {
					if (emptystrs.hasOwnProperty(j) === false && vals[j] < test) {
						return this.grid.error("SMALLER_THAN", vals[j], key, test);
					}
				}
			}
			// test if value does not violate length 
			if (Util.isNotNull(test = colDef.length)) {
				for (j = 0; j < len; j++) {
					if (nulls.hasOwnProperty(j) === false && (emptystrs.hasOwnProperty(j) || stringvals[j].length !== test)) {
						return this.grid.error("WRONG_LENGTH", stringvals[j], test, key);
					}
				}
			}
			else {
				// test if value does not violate max length 
				if (Util.isNotNull(test = colDef.maxlength)) {
					for (j = 0; j < len; j++) {
						if (emptystrs.hasOwnProperty(j) === false && stringvals[j].length > test) {
							return this.grid.error("DATA_TOO_LONG", stringvals[j], key, test);
						}
					}
				}
				// test if value does not violate min length 
				if (Util.isNotNull(test = colDef.minlength)) {
					for (j = 0; j < len; j++) {
						if (nulls.hasOwnProperty(j) === false && (emptystrs.hasOwnProperty(j) || stringvals[j].length < test)) {
							return this.grid.error("DATA_TOO_SHORT", stringvals[j], key, test);
						}
					}
				}
			}
			// test if value passes validator 
			if (Util.isFunction(validator = colDef.validator)) {
				try {
					for (j = 0; j < len; j++) {
						if (validator(vals[j], list[j], stringvals[j], nulls.hasOwnProperty(j), emptystrs.hasOwnProperty(j)) !== true) {
							return this.grid.error("WRONG_VALUE", stringvals[j], key);
						}
					}
				}
				catch (e) {
					return this.grid.error("WRONG_VALUE", stringvals[j], key);
				}
			}
		}
		return true;
	};

	prototype.makeCompositeKey = function(datarow, update) {
		if (this.__idMode_m__ !== this.__consts_n__.__composite_c__ || Util.isNull(datarow)) {
			return;
		}

		if (update === true || datarow.hasOwnProperty(this.idKey) === false) {
			var idColKeys = this._options.__idColKeys_c__,
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
		if (this.__idMode_m__ !== this.__consts_n__.__composite_c__ || datalist.length === 0) {
			return;
		}

		var idKey = this.idKey,
			 datalen = datalist.length,
			 idColKeys = this._options.__idColKeys_c__,
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
	  주어진 데이터 로우를 현재 그리드가 가지고 있는 데이터 로우에 매핑합니다.
	  매핑된 데이터 로우를 리턴합니다. 그리드가 데이터를 가지고 있지 않는 경우에는
	  <code>undefined</code> 를 리턴합니다.

	  @function {Object} map
	  @param {Object} datarow - 기존의 데이터에 매핑할 데이터 로우
	  @returns {Object} 매핑된 데이터 로우를 리턴합니다.

	  @author 조준호
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.map = function(datarow) {
		if (Util.isNull(datarow)) {
			return;
		}
		var idMap = this.__idToData_a__,
			 idKey = this.idKey,
			 id;

		this.makeCompositeKey(datarow);

		if (datarow.hasOwnProperty(idKey) && idMap.hasOwnProperty(id = datarow[idKey])) {
			return idMap[id];
		}
	};

	/**
	  주어진 데이터 어레이를 현재 그리드가 가지고 있는 데이터에 매핑합니다. 리턴되는
	  매핑 결과는 다음과 같은 형식을 가집니다.
	  <code>{mapped:data[], unmapped:data[]}</code>

	  @function {Object} mapList
	  @param {Array.<Object>} datalist - 기존의 데이터에 매핑할 데이터 어레이
	  @returns {Object} 매핑된 로우 데이터 어레이와 실패한 어레이를 리턴합니다.

	  @author 조준호
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.mapList = function(list) {
		if (Util.isEmptyArray(list)) { 
			return {mapped:[], unmapped:[]};
		}

		this.makeCompositeKeyList(list);

		var mapped = [],
			 unmapped = [],
			 idKey = this.idKey,
			 idMap = this.__idToData_a__,
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

		return {mapped:mapped, unmapped:unmapped};
	};

	/**
	  주어진 아이디를 가진 로우 데이터를 리턴합니다.

	  @function {Object} getById
	  @param {string} id - 데이터 로우의 아이디
	  @returns {Object} 주어진 아이디를 가진 데이터 로우

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getById = function(id) {
		if (Util.isNotNull(id) && this.__idToData_a__.hasOwnProperty(id)) {
			return this.__idToData_a__[id];
		}
	};

	/**
	  주어진 인덱스에 해당하는 로우 데이터를 리턴합니다.

	  @function {Object} getByIdx
	  @param {number} idx - 데이터 로우의 화면에 보여지는 인덱스
	  @returns {Object} 주어진 인덱스를 가진 데이터 로우

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getByIdx = function(i) {
		if (Util.isNotNull(i) && this.datalist.hasOwnProperty(i)) {
			return this.datalist[i];
		}
	};

	/**
	  주어진 로우 DOM Element 에 해당하는 로우 데이터를 리턴합니다.

	  @function {Object} getByNode
	  @param {DOMElement} node - 로우 DOM Element
	  @returns {Object} 주어진 로우 DOM Element 에 해당하는 데이터 로우

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getByNode = function(node) {
		return this.getById(this.getIdByNode(node));
	};


	/**
	  주어진 데이터 로우의 인덱스를 리턴합니다.

	  @function {number} getIdx
	  @param {Object} datarow - 인덱스를 찾을 데이터 로우
	  @returns {number} 주어진 데이터 로우의 인덱스

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getIdx = function(datarow) {
		return this.getIdxById(this.getId(datarow));
	};

	/**
	  주어진 아이디를 가진 데이터 로우의 인덱스를 리턴합니다.

	  @function {number} getIdxById
	  @param {string} id - 인덱스를 찾을 데이터 로우의 아이디
	  @returns {number} 주어진 아이디를 가진 데이터 로우의 인덱스

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getIdxById = function(id) {
		if (Util.isNotNull(id) && this.__idToIdx_b__.hasOwnProperty(id)) {
			return this.__idToIdx_b__[id];
		}
		return -1;
	};

	/**
	  주어진 로우 DOM Element 에 해당하는 로우 데이터의 인덱스를 리턴합니다.

	  @function {number} getIdxByNode
	  @param {DOMElement} node - 로우 DOM Element
	  @returns {number} 주어진 로우 DOM Element 에 해당하는 데이터 로우의 인덱스

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getIdxByNode = function(node) {
		return this.getIdxById(this.getIdByNode(node));
	};

	/**
	  주어진 데이터 로우의 아이디를 리턴합니다.

	  @function {string} getId
	  @param {Object} datarow - 데이터 로우
	  @returns {string} 데이터 로우의 아이디

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getId = function(datarow) {
		if (Util.isNotNull(datarow) && datarow.hasOwnProperty(this.idKey)) {
			return datarow[this.idKey];
		}
	};

	/**
	  주어진 데이터 로우의 아이디를 리턴합니다.

	  @function {string} getIdByIdx
	  @param {number} index - 데이터 로우 인덱스
	  @returns {string} 데이터 로우의 아이디

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getIdByIdx = function(i) {
		return this.getId(this.getByIdx(i));
	};

	/**
	  주어진 로우 DOM Element 에 해당하는 로우 데이터의 아이디를 리턴합니다.

	  @function {string} getIdByNode
	  @param {DOMElement} node - 로우 DOM Element
	  @returns {string} 주어진 로우 DOM Element 에 해당하는 데이터 로우의 아이디

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.getIdByNode = function(node) {
		if (Util.isNotNull(node)) {
			return node.getAttribute('i');
		}
	};

	prototype.__reidxFrom_f__ = function(from) {
		if (Util.isNull(from)) {
			from = 0;
		}

		var datalist = this.datalist,
			 datalen = datalist.length,
			 idKey = this.idKey,
			 idxMap = this.__idToIdx_b__,
			 i = from;

		for (; i < datalen; i++) {
			idxMap[datalist[i][idKey]] = i;
		}
	};

	prototype.__reidx_g__ = function(from) {
		this.__idToIdx_b__ = {};
		this.__reidxFrom_f__();
	};


	/**
	  주어진 데이터 로우가 화면에 보여지는 데이터 로우 어레이에 있는지를 체크합니다.

	  @function {boolean} has
	  @param {Object} datarow - 데이터 어레이에 포함되있는지 체크할 데이터 로우
	  @returns {boolean} 화면에 보여지는 데이터 어레이에 포함되어 있으면 true, 아니면
	  false 를 리턴합니다.

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.has = function(datarow) {
		return this.hasById(this.getId(datarow));
	};

	/**
	  주어진 데이터 로우가 화면에 보여지는 데이터 로우 어레이에 있는지를 체크합니다.

	  @function {boolean} hasById
	  @param {string} id - 데이터 어레이에 포함되있는지 체크할 데이터 아이디
	  @returns {boolean} 화면에 보여지는 데이터 어레이에 포함되어 있으면 true, 아니면
	  false 를 리턴합니다.

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.hasById = function(id) {
		if (Util.isNotNull(id)) {
			return this.__idToIdx_b__.hasOwnProperty(id);
		}
		return false;
	};

	/**
	  주어진 데이터 로우가 화면에 보여지는 데이터 로우 어레이 뿐만 아니라 모든 데이터 어레이 맵에 있는지를 체크합니다.

	  @function {boolean} contains
	  @param {Object} datarow - 데이터 로우
	  @returns {boolean} 데이터 어레이에 포함되어 있으면 true, 아니면 false 를 리턴합니다.

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.contains = function(datarow) {
		return this.containsById(this.getId(datarow));
	};

	/**
	  주어진 데이터 로우가 화면에 보여지는 데이터 로우 어레이 뿐만 아니라 모든 데이터 어레이 맵에 있는지를 체크합니다.

	  @function {boolean} containsById
	  @param {string} id - 데이터 아이디
	  @returns {boolean} 데이터 어레이에 포함되어 있으면 true, 아니면 false 를 리턴합니다.

	  @author 조준호
	  @since 1.3.0
	  @version 1.3.0
	  */
	prototype.containsById = function(id) {
		if (Util.isNotNull(id)) {
			return this.__idToData_a__.hasOwnProperty(id);
		}
		return false;
	};

	/**
	  필터링 되지 않은 모든 데이터 어레이를 주어진 데이터 어레이로 셋합니다.

	  @function {} set
	  @param {Array.<Object>} datalist - 데이터 어레이

	  @author 조준호
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.set = function(datalist) {
		if (this.all === datalist || (Util.isEmptyArray(datalist) && this.all === 0)) {
			return false;
		}

		/**
		  그리드 데이터에 변경이 적용되기 전에 발생되는 이벤트 입니다.

		  @event {Event} onBeforeDataChange

		  @author 조준호
		  @since 1.1.3
		  @version 1.2.3
		  */
		this.grid.event.trigger("onBeforeDataChange");

		/**
		  그리드의 모든 데이터 어레이를 셋하기 전에 발생되는 이벤트 입니다.

		  @event {Event} onBeforeSetDatalist
		  @param {Array.<Object>} datalist - 그리드가 기존에 가지고 있던 모든 데이터 어레이
		  @param {Array.<Object>} newDatalist - 그리드가 새로 가지게 될 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.3.0
		  */
		this.grid.event.trigger("onBeforeSetDatalist", [this.all, datalist]);

		this.cleanList(this.all);

		var key,
			 umap = this.uniqueMap;
		for (key in umap) {
			if (umap.hasOwnProperty(key)) {
				umap[key] = {};
			}
		}

		this.__idToData_a__ = {};

		this.all = [];

		this.__history_e__.length = 0;
		this.__redoHistory_q__.length = 0;

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
		  그리드의 모든 데이터 어레이를 셋한 후에 발생되는 이벤트 입니다.

		  @event {Event} onAfterSetDatalist
		  @param {Array.<Object>} datalist - 그리드가 새로 가지게 되는 모든 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onAfterSetDatalist", [datalist]);

		/**
		  그리드 데이터에 변경 사항이 있었을 경우에 발생되는 이벤트 입니다.

		  @event {Event} onDataChange

		  @author 조준호
		  @since 1.1.3
		  @version 1.1.3
		  */
		this.grid.event.trigger("onDataChange");

		this.refresh();

		return true;
	};


	/**
	  하나의 데이터 로우를 추가합니다. 이미 있는 데이터라면 아무것도 하지 않고 새로운
	  데이터라면 모든 데이터 어레이의 뒤에 붙여 넣습니다.

	  @function {} add
	  @param {Object} datarow - 추가할 데이터 로우

	  @author 조준호
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.add = function(datarow, args) {
		if (Util.isNull(datarow) || Util.isNotNull(this.map(datarow))) {
			return false;
		}

		this.grid.event.trigger("onBeforeDataChange");

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

		if (Util.isNull(args) || args.undo !== true) {
			this.__history_e__.push({
				__action_a__:this.__consts_n__.__add_e__,
				__target_b__:datarow
			});
			this.__redoHistory_q__.length = 0;
		}

		/**
		  하나의 데이터 로우를 추가한 후에 발생되는 이벤트 입니다.

		  @event {Event} onAddDatarow
		  @param {Object} datarow - 추가된 데이터

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onAddDatarow", [datarow, args]);
		this.grid.event.trigger("onDataChange");

		if (args === undefined || args.noRefresh !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  여러개의 데이터 로우를 추가합니다. 이미 있는 데이터는 무시하고 새로운 데이터만
	  기존의 모든 데이터 어레이의 뒤에 붙여 넣습니다.

	  @function {} addList
	  @param {Array.<Object>} datalist - 추가할 데이터 어레이

	  @author 조준호
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

		this.grid.event.trigger("onBeforeDataChange");

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

		if (Util.isNull(args) || args.undo !== true) {
			this.__history_e__.push({
				__action_a__:this.__consts_n__.__addList_f__,
				__target_b__:toAdd
			});
			this.__redoHistory_q__.length = 0;
		}

		/**
		  여러개의 데이터 로우를 추가한 후에 발생되는 이벤트 입니다.

		  @event {Event} onAddDatalist
		  @param {Array.<Object>} datalist - 추가된 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onAddDatalist", [toAdd, args]);
		this.grid.event.trigger("onDataChange");

		if (args === undefined || args.noRefresh !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  주어진 데이터 로우의 하나의 컬럼의 값을 변경합니다.

	  @function {} updateByKey
	  @param {Object} datarow - 내용을 변경할 데이터 로우
	  @param {string} key - 변경할 키
	  @param {?} value - 새로운 값

	  @author 조준호
	  @since 1.2.3
	  @version 1.2.3
	  */
	prototype.updateByKey = function(datarow, key, value, args) {
		var change = {};
		change[key] = value;
		return this.update(datarow, change, args);
	};

	/**
	  주어진 데이터 로우의 내용을 변경합니다.

	  @function {} update
	  @param {Object} datarow - 내용을 변경할 데이터 로우
	  @param {Object} change - 변경될 컬럼의 키 값과 변경될 값을 가집니다. 예를 들어
	  주어진 데이터 로우의 name 이라는 컬럼의 값을 "john" 으로 변경하고 age 컬럼을 15 로 변경할
	  경우에 <code>{name:"john", age:15}</code> 를 이 파라미터로 넣어줍니다.

	  @author 조준호
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.update = function(datarow, change, args) {
		if (Util.isNullOr(datarow, change)) {
			return false;
		}

		this.grid.event.trigger("onBeforeDataChange");

		/**
		  데이터가 변경되기 전에 발생하는 이벤트 입니다.

		  @event {Event} onBeforeUpdateDatarow
		  @param {Object} datarow - 내용이 변경될 데이터 로우
		  @param {Object} change - 데이터의 변경 내용을 담은 오브젝트
		  @see update

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onBeforeUpdateDatarow", [datarow, change]);

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
			this.__rollback_o__(datarow, before);
			return res;
		}

		if ((res = this.validate(datarow, args)) instanceof Error) {
			this.__rollback_o__(datarow, before);
			return res;
		}

		if ((res = this.updateUniqueMap(datarow, change, before)) instanceof Error) {
			this.__rollback_o__(datarow, before);
			return res;
		}

		if ((res = this.updateIdMap(datarow, change, before)) instanceof Error) {
			this.__rollback_o__(datarow, before);
			return res;
		}

		/**
		  데이터의 아이디가 변경된 후에 발생하는 이벤트 입니다.

		  @event {Event} onIdChange
		  @param {Object} datarow - 데이터 아이디가 변경될 데이터 로우
		  @param {string} idBefore - 데이터의 바뀌기 전 아이디
		  @param {string} idAfter - 데이터의 새로운 아이디
		  @see update

		  @author 조준호
		  @since 1.1.1
		  @version 1.1.1
		  */
		if (res !== false) {
			this.grid.event.trigger("onIdChange", [datarow, res, datarow[this.idKey]]);
		}

		if (Util.isNull(args) || args.undo !== true) {
			this.__history_e__.push({
				__action_a__:this.__consts_n__.__update_g__,
				__target_b__:datarow,
				__before_c__:before,
				__change_d__:change
			});
			this.__redoHistory_q__.length = 0;
		}

		/**
		  하나의 데이터가 변경된 후에 발생되는 이벤트 입니다.

		  @event {Event} onUpdateDatarow
		  @param {Object} datarow - 내용이 변경된 데이터 로우
		  @param {Object} change - 데이터의 변경 내용을 담은 오브젝트
		  @param {Object} before - 데이터의 변경 전 내용을 담은 오브젝트
		  @see update

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onUpdateDatarow", [datarow, change, before, args]);
		this.grid.event.trigger("onDataChange");

		if (args === undefined || args.noRefresh !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  여러개의 데이터 로우의 내용을 변경합니다. 파라미터는 어레이의 형식으로 각 엘레멘트는
	  다음과 같은 형식을 가집니다.<br>
	  <code>{datarow:datarow, change:{name:"john", age:15}}</code>

	  @function {} updateList
	  @param {Array.<Object>} list - 내용이 변경될 데이터와 변경 내용을 가진 어레이
	  @see {@link update}

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.updateList = function(list, args) {
		if (Util.isEmptyArray(list)) {
			return false;
		}

		this.grid.event.trigger("onBeforeDataChange");

		/**
		  데이터가 변경되기 전에 발생하는 이벤트 입니다.

		  @event {Event} onBeforeUpdateDatalist
		  @param {Array.<Object>} list - 내용이 변경될 데이터와 변경 내용을 가진 어레이. 각 엘레멘트는
		  다음과 같은 형식을 가집니다.<br>
		  <code>list[i] = {datarow:datarow, change:{name:"john", age:15}}</code>
		  @see updateList

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onBeforeUpdateDatalist", [list]);

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
			this.__rollbackList_p__(datalist, befores);
			return res;
		}

		if ((res = this.validateList(datalist, args)) instanceof Error) {
			this.__rollbackList_p__(datalist, befores);
			return res;
		}

		if ((res = this.updateListUniqueMap(datalist, changes, befores)) instanceof Error) {
			this.__rollbackList_p__(datalist, befores);
			return res;
		}

		if ((res = this.updateListIdMap(datalist, changes, befores)) instanceof Error) {
			this.__rollbackList_p__(datalist, befores);
			return res;
		}

		/**
		  데이터 어레이의 아이디가 변경된 후에 발생하는 이벤트 입니다.

		  @event {Event} onIdListChange
		  @param {Array.<Object>} datalist - 데이터 아이디가 변경될 데이터 로우 어레이
		  @param {Array.<string>} idBefores - 데이터의 바뀌기 전 아이디 어레이
		  @param {string} idKey - 데이터의 아이디를 가리키는 키
		  @see update

		  @author 조준호
		  @since 1.1.1
		  @version 1.1.1
		  */
		if (res !== false) {
			this.grid.event.trigger("onIdListChange", [res.list, res.befores, this.idKey]);
		}

		if (Util.isNull(args) || args.undo !== true) {
			this.__history_e__.push({
				__action_a__:this.__consts_n__.__updateList_h__,
				__target_b__:datalist,
				__before_c__:befores,
				__change_d__:changes
			});
			this.__redoHistory_q__.length = 0;
		}

		/**
		  여러개의 데이터가 변경된 후에 발생되는 이벤트 입니다.

		  @event {Event} onUpdateDatalist
		  @param {Array.<Object>} datalist - 내용이 변경된 데이터 로우 어레이
		  @param {Array.<Object>} changes - 데이터의 변경 내용을 담은 오브젝트 어레이
		  @param {Array.<Object>} befores - 데이터의 변경 전 내용을 담은 오브젝트 어레이
		  @param {Object} args - 현재 onUpdateDatalist 의 옵션을 담은 오브젝트

		  @author 조준호
		  @since 1.0.0
		  @version 1.3.0
		  */
		/*
		 * 1.3.0: added: changes & befores & args
		 */
		this.grid.event.trigger("onUpdateDatalist", [datalist, changes, befores, args]);	
		this.grid.event.trigger("onDataChange");

		if (args === undefined || args.noRefresh !== true) {
			this.refresh(args);
		}

		return true;
	};

	prototype.__rollback_o__ = function(datarow, before) {
		var i;
		for (i in before) {
			if (before.hasOwnProperty(i)) {
				datarow[i] = before[i];
			}
		}
	};

	prototype.__rollbackList_p__ = function(datalist, befores) {
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
	  하나의 데이터 로우를 기존의 모든 데이터 어레이에서 제거합니다. 기존의 데이터
	  어레이에 존재하지 않는 경우에는 아무것도 하지 않습니다.

	  @function {} remove
	  @param {Object} datarow - 제거할 데이터 로우

	  @author 조준호
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

		this.grid.event.trigger("onBeforeDataChange");

		this.removeFromIdMap(mapped);
		this.removeFromUniqueMap(mapped);
		this.all.remove(mapped);
		this.removeId(mapped);

		if (Util.isNull(args) || args.undo !== true) {
			this.__history_e__.push({
				__action_a__:this.__consts_n__.__remove_i__,
				__target_b__:mapped
			});
			this.__redoHistory_q__.length = 0;
		}

		/**
		  하나의 데이터가 제거된 후 발생되는 이벤트입니다.

		  @event {Event} onRemoveDatarow
		  @param {Object} datarow - 제거된 데이터 로우

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onRemoveDatarow", [mapped, args]);
		this.grid.event.trigger("onDataChange");

		if (args === undefined || args.noRefresh !== true) {
			this.refresh(args);
		}

		return true;
	};


	/**
	  여러개의 데이터 로우를 기존의 모든 데이터 어레이에서 제거합니다. 기존의 데이터
	  어레이에 없는 데이터들은 무시하고 있는 데이터 들만 제거합니다.

	  @function {} removeList
	  @param {Array.<Object>} datalist - 제거할 데이터 어레이

	  @author 조준호
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

		this.grid.event.trigger("onBeforeDataChange");

		this.removeListFromIdMap(mapped);
		this.removeListFromUniqueMap(mapped);
		this.all.removeList(mapped);
		this.cleanList(mapped);

		if (Util.isNull(args) || args.undo !== true) {
			this.__history_e__.push({
				__action_a__:this.__consts_n__.__removeList_j__,
				__target_b__:mapped
			});
			this.__redoHistory_q__.length = 0;
		}

		/**
		  여러개의 데이터가 제거된 후 발생되는 이벤트입니다.

		  @event {Event} onRemoveDatalist
		  @param {Object} datarow - 제거된 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onRemoveDatalist", [mapped, args]);
		this.grid.event.trigger("onDataChange");

		if (args === undefined || args.noRefresh !== true) {
			this.refresh(args);
		}

		return true;
	};

	prototype.__keydownCanvas_ba__ = function(e) {
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
	  마지막 데이터 변경 내용을 한 단계 취소합니다.
	  그리드 뷰가 활성화 되었을 때 Ctrl+Z 를 입력하면 실행됩니다.

	  @function {} undo

	  @author 조준호
	  @since 1.1.4
	  @version 1.1.4
	  */
	prototype.undo = function() {
		if (this.__history_e__.length === 0) {
			return false;
		}

		var hist = this.__history_e__.pop();
		this.__redoHistory_q__.push(hist);

		var tar = hist.__target_b__,
			 bef = hist.__before_c__;
		switch (hist.__action_a__) {
			case this.__consts_n__.__add_e__:
				return this.remove(tar, {undo:true});
			case this.__consts_n__.__addList_f__:
				return this.removeList(tar, {undo:true});		
			case this.__consts_n__.__update_g__:
				return this.update(tar, bef, {undo:true});
			case this.__consts_n__.__updateList_h__:
				var list = [],
					 i = 0,
					 len = tar.length;
				for (; i < len; i++) {
					list.push({datarow:tar[i], change:bef[i]});
				}
				return this.updateList(list, {undo:true});		
			case this.__consts_n__.__remove_i__:
				return this.add(tar, {undo:true});
			case this.__consts_n__.__removeList_j__:
				return this.addList(tar, {undo:true});
		}
	};

	/**
	  마지막으로 취소된 데이터 변경 내용을 다시 실행합니다.
	  그리드 뷰가 활성화 되었을 때 Ctrl+Y 를 입력하면 실행됩니다.

	  @function {} redo

	  @author 조준호
	  @since 1.1.4
	  @version 1.1.4
	  */
	prototype.redo = function() {
		if (this.__redoHistory_q__.length === 0) {
			return false;
		}

		var hist = this.__redoHistory_q__.pop();
		this.__history_e__.push(hist);

		var tar = hist.__target_b__;
		var cha = hist.__change_d__;
		switch (hist.__action_a__) {
			case this.__consts_n__.__add_e__:
				return this.add(tar, {undo:true});
			case this.__consts_n__.__addList_f__:
				return this.addList(tar, {undo:true});		
			case this.__consts_n__.__update_g__:
				return this.update(tar, cha, {undo:true});
			case this.__consts_n__.__updateList_h__:
				var list = [],
					 i = 0,
					 len = tar.length;
				for (; i < len; i++) {
					list.push({datarow:tar[i], change:cha[i]});
				}
				return this.updateList(list, {undo:true});
			case this.__consts_n__.__remove_i__:
				return this.remove(tar, {undo:true});
			case this.__consts_n__.__removeList_j__:
				return this.removeList(tar, {undo:true});
		}
	};


	/**
	  주어진 두개의 데이터 로우가 서로 같은 데이터를 가리키는지를 리턴합니다.

	  @function {boolean} equals
	  @param {Object} datarow1 - 데이터 로우 1
	  @param {Object} datarow2 - 데이터 로우 2
	  @returns {boolean} 같은 데이터를 가리키면 true, 아닐 경우 false

	  @author 조준호
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

		if (this.__idMode_m__ === this.__consts_n__.__composite_c__) {
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
	  순수 화면 출력 목적을 위해 모듈에 의해 추가된 데이터 로우가 아닌 진실된 데이터 로우들만 필터링 한 후 리턴합니다.

	  @function {Array.<Object>} getReal
	  @returns {Array.<Object>} 모듈에 의해 추가된 데이터 로우가 아닌 진실된 데이터 어레이

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.getReal = function() {
		var notReal = this.__consts_n__.__notReal_d__;
		return this.all.filter(function(datarow) {
			return datarow.hasOwnProperty(notReal) === false;
		});
	};

	/**
	  주어진 데이터 어레이에서 진실된 데이터 로우들만 필터링 한 후 리턴합니다.

	  @function {Array.<Object>} filterReal
	  @param {Array.<Object>=} datalist - 필터링 할 데이터 어레이
	  @returns {Array.<Object>} 모듈에 의해 추가된 데이터 로우가 아닌 진실된 데이터 어레이

	  @author 조준호
	  @since 1.1.4
	  @version 1.1.4
	  */
	prototype.filterReal = function(list) {
		var notReal = this.__consts_n__.__notReal_d__;
		return list.filter(function(datarow) {
			return datarow.hasOwnProperty(notReal) === false;
		});
	};


	/**
	  주어진 로우 데이터가 모듈에 의해 추가된 경우 false, 아니면 true 를 리턴합니다.

	  @function {boolean} isReal
	  @param {Object=} datarow - 진실된 데이터인지 체크할 로우 데이터
	  @returns {boolean} 모듈에 의해 추가된 데이터 로우일 경우 false, 아니면 true

	  @author 조준호
	  @since 1.1.0
	  @version 1.1.0
	  */
	prototype.isReal = function(datarow) {
		return Util.isNotNull(datarow) && datarow.hasOwnProperty(this.__consts_n__.__notReal_d__) === false;
	};


	/**
	  주어진 데이터 어레이에서 모듈들에 의해 추가된 거짓된 데이터들을 제거합니다.
	  주어진 데이터 어레이가 없을 경우 기존의 모든 데이터를 사용합니다.

	  @function {} dropNonReal
	  @param {Array.<Object>=} datalist - 화면 출력 목적을 위해 모듈에 의해 추가된 데이터 로우들을 제거할 데이터 어레이

	  @author 조준호
	  @since 1.0.0
	  @version 1.2.3
	  */
	prototype.dropNonReal = function(datalist) {
		if (Util.isEmptyArray(datalist)) {
			return;
		}

		var notReal = this.__consts_n__.__notReal_d__,
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
		if (this.__idMode_m__ === this.__consts_n__.__given_b__ || Util.isEmptyArray(datalist)) {
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
		if (Util.isNotNull(datarow) && this.__idMode_m__ !== this.__consts_n__.__given_b__ && datarow.hasOwnProperty(this.idKey)) {
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
			 notReal = this.__consts_n__.__notReal_d__;

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
	  정렬 오브젝트를 셋합니다.

	  @function {} setSorter
	  @param {Object=} sorter - 정렬 오브젝트를 셋합니다. undefined 또는 null 을 넣을경우
	  정렬 오브젝트틀 제거합니다.

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.setSorter = function(sorter) {
		/**
		  정렬 오브젝트를 변경할 때 발생되는 이벤트 입니다.

		  @event {Event} onChangeSorter
		  @param {Object} old - 기존의 sorter
		  @param {Object} new - 새로운 sorter

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onChangeSorter", [this.__sorter_h__, sorter]);

		this.__sorter_h__ = sorter;
	};

	prototype.__sort_i__ = function(sorter) {
		if (Util.isNull(sorter)) {
			sorter = this.__sorter_h__;
		}
		else {
			this.setSorter(sorter);
		}

		if (Util.isNull(sorter)) {
			return;
		}

		var datalist = this.all;

		/**
		  데이터를 정렬하기 전에 발생되는 이벤트 입니다.

		  @event {Event} onBeforeSort
		  @param {Array.<Object>} datalist - 정렬하기 전의 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onBeforeSort", [datalist]);

		if (Util.isNotNull(sorter.comparator)) {
			datalist.sort(sorter.comparator);
			if (sorter.desc) {
				datalist.reverse();
			}
		}
		else if (Util.isNotNull(sorter.lexi)) {
			this.constructor.__lexi_a__(datalist, sorter.lexi, sorter.desc);
		}


		/**
		  데이터를 정렬한 후에 발생되는 이벤트 입니다.

		  @event {Event} onAfterSort
		  @param {Array.<Object>} datalist - 정렬한 후의 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onAfterSort", [datalist]);
	};

	/**
	  데이터 필터를 추가하고 필터를 적용합니다. 필터는 함수로써 로우 데이터를 파라미터로 받고
	  true 를 리턴할 경우 그 데이터는 보여지는 데이터 어레이에 포함되고 false 를 리턴할 경우
	  그 데이터는 필터링 되어 보여지지 않습니다.

	  @function {} addFilter
	  @param {Function=} filter - 추가할 데이터 필터

	  @author 조준호
	  @since 1.1.5
	  @version 1.1.5
	  */
	prototype.addFilter = function(filter) {
		this.__filters_r__.push(filter);
		this.refresh();
	};

	/**
	  등록된 데이터 필터를 제거합니다.

	  @function {} removeFilter
	  @param {Function=} filter - 제거할 데이터 필터

	  @author 조준호
	  @since 1.1.5
	  @version 1.1.5
	  */
	prototype.removeFilter = function(filter) {
		var len = this.__filters_r__.length;
		this.__filters_r__.remove(filter);
		if (len !== this.__filters_r__.length) {
			this.refresh();
		}
	};

	prototype.__filter_j__ = function() {
		var datalist = this.datalist,
			 failed = this.failed,
			 i = 0,
			 filters = this.__filters_r__,
			 flen = filters.length,
			 filter,
			 j;

		/**
		  데이터 필터링을 시작하기 전에 발생되는 이벤트 입니다.

		  @event {Event} onBeforeFilter
		  @param {Array.<Object>} datalist - 현재 그리드 화면에 보여지는 데이터 어레이
		  @param {Array.<Object>} failed - 현재 필터링되어 보여지지 않는 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onBeforeFilter", [datalist, failed]);

		datalist.length = 0;
		datalist.pushList(this.all);
		failed.length = 0;

		for (; i < flen; i++) {
			filter = this.__filters_r__[i];
			for (j = datalist.length - 1; j >= 0; j--) {
				if (!filter(datalist[j])) {
					failed.push(datalist[j]);
					datalist.removeAt(j);
				}
			}
		}

		/**
		  데이터 필터링을 하기 위해서 발생되는 이벤트 입니다. 각 모듈들은 이 이벤트를
		  이용하여 필터링을 합니다.

		  @event {Event} onFilter
		  @param {Array.<Object>} datalist - 화면에 보여질 데이터 어레이
		  @param {Array.<Object>} failed - 필터링되어 보여지지 않을 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onFilter", [datalist, failed]);

		/**
		  데이터 필터링 후에 발생되는 이벤트 입니다.

		  @event {Event} onAfterFilter
		  @param {Array.<Object>} datalist - 화면에 보여질 데이터 어레이
		  @param {Array.<Object>} failed - 필터링되어 보여지지 않을 데이터 어레이

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onAfterFilter", [datalist, failed]);
	};

	prototype.__finish_k__ = function(args) {
		this.__reidx_g__();

		/**
		  모든 {@link JGM.DataManager DataManager} 의 {@link refresh} 과정이 끝났음을 알리는
		  이벤트입니다.

		  @event {Event} onAfterRefresh
		  @see refresh

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onAfterRefresh", [args]);
	};


	/**
	  데이터를 재정렬하고 다시 필터링합니다.

	  @function {} refresh
	  @param {Object=} sorter - 데이터를 정렬할 때 사용할 sorter

	  @author 조준호
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.refresh = function(args) {
		/**
		  {@link JGM.DataManager DataManager} 의 {@link refresh} 과정이 시작함을 알리는
		  어레이 입니다.

		  @event {Event} onBeforeRefresh
		  @see refresh

		  @author 조준호
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onBeforeRefresh");

		if (args === undefined) {
			this.__sort_i__();
		}
		else if (args.noSort !== true) {
			this.__sort_i__(args.sorter);
		}

		if (args === undefined || args.noFilter !== true) {
			this.__filter_j__();
		}

		this.__finish_k__(args);
	};

	prototype.exportRowToArray = function(index, keys) {'use strict';
		if (!(index in this.datalist)) {
			return null;
		}

		if (!keys) {
			keys = this.grid.colDefMgr.getKeys();
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
			keys = this.grid.colDefMgr.getKeys();
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

	DataManager.__lexi_a__ = function(datalist, key, desc) {
		var oldToString = Object.prototype.toString;
		Object.prototype.toString = Util.isFunction(key)? key : function() { return this[key]; };
		datalist.sort();
		Object.prototype.toString = oldToString;
		if (desc) {
			datalist.reverse();
		}
	};

	JGM._add("DataManager", DataManager);
}());
