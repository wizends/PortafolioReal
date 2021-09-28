const electron = require("electron");
const sql = require("mssql");
const config = {
  user: "ql*****",
  password: "qlh****",
  server: "123.20.****",
  database: "QLHS",
};
async () => {
  try {
    await sql.connect(config);
    const result = await sql.query`select * from DM_DONVI`;
    console.dir(result);
  } catch (err) {
    console.log(err);
  }
};
