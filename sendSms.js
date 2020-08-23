const { throttle } = require("lodash");

module.exports = async (sdk, config) => {
	console.log("send_sms", config);
	try {
		const res = await sdk.messages.create({
			body: config.body,
			from: config.from,
			to: config.to,
		});
		console.log("sucess to send sms", res);
		return res;
	} catch (e) {
		throw Error(e);
	}
};
