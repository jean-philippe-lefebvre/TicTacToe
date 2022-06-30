/**
 * PopUp affichant un message a l'ecran
 * @arg message a afficher 
 */
export default class Alert {
		
	constructor(message){

		let pop = document.createElement('div')
		pop.classList.add('popAlert')

		let popBody = document.createElement('div')
		popBody.classList.add('popAlert-body')
		pop.appendChild(popBody)

		let bodyMessage = document.createElement('div')
		bodyMessage.classList.add('popAlert-message')
		bodyMessage.innerHTML = message
		popBody.appendChild(bodyMessage)

		let body = document.querySelector('body')
		body.appendChild(pop)

		pop.addEventListener('click', (e) => {
			e.currentTarget.addEventListener('animationend', (e) => this.removeItem(e))
			void e.offsetWidth
			e.currentTarget.setAttribute('data-out', true)
		})
	}

	removeItem(e) {
		e.currentTarget.parentNode.removeChild(e.currentTarget)
	}
}
