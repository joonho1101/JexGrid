goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.ColumnManager');
goog.require('jx.grid.CheckManager');
goog.require('jx.data.DataManager');
goog.require('jx.data.Tree');
goog.require('jx.data.TreeNode');

goog.provide('jx.grid.Collapser');

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

 goog.exportSymbol('JGM.module.Collapser', Collapser);
 JGM._add("Collapser", Collapser);

	/**
	  Collapser ���. Ʈ�� ������ �����͸� ����ϴ� ����Դϴ�.
	  @module Collapser

	  @requires JGM
	  @requires JGM.Grid
	  @requires JGM.ColDefManager
	  @requires JGM.ColHeader
	  @requires JGM.DataManager
	  @requires JGM.EventManager
	  @requires JGM.ViewportManager
	  @requires JGM.Tree
	  @requires JGM.TreeNode
	  */

	/**
	  Collapser Ŭ����. Ʈ�� ������ �����͸� ����ϴ� ��� Ŭ���� �Դϴ�. ������ �°�
	  �����͸� ���������ְ� �ڽĵ��� �ִ� ����� ��ġ��/������ ����� �����մϴ�.

	  @class {Collapser} JGM.Collapser

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Collapser ����Ʈ���� �Դϴ�.

	  @constructor {Collapser} Collapser
	  @param {Object} args - Collapser ��� �Ķ���� ������Ʈ
	  @... {JGM.Grid} args.grid - Collapser �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
	  @... {Object} args.options - Collapser �ɼ� ������Ʈ
	  @returns {Collapser} Collapser ��� �ν��Ͻ��� �����մϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	function Collapser(args) {
		/**
		  {@link JGM} �� �Ҵ����ִ� Collapser ��� ���� ���̵��Դϴ�. �б� ����.

		  @var {string} mid

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.mid = args.mid;

		/**
		  Collapser �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

		  @var {JGM.Grid} grid

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid = args.grid;

		/**
		  Ʈ�� ������ �����͸� �����ϴ� {@link JGM.Collapser Collapser} �ν��Ͻ� �Դϴ�.

		  @var {JGM.Collapser} JGM.Grid.collapser

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.collapser = this;

		/**
		  Collapser ����� �⺻ �ɼ� ������ �����մϴ�.

		  @type {Object} options
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		var options = {
			/**
			  Collapser �� ��ġ��/���� ��ư�� ǥ�õ� �÷��� Ű�� ���մϴ�. �� ����
			  �������� �ʾ����ÿ��� {@link JGM.Collapser.options.colDef colDef}
			  �� ����Ͽ� ���ο� �÷��� �����մϴ�.<br>�⺻��:<code>undefined</code>

			  @type {string=} JGM.Collapser.options.key
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__key_e__: undefined,

			/**
			  {@link JGM.Collapser.options.key key} �� �������� �ʾƼ�, Collapser �÷��� ���� �����ؾ��� ��� ���� �÷� ���� ������Ʈ�Դϴ�.
			  <br>�⺻��:<code>{key:"collapser", width: 120, name:" "}</code>

			  @type {Object=} JGM.Collapser.options.colDef
			  @private
			  @see JGM.ColDefManager.options.colDef

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__colDef_a__: {key:"collapser", width: 120, name:" ", noSearch:true},

			/**
			  {@link JGM.Collapser.options.colDef colDef} �� ���° �÷����� �������� ���մϴ�.
			  <br>�⺻��:<code>0</code>

			  @type {number=} JGM.Collapser.options.colIdx
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__colIdx_b__: 0,

			/**
			  ���� ������ ���������� ���� �̹��� ����Դϴ�. <br>�⺻��:<code>imageUrl + "collapsed.png"</code>

			  @type {string=} JGM.Collapser.options.urlCollapsed
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__urlCollapsed_c__: this.grid._options.imageUrl + "collapsed.png",

			/**
			  ���� �������� ���콺�� �����Ǿ��� ���� ���������� ���� �̹��� ����Դϴ�. <br>�⺻��:<code>imageUrl + "collapsed-hover.png"</code>

			  @type {string=} JGM.Collapser.options.urlCollapsedHover
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__urlCollapsedHover_d__: this.grid._options.imageUrl + "collapsed-hover.png",

			/**
			  ������ ������ ���������� ���� �̹��� ����Դϴ�. <br>�⺻��:<code>imageUrl + "expanded.png"</code>

			  @type {string=} JGM.Collapser.options.urlExpanded
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__urlExpanded_f__: this.grid._options.imageUrl + "expanded.png",

			/**
			  ������ �������� ���콺�� �����Ǿ��� ���� ���������� ���� �̹��� ����Դϴ�. <br>�⺻��:<code>imageUrl + "expanded-hover.png"</code>

			  @type {string=} JGM.Collapser.options.urlExpandedHover
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__urlExpandedHover_g__: this.grid._options.imageUrl + "expanded-hover.png",

			/**
			  Collapser ��� �������� �� �ȼ��Դϴ�. <br>�⺻��:<code>6</code>

			  @type {number=} JGM.Collapser.options.width
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__width_h__: 6,

			/**
			  Collapser ��� �������� �¿� padding �ȼ��Դϴ�. <br>�⺻��:<code>5</code>

			  @type {number=} JGM.Collapser.options.padding
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__padding_i__: 5,

			/**
			  Collapser ��� �����ܿ� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-collapser"</code>

			  @type {string=} JGM.Collapser.options.classCollapser
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__classCollapser_j__: "jgrid-collapser",

			/**
			  ������ ���� �����ܿ� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"collapsed"</code>

			  @type {string=} JGM.Collapser.options.classCollapsed
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__classCollapsed_k__: "collapsed",

			/**
			  ������ ���� �����ܿ� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"expanded"</code>

			  @type {string=} JGM.Collapser.options.classExpanded
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__classExpanded_l__: "expanded",

			/**
			  Collapser ��� �������� indent �ϴ� div �� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"indent"</code>

			  @type {string=} JGM.Collapser.options.classIndent
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__classIndent_m__: "indent",

			/**
			  ������ ��� Collapser ��ۿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"master"</code>

			  @type {string=} JGM.Collapser.options.classMasterCollapser
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__classMasterCollapser_n__: "master",

			/*
			   ������ ��� Collapser ����� �������� �����Դϴ�. <br>�⺻��:<code>true</code>

			   @type {boolean=} JGM.Collapser.options.master
			   @private

			   @author ����ȣ
			   @since 1.0.0
			   @version 1.0.0
			   */
			//master: true,

			/**
			  Ʈ�� ������ �������� �з����� indent �� �ȼ��Դϴ�. <br>�⺻��:<code>12</code>

			  @type {number=} JGM.Collapser.options.indentSize
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__indentSize_o__: 12,

			/**
			  true �� ��� ��� ��尡 ���� ���·�, false �� ��� ������ ���·� �����մϴ�. <br>�⺻��:<code>false</code>

			  @type {boolean=} JGM.Collapser.options.beginCollapsed
			  @private

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			__beginCollapsed_p__: false,

			/**
			  ������ų {@link JGM.CheckManager CheckManager} �� �Ѱ��� �ɼ� ������Ʈ�Դϴ�.
			  �� �ɼ��� �������� ���� ���, {@link JGM.CheckManager CheckManager} �ν��Ͻ���
			  �������� �ʽ��ϴ�. <br>�⺻��:<code>undefined</code>

			  @type {Object=} JGM.Collapser.options.CheckManager
			  @private
			  @see JGM.CheckManager.options

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			CheckManager: undefined,

			/**
			  Ʈ�� ���� ������ ������ ����� {@link JGM.Tree Tree} �� �Ѱ��� �ɼ� ������Ʈ�Դϴ�.
			  <br>�⺻��:<code>undefined</code>

			  @type {Object=} JGM.Collapser.options.Tree
			  @private
			  @see JGM.Tree.options
			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			Tree: undefined
		};

		this._options = JGM.__extend_e__(options, args.options, {
			colDef:"__colDef_a__",
			colIdx:"__colIdx_b__",
			urlCollapsed:"__urlCollapsed_c__",
			urlCollapsedHover:"__urlCollapsedHover_d__",
			key:"__key_e__",
			urlExpanded:"__urlExpanded_f__",
			urlExpandedHover:"__urlExpandedHover_g__",
			width:"__width_h__",
			padding:"__padding_i__",
			classCollapser:"__classCollapser_j__",
			classCollapsed:"__classCollapsed_k__",
			classExpanded:"__classExpanded_l__",
			classIndent:"__classIndent_m__",
			classMasterCollapser:"__classMasterCollapser_n__",
			indentSize:"__indentSize_o__",
			beginCollapsed:"__beginCollapsed_p__"
		});

		if (this._options.CheckManager) {

			/**
			  Collapser �� ������ {@link JGM.CheckManager CheckManager} �Դϴ�.

			  @var {JGM.CheckManager} checkMgr

			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			this.checkMgr = JGM.create("CheckManager", {grid:this.grid, options:this._options.CheckManager});
			delete this._options.CheckManager;
			if (Util.isNull(this._options.__key_e__)) {
				this._options.__colIdx_b__++;
			}
		}

		this.__tree_a__ = JGM.create("Tree", {list:this.grid.dataMgr.all, options:this._options.Tree});

		this.__master_c__;
		this.key;
	}

	Collapser.getInstance = function(args) {
		return new Collapser(args);
	};

	var prototype = Collapser.prototype;

	prototype.__init = function() {
		if (Util.isNull(this._options.__key_e__)) {
			this.grid.colDefMgr.addAt(this._options.__colIdx_b__, this._options.__colDef_a__);
		}

		this.__makeTree_d__();
		this.__filterRefresh_g__();

		this.key = Util.isNull(this._options.__key_e__) ? this._options.__colDef_a__.key : this._options.__key_e__;

		this.bindEvents();
	};

	prototype.bindEvents = function() {
		var key = this.key,
			events;

		events = {
			onAfterFilter:				this.__onAfterFilter_as__,
			onCreateCss:				this.__onCreateCss_V__,
			onDestroy:					this.__destroy_aA__,
			onAfterSetDatalist:			this.__onAfterSetDatalist_ab__,
			onAddDatarow:				this.__onAddDatarow_ac__,
			onAddDatalist:				this.__onAddDatalist_ad__,
			onUpdateDatarow:			this.__onUpdateDatarow_ae__,
			onUpdateDatalist:			this.__onUpdateDatalist_ah__,
			onRemoveDatarow:			this.__onRemoveDatarow_A__,
			onRemoveDatalist:			this.__onRemoveDatalist_ag__,
			onRenderHeadersComplete:	this.__getMaster_h__
		};

		events["onRenderHeader_" + key + "_prepend"] = this.__onRenderHeader_aG__;
		events["clickHeaderValid_" + key] = this.__clickHeaderValid_bO__;
		events["onRenderCell_" + key + "_prepend"] = this.__onRenderCell_aH__;
		events["dblclickCanvas_" + key] = this.__dblclickCanvas_bi__;
		events["keydownColSel_" + key + "_" + Util.keyMapKeydown.space] = this.__keydownColSel_bA__;

		if (Util.isNotNull(this.checkMgr)) {
			events.onCheckChange = this.__onCheckChange_f__;
		}

		this.grid.event.bind(events, this);
	};

	prototype.__destroy_aA__ = function() {
		JGM._destroy(this, {
			name: "Collapser",
			path: "collapser",
			module: "__tree_a__",
			"$": "__master_c__",
			property: "checkMgr",
			map: "_options"
		});
	};

	prototype.__onCreateCss_V__ = function() {
		var gridId = "#" + this.grid.mid + " .",
			o = this._options,
			rowSel = gridId + this.grid.view._options.__classRow_l__ + " .",
			toggleSel = gridId + o.__classCollapser_j__,
			expandedSel = toggleSel + "." + o.__classExpanded_l__,
			collapsedSel = toggleSel + "." + o.__classCollapsed_k__,
			rowH = this.grid.view.__getRowInnerHeight_AO__(),
			rules = [],
			header = this.grid.header;

		rules.push(gridId + o.__classIndent_m__ + "{height:" + rowH + "px;float:left;}");
		rules.push(toggleSel + "{width:" + o.__width_h__ + "px;float:left;padding:0 " + o.__padding_i__ + "px}");
		rules.push(rowSel + o.__classCollapser_j__ + "{height:" + rowH + "px}");
		rules.push(expandedSel + "{background:url(" + o.__urlExpanded_f__ + ") no-repeat center transparent}");
		rules.push(expandedSel + ":hover{background:url(" + o.__urlExpandedHover_g__ + ") no-repeat center transparent}");
		rules.push(collapsedSel + "{background:url(" + o.__urlCollapsed_c__ + ") no-repeat center transparent}");
		rules.push(collapsedSel + ":hover{background:url(" + o.__urlCollapsedHover_d__ + ") no-repeat center transparent}");

		if (Util.isNotNull(header)) {
			rules.push(gridId + header._options.__classColHeader_r__ + " ." + o.__classCollapser_j__ + "{height:" + header._options.__height_l__ + "px}");
		}

		return rules.join("");
	};

	prototype.__onAfterSetDatalist_ab__ = function(datalist) {
		this.__tree_a__.destroy();
		this.__tree_a__ = JGM.create("Tree", {list:this.grid.dataMgr.all, options:this._options.Tree});
		this.__makeTree_d__();
	};

	prototype.__onAddDatarow_ac__ = function(datarow) {
		var node = this.__tree_a__.createNode(datarow);
		node._collapsed = this._options.__beginCollapsed_p__;
		if (Util.isNotNull(node.parent) && (node.parent === node.tree.root || (node.parent._shown && !node.parent._collapsed))) {
			node._shown = true;
		}
		else {
			node._shown = false;
		}

		if (Util.isNotNull(node.parent) && node.parent.children.length === 1) {
			this.grid.view.rerenderCellByIdAndKey(this.grid.dataMgr.getId(node.parent.data), this.key);
		}

		if (node._collapsed === true || node._shown === false) {
			node.traverseChildren({fn:function(args) {
				this._shown = false;
			}});
		}
		else {
			node.traverseChildren({fn:function(args) {
				if (Util.isNotNull(this.parent) && (this.parent === this.tree.root || (this.parent._shown && !this.parent._collapsed))) {
					this._shown = true;
				}
				else {
					args.propagate = false;
					this.traverse({fn:function(args) {
						this._shown = false;
					}});
				}
			}});
		}

		/**
		  Collapser �� ���� Ʈ���� ������ ����Ǿ��� ��� Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.<br>
		  @event {Event} onCollapserTreeChange

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.grid.event.trigger("onCollapserTreeChange");
	};

	prototype.__onAddDatalist_ad__ = function(datalist) {
		var i = 0,
			len = datalist.length,
			tree = this.__tree_a__,
			root = tree.root,
			collapsed = this._options.__beginCollapsed_p__,
			key = this.key,
			view = this.grid.view,
			datam = this.grid.dataMgr,
			node,
			toRerender = [],
			par;

		for (; i < len; i++) {
			node = tree.createNode(datalist[i]);
			node._collapsed = collapsed;

			if (Util.isNotNull(node.parent) && node.parent.children.length === 1) {
				toRerender.push(node.parent.data);
			}
		}

		if (view !== undefined) {
			i = 0;
			len = toRerender.length;
			for (; i < len; i++) {
				view.rerenderCellByIdAndKey(datam.getId(toRerender[i]), key);
			}
		}

		root.traverseChildren({fn:function(args) {
			par = this.parent;
			if (Util.isNotNull(par) && (par === root || (par._shown && !par._collapsed))) {
				this._shown = true;
			}
			else {
				args.propagate = false;
				this.traverse({fn:function(args) {
					this._shown = false;
				}});
			}
		}});
		this.grid.event.trigger("onCollapserTreeChange");
	};

	prototype.__onUpdateDatarow_ae__ = function(datarow, change, before) {
		var tree = this.__tree_a__,
			nodeKey = tree._options.nodeKey,
			parentKey = tree._options.parentKey,
			node;

		if (change.hasOwnProperty(nodeKey)) {
			node = tree.getNodeByNodeId(before[nodeKey]);
			tree.changeNodeId(node, before[nodeKey], change[nodeKey]);
			this.grid.event.trigger("onCollapserTreeChange");
		}
		if (change.hasOwnProperty(parentKey)) {
			if (Util.isNull(node)) {
				node = tree.getNode(datarow);
			}
			tree.changeParentId(node, before[parentKey], change[parentKey]);
			this.grid.event.trigger("onCollapserTreeChange");
		}
	};

	prototype.__onUpdateDatalist_ah__ = function(datalist, changes, befores) {
		var tree = this.__tree_a__,
			nodeKey = tree._options.nodeKey,
			parentKey = tree._options.parentKey,
			before,
			datarow,
			treeNode,
			nodeIdChanged = [],
			parentIdChanged = [],
			nlen,
			plen,
			temp,
			i = 0,
			len = datalist.length;
		for (; i < len; i++) {
			before = befores[i];
			datarow = datalist[i];
			treeNode = undefined;
			if (before.hasOwnProperty(nodeKey)) {
				if (Util.isNull(treeNode)) {
					treeNode = tree.getNodeByNodeId(before[nodeKey]);
				}
				nodeIdChanged.push({node:treeNode, before:before[nodeKey], newId:datarow[nodeKey]});
			}
			if (before.hasOwnProperty(parentKey)) {
				if (Util.isNull(treeNode)) {
					treeNode = tree.getNode(datarow);
				}
				parentIdChanged.push({node:treeNode, before:before[parentKey], newId:datarow[parentKey]});
			}
		}

		nlen = nodeIdChanged.length;
		plen = parentIdChanged.length;
		if (nlen + plen === 0) {
			return;
		}

		if (nlen + plen > 10) {
			tree.reattach();
		}
		else {
			for (i = 0; i < nlen; i++) {
				temp = nodeIdChanged[i];
				tree.changeNodeId(temp.node, temp.before, temp.newId);
			}
			for (i = 0; i < plen; i++) {
				temp = parentIdChanged[i];
				tree.changeParentId(temp.node, temp.before, temp.newId);
			}
		}
		this.grid.event.trigger("onCollapserTreeChange");
	};

	prototype.__onRemoveDatarow_A__ = function(datarow) {
		this.__tree_a__.destroyNodeByData(datarow);
		this.grid.event.trigger("onCollapserTreeChange");
	};

	prototype.__onRemoveDatalist_ag__ = function(datalist) {
		var i = 0,
			len = datalist.length,
			tree = this.__tree_a__;
		for (; i < len; i++) {
			tree.destroyNodeByData(datalist[i]);
		}
		this.grid.event.trigger("onCollapserTreeChange");
	};

	prototype.__onAfterFilter_as__ = function(filteredList, failedList) {
		var tree = this.__tree_a__;
		if (failedList.length > 0) {
			var dataMgr = this.grid.dataMgr,
				len = filteredList.length,
					indexMap = dataMgr.__idToIdx_b__,
					idKey = dataMgr.idKey,
					pdata,
					i = 0,
					travfn = function(args) {
						if (Util.isNotNull(this.parent)) {
							pdata = this.parent.data;
							if (Util.isNotNull(pdata) && !dataMgr.has(pdata)) {
								filteredList.push(pdata);
								failedList.remove(pdata);
								indexMap[pdata[idKey]] = -1;
							}
						}
						else {
							args.stop = true;
						}
					};

			dataMgr.__reidx_g__();
			tree.reattach();

			for (; i < len; i++) {
				tree.getNode(filteredList[i]).traverse({up:true, fn:travfn});
			}

			tree.reattach(filteredList);
			tree.sortList(filteredList);
			this.grid.event.trigger("onCollapserTreeChange");
		}
		else {
			tree.reattach(filteredList);
			this.grid.event.trigger("onCollapserTreeChange");
			this.__filter_b__(filteredList, failedList);
		}
	};

	prototype.__filter_b__ = function(filteredList, failedList) {
		filteredList.length = 0;
		this.__tree_a__.root.traverseChildren({fn:function(args) {
			if (this._shown) {
				filteredList.push(this.data);
			}
			else {
				failedList.push(this.data);
			}
		}});
	};

	prototype.toggleById = function(id) {
		if (Util.isNotNull(id)) {
			return this.toggleCollapse(this.__tree_a__.getNode(this.grid.dataMgr.getById(id)));
		}
	};

	prototype.toggle = function(datarow) {
		return this.toggleById(this.grid.dataMgr.getId(datarow));
	};

	prototype.toggleByIdx = function(i) {
		return this.toggleById(this.grid.dataMgr.getIdByIdx(i));
	};

	prototype.__clickHeaderValid_bO__ = function(e, colheader) {
		if (Util.hasTagAndClass(e.target, "DIV", this._options.__classCollapser_j__)) {
			return false;
		}
	};

	prototype.__dblclickCanvas_bi__ = function(e, cell) {
		if (Util.hasTagAndClass(e.target, 'DIV', this._options.__classCollapser_j__)) {
			return;
		}
		this.toggleCollapse(this.__tree_a__.getNode(cell.getDatarow()));
	};

	prototype.__keydownColSel_bA__ = function(e, colSelections, lastSelection) {
		e.preventDefault();
		if (Util.isNotNullAnd(colSelections, lastSelection)) {
			var tree = this.__tree_a__,
				collapsed = tree.getNode(lastSelection.getDatarow())._collapsed,
						  datalist = this.grid.dataMgr.datalist,
						  node,
						  row;
			for (row in colSelections) {
				if (colSelections.hasOwnProperty(row)) {
					if (row === "length") {
						continue;
					}
					node = tree.getNode(datalist[row]);
					if (collapsed) {
						this.expand(node);
					}
					else {
						this.collapse(node);
					}
				}
			}
			this.__filterRefresh_g__();
		}
	};

	prototype.__makeTree_d__ = function() {
		var tree = this.__tree_a__,
			i,
			map,
			root;

		tree.__init();
		map = tree.map;
		root = tree.root;
		if (this._options.__beginCollapsed_p__) {
			for (i in map) {
				if (map.hasOwnProperty(i)) {
					map[i]._collapsed = true;
					map[i]._shown = false;
				}
			}
			var first = root.children,
				len = first.length;
			for (i = 0; i < len; i++) {
				first[i]._shown = true;
			}
			root._collapsed = true;
		}
		else {
			for (i in map) {
				if (map.hasOwnProperty(i)) {
					map[i]._collapsed = false;
					map[i]._shown = true;
				}
			}
			root._collapsed = false;
		}
		this.grid.event.trigger("onCollapserTreeChange");
	};


	prototype.__onRenderHeader_aG__ = function(headerHtml) {
		headerHtml.push("<div id='" + this.mid + "h' onmousedown='JGM.m.Collapser." + this.mid + ".toggleMaster();' class='" + this._options.__classCollapser_j__ + " " + this._options.__classMasterCollapser_n__);
		if (this.__tree_a__.root._collapsed) {
			headerHtml.push(" " + this._options.__classCollapsed_k__);
		}
		else {
			headerHtml.push(" " + this._options.__classExpanded_l__);
		}
		headerHtml.push("'></div>");
	};


	prototype.__onRenderCell_aH__ = function(rowIdx, colIdx, datarow, colDef, cellHtml) {
		var node = this.__tree_a__.getNode(datarow);
		if (Util.isNull(node)) {
			return null;
		}

		var id = this.grid.dataMgr.getId(datarow),
			opt = this._options;

		cellHtml.push("<div class='" + opt.__classIndent_m__ + "' style='width:" + (opt.__indentSize_o__ * node.getLevel()) + "px;'></div><div ");
		if (!node.isLeaf()) {
			cellHtml.push("onmousedown=\"JGM.m.Collapser." + this.mid + ".toggleById('" + id + "');\" class='" + opt.__classCollapser_j__);
			if (node._collapsed) {
				cellHtml.push(" " + opt.__classCollapsed_k__);
			}
			else {
				cellHtml.push(" " + opt.__classExpanded_l__);
			}
		}
		else {
			cellHtml.push("class='" + opt.__classCollapser_j__);
		}
		cellHtml.push("'></div>");
	};

	prototype.getLevel = function(datarow) {
		var node = this.__tree_a__.getNode(datarow);
		if (Util.isNull(node)) {
			return null;
		}
		return node.getLevel();
	};



	/**
	  �־��� {@link JGM.TreeNode} �� �����ϴ�. �̹� ���� �ִ°�� �ƹ��͵� ���� �ʽ��ϴ�.

	  @function {} collapse
	  @param {JGM.TreeNode} node - ���� {@link JGM.TreeNode}
	  @param {boolean=} nocheck - true �� ���, ������ Collapser �� ���� ���θ� üũ���� �ʽ��ϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.collapse = function(node, nocheck) {
		if (node._collapsed === true || node.isLeaf()) {
			return;
		}
		node._collapsed = true;
		node.traverseChildren({fn:function(args) {
			this._shown = false;
			if (this._collapsed) {
				args.propagate = false;
			}
		}});
		var collapser = this.__getCollapser_i__(node.data);
		if (collapser.length > 0) {
			this.__setClass_e__(collapser, true);
		}
		if (!nocheck && node.parent === this.__tree_a__.root && this.__tree_a__.root._collapsed === false) {
			this.__setClass_e__(this.__master_c__, this.__tree_a__.root._collapsed = true);
		}
	};


	/**
	  �־��� {@link JGM.TreeNode} �� ��Ĩ�ϴ�. �̹� ������ �ִ°�� �ƹ��͵� ���� �ʽ��ϴ�.

	  @function {} expand
	  @param {JGM.TreeNode} node - ���� {@link JGM.TreeNode}
	  @param {boolean=} nocheck - true �� ���, ������ Collapser �� ��ġ�� ���θ� üũ���� �ʽ��ϴ�.

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.expand = function(node, nocheck) {
		if (node._collapsed === false || node.isLeaf()) {
			return;
		}
		node._collapsed = false;
		node.traverseChildren({fn:function(args) {
			this._shown = true;
			if (this._collapsed) {
				args.propagate = false;
			}
		}});
		var collapser = this.__getCollapser_i__(node.data),
			tree = this.__tree_a__;
		if (collapser.length > 0) {
			this.__setClass_e__(collapser, false);
		}
		if (!nocheck && node.parent === tree.root) {
			var first = tree.root.children,
				len = first.length,
					i = 0;
			for (; i < len; i++) {
				if (first[i]._collapsed) {
					return;
				}
			}
			this.__setClass_e__(this.__master_c__, tree.root._collapsed = false);
		}
	};

	prototype.__setClass_e__ = function(ob, collapsed) {
		if (Util.isNull(ob)) {
			return;
		}
		var opt = this._options;
		if (collapsed) {
			ob.addClass(opt.__classCollapsed_k__).removeClass(opt.__classExpanded_l__);
		}
		else {
			ob.addClass(opt.__classExpanded_l__).removeClass(opt.__classCollapsed_k__);
		}
	};


	/**
	  ������ Collapser �� ����մϴ�. ù��° ������ ������ �ϳ��� ���� ������
	  ù��° ������ ��� ��ġ��, ��� ������ �ִ� ��� ��� �����ϴ�.

	  @function {} toggleMaster

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.toggleMaster = function() {
		var root = this.__tree_a__.root,
			first = root.children,
			len = first.length,
			i = 0;
		if (root._collapsed) {
			for (; i < len; i++) {
				this.expand(first[i], true);
			}
			this.__setClass_e__(this.__master_c__, root._collapsed = false);
		}
		else {
			for (; i < len; i++) {
				this.collapse(first[i], true);
			}
			this.__setClass_e__(this.__master_c__, root._collapsed = true);
		}
		this.__filterRefresh_g__();
	};


	/**
	  �־��� {@link JGM.TreeNode} �� ����մϴ�.

	  @function {} toggleCollapse
	  @param {JGM.TreeNode} node - ����� {@link JGM.TreeNode}
	  @see expand
	  @see collapse

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	prototype.toggleCollapse = function(node) {
		var res;
		if (node._collapsed) {
			res = this.expand(node);
		}
		else {
			res = this.collapse(node);
		}
		this.__filterRefresh_g__();
		return res;
	};


	prototype.__onCheckChange_f__ = function(datarow, check) {
		var node = this.__tree_a__.getNode(datarow),
			checkMgr = this.checkMgr,
			inputs = [],
			input;
		if (check) {
			node.traverseChildren({fn:function(args) {
				if (checkMgr.isChecked(this.data)) {
					args.propagate = false;
				}
				else {
					checkMgr.__add_f__(this.data);
					if (Util.isNotNull(input = checkMgr.getCheckbox(this.data))) {
						inputs.push(input);
					}
				}
			}});
			node.traverseParent({up:true, fn:function(args) {
				if (Util.isNull(this.data) || checkMgr.isChecked(this.data)) {
					args.stop = true;
				}
				else {
					checkMgr.__add_f__(this.data);
					if (Util.isNotNull(input = checkMgr.getCheckbox(this.data))) {
						inputs.push(input);
					}
				}
			}});
			JGM.CheckManager.__check_a__($(inputs));
			checkMgr.__updateMaster_e__();
		}
		else {
			node.traverseChildren({fn:function(args) {
				if (!checkMgr.isChecked(this.data)) {
					args.propagate = false;
				}
				else {
					checkMgr.__remove_g__(this.data);
					if (Util.isNotNull(input = checkMgr.getCheckbox(this.data))) {
						inputs.push(input);
					}
				}
			}});
			node.traverseParent({up:true, fn:function(args) {
				if (Util.isNull(this.data) || !checkMgr.isChecked(this.data)) {
					args.stop = true;
				}
				else {
					var i = 0,
				children = this.children,
				clen = children.length;
			for (; i < clen; i++) {
				if (checkMgr.isChecked(children[i].data)) {
					args.stop = true;
					return;
				}
			}
			checkMgr.__remove_g__(this.data);
			if (Util.isNotNull(input = checkMgr.getCheckbox(this.data))) {
				inputs.push(input);
			}
				}
			}});
			JGM.CheckManager.__uncheck_b__($(inputs));
		}
	};


	prototype.__filterRefresh_g__ = function() {
		this.__filter_b__(this.grid.dataMgr.datalist, this.grid.dataMgr.failed);
		this.grid.dataMgr.__finish_k__();
	};

	prototype.__getCollapser_i__ = function(datarow) {
		if (Util.isNull(datarow)) {
			return $([]);
		}

		var found = Util.findFirstByTagAndClass(
				this.grid.view.getCell(this.grid.dataMgr.getIdx(datarow), this.grid.colDefMgr.getIdxByKey(this.key)),
				"DIV",
				this._options.__classCollapser_j__);

		if (found === undefined) {
			return $([]);
		}
		else {
			return $(found);
		}
	};

	prototype.__getMaster_h__ = function() {
		this.__master_c__ = $(document.getElementById(this.mid + "h"));
	};

}());
