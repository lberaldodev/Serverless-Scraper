module.exports = (data) => {
	return {
		body: `Atencao, preco: ${data.price} Loja: ${data.store} Link: ${data.link}`,
		from: data.from,
		to: data.to,
	};
};
