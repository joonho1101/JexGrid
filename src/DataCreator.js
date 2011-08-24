window.console && window.console.log && window.console.log('reading javascript source "DataCreator.js"...');//IF_DEBUG

goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');

goog.provide('jx.grid.DataCreator');

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

 goog.exportSymbol('jx.grid.DataCreator', DataCreator);

 /**
   DataCreator ���. ���ο� �������� ������ �߰��� ����ϴ� ����Դϴ�.
   DataCreator Ŭ����. ���ο� �������� ������ �߰��� ����մϴ�.

   @class {DataCreator} JGM.DataCreator

   @author ����ȣ
   @since 1.1.1
   @version 1.1.7
   */

	/**
	  DataCreator ����Ʈ���� �Դϴ�.

	  @constructor {DataCreator} DataCreator
	  @param {Object} args - DataCreator ��� �Ķ���� ������Ʈ
	  @... {jQuery} args.container - DataCreator �� ���� �����̳� ������Ʈ
	  @... {jx.grid.Grid} args.grid - DataCreator �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
	  @... {Object} args.options - DataCreator �ɼ� ������Ʈ
	  @returns {DataCreator} DataCreator ��� �ν��Ͻ��� �����մϴ�.

	  @author ����ȣ
	  @since 1.1.1
	  @version 1.1.1
	  */
	function DataCreator(args) {
		/**
		  {@link JGM} �� �Ҵ����ִ� DataCreator ��� ���� ���̵��Դϴ�. �б� ����.

		  @var {string} mid

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		this.mid = args.mid;

		this._ctnr = args['container'];

		this._creator;

		/**
		  DataCreator �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�.

		  @var {jx.grid.Grid} grid

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		this.grid = args.grid;

		/**
		  ���ο� ������ ������ �����ϴ� {@link JGM.DataCreator DataCreator} �ν��Ͻ� �Դϴ�.

		  @var {JGM.DataCreator} jx.grid.Grid.creator

		  @author ����ȣ
		  @since 1.1.6
		  @version 1.1.6
		  */
		this.grid['creator'] = this;

		/**
		  DataCreator ����� �⺻ �ɼ� ������ �����մϴ�.

		  @type {Object} options
		  @private

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		var options = {
			/**
			  ����� �⺻ ����� ���մϴ�. <br>�⺻��:<code>"#dfdfdf"</code>

			  @type {string=} JGM.DataCreator.options.background
			  @private

			  @author ����ȣ
			  @since 1.1.1
			  @version 1.1.1
			  */
'background': "#dfdfdf",

				  /**
					����� border �� �β��� ���մϴ�. <br>�⺻��:<code>0</code>

					@type {number=} JGM.DataCreator.options.borderThickness
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'borderThickness': 0,

				  /**
					����� border ��Ÿ���� ���մϴ�. <br>�⺻��:<code>"solid #D6D6D6"</code>

					@type {string=} JGM.DataCreator.options.border
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'border': "solid #D6D6D6",

				  /**
					��� ���� input �� border ��Ÿ���� ���մϴ�. <br>�⺻��:<code>"solid #A7A7A7"</code>

					@type {string=} JGM.DataCreator.options.inputBorder
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'inputBorder': "solid #A7A7A7",

				  /**
					��� ���� input �� �β��� ���մϴ�. <br>�⺻��:<code>1</code>

					@type {number=} JGM.DataCreator.options.inputBorderThickness
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'inputBorderThickness': 1,

				  /**
					��� ���� input �� ���̸� ���մϴ�. <br>�⺻��:<code>18</code>

					@type {number=} JGM.DataCreator.options.inputHeight
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'inputHeight': 18,

				  /**
					��� ���� input �� margin �� ���մϴ�. <br>�⺻��:<code>8</code>

					@type {number=} JGM.DataCreator.options.inputMargin
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'inputMargin': 8,

				  /**
					��� ���� �÷� ���� margin �� ���մϴ�. <br>�⺻��:<code>2</code>

					@type {number=} JGM.DataCreator.options.nameMargin
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'nameMargin': 2,

				  /**
					��� ���� �÷� ���� font �� ���մϴ�. <br>�⺻��:<code>"12px Arial,Helvetica,sans-serif"</code>

					@type {string=} JGM.DataCreator.options.font
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'font': "12px Arial,Helvetica,sans-serif",

				  /**
					����� ���̸� ���մϴ�. <br>�⺻��:<code>28</code>

					@type {number=} JGM.DataCreator.options.height
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'height': 28,

				  /**
					����� padding �� ���մϴ�. <br>�⺻��:<code>3</code>

					@type {number=} JGM.DataCreator.options.padding
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'padding': 3,

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� �������� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"creator-icon"</code>

					@type {string=} JGM.DataCreator.options.classCreatorIcon
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'classCreatorIcon': "creator-icon",

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� �������� �̹��� url �Դϴ�. <br>�⺻��:<code>imageUrl + "data-creator-icon.png"</code>

					@type {string=} JGM.DataCreator.options.creatorIconUrl
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'creatorIconUrl': this.grid._options['imageUrl'] + "data-creator-icon.png",

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� ������ �̹����� �� �Դϴ�. <br>�⺻��:<code>13</code>

					@type {number=} JGM.DataCreator.options.creatorIconWidth
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'creatorIconWidth': 13,

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� ������ �̹����� ���� �Դϴ�. <br>�⺻��:<code>13</code>

					@type {number=} JGM.DataCreator.options.creatorIconHeight
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'creatorIconHeight': 13,

				  /**
					����� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"data-creator"</code>

					@type {string=} JGM.DataCreator.options.classCreator
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'classCreator': "data-creator",

				  /**
					��� ���� �÷� ���� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"data-creator-name"</code>

					@type {string=} JGM.DataCreator.options.classColName
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  'classColName': "data-creator-name",

				  /**
					��� ���� input tag �� ����Ǵ� border radius �Դϴ�. <br>�⺻��:<code>3</code>

					@type {number=} JGM.DataCreator.options.inputBorderRadius
					@private

					@author ����ȣ
					@since 1.1.7
					@version 1.1.7
					*/
				  'inputBorderRadius': 3
		};

		this._options = JGM._extend(options, args['options']);

this._inputMap = {};

this.__init();
}

DataCreator.getInstance = function(args) {
	return new DataCreator(args);
};

var prototype = DataCreator.prototype;

prototype.__init = function() {
	this._creator =
		$("<div class='" + this._options['classCreator'] + "'>")
		.appendTo(this._ctnr);

	this.bindEvents();
};

prototype.bindEvents = function() {
	var events = {
'onRenderModules': this._onRenderModules,
				 'onCreateCss': this._onCreateCss,
				 'onDestroy': this._destroy
	};
	this.grid['event'].bind(events, this);
};

prototype._onCreateCss = function() {
	var gridId = "#" + this.grid['mid'] + " .",
		opt = this._options,
		border = opt['borderThickness'] + "px " + opt['border'],
		rules = [];

	rules.push(gridId + opt['classCreator'] + "{" + JGM._CONST._cssUnselectable + "float:left;width:100%;padding-left:8px;background:" + opt['background'] + ";border-top:" + border + ";font:" + opt['font'] + "}");
	rules.push(gridId + opt['classCreator'] + " button{float:left;margin:" + opt['padding'] + "px " + opt['padding'] + "px 0 0;height:" + (opt['height'] - 2 * opt['padding']) + "px}");
	rules.push(gridId + opt['classCreator'] + " input{float:left;padding:0;margin-top:" + ((opt['height'] - opt['inputHeight'] - 2 * opt['inputBorderThickness']) / 2) + "px;height:" + opt['inputHeight'] + "px;border:" + opt['inputBorderThickness'] + "px " + opt['inputBorder'] + ";border-radius:" + opt['inputBorderRadius'] + "px;-moz-border-radius:" + opt['inputBorderRadius'] + "px}");
	rules.push(gridId + opt['classCol'] + "{float:left;overflow:hidden;white-space:nowrap;line-height:" + opt['height'] + "px;margin-right:" + opt['inputMargin'] + "px}");
	rules.push(gridId + opt['classColName'] + "{float:left;margin-right:" + opt['nameMargin'] + "px}");
	rules.push(gridId + opt['classCreatorIcon'] + "{background:url(" + opt['creatorIconUrl'] + ") no-repeat center;width:" + opt['creatorIconWidth'] + "px;height:" + opt['creatorIconHeight'] + "px}");

	return rules.join("");
};

prototype._onRenderModules = function() {
	var html = [],
		colDefs = this.grid['colDefMgr'].getAll(),
		len = colDefs.length,
		colDef,
		opt = this._options,
		classCol = opt['classCol'],
		classColName = opt['classColName'],
		thisIns = this,
		creator = this._creator,
		imap = this._inputMap,
		i = 0,
		keyupfn = function(e) {
			if (e.which === Util.keyMapKeydown.enter) {
				thisIns._addData();
			}
		};

	for (; i < len; i++) {
		colDef = colDefs[i];
		if (colDef['inputOnCreate'] === true) {
			html.push("<div key='" + colDef['key'] + "' class='" + classCol + "'><div class='" + classColName + "'>" + colDef['name'] + "</div><input type='text' value='" + Util.ifNull(colDef['defaultValue'], "") + "' style='width:" + colDef['width'] + "px'/></div>");
		}
	}

	creator[0].innerHTML = html.join("") + "<button type='button' onclick='JGM.m.DataCreator." + this.mid + "._addData()'>���</button><button type='button' onclick='JGM.m.DataCreator." + this.mid + "._reset()'>�ʱ�ȭ</button>";

	for (i = 0; i < len; i++) {
		colDef = colDefs[i];
		if (colDef['inputOnCreate'] === true) {
			imap[colDef['key']] = creator.find("div[key='" + colDef['key'] + "'] input").keyup(keyupfn);
		}
	}

	if (Util.isNotNull(this.grid['menubar'])) {
		this.grid['menubar'].addIcon(opt['classCreatorIcon'], "������ �ο츦 �߰��մϴ�.", opt['creatorIconWidth'], opt['creatorIconHeight'], function() {
				creator.toggle("fast");
				});
		creator.hide();
	}
};

prototype._addData = function() {
	var key,
		imap = this._inputMap,
		cmgr = this.grid['colDefMgr'],
		colDef,
		input,
		newData = {},
		colDefs = cmgr.getAll(),
		len = colDefs.length,
		i = 0;
	for (key in imap) {
		if (imap.hasOwnProperty(key)) {
			colDef = cmgr.getByKey(key);
			input = imap[key];
		}
	}
	for (; i < len; i++) {
		colDef = colDefs[i];
		key = colDef['key'];
		if (imap.hasOwnProperty(key)) {
			newData[key] = imap[key][0].value;
		}
		else if (colDef['defaultValue'] !== undefined) {
			newData[key] = colDef['defaultValue'];
		}
	}

	/**
	  ���ο� �����͸� ������ �Ϸ��ϰ� �׸��忡 �Է��ϱ� ���� �߻��Ǵ� �̺�Ʈ�Դϴ�.

	  @event {Event} onAfterDataCreate
	  @param {Object} newData - ���� ������ �ο� ������

	  @author ����ȣ
	  @since 1.1.1
	  @version 1.1.1
	  */
	this.grid['event'].trigger("onAfterDataCreate", [newData], true);
	this.grid['dataMgr'].add(newData, {'isNew':true});
};

prototype._reset = function() {
	var key,
		cmgr = this.grid['colDefMgr'],
		colDef,
		imap = this._inputMap;
	for (key in imap) {
		if (imap.hasOwnProperty(key)) {
			colDef = cmgr.getByKey(key);
			if (colDef['defaultValue'] !== undefined) {
				imap[key][0].value = colDef['defaultValue'];
			}
		}
	}
};

prototype._destroy = function() {
	var i,
		imap = this._inputMap;
	for (i in imap) {
		if (imap.hasOwnProperty(i)) {
			JGM._delete$(imap, i);
		}
	}

	JGM._destroy(this, {
name: "DataCreator",
path: "creator",
"$": "_creator",
map: "_inputMap _options"
});
};
}());
