const bcrypt = require('bcrypt');

const password = "SubPlant555"; // SALASana tähä 

(async () => {
  const hash = await bcrypt.hash(password, 12);
  console.log("Hash:", hash);
})();