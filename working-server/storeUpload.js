const storeFileSystem = require('./storeFileSystem');
const storeUpload = async (file) => {
	const { createReadStream, filename, mimetype, encoding } = await file.file;
	console.log(createReadStream);
	console.log(filename);
	console.log(mimetype);
	console.log(encoding);
	return storeFileSystem({ filename, mimetype, encoding });
};

module.exports = storeUpload;
