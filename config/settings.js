const env = require("env-var");

const settings = {
	NODE_ENV: env.get("NODE_ENV").required().asString(),
	rate: env.get("rate").required().asString(),
	enabled: env.get("enabled").required().asBool(),
	min_price: env.get("min_price").required().asIntPositive(),
	to: env.get("to").required().asString(),
	from: env.get("from").required().asString(),
	twilio_account_id: env.get("twilio_account_id").required().asString(),
	twilio_auth_token: env.get("twilio_auth_token").required().asString(),
};

module.exports = settings;
