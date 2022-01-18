



/* TODO:  

	- Solucionar el bug al presinar el espacio entre los botones. 
	  Supongo que la solucioón esta en dejar esos botones en su tamaño maximo sin poner ningun gap:. Y luego poner botenes adentro que si se puedan achicar
	


*/

const body = document.getElementById('body');
const toggle = document.getElementById('toggle');
const toggleButton = document.getElementById('toggle_button')
const screenContainer = document.getElementById('screen_container')

const keyPad = document.getElementById('key_pad');
const screen = document.getElementById('screen');





// Selector de temas:
let toggleNumber = 1;																						// Este es el valor del toggle actual. Sus valores pueden ser: 1, 2 o 3. El evento de abajo controla el "tema" de la calculadora, dependiendo del valor del toggleNumber la calculadora va a recibir su "tema" correspondiente. Habiendo 3 temas a eleccion. 
toggle.addEventListener('mouseup', () => {
	toggleNumber += 1;																						// Una vez activado el evento, se le suma un "1" al toggleNumber. De esta manera se aplicara el siguiente tema cuando hagamos click. Ej: Ahora estamos tenemos aplicado el tema numero 1. Cuando hacemos click sumamos una unidad dandole al "toggleNumber" un valor de 2, y de esta manera siguiendo la el orden de pasos del evento, se aplica la segunda opcion de temas  			
	switch (toggleNumber){
		case 1: 																							// Reemplazo los temas de la opcion 3 por los de la opcion 1
			body.classList.replace('theme3__body', 'theme1__body');
			toggle.classList.replace('theme3__toggle', 'theme1__toggle');
			toggleButton.classList.replace('theme3__toggle-button', 'theme1__toggle-button');
			screenContainer.classList.replace('theme3__screen-container', 'theme1__screen-container');
			keyPad.classList.replace('theme3__key-pad', 'theme1__key-pad');
		
			for(let i = 0; i < keyPad.children.length; i++){												// Este bucle va a recorrer a todos los hijos "keyPad" (son 18 botones en tota, pero puse "keyPad.children.length" que me deuelve ese mismo numero y demas es más mantenibe ya que puedo agregar hijos/botones nuevos sin tener que alterar este codigo)
				keyPad.children[i].classList.replace('theme3__key1', 'theme1__key1');
				keyPad.children[i].classList.replace('theme3__key2', 'theme1__key2');
				keyPad.children[i].classList.replace('theme3__key3', 'theme1__key3');
			} 
			break
			
		case 2: 																							// Reemplazo los temas de la opcion 1 por los de la opcion 2
			body.classList.replace('theme1__body', 'theme2__body');
			toggle.classList.replace('theme1__toggle', 'theme2__toggle');
			toggleButton.classList.replace('theme1__toggle-button', 'theme2__toggle-button');
			screenContainer.classList.replace('theme1__screen-container', 'theme2__screen-container');
			keyPad.classList.replace('theme1__key-pad', 'theme2__key-pad');
			
			for(let i = 0; i < keyPad.children.length; i++){												
				keyPad.children[i].classList.replace('theme1__key1', 'theme2__key1');
				keyPad.children[i].classList.replace('theme1__key2', 'theme2__key2');
				keyPad.children[i].classList.replace('theme1__key3', 'theme2__key3');
			} 
			break
		
		case 3:																								// Reemplazo los temas de la opcion 2 por los de la opcion 3
			body.classList.replace('theme2__body', 'theme3__body');
			toggle.classList.replace('theme2__toggle', 'theme3__toggle');
			toggleButton.classList.replace('theme2__toggle-button', 'theme3__toggle-button');
			screenContainer.classList.replace('theme2__screen-container', 'theme3__screen-container');
			keyPad.classList.replace('theme2__key-pad', 'theme3__key-pad');
			
			for(let i = 0; i < keyPad.children.length; i++){									
				keyPad.children[i].classList.replace('theme2__key1', 'theme3__key1');
				keyPad.children[i].classList.replace('theme2__key2', 'theme3__key2');
				keyPad.children[i].classList.replace('theme2__key3', 'theme3__key3');
			}
			toggleNumber = 0																				// Puse como valor "0" porque al volver a usar este evento se le sumara un "1",de esta manera al final me queda como valor "1", haciendo que la prixima vez que use este evento se apliquen los "temas" de la primera opcion. Osea, reinicia el bucle de 1,2,3,1,2,3...etc
			break
	}
})
	
	
	
	
	
	
	
	
	
	
	
	

// Calculadora:
const limitNumber = () => {															// Esta funcion limita el numero de digitos que puedo poner, de esta manera evito el desbordamiento 
	screen.textContent = screen.textContent.substring(0, 13)
}

const scientificNotation = () => {													// Esto lo voya  aplicar en el boton de "igual". Si el resultado es muy grande por la cantidad de caracteres, se va a desbordar. Para evitar esto lo convierto a notación cientifica 
	if (screen.textContent.length > 13){
		screen.textContent = screen.textContent.slice(0, -7)						// Este metodo borra los ultimo 7 digitos del array
		screen.textContent = parseFloat(screen.textContent).toExponential()			// Con esto convierto el el numeroa  nutación cientifica
	}
}

keyPad.addEventListener('mouseup', (e) => {
	
	let key = e.target
	
	if (screen.textContent == "ERROR"){												// Si esta escrita la palabra ERROR en la pantalla. Apenas se inicie este evento (osea, cuando apenas precione cualquier tecla, este mensaje se va a borrar. De lo contrario se sobreescribira Ej: ERROR58 )
		screen.textContent = ""
	} else if (screen.textContent == "0"){											// Si apenas inicio el evento y hay un 0 en la pantalla, este 0 se borra para que el numero no se sobreescriba detras de el. De lo contrario el numero aparecera detras del 0.  Ej: 05  
		screen.textContent = ""
	}
	


	if (key.id == 'key_reset'){
		screen.textContent = "0"
		
	} else if (key.id == 'key_del'){
		screen.textContent = screen.textContent.slice(0, -1)						// Este metodo borra el ultimo digito del array
		
		if (screen.textContent == ""){												// En caso de ser de borrar el ultimo digito, la pantalla quedara vacia. Pero yo quiero que en vez de eso, que aparezca un 0. Solamente por estetica
			screen.textContent = "0"
		}
		
	} else if (key.id == 'key_equal'){
		screen.textContent = eval(screen.textContent.replace("x","*").replace("÷","/"))				// eval() calcula la ecuación aunque este dentro de un string. Para hacer la calculadora más "estetica" puse una "x" en vez de un "*" para multiplicar. Obviamente para usar eval()  tengo que reemplazar esa "x" por la "*". Lo mismo conm el simbolo de "÷" y "/"   */ 

		if (screen.textContent == "Infinity" || screen.textContent == "-Infinity" || screen.textContent == "NaN"){	// Puede ser que divida algun numero por "0". Esto me puede dar como resultado las palabras "Infiniti" o "-Infinity" dependiendo de que si el dividendo es es positivo o negativo respectivamente. Pero yo quiero que me de el mensaje de "ERROR" solamente por
			screen.textContent = "ERROR"	
		} else if (screen.textContent == ""){										// Por el if que puse arriba de todo para evitar que se concatene el 0 con el proximo numero borrando al cero. Hice que cuando apretrara el boton de igual y haya un 0, este 0 se borara mostrandome el screen en vacio. Con este if lo soluciono
			screen.textContent = "0"
		}
		
		// scientificNotation()
		
	} else if (key.id == 'key_dot'){
		if(screen.textContent == ""){												// Por una regla que puse arriba, si la pantalla tiene como valor "0", el sigiente numero se pondra atras y quedara feo. Ej: 05.  Por ende más arriba hice que se borre el 0 para poder poner el numero que desee. Pero eso me genera otro problema, si quiero poner un simbolo despues del 0 (ej: 0/5) , este se borra y queda solamente el simbolo en el aire ( /5 ). Con este if arreglo ese problema 
			screen.textContent = "0."
		}else{
			screen.textContent = screen.textContent + '.';
		}

	} else if (key.id == 'key_addition'){
		screen.textContent = screen.textContent + '+';

	
	} else if (key.id == 'key_subtraction'){
		screen.textContent = screen.textContent + '-';								// −

		
	} else if (key.id == 'key_multiplication'){
		if (screen.textContent == ""){												
			screen.textContent = "0x"
		}else {
			screen.textContent = screen.textContent + 'x';							
		}

		
	} else if (key.id == 'key_division'){
		if (screen.textContent == ""){												
			screen.textContent = "0÷"
		}else {
			screen.textContent = screen.textContent + '÷';
		}


	} else {																		// La ultima opcion que nos queda es que el boton precionado sea cualquiera de las teclas restantes
		for (let i = 0; i <= 9; i++){												// Tengo que poner este bucle para sacarme de encima ese bug  que aparece cuando aparece cuando hago click entre medio de las teclas (en la pantalla aparece aparece un espacio y el uno  Ej:" 1").  Ya que tecnicamente estoy haciendo click en el "keyPad" para que se active el evento. Pero hace que se active en todos sus elementos hijos y nodos incluidos. Con este bucle me aseguro que unicamente se se le aplique el evento a los elementos que son los botones del 0 al 9, obviamente esto ocurre luego de descartar los otros botenes con los "if" de arriba. Esto funciona porque estoy buscando id con el nombre "key_0" al "key_9", y el keyPad tiene por nombre de id "key_pad"   
			if (key.id == `key_${i}`)	
			screen.textContent = screen.textContent + `${key.textContent}`
		}
	}
	

	if(screen.textContent == ""){													// Si bien el bucle de arriba arregra el bug. Se sigue aplicando el evento, y este evento lo primero que hace es borrar el numero "0" que esta por defecto y luego poner el numero o simbolo correspondiente de la calculadora (este es el funcionamiento normal de la calculadora). El problema es que cuando hago click en el espacio que hay entre los botones, tecnicamnete al hacer click en "keyPad" estoy activando el evento, haciendo que se borre el cero, pero en su lugar no pongo nada dejando la pantalla vacia. Con este if soluciono este problema, ya que al terminar el evento verifica si en la pantalla no hay nada en escrito. Al ser así pone un "0" que seria el 0 por defecto de la pantalla    									
		screen.textContent = "0"	
	}

	limitNumber()
})





