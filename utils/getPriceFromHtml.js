module.exports = async (data, cheerioSvc, tag) => {
	const $ = cheerioSvc.load(data);
	const price = await $(`${tag}`).text();
	return price;
};
