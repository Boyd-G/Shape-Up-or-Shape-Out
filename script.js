//ARRAY INDEX COUNTER
let counter = 0;
//ARRAY TO HOLD OBJECTS TO PULL FROM LATER
let objects = [];
//CREATE SHAPE CLASS
class Shape {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.radius = "n/a"; //SET DEFAULT RADIUS
  }
  get area() {
    return this.calculateArea();
  }
  get perimeter() {
    return this.calculatePerimeter();
  }
  get describeMe() {
    return this.describe();
  }
  calculatePerimeter() {
    return this.width * 2 + this.height * 2;
  }
  calculateArea() {
    return this.width * this.height;
  }
  describe() {
    //populate sidebar with data when called
    $("#shapeSide").val(this.shape);
    $("#heightSide").val(this.height);
    $("#widthSide").val(this.width);
    $("#areaSide").val(this.area);
    $("#perimSide").val(this.perimeter);
    $("#radSide").val(this.radius);
  }
}

//RECTANGLE CREATION
class Rectangle extends Shape {
  //create class for rectangle
  constructor(height, width) {
    super(height, width);
    this.shape = "rectangle"; //set shape propertry
    //sets size and position
    let rectangle = `<div class='shape rectangle' id='${counter}' style="height:${
      this.height
    }px; width:${this.width}px; left:${randomPosition(
      this.width
    )}px; top:${randomPosition(this.height)}px"></div>`;
    $("#board").append(rectangle);
  }
}
$("#addRecBtn").on("click", addRectangle);
function addRectangle() {
  let height = Number($("#recHeight").val()); //set height from input
  let width = Number($("#recWidth").val()); //set width from input
  let rt = new Rectangle(height, width);
  objects.push(rt); //push object to array and increment counter
  counter++;
}

//SQUARE CREATION
class Square extends Shape {
  //create class for square
  constructor(sideLength) {
    super(sideLength, sideLength);
    this.shape = "square"; //set shape property
    //sets size and position
    let square = `<div class='shape square' id='${counter}' style="height:${
      this.height
    }px; width:${this.width}px; left:${randomPosition(
      this.width
    )}px; top:${randomPosition(this.height)}px"></div>`;
    $("#board").append(square);
  }
}
$("#addSquareBtn").on("click", addSquare);
function addSquare() {
  let length = Number($("#squareSide").val());
  let sq = new Square(length);
  objects.push(sq);
  counter++;
}

//CIRCLE CREATION
class Circle extends Shape {
  //create class for circle (radius)
  constructor(radius) {
    super(2 * radius, 2 * radius);
    this.shape = "circle"; //set shape property
    this.radius = radius; //set radius
    //sets size and position
    let circle = `<div class='shape circle' id='${counter}' style="height:${
      this.height
    }px; width:${this.width}px; left:${randomPosition(
      this.width
    )}px; top:${randomPosition(this.height)}px"></div>`;
    $("#board").append(circle);
  }

  calculateArea() {
    const radius = this.width / 2;
    return Math.PI * radius * radius;
  }
  calculatePerimeter() {
    return Math.PI * this.width;
  }
  describe() {
    //reimplement describe
    $("#shapeSide").val(this.shape);
    $("#heightSide").val("n/a"); //so height and weight display n/a
    $("#widthSide").val("n/a");
    $("#areaSide").val(this.area);
    $("#perimSide").val(this.perimeter);
    $("#radSide").val(this.radius);
  }
}
$("#addCircleBtn").on("click", addCircle);
function addCircle() {
  let radius = Number($("#radiusLength").val());
  let cr = new Circle(radius);
  objects.push(cr);
  counter++;
}

//TRIANGLE CREATION
class Triangle extends Shape {
  constructor(height) {
    super(height, height);
    this.shape = "triangle"; //set shape property
    //sets size and position
    let triangle = `<div class='shape triangle' id='${counter}' style="width: 0; height: 0; border-bottom:${
      this.height
    }px solid yellow; border-right:${
      this.width
    }px solid transparent; left:${randomPosition(
      this.width
    )}px; top:${randomPosition(this.height)}px"></div>`;
    $("#board").append(triangle);
  }
  calculateArea() {
    return (this.height * this.height) / 2;
  }
  calculatePerimeter() {
    return 2 * this.height + Math.sqrt(2) * this.height;
  }
}

$("#addTriangleBtn").on("click", addTriangle);
function addTriangle() {
  let height = Number($("#triHeight").val());
  let tr = new Triangle(height);
  objects.push(tr);
  counter++;
}
function randomPosition(scalar) {
  //random postion function returns random
  return Math.floor(Math.random() * (601 - scalar)); //position between
} //0 and (600 - scalar)
let theBoard = document.getElementById("board"); //put div in variable
theBoard.addEventListener("click", detail, false); //detail event handler
function detail(e) {
  //detail function
  if (e.target !== e.currentTarget) {
    let temp = Number(e.target.id); //get id from div
    objects[temp].describeMe; //access object from div id and call describeMe
  }
  e.stopPropagation();
}
theBoard.addEventListener("dblclick", deleteMe, false); //delete event handler
function deleteMe(e) {
  //deleteMe function
  if (e.target !== e.currentTarget) {
    $(e.target).css("display", "none"); //set div css to display none
    let temp = Number(e.target.id); //get id from div
    objects[temp] = null; //set object to null
  }
  e.stopPropagation();
}
