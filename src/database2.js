const oracledb = require('oracledb')
const config = {
  user: 'portafolio1',
  password: '123',
  connectString: 'localhost:1521/xe'
}
async function getEmployee (empId) {
  let conn

  try {
    conn = await oracledb.getConnection(config)
    const result = await conn.execute(
      'select * from usuario where ID = :id',
      [empId]
    )

    console.log(result.rows)
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

getEmployee("1u")