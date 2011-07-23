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

(function() {
var JGM = goog.getObjectByName('jx.grid'),
	Util = goog.getObjectByName('jx.util'),
	BaseModule = goog.getObjectByName('jx.grid.BaseModule');

 goog.exportSymbol('jx.grid.DataCreator', DataCreator);
JGM._add("DataCreator", DataCreator);

 /**
   DataCreator ���. ���ο� �������� ������ �߰��� ����ϴ� ����Դϴ�.
   @module DataCreator

   @requires JGM
   @requires JGM.Grid
   @requires JGM.ColDefManager
   @requires JGM.EventManager
   @requires JGM.ViewportManager
   */

 /**
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
	  @... {JGM.Grid} args.grid - DataCreator �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
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
		  DataCreator �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

		  @var {JGM.Grid} grid

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		this.grid = args.grid;

		/**
		  ���ο� ������ ������ �����ϴ� {@link JGM.DataCreator DataCreator} �ν��Ͻ� �Դϴ�.

		  @var {JGM.DataCreator} JGM.Grid.creator

		  @author ����ȣ
		  @since 1.1.6
		  @version 1.1.6
		  */
		this.grid.creator = this;

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
'_background': "#dfdfdf",

				  /**
					����� border �� �β��� ���մϴ�. <br>�⺻��:<code>0</code>

					@type {number=} JGM.DataCreator.options.borderThickness
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_borderThickness': 0,

				  /**
					����� border ��Ÿ���� ���մϴ�. <br>�⺻��:<code>"solid #D6D6D6"</code>

					@type {string=} JGM.DataCreator.options.border
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_border': "solid #D6D6D6",

				  /**
					��� ���� input �� border ��Ÿ���� ���մϴ�. <br>�⺻��:<code>"solid #A7A7A7"</code>

					@type {string=} JGM.DataCreator.options.inputBorder
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_inputBorder': "solid #A7A7A7",

				  /**
					��� ���� input �� �β��� ���մϴ�. <br>�⺻��:<code>1</code>

					@type {number=} JGM.DataCreator.options.inputBorderThickness
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_inputBorderThickness': 1,

				  /**
					��� ���� input �� ���̸� ���մϴ�. <br>�⺻��:<code>18</code>

					@type {number=} JGM.DataCreator.options.inputHeight
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_inputHeight': 18,

				  /**
					��� ���� input �� margin �� ���մϴ�. <br>�⺻��:<code>8</code>

					@type {number=} JGM.DataCreator.options.inputMargin
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_inputMargin': 8,

				  /**
					��� ���� �÷� ���� margin �� ���մϴ�. <br>�⺻��:<code>2</code>

					@type {number=} JGM.DataCreator.options.nameMargin
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_nameMargin': 2,

				  /**
					��� ���� �÷� ���� font �� ���մϴ�. <br>�⺻��:<code>"12px Arial,Helvetica,sans-serif"</code>

					@type {string=} JGM.DataCreator.options.font
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_font': "12px Arial,Helvetica,sans-serif",

				  /**
					����� ���̸� ���մϴ�. <br>�⺻��:<code>28</code>

					@type {number=} JGM.DataCreator.options.height
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_height': 28,

				  /**
					����� padding �� ���մϴ�. <br>�⺻��:<code>3</code>

					@type {number=} JGM.DataCreator.options.padding
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_padding': 3,

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� �������� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"creator-icon"</code>

					@type {string=} JGM.DataCreator.options.classCreatorIcon
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_classCreatorIcon': "creator-icon",

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� �������� �̹��� url �Դϴ�. <br>�⺻��:<code>imageUrl + "data-creator-icon.png"</code>

					@type {string=} JGM.DataCreator.options.creatorIconUrl
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_creatorIconUrl': this.grid._options['imageUrl'] + "data-creator-icon.png",

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� ������ �̹����� �� �Դϴ�. <br>�⺻��:<code>13</code>

					@type {number=} JGM.DataCreator.options.creatorIconWidth
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_creatorIconWidth': 13,

				  /**
					{@link JGM.MenuBar MenuBar} �� �߰��� ������ �̹����� ���� �Դϴ�. <br>�⺻��:<code>13</code>

					@type {number=} JGM.DataCreator.options.creatorIconHeight
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_creatorIconHeight': 13,

				  /**
					����� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"data-creator"</code>

					@type {string=} JGM.DataCreator.options.classCreator
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_classCreator': "data-creator",

				  /**
					��� ���� �÷� ���� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"data-creator-name"</code>

					@type {string=} JGM.DataCreator.options.classColName
					@private

					@author ����ȣ
					@since 1.1.1
					@version 1.1.1
					*/
				  '_classColName': "data-creator-name",

				  /**
					��� ���� input tag �� ����Ǵ� border radius �Դϴ�. <br>�⺻��:<code>3</code>

					@type {number=} JGM.DataCreator.options.inputBorderRadius
					@private

					@author ����ȣ
					@since 1.1.7
					@version 1.1.7
					*/
				  '_inputBorderRadius': 3
		};

		this._options = JGM._extend(options, args['options'], {
background:"_background",
borderThickness:"_borderThickness",
border:"_border",
inputBorder:"_inputBorder",
inputBorderThickness:"_inputBorderThickness",
inputHeight:"_inputHeight",
inputMargin:"_inputMargin",
nameMargin:"_nameMargin",
font:"_font",
height:"_height",
padding:"_padding",
classCreatorIcon:"_classCreatorIcon",
creatorIconUrl:"_creatorIconUrl",
creatorIconWidth:"_creatorIconWidth",
creatorIconHeight:"_creatorIconHeight",
classCreator:"_classCreator",
classColName:"_classColName",
inputBorderRadius:"_inputBorderRadius"
});

this._inputMap = {};

this.__init();
}

DataCreator.getInstance = function(args) {
	return new DataCreator(args);
};

var prototype = DataCreator.prototype;

prototype.__init = function() {
	this._creator =
		$("<div class='" + this._options['_classCreator'] + "'>")
		.appendTo(this._ctnr);

	this.bindEvents();
};

prototype.bindEvents = function() {
	var events = {
'onRenderModules': this._onRenderModules,
				 'onCreateCss': this._onCreateCss,
				 'onDestroy': this._destroy
	};
	this.grid.event.bind(events, this);
};

prototype._onCreateCss = function() {
	var gridId = "#" + this.grid.mid + " .",
		o = this._options,
		border = o._borderThickness + "px " + o._border,
		rules = [];

	rules.push(gridId + o._classCreator + "{" + JGM._CONST._cssUnselectable + "float:left;width:100%;padding-left:8px;background:" + o._background + ";border-top:" + border + ";font:" + o._font + "}");
	rules.push(gridId + o._classCreator + " button{float:left;margin:" + o._padding + "px " + o._padding + "px 0 0;height:" + (o._height - 2 * o._padding) + "px}");
	rules.push(gridId + o._classCreator + " input{float:left;padding:0;margin-top:" + ((o._height - o._inputHeight - 2 * o._inputBorderThickness) / 2) + "px;height:" + o._inputHeight + "px;border:" + o._inputBorderThickness + "px " + o._inputBorder + ";border-radius:" + o._inputBorderRadius + "px;-moz-border-radius:" + o._inputBorderRadius + "px}");
	rules.push(gridId + o.classCol + "{float:left;overflow:hidden;white-space:nowrap;line-height:" + o._height + "px;margin-right:" + o._inputMargin + "px}");
	rules.push(gridId + o._classColName + "{float:left;margin-right:" + o._nameMargin + "px}");
	rules.push(gridId + o._classCreatorIcon + "{background:url(" + o._creatorIconUrl + ") no-repeat center;width:" + o._creatorIconWidth + "px;height:" + o._creatorIconHeight + "px}");

	return rules.join("");
};

prototype._onRenderModules = function() {
	var html = [],
		colDefs = this.grid.colDefMgr.getAll(),
		len = colDefs.length,
		colDef,
		opt = this._options,
		classCol = opt.classCol,
		classColName = opt._classColName,
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

	if (Util.isNotNull(this.grid.menubar)) {
		this.grid.menubar.addIcon(opt._classCreatorIcon, "������ �ο츦 �߰��մϴ�.", opt._creatorIconWidth, opt._creatorIconHeight, function() {
				creator.toggle("fast");
				});
		creator.hide();
	}
};

prototype._addData = function() {
	var key,
		imap = this._inputMap,
		cmgr = this.grid.colDefMgr,
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
	this.grid.event.trigger("onAfterDataCreate", [newData]);
	this.grid.dataMgr.add(newData, {'isNew':true});
};

prototype._reset = function() {
	var key,
		cmgr = this.grid.colDefMgr,
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
