/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'Welcome, you can say Hello or Help or tell me about your sleep. Which would you like to try?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const HelloIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Hello World!';

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const GetSleepQualityIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'GetSleepQualityIntent'
    );
  },
  handle(handlerInput) {
    const greatSleep = ['excellent', 'wonderful', 'magnificent', 'restful'];
    const goodSleep = ['satisfactory', 'good', 'ok', 'adequate'];
    const badSleep = [
      'poor',
      'extremely poor',
      'inadequate',
      'insufficient',
      'restless',
    ];

    const slots = handlerInput.requestEnvelope.request.intent.slots;

    let numHours = slots.NumberOfHours.value;
    let sleepHours = parseInt(numHours);

    let sleepQuality = slots.SleepQuality.value;

    if (Number.isInteger(sleepHours)) {
      let speakOutput = '';

      if (greatSleep.includes(sleepQuality)) {
        sleepHours += 2;
        speakOutput = "Glad to hear you had a good night's sleep. ";
      }

      if (goodSleep.includes(sleepQuality)) {
        sleepHours += 1;
        speakOutput = "Glad to hear you had a good night's sleep. ";
      }

      if (badSleep.includes(sleepQuality)) {
        sleepHours -= 2;
        speakOutput =
          'Sleep quality is so important and it sound like you need better quality sleep. ';
      }

      if (sleepHours > 12) {
        speakOutput += 'You may have gotten too much sleep.';
      } else if (sleepHours > 8) {
        speakOutput +=
          'You should feel refreshed after so many hours of sleep.';
      } else if (sleepHours > 7) {
        speakOutput += 'You got the daily recommended amount of sleep.';
      } else if (sleepHours >= 6) {
        speakOutput += "It couldn't hurt to sleep longer next time.";
      } else if (sleepHours < 6) {
        speakOutput += 'You definitely need to get more sleep.';
      } else {
        speakOutput += "I didn't quite get that. Can you repeat?";
      }

      return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    } else {
      const speakOutput =
        "I'm sorry. I don't know what happened. Tell me again.";
      const reprompt = 'How many hours of sleep did you get last night?';

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .repromt(reprompt)
        .getResponse();
    }
  },
};

const FindSleepClinicIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'FindSleepClinicIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Sleep Clinic finder intent!';

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput = 'You can say hello to me! How can I help?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Goodbye!';

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      'Sorry, I had trouble doing what you asked. Please try again.';
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloIntentHandler,
    GetSleepQualityIntentHandler,
    FindSleepClinicIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/hello-world/v1.2')
  .lambda();
