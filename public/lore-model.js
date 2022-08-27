export const makeLorePrompt = ({
  settings,
  characters,
  messages,
  objects,
  dstCharacter,
}) => `\
${characterLore}

# Setting
${settings.join('\n\n')}

## Characters
${
  characters.map((c, i) => {
    return `Id: ${thingHash(c, i)}
    Name: ${c.name}
    Bio: ${c.bio}
`;
  }).join('\n\n')
}

# Objects
${objects.map((o, i) => thingHash(o, i)).join('\n')}

# Basic Reactions
${reactionExamples}

# Basic Actions 
${actionExamples}

# Examples of How to Parse Inputs
${inputParsingExamples}
${messages.length > 0 ? 'Input:\n' : ''}
${messages.map(m => {
    const characterIndex = characters.indexOf(m.character);
    // const suffix = `[emote=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`;
    // return `+${thingHash(m.character, characterIndex)}: ${m.message} ${suffix}`;
    const suffix = `react=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`
    return `+${thingHash(m.character, characterIndex)}: ${m.message}`;
  }).join('\n')}
+${dstCharacter ? `${thingHash(dstCharacter, characters.indexOf(dstCharacter))}:` : ''}
Output:`;

const parseLoreResponse = response => {
  let match;
if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\[]*?)\[emote=([\s\S]*?),action=([\s\S]*?),object=([\s\S]*?),target=([\s\S]*?)\]$/)) {
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5].trim();
    const action = match[6].trim();
    const object = match[7].trim();
    const target = match[8].trim();
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\(]*?)\((\s*react\s*=([\s\S]*?))*,*(\s*action\s*=([\s\S]*?))*,*(\s*object\s*=([\s\S]*?))*,*(\s*target\s*=([\s\S]*?))*\)*$/)){
    console.log("match2 found", match)
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5] ? match[6].trim() : 'none';
    const action = match[7] ? match[8].trim() : 'none';
    const object = match[9] ? match[10].trim() : 'none';
    const target = match[11] ? match[12].trim() : 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\(]*?)\(([\s\S]*?)\)*$/)){
    console.log("match3 found", match)
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = 'none';
    const action = 'none';
    const object = 'none';
    const target = 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  }
  else if (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\[]*?)$/)) {
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = 'normal';
    const action = 'none';
    const object = 'none';
    const target = 'none';
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else {
    return null;
  }
};
export const makeLoreStop = (localCharacter, localCharacterIndex) => `\n+${thingHash(localCharacter, localCharacterIndex)}`;
export const postProcessResponse = (response, characters, dstCharacter) => {
  response = response.trim();
  return response;
};
export const parseLoreResponses = response => response
  .split('\n')
  .map(s => parseLoreResponse(s))
  .filter(o => o !== null);

export const makeCommentPrompt = ({
  name,
  // age,
  // sex,
}) => {
  return `\
${commentLore}
prompt: ${name}
response:`;
};
export const makeCommentStop = () => {
  return `\n\n`;
};
export const parseCommentResponse = response => response.replace(/^ /, '');

export const makeSelectTargetPrompt = ({
  name,
  description,
}) => {
  return `\
${targetSelectPrompt}
${targetSelectExamples}

prompt: ${_cleanName(name)}${description ? ` ${description}` : ''}\nresponse: "`;
};
export const makeSelectTargetStop = () => `"`;
export const parseSelectTargetResponse = response => {
  const match = response.match(/\s*([^\n]*)/);
  return match ? match[1] : '';
};

export const makeSelectCharacterPrompt = ({
  name,
  description,
}) => {
  return `\
${selectCharacterPrompt}
${selectCharacterExamples}

prompt: ${_cleanName(name + ' (Character)')}${description ? ` ${description}` : ''}\nresponse: "`;
};
export const makeSelectCharacterStop = () => `"`;
export const parseSelectCharacterResponse = response => {
  const match = response.match(/([^\n]*)/);
  const value = match ? match[1] : '';
  const done = !value;
  return {
    value,
    done,
  };
};

export const makeBattleIntroductionPrompt = ({
  name,
  bio,
}) => {
  return `\
${battleIntroductionPrompt}
${name}: "`;
};
export const makeBattleIntroductionStop = () => `"`;
export const parseBattleIntroductionResponse = response => response;

export const makeChatPrompt = ({
  // name,
  // bio,
  messages,
  nextCharacter,
}) => {
  // Modifying messages to include emotes
  return `\
${actionsExamples}

${messages.map(message => {
  return `${message.name}: "${message.text} (react = ${(message.emote ? message.emote : 'normal')})"`;
}).join('\n')}
${nextCharacter}: "`;
};
export const makeChatStop = () => `\n`;
export const parseChatResponse = response => {
  response = '"' + response;

  let match;
  if (match = response.match(/\s*"(.*)\(react\s*=\s*([\s\S]*?)\s*\)"\s*(\*END\*)?/) ){
    const value = match ? match[1] : '';
    const emote = match ?match[2] : '';
    const done = match ? !!match[3] : true;

    console.log("Emotion: ", emote)

    return {
      value,
      emote,
      done,
    };
  } else if (match = response.match(/\s*"(.*)\s*"\s*(\*END\*)?/) ){
    const value = match ? match[1] : '';
    const emote = 'normal';
    const done = match ? !!match[3] : true;

    console.log("Emotion: ", emote)

    return {
      value,
      emote,
      done,
    };
  }
  
};

export const makeOptionsPrompt = ({
  // name,
  // bio,
  messages,
  nextCharacter,
}) => {
  return `\
${actionsExamples}

${messages.map(message => {
  return `${message.name}: "${message.text} (react = ${(message.emote ? message.emote : 'normal')})"`;
}).join('\n')}
Options for ${nextCharacter}: [`;
};
export const makeOptionsStop = () => `\n`;
export const parseOptionsResponse = response => {
  response = '[' + response;
  
  const options = [];
  const r = /\s*\[(.*?)\(react\s*=\s*([\s\S]*?)\)\s*\]\s*/g;
  let match;
  while (match = r.exec(response)) {
    const option = match[1];

    // Parsing the emotion from the list of options.
    const emote = match[2];
    console.log("Emotions in Options: ", emote);

    // Passing both text respons and emotes
    options.push({
      message: option,
      emote: emote
    });
  }
  
  const done = options.length === 0;

  return {
    value: options,
    done,
  };
};

export const makeCharacterIntroPrompt = ({
  name,
  bio,
}) => {
  return `\
${characterIntroLore}
${name}${bio ? ` (${bio})` : ''}:`;
};
export const makeCharacterIntroStop = () => `\n`;
export const parseCharacterIntroResponse = response => {
  response = response.replace(/^ /, '');
  const match = response.match(/^(.*)\s+\(onselect:\s+(.*)\)$/);

  if (match) {
    const message = match[1] || '';
    const onselect = match[2] || '';

    return {
      message,
      onselect,
    };
  } else {
    return null;
  }
};