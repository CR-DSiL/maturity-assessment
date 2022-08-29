function calculate_standardizedToolsets(db_Url, companyId, itemResponses) {
  var max_Score = 0;
  var actual_score = 0;

  if(itemResponses[0].getItem().getTitle().split(".")[0] == 'B') {
    var cat = 'Infra';
    var sectionId = 2;
  }
  else {
    var cat = 'App';
    var sectionId = 3;
  }

  Logger.log('Calculating Standardized %s Toolsets Score', cat);

  for(var i = 0; i < itemResponses.length; i++ ) {
    var itemResponse = itemResponses[i];
    var questionID = itemResponse.getItem().getTitle().split(".")[0] + itemResponse.getItem().getTitle().split(".")[1];
    writeResponses(db_Url, companyId, questionID, itemResponse.getResponse());

    max_Score += 1;
    if(itemResponse.getResponse() == "No tool is used") {
      actual_score += 0;
    }
    else {
      actual_score += 1;
    }
  }

  Logger.log('maximum score of section %s is %s', itemResponse.getItem().getTitle().split(".")[0], max_Score);
  Logger.log('actual score of section %s is %s', itemResponse.getItem().getTitle().split(".")[0], actual_score);
  
  var score = percentage(actual_score, max_Score);
  Logger.log('Standardized %s Toolsets Score: %s', cat, score);

  Logger.log('Updating Standardized %s Toolsets Score to database',cat);
  writeScores(db_Url, companyId, sectionId, score);
  Logger.log('Updated Standardized %s Toolsets Score', cat);

  return score;

}
