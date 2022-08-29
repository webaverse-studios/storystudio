// injected script variables
// - config (object)
// maxExamples: limit number of examples in any generation 
// config = {
//  maxExamples: 8
// }
// - examples (array)
// inspirations = ['Final Fantasy']
// availableReactions = ['surprise']
// - availableActions (array)
// availableActions = ['none', 'react']
// - lore (object)
// lore = {
//  overview: {
//    prompt: `What is the name of the game?`,
//   examples: ['I am a meat popsicle`]
//  }  
// } 
// how to use script variables:
// eg console.log(lore)

export const makeLorePrompt = ({
  settings,
  characters,
  messages,
  objects,
  dstCharacter,
}) => `\
${lore.overview.prompt}
${shuffleArray(lore.overview.examples).join(`\n`)}

# Setting
${settings}

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

${lore.reactionTypes.prompt}
${lore.reactionTypes.examples.join(`\n`)}

${lore.actionTypes.prompt}
${lore.actionTypes.examples.join(`\n`)}

${lore.inputParsing.prompt}
${shuffleArray(lore.inputParsing.examples).join(`\n`)}

${messages.length > 0 ? 'Input:\n' : ''}
${messages.map(m => {
    const characterIndex = characters.indexOf(m.character);
    // const suffix = `[emote=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`;
    // return `+${thingHash(m.character, characterIndex)}: ${m.message} ${suffix}`;
    const suffix = `react=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`
    console.log('m.character', m);
    return `+${thingHash(m.character, characterIndex)}: ${m.message}`;
  }).join('\n')}
+${dstCharacter ? `${thingHash(dstCharacter, characters.indexOf(dstCharacter))}:` : ''}
Output:`;

export const parseLoreResponse = response => {
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
${lore.scene.prompt}
${shuffleArray(lore.scene.examples).join(`\n`)}
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
${lore.object.prompt}
${shuffleArray(lore.object.examples).join(`\n`)}
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
${lore.character.prompt}
${shuffleArray(lore.character.examples).join(`\n`)}

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
${lore.battle.prompt}
${shuffleArray(lore.battle.examples).join(`\n`)}
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
  ${lore.actions.prompt}
  ${shuffleArray(lore.actions.examples).join(`\n`)}

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
${lore.intros.prompt}
${shuffleArray(lore.intros.examples).join(`\n`)}
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

function shuffleArray(array) {
  const shortenArray = (array) => {
      const maxLength = config?.maxExamples ?? 5;
      if (array.length > maxLength) {
          return array.slice(0, maxLength);
      }
      return array;
  }
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return shortenArray(array);
};

function thingHash(o, index) {
  function murmurhash3(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
        k1 =
            ((key.charCodeAt(i) & 0xff)) |
            ((key.charCodeAt(++i) & 0xff) << 8) |
            ((key.charCodeAt(++i) & 0xff) << 16) |
            ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;

        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }

    k1 = 0;

    switch (remainder) {
        case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1: k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }
  console.log(o);
  return`${murmurhash3(o.name).toString(16)}/${o.name}#${index + 1}`
};