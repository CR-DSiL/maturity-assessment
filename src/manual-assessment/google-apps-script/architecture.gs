function calculate_Architecture(db_Url, companyId, itemResponses) {
  var max_Score = 0;
  var actual_score = 0;

  Logger.log('Calculating Architecture score');
  for(var i = 0; i < itemResponses.length; i++ ) {
    var itemResponse = itemResponses[i];
    var questionID = itemResponse.getItem().getTitle().split(".")[0] + itemResponse.getItem().getTitle().split(".")[1];
    writeResponses(db_Url, companyId, questionID, itemResponse.getResponse());

    if(itemResponse.getItem().getTitle() == 'D.1') {
      max_Score += 0;
      actual_score += 0;
    }
    else if(itemResponse.getItem().getTitle() == 'D.2') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Using Automated Version Management (e.g. SemVer tools like gitVersion)') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Automated Versioning the binary components during build') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Manually updating version files during development') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'D.3') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Automatic Deployment of Infra and Application Via Pipelines') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Automatic Deployment of Software using DevOps Pipelines') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Uninstall/Re-Install Automatically via Scripts') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'D.4') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'All the Sensitive and Compliance are classified') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Data Classification done only for the personal data(e.g. GDPR)') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Data Classification done only for documents') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
  
  }

  Logger.log('maximum score of section D is %s', max_Score);
  Logger.log('actual score of section D is %s', actual_score);

  var score = percentage(actual_score, max_Score);
  Logger.log('Architecture Score: %s', score);

  Logger.log('Updating Architecture score to database');
  var sectionId = 4;
  writeScores(db_Url, companyId, sectionId, score);
  Logger.log('Updated Architecture score');

  return score;

}
