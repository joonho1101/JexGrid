goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.data.DataManager');

goog.provide('jx.grid.TooltipManager');

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

 goog.exportSymbol('jx.grid.TooltipManager', TooltipManager);
 JGM._add("TooltipManager", TooltipManager);

/**
TooltipManager ���. �÷� ������� ����ϴ� ����Դϴ�.
@module TooltipManager

@requires JGM
@requires JGM.Grid
@requires JGM.EventManager
@requires JGM.Cell
 */

/**
TooltipManager Ŭ����. �÷� ���� ���� ������ �ο� ���İ� �÷� �¿� ��ġ ���� �� �÷�
���� ��ɵ��� �����մϴ�.

@class {TooltipManager} JGM.TooltipManager

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

/**
TooltipManager ����Ʈ���� �Դϴ�.

@constructor {TooltipManager} TooltipManager
@param {Object} args - TooltipManager ��� �Ķ���� ������Ʈ
@... {jQuery} args.container - TooltipManager �� ���� �����̳� ������Ʈ
@... {JGM.Grid} args.grid - TooltipManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {Object} args.options - TooltipManager �ɼ� ������Ʈ
@returns {TooltipManager} TooltipManager ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function TooltipManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� TooltipManager ��� ���� ���̵��Դϴ�. �б� ����.

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	TooltipManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;
	
	/**
	�׸��� ������ �����ϴ� {@link JGM.TooltipManager TooltipManager} �ν��Ͻ� �Դϴ�.

	@var {JGM.TooltipManager} JGM.Grid.tooltip

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.tooltip = this;

	this._ctnr = args['container'];


	/**
	TooltipManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		���� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-tooltip"</code>

		@type {string=} JGM.TooltipManager.options.classTooltip
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classTooltip':					"jgrid-tooltip",

		/**
		������ ���콺�� �ǽð����� ����ٴ����� ���մϴ�. true �� ��� ����ٴϰ�,
		false �� ��� ������ ��ġ�� �����ֽ��ϴ�.<br>�⺻��:<code>true</code>

		@type {boolean=} JGM.TooltipManager.options.tooltipSyncEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_tooltipSyncEnabled':			true,

		/**
		������ ���콺 �����ͷκ����� ���� offset �� ���մϴ�.<br>�⺻��:<code>0</code>

		@type {number=} JGM.TooltipManager.options.offsetX
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_offsetX':					0,

		/**
		������ ���콺 �����ͷκ����� �Ʒ� ���� offset �� ���մϴ�.<br>�⺻��:<code>18</code>

		@type {number=} JGM.TooltipManager.options.offsetY
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_offsetY':					18,

		/**
		������ ����� �����մϴ�. <br>�⺻��:<code>"#F5F5F5"</code>

		@type {string=} JGM.TooltipManager.options.background
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_background':					"#F5F5F5",

		/**
		������ border �� �����մϴ�. <br>�⺻��:<code>"1px solid #868686"</code>

		@type {string=} JGM.TooltipManager.options.border
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_border':						"1px solid #868686",

		/**
		������ padding �� �����մϴ�. <br>�⺻��:<code>"2px 10px"</code>

		@type {string=} JGM.TooltipManager.options.padding
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_padding':					"2px 10px",

		/**
		������ ��Ʈ�� �����մϴ�. <br>�⺻��:<code>"14px Arial,Helvetica,sans-serif"</code>

		@type {string=} JGM.TooltipManager.options.font
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_font':						"14px Arial,Helvetica,sans-serif",

		/**
		������ ���ڻ��� �����մϴ�. <br>�⺻��:<code>"#333"</code>

		@type {string=} JGM.TooltipManager.options.color
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_color':				"#333"
	};

	this._options = JGM._extend(options, args['options'], {
		classTooltip:"_classTooltip",
		tooltipSyncEnabled:"_tooltipSyncEnabled",
		offsetX:"_offsetX",
		offsetY:"_offsetY",
		background:"_background",
		border:"_border",
		padding:"_padding",
		font:"_font",
		color:"_color"
	});
	
	this._tooltip;
	this.__init();
}

TooltipManager.getInstance = function(args) {
	return new TooltipManager(args);
};

var prototype = TooltipManager.prototype;

prototype.__init = function() {
	this.grid.event.bind({
		'onCreateCss': this._onCreateCss,
		'onDestroy': this._destroy,
		'mouseoutCanvas': this._mouseoutCanvas,
		'mousemoveCanvas': this._mousemoveCanvas,
		'mouseoverCanvas': this._mouseoverCanvas
	}, this);
};

prototype._destroy = function() {
	JGM._destroy(this, {
		name: "TooltipManager",
		path: "tooltip",
		"$": "_tooltip",
		property: "_ctnr",
		map: "_options"
	});
};

prototype._onCreateCss = function() {
	var gridId = "#" + this.grid.mid + " .",
		opt = this._options,
		rules = [];

	rules.push(gridId + opt._classTooltip + "{position:absolute;z-index:10;background:" + opt._background + ";border:" + opt._border + ";padding:" + opt._padding + ";color:" + opt._color + ";font:" + opt._font + "}");

	return rules.join("");
};

prototype._mouseoutCanvas = function(e, cell) {
	if (Util.isNotNull(this._tooltip)) {
		this._ctnr[0].removeChild(this._tooltip[0]);
		delete this._tooltip;
	}
};

prototype._mousemoveCanvas = function(e, cell) {
	var opt = this._options;
	if (opt._tooltipSyncEnabled && Util.isNotNull(this._tooltip)) {
		this._tooltip.css({'left':(e.pageX + opt._offsetX) + "px", 'top':(e.pageY + opt._offsetY) + "px"});
	}
};

prototype._mouseoverCanvas = function(e, cell) {
	if (cell.getColDef().tooltipEnabled) {
		if (Util.isNull(this._tooltip)) {
			var opt = this._options,
				temp = document.createElement("div");
			temp.innerHTML = "<div class='" + opt._classTooltip + "' style='left:" + (e.pageX + opt._offsetX) + "px;top:" + (e.pageY + opt._offsetY) + "px'>" + cell.getValue() + "</div>";
			this._tooltip = $(temp.firstChild);
			this._ctnr[0].appendChild(this._tooltip[0]);
		}
	}
};

}());
