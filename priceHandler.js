const getPriceFromHtml = require("./utils/getPriceFromHtml");

const tags = require("./config/tags");

module.exports = async (sites, axios, cheerio) => {
	let prices = [];

	for (const site in sites) {
		const { data } = await axios.get(sites[site].url);

		const price = await getPriceFromHtml(
			data,
			cheerio,
			tags[sites[site].type]
		);
		prices.push({
			price: Number(price.replace(/[.,R$\s]/g, "").trim()),
			store: sites[site].type,
			link: sites[site].url,
		});
	}
	return prices.sort((a, b) => a.price - b.price);
};
