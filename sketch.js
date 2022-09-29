let data = [
  ["Andres", 0.21, 0.30, 0.78, 0.45, 0.6], //0
  ["Santiago", 0.14, 0.54, 0.27, 0.70, 0.99], //1
  ["Juan", 0.30, 0.84, 0.25, 0.38, 0.19], //2
  ["Vivi", 0.55, 0.81, 0.69, 0.36, 0.12] //3
];

let sel;
let xName, yName;
let nameValue;
let xValues = [];
let nameValues = [];

function setup() {
  createCanvas(900, 600);
  select('canvas').position(200, 30);
  
  //Select options
  sel = createSelect();
  sel.position(50, 50);
  sel.option('Andres');
  sel.option('Santiago');
  sel.option('Juan');
  sel.option('Vivi');
  sel.changed(cosSimilarity);

  xName = 150;
  yName = 300;
  nameValue = "";
}

function draw() {
  background(0);
  drawCircles(xName, nameValue);
  for (let i = 0; i < xValues.length; i++) {
    drawCircles(xValues[i], nameValues[i]);
  }
}

function cosSimilarity() {
  xValues = [];
  nameValues = [];

  let name = sel.value();

  for (let index = 0; index < data.length; index++) {
    if (name == data[index][0]) {
      let selectedIndex = index;
      nameValue = name;

      for (let i = 0; i < data.length; i++) {
        cosineValues = cosine(data[selectedIndex], data[i]);
        mapValues = map(cosineValues, 0, 1, 750, 150);
        xValues.push(mapValues);
        nameValues.push(data[i][0]);
      }
    }
  }
}

function cosine(A, B) {
    let dotproduct=0;
    let mA=0;
    let mB=0;
    for(i = 1; i < A.length; i++){
        dotproduct += (A[i] * B[i]);
        mA += (A[i]*A[i]);
        mB += (B[i]*B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    let similarity = (dotproduct)/((mA)*(mB));
    return similarity;
}

function drawCircles(x, name) {
  circle(x, 300, 50);
  fill(255);
  textAlign(CENTER)
  textSize(20);
  text(name, x, 350);
}