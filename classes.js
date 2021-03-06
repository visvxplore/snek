

class Snek{
	constructor(){
		this.speed = 1;
		this.length = 40;
		this.width = 3;
		this.segments = [
			new SnekSegment(50, 50, 50, 40, 'D'),
			new SnekSegment(50, 40, 30, 40, 'R'),
		];
	}
	
	move(){
		this.addToHead(this.speed);
		this.removeFromTail(this.speed);
	}
	
	getLength(){
		var len = 0;
		for(var i=0; i<this.segments.length; i++){
			let a = this.segments[i].start.x-this.segments[i].end.x;
			let b = this.segments[i].start.y-this.segments[i].end.y;
			len += Math.sqrt(a*a + b*b);
		}
		return len;
	}
	
	changeDir(D){
		var headSeg = this.segments[0];
		if((D === 'D' || D === 'U') && (headSeg.direction === 'U' || headSeg.direction === 'D')) return;
		if((D === 'L' || D === 'R') && (headSeg.direction === 'R' || headSeg.direction === 'L')) return;
		this.segments.unshift(new SnekSegment(headSeg.start.x, headSeg.start.y, headSeg.start.x, headSeg.start.y, D));
	}
	
	alterSegmentLength(idx, end, len){
		switch(this.segments[idx].direction){
			case "U": this.segments[idx][end].y -= len; break;
			case "D": this.segments[idx][end].y += len; break;
			case "L": this.segments[idx][end].x -= len; break;
			case "R": this.segments[idx][end].x += len; break;
		}
	}
	
	addToHead(len){
		this.alterSegmentLength(0, 'start', len);
	}
	
	removeFromTail(len){
		var l = this.segments.length-1;
		this.alterSegmentLength(l, 'end', len);
		var seg = this.segments[l];
		if(seg.start.x === seg.end.x && seg.start.y === seg.end.y) this.segments.pop();
	}
	
	addToTail(len){
		var l = this.segments.length-1;
		this.alterSegmentLength(l, 'end', -len);
	}
	
}

class SnekSegment{
	constructor(sx, sy, ex, ey, dir){
		this.start = {x:sx, y:sy};
		this.end = {x:ex, y:ey};
		this.direction = dir;
	}
}