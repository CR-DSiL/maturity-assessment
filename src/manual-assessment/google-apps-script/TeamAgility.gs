function calculate_TeamAgility(db_Url, companyId, itemResponses) {
  var max_Score = 0;
  var actual_score = 0;

  Logger.log('Calculating Team Agility Score');

  for(var i = 0; i < itemResponses.length; i++ ) {
    var itemResponse = itemResponses[i];
    var questionID = itemResponse.getItem().getTitle().split(".")[0] + itemResponse.getItem().getTitle().split(".")[1];
    writeResponses(db_Url, companyId, questionID, itemResponse.getResponse());

    if(itemResponse.getItem().getTitle() == 'A.1') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Between one day and one week') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Between one week and one month') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Between one month and six months') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.2') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Yes, every release') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Yes, once a quarter') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Yes, once a half yearly') {
        actual_score += 2;
      }
      else if(itemResponse.getResponse() == 'Yes, once a year') {
        actual_score += 1;
      }
      else {
        actual_score += 0;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.3') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Less than one hour') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Less than one day') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Between one day and one week') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.4') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'On demand (multiple deployments per day)') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Between once per week and once per month') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Between once per month and once every six months') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.5') {
      max_Score += 4;
      if(itemResponse.getResponse() == '0% - 15%') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == '16% - 30%') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == '31% - 45%') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.6') {
      max_Score += 2;
      if(itemResponse.getResponse() == 'Yes') {
        actual_score += 2;
      }
      else if(itemResponse.getResponse() == 'No, but they are recorded') {
        actual_score += 1;
      }
      else {
        actual_score += 0;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.7') {
      max_Score += 2;
      if(itemResponse.getResponse() == 'Yes') {
        actual_score += 2;
      }
      else if(itemResponse.getResponse() == 'No, but they are recorded') {
        actual_score += 1;
      }
      else {
        actual_score += 0;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'A.8') {
      max_Score += 2;
      if(itemResponse.getResponse() == 'Yes') {
        actual_score += 2;
      }
      else {
        actual_score += 0;
      }
    }
  }
  
  Logger.log('maximum score of section A is %s', max_Score);
  Logger.log('actual score of section A is %s', actual_score);

  var score = percentage(actual_score, max_Score);
  Logger.log('Team Agility Score: %s', score);
  
  Logger.log('Updating Team Agility score to database');
  var sectionId = 1;
  writeScores(db_Url, companyId, sectionId, score);
  Logger.log('Updated Team Agility score');
  
  return score;
  
}