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

 goog.provide('JGM.module.TooltipManager');

 goog.exportSymbol('JGM.module.TooltipManager', TooltipManager);

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

@class {public TooltipManager} JGM.TooltipManager

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

/**
TooltipManager ����Ʈ���� �Դϴ�.

@constructor {public TooltipManager} TooltipManager
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

	@var {public final String} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	TooltipManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {public JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;
	
	/**
	�׸��� ������ �����ϴ� {@link JGM.TooltipManager TooltipManager} �ν��Ͻ� �Դϴ�.

	@var {public JGM.TooltipManager} JGM.Grid.tooltip

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.tooltip = this;

	this._ctnr = args.container;


	/**
	TooltipManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@var {private Object} options

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		���� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-tooltip"</code>

		@var {private optional String} JGM.TooltipManager.options.classTooltip

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classTooltip_a__:					"jgrid-tooltip",

		/**
		������ ���콺�� �ǽð����� ����ٴ����� ���մϴ�. true �� ��� ����ٴϰ�,
		false �� ��� ������ ��ġ�� �����ֽ��ϴ�.<br>�⺻��:<code>true</code>

		@var {private optional Boolean} JGM.TooltipManager.options.tooltipSyncEnabled

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__tooltipSyncEnabled_b__:			true,

		/**
		������ ���콺 �����ͷκ����� ���� offset �� ���մϴ�.<br>�⺻��:<code>0</code>

		@var {private optional int} JGM.TooltipManager.options.offsetX

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__offsetX_c__:					0,

		/**
		������ ���콺 �����ͷκ����� �Ʒ� ���� offset �� ���մϴ�.<br>�⺻��:<code>18</code>

		@var {private optional int} JGM.TooltipManager.options.offsetY

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__offsetY_d__:					18,

		/**
		������ ����� �����մϴ�. <br>�⺻��:<code>"#F5F5F5"</code>

		@var {private optional String} JGM.TooltipManager.options.background

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__background_e__:					"#F5F5F5",

		/**
		������ border �� �����մϴ�. <br>�⺻��:<code>"1px solid #868686"</code>

		@var {private optional String} JGM.TooltipManager.options.border

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__border_f__:						"1px solid #868686",

		/**
		������ padding �� �����մϴ�. <br>�⺻��:<code>"2px 10px"</code>

		@var {private optional String} JGM.TooltipManager.options.padding

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__padding_g__:					"2px 10px",

		/**
		������ ��Ʈ�� �����մϴ�. <br>�⺻��:<code>"14px Arial,Helvetica,sans-serif"</code>

		@var {private optional String} JGM.TooltipManager.options.font

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__font_h__:						"14px Arial,Helvetica,sans-serif",

		/**
		������ ���ڻ��� �����մϴ�. <br>�⺻��:<code>"#333"</code>

		@var {private optional String} JGM.TooltipManager.options.color

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__color_i__:				"#333"
	};

	this._options = JGM.__extend_e__(options, args.options, {
		classTooltip:"__classTooltip_a__",
		tooltipSyncEnabled:"__tooltipSyncEnabled_b__",
		offsetX:"__offsetX_c__",
		offsetY:"__offsetY_d__",
		background:"__background_e__",
		border:"__border_f__",
		padding:"__padding_g__",
		font:"__font_h__",
		color:"__color_i__"
	});
	
	this.__tooltip_a__;
	this.__init();
}

TooltipManager.getInstance = function(args) {
	return new TooltipManager(args);
};

var prototype = TooltipManager.prototype;

prototype.__init = function() {
	this.grid.event.bind({
		onCreateCss: this.__onCreateCss_V__,
		onDestroy: this.__destroy_aA__,
		mouseoutCanvas: this.__mouseoutCanvas_bb__,
		mousemoveCanvas: this.__mousemoveCanvas_bc__,
		mouseoverCanvas: this.__mouseoverCanvas_bd__
	}, this);
};

prototype.__destroy_aA__ = function() {
	JGM._destroy(this, {
		name: "TooltipManager",
		path: "tooltip",
		"$": "__tooltip_a__",
		property: "_ctnr",
		map: "_options"
	});
};

prototype.__onCreateCss_V__ = function() {
	var gridId = "#" + this.grid.mid + " .",
		opt = this._options,
		rules = [];

	rules.push(gridId + opt.__classTooltip_a__ + "{position:absolute;z-index:10;background:" + opt.__background_e__ + ";border:" + opt.__border_f__ + ";padding:" + opt.__padding_g__ + ";color:" + opt.__color_i__ + ";font:" + opt.__font_h__ + "}");

	return rules.join("");
};

prototype.__mouseoutCanvas_bb__ = function(e, cell) {
	if (Util.isNotNull(this.__tooltip_a__)) {
		this._ctnr[0].removeChild(this.__tooltip_a__[0]);
		delete this.__tooltip_a__;
	}
};

prototype.__mousemoveCanvas_bc__ = function(e, cell) {
	var opt = this._options;
	if (opt.__tooltipSyncEnabled_b__ && Util.isNotNull(this.__tooltip_a__)) {
		this.__tooltip_a__.css({left:(e.pageX + opt.__offsetX_c__) + "px", top:(e.pageY + opt.__offsetY_d__) + "px"});
	}
};

prototype.__mouseoverCanvas_bd__ = function(e, cell) {
	if (cell.getColDef().tooltipEnabled) {
		if (Util.isNull(this.__tooltip_a__)) {
			var opt = this._options,
				temp = document.createElement("div");
			temp.innerHTML = "<div class='" + opt.__classTooltip_a__ + "' style='left:" + (e.pageX + opt.__offsetX_c__) + "px;top:" + (e.pageY + opt.__offsetY_d__) + "px'>" + cell.getValue() + "</div>";
			this.__tooltip_a__ = $(temp.firstChild);
			this._ctnr[0].appendChild(this.__tooltip_a__[0]);
		}
	}
};

JGM._add("TooltipManager", TooltipManager);
}());
