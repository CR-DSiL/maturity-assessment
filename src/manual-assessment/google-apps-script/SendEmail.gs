function sendEmail(responderName, responderEmail, maturityLevel, score_A) {
  var tmpl = HtmlService.createTemplateFromFile('Sample-Template');
  tmpl.responderName = responderName;
  tmpl.maturityLevel = maturityLevel;
  tmpl.sectionA_score = score_A;

  var  message = tmpl.evaluate().getContent();

  Logger.log("Sending an email");
  try{
    MailApp.sendEmail({
      to: responderEmail,
      subject: "Your service delivery maturity level results are here!",
      htmlBody: message
    });
    Logger.log("Email Sent");
  }catch (err) {
    // TODO(developer) - Handle exception from the API
    Logger.log('Email failed with an error %s', err.message);
  }
  
}
