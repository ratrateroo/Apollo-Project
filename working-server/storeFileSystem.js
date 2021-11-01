const shortId = require('shortid');
const path = require('path');
//root directory __dirname
//file upload directory /public/images

const storeFileSystem = ({ stream, filename, mimetype }) => {
	const id = shortId.generate();
	const newurl = new URL(path.join(__dirname, './public/images'));
	console.log(newurl.href);
	console.log(new URL(path.join(__dirname, './public/images')).href);
};

module.exports = storeFileSystem;
