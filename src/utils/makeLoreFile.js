export const makeLoreFilePrompt = ({ type, setting, character, npc, mob, object }) => {
    return `\
    ${header}
    
    """
    
    # Transcript
    
    axel: We're looking for Lara. You know where we can find her?
    miranda: I can find anything, you just keep feeding me tokens and coffee.
    zaphod: Anything you need, you just let me know.
    miranda: Thanks. How do you guys know each other again? 
    zaphod: Best friends. From waaay back in the day.
    
    """
    
    # Transcript 
    
    millie: Hey Eric, can I ask you something?
    /action millie moves to eric
    eric: Sure, what is it?
    millie: Do you ever wonder why we're here?
    eric: Is that a way to tee up a convo about the drop tomorrow?
    /action millie emotes joy
    millie: It might not be!
    eric: Millie, I'm tending to serious business. The org needs me to break through this firewall by tonight. Leave me alone.
    /action eric moves to computer
    
    """
    
    # Setting
    
    ${`${setting.name}\n${setting.description}`}
    
    ${party.length > 0 && "# Party Characters\n\n"}\
    ${party
          .map((c) => `Name: ${c.name}\nDescription: ${c.description || c.description}`)
          .join("\n\n") + (party.length > 0 && "\n\n")
        }\
    ${npcs.length > 0 && "# Non-player Characters\n\n"}\
    ${npcs
          .map((c) => `Name: ${c.name}\nDescription: ${c.description || c.description}`)
          .join("\n\n") + (npcs.length > 0 && "\n\n")
        }\
    ${objects.length > 0 && "# Nearby Objects\n\n"}\
    ${objects
          .map((c) => `Name: ${c.name}\nDescription: ${c.description}`)
          .join("\n\n") + (objects.length > 0 && "\n")
        }\
    
    # Available Actions
    attack
    defend
    move to
    follow
    pick up
    drop
    emote
    stop
    none
    
    ${promptInject}\
    
    # Transcript
    
    `
  }
  
  export async function generateLoreFile(
    { type, setting, character, npc, mob, object },
    generateFn
  ) {
  
    // TODO: This should generate a lore file based on the type of thing we're generating....
  
    // decide on what is happening in this setting
    const encounterTypes = {
      quest: { npcs: 1, mobs: 0, objects: 1, party: 2 },
      // { type: 'battle', npcs: {min: 0, max: 2}, mobs: {min: 1, max: 3}, objects: {min: 0, max: 2}, party: {min: 1, max: 4}},
      // { type: 'banter', npcs: {min: 0, max: 1}, mobs: {min: 0, max: 1}, objects: {min: 0, max: 1}, party: {min: 1, max: 4}},
      // { type: 'friend', npcs: {min: 1, max: 2}, mobs: {min: 0, max: 0}, objects: {min: 0, max: 2}, party: {min: 2, max: 4}},
      // { type: 'comment', npcs: {min: 0, max: 1}, mobs: {min: 0, max: 1}, objects: {min: 1, max: 3}, party: {min: 1, max: 4}},
      // { type: 'party', npcs: {min: 0, max: 0}, mobs: {min: 0, max: 0}, objects: {min: 0, max: 0}, party: {min: 2, max: 4}}
  };
  
    const encounterType = encounterTypes[type];
  
    // const numberOfMobs = Math.floor(Math.random() * (encounterType.mobs.max - encounterType.mobs.min + 1)) + encounterType.mobs.min;
    // const numberOfNpcs = Math.floor(Math.random() * (encounterType.npcs.max - encounterType.npcs.min + 1)) + encounterType.npcs.min;
    // const numberOfObjects = Math.floor(Math.random() * (encounterType.objects.max - encounterType.objects.min + 1)) + encounterType.objects.min;
    // const numberOfParty = Math.floor(Math.random() * (encounterType.party.max - encounterType.party.min + 1)) + encounterType.party.min;
  
    const numberOfMobs = 0;
    const numberOfNpcs = 1;
    const numberOfObjects = 1;
    const numberOfParty = 2;
  
    // get numberOfMobs mobs from the array provided by data.mobs
    const mobs = mob.slice(0, numberOfMobs);
  
    // get numberOfNpcs npcs from the array provided by data.npcs
    const npcs = npc.slice(0, numberOfNpcs);
  
    // get numberOfObjects objects from the array provided by data.objects
    const objects = object.slice(0, numberOfObjects);
  
    // get numberOfParty party from the array provided by data.party
    const party = character.slice(0, numberOfParty);
  
    // combine npcs and party into a single array called characters
    const characters = [...npcs, ...party];
  
    let prompt = makeLoreFilePrompt({ type, setting, character, npc, mob, object });
  
    // generate a random int between 3 and 8
    const numberOfMessages = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
    let outMessages = [];
  
    for (let i = 0; i < numberOfMessages; i++) {
      let dstCharacterIndex = Math.floor(Math.random() * characters.length);
  
      let dstCharacter = characters[dstCharacterIndex];
  
      prompt += `${dstCharacter.name}:`;
  
      console.log("**************** SENDING PROMPT TO OPENAI ****************");
      console.log(prompt);
      
      let loreResp = await generateFn(prompt, ["\n\n", '"""']);
      // remove any newlines from the beginning or end of the response
  
      loreResp = loreResp
        .trim()
        .replace(/^\n+/, "")
        .replace(/\n+$/, "")
        .replaceAll('"', "")
        .replaceAll("\t", "")
        .split("\n");
  
      // if loreResp contains < and >, the remove them and everything between them. if contains a < or > then just remove those characters
      loreResp = loreResp
        .map((line) => {
          if (line.includes("<") && line.includes(">")) {
            return line.replace(/<[^>]*>/g, "");
          } else if (line.includes("<")) {
            return line.replace(/<[^>]*>/g, "");
          } else if (line.includes(">")) {
            return line.replace(/<[^>]*>/g, "");
          } else {
            return line;
          }
        })
        .filter((line) => line.length > 0);
  
      console.log(
        "**************** RECEIVED RESPONSE FROM OPENAI ****************"
      );
      console.log("loreResp is", loreResp);
  
      let additionalPrompt = [`${dstCharacter.name}: ` + loreResp[0] + "\n"];
  
      // if there are more than one lines in the response, check if they contain /action or start with any of the character's names (character[i].name)
      if (loreResp.length > 1) {
        for (let j = 1; j < loreResp.length; j++) {
          console.log("processing loreResp[j]", loreResp[j]);
          // we are going to iterate with some heuristics for a valid response
          // if the prompt is very strong, the likelihood of a good set of responses is higher
          // however, since we are doing some complex stuff, the prompt can sometimes veer off regardless,
          // especially on choosing an action
  
          let validResponse = false;
  
          // if loreResp[j] contains /action, then it might be a valid response
          if (loreResp[j].includes("/action")) validResponse = true;
          else {
            let name =
              loreResp[j].split(":").length > 1 &&
              loreResp[j].split(":").length < 3 &&
              loreResp[j].split("/").length > 1 &&
              loreResp[j].split("/")[1].split("#")[0];
            console.log("name is", name);
            if (name && name.length < 20) {
              // if loreResp[j] starts with any of the character's names, then it might be a valid response
              for (let k = 0; k < characters.length; k++) {
                // name is between the first / and the first #
                if (
                  name.includes(characters[k].name) ||
                  characters[k].name.includes(name)
                ) {
                  validResponse = true;
                }
              }
            }
          }
  
          // if loreResp[j] contains a URL it is not valid
          if (loreResp[j].includes("http")) validResponse = false;
  
          // if it's really long, that is probably an issue
          if (loreResp[j].length > 300) validResponse = false;
  
          // if it isn't an action but doesn't include a ':' indicating chat, it's not valid
          if (!loreResp[j].includes("/action") && !loreResp[j].split(":")[1])
            validResponse = false;
  
          // if it's an empty response, invalidate it
          if (loreResp[j] === "") validResponse = false;
          if (loreResp[j].length < 18) {
            console.log("**** ERROR: loreResp[j] is too short", loreResp[j]);
            validResponse = false;
          }
  
          // if the first character is a '/' but the word after is not action, it's not valid
          if (loreResp[j].startsWith("/") && !loreResp[j].includes("/action"))
            validResponse = false;
  
          if (validResponse) {
            console.log('***adding response "', loreResp[j], '" to prompt');
            additionalPrompt.push(loreResp[j]);
          }
        }
      }
      i += additionalPrompt.length;
  
      outMessages = [...outMessages, ...additionalPrompt];
      prompt += "\n" + additionalPrompt.join("\n");
    }
  
    console.log("**************** FINAL LOREFILE ****************");
  
    const loreFileOutput = `\
  WEBAVERSE_LORE_FILE
  
  # Setting
  
  ${`${setting.name}\n${setting.description}\n\n`}\
  ${characters.length > 0 && "\n# Characters" + "\n\n"}\
  ${characters
        .map(
          (c) =>
            `${c.name}\n${c.description || c.description}\n${c.Inventory?.length > 0 && `Inventory:\n`
            }${(c.Inventory ? c.Inventory : [])
              .map((obj) => `${obj.name}`)
              .join(", ")}`
        )
        .join("\n\n")}\
  ${objects.length > 0 ? "\n\n# Objects" + "\n\n" : ""}\
  ${objects.map((o, i) => `${o.name}\n${o.description}`).join("\n\n")}\
  ${outMessages.length === 0
        ? ""
        : "\n\n# Transcript\n\n" + outMessages.join("\n").replaceAll("\n\n", "\n")
      }`;
  
    return loreFileOutput;
  }