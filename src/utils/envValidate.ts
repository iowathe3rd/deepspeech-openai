import * as joi from "joi"

export const envVarsSchema = joi
	.object()
	.keys({
		NODE_ENV: joi.string().valid("production", "development", "test").required(),
		DEEPSPEECH_MODEL_PATH: joi.string().required()
	}).unknown()