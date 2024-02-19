'use strict';
import "dotenv/config"
import {envVarsSchema} from "./utils/envValidate";
import {AudioIO, IoStreamRead, SampleFormat16Bit} from "naudiodon";
import {createModel} from "./lib/deepspeech";

export class Application {
	public start() {
		const {value: env, error} = envVarsSchema.prefs({errors: {label: "key"}}).validate(process.env);
		if(error){
			throw new Error("Config validation error: ${error.message}")
		}
		const model = createModel(env.DEEPSPEECH_MODEL_PATH);

		const audioIO: IoStreamRead = AudioIO({
			inOptions: {
				channelCount: 1, // Измените на 2, если у вас стерео
				sampleFormat: SampleFormat16Bit,
				sampleRate: 16000, // Измените на 44100, если у вас другая частота дискретизации
				deviceId: -1, // Используйте -1 или пропустите deviceId, чтобы выбрать устройство по умолчанию
				closeOnError: true,
			}
		});

		audioIO.start();
		audioIO.on("data", (data: Buffer) => {
			const text = model.stt(data);
			console.log('Распознанный текст:', text);
		})
	}
}


const app = new Application()
app.start();