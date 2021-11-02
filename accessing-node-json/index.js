const { readFile, writeFile } = require('fs');

const jsonReader = (filePath, callback) => {
	readFile(filePath, 'utf-8', (error, fileData) => {
		if (error) {
			return callback && callback(error);
		} else {
			try {
				const object = JSON.parse(fileData);
				return callback && callback(null, object);
			} catch (error) {
				return callback && callback(error);
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

const newObject = {
	message: 'hello world',
	count: 100,
};

writeFile('./newFile.json', JSON.stringify(newObject, null, 2), (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('File successfully written.');
	}
});

//read and write

jsonReader('./person.json', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		data.age += 1;
		writeFile('./person.json', JSON.stringify(data, null, 2), (err) => {
			if (err) {
				console.log(err);
			}
		});
		console.log(data.about);
	}
});
