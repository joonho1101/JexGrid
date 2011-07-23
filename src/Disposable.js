goog.require('jx.util');

goog.provide('jx.lang.Disposable');

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

	var Util.goog.getObjectByName('jx.util');
 goog.exportSymbol('jx.lang.Disposable', Disposable);
 goog.exportProperty(Disposable.prototype, 'dispose', dispose);

 /**
   Grid �� �̺�Ʈ�� ����ϴ� ���. ���� ���� ��Ȱ�� Ŀ�´�����Ʈ�� �����ϰ�
   �մϴ�.
   @module JGM.lang.Disposable
   */

 /**
   Grid �̺�Ʈ �Ŵ��� Ŭ����. Grid �� ��� �鰣�� Ŀ�´����̼��� �� Ŭ������
   ���� �̺�Ʈ�� ��������/Ʈ���� �����ν� �̷�����ϴ�. ���� �ٸ� ����� �Լ���
   ȣ���ϴ� ����� ������ �̺�Ʈ�� ���ϸ� �ٸ� ��� �ν��Ͻ��� ���� ���� �Ǵ�
   �̸��� ���� �� �Ͽ��� ��ȣ Ŀ�´�����Ʈ �� �� �ִ� ������ �ֽ��ϴ�.

   @class {Disposable} JGM.lang.Disposable

   @author ����ȣ
   @since 1.0.0
   @version 1.1.7
   */

 /**
   Disposable ����Ʈ���� �Դϴ�.

   @constructor

   @author ����ȣ
   @since 1.0.0
   @version 1.0.0
   */
 function Disposable(args) {
 }

 var proto = Disposable.prototype,
	 isArray = Util.isArray;

 function dispose(level, others) {'use strict';
	 level = level || 0;
	 var i,
		 val;
	 if (level !== 0) {
		 // deep dispose
		 for (i in this) {
			 if (this.hasOwnProperty(i)) {
				 val = this[i];
				 if (val) {
					 // filter out null and some primitive check
					 if (val.dispose) {
						 // use dispose if possible
						 val.dispose(level - 1, others);
					 }
					 else if (others && typeof val == 'object') {
						 // array or object
						 if (isArray(val)) {
							 val.length = 0;
						 }
						 else {
							 dispose.call(val, level - 1, others);
						 }
					 }
				 }
				 delete this[i];
			 }
		 }
	 }
	 else {
		 // shallow dispose
		 for (i in this) {
			 if (this.hasOwnProperty(i)) {
				 delete this[i];
			 }
		 }
	 }
 };


}());
