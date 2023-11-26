import 'htmx.org';
import './src/style.css';
import { pages } from './src/pages';
import header from './src/partials/header.html?raw';
import { ROUTE_PREFIX } from './src/utils/constants';
import { injectTemplate } from './src/utils/injectTemplate';

// Injecte la fonction injectTemplate dans l'objet window pour une utilisation globale.
window.injectTemplate = injectTemplate;


/**
 * @description Initializes the router and sets up event listeners.
 */
function init() {
    router(); // Exécute le routeur une fois au chargement initial.
    window.addEventListener('popstate', router); // Gère les changements d'état du navigateur.
    attachLinkEventListeners(); // Attache les écouteurs d'événements aux liens.
}

/**
 * @description Attaches click event listeners to all anchor tags for routing.
 */
function attachLinkEventListeners() {
    document.querySelectorAll('a').forEach(link => {
        // uniquement les liens internes
        if (link.href.startsWith(window.location.origin)) {
            link.addEventListener('click', (e)=>router(e, link.href.replace(`${window.location.origin}/`, '')));
        }
    });
}

/**
 * @description Handles routing logic.
 * @param {Event} e - The event object.
 */
function router(e, href) {

    if (e) e.preventDefault(); // Empêche le comportement par défaut du lien.
    const route = href || window.location.hash.replace(ROUTE_PREFIX, '') || window.location.pathname;

    const bodyPage = pages[route] || pages.home;
    const app = document.querySelector('#app');

    if(app) app.innerHTML = header + bodyPage;

    window.history.replaceState(null, null, `${window.location.origin}${ROUTE_PREFIX}${route}`);
    
    attachLinkEventListeners(); // Ré-attache les écouteurs aux nouveaux liens après le changement de contenu.
}

// Initialise l'application une fois que le DOM est complètement chargé.
document.addEventListener('DOMContentLoaded', init);
