const assert = require('assert');
const app = require('../../src/app');
const chai = require('chai');
const expect = chai.expect;

describe('\'evaluate\' service', () => {
	it('registered the service', () => {
		const evaluate = app.service('evaluate');

		assert.ok(evaluate, 'Registered the service');
	});
	const evaluate = app.service('evaluate');

	context("isDigit", () => {
		it("check for operators", () => {
			expect(evaluate.isDigit('+')).to.equal(false);
			expect(evaluate.isDigit('-')).to.equal(false);
			expect(evaluate.isDigit('*')).to.equal(false);
			expect(evaluate.isDigit('/')).to.equal(false);
		});
		it("check for numbers", () => {
			expect(evaluate.isDigit('1')).to.equal(true);
			expect(evaluate.isDigit('2')).to.equal(true);
			expect(evaluate.isDigit('3')).to.equal(true);
			expect(evaluate.isDigit('4')).to.equal(true);
			expect(evaluate.isDigit('5')).to.equal(true);
		});
	});
	context("validator", () => {
		it("check for valid expression", () => {
			expect(evaluate.validator('3+4')).to.equal(true);
			expect(evaluate.validator('3-4')).to.equal(true);
			expect(evaluate.validator('3*4')).to.equal(true);
			expect(evaluate.validator('3/4')).to.equal(true);
		});
		it("check for invalid expression", () => {
			expect(evaluate.validator('3/+4')).to.equal(false);
			expect(evaluate.validator('3*+4')).to.equal(false);
			expect(evaluate.validator('3/*-4')).to.equal(false);
			expect(evaluate.validator('3*4+-5')).to.equal(false);
		});
	});
	context("checkPriority", () => {
		it("check for operator priority", () => {
			expect(evaluate.checkPriority('+')).to.equal(1);
			expect(evaluate.checkPriority('-')).to.equal(1);
			expect(evaluate.checkPriority('*')).to.equal(2);
			expect(evaluate.checkPriority('/')).to.equal(2);
		});
	});
	context("splitter", () => {
		it("split an expression into array", () => {
			expect(evaluate.splitter('3+4')).to.have.lengthOf(3);
		});
	});
	context("evaluate", () => {
		it("evaluate an expression", () => {
			expect(evaluate.evaluate(['3','+','4'])).to.equal(7);
			expect(evaluate.evaluate(['3','+','8','/','4','-','2'])).to.equal(3);
		});
	});
	context("convertOrder", () => {
		it("convert an infix expression to postfix expression", () => {
			expect(evaluate.convertOrder(['3','+','4'])).to.eql(["3","4","+"]);
			expect(evaluate.convertOrder(['3','+','8','/','4','-','2'])).to.eql([ "3","8","4","/","+","2","-"]);
		});
	});
});
 