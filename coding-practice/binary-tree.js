
function Node(data, left, right){
	this.data = data;
	this.left = left;
	this.right = right;
	this.show = show;
}

function show(){
	return this.data;
}

function BST(){
	this.root = null;
	this.insert = insert;
	this.inOrder = inOrder;
	this.getMin = getMin;
	this.getMax = getMax;
	this.find = find;
	this.remove = remove;
}

/** insert **/
function insert(data){
	var n = new Node(data,null,null);
	if(this.root === null){
		this.root = n;
	}else{
		var current = this.root;
		var parent;
		while(current){
			parent = current;
			if(data < current.data){
				current = current.left;
				if(current === null){
					parent.left = n;
					break;
				}
			}else{
				current = current.right;
				if(current === null){
					parent.right = n;
					break;
				}
			}
		}
	}
}

/** traverse **/
// 中序遍历 升序显示所有节点
function inOrder(node){
	if(!(node===null)){
		inOrder(node.left);
		console.log(node.show());
		inOrder(node.right);
	}
}
// 先序遍历
function preOrder(node){
	if(!(node===null)){
		console.log(node.show());
		preOrder(node.left);
		preOrder(node.right);
	}
}
// 后续遍历
function postOrder(node){
	if(!(node === null)){
		postOrder(node.left);
		postOrder(node.right);
		console.log(node.show());
	}
}

/** find **/
function getMin(){
	var current = this.root;
	while(!(current.left !== null)){
		current = current.left;
	}
	return current.data;
}
function getMax(){
	var current = this.root;
	while(current.right !== null){
		current = current.right;
	}
	return current.data;
}
function find(data){
	var current = this.root;
	while(current!==null){
		if(current === data){
			return current;
		}else if(current < data){
			current = current.left;
		}else{
			current = current.right;
		}
	}
	return null;
}

/** remove node **/
function remove(data){
	removeNode(null, left, this.root, data);
}
function removeNode(parNode, dir, curNode, data){
	if(curNode === null) {
		return null;
	}
	if(curNode.data === data){
		if(curNode.left === null && curNode.right === null && parNode){
			parNode[dir] = null;
		}else if(curNode.left === null && parNode){
			parNode[dir] = curNode.right;
		}else if(curNode.right === null && parNode){
			parNode[dir] = curNode.left;
		}else{
			let theNode = findLargestNode(curNode.left,curNode);
			if(parNode){
				parNode[dir] = theNode;
			}
			if(theNode.left !== curNode.left){
				theNode.left = curNode.left;
			}
			theNode.right = curNode.right;
		}
		curNode = null;
	}else if(curNode.data > data){
		removeNode(curNode, 'left', curNode.left, data);
	}else{
		removeNode(curNode, 'right', curNode.right, data);
	}
}
function findLargestNode(node, parNode){
	if(node.right === null){
		parNode.right = null;
		return node;
	}else {
		findLargestNode(node.right, node);
	}
}

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
inOrder(nums.root);


