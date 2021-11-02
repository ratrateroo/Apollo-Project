const { readFile } = require('fs');

const jsonReader = (filePath, callback) => {
	readFile(filePath, 'utf-8', (error, fileData) => {
		if (error) {
			return callback && callback(err);
		} else {
			try {
				const object = JSON.parse(fileData);
				return callback && callback(null, object);
			} catch (error) {
				return callback && callback(err);
			}
		}
	});
};

jsonReader('./files.json', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data.about);
	}
});
