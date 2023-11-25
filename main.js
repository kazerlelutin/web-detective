import 'htmx.org'
import './src/style.css'
import { injectTemplate } from './src/utils/injectTemplate';
import header from './src/partials/header.html?raw';
import main from './src/partials/main.html?raw';

/**
 * @description Injects the page template in the DOM
 */
function init(){
    document.body.insertAdjacentHTML( 'afterbegin', main );
    document.body.insertAdjacentHTML( 'afterbegin', header );
}

init()

//TODO faire le routeur, qui ecoute les changement du search et qui injecte le template correspondant
//remplacera certainement le init()

window.injectTemplate = injectTemplate;