const bcrypt = require("bcrypt");

(async () => {
    const hash = await bcrypt.hash("admin123", 10);
    console.log(hash);

    const check = await bcrypt.compare("admin123", hash);
    console.log("Match:", check);
})();