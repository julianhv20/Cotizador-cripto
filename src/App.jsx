import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import image from './assets/cryptomonedas.png';
import './styles.css';
import { Formulario } from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media screen and (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Imagen = styled.img`
	display: block;
	max-width: 100%;
	margin-top: 5rem;
`;

const Heading = styled.h1`
	font-family: 'Bebas Neue', cursive;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-bottom: 50px;
	margin-top: 80px;
	&::after {
		content: '';
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
	}
`;

export const App = () => {
	const [moneda, guardarMoneda] = useState('');
	const [criptomoneda, guardarCriptomoneda] = useState('');
	const [resultado, guardarResultado] = useState({});
	const [cargando, guardarCargando] = useState(false);

	useEffect(() => {
		const cotizarCriptomoneda = async () => {
			// evitamos la ejecución la primera vez
			if (moneda === '') return;

			// consultar la api para obtener la cotizacion
			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

			const resultado = await axios.get(url);

			// mostrar el spinner
			guardarCargando(true);

			// ocultar el spinner y mostrar el resultado
			setTimeout(() => {
				// cambiar el estado de cargando
				guardarCargando(false);

				// guardar cotizacion
				guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
			}, 3000);
		};
		cotizarCriptomoneda();
	}, [moneda, criptomoneda]);

	// Mostrar spinner o resultado
	const componente = cargando ? (
		<Spinner />
	) : (
		<Cotizacion resultado={resultado} />
	);

	return (
		<Contenedor>
			<div>
				<Imagen src={image} alt="Imagen crypto" />
			</div>
			<div>
				<Heading>Cotiza Criptomoneas al instante</Heading>
				<Formulario
					guardarMoneda={guardarMoneda}
					guardarCriptomoneda={guardarCriptomoneda}
				/>
				{componente}
			</div>
		</Contenedor>
	);
};
