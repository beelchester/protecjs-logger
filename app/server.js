import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const origin = process.env.ORIGIN;
app.use(cors({
	origin,
	methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
const url = process.env.INFLUXDB_URL;

const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket);
writeApi.useDefaultTags({ app: 'protecjs-logger' });

app.post('/api/log', (req, res) => {
	const { type, message, userAgent, ip } = req.body;

	const point = new Point('protecjs-logs')
		.tag('type', type)
		.stringField('message', message)
		.stringField('userAgent', userAgent)
		.stringField('ipAddress', ip)

	writeApi.writePoint(point);

	console.log('Log received:', req.body);

	res.status(200);
});

app.get('/health', (_req, res) => {
	res.status(200).send('OK');
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
