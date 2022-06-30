/**
 * Genere un plateau de jeu dans un contener
 * @param boardGame parametre du plateau
 * @return un plateau dans un container
 */
export default class BoardGame {

	constructor( options ) {

		this.column = options.column || 1
		this.ligne = options.ligne || 1
		this.pieces = options.pieces || []
		this.party = options.party || 1

		this.gameContainer = document.querySelector('.container-game')
		const boardContainer = this.createDivWithClass('board')

		this.board = document.createDocumentFragment()
		this.cellules = []
		this.items = []

		// Indicateur de tour
		if( options.indicatorOfTurnBool ){
			this.indicatorOfTurn()
		}

		this.gameContainer.appendChild(boardContainer)

		this.generateGrid()
		options.generatorPieces.call(this, options)

		boardContainer.appendChild(this.board)

		//BOUTTON RESET GAME
		const btnReset = this.createDivWithClass('btnResetGame')
		btnReset.innerHTML = 'Reset Game'
		options.reset.call(this, btnReset)

		this.gameContainer.appendChild( btnReset )

		//Indicateur Score
		if( options.indicatorScoreBool ){
			options.indicatorScore.call(this)
		}

	}

	indicatorOfTurn() 
	{
		const indicatorOfTurn = this.createDivWithClass('currentIndicator')
		const indicatorActuelOfTurn = this.createDivWithClass('currentCursor')
		const center = document.createElement('center')

		indicatorOfTurn.innerHTML = "C'est le tour de :"
		center.appendChild(indicatorOfTurn)
		indicatorOfTurn.appendChild(indicatorActuelOfTurn)

		this.gameContainer.appendChild(center)
	}

	/**
	 * Genere les colonnes du plateau
	 * @return x element (case) representant chacune des colonnes
	 */
	generateColumn() 
	{
		let column = document.createDocumentFragment()
		for( let i = 0; i < this.column; i++ ){

			let cellules = this.createDivWithClass('case')
			let item = this.createDivWithClass('item')

			this.items.push( item )
			cellules.appendChild( item )

			this.cellules.push( cellules )
			column.appendChild( cellules )
		}
		return column
	}

	/**
	 * Genere la grille du plateau
	 * @return Void
	 */
	generateGrid() 
	{
		for( let i = 0; i < this.ligne; i++ ){
			// Genere les colonnes
			let ligne = this.createDivWithClass('ligne')
			let col = this.generateColumn()

			ligne.appendChild( col );
			this.board.appendChild(ligne)
		}
	}

	/**
	 * Genere une div avec la class voulu
	 * @param string strClass class voulu 
	 * @return element div
	 */
	createDivWithClass( strClass )
	{
		let div = document.createElement('div')
		div.classList.add(strClass)
		return div
	}

}
