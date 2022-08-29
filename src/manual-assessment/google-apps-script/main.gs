function main() {
  
  /**
   * Storing Active form details, form responses into varibales
   */
  var form = FormApp.getActiveForm(); //Gets active form details
  var formResponses = form.getResponses(); //Gets all the form responses as an array
  
  /**
   * Fetching form response of the last submitted response since this function triggers when a response is submitted
   * Fetching all item reponses of last submitted response and storing in a variable
   * Fetching unique response details such as response Id and timeStamp
   */
  var formResponse = formResponses[formResponses.length-1]; //Gets last submitted form reponse
  var responseID = formResponse.getId(); //Gets responseID of last submitted response
  var timeStamp = formResponse.getTimestamp(); //Gets TimeStamp of last submitted response
  var itemResponses = formResponse.getItemResponses();  //Gets item responses of last submitted response as an array

  /**
   * Looping through each item response and splitting the responses into separate arrays respective to the section
   */
  var itemResponses_common = [responseID,timeStamp];
  var itemResponses_sectionA = [];
  var itemResponses_sectionB = [];
  var itemResponses_sectionC = [];
  var itemResponses_sectionD = [];
  var itemResponses_sectionE = [];
  var itemResponses_sectionF = [];

  for (var item = 0; item < itemResponses.length; item++) {
    
    var itemResponse = itemResponses[item];
    if(itemResponse.getItem().getTitle().split(".")[0] == 'A') {
      itemResponses_sectionA.push(itemResponse); 
    }
    else if(itemResponse.getItem().getTitle().split(".")[0] == 'B') {
      itemResponses_sectionB.push(itemResponse); 
    }
    else if(itemResponse.getItem().getTitle().split(".")[0] == 'C') {
      itemResponses_sectionC.push(itemResponse); 
    }
    else if(itemResponse.getItem().getTitle().split(".")[0] == 'D') {
      itemResponses_sectionD.push(itemResponse); 
    }
    else if(itemResponse.getItem().getTitle().split(".")[0] == 'E') {
      itemResponses_sectionE.push(itemResponse); 
    }
    else if(itemResponse.getItem().getTitle().split(".")[0] == 'F') {
      itemResponses_sectionF.push(itemResponse); 
    }
    else {
      itemResponses_common.push(itemResponse.getResponse());
    }
    
  }

  /**
   * Defining the DB related variables here
   */
  var db_server = 'cr-devopsassessment.database.windows.net';
  var db_name = 'cr-maturityassessment';
  var db_username = 'cr-admin';
  var db_password = 'P455w0rd@12345';
  var db_Url = 'jdbc:sqlserver://'+ db_server + ':1433;databaseName=' + db_name + ';user=' + db_username + ';password=' + db_password;


  /**
   * Store the new response to the table
   */
  var companyId = handleSubmit(db_Url, itemResponses_common);
  if(companyId == null) {
    companyId = fetchId(db_Url, itemResponses_common);
  }

  /**
   * Calculating the score for each section and storing the results in the database
   */
  var score_A = calculate_TeamAgility(db_Url, companyId, itemResponses_sectionA);
  var score_B = calculate_standardizedToolsets(db_Url, companyId, itemResponses_sectionB);
  var score_C = calculate_standardizedToolsets(db_Url, companyId, itemResponses_sectionC);
  var score_D = calculate_Architecture(db_Url, companyId, itemResponses_sectionD);
  var score_E = calculate_devsecopsPractice(db_Url, companyId, itemResponses_sectionE);
  var score_F = calculate_devsecopsAutomation(db_Url, companyId, itemResponses_sectionF);

  /** 
   * Calculating the average score of all the sections and defining maturity level
   */
  var average_score = (score_A + score_B + score_C + score_D + score_E + score_F)/6;
  var maturity_level;

  Logger.log('Average Score: %s', average_score);

  Logger.log('Updating Average score and maturity level to database');
  updateMaturityScore(db_Url, companyId, average_score);
  Logger.log('Updated Average score and maturity level');


  //sendEmail(itemResponses_common[2], itemResponses_common[3], maturity_level, score_A);
}
