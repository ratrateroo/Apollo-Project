const fs = require('fs');

const folderName = './public/images';

module.exports = () => {
	fs.readdir(folderName, (err, files) => {
		files.forEach((file) => {
			console.log(file);
		});
	});
};
