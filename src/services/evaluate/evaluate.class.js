const { Service } = require('feathers-memory');
const { Stack } = require('./stack');

exports.Evaluate = class Evaluate extends Service {
	//splitting an expression.
	splitter(expr) {
		var Expression = [];
		const trimmedExpr = expr.trim();
		for (let i = 0; i < trimmedExpr.length; i++) {
			Expression.push(trimmedExpr[i]);
		}
		return Expression;
	}

	//Check for validity of the expression.
	validator(Expression) {
		let flag = true;
		for (let i = 0; i < Expression.length; i++) {

			if (Expression[i] === "+" || Expression[i] === "-" || Expression[i] === "*" || Expression[i] === "/") {

				if (!this.isDigit(Expression[i + 1])) {
					flag = false;
				}
			}
			else {
				if (!this.isDigit(Expression[i])) {
					flag = false;
				}
			}
		}
		return flag;
	}

	// Check if character is digit.
	isDigit(ExprChar) {
		if (ExprChar === "+" || ExprChar === "-" || ExprChar === "*" || ExprChar === "/") {
			return false;
		}
		else {
			return true;
		}
	}

	//check for priority of operator
	checkPriority(ExprChar) {
		switch (ExprChar) {
			case "+":
			case "-":
				return 1;
			case "*":
			case "/":
				return 2;

		}
	}

	//Convert an infix expression into postfix expression.
	convertOrder(Expression) {
		let exprStack = new Stack();
		let i = 0;
		var postFixExpr = [];
		while (i < Expression.length) {
			if (this.isDigit(Expression[i])) {
				postFixExpr.push(Expression[i]);
			} else {
				let topelement = exprStack.getTop();
				if (exprStack.isEmpty() || this.checkPriority(topelement) < this.checkPriority(Expression[i])) {
					exprStack.push(Expression[i]);
				} else {
					while (!exprStack.isEmpty() && this.checkPriority(Expression[i]) <= this.checkPriority(topelement)) {
						let element = exprStack.pop();
						postFixExpr.push(element);
						topelement = exprStack.getTop();
					}
					exprStack.push(Expression[i]);
				}
			}
			i++;
		}
		while (!exprStack.isEmpty()) {
			let element = exprStack.pop();
			postFixExpr.push(element);
		}
		return postFixExpr;
	}

	// Evaluate a postfix expression.
	evaluate(Expression) {
		const postFixExpr = this.convertOrder(Expression);
		let evaluateStack = new Stack();
		let i = 0;
		while (i < postFixExpr.length) {
			if (this.isDigit(postFixExpr[i])) {
				evaluateStack.push(postFixExpr[i]);
			} else {
				let operand2 = parseInt(evaluateStack.pop());
				let operand1 = parseInt(evaluateStack.pop());
				let operator = postFixExpr[i];
				switch (operator) {
					case '+': evaluateStack.push(operand1 + operand2);
						break;
					case '-': evaluateStack.push(operand1 - operand2);
						break;
					case '/': evaluateStack.push(operand1 / operand2);
						break;
					case '*': evaluateStack.push(operand1 * operand2);
						break;
				}
			}
			i++;
		}
		const result = evaluateStack.pop();
		return result;
	}
	async create(data) {
		const Expression = this.splitter(data.expression);
		if (this.validator(Expression)) {
			const result = this.evaluate(Expression);
			return result;
		}
		return "invalid expression";
	}

};
