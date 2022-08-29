function calculate_devsecopsPractice(db_Url, companyId, itemResponses) {
  var max_Score = 0;
  var actual_score = 0;

  Logger.log('Calculating DevSecOps Practice score');
  for(var i = 0; i < itemResponses.length; i++ ) {
    var itemResponse = itemResponses[i];
    var questionID = itemResponse.getItem().getTitle().split(".")[0] + itemResponse.getItem().getTitle().split(".")[1];
    writeResponses(db_Url, companyId, questionID, itemResponse.getResponse());

    if(itemResponse.getItem().getTitle() == 'E.1') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Structure System analysis methodology') {
        actual_score += 0;
      }
      else if(itemResponse.getResponse() == 'Rapid Application Development') {
        actual_score += 0;
      }
      else if(itemResponse.getResponse() == 'Agile Based Development (Scrum, TDD etc.)') {
        actual_score += 0;
      }
      else {
        actual_score += 0;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.2') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Done means collecting real-time telemetry on quality of service and usage against new deployments') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Done means software is deployed in production, available to real users') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Done means a potentially shippable increment is available at the end of a timebox') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.3') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'We maintain an artifact repository (Nuget, Nexus, Artifactory, etc.) with the latest binaries and all teams pull from there') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Services are versioned and automatically tested against the client contracts') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'We use a work item tracking system') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.4') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'As part of the pull request and code review flow before code is committed') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Security tests are run In the continuous integration and continuous delivery pipeline') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Before any production update') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.5') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Code review is performed twice, Peer review when pull request is raised and SAST before merging') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'All code changes are peer-reviewed before being committed to the master or trunk by means of a pull request workflow') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Some code is reviewed and we capture the review history using a pull request workflow or the equivalent') {
        actual_score += 2;
      }
      else if(itemResponse.getResponse() == 'We do live peer reviews or pair programming') {
        actual_score += 1;
      }
      else {
        actual_score += 0;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.6') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Using Management tools like Jira, DevOps Azure etc.') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'Work is Assigned Through Email') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Assignment is done via centralized excel or sharepoint') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.7') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Production incidents are handled by operations staff and escalated on an exception basis to engage developers') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'They collaborate in real time, in a physical team room/war room or online chat room') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Devs and Ops do a joint retrospective to review the root cause analysis') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }
    else if((itemResponse.getItem().getTitle() == 'E.8') || (itemResponse.getItem().getTitle() == 'E.9')) {
      max_Score += 2;
      if(itemResponse.getResponse() == 'Yes') {
        actual_score += 2;
      }
      else {
        actual_score += 0;
      }
    }
    else if(itemResponse.getItem().getTitle() == 'E.10') {
      max_Score += 4;
      if(itemResponse.getResponse() == 'Using relevant DB Project and build/release by CI/CD') {
        actual_score += 4;
      }
      else if(itemResponse.getResponse() == 'DB scripts are maintained in text file and deployed by CD') {
        actual_score += 3;
      }
      else if(itemResponse.getResponse() == 'Backup and Restore Method') {
        actual_score += 2;
      }
      else {
        actual_score += 1;
      }
    }

  }

  Logger.log('maximum score of section E is %s', max_Score);
  Logger.log('actual score of section E is %s', actual_score);

  var score = percentage(actual_score, max_Score);
  Logger.log('DevSecOps Practice Score: %s', score);

  Logger.log('Updating DevSecOps Practice score to database');
  var sectionId = 5;
  writeScores(db_Url, companyId, sectionId, score);
  Logger.log('Updated DevSecOps Practice score');

  return score;

}
