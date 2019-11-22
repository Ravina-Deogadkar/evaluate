exports.Stack = class Stack{
	constructor(){
		this.StackArry = [];
		this.top=-1;
	}

	//Push element at the top of the stack.
	push(element){
		++this.top;
		this.StackArry[this.top] = element;
	}

	//Pop top element
	pop(){
		if(this.isEmpty()){
			return false;
		}

		const element = this.StackArry[this.top];
		this.top--;
		return element;
	}

	// Checks if stack is empty
	isEmpty(){
		if(this.top===-1){
			return true;
		}else{
			return false;
		}
	}

	// Get top stack element
	getTop(){
		return this.StackArry[this.top];
	}
}