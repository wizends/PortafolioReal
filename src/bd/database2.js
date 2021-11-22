const oracledb = require('oracledb')
const config = oracledb.getConnection({
  user: 'portafolio1',
  password: '123',
  connectString: 'localhost:1521/xe',
})

function obtenerConn(){
  return config;
}

module.exports = {obtenerConn};

/*
async function getEmployee (parametros) {
  let conn

  try {
    conn = await obtenerConn();
    const sql = 'select * from usuario where username = :usuario and password = :password';
    const result = await conn.execute(sql,parametros) 
 
    console.log(result.rows)
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

getEmployee(
  parametros = [
  "Ricardo",
  "123"]
  )*/