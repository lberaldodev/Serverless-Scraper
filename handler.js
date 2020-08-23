"use strict";
const settings = require("./config/settings");
const axios = require("axios");
const cheerio = require("cheerio");
const sites = require("./config/sites");
const smsFormat = require("./config/smsFormat");
const priceHandler = require("./priceHandler");
const sendSms = require("./sendSms");
const twilio = require("twilio");

class Scheduler {
	constructor({
		envs,
		axiosInstance,
		cheerioSvc,
		sites,
		sendSmsSvc,
		twilioSvc,
		smsFormatSvc,
	}) {
		this.envs = envs;
		this.axiosInstance = axiosInstance;
		this.cheerioSvc = cheerioSvc;
		this.sites = sites;
		this.sendSmsSvc = sendSmsSvc;
		this.twilioSvc = twilioSvc;
		this.smsFormatSvc = smsFormatSvc;
	}

	async main(event) {
		try {
			const prices = await priceHandler(
				this.sites,
				this.axiosInstance,
				this.cheerioSvc
			);

			const storeLowPrice = prices.find(
				({ price }) => price > 0 && price <= this.envs.min_price
			);

			if (!!storeLowPrice) {
				await this.sendSmsSvc(
					this.twilioSvc,
					this.smsFormatSvc({
						...storeLowPrice,
						...this.envs,
					})
				);
			}

			return {
				statusCode: 200,
				body: `${
					!!storeLowPrice
						? "Preco encontrado em " +
						  storeLowPrice.store +
						  "   " +
						  storeLowPrice.price
						: "Nao foram encontrados resultados para o preco minimo de " +
						  this.envs.min_price
				}`,
			};
		} catch (e) {
			console.log("ERROR!", e);
			return {
				statusCode: 500,
				body: "Internal Error " + e.stack,
			};
		}
	}
}

const axiosInstance = axios.create();
const cheerioSvc = cheerio;
const twilioSvc = twilio(
	settings.twilio_account_id,
	settings.twilio_auth_token
);

const scheduler = new Scheduler({
	envs: settings,
	axiosInstance,
	cheerioSvc,
	sites,
	sendSmsSvc: sendSms,
	twilioSvc,
	smsFormatSvc: smsFormat,
});

module.exports.scheduler = scheduler.main.bind(scheduler);
