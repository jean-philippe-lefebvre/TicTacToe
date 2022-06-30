import BoardGame from './BoardGame.js' 
import Alert from './Alert.js'

var optionBoard = {
	ligne: 3,
	column: 3,
	party: 1,
	indicatorOfTurnBool: true,
	indicatorScoreBool: true,
	scores: {
		X: 0,
		O: 0
	},
	pieces: {
		tourJoueur: 0,
		types: [ 'X', 'O' ],
		styles: [ 'color:blue;', 'color:red;' ],
		matricePosition: [['-','-','-'], ['-','-','-'], ['-','-','-']]
	},

	reset(btn) {

		btn.addEventListener('click', () => {
			this.party = 1
			this.pieces.tourJoueur = 0
			this.pieces.matricePosition = [['-','-','-'], ['-','-','-'], ['-','-','-']]
			this.items.forEach( (item) => {
				
				item.innerHTML = ''
				item.removeAttribute('data-type')
			})

			// Indicateur de tour
			let indicator = document.querySelector('.currentCursor')	
			if( indicator !== null ){
				indicator.setAttribute('data-type','X')
			}
		})
	},

	generatorPieces(options) {
		
		// Indicateur START
		if( options.indicatorOfTurnBool ){
			options.indicatorOfTurn( this.pieces.types[ this.pieces.tourJoueur ] )
		}

		this.cellules.forEach( (cellule, index) => {
			cellule.addEventListener('click', () => {

				let item = cellule.firstElementChild
				let atItem = item.getAttribute('data-type')

				//Si la case est vide
				if( atItem === null && this.party > 0){

					var type = this.pieces.types[ this.pieces.tourJoueur ]
					let indexCol= index % this.column
					let indexLigne = Math.trunc( index / this.ligne )

					item.setAttribute('style', this.pieces.styles[ this.pieces.tourJoueur ] )
					item.setAttribute('data-type',type )

					//Remplissage de la matrice representant les positions des pieces
					this.pieces.matricePosition[indexLigne].splice( indexCol, 1, type)
					this.pieces.tourJoueur = this.pieces.tourJoueur === 0 ? 1 : 0
					
					// Indicateur de tour
					if( options.indicatorOfTurnBool ){
						options.indicatorOfTurn( this.pieces.types[ this.pieces.tourJoueur ] )
					}

					let win = options.fnWin()
					if(win){
						new Alert('Les ' + type + ' on gagner, felicitation !')
						this.party--
						options.scoreWin(type)
					}

				}
			})
		})
	},

	scoreWin(type){
		this.scores[type] = this.scores[type] + 1
		const x = document.querySelector('.score-indicator-X')
		const o = document.querySelector('.score-indicator-O')
		x.innerHTML = this.scores['X']
		o.innerHTML = this.scores['O']
			
	},

	fnWin() {

		let position = this.pieces.matricePosition

		for( let i = 0; i < 3; i++){

			 if(position[i][0] !== '-'){
				if( position[i][0] === position[i][1] && position[i][0] === position[i][2] ){
					return true
				}
			 }
			if(position[0][i] !== '-'){
				if( position[0][i] === position[1][i] && position[0][i] === position[2][i] ){
					return true
				}
			}

		}

		if(position[1][1] !== '-'){
			if(position[1][1] === position[0][0] && position[1][1] === position[2][2]){
				return true
			}
			if(position[1][1] === position[0][2] && position[1][1] === position[2][0]){
				return true
			}
		}

		return false
	},

	indicatorOfTurn(type) {
		let indicator = document.querySelector('.currentCursor')	
		indicator.setAttribute('data-type',type )
	},

	indicatorScore()
	{
		const center = document.createElement('center')
		const score = document.createElement('div')
		const scoreIndicatorX = document.createElement('div')
		const scoreIndicatorO = document.createElement('div')
		const labelX = document.createElement('div')
		const labelO = document.createElement('div')
		const labelVs = document.createElement('div')

		score.classList.add('score')
		scoreIndicatorX.classList.add('score-indicator-X')
		scoreIndicatorO.classList.add('score-indicator-O')

		labelX.classList.add('score-indicator-label-X')
		labelO.classList.add('score-indicator-label-O')
		labelVs.classList.add('score-indicator-label-vs')

		scoreIndicatorX.innerHTML = "-"
		scoreIndicatorO.innerHTML = "-"
		labelX.innerHTML = "X"
		labelO.innerHTML = "O"
		labelVs.innerHTML = "Vs"

		score.innerHTML = "Score : "
		score.appendChild(scoreIndicatorX)
		score.appendChild(labelX)
		score.appendChild(labelVs)
		score.appendChild(scoreIndicatorO)
		score.appendChild(labelO)
		center.appendChild(score)

		this.gameContainer.appendChild(center)
	}

}

var morpion = new BoardGame( optionBoard );
