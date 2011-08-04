console && console.log && console.log('reading javascript source "Disposable.js"...');//IF_DEBUG

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

 var util = goog.getObjectByName('jx.util');
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
	 isArray = util.isArray;

 /**
  * @param {*} a to compare against
  * @param {*} b to compare against
  * @param {?Array.<string>=} compareOnly attribute names to compare
  * @param {?number=} level deep level
  */
 util.equals = Object.equals = function(a, b, compareOnly, level) {
	 if (typeof a == 'object') {
		 return equals.call(a, b, compareOnly, level);
	 }
	 else {
		 // checking NaN
		 return a !== a && b !== b;
	 }
 }

 /**
  * @param {*} a to dispose
  * @param {?number=} level deep level
  * @param {?boolean=} others compare non-disposables
  */
 util.dispose = Object.dispose = function(a, level, others) {
	 if (typeof a == 'object') {
		 return dispose.call(a, level, others);
	 }
	 // checking NaN
 }

 proto.equals = equals;
 proto.dispose = dispose;

 /**
  * @param {*} obj to compare against
  * @param {?Array.<string>=} compareOnly attribute names to compare
  * @param {?number=} level deep level
  */
 function equals(obj, compareOnly, level) {'use strict';
	 if (typeof obj != 'object') {
		 // if obj is not object return false
		 return false;
	 }
	 var i,
		 val,
		 oval;
	 if (compareOnly) {
		 var j = 0, l = compareOnly.length;
		 for (; j < l; j++) {
			 i = compareOnly[j];
			 if (this.hasOwnProperty(i)) {
				 if (obj.hasOwnProperty(i)) {
					 val = this[i];
					 oval = obj[i];
					 if (val !== obj) {
						 // checking NaN
						 if (!(val === val || oval === oval)) {
							 return false;
						 }
					 }
				 }
				 else {
					 return false;
				 }
			 }
			 else if (obj.hasOwnProperty(i)) {
				 return false;
			 }
		 }
	 }
	 else {
		 if (level) {
			 // deep comparison
			 for (i in this) {
				 if (this.hasOwnProperty(i)) {
					 if (!obj.hasOwnProperty(i)) {
						 return false;
					 }
					 val = this[i];
					 oval = obj[i];
					 if (val !== oval) {
						 if (val) {
							 // filter out null and some primitive check
							 if (typeof val != 'object' || typeof oval != 'object') {
								 // if either of them is not object return false
								 return false;
							 }
							 if (val.equals) {
								 // use equals if possible
								 if (!val.equals(oval, null, level - 1)) {
									 return false;
								 }
							 }
							 else if (oval.equals) {
								 // use equals if possible
								 if (!oval.equals(val, null, level - 1)) {
									 return false;
								 }
							 }
							 // use equals if possible
							 if (!equals.call(val, oval, null, level - 1)) {
								 return false;
							 }
						 }
						 else {
							 // checking NaN
							 if (!(val === val || oval === oval)) {
								 return false;
							 }
						 }
					 }
				 }
			 }
			 for (i in obj) {
				 if (obj.hasOwnProperty(i) && !this.hasOwnProperty(i)) {
					 return false;
				 }
			 }
		 }
		 else {
			 // shallow comparison
			 for (i in this) {
				 if (this.hasOwnProperty(i)) {
					 if (obj.hasOwnProperty(i)) {
						 val = this[i];
						 oval = obj[i];
						 if (val !== obj) {
							 // checking NaN
							 if (!(val === val || oval === oval)) {
								 return false;
							 }
						 }
					 }
					 else {
						 return false;
					 }
				 }
			 }
			 for (i in obj) {
				 if (obj.hasOwnProperty(i) && !this.hasOwnProperty(i)) {
					 return false;
				 }
			 }
		 }
	 }
	 return true;
 }

 /**
  * @param {?number=} level deep level
  * @param {?boolean=} others compare non-disposables
  */
 function dispose(level, others) {'use strict';
	 if (this == window) {
		 return;
	 }
	 var i,
		 val;
	 if (level) {
		 // deep dispose
		 for (i in this) {
			 if (this.hasOwnProperty(i)) {
				 val = this[i];
				 if (val && typeof val == 'object') {
					 // filters null and non-objects
					 if (val.dispose) {
						 // use dispose if possible
						 val.dispose(level - 1, others);
					 }
					 else if (others) {
						 // dispose non-disposable objects
						 if (isArray(val)) {
							 val.length = 0;
						 }
						 dispose.call(val, level - 1, others);
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
