exports.Stack = class Stack{
	constructor(){
		this.StackArry = [];
		this.top=-1;
	}
	push(element){
		++this.top;
		this.StackArry[this.top] = element;
	}
	pop(){
		if(this.isEmpty()){
			return false;
		}

		const element = this.StackArry[this.top];
		this.top--;
		return element;
	}
	isEmpty(){
		if(this.top==-1){
			return true;
		}else{
			return false;
		}
	}

	getTop(){
		return this.StackArry[this.top];
	}
}