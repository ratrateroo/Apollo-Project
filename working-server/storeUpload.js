const storeFileSystem = require('./storeFileSystem');
const storeUpload = async (file) => {
	const { createReadStream, filename, mimetype, encoding } = await file.file;
	console.log(createReadStream);
	console.log(filename);
	console.log(mimetype);
	console.log(encoding);
	const stream = createReadStream();
	//console.log(stream);
	return storeFileSystem({ stream, mimetype, filename });
};

module.exports = storeUpload;
