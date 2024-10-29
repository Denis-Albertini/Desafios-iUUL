import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });
import Vertice from "./vertice.js";

class Poligono {
  #vertices;

  get vertices() {
    return this.#vertices;
  }

  constructor(vertices) {
    if (vertices.length < 3)
      throw new Error("Um poligono precisa de ao menos 3 vertices!");
    else this.#vertices = vertices;
  }

  addVertice(vertice) {
    if (!this.#vertices.includes(vertice)) {
      this.#vertices.push(vertice);
      return true;
    } else return false;
  }

  perimetro() {
    this.#vertices.reduce((sum, vertice, index, vertices) => {
      if (vertices[index + 1])
        return sum + vertice.distancia(vertices[index + 1]);
      return sum;
    }, 0);
  }

  qtdVertices() {
    return this.#vertices.length;
  }
}

const vertices = [];
var poligono;
console.log(
  "Insira vertices (e um caracter diferente de numero para finalizar)"
);
while (1) {
  while (1) {
    let x = parseFloat(prompt("x:"));
    if (isNaN(x)) break;
    let y = parseFloat(prompt("y:"));
    if (isNaN(y)) break;
    vertices.push(new Vertice(x, y));
    console.log("#");
  }
  try {
    poligono = new Poligono(vertices);
    break;
  } catch (err) {
    console.log(err.message);
  }
}

console.log(`perimetro: ${poligono.perimetro()}`);
console.log(`numero de vertices: ${poligono.qtdVertices()}`);
console.log("Adicione um vertice");
while (1) {
  if (
    poligono.addVertice(
      new Vertice(parseFloat(prompt("x:")), parseFloat(prompt("y:")))
    )
  )
    break;
  else console.log("Este vertice ja existe!");
}
console.log(`novo perimetro: ${poligono.perimetro()}`);
console.log(`numero de vertices: ${poligono.qtdVertices()}`);
