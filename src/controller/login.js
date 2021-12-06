const notifier = require("node-notifier");
const oracledb = require("oracledb");
const { obtenerConn } = require("../bd/database2");
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;



const consultarUsuario = async (parametros) => {
  conn = await obtenerConn();
  const sql =
    "select username, password,tipo from usuario where username = :usuario and password = :password";
  const result = await conn.execute(sql, parametros);
  const sql2 =
    "select tipo from usuario where username = :usuario and password = :password";
  const result2 = await conn.execute(sql2, parametros);
  if (result2.rows != "") {
    notifier.notify({
      title: "Siglo 21",
      message: "Logeado como " + result2.rows,
    });
  }
  return result.rows[0];
};

module.exports = {
  consultarUsuario
};
