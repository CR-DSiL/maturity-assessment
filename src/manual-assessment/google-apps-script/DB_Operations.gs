/**
 * Write initial details through responses to the table
 */

function handleSubmit(db_Url, itemResponses) {
  Logger.log('Adding new response to the database');
  try {
    var conn = Jdbc.getConnection(db_Url);
    var sql_string = 'IF NOT EXISTS (SELECT * FROM tbl_Company WHERE responseID = ?' + ')' +
                        'BEGIN ' + 
                          'INSERT INTO tbl_Company ' + '(responseId, timeStamp, Name, Email, Company, Expectation) VALUES (?, ?, ?, ?, ?, ?)' + 
                        ' END';
    var stmt = conn.prepareStatement(sql_string, 1);
    stmt.setString(1, itemResponses[0]);
    stmt.setString(2, itemResponses[0]);
    stmt.setString(3, itemResponses[1]);
    stmt.setString(4, itemResponses[2]);
    stmt.setString(5, itemResponses[3]);
    stmt.setString(6, itemResponses[4]);
    stmt.setString(7, itemResponses[5]);
    stmt.execute();

    var rs = stmt.getGeneratedKeys();

    Logger.log('Successfully added new response to the database');

    if(rs.next()) {
      var companyId = rs.getString(1);
    }

  }catch (err) {
    // TODO(developer) - Handle exception from the API
    Logger.log('Failed with an error %s', err.message);
  }

  return companyId;
}


/**
 * Fetch companyId if it is not a new reposne
 */
function fetchId(db_Url, itemResponses){
  Logger.log('Looks like it is not a new response, fetching company Id from existing record');
  try{
    var conn = Jdbc.getConnection(db_Url);
    var sql_query = 'SELECT * FROM tbl_Company WHERE responseID = ?';    
    var stmt_query = conn.prepareStatement(sql_query);
    stmt_query.setString(1,itemResponses[0]);
    var exec_query = stmt_query.executeQuery();
    
    if(exec_query.next()) {
      companyId = exec_query.getString(1);
    }
  }catch (err) {
    // TODO(developer) - Handle exception from the API
    Logger.log('Failed with an error while fetching company Id value %s', err.message);
  }

  return companyId;
}


/**
 * Update individual reponses to the database
 */

function writeResponses(db_Url, companyId, questionId, response) {
  
  try{
    var conn = Jdbc.getConnection(db_Url);
    var sql_string = 'IF NOT EXISTS (SELECT * FROM tbl_Manual_Responses WHERE companyId = ? AND QuestionId = ?' + ')' +
                        'BEGIN ' + 
                          'INSERT INTO tbl_Manual_Responses ' + '(companyId, QuestionId, Response) VALUES (?, ?, ?)' + 
                        ' END';
    var stmt = conn.prepareStatement(sql_string);
    stmt.setString(1, companyId);
    stmt.setString(2, questionId);
    stmt.setString(3, companyId);
    stmt.setString(4, questionId);
    stmt.setString(5, response);
    stmt.execute();
  }catch (err) {
    // TODO(developer) - Handle exception from the API
    Logger.log('Failed with an error %s', err.message);
  }
}


/**
 * Update section scores to the database
 */

function writeScores(db_Url, companyId, sectionId, score) {
  
  try{
    var conn = Jdbc.getConnection(db_Url);
    var sql_string = 'IF NOT EXISTS (SELECT * FROM tbl_Section_Results WHERE companyId = ? AND sectionId = ?' + ')' +
                        'BEGIN ' + 
                          'INSERT INTO tbl_Section_Results ' + '(companyId, sectionId, manualScore) VALUES (?, ?, ?)' + 
                        ' END';
    var stmt = conn.prepareStatement(sql_string);
    stmt.setString(1, companyId);
    stmt.setString(2, sectionId);
    stmt.setString(3, companyId);
    stmt.setString(4, sectionId);
    stmt.setString(5, score);
    stmt.execute();
  }catch (err) {
    // TODO(developer) - Handle exception from the API
    Logger.log('Failed with an error %s', err.message);
  }
}


/**
 * Update maturity results to the database
 */
function updateMaturityScore(db_Url, companyId, average_score) {

  if(average_score <= 20) {
    maturity_level = 'Level 1';
  }
  else if(average_score > 20 && average_score <=40) {
    maturity_level = 'Level 2';
  }
  else if(average_score > 40 && average_score <=60) {
    maturity_level = 'Level 3';
  }
  else if(average_score > 60 && average_score <=80) {
    maturity_level = 'Level 4';
  }
  else if(average_score > 80 && average_score <=100) {
    maturity_level = 'Level 5';
  }

  Logger.log('Maturity Level: %s', maturity_level);

  try{
    var conn = Jdbc.getConnection(db_Url);
    var sql_string = 'IF NOT EXISTS (SELECT * FROM tbl_Maturity_Results WHERE companyId = ?' + ')' +
                        'BEGIN ' + 
                          'INSERT INTO tbl_Maturity_Results ' + '(companyId, manualAverageScore, manualMaturityLevel) VALUES (?, ?, ?)' + 
                        ' END';
    var stmt = conn.prepareStatement(sql_string);
    stmt.setString(1, companyId);
    stmt.setString(2, companyId);
    stmt.setString(3, average_score);
    stmt.setString(4, maturity_level);
    stmt.execute();
  }catch (err) {
    // TODO(developer) - Handle exception from the API
    Logger.log('Failed with an error %s', err.message);
  }
}