const axios = require('axios').default;
var querystring = require('querystring');

const JNE_URL = process.env.JNE_API_URL;
const JNE_USERNAME = process.env.JNE_USERNAME;
const JNE_KEY = process.env.JNE_KEY;

const SKYNET_URL = process.env.SKY_NET_URL;
const SKYNET_TOKEN = process.env.SKY_NET_TOKEN;
 
class TrackingController {
	static trackingWaybill = async (req, res, next) => {
		try {
			const { carrier, waybill } = req.query;
			let response;

			if (carrier === 'JNE') {
				response = await axios.post(`${JNE_URL}/${waybill}`, 
				querystring.stringify({
					username: JNE_USERNAME,
					api_key: JNE_KEY
				}), {
					headers: { 
						'Content-Type': 'application/x-www-form-urlencoded'
					}});
			}

			if (carrier === 'SKYNET') {
				response = await axios({
					method: 'GET',
					url: `${SKYNET_URL}?ReferenceNumber=${waybill}`,
					headers: {
						Token: SKYNET_TOKEN
					},
				});
			}
			
			res
				.status(200)
				.json({ data: response.data });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = { TrackingController }