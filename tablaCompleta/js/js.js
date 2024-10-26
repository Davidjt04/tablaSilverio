// Modulo para el mantenimiento de Tablas
//metodo ordenar 
//ordenar el primer tbody de la tabla por la columna indcada
//usando la funcion funcionOrdenadora o orden lexicografico si se pasa
// parametros
//columna un numero entre 0 y columna 1
// funcionOrdenar parametro voluntario caso de pasarse
/*funcion (a,b){ ay dos valores
    return (+-) valor positivo si a>b, negativo si a<b y 0 si a=b
}*/

// Modulo para el mantenimiento de Tablas
let orden = 1; // Variable para controlar el orden de la tabla (ascendente/descendente)
HTMLTableElement.prototype.ordenar = function (columna, funcionOrdenadora) {
    var cuerpo = this.getElementsByTagName("tbody")[0];
    var filas = cuerpo.getElementsByTagName("tr");
    var v = Array.from(filas);
   
    
    if (funcionOrdenadora) {
        v.sort(function (f1, f2) {
            return orden * funcionOrdenadora(f1.cells[columna].innerHTML, f2.cells[columna].innerHTML);
        });
    } else {
        v.sort(function (f1, f2) {
            return orden * f1.cells[columna].innerHTML.localeCompare(f2.cells[columna].innerHTML);
        });
    }
    
    v.forEach(function (fila) {
        cuerpo.appendChild(fila);
    });
    
    orden *= -1; // Cambia el orden
};

function compararDNI(dni1, dni2) {
    let num1 = parseInt(dni1.slice(0, -1), 10);
    let num2 = parseInt(dni2.slice(0, -1), 10);
    return num1 - num2;
}


window.addEventListener("load", function () {
    var filas = this.document.querySelectorAll("table#t1 tbody>tr");
    for (let i = 0; i < filas.length; i++) {
      filas[i].editada = false;
      let td = this.document.createElement("td");
      //Boton borrar
      let boton = this.document.createElement("button");
      boton.innerHTML = "B";
      boton.addEventListener("click", borrarFila);
      td.appendChild(boton);
      //Boton Editar
      let botonE = this.document.createElement("button");
      botonE.innerHTML = "E";
      botonE.addEventListener("click", editarFila);
      td.appendChild(botonE);
      //Boton Guardar
      let botonG = this.document.createElement("button");
      botonG.innerHTML = "G";
      botonG.addEventListener("click", guardarFila);
      td.appendChild(botonG);
      //Cancelar Fila
      let botonC = this.document.createElement("button");
      botonC.innerHTML = "C";
      botonC.addEventListener("click", cancelarFila);
      td.appendChild(botonC);
      //Subir Fila
      let botonS = this.document.createElement("button");
      botonS.innerHTML = "↑";
      botonS.addEventListener("click", subirFila);
      td.appendChild(botonS);
      //Bajar fila
      let botonB = this.document.createElement("button");
      botonB.innerHTML = "↓";
      botonB.addEventListener("click", bajarFila);
      td.appendChild(botonB);
  
      filas[i].appendChild(td);                 //metemos los td dentro de las filas (botones dentro de la tablas)
    }
  
    function borrarFila() {
      this.parentNode.parentNode.remove();
    }
  
    function editarFila() {
      var fila = this.parentNode.parentNode;
      if (!fila.editada) {
        let valores = [];
        fila.editada = true;
        var celdas = fila.cells;
        var nCeldas = celdas.length;
        for (let i = 0; i < nCeldas - 1; i++) {
          let txtValor = document.createElement("input");
          txtValor.type = "text";
          txtValor.value = celdas[i].innerHTML;
          valores.push(txtValor.value);
          celdas[i].innerHTML = "";
          celdas[i].appendChild(txtValor);
        }
        fila.valoresOriginales = valores;
      }
    }
  
    function guardarFila() {
      var fila = this.parentNode.parentNode;
      if (fila.editada) {
        fila.editada = false;
        var celdas = fila.cells;
        var nCeldas = celdas.length;
        for (let i = 0; i < nCeldas - 1; i++) {
          let inputValue = celdas[i].firstElementChild.value;
          celdas[i].innerHTML = inputValue;
        }
      }
    }
  
    function cancelarFila() {
      var fila = this.parentNode.parentNode;
      if (fila.editada) {
        fila.editada = false;
        var celdas = fila.cells;
        var nCeldas = celdas.length;
        for (let i = 0; i < nCeldas - 1; i++) {
          celdas[i].innerHTML = fila.valoresOriginales[i];
        }
      }
    }
  
    function subirFila() {
      var fila = this.parentNode.parentNode;
      if (fila.previousElementSibling) {
        fila.parentNode.insertBefore(fila, fila.previousElementSibling);
      }
    }
  
    function bajarFila() {
      var fila = this.parentNode.parentNode;
      if (fila.nextElementSibling) {
        fila.parentNode.insertBefore(fila.nextElementSibling, fila);
      }
    }
  });


// window.addEventListener("load", function(){
//     var filas = document.querySelectorAll("table#t1 tbody > tr");
//     for (let i = 0; i < filas.length; i++) {
//         let td = document.createElement("td");
        
//         // Botón Borrar
//         let botonB = document.createElement("button");
//         botonB.innerHTML = "B"; // Botón Borrar
//         botonB.addEventListener("click", borrarFila);
//         td.appendChild(botonB);

//         // Botón Editar
//         let botonE = document.createElement("button");
//         botonE.innerHTML = "E"; // Botón Editar
//         botonE.addEventListener("click", editarFila);
//         td.appendChild(botonE);

//         // Botón Guardar
//         let botonG = document.createElement("button");
//         botonG.innerHTML = "G"; // Botón Guardar
//         botonG.style.display = "none"; // Ocultar inicialmente
//         botonG.addEventListener("click", guardarFila);
//         td.appendChild(botonG);

//         // Botón Cancelar
//         let botonC = document.createElement("button");
//         botonC.innerHTML = "C"; // Botón Cancelar
//         botonC.style.display = "none"; // Ocultar inicialmente
//         botonC.addEventListener("click", cancelarFila);
//         td.appendChild(botonC);

//         // Botón Subir
//         let botonS = document.createElement("button");
//         botonS.innerHTML = "↑"; // Botón Subir
//         botonS.addEventListener("click", subirFila);
//         td.appendChild(botonS);

//         filas[i].appendChild(td);
//     }

//     // Función para borrar fila
//     function borrarFila() {
//         this.parentNode.parentNode.remove();
//     }

//     // Función para editar fila
//     function editarFila() {
//         var fila = this.parentNode.parentNode;
//         var celdas = fila.cells;
//         var nCeldas = celdas.length;

//         fila.originalValues = []; // Guardar valores originales

//         for (let i = 0; i < nCeldas - 1; i++) { // Excluir la última celda de acciones
//             fila.originalValues.push(celdas[i].innerHTML); // Guardar valor original
//             let txtValor = document.createElement("input");
//             txtValor.type = "text";
//             txtValor.value = celdas[i].innerHTML;
//             celdas[i].innerHTML = "";
//             celdas[i].appendChild(txtValor);
//         }

//         // Mostrar y ocultar botones
//         this.style.display = "none"; // Ocultar botón Editar
//         celdas[nCeldas - 1].children[2].style.display = "inline"; // Mostrar botón Guardar
//         celdas[nCeldas - 1].children[3].style.display = "inline"; // Mostrar botón Cancelar
//     }

//     // Función para guardar fila
//     function guardarFila() {
//         let fila = this.parentNode.parentNode;
//         var celdas = fila.cells;
//         var nCeldas = celdas.length;

//         for (let i = 0; i < nCeldas - 1; i++) {
//             let input = celdas[i].firstElementChild.value;
//             celdas[i].innerHTML = input; // Guardar nuevo valor
//         }

//         // Ocultar botones y mostrar Editar
//         this.style.display = "none"; // Ocultar botón Guardar
//         celdas[nCeldas - 1].children[1].style.display = "inline"; // Mostrar botón Editar
//         celdas[nCeldas - 1].children[3].style.display = "none"; // Ocultar botón Cancelar
//     }

//     // Función para cancelar edición
//     function cancelarFila() {
//         let fila = this.parentNode.parentNode;
//         var celdas = fila.cells;
//         var nCeldas = celdas.length;

//         for (let i = 0; i < nCeldas - 1; i++) {
//             celdas[i].innerHTML = fila.originalValues[i]; // Restaurar valor original
//         }

//         // Ocultar botones y mostrar Editar
//         this.style.display = "none"; // Ocultar botón Cancelar
//         celdas[nCeldas - 1].children[2].style.display = "none"; // Ocultar botón Guardar
//         celdas[nCeldas - 1].children[1].style.display = "inline"; // Mostrar botón Editar
//     }

//     // Función para subir fila
//     function subirFila() {
//         var fila = this.parentNode.parentNode;
//         if (fila.previousElementSibling) {
//             fila.parentNode.insertBefore(fila, fila.previousElementSibling);
//         }
//     }
// });